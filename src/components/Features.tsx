import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, ShoppingCart, Users, Terminal, TrendingUp } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    whileHover={{ 
      y: -10, 
      boxShadow: '0 20px 40px rgba(249, 212, 35, 0.1)',
      borderColor: 'rgba(249, 212, 35, 0.3)'
    }}
    transition={{ 
      type: 'spring', 
      stiffness: 100, 
      delay: index * 0.1 
    }}
    viewport={{ once: true, margin: "-100px" }}
    className="glass"
    style={{ 
      padding: '3rem', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1.5rem',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    {/* Animated background glow */}
    <motion.div
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'radial-gradient(circle, rgba(249, 212, 35, 0.05) 0%, transparent 70%)',
        zIndex: -1
      }}
    />

    <div style={{
      width: '70px',
      height: '70px',
      borderRadius: '16px',
      background: 'linear-gradient(135deg, rgba(249, 212, 35, 0.1), rgba(249, 212, 35, 0.05))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--accent)'
    }}>
      <Icon size={36} />
    </div>
    
    <h3 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{title}</h3>
    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8' }}>{description}</p>
    
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: '100%' }}
      transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
      style={{ height: '2px', background: 'linear-gradient(90deg, var(--accent), transparent)', marginTop: 'auto' }}
    />
  </motion.div>
);

const Features = () => {
  const features = [
    {
      icon: Cpu,
      title: "Design Model Library",
      description: "Access a curated collection of thousands of proven design models for every space and budget."
    },
    {
      icon: Users,
      title: "Designer Finder",
      description: "Geo-based matching to find reliable, verified, and high-performance designers in your city."
    },
    {
      icon: ShoppingCart,
      title: "Virtual Design Tool",
      description: "Visualize your future home in immersive 3D before a single brick is moved."
    },
    {
      icon: Terminal,
      title: "Execution Team Finder",
      description: "Connect with certified execution teams and contractors bound by strict quality SLAs."
    },
    {
      icon: TrendingUp,
      title: "Work Audit System",
      description: "Track every milestone in real-time with our transparent project audit and visibility tool."
    }
  ];

  return (
    <section id="features" className="section">
      <div className="container">
        <div style={{ textAlign: 'left', marginBottom: '6rem', maxWidth: '800px' }}>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '4rem', marginBottom: '2rem', letterSpacing: '-0.03em' }}
          >
            Core Model <span style={{ color: 'var(--accent)' }}>Framework</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            style={{ color: 'var(--text-muted)', fontSize: '1.4rem', lineHeight: '1.6' }}
          >
            Redefining the industry from a fragmented service model to a unified execution engine.
          </motion.p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
