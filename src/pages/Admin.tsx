import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Briefcase, IndianRupee, ShieldCheck, ArrowUpRight, Settings } from 'lucide-react';
import { collection, getDocs, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const Admin = () => {
  const [activeTab, setActiveTab] = React.useState<'projects' | 'contractors'>('projects');
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [assignModal, setAssignModal] = React.useState<{ projectId: string, client: string } | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [toast, setToast] = React.useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const [cForm, setCForm] = React.useState({ name: '', city: '', phone: '', specializations: [] as string[] });

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Fetch contractors from Firestore on mount
  React.useEffect(() => {
    const fetchContractors = async () => {
      try {
        const snap = await getDocs(collection(db, 'contractors'));
        if (!snap.empty) {
          // Future: merge Firestore contractors into local state
          void snap;
        }
      } catch (e) { console.warn('Could not fetch contractors:', e); }
    };
    fetchContractors();
  }, []);

  const stats = [
    { label: 'Active Projects', value: '42', change: '+5', trend: 'up', icon: <Briefcase size={20} /> },
    { label: 'Verified Contractors', value: '128', change: '+12', trend: 'up', icon: <ShieldCheck size={20} /> },
    { label: 'Monthly Revenue', value: '₹8.4M', change: '+18%', trend: 'up', icon: <IndianRupee size={20} /> },
    { label: 'Avg. Project Score', value: '4.8', change: '+0.2', trend: 'up', icon: <TrendingUp size={20} /> }
  ];

  const [activeProjects, setActiveProjects] = React.useState([
    { id: 'GR-1024', client: 'Siddharth Malhotra', status: 'Execution', progress: '42%', contractor: 'Aswini', value: '₹12.4L' },
    { id: 'GR-1025', client: 'Ananya Pandey', status: 'Procurement', progress: '15%', contractor: 'Takshit', value: '₹8.2L' },
    { id: 'GR-1026', client: 'Varun Dhawan', status: 'Design', progress: '100%', contractor: 'Pending', value: '₹5.5L' },
    { id: 'GR-1027', client: 'Kiara Advani', status: 'Execution', progress: '68%', contractor: 'Sukhdev mahato', value: '₹22.1L' },
    { id: 'GR-1028', client: 'Ranbir Kapoor', status: 'Handover', progress: '95%', contractor: 'Badri', value: '₹18.9L' }
  ]);

  const [contractors] = React.useState([
    { id: 'CON-001', name: 'Aswini', city: 'Bangalore', phone: '8867683286', specializations: ['Civil', 'Carpentry', 'Electrical', 'Ceiling', 'Paint', 'Sofa'], score: 0.0, projects: 0, status: 'Active' },
    { id: 'CON-002', name: 'Ajith sharma', city: 'Bangalore', phone: '8147817457', specializations: ['Civil', 'Carpentry', 'Electrical', 'Ceiling', 'Paint', 'Sofa'], score: 0.0, projects: 0, status: 'Active' },
    { id: 'CON-003', name: 'Rahul sharma', city: 'Bangalore', phone: '9663809667', specializations: ['Civil', 'Carpentry', 'Electrical', 'Ceiling', 'Paint', 'Sofa'], score: 0.0, projects: 0, status: 'Active' },
    { id: 'CON-004', name: 'Takshit', city: 'Pune/Bangalore', phone: '7790867441', specializations: ['Civil', 'Carpentry', 'Electrical', 'Ceiling', 'Paint', 'Sofa'], score: 0.0, projects: 0, status: 'Active' },
    { id: 'CON-005', name: 'Sukhdev mahato', city: 'Pune', phone: '9595374033', specializations: ['Civil', 'Carpentry', 'Electrical', 'Ceiling', 'Paint', 'Sofa'], score: 0.0, projects: 0, status: 'Active' }
  ]);


  const handleAssign = async (projectId: string, contractorName: string) => {
    setActiveProjects(prev => prev.map(p =>
      p.id === projectId ? { ...p, contractor: contractorName, status: 'Procurement', progress: '5%' } : p
    ));
    try {
      // Update in Firestore if the project doc exists
      await updateDoc(doc(db, 'projects', projectId), { contractor: contractorName, status: 'Procurement' });
    } catch (e) { /* project may only be in local state */ }
    setAssignModal(null);
    showToast(`Assigned ${contractorName} successfully`);
  };

  const handleAddContractor = async () => {
    if (!cForm.name || !cForm.phone || !cForm.city) { showToast('Please fill all required fields.', 'error'); return; }
    setSaving(true);
    try {
      await addDoc(collection(db, 'contractors'), {
        ...cForm,
        score: 0.0,
        projects: 0,
        status: 'Active',
        createdAt: serverTimestamp(),
      });
      // Append to local contractors list
      showToast('Contractor onboarded successfully!');
      setShowAddModal(false);
      setCForm({ name: '', city: '', phone: '', specializations: [] });
    } catch (e) { showToast('Failed to save. Check Firestore rules.', 'error'); }
    setSaving(false);
  };


  return (
    <div style={{ background: 'var(--background)', minHeight: '100vh', padding: '8rem 0 4rem' }}>
      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999, padding: '1rem 1.5rem', borderRadius: '12px', background: toast.type === 'success' ? 'rgba(39,201,63,0.15)' : 'rgba(255,95,86,0.15)', border: `1px solid ${toast.type === 'success' ? 'rgba(39,201,63,0.4)' : 'rgba(255,95,86,0.4)'}`, color: toast.type === 'success' ? '#27c93f' : '#ff5f56', fontWeight: 700, fontSize: '0.9rem', backdropFilter: 'blur(10px)' }}>
          {toast.msg}
        </div>
      )}
      <div className="container">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--text)', marginBottom: '0.5rem' }}>Super Admin</h1>
            <p style={{ color: 'var(--text-muted)' }}>IntraSpace Operation Command Center.</p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="glass" style={{ display: 'flex', padding: '0.4rem', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
              <button 
                onClick={() => setActiveTab('projects')}
                style={{ 
                  padding: '0.6rem 1.5rem', 
                  borderRadius: '8px', 
                  border: 'none', 
                  background: activeTab === 'projects' ? 'var(--primary)' : 'transparent',
                  color: activeTab === 'projects' ? 'var(--background)' : 'var(--text-muted)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: '0.3s'
                }}
              >
                PROJECTS
              </button>
              <button 
                onClick={() => setActiveTab('contractors')}
                style={{ 
                  padding: '0.6rem 1.5rem', 
                  borderRadius: '8px', 
                  border: 'none', 
                  background: activeTab === 'contractors' ? 'var(--primary)' : 'transparent',
                  color: activeTab === 'contractors' ? 'var(--background)' : 'var(--text-muted)',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: '0.3s'
                }}
              >
                CONTRACTORS
              </button>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
            >
              + ADD CONTRACTOR
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass" 
              style={{ padding: '1.5rem', border: '1px solid var(--glass-border)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ padding: '0.5rem', background: 'rgba(194, 178, 128, 0.1)', color: 'var(--primary)', borderRadius: '8px' }}>
                  {stat.icon}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.8rem', color: stat.trend === 'up' ? '#27c93f' : '#ff5f56', fontWeight: 700 }}>
                  <ArrowUpRight size={14} /> {stat.change}
                </div>
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>{stat.label}</div>
              <div style={{ color: 'var(--text)', fontSize: '1.8rem', fontWeight: 700 }}>{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Area */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          {/* Main Table */}
          <div className="glass" style={{ padding: '2rem', border: '1px solid var(--glass-border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ color: 'var(--text)', fontSize: '1.2rem' }}>
                {activeTab === 'projects' ? 'Active Projects Oversight' : 'Contractor Network'}
              </h3>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.8rem' }}>Filter</button>
              </div>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
                {activeTab === 'projects' ? (
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
                        <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.8rem' }}>PROJECT ID</th>
                        <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.8rem' }}>CLIENT</th>
                        <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.8rem' }}>PROGRESS</th>
                        <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.8rem' }}>CONTRACTOR</th>
                        <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.8rem' }}>VALUE</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeProjects.map(project => (
                        <tr key={project.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                          <td style={{ padding: '1.2rem 1rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>{project.id}</td>
                          <td style={{ padding: '1.2rem 1rem' }}>
                            <div style={{ color: 'var(--text)', fontWeight: 600, fontSize: '0.9rem' }}>{project.client}</div>
                          </td>
                          <td style={{ padding: '1.2rem 1rem' }}>
                            <div style={{ width: '100px', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginBottom: '0.4rem' }}>
                              <div style={{ width: project.progress, height: '100%', background: 'var(--primary)', borderRadius: '2px' }} />
                            </div>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{project.status} ({project.progress})</span>
                          </td>
                          <td style={{ padding: '1.2rem 1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            {project.contractor === 'Pending' ? (
                              <button 
                                onClick={() => setAssignModal({ projectId: project.id, client: project.client })}
                                style={{ background: 'rgba(194, 178, 128, 0.1)', color: 'var(--primary)', border: '1px solid var(--primary)', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800, cursor: 'pointer' }}
                              >
                                ASSIGN
                              </button>
                            ) : project.contractor}
                          </td>
                          <td style={{ padding: '1.2rem 1rem', color: 'var(--text)', fontWeight: 700, fontSize: '0.9rem' }}>{project.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : activeTab === 'contractors' ? (
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left' }}>
                        <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.8rem' }}>NAME</th>
                        <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.8rem' }}>SPECIALIZATIONS</th>
                        <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.8rem' }}>SCORE</th>
                        <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.8rem' }}>PHONE</th>
                        <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.8rem' }}>STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contractors.map(c => (
                        <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                          <td style={{ padding: '1.2rem 1rem' }}>
                            <div style={{ color: 'var(--text)', fontWeight: 600, fontSize: '0.9rem' }}>{c.name}</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{c.city}</div>
                          </td>
                          <td style={{ padding: '1.2rem 1rem' }}>
                            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                              {c.specializations.map(s => (
                                <span key={s} style={{ fontSize: '0.6rem', padding: '2px 6px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', color: 'var(--text-muted)' }}>{s}</span>
                              ))}
                            </div>
                          </td>
                          <td style={{ padding: '1.2rem 1rem' }}>
                            <div style={{ color: 'var(--primary)', fontWeight: 800 }}>{c.score.toFixed(1)}</div>
                          </td>
                          <td style={{ padding: '1.2rem 1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{c.phone}</td>
                          <td style={{ padding: '1.2rem 1rem' }}>
                            <span style={{ 
                              padding: '0.3rem 0.6rem', 
                              borderRadius: '20px', 
                              fontSize: '0.7rem', 
                              fontWeight: 700,
                              background: c.status === 'Active' ? 'rgba(39, 201, 63, 0.1)' : 'rgba(255, 189, 46, 0.1)',
                              color: c.status === 'Active' ? '#27c93f' : '#ffbd2e'
                            }}>
                              {c.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : null}
            </div>
          </div>

          {/* Activity & Quick Tools */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="glass" style={{ padding: '2rem', border: '1px solid var(--glass-border)' }}>
              <h3 style={{ color: 'var(--text)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
                {activeTab === 'projects' ? 'Contractor Quality' : 'Recent Applications'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {activeTab === 'projects' ? (
                  <>
                    {[
                      { name: 'Rajesh Kumar', score: 4.9, jobs: 12 },
                      { name: 'Amit Singh', score: 4.7, jobs: 8 },
                      { name: 'Suresh Raina', score: 4.5, jobs: 15 }
                    ].map(c => (
                      <div key={c.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{c.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.jobs} Projects Completed</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ color: 'var(--primary)', fontWeight: 800 }}>{c.score}</div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {[
                      { name: 'Arun Jaitley', city: 'Delhi', type: 'Civil' },
                      { name: 'Priya Sharma', city: 'Mumbai', type: 'Design' }
                    ].map(app => (
                      <div key={app.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{app.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{app.type} • {app.city}</div>
                        </div>
                        <button style={{ padding: '0.4rem 0.8rem', background: 'var(--primary)', color: 'var(--background)', border: 'none', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700 }}>REVIEW</button>
                      </div>
                    ))}
                  </>
                )}
                <button 
                  onClick={() => setActiveTab(activeTab === 'projects' ? 'contractors' : 'projects')}
                  style={{ width: '100%', padding: '0.8rem', background: 'rgba(194, 178, 128, 0.1)', color: 'var(--primary)', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '0.8rem', marginTop: '1rem' }}
                >
                  {activeTab === 'projects' ? 'MANAGE NETWORK' : 'BACK TO PROJECTS'}
                </button>
              </div>
            </div>

            <div className="glass" style={{ padding: '2rem', border: '1px solid var(--glass-border)' }}>
              <h3 style={{ color: 'var(--text)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Quick Controls</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <button className="glass" style={{ padding: '1rem', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                  <TrendingUp size={20} color="var(--primary)" style={{ margin: '0 auto 0.5rem' }} />
                  <div style={{ fontSize: '0.7rem', fontWeight: 700 }}>PAYOUTS</div>
                </button>
                <button className="glass" style={{ padding: '1rem', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                  <Settings size={20} color="var(--primary)" style={{ margin: '0 auto 0.5rem' }} />
                  <div style={{ fontSize: '0.7rem', fontWeight: 700 }}>CONFIG</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add Contractor Modal */}
        {showAddModal && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div onClick={() => setShowAddModal(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass"
              style={{ width: '100%', maxWidth: '500px', padding: '3rem', position: 'relative', border: '1px solid var(--glass-border)' }}
            >
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '2rem' }}>Add New Contractor</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <input type="text" placeholder="Full Name *" value={cForm.name} onChange={e => setCForm(p => ({ ...p, name: e.target.value }))} style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text)' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <input type="text" placeholder="City *" value={cForm.city} onChange={e => setCForm(p => ({ ...p, city: e.target.value }))} style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text)' }} />
                  <input type="tel" placeholder="Phone *" value={cForm.phone} onChange={e => setCForm(p => ({ ...p, phone: e.target.value }))} style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text)' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'block' }}>SPECIALIZATIONS</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    {['Civil', 'Carpentry', 'Electrical', 'Ceiling', 'Paint', 'Sofa'].map(s => (
                      <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                        <input type="checkbox" checked={cForm.specializations.includes(s)} onChange={() => setCForm(p => ({ ...p, specializations: p.specializations.includes(s) ? p.specializations.filter(x => x !== s) : [...p.specializations, s] }))} style={{ accentColor: 'var(--primary)' }} /> {s}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                   <button onClick={() => setShowAddModal(false)} style={{ flex: 1, padding: '1rem', background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text)', borderRadius: '8px' }}>CANCEL</button>
                   <button onClick={handleAddContractor} disabled={saving} style={{ flex: 1, padding: '1rem', background: 'var(--primary)', border: 'none', color: 'var(--background)', borderRadius: '8px', fontWeight: 700, opacity: saving ? 0.7 : 1 }}>{saving ? 'SAVING...' : 'ONBOARD CONTRACTOR'}</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        {/* Assign Contractor Modal */}
        {assignModal && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div onClick={() => setAssignModal(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass"
              style={{ width: '100%', maxWidth: '500px', padding: '3rem', position: 'relative', border: '1px solid var(--glass-border)' }}
            >
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1rem' }}>Assign Contractor</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Project: {assignModal.projectId} • {assignModal.client}</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                {contractors.filter(c => c.status === 'Active').map(c => (
                  <button 
                    key={c.id}
                    onClick={() => handleAssign(assignModal.projectId, c.name)}
                    className="glass"
                    style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      padding: '1.2rem', 
                      textAlign: 'left', 
                      border: '1px solid var(--glass-border)',
                      cursor: 'pointer',
                      transition: '0.2s'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--text)' }}>{c.name}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{c.specializations[0]}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ color: 'var(--primary)', fontWeight: 800 }}>{c.score}</div>
                      <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Quality</div>
                    </div>
                  </button>
                ))}
              </div>
              
              <button onClick={() => setAssignModal(null)} style={{ width: '100%', padding: '1rem', background: 'transparent', border: '1px solid var(--glass-border)', color: 'var(--text)', borderRadius: '8px', marginTop: '2rem' }}>CANCEL</button>
            </motion.div>
          </div>
        )}
        {/* Add Product Modal (Amazon/Flipkart Grade) */}
      </div>
    </div>
  );
};

export default Admin;
