import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';


const ProductCard = ({ product, isDarkMode }) => {
  const { addToCart } = useCart();
  const [liked, setLiked] = useState(false);
  const [isFlying, setIsFlying] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setIsFlying(true);
    setTimeout(() => setIsFlying(false), 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className={`rounded-[2.5rem] p-4 transition-all duration-700 border group relative flex flex-col h-full ${
        isDarkMode 
          ? 'bg-[#142B14] bg-gradient-to-br from-white/[0.05] to-transparent border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] hover:shadow-[0_40px_80px_-15px_rgba(16,26,16,0.6)] hover:border-[#FF9933]/50' 
          : 'bg-[#FDFDFB] border-white/50 hover:border-[#FF9933]/30 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]'
      }`}
    >
      {/* Organic Matte Texture Overlay (Dark Mode Only) */}
      {isDarkMode && (
        <div className="absolute inset-0 rounded-[2.5rem] opacity-[0.03] pointer-events-none mix-blend-overlay bg-noise-pattern"></div>
      )}

      {/* Premium Rim Light (Top Edge Highlight) */}
      <div className={`absolute inset-0 rounded-[2.5rem] pointer-events-none transition-opacity duration-700 ${
        isDarkMode ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      {/* Image Container - Compacted */}
      <div className={`relative h-52 w-full overflow-hidden rounded-[2rem] transition-colors duration-1000 ${isDarkMode ? 'bg-[#0D0804]' : 'bg-gray-100'
        }`}>

        {/* Floating Tag */}
        <div className={`absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.1em] shadow-lg border transition-all duration-1000 ${isDarkMode
            ? 'bg-white/10 backdrop-blur-md border-white/20 text-white'
            : 'bg-white border-gray-100 text-[#1A0F05]'
          }`}>
          {product.tag}
        </div>

        {/* Product Image */}
        <Link to={`/product/${product.id}`} className="block w-full h-full cursor-pointer">
          <img
            src={product.image_url || product.img}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
          />
        </Link>


        {/* Heart Micro-interaction */}
        <button
          onClick={() => setLiked(!liked)}
          className={`absolute top-4 right-4 p-2.5 rounded-full shadow-xl hover:scale-110 transition-all z-10 active:scale-90 border backdrop-blur-md ${isDarkMode
              ? 'bg-white/10 border-white/20'
              : 'bg-white border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.05)]'
            }`}
        >
          <Heart
            size={14}
            fill={liked ? "#FF9933" : "none"}
            color={liked ? "#FF9933" : (isDarkMode ? "#FFFFFF" : "#1A0F05")}
            className="transition-all"
          />
        </button>
      </div>

      {/* Content Area - Compacted */}
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`}>
          <h3 className={`font-yatra text-xl tracking-tight mb-2 leading-tight transition-colors duration-500 hover:text-[#FF9933] cursor-pointer ${isDarkMode ? 'text-white' : 'text-[#1A0F05]'
            }`}>{product.name}</h3>
        </Link>

        <div className="flex items-baseline gap-2 mb-6 mt-auto pt-4 border-t border-gray-100 dark:border-white/5">
          <span className={`text-2xl font-black tracking-tighter ${isDarkMode ? 'text-[#FF9933]' : 'text-[#1A0F05]'
            }`}>₹{Number(product.price).toFixed(2)}</span>
          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest opacity-60">/ {product.unit}</span>

        </div>

        <button
          onClick={handleAdd}
          className={`w-full py-3.5 rounded-[1.2rem] flex items-center justify-center gap-2 transition-all duration-500 font-bold font-hind uppercase tracking-[0.15em] text-[9px] shadow-lg active:scale-[0.98] group/btn ${isDarkMode
              ? 'bg-white text-[#1A0F05] hover:bg-[#FF9933]'
              : 'bg-[#1A0F05] text-white hover:bg-[#FF9933] hover:text-[#1A0F05]'
            }`}
        >
          <ShoppingBag size={14} className="group-hover/btn:scale-110 transition-transform" /> Add to Cart
        </button>
      </div>

      <AnimatePresence>
        {isFlying && (
          <motion.div
            initial={{ x: 0, y: 0, scale: 1 }}
            animate={{ x: 0, y: -200, scale: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeIn" }}
            className="absolute z-50 left-1/2 -translate-x-1/2 top-1/2 w-12 h-12 bg-[#FF9933] rounded-full shadow-2xl flex items-center justify-center pointer-events-none"
          >
            <ShoppingBag size={20} color="white" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductCard;