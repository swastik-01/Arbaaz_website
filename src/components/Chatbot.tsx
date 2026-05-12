import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, X, Sparkles } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const validateContact = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  };

  const handleSend = () => {
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!contact.trim() || !validateContact(contact.trim())) {
      setError('Please enter a valid 10-digit phone number or email address.');
      return;
    }
    if (!message.trim()) {
      setError('Please enter a short message.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999 }}>
      <div style={{ position: 'relative' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '-10px',
            left: '-10px',
            right: '-10px',
            bottom: '-10px',
            pointerEvents: 'none'
          }}
        >
          <Sparkles
            size={16}
            color="var(--primary)"
            style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}
          />
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--primary)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            cursor: 'pointer',
            border: 'none',
            position: 'relative',
            zIndex: 10
          }}
        >
          {isOpen ? <X size={32} /> : <Home size={32} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{
              position: 'absolute',
              bottom: '5rem',
              right: 0,
              width: '400px',
              background: 'var(--background)',
              borderRadius: '24px',
              boxShadow: 'var(--shadow)',
              border: '1px solid var(--glass-border)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            <div style={{ padding: '1.5rem', background: 'var(--primary)', color: '#fff' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.5rem', borderRadius: '12px' }}>
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem' }}>IntraSpace Contact</h3>
                  <p style={{ fontSize: '0.8rem', opacity: 0.85 }}>Share your details and we’ll get back to you.</p>
                </div>
              </div>
            </div>

            <div style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {submitted ? (
                <div style={{ padding: '1rem', borderRadius: '18px', background: 'rgba(39,201,63,0.08)', color: '#27c93f', fontWeight: 700 }}>
                  Thanks! Your request has been noted. We will contact you shortly.
                </div>
              ) : (
                <>
                  <div style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    Please share your name, phone (10 digits) or email, and a short message.
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--glass-border)', padding: '0.9rem 1rem', borderRadius: '14px', color: 'var(--text)', outline: 'none' }}
                  />
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Phone (10 digits) or Email"
                    style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--glass-border)', padding: '0.9rem 1rem', borderRadius: '14px', color: 'var(--text)', outline: 'none' }}
                  />
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message"
                    rows={4}
                    style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--glass-border)', padding: '0.9rem 1rem', borderRadius: '14px', color: 'var(--text)', outline: 'none', resize: 'vertical' }}
                  />
                  {error && <div style={{ color: '#ff5f56', fontSize: '0.85rem', fontWeight: 700 }}>{error}</div>}
                </>
              )}
            </div>

            <div style={{ padding: '1.5rem', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
              <button
                onClick={() => setIsOpen(false)}
                style={{ flex: 1, padding: '0.9rem 1rem', borderRadius: '14px', border: '1px solid var(--glass-border)', background: 'transparent', color: 'var(--text)', cursor: 'pointer' }}
              >
                Close
              </button>
              <button
                onClick={handleSend}
                style={{ flex: 1, padding: '0.9rem 1rem', borderRadius: '14px', background: 'var(--primary)', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700 }}
              >
                {submitted ? 'SENT' : 'SEND'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
