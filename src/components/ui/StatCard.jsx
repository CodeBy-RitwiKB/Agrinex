import React, { memo } from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

const StatCard = memo(({ label, value, change, icon, accentColor = "#FF9933", i = 0, isDarkMode, isSelected }) => {
  return (
    <GlassCard 
      delay={i * 0.1} 
      isDarkMode={isDarkMode}
      className={`${isSelected ? `border-[${accentColor}]/30 shadow-2xl shadow-[${accentColor}]/5` : ''}`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`} style={{ color: accentColor }}>
          {icon}
        </div>
        <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
          change.startsWith('+') ? 'text-green-500 bg-green-500/10' : 'text-red-500 bg-red-500/10'
        }`}>
          {change}
        </span>
      </div>
      <h3 className="text-sm font-hind opacity-40 uppercase tracking-[0.3em] mb-2">{label}</h3>
      <p className="text-4xl font-yatra tracking-tight">{value}</p>
    </GlassCard>
  );
});

export default StatCard;
