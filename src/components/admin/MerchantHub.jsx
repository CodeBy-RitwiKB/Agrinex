import React, { useState } from 'react';
import { Users, CheckCircle, XCircle, MoreVertical } from 'lucide-react';
import TabHeading from '../dashboard/TabHeading';
import GlassCard from '../ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';

const MerchantHub = ({ isDarkMode }) => {
  const [merchants, setMerchants] = useState([
    { id: 'M-7742', name: 'Aman Agri Solutions', status: 'Premium', color: 'text-[#FF9933]', type: 'active' },
    { id: 'M-7741', name: 'Jaipur Seeds Ltd', status: 'Standard', color: 'opacity-40', type: 'active' },
    { id: 'M-7740', name: 'Mewar Tools', status: 'Premium', color: 'text-[#FF9933]', type: 'pending' },
    { id: 'M-7739', name: 'Kisan Kendra', status: 'Standard', color: 'opacity-40', type: 'pending' },
  ]);

  const [activeFilter, setActiveFilter] = useState('all');

  const filteredMerchants = merchants.filter(m => 
    activeFilter === 'all' || m.type === activeFilter
  );

  const toggleStatus = (id) => {
    setMerchants(prev => prev.map(m => 
      m.id === id ? { ...m, type: m.type === 'active' ? 'suspended' : 'active' } : m
    ));
  };

  const verifyMerchant = (id) => {
    setMerchants(prev => prev.map(m => 
      m.id === id ? { ...m, type: 'active' } : m
    ));
  };

  return (
    <>
      <TabHeading 
        title="Merchant"
        highlight="Hub"
        subtitle="Manage and verify seller accounts across the platform."
        isDarkMode={isDarkMode}
      />

      <div className="flex gap-4 mb-10 mt-10">
        {['all', 'active', 'pending', 'suspended'].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              activeFilter === filter 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                : 'bg-white/5 text-white/40 hover:bg-white/10'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <GlassCard className="admin-reveal" isDarkMode={isDarkMode}>
        <div className="overflow-x-auto">
          <table className="w-full font-hind">
            <thead>
              <tr className="text-left text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                <th className="pb-8 pl-4">Merchant ID</th>
                <th className="pb-8">Store Name</th>
                <th className="pb-8">Status</th>
                <th className="pb-8 text-right pr-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {filteredMerchants.map((merchant) => (
                  <motion.tr 
                    layout
                    key={merchant.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="group hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="py-6 pl-4 font-bold text-xs">{merchant.id}</td>
                    <td className="py-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          merchant.type === 'active' ? 'bg-green-500/10 text-green-400' : 
                          merchant.type === 'pending' ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'
                        }`}>
                          <Users size={14} />
                        </div>
                        <span className="text-sm font-bold">{merchant.name}</span>
                      </div>
                    </td>
                    <td className="py-6">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${merchant.color}`}>
                        {merchant.status}
                      </span>
                    </td>
                    <td className="py-6 text-right pr-4">
                      {merchant.type === 'pending' ? (
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => verifyMerchant(merchant.id)}
                            className="p-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white transition-all"
                          >
                            <CheckCircle size={14} />
                          </button>
                          <button className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                            <XCircle size={14} />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => toggleStatus(merchant.id)}
                          className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                            merchant.type === 'active' 
                              ? 'bg-indigo-500/10 text-indigo-400 hover:bg-red-500 hover:text-white' 
                              : 'bg-red-500/10 text-red-400 hover:bg-green-500 hover:text-white'
                          }`}
                        >
                          {merchant.type === 'active' ? 'Suspend' : 'Activate'}
                        </button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </GlassCard>
    </>
  );
};

export default MerchantHub;
