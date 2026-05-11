import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, AlertCircle, Package, Clock, CheckCircle2, XCircle, MoreVertical } from 'lucide-react';
import TabHeading from '../dashboard/TabHeading';
import StatCard from '../ui/StatCard';
import GlassCard from '../ui/GlassCard';
import PlatformChart from './PlatformChart';

const AdminOverview = ({ isDarkMode, accentColor }) => {
  const [selectedBar, setSelectedBar] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const platformData = [
    { date: 'JAN', value: '₹1.2 Cr', raw: 1.2, merchants: 850 },
    { date: 'FEB', value: '₹1.8 Cr', raw: 1.8, merchants: 920 },
    { date: 'MAR', value: '₹1.5 Cr', raw: 1.5, merchants: 980 },
    { date: 'APR', value: '₹2.4 Cr', raw: 2.4, merchants: 1100 },
    { date: 'MAY', value: '₹2.1 Cr', raw: 2.1, merchants: 1180 },
    { date: 'JUN', value: '₹3.2 Cr', raw: 3.2, merchants: 1240 },
  ];

  const baseStats = [
    { label: 'Total Volume', value: '₹4.2 Cr', change: '+18.4%', icon: <TrendingUp /> },
    { label: 'Total Merchants', value: '1,240', change: '+42', icon: <Users /> },
    { label: 'Pending KYC', value: '18', change: '-5', icon: <AlertCircle className="text-yellow-500" /> },
    { label: 'New Listings', value: '84', change: '+12', icon: <Package /> },
  ];

  const adminStats = selectedBar !== null ? [
    { label: `Volume • ${platformData[selectedBar].date}`, value: platformData[selectedBar].value, change: 'Month', icon: <TrendingUp /> },
    { label: `Merchants • ${platformData[selectedBar].date}`, value: platformData[selectedBar].merchants.toString(), change: 'Month', icon: <Users /> },
    { label: 'Pending KYC', value: '18', change: 'Total', icon: <AlertCircle className="text-yellow-500" /> },
    { label: 'New Listings', value: '14', change: 'Month', icon: <Package /> },
  ] : selectedCategory !== null ? [
    { label: `Volume • ${selectedCategory.label}`, value: `₹${(4.2 * (selectedCategory.value / 100)).toFixed(1)} Cr`, change: 'Category', icon: <TrendingUp /> },
    { label: `Merchants • ${selectedCategory.label}`, value: Math.floor(1240 * (selectedCategory.value / 100)).toString(), change: 'Category', icon: <Users /> },
    { label: 'Pending KYC', value: '6', change: 'Category', icon: <AlertCircle className="text-yellow-500" /> },
    { label: `Listings • ${selectedCategory.label}`, value: Math.floor(18240 * (selectedCategory.value / 100)).toString(), change: 'Category', icon: <Package /> },
  ] : baseStats;

  const pendingMerchants = [
    { id: 'M-9921', name: 'Green Valley Seeds', owner: 'Rahul Verma', date: '2 hours ago', type: 'FPO' },
    { id: 'M-9920', name: 'Jai Kisan Tools', owner: 'Suresh Kumar', date: '5 hours ago', type: 'Manufacturer' },
    { id: 'M-9919', name: 'Eco Harvest Organic', owner: 'Priya Dhar', date: '1 day ago', type: 'Retailer' },
  ];

  return (
    <div className="space-y-12">
      <TabHeading 
        title="Platform"
        highlight="Command"
        subtitle="Real-time performance metrics across the Agrinex ecosystem."
        isDarkMode={isDarkMode}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {adminStats.map((stat, i) => (
          <StatCard 
            key={i} 
            {...stat} 
            i={i} 
            isDarkMode={isDarkMode} 
            accentColor={accentColor} 
            isSelected={selectedBar !== null || selectedCategory !== null}
          />
        ))}
      </div>

      {/* GAP-LESS GRID TO PREVENT PHANTOM LINE ARTFACT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div className="lg:col-span-8 lg:pr-6">
          <PlatformChart 
            isDarkMode={isDarkMode} 
            accentColor={accentColor} 
            selectedBar={selectedBar}
            setSelectedBar={setSelectedBar}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        <div className="lg:col-span-4 lg:pl-6 mt-12 lg:mt-0">
          <GlassCard className="h-full admin-reveal" isDarkMode={isDarkMode}>
            <h3 className="text-xl font-yatra mb-8">System Health</h3>
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold font-hind uppercase tracking-widest opacity-40">
                  <span>API Latency</span>
                  <span className="text-green-500">24ms (Optimal)</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '15%' }}
                    className="h-full bg-green-500"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold font-hind uppercase tracking-widest opacity-40">
                  <span>Server Load</span>
                  <span className="text-yellow-500">42% (Normal)</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '42%' }}
                    className="h-full bg-yellow-500"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs font-bold font-hind uppercase tracking-widest opacity-40">
                  <span>Storage</span>
                  <span className="text-[#FF9933]">68% (Monitor)</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '68%' }}
                    className="h-full bg-[#FF9933]"
                  />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-0">
        <GlassCard className="admin-reveal" isDarkMode={isDarkMode}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-yatra">Pending Verification</h3>
              <p className="text-xs opacity-40 font-hind uppercase tracking-widest mt-1">Review merchant documentation</p>
            </div>
            <button className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity">View All Queue</button>
          </div>

          <div className="space-y-4">
            {pendingMerchants.map((merchant) => (
              <div 
                key={merchant.id}
                className={`group p-6 rounded-3xl border flex items-center justify-between transition-all hover:translate-x-2 ${
                  isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-black/5 border-black/5 hover:bg-black/10'
                }`}
              >
                <div className="flex items-center gap-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isDarkMode ? 'bg-white/5 text-white/40' : 'bg-black/5 text-black/40'}`}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="font-bold font-hind">{merchant.name}</h4>
                      <span className="text-[10px] font-black uppercase px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">{merchant.type}</span>
                    </div>
                    <p className="text-xs opacity-40 font-hind mt-1">Request by {merchant.owner} • {merchant.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className={`p-3 rounded-xl transition-all ${isDarkMode ? 'bg-white/5 hover:bg-green-500/20 hover:text-green-500' : 'bg-black/5 hover:bg-green-100 hover:text-green-600'}`}>
                    <CheckCircle2 size={18} />
                  </button>
                  <button className={`p-3 rounded-xl transition-all ${isDarkMode ? 'bg-white/5 hover:bg-red-500/20 hover:text-red-500' : 'bg-black/5 hover:bg-red-100 hover:text-red-600'}`}>
                    <XCircle size={18} />
                  </button>
                  <button className={`p-3 rounded-xl transition-all opacity-20 hover:opacity-100 ${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}`}>
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default AdminOverview;
