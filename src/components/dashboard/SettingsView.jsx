import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Building2, Bell, ShieldCheck } from 'lucide-react';
import TabHeading from './TabHeading';

// Sub-sections
import ProfileSection from './settings/ProfileSection';
import BusinessSection from './settings/BusinessSection';
import NotificationsSection from './settings/NotificationsSection';
import SecuritySection from './settings/SecuritySection';

// Store
import { useStore } from '../../store/useStore';

const SettingsView = ({ isDarkMode }) => {
  const { settingsSection: activeSection, setSettingsSection: setActiveSection } = useStore();
  
  const sections = [
    { id: 'profile', label: 'Merchant Profile', icon: <User size={20} /> },
    { id: 'business', label: 'Business Details', icon: <Building2 size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
    { id: 'security', label: 'Security & Access', icon: <ShieldCheck size={20} /> },
  ];

  const inputClasses = `w-full px-6 py-4 rounded-2xl border transition-all outline-none font-hind ${
    isDarkMode ? 'bg-white/5 border-white/5' : 'bg-black/5 border-black/5'
  } focus:border-[#FF9933]/50`;

  const labelClasses = "text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ml-4";

  return (
    <div className="space-y-12 dash-reveal">
      <TabHeading 
        title="Account"
        highlight="Settings"
        subtitle="Configure your store and personal preferences"
        isDarkMode={isDarkMode}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar Nav */}
        <div className="lg:col-span-3 space-y-2">
            {sections.map((section) => (
                <button 
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl font-hind text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                        activeSection === section.id 
                        ? (isDarkMode ? 'bg-[#FF9933] text-[#1A0F05]' : 'bg-[#1A0F05] text-white shadow-xl')
                        : 'opacity-40 hover:opacity-100 hover:translate-x-2'
                    }`}
                >
                    {section.icon}
                    {section.label}
                </button>
            ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
                <motion.div 
                    key={activeSection}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={`p-10 rounded-[3rem] border ${
                        isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-black/5 shadow-sm'
                    }`}
                >
                    {activeSection === 'profile' && (
                        <>
                            <h3 className="text-2xl font-yatra mb-10">Public Profile</h3>
                            <ProfileSection isDarkMode={isDarkMode} inputClasses={inputClasses} labelClasses={labelClasses} />
                        </>
                    )}

                    {activeSection === 'business' && (
                        <>
                            <h3 className="text-2xl font-yatra mb-10">Business Registration</h3>
                            <BusinessSection 
                                isDarkMode={isDarkMode} 
                                inputClasses={inputClasses} 
                                labelClasses={labelClasses} 
                            />
                        </>
                    )}

                    {activeSection === 'notifications' && (
                        <>
                            <h3 className="text-2xl font-yatra mb-10">Notification Preferences</h3>
                            <NotificationsSection isDarkMode={isDarkMode} />
                        </>
                    )}

                    {activeSection === 'security' && (
                        <>
                            <h3 className="text-2xl font-yatra mb-10">Security & Access</h3>
                            <SecuritySection isDarkMode={isDarkMode} inputClasses={inputClasses} labelClasses={labelClasses} />
                        </>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;

