import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Residential Interior',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await addDoc(collection(db, 'leads'), {
        ...formData,
        source: 'contact_form',
        status: 'new',
        createdAt: serverTimestamp(),
      });
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', projectType: 'Residential Interior', message: '' });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    padding: '1rem',
    background: 'var(--surface)',
    border: '1px solid var(--glass-border)',
    borderRadius: '10px',
    color: 'var(--text)',
    outline: 'none',
    fontSize: '0.9rem',
    width: '100%',
    transition: 'border-color 0.2s',
  };

  return (
    <section id="contact" className="section" style={{ background: 'var(--background)' }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(300px, 100%, 500px), 1fr))', 
          gap: 'clamp(2rem, 10vw, 6rem)', 
          alignItems: 'start' 
        }}>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: 'clamp(2rem, 8vw, 3.5rem)', 
              marginBottom: '2rem', 
              color: 'var(--text)' 
            }}>
              Let's Build Your <br />
              <span style={{ color: 'var(--primary)' }}>Masterpiece.</span>
            </h2>
            <p style={{ 
              color: 'var(--text-muted)', 
              fontSize: 'clamp(1rem, 3vw, 1.1rem)', 
              lineHeight: 1.8, 
              marginBottom: '3rem', 
              maxWidth: '500px' 
            }}>
              Whether it's a luxury residence or a commercial landmark, our engine is ready to transform your vision into reality.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {[
                { icon: <Phone size={22} />, label: 'Phone', value: '+91 99999 99999' },
                { icon: <Mail size={22} />, label: 'Email', value: 'hello@intraspace.com' },
                { icon: <MapPin size={22} />, label: 'Office', value: 'Indiranagar, Bangalore, KA' },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ width: 'clamp(40px, 10vw, 50px)', height: 'clamp(40px, 10vw, 50px)', borderRadius: '12px', background: 'var(--surface)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                    {icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase' }}>{label}</div>
                    <div style={{ color: 'var(--text)', fontWeight: 700, fontSize: 'clamp(0.85rem, 3vw, 1rem)' }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass"
            style={{ 
              padding: 'clamp(1.5rem, 5vw, 3rem)', 
              borderRadius: '24px', 
              border: '1px solid var(--glass-border)' 
            }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '3rem 0' }}
              >
                <div style={{ width: '80px', height: '80px', background: 'rgba(39,201,63,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', border: '1px solid rgba(39,201,63,0.3)' }}>
                  <CheckCircle size={40} color="#27c93f" />
                </div>
                <h3 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', marginBottom: '1rem' }}>Message Received!</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
                  Our design expert will reach out to you within 24 hours to discuss your project.
                </p>
                <button
                  className="btn-primary"
                  onClick={() => setSubmitted(false)}
                  style={{ padding: '0.8rem 2rem', fontSize: '0.8rem' }}
                >
                  SEND ANOTHER MESSAGE
                </button>
              </motion.div>
            ) : (
              <form id="contact-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }} onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.4rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Full Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      placeholder="Rahul Sharma"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Email Address *</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder="rahul@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.4rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Phone</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Project Type *</label>
                    <select
                      id="contact-project-type"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      style={{ ...inputStyle }}
                    >
                      <option>Residential Interior</option>
                      <option>Commercial Space</option>
                      <option>Modular Kitchen Only</option>
                      <option>Consultation</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Your Message *</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Tell us about your space — size, budget, timeline, vision..."
                    required
                    value={formData.message}
                    onChange={handleChange}
                    style={{ ...inputStyle, minHeight: '130px', resize: 'none' }}
                  />
                </div>

                {error && (
                  <div style={{ color: '#ff5f56', fontSize: '0.82rem', padding: '0.8rem 1rem', background: 'rgba(255,95,86,0.08)', borderRadius: '8px', border: '1px solid rgba(255,95,86,0.2)' }}>
                    {error}
                  </div>
                )}

                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                  style={{ padding: '1.2rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? (
                    <>Sending...</>
                  ) : (
                    <><Send size={18} /> SEND MESSAGE</>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
