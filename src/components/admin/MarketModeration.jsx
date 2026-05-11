import React, { useState } from 'react';
import { Package, ShieldAlert, CheckCircle, XCircle } from 'lucide-react';
import TabHeading from '../dashboard/TabHeading';
import GlassCard from '../ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';

const MarketModeration = ({ isDarkMode }) => {
  const [items, setItems] = useState([
    { id: 1, name: 'Precision Tiller', seller: 'Jaipur Seeds', status: 'Pending Review' },
    { id: 2, name: 'Organic Fertilizers', seller: 'Eco Harvest', status: 'Flagged' },
    { id: 3, name: 'Smart Drip Kit', seller: 'Mewar Tools', status: 'Pending Review' },
  ]);

  const resolveItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <>
      <TabHeading 
        title="Content"
        highlight="Moderation"
        subtitle="Review flagged products and enforce platform quality standards."
        isDarkMode={isDarkMode}
      />

      <AnimatePresence mode="popLayout">
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {items.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard isDarkMode={isDarkMode} className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      item.status === 'Flagged' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {item.status === 'Flagged' ? <ShieldAlert size={20} /> : <Package size={20} />}
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${
                      item.status === 'Flagged' ? 'text-red-500' : 'text-yellow-500'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <h4 className="text-xl font-yatra mb-1">{item.name}</h4>
                  <p className="text-xs opacity-40 font-hind mb-8">By {item.seller}</p>
                  
                  <div className="mt-auto flex gap-3">
                    <button 
                      onClick={() => resolveItem(item.id)}
                      className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-hind text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 group"
                    >
                      <CheckCircle size={14} className="group-hover:scale-110 transition-transform" />
                      Approve
                    </button>
                    <button 
                      onClick={() => resolveItem(item.id)}
                      className="flex-1 py-3 rounded-xl bg-red-500/10 text-red-500 font-hind text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 group"
                    >
                      <XCircle size={14} className="group-hover:scale-110 transition-transform" />
                      Reject
                    </button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mb-6">
              <CheckCircle size={40} />
            </div>
            <h3 className="text-2xl font-yatra mb-2">Queue Clear</h3>
            <p className="text-sm opacity-40 font-hind max-w-xs">All flagged content has been reviewed. Great job keeping the platform safe!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MarketModeration;
