import React from 'react';
import { Search, Sun, Moon } from 'lucide-react';
import NotificationPanel from '../ui/NotificationPanel';
import BloomReveal from '../../lib/bloom/BloomReveal';
import { useStore } from '../../store/useStore';

const DashboardHeader = ({ isDarkMode, onToggleDarkMode }) => {
  const { user } = useStore();

  return (
    <header className="px-12 py-10 flex items-center justify-between relative z-50">
      <div>
        <h1 className="text-3xl font-yatra tracking-tight">
          Namaste, <span className="text-[#FF9933]">{user?.full_name || 'Merchant'}</span>
        </h1>
        <p className="font-hind text-xs opacity-40 uppercase tracking-[0.2em] mt-1">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      </div>

      <div className="flex items-center gap-8">
        <div className="hidden lg:flex items-center gap-10">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} opacity-40 hover:opacity-100 transition-opacity cursor-pointer hidden md:block`}>
              <Search size={20} />
            </div>
            <NotificationPanel isDarkMode={isDarkMode} />
            <BloomReveal isDarkMode={isDarkMode} onToggle={onToggleDarkMode} duration={1.5}>
              <button
                className={`p-3 rounded-2xl transition-all relative group ${isDarkMode ? 'bg-[#FF9933]/10 text-[#FF9933]' : 'bg-black/5 text-[#FF9933]'
                  } hover:scale-110 active:scale-95`}
              >
                <div className={`absolute inset-0 rounded-2xl bg-[#FF9933]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative z-10">
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </div>
              </button>
            </BloomReveal>
          </div>

          <div className="flex items-center gap-4 border-l border-white/10 pl-10">
            <div className="text-right">
              <p className="font-bold text-sm">{user?.full_name || 'Merchant'}</p>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#FF9933]">Premium Store</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF9933] to-[#FF6600] p-[2px]">
              <div className="w-full h-full rounded-[0.9rem] bg-[#0D0D0D] flex items-center justify-center overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
