import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import FilterDrawer from '../components/FilterDrawer';
import { getCloudinaryUrl } from '../utils/cloudinary';

const DepartmentPage = ({ products, categories, isDarkMode }) => {
  const { id } = useParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Clean up ID and handle UUIDs
  const categoryIdOrName = decodeURIComponent(id);
  
  // Try to find category by name first (legacy), then by ID (new dynamic way)
  const currentCategory = categories.find(c => c.name === categoryIdOrName || c.id === categoryIdOrName);
  const categoryName = currentCategory ? currentCategory.name : categoryIdOrName;
  
  const filteredProducts = products.filter(p => 
    p.category === categoryName || p.category_id === categoryIdOrName
  );


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryName]);

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${
      isDarkMode ? 'bg-[#0D0804] text-white' : 'bg-[#EFEDE8] text-[#1A0F05]'
    }`}>
      {/* Department Hero */}
      <section className="relative pt-48 pb-20 px-6 md:px-12 overflow-hidden">
        {/* Immersive Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={currentCategory?.img || getCloudinaryUrl('organic')} 
            alt={categoryName}
            className="w-full h-full object-cover opacity-10 blur-sm scale-110"
          />
          <div className={`absolute inset-0 ${
            isDarkMode 
              ? 'bg-gradient-to-b from-[#0D0804] via-[#0D0804]/90 to-[#0D0804]' 
              : 'bg-gradient-to-b from-[#EFEDE8] via-[#EFEDE8]/90 to-[#EFEDE8]'
          }`} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <Link 
            to="/" 
            className="flex items-center gap-2 mb-8 group w-fit"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 ${
              isDarkMode ? 'border-white/10 group-hover:bg-[#FF9933]' : 'border-[#1A0F05]/10 group-hover:bg-[#1A0F05] group-hover:text-white'
            }`}>
              <ChevronLeft size={18} />
            </div>
            <span className="font-hind font-bold uppercase tracking-widest text-[10px] opacity-50 group-hover:opacity-100 transition-opacity">Return to Home</span>
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="w-12 h-[1px] bg-[#FF9933]"></span>
                <span className="font-hind text-[#FF9933] text-xs uppercase tracking-[0.4em] font-bold">Marketplace Department</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-yatra tracking-tighter leading-none mb-6">
                {categoryName.split(' ').map((word, i) => (
                  <span key={i} className={i % 2 !== 0 ? 'text-[#FF9933]' : ''}>{word} </span>
                ))}
              </h1>
              <p className="mt-6 text-xl opacity-60 font-hind max-w-2xl leading-relaxed">
                "The full spectrum of Agrinex excellence. From precision machinery to organic harvests, explore our complete ecosystem."
              </p>
            </div>
            
            <button 
              onClick={() => setIsFilterOpen(true)}
              className={`flex items-center gap-3 px-12 py-6 rounded-2xl transition-all duration-500 font-bold font-hind uppercase tracking-[0.2em] text-[10px] group ${
                isDarkMode 
                  ? 'bg-[#FF9933] text-[#1A0F05] hover:bg-white shadow-2xl' 
                  : 'bg-[#1A0F05] text-white hover:bg-[#FF9933] hover:text-[#1A0F05] shadow-2xl'
              }`}
            >
              <Filter size={14} className="group-hover:rotate-180 transition-transform duration-700" /> Refine Search
            </button>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {filteredProducts.map(p => (
                <ProductCard key={p.id} product={p} isDarkMode={isDarkMode} />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center">
              <h2 className="text-2xl font-hind opacity-40">No products available in this department yet.</h2>
            </div>
          )}
        </div>
      </section>

      <Footer isDarkMode={isDarkMode} />
      <FilterDrawer isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} isDarkMode={isDarkMode} />
    </div>
  );
};

export default DepartmentPage;
