import React, { useState } from 'react';
import { AlertCircle, TrendingUp, CheckCircle } from 'lucide-react';
import TabHeading from '../dashboard/TabHeading';
import GlassCard from '../ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';

const SystemConfig = ({ isDarkMode }) => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [debugLogs, setDebugLogs] = useState(true);
  const [commission, setCommission] = useState(10);
  const [payout, setPayout] = useState(1000);
  const [saveStatus, setSaveStatus] = useState(null);

  const handleUpdate = (type) => {
    setSaveStatus(type);
    setTimeout(() => setSaveStatus(null), 2000);
  };

  return (
    <>
      <TabHeading 
        title="System"
        highlight="Config"
        subtitle="Adjust platform-wide parameters and technical settings."
        isDarkMode={isDarkMode}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
        <GlassCard className="admin-reveal" isDarkMode={isDarkMode}>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-yatra">Platform Parameters</h3>
            <AnimatePresence>
              {saveStatus === 'params' && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-green-500 text-[10px] font-black uppercase tracking-widest"
                >
                  <CheckCircle size={14} /> Saved Successfully
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">Commission Rate (%)</label>
              <div className="flex gap-4">
                <input 
                  type="number" 
                  value={commission}
                  onChange={(e) => setCommission(e.target.value)}
                  className="flex-1 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-indigo-500/50 transition-all font-bold text-sm" 
                />
                <button 
                  onClick={() => handleUpdate('params')}
                  className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-hind text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-all active:scale-95"
                >
                  Update
                </button>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-40 ml-4">Min Payout Threshold (₹)</label>
              <div className="flex gap-4">
                <input 
                  type="number" 
                  value={payout}
                  onChange={(e) => setPayout(e.target.value)}
                  className="flex-1 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 outline-none focus:border-indigo-500/50 transition-all font-bold text-sm" 
                />
                <button 
                  onClick={() => handleUpdate('params')}
                  className="px-8 py-4 rounded-2xl bg-indigo-600 text-white font-hind text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-all active:scale-95"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="admin-reveal" isDarkMode={isDarkMode}>
          <h3 className="text-xl font-yatra mb-8">Service Maintenance</h3>
          <div className="space-y-6">
            {/* Maintenance Toggle */}
            <div 
              onClick={() => setMaintenanceMode(!maintenanceMode)}
              className={`flex items-center justify-between p-6 rounded-2xl border transition-all cursor-pointer group ${
                maintenanceMode ? 'bg-red-500/10 border-red-500/20' : 'bg-white/5 border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  maintenanceMode ? 'bg-red-500 text-white' : 'bg-red-500/10 text-red-500'
                }`}>
                  <AlertCircle size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-hind">Maintenance Mode</h4>
                  <p className="text-[10px] opacity-40 uppercase font-black">Deactivates frontend access</p>
                </div>
              </div>
              <div className={`w-12 h-6 rounded-full relative p-1 transition-all ${maintenanceMode ? 'bg-red-500' : 'bg-white/10'}`}>
                <motion.div 
                  animate={{ x: maintenanceMode ? 24 : 0 }}
                  className="w-4 h-4 rounded-full bg-white shadow-sm" 
                />
              </div>
            </div>

            {/* Debug Toggle */}
            <div 
              onClick={() => setDebugLogs(!debugLogs)}
              className={`flex items-center justify-between p-6 rounded-2xl border transition-all cursor-pointer group ${
                debugLogs ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-white/5 border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  debugLogs ? 'bg-indigo-600 text-white' : 'bg-indigo-500/10 text-indigo-400'
                }`}>
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-hind">Debug Logs</h4>
                  <p className="text-[10px] opacity-40 uppercase font-black">Enable verbose tracking</p>
                </div>
              </div>
              <div className={`w-12 h-6 rounded-full relative p-1 transition-all ${debugLogs ? 'bg-indigo-600' : 'bg-white/10'}`}>
                <motion.div 
                  animate={{ x: debugLogs ? 24 : 0 }}
                  className="w-4 h-4 rounded-full bg-white shadow-sm" 
                />
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </>
  );
};

export default SystemConfig;
