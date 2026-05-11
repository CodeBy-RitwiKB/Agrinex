import React, { useState, useEffect } from 'react';
import { motion, animate, useMotionValue, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatsCard = ({ stat, i, isDarkMode }) => {
  const stringValue = String(stat.value || '0');
  const rawValue = stringValue.replace(/[^0-9.]/g, '');
  const numericValue = parseFloat(rawValue) || 0;
  
  const [displayValue, setDisplayValue] = useState(stringValue);

  useEffect(() => {
    if (stringValue === '...') {
      setDisplayValue('...');
      return;
    }

    // Animate from 0 to current value for a fresh "reveal"
    const controls = animate(0, numericValue, {
      duration: 1.5,
      delay: 0.1,
      ease: [0.16, 1, 0.3, 1], // Custom ultra-smooth ease
      onUpdate: (latest) => {
        if (stringValue.includes('₹')) {
          setDisplayValue(`₹${Math.floor(latest).toLocaleString('en-IN')}`);
        } else if (stringValue.includes('%')) {
          setDisplayValue(`${latest.toFixed(1)}%`);
        } else {
          setDisplayValue(Math.floor(latest).toLocaleString());
        }
      }
    });
    return controls.stop;
  }, [numericValue, stringValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className={`p-8 rounded-[2.5rem] border group transition-all cursor-default ${
        isDarkMode 
          ? 'bg-white/5 border-white/5 hover:bg-white/[0.08] hover:border-[#FF9933]/30' 
          : 'bg-white border-black/5 hover:border-black/20 shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between mb-6">
        <div className={`p-4 rounded-2xl transition-colors ${
          isDarkMode ? 'bg-white/5 group-hover:bg-[#FF9933]/20' : 'bg-[#FF9933]/10 group-hover:bg-[#FF9933]/20'
        }`}>
          {stat.icon}
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
          stat.trend === 'up' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
        }`}>
          {stat.trend === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
          {stat.change}
        </div>
      </div>
      
      <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-1">{stat.label}</p>
      <motion.h3 className="text-3xl font-yatra tracking-tight group-hover:text-[#FF9933] transition-colors">
        {displayValue}
      </motion.h3>
      
      <div className="mt-4 h-1 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${stat.progress}%` }}
          transition={{ duration: 1.5, delay: 0.5 + (i * 0.1), ease: "circOut" }}
          className="h-full bg-[#FF9933] rounded-full"
        />
      </div>
    </motion.div>
  );
};

export default StatsCard;
