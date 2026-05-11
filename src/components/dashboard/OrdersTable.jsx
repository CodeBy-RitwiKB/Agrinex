import React from 'react';
import { Link } from 'react-router-dom';

const OrdersTable = ({ orders, isDarkMode }) => {
  return (
    <div className={`dash-reveal p-10 rounded-[3rem] border ${
      isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-black/5 shadow-sm'
    }`}>
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-2xl font-yatra">Recent Orders</h3>
        <Link to="#" className="text-[10px] font-black text-[#FF9933] uppercase tracking-[0.3em] hover:underline">
          View All Orders
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left font-hind">
          <thead>
            <tr className="opacity-40 text-[10px] font-black uppercase tracking-[0.3em] border-b border-current border-opacity-5">
              <th className="pb-6">Order ID</th>
              <th className="pb-6">Customer</th>
              <th className="pb-6">Product</th>
              <th className="pb-6">Price</th>
              <th className="pb-6">Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(orders) && orders.map((order, i) => (
              <tr 
                key={i} 
                className={`group cursor-pointer transition-colors duration-300 ${
                  isDarkMode ? 'hover:bg-white/[0.04]' : 'hover:bg-black/[0.02]'
                }`}
              >
                <td className="py-6 font-mono text-xs opacity-50 pl-8 rounded-l-3xl">{order.id}</td>
                <td className="py-6 font-bold">{order.customer}</td>
                <td className="py-6 text-sm opacity-70">{order.product}</td>
                <td className="py-6 font-bold">{order.price}</td>
                <td className="py-6 pr-8 rounded-r-3xl">
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-500 group-hover:scale-105 inline-block ${
                    order.status === 'Delivered' ? 'bg-green-500/10 text-green-500' : 
                    order.status === 'Processing' ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'
                  }`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
