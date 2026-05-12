import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Layout, ChevronRight, Zap, Target, Box, UploadCloud } from 'lucide-react';

const DesignGPT = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setUploaded(false);
  };

  const handleUpload = () => {
    if (!file) return;
    setUploaded(true);
  };

  return (
    <section id="floor-plan" className="section" style={{ background: 'var(--surface)', padding: '10rem 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '20%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(194, 178, 128, 0.08) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '30%', height: '30%', background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="container" style={{ maxWidth: '1400px', position: 'relative', zIndex: 1 }}>
        <div className="section-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.8rem', 
              padding: '0.8rem 1.5rem', 
              background: 'rgba(194, 178, 128, 0.15)', 
              borderRadius: '100px', 
              color: 'var(--primary)',
              fontWeight: 900,
              fontSize: '0.75rem',
              marginBottom: '2.5rem',
              letterSpacing: '3px',
              border: '1px solid rgba(194, 178, 128, 0.2)'
            }}>
              <Sparkles size={16} /> FLOOR PLAN VISUALIZER
            </div>
            
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '5rem', marginBottom: '2.5rem', color: 'var(--text)', lineHeight: 1.1, fontWeight: 900 }}>
              Upload Your <br />
              <span style={{ color: 'var(--primary)' }}>Floor Plan.</span>
            </h2>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '3rem', maxWidth: '600px' }}>
              Share your layout and get a premium visualization flow with project-ready insights, site planning, and budget intelligence.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {[
                { icon: <Target size={20} />, text: 'Precise spatial visualization' },
                { icon: <Box size={20} />, text: 'Material-aware floor mapping' },
                { icon: <Zap size={20} />, text: 'Faster execution planning' }
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text)', fontWeight: 600 }}>
                  <div style={{ color: 'var(--primary)' }}>{item.icon}</div>
                  {item.text}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '620px' }}>
              <label htmlFor="floorPlanUpload" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', padding: '1.2rem 1.5rem', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px dashed var(--glass-border)', cursor: 'pointer' }}>
                <UploadCloud size={24} color="var(--primary)" />
                <span style={{ fontWeight: 700 }}>Choose floor plan image</span>
              </label>
              <input id="floorPlanUpload" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
              {file && (
                <div style={{ padding: '1rem 1.2rem', borderRadius: '16px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)' }}>
                  <div style={{ marginBottom: '0.5rem', fontWeight: 700 }}>{file.name}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Ready to preview and visualize your workflow.</div>
                </div>
              )}
              <button onClick={handleUpload} disabled={!file} className="btn-primary" style={{ padding: '1.5rem 2.5rem', borderRadius: '20px', fontWeight: 900, fontSize: '1.05rem' }}>
                {uploaded ? 'PLAN GENERATED' : 'UPLOAD & VISUALIZE'} <ChevronRight size={24} />
              </button>
              {uploaded && preview && (
                <div style={{ marginTop: '1rem', borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                  <img src={preview} alt="Floor plan preview" style={{ width: '100%', display: 'block', objectFit: 'cover' }} />
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass"
            style={{ 
              minHeight: '600px', 
              borderRadius: '40px', 
              border: '1px solid var(--glass-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, transparent 100%)',
              position: 'relative',
              overflow: 'hidden',
              padding: '2rem'
            }}
          >
            <div style={{ width: '100%', maxWidth: '520px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', marginBottom: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ textTransform: 'uppercase', fontSize: '0.75rem', color: 'var(--primary)', letterSpacing: '2px', fontWeight: 800 }}>LIVE RENDER</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text)' }}>Floor Plan Visualization</div>
                </div>
                <div style={{ background: 'rgba(194, 178, 128, 0.12)', borderRadius: '16px', padding: '1rem 1.3rem', color: 'var(--text)', fontWeight: 700 }}>Preview Mode</div>
              </div>

              <div style={{ height: '320px', borderRadius: '32px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                <Layout size={80} color="var(--primary)" />
                <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>Project execution-ready layout</div>
                <div style={{ maxWidth: '320px', lineHeight: 1.6 }}>Upload your plan and see how IntraSpace maps the space for delivery, materials, and timelines.</div>
              </div>

              <motion.div 
                animate={{ y: [0, -18, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ marginTop: '2rem', padding: '1.5rem', borderRadius: '24px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow)' }}
              >
                <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 900, marginBottom: '0.5rem' }}>QUICK INSIGHT</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '18px' }}>
                    <div style={{ fontWeight: 700 }}>Spatial Accuracy</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Floor plan dimensions and project zones.</div>
                  </div>
                  <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '18px' }}>
                    <div style={{ fontWeight: 700 }}>Execution Ready</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Material and labour readiness mapped.</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default DesignGPT;
