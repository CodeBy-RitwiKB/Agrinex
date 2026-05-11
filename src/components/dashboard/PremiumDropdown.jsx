import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

const PremiumDropdown = ({ options, value, onChange, placeholder, isDarkMode, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value) || options.find(opt => opt === value);
  const displayLabel = selectedOption?.label || selectedOption || placeholder;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-6 py-4 rounded-2xl border transition-all outline-none font-hind flex items-center justify-between group ${
          isDarkMode 
          ? 'bg-white/5 border-white/5 hover:border-[#FF9933]/30' 
          : 'bg-black/5 border-black/5 hover:border-[#FF9933]/30'
        } ${isOpen ? 'border-[#FF9933]/50 ring-4 ring-[#FF9933]/10' : ''}`}
      >
        <span className={`${!value ? 'opacity-40' : 'opacity-100'}`}>{displayLabel}</span>
        <ChevronDown 
          size={18} 
          className={`transition-transform duration-500 ${isOpen ? 'rotate-180 text-[#FF9933]' : 'opacity-20 group-hover:opacity-100'}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute z-[100] w-full mt-3 p-2 rounded-3xl border backdrop-blur-xl shadow-2xl ${
              isDarkMode 
              ? 'bg-[#1A0F05]/95 border-white/10' 
              : 'bg-white/95 border-black/5'
            }`}
          >
            <div className="max-h-64 overflow-y-auto no-scrollbar py-1">
              {options.map((option, idx) => {
                const optValue = option.value || option;
                const optLabel = option.label || option;
                const isSelected = optValue === value;

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      onChange(optValue);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-left font-hind text-sm transition-all ${
                      isSelected 
                      ? 'bg-[#FF9933] text-[#1A0F05] font-bold' 
                      : (isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5')
                    }`}
                  >
                    {optLabel}
                    {isSelected && <Check size={16} />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PremiumDropdown;
