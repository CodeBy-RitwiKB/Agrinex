import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter } from 'lucide-react';
import ProductCard from './ProductCard';

const ProductsSection = ({ products, onOpenFilters, isDarkMode }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const productsPerPage = 4;
  const totalPages = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000);

    return () => clearInterval(timer);
  }, [totalPages, isPaused]);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentProducts = products.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  return (
    <section className={`min-h-screen py-32 px-6 md:px-12 transition-colors duration-1000 relative overflow-hidden border-b ${isDarkMode ? 'bg-[#0D0804] border-white/5' : 'bg-[#EFEDE8] border-[#1A0F05]/10'
      }`}>
      {/* Premium Jewel Divider */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] flex items-center justify-center z-30">
        <div className={`w-[80%] h-full bg-gradient-to-r from-transparent via-current to-transparent opacity-40 ${isDarkMode ? 'text-white' : 'text-[#1A0F05]'}`}></div>
        <div className="absolute w-2.5 h-2.5 bg-[#FF9933] rotate-45 shadow-[0_0_15px_#FF9933] z-40"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gsap-reveal">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-12 h-[1px] bg-[#FF9933]"></span>
              <span className="font-hind text-[#FF9933] text-xs uppercase tracking-[0.4em] font-bold">Marketplace</span>
            </div>
            <h2 className={`text-5xl md:text-7xl tracking-tight font-yatra transition-colors duration-700 ${isDarkMode ? 'text-white' : 'text-[#1A0F05]'
              }`}>Trending This Week</h2>
          </div>

          <div className="flex items-center gap-6">
            {/* Carousel Navigation */}
            <div className="flex items-center gap-4 mr-8">
              <button
                onClick={handlePrev}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 group ${isDarkMode ? 'border-white/10 text-white' : 'border-[#1A0F05]/10 text-[#1A0F05]'
                  } hover:bg-[#FF9933] hover:border-[#FF9933] hover:text-white`}
              >
                <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 group ${isDarkMode ? 'border-white/10 text-white' : 'border-[#1A0F05]/10 text-[#1A0F05]'
                  } hover:bg-[#FF9933] hover:border-[#FF9933] hover:text-white`}
              >
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <button
              onClick={onOpenFilters}
              className={`flex items-center gap-3 px-10 py-5 rounded-full transition-all duration-500 font-bold font-hind uppercase tracking-widest text-xs group ${isDarkMode
                ? 'bg-[#FF9933] text-[#1A0F05] hover:bg-white shadow-[0_20px_40px_rgba(255,153,51,0.15)]'
                : 'bg-[#1A0F05] text-white hover:bg-[#FF9933] hover:text-[#1A0F05] shadow-2xl'
                }`}
            >
              <Filter size={16} className="group-hover:rotate-180 transition-transform duration-700" /> Filter
            </button>
          </div>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pt-6 pb-10"
            >
              {currentProducts.map(p => <ProductCard key={p.id} product={p} isDarkMode={isDarkMode} />)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Premium Pagination Dots */}
        <div className="flex justify-center items-center gap-3 mt-12">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className="relative flex items-center justify-center p-2 group"
            >
              <motion.div
                animate={{
                  width: currentPage === i ? 24 : 8,
                  backgroundColor: currentPage === i ? '#FF9933' : (isDarkMode ? '#ffffff20' : '#1A0F0520')
                }}
                className="h-2 rounded-full transition-all duration-500"
              />
              {currentPage === i && (
                <motion.div
                  layoutId="dot-glow"
                  className="absolute inset-0 bg-[#FF9933]/20 blur-md rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
