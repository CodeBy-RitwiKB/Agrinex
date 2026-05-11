import React, { useState, useEffect } from 'react';
import { ShoppingBag, Truck, Heart, Box, ArrowRight } from 'lucide-react';
import { useStore } from '../../store/useStore';

const CustomerOverview = ({ isDarkMode }) => {
  const { token } = useStore();
  const [stats, setStats] = useState([
    { label: 'Total Orders', value: '0', icon: <ShoppingBag />, color: '#FF9933' },
    { label: 'Active Shipments', value: '0', icon: <Truck />, color: '#10B981' },
    { label: 'Saved Items', value: '0', icon: <Heart />, color: '#EC4899' },
  ]);

  const [trackings, setTrackings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/customer/stats', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();

        setStats([
          { label: 'Total Orders', value: data.total_orders, icon: <ShoppingBag />, color: '#FF9933' },
          { label: 'Active Shipments', value: data.active_shipments, icon: <Truck />, color: '#10B981' },
          { label: 'Saved Items', value: '24', icon: <Heart />, color: '#EC4899' }, // Wishlist still mock for now
        ]);

        setTrackings(data.recent_trackings.map(t => ({
          id: `#ORD-${t.id.slice(0, 4).toUpperCase()}`,
          status: t.status.charAt(0).toUpperCase() + t.status.slice(1),
          item: t.product_name,
          date: new Date(t.created_at).toLocaleDateString(),
          icon: <Box />
        })));
      } catch (err) {
        console.error('Failed to fetch customer stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-[#FF9933] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12 admin-reveal">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat) => (
          <div 
            key={stat.label} 
            className={`p-10 rounded-[3rem] border transition-all duration-500 group hover:scale-[1.02] ${
              isDarkMode ? 'bg-white/5 border-white/10 hover:bg-white/[0.08]' : 'bg-white border-black/5 shadow-sm hover:shadow-xl'
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12" 
                style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
              >
                {stat.icon}
              </div>
              <span className="text-5xl font-yatra" style={{ color: stat.color }}>{stat.value}</span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Live Tracking */}
        <div className={`lg:col-span-2 p-12 rounded-[4rem] border ${
          isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-black/5 shadow-sm'
        }`}>
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-yatra tracking-tight">Active Tracking</h3>
            <button className="text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity flex items-center gap-2">
              View All <ArrowRight size={14} />
            </button>
          </div>
          
          <div className="space-y-6">
            {trackings.map(order => (
              <div 
                key={order.id} 
                className={`flex items-center justify-between p-8 rounded-3xl transition-all border border-transparent ${
                  isDarkMode ? 'bg-black/20 hover:border-[#FF9933]/20' : 'bg-[#F5F5F3] hover:border-[#1A0F05]/10 shadow-sm'
                }`}
              >
                <div className="flex items-center gap-8">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                    isDarkMode ? 'bg-white/5 text-[#FF9933]' : 'bg-white text-[#FF9933] shadow-md'
                  }`}>
                    {order.icon}
                  </div>
                  <div>
                    <p className="font-hind font-bold text-base uppercase tracking-wider mb-1">{order.item}</p>
                    <p className="text-[10px] opacity-40 uppercase font-black tracking-[0.2em]">{order.id} • {order.date}</p>
                  </div>
                </div>
                <span className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  order.status === 'Delivered' 
                    ? 'bg-green-500/10 text-green-500' 
                    : 'bg-[#FF9933]/10 text-[#FF9933]'
                }`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Small Action Card */}
        <div className={`p-10 rounded-[4rem] flex flex-col justify-between border ${
          isDarkMode ? 'bg-[#FF9933] text-[#1A0F05]' : 'bg-[#1A0F05] text-white'
        }`}>
          <div>
            <h4 className="text-3xl font-yatra leading-tight mb-4">Elite Support</h4>
            <p className="text-sm font-hind opacity-80 leading-relaxed mb-8">
              Need assistance with your premium agricultural goods? Our elite support team is ready to help 24/7.
            </p>
          </div>
          <button className={`w-full py-5 rounded-2xl font-hind text-[10px] font-black uppercase tracking-widest transition-all ${
            isDarkMode ? 'bg-[#1A0F05] text-white hover:scale-[1.02]' : 'bg-[#FF9933] text-[#1A0F05] hover:scale-[1.02]'
          }`}>
            Connect Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerOverview;
