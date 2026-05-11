import React from 'react';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getCloudinaryUrl } from '../../utils/cloudinary';

const logo = getCloudinaryUrl('logo');

const AppSidebar = ({ 
  activeTab, 
  setActiveTab, 
  isDarkMode, 
  menuItems, 
  bottomAction,
  accentColor = "#FF9933" 
}) => {
  const navigate = useNavigate();

  return (
    <aside className={`w-80 h-screen sticky top-0 flex flex-col border-none ${isDarkMode ? 'bg-gradient-to-r from-[#080808] to-[#08080A]' : 'bg-white border-r border-black/5'}`}>
      <div className="p-8 mb-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500">
            <img src={logo} alt="Agrinex" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,153,51,0.4)]" />
          </div>
          <span className="text-2xl font-yatra tracking-tight">Agri<span style={{ color: accentColor }}>nex</span></span>
        </Link>
      </div>

      <nav className="flex-1 px-6 space-y-1 overflow-y-auto no-scrollbar">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] transition-all duration-500 group relative ${
              activeTab === item.id 
                ? (isDarkMode ? `bg-[${accentColor}] text-[#1A0F05]` : `bg-[#1A0F05] text-white shadow-2xl`) 
                : 'opacity-40 hover:opacity-100 hover:translate-x-2'
            }`}
            style={activeTab === item.id && isDarkMode ? { backgroundColor: accentColor } : {}}
          >
            {item.icon}
            <span className="font-hind text-sm font-bold uppercase tracking-widest">{item.label}</span>
            {activeTab === item.id && (
              <motion.div 
                layoutId="activeGlow"
                className="absolute inset-0 rounded-[1.5rem] pointer-events-none" 
                style={{ boxShadow: `0 0 30px ${accentColor}44` }}
              />
            )}
          </button>
        ))}
      </nav>

      <div className="p-6 space-y-3 mt-auto">
        {bottomAction}
        <button 
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] transition-all opacity-40 hover:opacity-100 hover:text-red-500"
        >
          <LogOut size={20} />
          <span className="font-hind text-[10px] font-black uppercase tracking-widest">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
