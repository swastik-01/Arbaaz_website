import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Mission from './components/Mission';
import DesignSwap from './components/DesignSwap';
import FloorPlanUpload from './components/DesignGPT';
import Gallery from './components/Gallery';
import Admin from './pages/Admin';
import ContactForm from './components/ContactForm';
import Chatbot from './components/Chatbot';
import OnboardingQuiz from './components/OnboardingQuiz';
import ProjectOS from './pages/ProjectOS';
import ContractorOS from './pages/ContractorOS';
import ProfileSetupModal from './components/ProfileSetupModal';
import { useAuth } from './contexts/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) => {
  const { userProfile, loading } = useAuth();
  if (loading) return null;
  if (!userProfile) return <Navigate to="/" replace />;
  if (allowedRoles && !allowedRoles.includes(userProfile.role)) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const RoleDashboardRedirect = () => {
  const { userProfile, loading } = useAuth();
  if (loading) return null;
  if (!userProfile) return <Navigate to="/" replace />;
  if (userProfile.role === 'admin') return <Navigate to="/admin" replace />;
  if (userProfile.role === 'contractor') return <Navigate to="/contractor-os" replace />;
  return <Navigate to="/track-project" replace />;
};

function LandingPage({ onOpenQuiz }: { onOpenQuiz: () => void }) {
  return (
    <>
      <Hero onOpenQuiz={onOpenQuiz} />
      <Mission />
      <DesignSwap />
      <FloorPlanUpload />
      <Gallery />
      <ContactForm />
    </>
  );
}

function App() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { userProfile, currentUser } = useAuth();
  const [showSetup, setShowSetup] = useState(false);

  React.useEffect(() => {
    if (currentUser && userProfile && !userProfile.profileCompleted && userProfile.role !== 'admin') {
      setShowSetup(true);
    } else {
      setShowSetup(false);
    }
  }, [currentUser, userProfile]);

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.body.classList.toggle('dark-mode', newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className="app">
        <Navbar onOpenQuiz={() => setIsQuizOpen(true)} isDark={isDark} toggleTheme={toggleTheme} />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage onOpenQuiz={() => setIsQuizOpen(true)} />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/dashboard" element={<RoleDashboardRedirect />} />
            <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><Admin /></ProtectedRoute>} />
            <Route path="/contractor-os" element={<ProtectedRoute allowedRoles={['contractor', 'admin']}><ContractorOS /></ProtectedRoute>} />
            <Route path="/track-project" element={<ProtectedRoute allowedRoles={['homeowner', 'admin']}><ProjectOS /></ProtectedRoute>} />
          </Routes>

          <OnboardingQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />
          <ProfileSetupModal isOpen={showSetup} onClose={() => setShowSetup(false)} />

          <footer style={{ padding: '6rem 0', background: 'var(--surface)', color: 'var(--text)', borderTop: '1px solid var(--glass-border)' }}>
            <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.5fr', gap: '4rem', textAlign: 'left' }}>
              <div>
                <img src={isDark ? "/logo_dark.png" : "/logo_light.png"} alt="IntraSpace Logo" style={{ height: '40px', marginBottom: '1.5rem' }} onError={e => { (e.target as HTMLImageElement).src = '/logo.png'; }} />
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.8' }}>
                  The Home Transformation Engine.<br />More Value. More Space.<br />© 2026 IntraSpace.
                </p>
              </div>
              <div>
                <h4 style={{ marginBottom: '1.5rem', fontSize: '1rem', color: 'var(--primary)' }}>PLATFORM</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <li><a href="/#floor-plan" style={{ color: 'inherit' }}>Floor Plan Upload</a></li>
                </ul>
              </div>
              <div style={{ background: 'var(--background)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Need help with your project?</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Reach out and our team will help you scope your renovation and execution plan.</p>
                <a href="/#contact" className="btn-primary" style={{ padding: '0.8rem 1.5rem', fontSize: '0.8rem', borderRadius: '8px', display: 'inline-block' }}>GET STARTED</a>
              </div>
            </div>
          </footer>
        </main>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
