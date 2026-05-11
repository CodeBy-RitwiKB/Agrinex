import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Save } from 'lucide-react';
import PremiumDropdown from '../PremiumDropdown';
import { useStore } from '../../../store/useStore';

const BusinessSection = ({ isDarkMode, inputClasses, labelClasses }) => {
  const { merchantName, setMerchantName, merchantType, gstin, setGstin } = useStore();
  const [businessType, setBusinessType] = useState('Retailer');
  
  const businessOptions = [
    'Retailer',
    'Wholesaler',
    'Manufacturer',
    'FPO (Farmer Producer Org)'
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className={labelClasses}>Legal Business Name</label>
          <input 
            type="text" 
            value={merchantName} 
            onChange={(e) => setMerchantName(e.target.value)}
            className={inputClasses} 
          />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className={labelClasses}>GSTIN / Tax ID</label>
            {merchantType === 'Standard Merchant' && (
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#FF9933]/10 border border-[#FF9933]/20"
              >
                <div className="w-1 h-1 rounded-full bg-[#FF9933] shadow-[0_0_8px_#FF9933]" />
                <span className="text-[9px] font-black text-[#FF9933] uppercase tracking-widest">Unlock Premium</span>
              </motion.div>
            )}
          </div>
          <div className="relative">
            <input 
              type="text" 
              placeholder="15-digit GST Number"
              value={gstin}
              onChange={(e) => setGstin(e.target.value)}
              className={`${inputClasses} ${merchantType === 'Standard Merchant' && !gstin ? 'border-[#FF9933]/30' : ''}`} 
            />
            {merchantType === 'Standard Merchant' && !gstin && (
              <p className="mt-2 text-[10px] font-medium font-hind text-[#FF9933]/60 italic ml-2">
                * Entering your GSTIN will instantly verify your business and unlock the Premium Badge.
              </p>
            )}
          </div>
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
        <div className="space-y-3">
          <label className={labelClasses}>Year Established</label>
          <input type="text" defaultValue="2018" className={inputClasses} />
        </div>
      </div>
      <div className="space-y-3">
        <label className={labelClasses}>Registered Office Address</label>
        <textarea rows={3} defaultValue="Plot No. 42, Industrial Area Phase II, Jaipur, Rajasthan - 302013" className={`${inputClasses} resize-none`} />
      </div>
      <div className="flex justify-end pt-6">
        <button className="flex items-center gap-3 px-10 py-5 rounded-2xl bg-[#FF9933] text-[#1A0F05] font-hind text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#FF9933]/20">
          <Save size={18} /> Save Business Info
        </button>
      </div>
    </div>
  );
};

export default BusinessSection;
