import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ name, img, isDarkMode }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      whileHover={{ y: -6 }}
      onClick={() => navigate(`/department/${encodeURIComponent(name)}`)}
      className="flex flex-col items-center cursor-pointer group"
    >
      <div className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full p-1 transition-all duration-700 ${
        isDarkMode 
          ? 'bg-[#150D07] border border-white/5 group-hover:border-[#FF9933]/40' 
          : 'bg-white border border-gray-100 shadow-md group-hover:shadow-xl'
      }`}>
        <div className="w-full h-full rounded-full overflow-hidden relative">
          <div className="absolute inset-0 bg-[#FF9933]/0 group-hover:bg-[#FF9933]/10 transition-colors duration-500 z-10"></div>
          <img 
            src={img} 
            alt={name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ease-in-out opacity-90 group-hover:opacity-100" 
          />
        </div>
      </div>
      
      <span className={`mt-4 text-[9px] font-bold uppercase tracking-[0.2em] text-center transition-all duration-500 max-w-[100px] leading-tight ${
        isDarkMode ? 'text-white/40 group-hover:text-[#FF9933]' : 'text-[#1A0F05]/50 group-hover:text-[#1A0F05]'
      }`}>
        {name}
      </span>
    </motion.div>
  );
};

export default CategoryCard;