import React from 'react';
import { Search } from 'lucide-react';
import { ThemeToggle } from '@bloom';
import NotificationPanel from './NotificationPanel';

const AppHeader = ({ 
  isDarkMode, 
  onToggleDarkMode, 
  title, 
  subtitle, 
  avatar,
  accentColor = "#FF9933",
  showSearch = true 
}) => {
  return (
    <header className="px-12 py-12 flex items-center justify-between sticky top-0 z-40 backdrop-blur-3xl bg-transparent">
      <div className="flex items-center gap-12">
        <div>
            <h1 className="text-3xl font-yatra tracking-tight">
            Namaste, <span style={{ color: accentColor }}>{title || 'Admin'}</span>
            </h1>
            <p className="font-hind text-[10px] font-black uppercase tracking-[0.2em] opacity-30 mt-1">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
        </div>

        {showSearch && (
            <div className={`hidden xl:flex items-center gap-4 px-6 py-3 rounded-2xl border transition-all ${
            isDarkMode ? 'bg-white/5 border-white/10 focus-within:border-[#FF9933]/50' : 'bg-black/5 border-black/5 focus-within:border-black/20'
            }`}>
            <Search size={18} className="opacity-40" />
            <input 
                type="text" 
                placeholder="Search system resources..." 
                className="bg-transparent border-none outline-none font-hind text-sm w-64 placeholder:opacity-40"
            />
            </div>
        )}
      </div>

      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4">
            <ThemeToggle 
              isDarkMode={isDarkMode} 
              onToggle={onToggleDarkMode} 
              accentColor={accentColor}
              duration={2}
            />
            <NotificationPanel isDarkMode={isDarkMode} isAdmin={true} />
        </div>
        
        <div className="flex items-center gap-6 text-right">
          <div>
            <p className="text-sm font-bold font-hind leading-tight">{title}</p>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40">{subtitle}</p>
          </div>
          <div className="w-12 h-12 rounded-2xl p-[2px]" style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}88)` }}>
            <div className="w-full h-full rounded-[0.9rem] bg-black flex items-center justify-center overflow-hidden">
              <img src={avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky"} alt="avatar" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
