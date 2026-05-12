import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = ({ onOpenQuiz }: { onOpenQuiz: () => void }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const slides = [
    '/slide1.png',
    '/slide2.png',
    '/slide3.png',
    '/slide4.png',
    '/slide5.png'
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{ 
      position: 'relative', 
      height: '100vh', 
      width: '100%', 
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: 'var(--text)'
    }}>
      {/* Slideshow Background */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeInOut" }}
            style={{ 
              position: 'absolute', 
              inset: 0, 
              backgroundImage: `url(${slides[currentSlide]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </AnimatePresence>
      </div>
      
      {/* Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0,0,0,0.3)',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: '1000px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 style={{ 
            fontSize: 'clamp(0.8rem, 3vw, 1.5rem)', 
            letterSpacing: 'clamp(2px, 1vw, 5px)', 
            textTransform: 'uppercase', 
            fontWeight: 400,
            marginBottom: '1rem',
            color: 'var(--primary)'
          }}>
            IntraSpace Platform
          </h2>
          <h1 style={{ 
            fontFamily: 'var(--font-serif)', 
            fontSize: 'clamp(2.5rem, 10vw, 5.5rem)', 
            lineHeight: 1.1, 
            marginBottom: '2.5rem',
            textShadow: '0 2px 20px rgba(0,0,0,0.3)'
          }}>
            From Floor Plan to <br /> Flawless Finish.
          </h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            <button onClick={onOpenQuiz} className="btn-primary" style={{ padding: '1.2rem 2.5rem', width: 'auto', minWidth: '200px' }}>
              Start Transformation
            </button>
            <button className="btn-outline" style={{ 
              color: '#fff', 
              borderColor: '#fff', 
              padding: '1.2rem 2.5rem',
              width: 'auto',
              minWidth: '200px'
            }}>
              Explore Gallery
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
