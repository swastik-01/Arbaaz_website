import React from 'react';

const RevenueModel = () => {
  const streams = [
    { name: "Project Fees", desc: "15–25% commission on full interior execution", price: "Flat %" },
    { name: "Design Pro", desc: "Advanced AI + Expert design iterations", price: "₹999–₹4,999" },
    { name: "Embedded Commerce", desc: "Markup or commission on BOM item sales", price: "8–15%" },
    { name: "Fulfillment Network", desc: "Monthly fees for leads and rating boosts", price: "SaaS" }
  ];

  return (
    <section id="revenue" className="section" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '2rem' }}>
              Sustainable & <span className="gradient-text">Profitable.</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '3rem' }}>
              Positive unit economics from day one. AI reduces design costs by 80%, while our zero-inventory model ensures massive scalability.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {streams.map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid var(--glass-border)' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{s.name}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{s.desc}</p>
                  </div>
                  <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{s.price}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass" style={{ padding: '3rem', textAlign: 'center' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Phase-Wise <span className="gradient-text">Expansion</span></h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {[
                { phase: "1", cities: "Bangalore, Pune", focus: "Kitchens + 2BHK" },
                { phase: "2", cities: "Hyderabad, NCR", focus: "Bedrooms + Smart Decor" },
                { phase: "3", cities: "Mumbai, Chennai", focus: "BOM Expansion" },
                { phase: "4", cities: "Tier 2 Cities", focus: "Lite Bundle Kits" }
              ].map((p, i) => (
                <div key={i} style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', textAlign: 'left' }}>
                  <div style={{ 
                    minWidth: '40px', 
                    height: '40px', 
                    borderRadius: '50%', 
                    background: 'var(--primary)', 
                    color: '#000', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontWeight: 800
                  }}>
                    {p.phase}
                  </div>
                  <div>
                    <h5 style={{ fontSize: '1.1rem' }}>{p.cities}</h5>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{p.focus}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueModel;
