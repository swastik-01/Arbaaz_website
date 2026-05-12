import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, Home, Layers, Palette, IndianRupee, Clock, MapPin, CheckCircle } from 'lucide-react';

interface OnboardingQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  {
    id: 1,
    title: "Property Type",
    subtitle: "What kind of space are we transforming?",
    icon: <Home size={24} />,
    options: ["Apartment", "Villa / Row House", "Studio", "Commercial / Office"]
  },
  {
    id: 2,
    title: "Project Scope",
    subtitle: "How much of your home needs a makeover?",
    icon: <Layers size={24} />,
    options: ["Full Home", "Living Room + Kitchen", "Kitchen Only", "Select Rooms"]
  },
  {
    id: 3,
    title: "Configuration",
    subtitle: "Select your home size",
    icon: <CheckCircle size={24} />,
    options: ["1 BHK", "2 BHK", "3 BHK", "4 BHK+", "Custom"]
  },
  {
    id: 4,
    title: "Design Style",
    subtitle: "Which aesthetic speaks to you?",
    icon: <Palette size={24} />,
    options: ["Modern Minimalist", "Classic Luxury", "Industrial Loft", "Bohemian Chic"]
  },
  {
    id: 5,
    title: "Budget Range",
    subtitle: "Select your preferred investment level",
    icon: <IndianRupee size={24} />,
    options: ["Economy (Value)", "Standard (Balanced)", "Premium (Luxury)", "Ultra (Elite)"]
  },
  {
    id: 6,
    title: "Timeline",
    subtitle: "When do you want to move in?",
    icon: <Clock size={24} />,
    options: ["Immediate (< 1 Month)", "1-3 Months", "3-6 Months", "Just Planning"]
  },
  {
    id: 7,
    title: "Location",
    subtitle: "Where is your property located?",
    icon: <MapPin size={24} />,
    options: ["Mumbai", "Delhi / NCR", "Bangalore", "Other"]
  }
];

const OnboardingQuiz: React.FC<OnboardingQuizProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (option: string) => {
    setAnswers({ ...answers, [currentStep]: option });
    if (currentStep < steps.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    setIsProcessing(true);
    // Simulate AI Processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowResult(true);
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={showResult ? 'result' : 'quiz'}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          style={{
            width: '100%',
            maxWidth: '800px',
            background: 'var(--background)',
            borderRadius: '32px',
            overflow: 'hidden',
            position: 'relative',
            border: '1px solid var(--glass-border)',
            boxShadow: '0 50px 100px rgba(0,0,0,0.5)'
          }}
        >
          <button 
            onClick={onClose}
            style={{ position: 'absolute', top: '2rem', right: '2rem', color: 'var(--text-muted)', background: 'transparent', zIndex: 10, border: 'none', cursor: 'pointer' }}
          >
            <X size={24} />
          </button>

          {!showResult ? (
            <div style={{ padding: '4rem' }}>
              {isProcessing ? (
                <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    style={{ width: '80px', height: '80px', border: '4px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 2rem' }}
                  />
                  <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', marginBottom: '1rem' }}>Project Planner is Reviewing...</h2>
                  <p style={{ color: 'var(--text-muted)' }}>Analyzing your inputs and generating execution-ready layouts.</p>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '3rem' }}>
                    {steps.map((_, idx) => (
                      <div key={idx} style={{ 
                        flex: 1, 
                        height: '4px', 
                        background: idx <= currentStep ? 'var(--primary)' : 'var(--glass-border)',
                        borderRadius: '2px',
                        transition: 'background 0.3s ease'
                      }} />
                    ))}
                  </div>

                  <div style={{ marginBottom: '3rem' }}>
                    <div style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                      {steps[currentStep].icon}
                      <span style={{ fontWeight: 700, letterSpacing: '2px', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                        Step {currentStep + 1} of 7
                      </span>
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem' }}>
                      {steps[currentStep].title}
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                      {steps[currentStep].subtitle}
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    {steps[currentStep].options.map(option => (
                      <motion.div
                        key={option}
                        whileHover={{ scale: 1.02, background: 'var(--surface)' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelect(option)}
                        style={{
                          padding: '1.5rem 2rem',
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid var(--glass-border)',
                          borderRadius: '16px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '1.1rem',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {option}
                        <ArrowRight size={18} color="var(--primary)" />
                      </motion.div>
                    ))}
                  </div>

                  {currentStep > 0 && (
                    <button 
                      onClick={() => setCurrentStep(prev => prev - 1)}
                      style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer' }}
                    >
                      <ArrowLeft size={18} /> BACK
                    </button>
                  )}
                </>
              )}
            </div>
          ) : (
            <div style={{ padding: '0' }}>
              <div style={{ background: 'var(--primary)', padding: '4rem', color: '#fff', textAlign: 'center' }}>
                <CheckCircle size={60} style={{ marginBottom: '1.5rem' }} />
                <h2 style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', marginBottom: '1rem' }}>Your Quote is Ready!</h2>
                <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>Based on your inputs, here is your project estimate.</p>
              </div>
              
              <div style={{ padding: '4rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
                  <div className="glass" style={{ padding: '2rem', border: '1px solid var(--glass-border)' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Layout Overview</h3>
                    <div style={{ aspectRatio: '16/9', background: 'var(--surface)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                      [ 3D LAYOUT PREVIEW MOCKUP ]
                    </div>
                    <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Style</span>
                        <div style={{ fontWeight: 600 }}>{answers[3]}</div>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Timeline</span>
                        <div style={{ fontWeight: 600 }}>{answers[5]}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass" style={{ padding: '2rem', border: '1px solid var(--primary)', background: 'rgba(194, 178, 128, 0.05)' }}>
                      <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 800, letterSpacing: '1px' }}>FIXED PRICE QUOTE</span>
                      <div style={{ fontSize: '3rem', fontWeight: 900, margin: '0.5rem 0' }}>₹12,45,000*</div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>*Inclusive of all materials, labour, and management.</p>
                    </div>

                    <button className="btn-primary" style={{ padding: '1.2rem', fontSize: '1rem', width: '100%' }}>
                      BOOK SITE VISIT
                    </button>
                    <button className="btn-outline" style={{ padding: '1.2rem', fontSize: '1rem', width: '100%', color: 'var(--text)' }}>
                      DOWNLOAD BOM (PDF)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OnboardingQuiz;
