import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star, Clock, IndianRupee, Briefcase } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface Designer {
  id: string;
  displayName: string;
  photoURL: string;
  specialty: string;
  experience: string;
  consultationFee: string;
  projectFee: string;
  rating: number;
  reviews: number;
  bio: string;
  education?: string;
  certifications?: string;
}

const Designers = () => {
  const [designers, setDesigners] = useState<Designer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for initial WOW factor if DB is empty
  const mockDesigners: Designer[] = [
    {
      id: '1',
      displayName: 'Aarav Malhotra',
      photoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      specialty: 'Luxury Living Rooms',
      experience: '12 Years',
      consultationFee: '2500',
      projectFee: '50000',
      rating: 4.9,
      reviews: 124,
      bio: 'Award-winning designer specializing in contemporary luxury aesthetics.',
      education: 'B.Arch, School of Planning and Architecture',
      certifications: 'CID, LEED AP'
    },
    {
      id: '2',
      displayName: 'Ishani Sharma',
      photoURL: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      specialty: 'Modular Kitchens',
      experience: '8 Years',
      consultationFee: '1500',
      projectFee: '35000',
      rating: 4.8,
      reviews: 89,
      bio: 'Expert in space-saving and ergonomic kitchen solutions.',
      education: 'M.Des, National Institute of Design',
      certifications: 'Kitchen Specialist Cert.'
    },
    {
      id: '3',
      displayName: 'Vikram Singh',
      photoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      specialty: 'Commercial Spaces',
      experience: '15 Years',
      consultationFee: '5000',
      projectFee: '120000',
      rating: 4.7,
      reviews: 210,
      bio: 'Transforming workspaces into hubs of productivity and design.',
      education: 'BFA Interior Design, Parsons School of Design',
      certifications: 'Commercial Design Award 2024'
    }
  ];

  useEffect(() => {
    const fetchDesigners = async () => {
      // Safety timeout: if Firebase doesn't respond in 2 seconds, use mock data
      const timeoutId = setTimeout(() => {
        setDesigners(prev => prev.length === 0 ? mockDesigners : prev);
      }, 2000);

      try {
        const q = query(collection(db, 'users'), where('isDesigner', '==', true));
        const querySnapshot = await getDocs(q);
        const designersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Designer));
        
        clearTimeout(timeoutId);
        if (designersList.length > 0) {
          setDesigners(designersList);
        } else {
          setDesigners(mockDesigners);
        }
      } catch (error) {
        console.error("Error fetching designers:", error);
        clearTimeout(timeoutId);
        setDesigners(mockDesigners);
      } finally {
        // Done
      }
    };

    fetchDesigners();
  }, []);


  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--background)' }}>
      {/* Hero Search Section */}
      <section style={{ 
        padding: '4rem 0', 
        background: 'linear-gradient(rgba(194, 178, 128, 0.05), transparent)',
        borderBottom: '1px solid var(--glass-border)'
      }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
          >
            <h1 style={{ fontSize: '3.5rem', fontFamily: 'var(--font-serif)', marginBottom: '1.5rem' }}>
              Find Your Perfect <span style={{ color: 'var(--primary)' }}>Designer</span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '3rem' }}>
              Browse verified experts, compare fees, and book a consultation in minutes.
            </p>
            
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              background: 'var(--surface)', 
              padding: '0.8rem', 
              borderRadius: '16px',
              border: '1px solid var(--glass-border)',
              boxShadow: 'var(--shadow)'
            }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem', padding: '0 1rem' }}>
                <Search size={20} color="var(--primary)" />
                <input 
                  type="text" 
                  placeholder="Search by specialty, name, or style..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ 
                    width: '100%', 
                    background: 'transparent', 
                    border: 'none', 
                    color: 'var(--text)',
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>
              <button className="btn-primary" style={{ padding: '0.8rem 2.5rem', borderRadius: '12px' }}>
                SEARCH
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '3rem' }}>
            
            {/* Filters Sidebar */}
            <aside style={{ position: 'sticky', top: '120px', height: 'fit-content' }}>
              <div className="glass" style={{ padding: '2rem', border: '1px solid var(--glass-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '2rem' }}>
                  <Filter size={20} />
                  <h3 style={{ fontSize: '1.2rem' }}>Filters</h3>
                </div>
                
                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>Specialty</h4>
                  {['Living Room', 'Kitchen', 'Bedroom', 'Office', 'Commercial'].map(s => (
                    <label key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                      <input type="checkbox" style={{ accentColor: 'var(--primary)' }} /> {s}
                    </label>
                  ))}
                </div>

                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>Experience</h4>
                  {['0-5 Years', '5-10 Years', '10+ Years'].map(e => (
                    <label key={e} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                      <input type="radio" name="exp" style={{ accentColor: 'var(--primary)' }} /> {e}
                    </label>
                  ))}
                </div>

                <div>
                  <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '1rem' }}>Consultation Fee</h4>
                  <input type="range" style={{ width: '100%', accentColor: 'var(--primary)' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                    <span>₹0</span>
                    <span>₹5000+</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Designer Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {designers.map((designer, index) => (
                <motion.div
                  key={designer.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass"
                  style={{ 
                    padding: '2rem', 
                    display: 'grid', 
                    gridTemplateColumns: '180px 1fr 220px', 
                    gap: '2.5rem',
                    alignItems: 'center',
                    border: '1px solid var(--glass-border)',
                    transition: 'transform 0.3s ease'
                  }}
                  whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                >
                  <img 
                    src={designer.photoURL} 
                    alt={designer.displayName} 
                    style={{ 
                      width: '180px', 
                      height: '180px', 
                      borderRadius: '16px', 
                      objectFit: 'cover',
                      border: '4px solid var(--surface)'
                    }} 
                  />
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <div>
                      <h2 style={{ fontSize: '1.8rem', fontFamily: 'var(--font-serif)', marginBottom: '0.3rem' }}>{designer.displayName}</h2>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700 }}>
                        <Briefcase size={16} /> {designer.specialty}
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Clock size={16} /> {designer.experience} Exp.
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Star size={16} fill="var(--primary)" color="var(--primary)" /> {designer.rating} ({designer.reviews} reviews)
                      </span>
                    </div>

                    <p style={{ fontSize: '0.95rem', color: 'var(--text)', opacity: 0.8, lineBreak: 'anywhere' }}>
                      {designer.bio}
                    </p>

                    {(designer.education || designer.certifications) && (
                      <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
                        {designer.education && (
                          <span style={{ color: 'var(--text-muted)' }}>
                            <strong style={{ color: 'var(--text)' }}>Education:</strong> {designer.education}
                          </span>
                        )}
                        {designer.certifications && (
                          <span style={{ color: 'var(--text-muted)' }}>
                            <strong style={{ color: 'var(--text)' }}>Certifications:</strong> {designer.certifications}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div style={{ 
                    borderLeft: '1px solid var(--glass-border)', 
                    paddingLeft: '2.5rem', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center',
                    gap: '1.5rem'
                  }}>
                    <div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.2rem' }}>Consultation Fee</span>
                      <span style={{ fontSize: '1.5rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                        <IndianRupee size={18} /> {designer.consultationFee}
                      </span>
                    </div>
                    
                    <button className="btn-primary" style={{ width: '100%', padding: '1rem', borderRadius: '8px', fontSize: '0.8rem' }}>
                      BOOK CONSULT
                    </button>
                    <button className="btn-outline" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', fontSize: '0.8rem', color: 'var(--text)' }}>
                      VIEW PROFILE
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Designers;
