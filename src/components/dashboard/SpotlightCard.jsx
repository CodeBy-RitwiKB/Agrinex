import React from 'react';
import { Package, ArrowUpRight } from 'lucide-react';

const SpotlightCard = ({ isDarkMode }) => {
  return (
    <div className={`dash-reveal lg:col-span-4 p-10 rounded-[3rem] border overflow-hidden relative group/spotlight transition-all duration-700 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-[#FF9933]/20 via-[#0D0D0D] to-[#0D0D0D] border-white/5' 
        : 'bg-gradient-to-br from-[#FF9933] to-[#FF9933]/80 border-[#FF9933] shadow-2xl shadow-[#FF9933]/20'
    }`}>
      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-2 h-2 rounded-full animate-pulse ${isDarkMode ? 'bg-[#FF9933]' : 'bg-[#1A0F05]'}`} />
          <h3 className={`text-2xl font-yatra ${isDarkMode ? 'text-[#FF9933]' : 'text-[#1A0F05]'}`}>Elite Spotlight</h3>
        </div>
        <p className={`text-sm font-hind mb-10 leading-relaxed ${isDarkMode ? 'text-white/60' : 'text-[#1A0F05]/70'}`}>
          Your <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-[#1A0F05]'}`}>'Precision Tiller'</span> is trending in the Maharashtra region. Consider boosting the inventory.
        </p>
        <button className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-hind text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-2xl hover:scale-105 active:scale-95 ${
          isDarkMode ? 'bg-[#FF9933] text-[#1A0F05] hover:shadow-[0_0_30px_rgba(255,153,51,0.4)]' : 'bg-[#1A0F05] text-white hover:bg-black'
        }`}>
          Boost Listing <ArrowUpRight size={14} className="group-hover/spotlight:translate-x-1 group-hover/spotlight:-translate-y-1 transition-transform" />
        </button>
      </div>
      <Package size={240} className={`absolute -bottom-16 -right-16 opacity-5 transform rotate-12 group-hover/spotlight:rotate-45 group-hover/spotlight:scale-110 transition-all duration-1000 ${
        isDarkMode ? 'text-white' : 'text-black'
      }`} />
    </div>
  );
};

export default SpotlightCard;
