import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Package, MessageSquare, Camera, Layout } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProjectOS = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { userProfile, currentUser } = useAuth();
  const currentTab = (searchParams.get('tab') as any) || 'dashboard';
  const [remarkTexts, setRemarkTexts] = useState<Record<number, string>>({});
  const [remarkPosted, setRemarkPosted] = useState<Record<number, boolean>>({});

  const setActiveTab = (tab: string) => {
    setSearchParams({ tab });
  };
  
  const projectInfo = {
    id: userProfile?.activeProject || 'GR-DEMO',
    client: currentUser?.displayName || 'Valued Client',
    location: 'Indiranagar, Bangalore',
    status: 'In Progress',
    progress: 45,
    startDate: 'May 1, 2026',
    estCompletion: 'July 15, 2026'
  };

  const hasActiveProject = !!userProfile?.activeProject;

  const dailyUpdates = [
    {
      date: 'May 8, 2026',
      status: 'Electrical First Fix',
      summary: 'Electrical wiring for the living room and kitchen has been completed. Wall chasing is done. Plumbing inspection scheduled for tomorrow.',
      images: [
        'https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=400'
      ],
      contractor: 'Aswini',
      remarks: 'Looks great! Please ensure the switchboard heights match the project plan and local standards.'
    },
    {
      date: 'May 7, 2026',
      status: 'Site Preparation',
      summary: 'Surface protection and site cleaning completed. Material unloading for modular units is in progress.',
      images: [
        'https://images.unsplash.com/photo-1589939705384-5185138a04b9?auto=format&fit=crop&q=80&w=400'
      ],
      contractor: 'Aswini',
      remarks: null
    }
  ];

  const procurement = [
    { item: 'Italian Marble Finish Tiles', qty: '1200 sqft', status: 'Delivered', date: 'May 5' },
    { item: 'Dimmable Cove LED System', qty: '10 units', status: 'In Transit', date: 'Exp May 10' },
    { item: 'High-Gloss Acrylic Cabinets', qty: '1 set', status: 'Manufacturing', date: 'Exp May 20' }
  ];



  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh', padding: '100px 0 60px' }}>
      <div className="container">
        {!hasActiveProject && (
          <div style={{ maxWidth: '640px', margin: '0 auto 2.5rem', padding: '2rem 2.5rem', background: 'rgba(194,178,128,0.08)', borderRadius: '16px', border: '1px solid rgba(194,178,128,0.3)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>🏗️</div>
            <h3 style={{ marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>No Active Project Assigned</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Hi <strong>{currentUser?.displayName?.split(' ')[0] || 'there'}</strong>! Book a consultation and we'll assign your project within 24 hours.
            </p>
            <a href="/#contact" className="btn-primary" style={{ display: 'inline-block', padding: '0.8rem 2rem', fontSize: '0.8rem', textDecoration: 'none' }}>BOOK FREE CONSULTATION</a>
          </div>
        )}
        {/* Project Header */}
        <div className="glass" style={{ padding: '2rem', marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--glass-border)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '2px' }}>{projectInfo.id}</span>
              <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(39, 201, 63, 0.1)', color: '#27c93f' }}>{projectInfo.status}</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem' }}>Track My <span style={{ color: 'var(--primary)' }}>Project</span></h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={16} /> {projectInfo.location}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={16} /> Est. Completion: {projectInfo.estCompletion}</div>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '0.5rem' }}>{projectInfo.progress}%</div>
            <div style={{ width: '200px', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${projectInfo.progress}%` }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                style={{ height: '100%', background: 'var(--primary)' }} 
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', borderBottom: '1px solid var(--glass-border)' }}>
          {[
            { id: 'dashboard', label: 'DASHBOARD', icon: <Layout size={18} /> },
            { id: 'updates', label: 'SITE UPDATES', icon: <Camera size={18} /> },
            { id: 'procurement', label: 'BOM / MATERIALS', icon: <Package size={18} /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                padding: '1rem 0',
                background: 'transparent',
                border: 'none',
                color: currentTab === tab.id ? 'var(--primary)' : 'var(--text-muted)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                position: 'relative',
                transition: '0.3s'
              }}
            >
              {tab.icon}
              {tab.label}
              {currentTab === tab.id && (
                <motion.div layoutId="activeTab" style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: '2px', background: 'var(--primary)' }} />
              )}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div style={{ minHeight: '400px' }}>
          {currentTab === 'dashboard' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              <div className="glass" style={{ padding: '2rem', border: '1px solid var(--glass-border)' }}>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Latest Site Update</h3>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px' }}>
                  <div style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>{dailyUpdates[0].date}</div>
                  <h4 style={{ marginBottom: '0.8rem' }}>{dailyUpdates[0].status}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{dailyUpdates[0].summary.substring(0, 100)}...</p>
                  <button onClick={() => setActiveTab('updates')} style={{ marginTop: '1rem', background: 'transparent', color: 'var(--primary)', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}>VIEW FULL REPORT →</button>
                </div>
              </div>

              <div className="glass" style={{ padding: '2rem', border: '1px solid var(--glass-border)' }}>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Latest Procurement</h3>
                <div style={{ background: 'rgba(194, 178, 128, 0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(194, 178, 128, 0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                    <span style={{ fontWeight: 800 }}>{procurement[0].item}</span>
                    <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', background: procurement[0].status === 'Delivered' ? 'rgba(39, 201, 63, 0.15)' : 'rgba(194, 178, 128, 0.15)', color: procurement[0].status === 'Delivered' ? '#27c93f' : 'var(--text)', fontWeight: 900 }}>{procurement[0].status}</span>
                  </div>
                  <p style={{ fontSize: '0.85rem' }}>{procurement[0].qty} expected by {procurement[0].date}</p>
                </div>
              </div>

            </div>
          ) : currentTab === 'updates' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              {dailyUpdates.map((update, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass"
                  style={{ padding: '2.5rem', border: '1px solid var(--glass-border)', display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem' }}
                >
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.5rem' }}>{update.date}</div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{update.status}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '2rem' }}>{update.summary}</p>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--background)', fontWeight: 800 }}>{update.contractor[0]}</div>
                      <span>Reported by <strong>{update.contractor}</strong></span>
                    </div>
                  </div>
                  
                  <div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                      {update.images.map((img, idx) => (
                        <div key={idx} style={{ borderRadius: '12px', overflow: 'hidden', height: '180px' }}>
                          <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      ))}
                    </div>
                    
                    {update.remarks || remarkPosted[i] ? (
                      <div className="glass" style={{ padding: '1.5rem', background: 'rgba(194, 178, 128, 0.05)', border: '1px solid var(--primary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.8rem' }}>
                          <MessageSquare size={16} color="var(--primary)" />
                          <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>Your Remark</span>
                        </div>
                        <p style={{ fontSize: '0.9rem', fontStyle: 'italic', color: 'var(--text)' }}>"{update.remarks || remarkTexts[i]}"</p>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <textarea
                          placeholder="Share your remarks or feedback on this update..."
                          value={remarkTexts[i] || ''}
                          onChange={e => setRemarkTexts(prev => ({ ...prev, [i]: e.target.value }))}
                          style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text)', fontSize: '0.85rem', outline: 'none', resize: 'none', minHeight: '80px' }}
                        />
                        <button className="btn-primary" onClick={() => { if (remarkTexts[i]?.trim()) setRemarkPosted(prev => ({ ...prev, [i]: true })); }} style={{ alignSelf: 'flex-end', padding: '0.6rem 1.5rem', fontSize: '0.8rem', color: 'var(--background)' }}>POST REMARK</button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : currentTab === 'procurement' ? (
            <div className="glass" style={{ padding: '2rem', border: '1px solid var(--glass-border)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
                    <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>ITEM</th>
                    <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>QUANTITY</th>
                    <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>STATUS</th>
                    <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>DATE</th>
                  </tr>
                </thead>
                <tbody>
                  {procurement.map((item, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                      <td style={{ padding: '1.5rem', fontWeight: 600 }}>{item.item}</td>
                      <td style={{ padding: '1.5rem', color: 'var(--text-muted)' }}>{item.qty}</td>
                      <td style={{ padding: '1.5rem' }}>
                        <span style={{ 
                          padding: '0.4rem 0.8rem', 
                          borderRadius: '20px', 
                          fontSize: '0.7rem', 
                          fontWeight: 700,
                          background: item.status === 'Delivered' ? 'rgba(39, 201, 63, 0.1)' : 'rgba(194, 178, 128, 0.1)',
                          color: item.status === 'Delivered' ? '#27c93f' : 'var(--primary)'
                        }}>
                          {item.status.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '1.5rem', color: 'var(--text-muted)' }}>{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
              <Clock size={48} style={{ opacity: 0.2, marginBottom: '1.5rem' }} />
              <h3>Full Timeline View Coming Soon</h3>
              <p>We are mapping your design milestones to real-time site execution.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectOS;
