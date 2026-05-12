import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  type User, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, googleProvider, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  role: 'homeowner' | 'contractor' | 'admin';
  phoneNumber?: string;
  activeProject?: string;
  companyName?: string;
  occupation?: string;
  profileCompleted?: boolean;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

const SUPER_ADMIN_EMAIL = 'swastik.kumar@aegis.edu.in';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserProfile(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!currentUser) return;
    const profileRef = doc(db, 'users', currentUser.uid);
    await setDoc(profileRef, data, { merge: true });
    // Update local state immediately so UI is responsive
    setUserProfile(prev => prev ? { ...prev, ...data } : null);
  };

  const refreshProfile = async () => {
    if (!currentUser) return;
    try {
      const profileRef = doc(db, 'users', currentUser.uid);
      const snap = await getDoc(profileRef);
      if (snap.exists()) {
        setUserProfile(snap.data() as UserProfile);
      }
    } catch (e) {
      console.error("refreshProfile error:", e);
    }
  };

  const fetchOrCreateProfile = async (user: User): Promise<UserProfile> => {
    const profileRef = doc(db, 'users', user.uid);

    const profileSnapPromise = getDoc(profileRef);
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Firestore timeout")), 5000)
    );

    try {
      const profileSnap = await Promise.race([profileSnapPromise, timeoutPromise]) as Awaited<typeof profileSnapPromise>;
      if (profileSnap.exists()) {
        return profileSnap.data() as UserProfile;
      }

      // Create new profile
      const newProfile: UserProfile = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: user.email === SUPER_ADMIN_EMAIL ? 'admin' : 'homeowner',
        profileCompleted: false,
      };
      await setDoc(profileRef, newProfile);
      return newProfile;
    } catch (error) {
      console.error("AuthContext Firestore Error:", error);
      // Offline fallback — do not write, just return local object
      return {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: user.email === SUPER_ADMIN_EMAIL ? 'admin' : 'homeowner',
        profileCompleted: false,
      };
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      clearTimeout(timer);
      setCurrentUser(user);

      if (user) {
        const profile = await fetchOrCreateProfile(user);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }

      setLoading(false);
    });

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  const value: AuthContextType = {
    currentUser,
    userProfile,
    loading,
    login,
    logout,
    updateProfile,
    refreshProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
