import React from 'react';
import { motion } from 'framer-motion';

const galleryItems = [
  { id: 1, src: '/slide1.png', title: 'Modern Living Room', category: 'Residential' },
  { id: 2, src: '/slide2.png', title: 'Minimalist Bedroom', category: 'Residential' },
  { id: 3, src: '/slide3.png', title: 'Industrial Office', category: 'Commercial' },
  { id: 4, src: '/slide4.png', title: 'Luxury Kitchen', category: 'Residential' },
  { id: 5, src: '/slide5.png', title: 'Contemporary Lounge', category: 'Commercial' },
  { id: 6, src: '/showcase.png', title: 'Master Bedroom', category: 'Residential' },
  { id: 7, src: '/hero.png', title: 'Penthouse View', category: 'Luxury' },
  { id: 8, src: '/design-gpt.png', title: 'AI Optimized Layout', category: 'Innovation' },
];

const Gallery = () => {
  return (
    <section id="gallery" className="section" style={{ background: 'var(--background)', padding: '8rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 10vw, 5rem)' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: 'clamp(2.2rem, 8vw, 4rem)', 
              color: 'var(--text)', 
              marginBottom: '1.5rem' 
            }}
          >
            Explore our <span style={{ color: 'var(--primary)' }}>work</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ 
              color: 'var(--text-muted)', 
              fontSize: 'clamp(1rem, 3vw, 1.2rem)', 
              maxWidth: '600px', 
              margin: '0 auto' 
            }}
          >
            A curated selection of our finest transformations, merging architectural precision with aesthetic excellence.
          </motion.p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(250px, 100%, 350px), 1fr))', 
          gap: '1.5rem' 
        }}>
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -10 }}
              style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                aspectRatio: '16/10',
                background: 'var(--surface)',
                border: '1px solid var(--glass-border)',
                cursor: 'pointer'
              }}
            >
              <img 
                src={item.src} 
                alt={item.title} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                }} 
                className="gallery-image"
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
                opacity: 0,
                transition: 'opacity 0.4s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '2rem'
              }} className="gallery-overlay">
                <span style={{ 
                  color: 'var(--primary)', 
                  fontSize: '0.75rem', 
                  fontWeight: 800, 
                  letterSpacing: '2px', 
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem'
                }}>
                  {item.category}
                </span>
                <h4 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 600 }}>{item.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .gallery-image:hover {
          transform: scale(1.05);
        }
        div:hover > .gallery-overlay {
          opacity: 1 !important;
        }
      `}} />
    </section>
  );
};

export default Gallery;
