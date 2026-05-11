import React from 'react';
import { motion } from 'framer-motion';
import { Search, Download, Send, Mail, Phone, Star } from 'lucide-react';
import TabHeading from './TabHeading';
import CustomerActionMenu from './CustomerActionMenu';

import { useStore } from '../../store/useStore';

const CustomersView = ({ isDarkMode }) => {
  const { token } = useStore();
  const [customers, setCustomers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/merchant/customers', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        setCustomers(data);
      } catch (err) {
        console.error('Failed to fetch customers:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, [token]);

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-[#FF9933]">Loading Buyer Network...</div>;
  }

  return (
    <div className="space-y-12 dash-reveal">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <TabHeading
          title="Customer"
          highlight="Relations"
          subtitle="Manage your buyer network and track customer loyalty"
          isDarkMode={isDarkMode}
        />
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-[1.5rem] border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-black/5'
            }`}>
            <Search size={18} className="opacity-30" />
            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none font-hind text-sm w-48"
            />
          </div>
          <button className={`flex items-center gap-3 px-6 py-4 rounded-[1.5rem] border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-black/5'
            } hover:bg-[#FF9933]/10 transition-colors`}>
            <Download size={18} />
          </button>
          <button className={`flex items-center gap-3 px-6 py-4 rounded-[1.5rem] bg-[#FF9933] text-[#1A0F05] font-hind text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform`}>
            <Send size={16} />
            Bulk Message
          </button>
        </div>
      </div>

      <div className={`p-10 rounded-[3rem] border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-black/5 shadow-sm'
        }`}>
        <div
          className="overflow-x-auto pb-48 no-scrollbar"
          data-lenis-prevent
        >
          <table className="w-full text-left font-hind min-w-[900px]">
            <thead>
              <tr className="opacity-40 text-[10px] font-black uppercase tracking-[0.3em] border-b border-current border-opacity-5">
                <th className="pb-6 pl-8">Customer</th>
                <th className="pb-6">Contact</th>
                <th className="pb-6">Location</th>
                <th className="pb-6">Orders</th>
                <th className="pb-6">Total Spent</th>
                <th className="pb-6 text-right pr-8">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(Array.isArray(customers) ? customers : []).filter(customer =>
                customer.name.toLowerCase().includes((search || '').toLowerCase()) ||
                customer.email.toLowerCase().includes((search || '').toLowerCase())
              ).map((customer, i) => (
                <tr
                  key={i}
                  className={`group cursor-pointer transition-colors duration-300 ${isDarkMode ? 'hover:bg-white/[0.04]' : 'hover:bg-black/[0.02]'
                    }`}
                >
                  <td className="py-6 pl-8 rounded-l-3xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl overflow-hidden bg-black/10 border border-current border-opacity-5">
                        <img src={customer.avatar} alt={customer.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-bold">{customer.name}</p>
                        <div className="flex items-center gap-1 mt-1">
                          {[...Array(5)].map((_, idx) => (
                            <Star key={idx} size={10} className={idx < customer.rating ? "text-[#FF9933] fill-[#FF9933]" : "opacity-20"} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-6">
                    <div className="space-y-1">
                      <p className="text-sm opacity-70 flex items-center gap-2"><Mail size={12} className="opacity-40" /> {customer.email}</p>
                      <p className="text-xs opacity-40 flex items-center gap-2"><Phone size={12} className="opacity-40" /> {customer.phone}</p>
                    </div>
                  </td>
                  <td className="py-6 text-sm opacity-70">{customer.location}</td>
                  <td className="py-6 font-mono text-sm opacity-50">{customer.orders} Orders</td>
                  <td className="py-6 font-bold">{customer.spent}</td>
                  <td className="py-6 pr-8 text-right rounded-r-3xl">
                    <div className="flex items-center justify-end gap-2">
                      <button className={`p-2 rounded-xl transition-all ${isDarkMode ? 'hover:bg-white/10 text-indigo-400' : 'hover:bg-black/5 text-indigo-600'}`}>
                        <Mail size={18} />
                      </button>
                      <CustomerActionMenu isDarkMode={isDarkMode} customerName={customer.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomersView;
