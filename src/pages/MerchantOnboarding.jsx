import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Building2, Store, CheckCircle2, ChevronRight, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import PremiumDropdown from '../components/dashboard/PremiumDropdown';

const MerchantOnboarding = () => {
  const [step, setStep] = useState(1);
  const { 
    isDarkMode, 
    merchantName, 
    setMerchantName, 
    gstin, 
    setGstin, 
    businessType, 
    setBusinessType,
    completeOnboarding 
  } = useStore();

  const businessOptions = [
    'Retailer',
    'Wholesaler',
    'Manufacturer',
    'FPO (Farmer Producer Org)',
    'Exporter'
  ];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else completeOnboarding();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const inputClasses = `w-full px-8 py-5 rounded-3xl border transition-all outline-none font-hind text-base ${
    isDarkMode ? 'bg-white/5 border-white/10 focus:border-[#FF9933]/50 text-white' : 'bg-black/5 border-black/5 focus:border-[#FF9933]/50 text-[#1A0F05]'
  }`;

  const labelClasses = "text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-4";

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${isDarkMode ? 'bg-[#0D0804]' : 'bg-[#F5F5F3]'}`}>
      {/* Background Accents */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-20 ${isDarkMode ? 'bg-[#FF9933]' : 'bg-[#FF9933]/40'}`} />
        <div className={`absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full blur-[100px] opacity-10 ${isDarkMode ? 'bg-[#10B981]' : 'bg-[#10B981]/30'}`} />
      </div>

      <div className="w-full max-w-2xl relative">
        {/* Progress Bar */}
        <div className="flex justify-between mb-12 px-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center gap-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                step >= s ? 'bg-[#FF9933] text-[#1A0F05] shadow-lg shadow-[#FF9933]/20' : (isDarkMode ? 'bg-white/5 text-white/40' : 'bg-black/5 text-black/40')
              }`}>
                {step > s ? <CheckCircle2 size={20} /> : <span className="font-bold">{s}</span>}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest transition-opacity duration-500 ${step === s ? 'opacity-100' : 'opacity-30'}`}>
                {s === 1 ? 'Identity' : s === 2 ? 'Business' : 'Ready'}
              </span>
            </div>
          ))}
          <div className="absolute top-5 left-0 w-full h-[2px] bg-current opacity-5 -z-10 mx-auto" />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`p-12 rounded-[3.5rem] border backdrop-blur-xl ${
                isDarkMode ? 'bg-[#1A0F05]/80 border-white/5' : 'bg-white/90 border-black/5'
              } shadow-2xl`}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#FF9933]/10 flex items-center justify-center text-[#FF9933]">
                  <Store size={24} />
                </div>
                <div>
                  <h2 className="text-3xl font-yatra">Name Your Store</h2>
                  <p className="text-sm opacity-50 font-hind">This is what buyers will see on your profile.</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-3">
                  <label className={labelClasses}>Legal Store Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Aman Agri Solutions"
                    value={merchantName}
                    onChange={(e) => setMerchantName(e.target.value)}
                    className={inputClasses} 
                  />
                </div>
                
                <button 
                  onClick={handleNext}
                  disabled={!merchantName}
                  className="w-full flex items-center justify-center gap-3 py-6 rounded-3xl bg-[#FF9933] text-[#1A0F05] font-hind text-sm font-black uppercase tracking-widest hover:scale-[1.02] transition-all disabled:opacity-50 disabled:grayscale"
                >
                  Continue to Business Details
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className={`p-12 rounded-[3.5rem] border backdrop-blur-xl ${
                isDarkMode ? 'bg-[#1A0F05]/80 border-white/5' : 'bg-white/90 border-black/5'
              } shadow-2xl`}
            >
              <button onClick={handleBack} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity mb-8">
                <ArrowLeft size={14} /> Back
              </button>

              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-[#FF9933]/10 flex items-center justify-center text-[#FF9933]">
                  <Building2 size={24} />
                </div>
                <div>
                  <h2 className="text-3xl font-yatra">Business Details</h2>
                  <p className="text-sm opacity-50 font-hind">We need these for legal and tax compliance.</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-3">
                  <div className="flex justify-between items-end">
                    <label className={labelClasses}>GSTIN / Tax ID</label>
                    <span className="text-[10px] font-bold text-[#FF9933] opacity-60 uppercase tracking-widest mb-1">Optional</span>
                  </div>
                  <input 
                    type="text" 
                    placeholder="15-digit GST Number"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    className={inputClasses} 
                  />
                </div>

                <div className="space-y-3">
                  <label className={labelClasses}>Business Type</label>
                  <PremiumDropdown 
                    options={businessOptions}
                    value={businessType}
                    onChange={setBusinessType}
                    isDarkMode={isDarkMode}
                  />
                </div>
                
                <div className="flex flex-col gap-4">
                  <button 
                    onClick={handleNext}
                    className="w-full flex items-center justify-center gap-3 py-6 rounded-3xl bg-[#FF9933] text-[#1A0F05] font-hind text-sm font-black uppercase tracking-widest hover:scale-[1.02] transition-all"
                  >
                    {gstin ? 'Verify & Continue' : 'Continue as Standard'}
                    <ChevronRight size={20} />
                  </button>
                  {!gstin && (
                    <button 
                      onClick={handleNext}
                      className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-opacity"
                    >
                      Skip for now
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`p-12 rounded-[3.5rem] border backdrop-blur-xl text-center ${
                isDarkMode ? 'bg-[#1A0F05]/80 border-white/5' : 'bg-white/90 border-black/5'
              } shadow-2xl`}
            >
              <div className="w-24 h-24 rounded-full bg-[#FF9933]/10 flex items-center justify-center text-[#FF9933] mx-auto mb-8 shadow-[0_0_50px_rgba(255,153,51,0.2)]">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <Sparkles size={48} />
                </motion.div>
              </div>

              <h2 className="text-4xl font-yatra mb-4">
                {gstin ? 'Verification Successful!' : "Welcome Aboard!"}
              </h2>
              <p className="text-base opacity-60 font-hind mb-12 max-w-sm mx-auto leading-relaxed">
                {gstin 
                  ? `Your business details for ${merchantName} have been verified. You have been promoted to:`
                  : `Your merchant account for ${merchantName} is ready. You are currently browsing as a:`
                }
              </p>

              <div className="space-y-4">
                <div className={`p-6 rounded-3xl border flex items-center gap-4 ${
                  gstin 
                    ? 'bg-[#FF9933]/5 border-[#FF9933]/20' 
                    : (isDarkMode ? 'bg-white/5 border-white/5' : 'bg-black/5 border-black/5')
                }`}>
                  <ShieldCheck className={gstin ? "text-[#FF9933]" : "opacity-40"} size={28} />
                  <div className="text-left">
                    <p className="text-[10px] font-black font-hind uppercase tracking-[0.2em] opacity-40">Account Status</p>
                    <p className={`text-sm font-bold font-hind uppercase tracking-widest ${gstin ? 'text-[#FF9933]' : ''}`}>
                      {gstin ? 'Premium Merchant' : 'Standard Merchant'}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={handleNext}
                  className="w-full flex items-center justify-center gap-3 py-6 rounded-3xl bg-[#1A0F05] text-white dark:bg-white dark:text-[#1A0F05] font-hind text-sm font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-2xl"
                >
                  {gstin ? 'Enter Your Premium Dashboard' : 'Explore Your Dashboard'}
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MerchantOnboarding;
