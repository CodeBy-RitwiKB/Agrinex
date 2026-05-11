import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Download, MoreHorizontal, CheckCircle, Clock, Truck, XCircle } from 'lucide-react';
import TabHeading from './TabHeading';

import { useStore } from '../../store/useStore';

const OrdersView = ({ isDarkMode }) => {
  const { token } = useStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/merchant/orders/all', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredOrders = (Array.isArray(orders) ? orders : []).filter(order => 
    (activeFilter === 'All' || order.status === activeFilter) &&
    (order.customer.toLowerCase().includes(search.toLowerCase()) || order.id.toLowerCase().includes(search.toLowerCase()))
  );

  const updateStatus = async (id, newStatus) => {
    try {
      const order = orders.find(o => o.id === id);
      const res = await fetch(`http://localhost:5000/api/merchant/orders/${order.rawId}/status`, {
        method: 'PUT',
        headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (res.ok) {
        setOrders(prev => prev.map(o => 
          o.id === id ? { ...o, status: newStatus } : o
        ));
      }
    } catch (err) {
        console.error('Update failed:', err);
    }
  };

  const statusColors = {
    'Delivered': 'bg-green-500/10 text-green-500',
    'Processing': 'bg-amber-500/10 text-amber-500',
    'Shipped': 'bg-blue-500/10 text-blue-500',
    'Cancelled': 'bg-red-500/10 text-red-500'
  };

  const statusIcons = {
    'Delivered': <CheckCircle size={12} />,
    'Processing': <Clock size={12} />,
    'Shipped': <Truck size={12} />,
    'Cancelled': <XCircle size={12} />
  };

  return (
    <div className="space-y-12 dash-reveal">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <TabHeading 
          title="Order"
          highlight="Management"
          subtitle="Track and process customer orders across India"
          isDarkMode={isDarkMode}
        />
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-[1.5rem] border transition-all ${
            isDarkMode ? 'bg-white/5 border-white/10 focus-within:border-[#FF9933]/50' : 'bg-white border-black/5 focus-within:border-black/20'
          }`}>
            <Search size={18} className="opacity-30" />
            <input 
              type="text" 
              placeholder="Search orders..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none font-hind text-sm w-48 placeholder:opacity-40"
            />
          </div>
          <div className="flex gap-2">
            {['All', 'Processing', 'Shipped', 'Delivered'].map(status => (
                <button
                    key={status}
                    onClick={() => setActiveFilter(status)}
                    className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                        activeFilter === status 
                        ? 'bg-[#FF9933] text-[#1A0F05]' 
                        : isDarkMode ? 'bg-white/5 text-white/40 hover:bg-white/10' : 'bg-black/5 text-black/40 hover:bg-black/10'
                    }`}
                >
                    {status}
                </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`p-10 rounded-[3rem] border overflow-hidden ${
        isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-black/5 shadow-sm'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-hind">
            <thead>
              <tr className="opacity-40 text-[10px] font-black uppercase tracking-[0.3em] border-b border-current border-opacity-5">
                <th className="pb-6 pl-8">Order ID</th>
                <th className="pb-6">Customer</th>
                <th className="pb-6">Date</th>
                <th className="pb-6">Product</th>
                <th className="pb-6">Price</th>
                <th className="pb-6">Status</th>
                <th className="pb-6 pr-8 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {filteredOrders.map((order) => (
                  <motion.tr 
                    layout
                    key={order.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`group transition-colors duration-300 ${
                      isDarkMode ? 'hover:bg-white/[0.04]' : 'hover:bg-black/[0.02]'
                    }`}
                  >
                    <td className="py-6 pl-8 font-mono text-xs opacity-50">{order.id}</td>
                    <td className="py-6 font-bold">{order.customer}</td>
                    <td className="py-6 text-sm opacity-50">{order.date}</td>
                    <td className="py-6 text-sm opacity-70">{order.product}</td>
                    <td className="py-6 font-bold">{order.price}</td>
                    <td className="py-6">
                      <span className={`flex items-center gap-2 w-fit px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${statusColors[order.status]}`}>
                        {statusIcons[order.status]}
                        {order.status}
                      </span>
                    </td>
                    <td className="py-6 pr-8 text-right">
                      <select 
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className={`bg-transparent border border-white/10 rounded-lg px-2 py-1 text-[10px] font-black uppercase tracking-widest outline-none focus:border-[#FF9933] transition-all ${
                            isDarkMode ? 'text-white' : 'text-black'
                        }`}
                      >
                        <option value="Processing">Process</option>
                        <option value="Shipped">Ship</option>
                        <option value="Delivered">Deliver</option>
                        <option value="Cancelled">Cancel</option>
                      </select>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersView;
