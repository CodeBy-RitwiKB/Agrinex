import React from 'react';
import { ShieldCheck, Truck, CreditCard } from 'lucide-react';

const TrustBar = ({ isDarkMode }) => {
  const items = [
    { icon: <ShieldCheck size={20} />, title: "Certified Quality", desc: "Tested for Indian soil" },
    { icon: <Truck size={20} />, title: "Express Delivery", desc: "Direct to your farmstead" },
    { icon: <CreditCard size={20} />, title: "Secure Payments", desc: "100% encrypted checkout" }
  ];

  return (
    <section className={`py-12 border-y transition-colors duration-1000 ${
      isDarkMode 
        ? 'bg-[#0D0804] border-white/5' 
        : 'bg-white border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-6 group cursor-default">
              <div className={`p-4 rounded-2xl transition-all duration-500 ${
                isDarkMode ? 'bg-[#150D07] text-[#FF9933]' : 'bg-gray-50 text-[#1A0F05]'
              } group-hover:scale-110`}>
                {item.icon}
              </div>
              <div>
                <h4 className={`font-hind font-bold uppercase tracking-widest text-[10px] mb-1 ${
                  isDarkMode ? 'text-white' : 'text-[#1A0F05]'
                }`}>{item.title}</h4>
                <p className={`font-hind text-xs opacity-50 ${
                  isDarkMode ? 'text-white' : 'text-gray-500'
                }`}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
