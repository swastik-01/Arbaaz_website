import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Briefcase, IndianRupee, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const DesignerDashboard = () => {
  const { currentUser, userProfile, updateProfile, login } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    isDesigner: false,
    specialty: '',
    experience: '',
    consultationFee: '',
    projectFee: '',
    bio: '',
    education: '',
    certifications: '',
  });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        isDesigner: userProfile.isDesigner || false,
        specialty: userProfile.specialty || '',
        experience: userProfile.experience || '',
        consultationFee: userProfile.consultationFee || '',
        projectFee: userProfile.projectFee || '',
        bio: userProfile.bio || '',
        education: userProfile.education || '',
        certifications: userProfile.certifications || '',
      });
    }
  }, [userProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!currentUser) {
    return (
      <div style={{ paddingTop: '150px', minHeight: '100vh', background: 'var(--background)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass" 
          style={{ padding: '4rem', textAlign: 'center', maxWidth: '500px', border: '1px solid var(--glass-border)' }}
        >
          <div style={{ 
            width: '80px', 
            height: '80px', 
            background: 'var(--primary)', 
            borderRadius: '20px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 2rem'
          }}>
            <User size={40} color="#fff" />
          </div>
          <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', marginBottom: '1rem' }}>Join the Elite</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
            Sign in to create your professional designer profile and start reaching thousands of homeowners.
          </p>
          <button onClick={login} className="btn-primary" style={{ width: '100%', padding: '1.2rem', borderRadius: '8px' }}>
            SIGN IN WITH GOOGLE
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '120px', minHeight: '100vh', background: 'var(--background)' }}>
      <div className="container">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem' }}>Professional Dashboard</h1>
              <p style={{ color: 'var(--text-muted)' }}>Manage your professional presence and consultation fees.</p>
            </div>
            {success && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ color: '#4caf50', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}
              >
                <CheckCircle size={20} /> Profile Updated Successfully
              </motion.div>
            )}
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '2rem' }}>
            
            {/* Join as Designer Switch */}
            <div className="glass" style={{ padding: '2rem', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>Designer Status</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Enable this to show your profile in the designer marketplace.</p>
              </div>
              <div 
                onClick={() => setFormData(prev => ({ ...prev, isDesigner: !prev.isDesigner }))}
                style={{
                  width: '60px',
                  height: '30px',
                  background: formData.isDesigner ? 'var(--primary)' : 'var(--glass-border)',
                  borderRadius: '30px',
                  padding: '4px',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease',
                  position: 'relative'
                }}
              >
                <motion.div 
                  animate={{ x: formData.isDesigner ? 30 : 0 }}
                  style={{
                    width: '22px',
                    height: '22px',
                    background: '#fff',
                    borderRadius: '50%',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                />
              </div>
            </div>

            {formData.isDesigner && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div className="glass" style={{ padding: '2rem', border: '1px solid var(--glass-border)' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <Briefcase size={20} color="var(--primary)" /> Professional Info
                    </h3>
                    
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Specialty</label>
                      <input 
                        type="text" 
                        value={formData.specialty}
                        onChange={(e) => setFormData(prev => ({ ...prev, specialty: e.target.value }))}
                        placeholder="e.g. Luxury Residential, Modular Kitchens"
                        style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--glass-border)', padding: '1rem', borderRadius: '8px', color: 'var(--text)' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Experience</label>
                      <input 
                        type="text" 
                        value={formData.experience}
                        onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                        placeholder="e.g. 10 Years"
                        style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--glass-border)', padding: '1rem', borderRadius: '8px', color: 'var(--text)' }}
                      />
                    </div>
                  </div>

                  <div className="glass" style={{ padding: '2rem', border: '1px solid var(--glass-border)' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <IndianRupee size={20} color="var(--primary)" /> Pricing (₹)
                    </h3>
                    
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Consultation Fee</label>
                      <input 
                        type="number" 
                        value={formData.consultationFee}
                        onChange={(e) => setFormData(prev => ({ ...prev, consultationFee: e.target.value }))}
                        placeholder="e.g. 2000"
                        style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--glass-border)', padding: '1rem', borderRadius: '8px', color: 'var(--text)' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Min. Project Execution Fee</label>
                      <input 
                        type="number" 
                        value={formData.projectFee}
                        onChange={(e) => setFormData(prev => ({ ...prev, projectFee: e.target.value }))}
                        placeholder="e.g. 50000"
                        style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--glass-border)', padding: '1rem', borderRadius: '8px', color: 'var(--text)' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="glass" style={{ padding: '2rem', border: '1px solid var(--glass-border)' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <User size={20} color="var(--primary)" /> Professional Bio
                  </h3>
                  <textarea 
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell clients about your design philosophy and background..."
                    style={{ width: '100%', height: '120px', background: 'var(--surface)', border: '1px solid var(--glass-border)', padding: '1rem', borderRadius: '8px', color: 'var(--text)', resize: 'none', marginBottom: '2rem' }}
                  />

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Education</label>
                      <textarea 
                        value={formData.education}
                        onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
                        placeholder="e.g. B.Arch from School of Planning and Architecture"
                        style={{ width: '100%', height: '80px', background: 'var(--surface)', border: '1px solid var(--glass-border)', padding: '1rem', borderRadius: '8px', color: 'var(--text)', resize: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Certifications</label>
                      <textarea 
                        value={formData.certifications}
                        onChange={(e) => setFormData(prev => ({ ...prev, certifications: e.target.value }))}
                        placeholder="e.g. Certified Interior Designer (CID), LEED AP"
                        style={{ width: '100%', height: '80px', background: 'var(--surface)', border: '1px solid var(--glass-border)', padding: '1rem', borderRadius: '8px', color: 'var(--text)', resize: 'none' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="glass" style={{ padding: '2rem', border: '1px solid var(--glass-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <ImageIcon size={20} color="var(--primary)" /> Portfolio Gallery
                    </h3>
                    <button type="button" style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem', background: 'transparent' }}>
                      + ADD IMAGES
                    </button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} style={{ aspectRatio: '1', background: 'var(--surface)', borderRadius: '12px', border: '2px dashed var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                        <ImageIcon size={24} opacity={0.3} />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button 
                type="submit" 
                disabled={isSaving}
                className="btn-primary" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1rem', 
                  padding: '1.2rem 4rem', 
                  fontSize: '1rem',
                  opacity: isSaving ? 0.7 : 1
                }}
              >
                {isSaving ? 'SAVING...' : (
                  <>SAVE CHANGES <Save size={20} /></>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DesignerDashboard;
