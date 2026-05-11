import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  LogOut, 
  Plus,
  Users,
  Sparkles
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getCloudinaryUrl } from '../../utils/cloudinary';
import { useStore } from '../../store/useStore';

const logo = getCloudinaryUrl('logo');

const Sidebar = ({ activeTab, setActiveTab, isDarkMode }) => {
  const { merchantType, setSettingsSection, gstin } = useStore();
  const navigate = useNavigate();
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'inventory', label: 'Inventory', icon: <Package size={20} /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingCart size={20} /> },
    { id: 'customers', label: 'Customers', icon: <Users size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className={`w-80 h-screen sticky top-0 border-r flex flex-col ${isDarkMode ? 'bg-[#0D0D0D] border-white/5' : 'bg-white border-black/5'}`}>
      <div className="p-8 mb-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500">
            <img src={logo} alt="Agrinex" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,153,51,0.4)]" />
          </div>
          <span className="text-2xl font-yatra tracking-tight">Agri<span className="text-[#FF9933]">nex</span></span>
        </Link>
      </div>

      <nav className="flex-1 px-6 space-y-1 overflow-y-auto no-scrollbar">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] transition-all duration-500 group relative ${
              activeTab === item.id 
                ? (isDarkMode ? 'bg-[#FF9933] text-[#1A0F05]' : 'bg-[#1A0F05] text-white shadow-2xl') 
                : 'opacity-40 hover:opacity-100 hover:translate-x-2'
            }`}
          >
            {item.icon}
            <span className="font-hind text-sm font-bold uppercase tracking-widest">{item.label}</span>
            {activeTab === item.id && (
              <motion.div 
                layoutId="activeGlow"
                className="absolute inset-0 rounded-[1.5rem] shadow-[0_0_30px_rgba(255,153,51,0.3)] pointer-events-none" 
              />
            )}
          </button>
        ))}
      </nav>

      <div className="p-6 space-y-3 mt-auto">
        {merchantType === 'Standard Merchant' && !gstin && (
          <button 
            onClick={() => {
              setActiveTab('settings');
              setSettingsSection('business');
            }}
            className="w-full group relative p-[1px] rounded-[1.5rem] bg-gradient-to-br from-[#FF9933] to-[#FF9933]/20 overflow-hidden hover:scale-[1.02] transition-all"
          >
            <div className={`flex items-center gap-4 px-6 py-4 rounded-[1.4rem] transition-all ${isDarkMode ? 'bg-[#1A0F05] text-[#FF9933]' : 'bg-white text-[#FF9933]'}`}>
              <div className="relative">
                <Sparkles size={18} className="relative z-10 animate-pulse" />
                <div className="absolute inset-0 bg-[#FF9933] blur-lg opacity-20" />
              </div>
              <span className="font-hind text-[10px] font-black uppercase tracking-widest text-left leading-tight">Upgrade to<br />Premium</span>
            </div>
          </button>
        )}
        <button 
          onClick={() => setActiveTab('new_listing')}
          className={`w-full flex items-center gap-4 px-6 py-4 rounded-[1.5rem] transition-all border border-[#FF9933]/30 text-[#FF9933] hover:bg-[#FF9933]/10 ${activeTab === 'new_listing' ? 'bg-[#FF9933]/20 shadow-lg shadow-[#FF9933]/10' : ''}`}
        >
          <Plus size={20} />
          <span className="font-hind text-[10px] font-black uppercase tracking-widest">New Listing</span>
        </button>
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

export default Sidebar;
