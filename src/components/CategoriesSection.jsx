import React from 'react';
import CategoryCard from './CategoryCard';

const CategoriesSection = ({ categories, isDarkMode }) => {
  return (
    <section id="shop-by-department" className={`min-h-screen py-32 px-6 md:px-12 transition-colors duration-1000 relative overflow-hidden ${
      isDarkMode ? 'bg-[#0D0804]' : 'bg-[#EFEDE8]'
    }`}>
      {/* Premium Jewel Divider */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] flex items-center justify-center z-30">
        <div className={`w-[80%] h-full bg-gradient-to-r from-transparent via-current to-transparent opacity-40 ${isDarkMode ? 'text-white' : 'text-[#1A0F05]'}`}></div>
        <div className="absolute w-2.5 h-2.5 bg-[#FF9933] rotate-45 shadow-[0_0_15px_#FF9933] z-40"></div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col mb-16 gsap-reveal">
          <div className="flex items-center gap-4 mb-4">
            <span className="w-12 h-[1px] bg-[#FF9933]"></span>
            <span className="font-hind text-[#FF9933] text-xs uppercase tracking-[0.4em] font-bold">Collections</span>
          </div>
          <h2 className={`text-5xl md:text-7xl tracking-tight font-yatra transition-colors duration-700 ${
            isDarkMode ? 'text-white' : 'text-[#1A0F05]'
          }`}>Shop by Department</h2>
        </div>
        
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-8 p-12 rounded-[3.5rem] border transition-all duration-1000 ${
          isDarkMode 
            ? 'bg-[#142B14] border-white/10 shadow-2xl' 
            : 'bg-[#FDFDFB] border-white/50 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.03)]'
        } gsap-reveal`}>
          {categories.map((cat, index) => (
            <CategoryCard key={index} name={cat.name} img={cat.img} isDarkMode={isDarkMode} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
