import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DesignSwap = () => {
  const [activeSet, setActiveSet] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);

  const sets = [
    {
      name: "Living Room",
      before: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200",
      after: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200"
    },
    {
      name: "Kitchen",
      before: "/swap2_before.png",
      after: "/swap2_after.png"
    },
    {
      name: "Master Suite",
      before: "/swap3_before.png",
      after: "/swap3_after.png"
    }
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.min(Math.max(x, 0), 100));
  };

  return (
    <section id="transformation" className="section" style={{ background: 'var(--background)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(2rem, 8vw, 3.5rem)', 
            color: 'var(--text)' 
          }}>
            The <span style={{ color: 'var(--primary)' }}>Transformation</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '1rem', fontSize: '0.9rem' }}>Click to explore how IntraSpace brings design intent through execution with real project clarity.</p>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '0.5rem', 
            marginTop: '2rem',
            flexWrap: 'wrap'
          }}>
            {sets.map((set, i) => (
              <button 
                key={i}
                onClick={() => setActiveSet(i)}
                style={{
                  padding: '0.6rem 1.2rem',
                  borderRadius: '30px',
                  border: activeSet === i ? '2px solid var(--primary)' : '1px solid var(--glass-border)',
                  background: activeSet === i ? 'var(--primary)' : 'transparent',
                  color: activeSet === i ? '#1a1a1a' : 'var(--text)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {set.name}
              </button>
            ))}
          </div>
        </div>

        <div 
          style={{ 
            position: 'relative', 
            width: '100%', 
            height: 'clamp(300px, 60vh, 650px)', 
            borderRadius: '24px', 
            overflow: 'hidden',
            cursor: 'ew-resize',
            boxShadow: 'var(--shadow)'
          }}
          onMouseMove={handleMouseMove}
          onTouchMove={(e) => handleMouseMove(e.touches[0])}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSet}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ width: '100%', height: '100%', position: 'relative' }}
            >
              {/* Before Image */}
              <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                backgroundImage: `url(${sets[activeSet].before})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}>
                <div style={{ position: 'absolute', top: '2rem', left: '2rem', background: 'rgba(0,0,0,0.5)', color: '#fff', padding: '0.5rem 1rem', borderRadius: '4px', backdropFilter: 'blur(5px)' }}>BEFORE</div>
              </div>

              {/* After Image */}
              <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: `${sliderPos}%`, 
                height: '100%', 
                backgroundImage: `url(${sets[activeSet].after})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRight: '4px solid var(--primary)',
                overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: '2rem', left: '2rem', background: 'var(--primary)', color: '#000', padding: '0.5rem 1rem', borderRadius: '4px', whiteSpace: 'nowrap', fontWeight: 800 }}>AFTER IntraSpace</div>
              </div>

              {/* Slider Handle */}
              <div style={{ 
                position: 'absolute', 
                top: '50%', 
                left: `${sliderPos}%`, 
                transform: 'translate(-50%, -50%)',
                width: '50px',
                height: '50px',
                background: '#fff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 30px rgba(0,0,0,0.3)',
                zIndex: 10
              }}>
                <div style={{ width: '2px', height: '18px', background: 'var(--primary)', margin: '0 3px' }} />
                <div style={{ width: '2px', height: '18px', background: 'var(--primary)', margin: '0 3px' }} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default DesignSwap;
