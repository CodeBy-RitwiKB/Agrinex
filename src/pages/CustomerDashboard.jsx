import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Heart, 
  Settings, 
  LayoutDashboard,
  Truck,
  Box,
  MapPin,
  Clock
} from 'lucide-react';
import gsap from 'gsap';

// UI Components
import AppSidebar from '../components/ui/AppSidebar';
import AppHeader from '../components/ui/AppHeader';

// Customer Sub-Views
import CustomerOverview from '../components/customer/CustomerOverview';
import OrderHistoryView from '../components/customer/OrderHistoryView';
import WishlistView from '../components/customer/WishlistView';
import CustomerSettingsView from '../components/customer/CustomerSettingsView';
import { useStore } from '../store/useStore';

const CustomerDashboard = () => {
  const { user } = useStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [isDarkMode, setIsDarkMode] = useState(true); 
  const accentColor = "#FF9933"; 

  const menuItems = [
    { id: 'overview', label: 'My Command', icon: <LayoutDashboard size={20} /> },
    { id: 'orders', label: 'Order History', icon: <ShoppingBag size={20} /> },
    { id: 'wishlist', label: 'Saved Items', icon: <Heart size={20} /> },
    { id: 'settings', label: 'Profile HQ', icon: <Settings size={20} /> },
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

      <main className="flex-1 border-none overflow-x-hidden">
        <AppHeader 
          isDarkMode={isDarkMode} 
          onToggleDarkMode={setIsDarkMode} 
          title={user?.full_name || "Customer Portal"} 
          subtitle={user?.email || "Aman Agri Member"}
          accentColor={accentColor}
          avatar={user?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.full_name || 'Customer')}`}
        />


        <div className="px-12 pb-20 space-y-12 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {activeTab === 'overview' && <CustomerOverview isDarkMode={isDarkMode} />}
              {activeTab === 'orders' && <OrderHistoryView isDarkMode={isDarkMode} />}
              {activeTab === 'wishlist' && <WishlistView isDarkMode={isDarkMode} />}
              {activeTab === 'settings' && <CustomerSettingsView isDarkMode={isDarkMode} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;
