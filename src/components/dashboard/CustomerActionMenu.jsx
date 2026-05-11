import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreVertical, User, MessageCircle, ShieldOff, History } from 'lucide-react';

const CustomerActionMenu = ({ isDarkMode, customerName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const actions = [
    { label: 'View Profile', icon: <User size={16} />, color: 'text-[#FF9933]' },
    { label: 'Message', icon: <MessageCircle size={16} />, color: 'text-indigo-400' },
    { label: 'History', icon: <History size={16} />, color: 'text-green-400' },
    { label: 'Restrict', icon: <ShieldOff size={16} />, color: 'text-red-500' },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-xl transition-all ${
          isOpen 
            ? (isDarkMode ? 'bg-white/10' : 'bg-black/5') 
            : (isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5')
        }`}
      >
        <MoreVertical size={18} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute right-0 z-[100] w-56 mt-2 p-2 rounded-3xl border backdrop-blur-xl shadow-2xl ${
              isDarkMode 
              ? 'bg-[#1A0F05]/95 border-white/10 shadow-black' 
              : 'bg-white/95 border-black/5 shadow-black/10'
            }`}
          >
            <div className="px-4 py-3 border-b border-current border-opacity-5 mb-2">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Actions for</p>
                <p className="text-sm font-bold truncate">{customerName}</p>
            </div>
            {actions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => setIsOpen(false)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left font-hind text-sm transition-all ${
                  isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
                }`}
              >
                <span className={action.color}>{action.icon}</span>
                <span className="font-medium">{action.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerActionMenu;
