import React from 'react';
import { Zap, Globe, Sprout } from 'lucide-react';

const InnovationsSection = ({ isDarkMode }) => {
  const features = [
    { icon: <Zap size={32} />, title: "AI Soil Analysis", desc: "Real-time nutrient tracking with satellite-linked precision sensors." },
    { icon: <Globe size={32} />, title: "Smart Irrigation", desc: "Water management systems that adapt to monsoon patterns and soil moisture." },
    { icon: <Sprout size={32} />, title: "Organic Scaling", desc: "Proprietary organic growth formulas that rival synthetic yields." }
  ];

  return (
    <section className={`min-h-screen py-32 px-6 md:px-12 relative overflow-hidden transition-colors duration-1000 ${
      isDarkMode ? 'bg-[#0D0804]' : 'bg-[#FDFCFB]'
    }`}>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-jali opacity-[0.03] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gsap-reveal">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-[1px] bg-[#FF9933]"></span>
              <span className="font-hind text-[#FF9933] text-xs uppercase tracking-[0.4em] font-bold">Technology</span>
            </div>
            <h2 className={`text-5xl md:text-7xl tracking-tight font-yatra transition-colors duration-700 ${
              isDarkMode ? 'text-white' : 'text-[#1A0F05]'
            }`}>Modern Innovations</h2>
          </div>
          <p className="text-gray-400 font-medium text-lg font-hind max-w-sm md:text-right mt-6 md:mt-0 leading-relaxed opacity-60">Precision tools designed for the next generation of Indian farmers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, i) => (
            <div key={i} className={`p-12 rounded-[3rem] border transition-all duration-1000 hover:-translate-y-4 gsap-reveal group ${
              isDarkMode 
                ? 'bg-[#150D07]/40 backdrop-blur-xl border-white/5 hover:border-[#FF9933]/20' 
                : 'bg-white border-gray-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)] hover:border-[#FF9933]/10'
            }`}>
              <div className={`p-5 rounded-2xl w-fit mb-10 group-hover:bg-[#FF9933] group-hover:text-[#1A0F05] transition-all duration-500 shadow-sm ${
                isDarkMode ? 'bg-[#0D0804] text-[#FF9933]' : 'bg-[#FDFCFB] text-[#FF9933]'
              }`}>
                {feature.icon}
              </div>
              <h3 className={`font-yatra text-3xl mb-5 tracking-tight transition-colors duration-500 ${
                isDarkMode ? 'text-white' : 'text-[#1A0F05]'
              }`}>{feature.title}</h3>
              <p className={`font-hind text-lg leading-relaxed opacity-50 ${
                isDarkMode ? 'text-white' : 'text-gray-600'
              }`}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InnovationsSection;
