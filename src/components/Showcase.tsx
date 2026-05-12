import React from 'react';
import { motion } from 'framer-motion';

const Showcase = () => {
  return (
    <section id="vision" className="section" style={{ background: '#000' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 style={{ fontSize: '3.5rem', marginBottom: '2.5rem' }}>
              Incredible <span className="gradient-text">Design</span> Capability.
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', marginBottom: '3rem', lineHeight: '1.8' }}>
              From minimalist modern to opulent luxury, our AI design engine understands the nuances of architectural excellence. Every space is optimized for value and aesthetic impact.
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {[
                "AI-Driven Space Optimization",
                "Luxury Material Benchmarking",
                "Real-time 3D Iterations",
                "Automated Lighting Simulation"
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.1rem', fontWeight: 600 }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)' }}></div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
            className="glass"
            style={{ padding: '0.5rem', overflow: 'hidden' }}
          >
            <img 
              src="/showcase.png" 
              alt="Luxury Interior Showcase" 
              style={{ width: '100%', borderRadius: '20px', display: 'block' }} 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
