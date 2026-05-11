import React from 'react';

const TabHeading = ({ title, highlight, subtitle, showReset, onReset, isDarkMode }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-4xl font-yatra">{title} <span className="text-[#FF9933]">{highlight}</span></h2>
        <p className="text-xs font-hind opacity-40 uppercase tracking-[0.3em]">
          {subtitle}
        </p>
      </div>
      {showReset && (
        <button 
          onClick={onReset}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-hind text-[10px] font-black uppercase tracking-widest transition-all ${
            isDarkMode ? 'bg-white/10 hover:bg-white/20' : 'bg-black/5 hover:bg-black/10'
          }`}
        >
          Back to Overview
        </button>
      )}
    </div>
  );
};

export default TabHeading;
