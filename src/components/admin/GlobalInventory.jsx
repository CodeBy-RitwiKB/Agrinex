import React, { useState } from 'react';
import { Package, Search, Filter, ArrowUpRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import TabHeading from '../dashboard/TabHeading';
import GlassCard from '../ui/GlassCard';
import { motion, AnimatePresence } from 'framer-motion';

const GlobalInventory = ({ isDarkMode }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const stats = [
    { label: 'Total Listings', value: '18,240', color: '#6366F1' },
    { label: 'Out of Stock', value: '12', color: '#EF4444' },
    { label: 'Featured Items', value: '42', color: '#FF9933' },
  ];

  const categories = ['All', 'Machinery', 'Seeds', 'Fertilizers', 'Irrigation'];

  const inventory = [
    { id: 'INV-001', name: 'John Deere 5050D', category: 'Machinery', stock: 12, price: '₹7.8L', status: 'In Stock' },
    { id: 'INV-002', name: 'Hybrid Wheat Seeds', category: 'Seeds', stock: 0, price: '₹450/kg', status: 'Out of Stock' },
    { id: 'INV-003', name: 'NPK Fertilizer', category: 'Fertilizers', stock: 450, price: '₹1,200', status: 'In Stock' },
    { id: 'INV-004', name: 'Smart Drip System', category: 'Irrigation', stock: 5, price: '₹12,500', status: 'Low Stock' },
    { id: 'INV-005', name: 'Power Tiller 15HP', category: 'Machinery', stock: 24, price: '₹1.5L', status: 'In Stock' },
    { id: 'INV-006', name: 'Organic Compost', category: 'Fertilizers', stock: 1200, price: '₹300', status: 'In Stock' },
    { id: 'INV-007', name: 'Mahindra Arjun 605', category: 'Machinery', stock: 8, price: '₹8.2L', status: 'In Stock' },
    { id: 'INV-008', name: 'Basmati Rice Seeds', category: 'Seeds', stock: 0, price: '₹120/kg', status: 'Out of Stock' },
  ];

  const filteredItems = inventory.filter(item => 
    (activeCategory === 'All' || item.category === activeCategory) &&
    (item.name.toLowerCase().includes(search.toLowerCase()) || item.id.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <>
      <TabHeading 
        title="Global"
        highlight="Inventory"
        subtitle="Track and analyze total product supply across the Agrinex ecosystem."
        isDarkMode={isDarkMode}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 mt-10">
        {stats.map((stat, i) => (
          <GlassCard key={i} className="admin-reveal text-center" isDarkMode={isDarkMode}>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-3">{stat.label}</p>
            <p className="text-5xl font-yatra" style={{ color: stat.color }}>{stat.value}</p>
          </GlassCard>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
        <div className={`flex items-center gap-4 px-6 py-3 rounded-2xl border flex-1 w-full md:w-auto transition-all ${
          isDarkMode ? 'bg-white/5 border-white/10 focus-within:border-indigo-500/50' : 'bg-black/5 border-black/5 focus-within:border-black/20'
        }`}>
          <Search size={18} className="opacity-40" />
          <input 
            type="text" 
            placeholder="Search inventory by name or ID..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none font-hind text-sm w-full placeholder:opacity-40"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                activeCategory === cat 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-white/5 text-white/40 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard isDarkMode={isDarkMode} className="h-full group hover:border-indigo-500/30 transition-all cursor-pointer">
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    item.status === 'Out of Stock' ? 'bg-red-500/10 text-red-500' : 
                    item.status === 'Low Stock' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-indigo-500/10 text-indigo-400'
                  }`}>
                    {item.status === 'Out of Stock' ? <AlertTriangle size={18} /> : <Package size={18} />}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${
                    item.status === 'Out of Stock' ? 'text-red-500' : 
                    item.status === 'Low Stock' ? 'text-yellow-500' : 'text-green-500'
                  }`}>
                    {item.status}
                  </span>
                </div>
                
                <h4 className="text-lg font-bold font-hind mb-1 truncate">{item.name}</h4>
                <p className="text-[10px] opacity-40 uppercase font-black tracking-widest mb-4">{item.id} • {item.category}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <div>
                    <p className="text-[10px] opacity-40 uppercase font-black tracking-widest">Stock</p>
                    <p className="text-sm font-bold font-hind">{item.stock} Units</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] opacity-40 uppercase font-black tracking-widest">Value</p>
                    <p className="text-sm font-bold font-hind text-indigo-400">{item.price}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default GlobalInventory;
