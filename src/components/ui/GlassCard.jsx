import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = "", delay = 0, isDarkMode, hover = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      style={{ backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
      className={`dash-reveal p-8 rounded-[2.5rem] border backdrop-blur-xl transition-all ${
        hover ? 'hover:scale-[1.01] hover:shadow-2xl' : ''
      } ${
        isDarkMode 
          ? 'bg-white/5 border-white/5 hover:border-white/10' 
          : 'bg-white border-black/5 shadow-sm'
      } ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
