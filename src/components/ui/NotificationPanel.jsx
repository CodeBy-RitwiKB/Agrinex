import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ShoppingBag, Users, AlertCircle, CheckCircle2, X, MoreHorizontal } from 'lucide-react';

const NotificationPanel = ({ isDarkMode, isAdmin = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const panelRef = useRef(null);

  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      type: 'order', 
      title: 'New Order Received', 
      desc: 'Order #ORD-7742 from Aman Sharma is ready for processing.', 
      time: '2m ago', 
      isRead: false,
      icon: <ShoppingBag size={14} />,
      color: 'text-indigo-400'
    },
    { 
      id: 2, 
      type: 'merchant', 
      title: 'New Verification Request', 
      desc: 'Mewar Tools is requesting premium merchant status.', 
      time: '1h ago', 
      isRead: false,
      icon: <Users size={14} />,
      color: 'text-[#FF9933]',
      adminOnly: true
    },
    { 
      id: 3, 
      type: 'system', 
      title: 'Security Update', 
      desc: 'System maintenance scheduled for 2:00 AM IST.', 
      time: '5h ago', 
      isRead: false,
      icon: <AlertCircle size={14} />,
      color: 'text-red-400'
    },
    { 
      id: 4, 
      type: 'success', 
      title: 'Payout Successful', 
      desc: '₹42,500 has been transferred to your linked bank account.', 
      time: '1d ago', 
      isRead: true,
      icon: <CheckCircle2 size={14} />,
      color: 'text-green-400'
    }
  ]);

  const filteredNotifications = isAdmin 
    ? notifications 
    : notifications.filter(n => !n.adminOnly);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="relative" ref={panelRef}>
      {/* Trigger Icon */}
      <button 
        onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) setUnreadCount(0);
        }}
        className={`p-3 rounded-2xl transition-all relative group ${
          isOpen 
            ? (isDarkMode ? 'bg-[#FF9933] text-[#1A0F05]' : 'bg-[#1A0F05] text-white') 
            : (isDarkMode ? 'bg-white/5 hover:bg-white/10 text-white' : 'bg-black/5 hover:bg-black/10 text-[#1A0F05]')
        }`}
      >
        <Bell size={20} className={isOpen ? '' : 'opacity-40 group-hover:opacity-100 transition-opacity'} />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0D0D0D] animate-pulse" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className={`absolute right-0 mt-4 w-96 z-[100] rounded-[2.5rem] border backdrop-blur-3xl shadow-2xl overflow-hidden ${
              isDarkMode 
              ? 'bg-[#0D0D0D]/90 border-white/10 shadow-black' 
              : 'bg-white/95 border-black/5 shadow-black/10'
            }`}
          >
            {/* Header */}
            <div className={`p-8 border-b ${isDarkMode ? 'border-white/5' : 'border-black/5'}`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-yatra">Notifications</h3>
                <button 
                    onClick={markAllRead}
                    className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
                >
                  Mark all as read
                </button>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-20">
                Latest updates from the Agrinex ecosystem
              </p>
            </div>

            {/* List */}
            <div className="max-h-[32rem] overflow-y-auto no-scrollbar py-4 px-4 space-y-2">
              {filteredNotifications.length > 0 ? filteredNotifications.map((n) => (
                <div 
                  key={n.id}
                  className={`p-6 rounded-[2rem] border transition-all group relative ${
                    isDarkMode 
                    ? `hover:bg-white/5 border-transparent ${!n.isRead ? 'bg-white/[0.03]' : ''}` 
                    : `hover:bg-black/5 border-transparent ${!n.isRead ? 'bg-black/[0.02]' : ''}`
                  }`}
                >
                  <div className="flex gap-4">
                    <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center bg-current bg-opacity-10 ${n.color}`}>
                      {n.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-bold truncate">{n.title}</h4>
                        <span className="text-[9px] font-black uppercase tracking-widest opacity-30">{n.time}</span>
                      </div>
                      <p className="text-xs opacity-50 leading-relaxed font-hind line-clamp-2">{n.desc}</p>
                    </div>
                    <button 
                        onClick={(e) => { e.stopPropagation(); removeNotification(n.id); }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-500/10 text-red-500 rounded-lg h-fit"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              )) : (
                <div className="py-20 text-center opacity-20">
                  <Bell size={40} className="mx-auto mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Inbox is clear</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <button className={`w-full py-6 text-center text-[10px] font-black uppercase tracking-widest border-t transition-colors ${
              isDarkMode 
              ? 'border-white/5 hover:bg-white/5 opacity-40 hover:opacity-100' 
              : 'border-black/5 hover:bg-black/5 opacity-40 hover:opacity-100'
            }`}>
              View all activity
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationPanel;
