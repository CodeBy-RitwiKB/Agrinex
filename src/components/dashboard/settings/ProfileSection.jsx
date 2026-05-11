import React from 'react';
import { User, Save } from 'lucide-react';

const ProfileSection = ({ isDarkMode, inputClasses, labelClasses }) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-8">
        <div className="w-24 h-24 rounded-[2rem] bg-[#FF9933]/10 border border-[#FF9933]/20 flex items-center justify-center relative group overflow-hidden">
          <User size={40} className="text-[#FF9933]" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Change</span>
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="text-lg font-bold">Aman Sharma</h4>
          <p className="text-sm opacity-50 font-hind">Merchant ID: #AGR-2024-99</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className={labelClasses}>Full Name</label>
          <input type="text" defaultValue="Aman Sharma" className={inputClasses} />
        </div>
        <div className="space-y-3">
          <label className={labelClasses}>Email Address</label>
          <input type="email" defaultValue="aman@agrinex.in" className={inputClasses} />
        </div>
        <div className="space-y-3">
          <label className={labelClasses}>Phone Number</label>
          <input type="text" defaultValue="+91 98765 43210" className={inputClasses} />
        </div>
        <div className="space-y-3">
          <label className={labelClasses}>Location</label>
          <input type="text" defaultValue="Jaipur, Rajasthan" className={inputClasses} />
        </div>
      </div>
      <div className="space-y-3">
        <label className={labelClasses}>Bio / Store Description</label>
        <textarea rows={4} defaultValue="Providing premium precision farming tools and organic seeds to farmers across Northern India since 2018." className={`${inputClasses} resize-none`} />
      </div>
      <div className="flex justify-end pt-6">
        <button className="flex items-center gap-3 px-10 py-5 rounded-2xl bg-[#FF9933] text-[#1A0F05] font-hind text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#FF9933]/20">
          <Save size={18} /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;
