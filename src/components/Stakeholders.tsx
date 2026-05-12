import React from 'react';
import { motion } from 'framer-motion';
import { Home, Palette, HardHat, Package } from 'lucide-react';

const StakeholderCard = ({ icon: Icon, title, points }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="glass"
    style={{ padding: '2rem', flex: 1, minWidth: '280px' }}
  >
    <div style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>
      <Icon size={40} />
    </div>
    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{title}</h3>
    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
      {points.map((p, i) => (
        <li key={i} style={{ color: 'var(--text-muted)', fontSize: '0.95rem', display: 'flex', gap: '0.5rem' }}>
          <span style={{ color: 'var(--accent)' }}>•</span> {p}
        </li>
      ))}
    </ul>
  </motion.div>
);

const Stakeholders = () => {
  return (
    <section id="roadmap" className="section" style={{ background: 'linear-gradient(to bottom, #0a0b10, #12141d)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '3.5rem' }}>Built for the <span className="gradient-text">Ecosystem.</span></h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '1.5rem auto', fontSize: '1.2rem' }}>
            A unified platform connecting every stakeholder in the home transformation journey.
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
          <StakeholderCard 
            icon={Home} 
            title="Homeowners" 
            points={["DIY 3D Visualization", "Verified Professionals", "Direct Factory Material Purchase"]} 
          />
          <StakeholderCard 
            icon={Palette} 
            title="Designers" 
            points={["Consistent Lead Flow", "Project Management Tools", "Mentorship & Certification"]} 
          />
          <StakeholderCard 
            icon={HardHat} 
            title="Contractors" 
            points={["Steady Work Pipelines", "Guaranteed Payments", "Work Quality Benchmarks"]} 
          />
          <StakeholderCard 
            icon={Package} 
            title="Suppliers" 
            points={["Niche Marketplace Access", "Inventory Analytics", "Direct Integration with BOMs"]} 
          />
        </div>
      </div>
    </section>
  );
};

export default Stakeholders;
