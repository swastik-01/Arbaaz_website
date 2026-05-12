import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();

  const handleGoogleLogin = async () => {
    await login();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(8px)'
            }}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="glass"
            style={{
              width: '100%',
              maxWidth: '450px',
              padding: '3rem',
              position: 'relative',
              textAlign: 'center',
              border: '1px solid var(--glass-border)',
              background: 'var(--surface)'
            }}
          >
            <button 
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '1.5rem',
                background: 'transparent',
                color: 'var(--text-muted)'
              }}
            >
              <X size={24} />
            </button>

            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                background: 'var(--primary)', 
                borderRadius: '16px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                boxShadow: '0 8px 24px rgba(194, 178, 128, 0.3)'
              }}>
                <LogIn size={32} color="#fff" />
              </div>
              <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem' }}>Welcome to IntraSpace</h2>
              <p style={{ color: 'var(--text-muted)' }}>Experience the future of interior execution.</p>
            </div>

            <button 
              onClick={handleGoogleLogin}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                padding: '1rem',
                borderRadius: '8px',
                background: '#fff',
                color: '#000',
                fontWeight: 700,
                fontSize: '1rem',
                border: '1px solid #ddd',
                marginBottom: '1.5rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '20px' }} />
              Continue with Google
            </button>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              By continuing, you agree to IntraSpace's <br />
              <span style={{ color: 'var(--primary)', cursor: 'pointer' }}>Terms of Service</span> and <span style={{ color: 'var(--primary)', cursor: 'pointer' }}>Privacy Policy</span>.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
