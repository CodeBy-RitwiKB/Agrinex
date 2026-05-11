import React, { useState, useEffect } from 'react';
import { Search, Filter, ChevronRight, Package, Calendar, DollarSign } from 'lucide-react';
import { useStore } from '../../store/useStore';

const OrderHistoryView = ({ isDarkMode }) => {
  const { token } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/customer/orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        
        setOrders(data.map(o => ({
          id: `#ORD-${o.id.slice(0, 4).toUpperCase()}`,
          item: o.items[0]?.name + (o.items.length > 1 ? ` +${o.items.length - 1} more` : ''),
          date: new Date(o.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          status: o.status.charAt(0).toUpperCase() + o.status.slice(1),
          total: `₹${Number(o.total_amount).toLocaleString('en-IN')}`,
          qty: `${o.items.reduce((acc, item) => acc + item.quantity, 0)} Units`
        })));
      } catch (err) {
        console.error('Failed to fetch customer orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-[#FF9933] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 admin-reveal">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className={`flex-1 w-full flex items-center gap-4 px-8 py-5 rounded-[2rem] border transition-all ${
          isDarkMode ? 'bg-white/5 border-white/10 focus-within:border-[#FF9933]/50' : 'bg-white border-black/5 focus-within:border-black/20 shadow-sm'
        }`}>
          <Search size={18} className="opacity-40" />
          <input 
            type="text" 
            placeholder="Search Order ID or Product..." 
            className="bg-transparent border-none outline-none w-full font-hind text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className={`flex items-center gap-3 px-8 py-5 rounded-[2rem] border transition-all font-hind text-[10px] font-black uppercase tracking-widest ${
          isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-white border-black/5 hover:bg-black/5'
        }`}>
          <Filter size={16} /> Filters
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div 
            key={order.id} 
            className={`group p-8 rounded-[3rem] border transition-all duration-500 hover:scale-[1.01] ${
              isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/[0.08]' : 'bg-white border-black/5 shadow-sm hover:shadow-xl'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              {/* Order Info */}
              <div className="flex items-center gap-8">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
                  isDarkMode ? 'bg-black/40 text-[#FF9933]' : 'bg-[#F5F5F3] text-[#1A0F05]'
                }`}>
                  <Package size={24} />
                </div>
                <div>
                  <h4 className="font-hind font-bold text-lg uppercase tracking-wider group-hover:text-[#FF9933] transition-colors">{order.item}</h4>
                  <div className="flex items-center gap-4 mt-1 opacity-40">
                    <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5"><Calendar size={12} /> {order.date}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">{order.id}</span>
                  </div>
                </div>
              </div>

              {/* Status & Price */}
              <div className="flex items-center justify-between md:justify-end gap-12">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold font-hind uppercase tracking-widest">{order.total}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-30">{order.qty}</p>
                </div>
                <div className="flex items-center gap-6">
                  <span className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' : 
                    order.status === 'Cancelled' ? 'bg-red-500/10 text-red-500' : 
                    'bg-[#FF9933]/10 text-[#FF9933]'
                  }`}>
                    {order.status}
                  </span>
                  <button className="p-4 rounded-2xl border border-current opacity-10 hover:opacity-100 transition-opacity">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryView;
