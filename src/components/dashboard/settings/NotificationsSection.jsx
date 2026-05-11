import React, { useState } from 'react';
import { Bell, Building2, Globe, ShieldCheck } from 'lucide-react';

const NotificationsSection = ({ isDarkMode }) => {
  const [enabledStates, setEnabledStates] = useState({
    orders: true,
    inventory: true,
    marketing: false,
    system: true
  });

  const notificationItems = [
    { id: 'orders', title: 'New Order Alerts', desc: 'Get notified instantly when a customer places an order.', icon: <Bell className="text-[#FF9933]" /> },
    { id: 'inventory', title: 'Inventory Reminders', desc: 'Receive alerts when stock levels for your products fall below 10%.', icon: <Building2 className="text-[#FF9933]" /> },
    { id: 'marketing', title: 'Marketing Insights', desc: 'Weekly reports on trending products and market demands.', icon: <Globe className="text-[#FF9933]" /> },
    { id: 'system', title: 'System Updates', desc: 'Important news regarding platform maintenance and new features.', icon: <ShieldCheck className="text-[#FF9933]" /> }
  ];

  const toggle = (id) => {
    setEnabledStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8">
      {notificationItems.map((item, i) => (
        <div key={i} className="flex items-center justify-between p-6 rounded-2xl border border-current border-opacity-5">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-xl bg-[#FF9933]/10 flex items-center justify-center">
              {item.icon}
            </div>
            <div>
              <h4 className="font-bold font-hind">{item.title}</h4>
              <p className="text-sm opacity-50 font-hind">{item.desc}</p>
            </div>
          </div>
          <div 
            onClick={() => toggle(item.id)}
            className={`w-14 h-8 rounded-full relative cursor-pointer transition-all duration-500 ${
                enabledStates[item.id] 
                ? 'bg-[#FF9933]/20 border border-[#FF9933]/30' 
                : (isDarkMode ? 'bg-white/5 border border-white/5' : 'bg-black/5 border border-black/5')
            }`}
          >
            <div className={`absolute top-1 w-5 h-5 rounded-full shadow-lg transition-all duration-500 ${
                enabledStates[item.id] 
                ? 'right-1 bg-[#FF9933]' 
                : 'left-1 bg-gray-400 opacity-40'
            }`} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationsSection;

