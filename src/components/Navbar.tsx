import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, LogOut, Settings, HardHat, MapPin, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const Navbar = ({ onOpenQuiz: _onOpenQuiz, isDark, toggleTheme }: { onOpenQuiz: () => void, isDark: boolean, toggleTheme: () => void }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const { currentUser, userProfile, logout } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  // Close dropdown on route change
  useEffect(() => {
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  const handleConsult = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('contact');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If not on the home page, navigate home and scroll
      window.location.href = '/#contact';
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          padding: '0.8rem 4rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--glass)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--glass-border)',
          boxShadow: 'var(--shadow)',
          transition: 'background-color 0.4s ease'
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
          <img src="/logo.png" alt="IntraSpace Logo" className="logo-proper" style={{ height: '48px' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.5rem',
                fontWeight: 800,
                color: 'var(--text)',
                lineHeight: 1,
                letterSpacing: '0.5px'
              }}>
                IntraSpace
              </span>
            </div>
            <span style={{ fontSize: '0.6rem', letterSpacing: '2.5px', color: 'var(--primary)', fontWeight: 900 }}>
              MORE VALUE MORE SPACE
            </span>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="nav-links" style={{
          display: 'flex',
          gap: '2.5rem',
          fontWeight: 700,
          fontSize: '0.82rem',
          letterSpacing: '0.5px',
          color: 'var(--text)',
          textTransform: 'uppercase'
        }}>
              <a href="/#mission" style={{ color: 'var(--text)', textDecoration: 'none' }} className="nav-link">Mission</a>
              <a href="/#gallery" style={{ color: 'var(--text)', textDecoration: 'none' }} className="nav-link">Gallery</a>
              <a href="/#floor-plan" style={{ color: 'var(--text)', textDecoration: 'none' }} className="nav-link">Floor Plan</a>
        </div>

        {/* Right Controls */}
        <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title={isDark ? 'Switch to Light' : 'Switch to Dark'}
            style={{
              cursor: 'pointer',
              color: 'var(--text)',
              display: 'flex',
              alignItems: 'center',
              padding: '0.5rem',
              borderRadius: '50%',
              background: 'var(--surface)',
              border: '1px solid var(--glass-border)',
              transition: 'all 0.3s'
            }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <div style={{ height: '24px', width: '1px', background: 'var(--glass-border)' }} />

          {/* Auth area */}
          {currentUser ? (
            <div ref={menuRef} style={{ position: 'relative' }}>
              <button
                id="user-menu-trigger"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.7rem',
                  cursor: 'pointer',
                  padding: '0.4rem 0.9rem 0.4rem 0.5rem',
                  borderRadius: '30px',
                  background: 'var(--surface)',
                  border: '1px solid var(--glass-border)',
                  transition: 'all 0.2s'
                }}
              >
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt="Avatar" style={{ width: '28px', height: '28px', borderRadius: '50%' }} referrerPolicy="no-referrer" />
                ) : (
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 800, fontSize: '0.8rem' }}>
                    {currentUser.displayName?.[0] || currentUser.email?.[0] || 'U'}
                  </div>
                )}
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text)' }}>
                  {currentUser.displayName?.split(' ')[0] || currentUser.email?.split('@')[0]}
                </span>
                <ChevronDown size={14} style={{ color: 'var(--text-muted)', transform: isUserMenuOpen ? 'rotate(180deg)' : 'rotate(0)', transition: '0.2s' }} />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    id="user-menu-dropdown"
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 10px)',
                      right: 0,
                      width: '220px',
                      background: 'var(--surface)',
                      borderRadius: '14px',
                      padding: '0.5rem',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
                      border: '1px solid var(--glass-border)',
                      zIndex: 1001
                    }}
                  >
                    {/* Role badge */}
                    <div style={{ padding: '0.8rem 1rem', marginBottom: '0.3rem' }}>
                      <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '1px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                        Signed in as
                      </div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text)', marginTop: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {currentUser.email}
                      </div>
                      <span style={{
                        display: 'inline-block',
                        marginTop: '0.4rem',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '0.65rem',
                        fontWeight: 900,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        background: userProfile?.role === 'admin' ? 'rgba(99,102,241,0.15)' : userProfile?.role === 'contractor' ? 'rgba(251,191,36,0.15)' : 'rgba(194,178,128,0.15)',
                        color: userProfile?.role === 'admin' ? '#6366f1' : userProfile?.role === 'contractor' ? '#f59e0b' : 'var(--primary)',
                      }}>
                        {userProfile?.role || 'homeowner'}
                      </span>
                    </div>

                    <div style={{ height: '1px', background: 'var(--glass-border)', margin: '0 0.5rem 0.3rem' }} />

                    {/* Role-specific links */}
                    {userProfile?.role === 'admin' && (
                      <Link to="/admin" onClick={() => setIsUserMenuOpen(false)} style={menuItemStyle}>
                        <Settings size={16} /> Admin Panel
                      </Link>
                    )}
                    {userProfile?.role === 'contractor' && (
                      <Link to="/contractor-os" onClick={() => setIsUserMenuOpen(false)} style={menuItemStyle}>
                        <HardHat size={16} /> Workforce OS
                      </Link>
                    )}
                    {(userProfile?.role === 'homeowner' || userProfile?.role === 'admin') && (
                      <>
                        <Link to="/track-project" onClick={() => setIsUserMenuOpen(false)} style={menuItemStyle}>
                          <MapPin size={16} /> Track My Project
                        </Link>
                      </>
                    )}

                    <div style={{ height: '1px', background: 'var(--glass-border)', margin: '0.3rem 0.5rem' }} />

                    <button
                      id="sign-out-btn"
                      onClick={() => { logout(); setIsUserMenuOpen(false); }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.8rem',
                        padding: '0.75rem 1rem',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: '#ff5f56',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,95,86,0.08)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              id="login-btn"
              className="btn-outline"
              onClick={() => setIsAuthModalOpen(true)}
              style={{
                padding: '0.6rem 1.2rem',
                fontSize: '0.75rem',
                borderColor: 'var(--primary)',
                color: 'var(--text)',
                borderRadius: '6px',
                fontWeight: 700
              }}
            >
              LOGIN
            </button>
          )}

          <button
            id="consult-btn"
            onClick={handleConsult}
            className="btn-primary"
            style={{
              padding: '0.6rem 1.5rem',
              fontSize: '0.75rem',
              borderRadius: '6px',
            }}
          >
            CONSULT
          </button>
        </div>
      </motion.nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

const menuItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.8rem',
  padding: '0.75rem 1rem',
  borderRadius: '8px',
  fontSize: '0.85rem',
  fontWeight: 600,
  textDecoration: 'none',
  color: 'var(--text)',
  transition: 'background 0.15s',
};

export default Navbar;
