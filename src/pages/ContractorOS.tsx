import { useState } from 'react';
import { Camera, CheckSquare, Clock, MapPin, Upload, HardHat, FileText } from 'lucide-react';

const ContractorOS = () => {
  const [activeProject, setActiveProject] = useState('GR-1024');
  
  const projects = [
    { id: 'GR-1024', client: 'Siddharth Malhotra', city: 'Bangalore', type: 'Full Home', status: 'In Progress' },
    { id: 'GR-1025', client: 'Ananya Pandey', city: 'Bangalore', type: 'Kitchen', status: 'Pending' }
  ];

  const currentProject = projects.find(p => p.id === activeProject) || projects[0];

  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh', padding: '100px 0 60px' }}>
      <div className="container">
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          {/* Sidebar - My Jobs */}
          <div style={{ flex: '1', minWidth: '300px' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '2rem' }}>My <span style={{ color: 'var(--primary)' }}>Workforce</span> Dashboard</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {projects.map(project => (
                <button
                  key={project.id}
                  onClick={() => setActiveProject(project.id)}
                  className="glass"
                  style={{
                    padding: '1.5rem',
                    textAlign: 'left',
                    border: activeProject === project.id ? '1px solid var(--primary)' : '1px solid var(--glass-border)',
                    cursor: 'pointer',
                    transition: '0.3s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.8rem' }}>{project.id}</div>
                    <span style={{ fontSize: '0.6rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(194, 178, 128, 0.1)', color: 'var(--primary)' }}>{project.status}</span>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--text)', marginBottom: '0.4rem' }}>{project.client}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    <MapPin size={12} /> {project.city} • {project.type}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Console */}
          <div style={{ flex: '2', minWidth: '600px' }}>
            <div className="glass" style={{ padding: '2.5rem', border: '1px solid var(--glass-border)', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--text)' }}>Site Updates</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Project: {currentProject.client} ({currentProject.id})</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button style={{ padding: '0.8rem 1.5rem', background: 'var(--primary)', color: 'var(--background)', border: 'none', borderRadius: '8px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <Camera size={18} /> UPLOAD PHOTO
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Site Progress Checklist */}
                <div>
                  <h4 style={{ color: 'var(--primary)', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Site Checklist</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[
                      { task: 'Site Cleaning & Protection', done: true },
                      { task: 'Electrical Wiring Layout', done: true },
                      { task: 'Plumbing Points Check', done: false },
                      { task: 'Modular Unit Delivery', done: false },
                      { task: 'Countertop Measurement', done: false }
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                        <div style={{ width: '20px', height: '20px', borderRadius: '4px', border: '2px solid var(--primary)', background: item.done ? 'var(--primary)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {item.done && <CheckSquare size={14} color="var(--background)" />}
                        </div>
                        <span style={{ fontSize: '0.9rem', color: item.done ? 'var(--text-muted)' : 'var(--text)', textDecoration: item.done ? 'line-through' : 'none' }}>{item.task}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Site Photos */}
                <div>
                  <h4 style={{ color: 'var(--primary)', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Recent Uploads</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="glass" style={{ height: '120px', borderRadius: '12px', overflow: 'hidden' }}>
                      <img src="https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=200" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="glass" style={{ height: '120px', borderRadius: '12px', overflow: 'hidden' }}>
                      <img src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=200" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <button className="glass" style={{ height: '120px', borderRadius: '12px', border: '1px dashed var(--primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <Upload size={24} color="var(--primary)" />
                      <span style={{ fontSize: '0.7rem', fontWeight: 700 }}>ADD NEW</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Daily Report Section */}
              <div style={{ marginTop: '3rem', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h4 style={{ color: 'var(--primary)', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Daily Site Log</h4>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Date: {new Date().toLocaleDateString()}</span>
                </div>
                
                <div className="glass" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
                  <textarea 
                    placeholder="Describe today's work, workforce count, and any challenges..."
                    style={{ width: '100%', minHeight: '120px', background: 'transparent', border: 'none', color: 'var(--text)', fontSize: '0.9rem', outline: 'none', resize: 'none' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <button 
                      onClick={() => alert("Report submitted for review!")}
                      style={{ padding: '0.6rem 1.2rem', background: 'var(--primary)', color: 'var(--background)', border: 'none', borderRadius: '4px', fontWeight: 700, fontSize: '0.75rem' }}
                    >
                      SUBMIT DAILY REPORT
                    </button>
                  </div>
                </div>

                {/* Feedback from Admin/Client */}
                <div style={{ marginTop: '2rem' }}>
                  <h5 style={{ fontSize: '0.8rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary)' }}>SUPERVISOR REMARKS</h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <div className="glass" style={{ padding: '1rem', background: 'rgba(39, 201, 63, 0.05)', border: '1px solid rgba(39, 201, 63, 0.1)' }}>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text)' }}>"Wiring layout looks clean. Please ensure the plumbing points are cross-checked with the design layout before sealing."</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                        <span>— Swastik Kumar (Super Admin)</span>
                        <span>Yesterday, 4:30 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{ marginTop: '3rem', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                <div className="glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: 'rgba(194, 178, 128, 0.1)', padding: '0.8rem', borderRadius: '8px' }}>
                    <HardHat size={20} color="var(--primary)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Site Audit</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Request supervisor</div>
                  </div>
                </div>
                <div className="glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: 'rgba(194, 178, 128, 0.1)', padding: '0.8rem', borderRadius: '8px' }}>
                    <FileText size={20} color="var(--primary)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>BOM Access</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>View materials list</div>
                  </div>
                </div>
                <div className="glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: 'rgba(194, 178, 128, 0.1)', padding: '0.8rem', borderRadius: '8px' }}>
                    <Clock size={20} color="var(--primary)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Delay Alert</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Report site issues</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractorOS;
