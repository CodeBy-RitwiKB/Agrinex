import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  Package, 
  Settings,
} from 'lucide-react';
import gsap from 'gsap';

// UI Components
import AppSidebar from '../components/ui/AppSidebar';
import AppHeader from '../components/ui/AppHeader';

// Admin Sub-Views
import AdminOverview from '../components/admin/AdminOverview';
import MerchantHub from '../components/admin/MerchantHub';
import MarketModeration from '../components/admin/MarketModeration';
import GlobalInventory from '../components/admin/GlobalInventory';
import SystemConfig from '../components/admin/SystemConfig';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isDarkMode, setIsDarkMode] = useState(true); 
  const accentColor = "#6366F1"; 

  const menuItems = [
    { id: 'overview', label: 'Platform Command', icon: <LayoutDashboard size={20} /> },
    { id: 'merchants', label: 'Merchant Hub', icon: <Users size={20} /> },
    { id: 'moderation', label: 'Moderation', icon: <ShieldCheck size={20} /> },
    { id: 'inventory', label: 'Global Inventory', icon: <Package size={20} /> },
    { id: 'settings', label: 'System Config', icon: <Settings size={20} /> },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".admin-reveal", 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.2, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, [activeTab]);

  return (
    <div className={`flex min-h-screen relative overflow-hidden transition-none ${isDarkMode ? 'bg-[#08080A] text-white' : 'bg-[#FAFAFA] text-[#1A0F05]'}`}>
      <AppSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isDarkMode={isDarkMode} 
        menuItems={menuItems}
        accentColor={accentColor}
      />

      <main 
        className="flex-1 border-none overflow-x-hidden" 
        style={isDarkMode ? { backgroundColor: '#08080A' } : { backgroundColor: '#FAFAFA' }}
      >
        <AppHeader 
          isDarkMode={isDarkMode} 
          onToggleDarkMode={setIsDarkMode} 
          title="Agrinex HQ" 
          subtitle="System Administrator"
          accentColor={accentColor}
          avatar="https://api.dicebear.com/7.x/bottts/svg?seed=Admin"
        />

        <div className="px-12 pb-20 space-y-12 relative z-10">
          <div key={activeTab}>
            {activeTab === 'overview' && <AdminOverview isDarkMode={isDarkMode} accentColor={accentColor} />}
            {activeTab === 'merchants' && <MerchantHub isDarkMode={isDarkMode} />}
            {activeTab === 'moderation' && <MarketModeration isDarkMode={isDarkMode} />}
            {activeTab === 'inventory' && <GlobalInventory isDarkMode={isDarkMode} />}
            {activeTab === 'settings' && <SystemConfig isDarkMode={isDarkMode} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
