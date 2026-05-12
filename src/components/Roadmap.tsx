import { motion } from 'framer-motion';

const Roadmap = () => {
  const steps = [
    { number: 1, title: "Design Model Library", desc: "Access a rich library of models to spark inspiration." },
    { number: 2, title: "Designer Finder Tool", desc: "Locate verified professionals nearby based on your geo-location." },
    { number: 3, title: "Virtual Room Design Tool", desc: "Visualize designs in a virtual space before spending a rupee." },
    { number: 4, title: "Geo-Based Execution Team", desc: "Match with the best local teams for the physical build." },
    { number: 5, title: "Audit of the Work Done", desc: "Track progress and ensure work meets your satisfaction." },
  ];

  return (
    <section id="roadmap-timeline" className="section" style={{ background: '#0a0b10', color: '#fff' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 10vw, 5rem)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 8vw, 3.5rem)' }}>The <span className="gradient-text">Feature Roadmap</span></h2>
          <p style={{ color: '#8e929e', marginTop: '1.5rem', maxWidth: '600px', margin: '1.5rem auto', fontSize: 'clamp(0.9rem, 3vw, 1.1rem)' }}>
            A structured journey from inspiration to execution, tracked every step of the way.
          </p>
        </div>

        <div style={{ position: 'relative' }}>
          {/* Progress Line */}
          <div style={{ 
            position: 'absolute', 
            top: '40px', 
            left: '50px', 
            right: '50px', 
            height: '2px', 
            background: 'linear-gradient(90deg, var(--primary) 0%, #333 100%)',
            zIndex: 0
          }} className="hidden-mobile" />

          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'clamp(2rem, 5vw, 3rem)', position: 'relative', zIndex: 1 }}>
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{ flex: 1, minWidth: '200px', textAlign: 'center' }}
              >
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '50%', 
                  background: 'var(--primary)', 
                  color: '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: 800,
                  margin: '0 auto 2rem',
                  boxShadow: '0 0 30px rgba(249, 212, 35, 0.3)'
                }}>
                  {step.number}
                </div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>{step.title}</h4>
                <p style={{ fontSize: '0.9rem', color: '#8e929e', lineHeight: 1.5 }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
