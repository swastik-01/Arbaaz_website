import { motion } from 'framer-motion';

const Mission = () => {
  return (
    <section id="mission" className="section" style={{ background: 'var(--background)', color: 'var(--text)' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(2rem, 5vw, 4rem)' }}>
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ flex: '1 1 400px' }}
          >
            <h1 style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: 'clamp(2.2rem, 6vw, 4rem)', 
              lineHeight: 1.1, 
              marginBottom: '1.5rem' 
            }}>
              IntraSpace: Revolutionizing the <span style={{ color: 'var(--primary)' }}>Interior Industry.</span>
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 3vw, 1.25rem)', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
              We are a new platform solving the problem of the unstructured interior industry by providing a phone and web-based app that facilitates custom designs and connects users to verified execution teams.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ flex: 1, minWidth: '300px' }}
          >
            <div style={{ 
              borderRadius: '12px', 
              overflow: 'hidden', 
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              background: 'var(--surface)'
            }}>
              {/* This represents the 4th uploaded image */}
              <img 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200" 
                alt="Revolutionizing Interior Industry" 
                style={{ width: '100%', display: 'block' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
