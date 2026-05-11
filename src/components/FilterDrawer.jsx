import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const FilterDrawer = ({ isOpen, onClose, isDarkMode }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[1000]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={`fixed right-0 top-0 h-full w-[22rem] z-[1001] p-10 shadow-[0_0_100px_rgba(0,0,0,0.5)] border-l transition-colors duration-1000 ${
              isDarkMode 
                ? 'bg-[#101A10]/95 backdrop-blur-2xl border-white/5 text-white' 
                : 'bg-[#FDFDFB]/95 backdrop-blur-2xl border-gray-100 text-[#1A0F05]'
            }`}
          >
            <div className="flex justify-between items-center mb-12">
              <div className="flex flex-col">
                <span className="font-hind text-[#FF9933] text-[10px] uppercase tracking-[0.4em] font-black mb-1">Curation</span>
                <h2 className="text-4xl font-yatra tracking-tight">Filters</h2>
              </div>
              <button 
                onClick={onClose}
                className={`p-3 rounded-full transition-all duration-300 ${
                  isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'
                }`}
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-12">
              <div>
                <p className={`font-hind text-xs uppercase tracking-[0.3em] font-bold mb-6 opacity-40 ${
                  isDarkMode ? 'text-white' : 'text-[#1A0F05]'
                }`}>Product Type</p>
                <div className="space-y-4">
                  {['Organic Produce', 'Hydroponic Greens', 'Hand-Crafted Tools', 'Bio-Fertilizers'].map(cat => (
                    <label key={cat} className="flex items-center gap-4 group cursor-pointer">
                      <div className="relative flex items-center justify-center">
                        <input type="checkbox" className="peer appearance-none w-5 h-5 border border-[#FF9933]/30 rounded-md checked:bg-[#FF9933] transition-all duration-300" />
                        <div className="absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <span className={`font-hind text-sm transition-colors duration-300 group-hover:text-[#FF9933] ${
                        isDarkMode ? 'text-white/60' : 'text-[#1A0F05]/70'
                      }`}>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className={`font-hind text-xs uppercase tracking-[0.3em] font-bold mb-6 opacity-40 ${
                  isDarkMode ? 'text-white' : 'text-[#1A0F05]'
                }`}>Marketplace Region</p>
                <div className="space-y-4">
                  {['Maharashtra', 'Punjab', 'Kerala', 'Himachal'].map(region => (
                    <label key={region} className="flex items-center gap-4 group cursor-pointer">
                      <div className="relative flex items-center justify-center">
                        <input type="checkbox" className="peer appearance-none w-5 h-5 border border-[#FF9933]/30 rounded-md checked:bg-[#FF9933] transition-all duration-300" />
                        <div className="absolute opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <span className={`font-hind text-sm transition-colors duration-300 group-hover:text-[#FF9933] ${
                        isDarkMode ? 'text-white/60' : 'text-[#1A0F05]/70'
                      }`}>{region}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute bottom-10 left-10 right-10">
              <button 
                onClick={onClose}
                className={`w-full py-5 rounded-2xl font-hind font-bold uppercase tracking-[0.2em] text-xs transition-all duration-500 shadow-xl ${
                  isDarkMode 
                    ? 'bg-white text-[#1A0F05] hover:bg-[#FF9933]' 
                    : 'bg-[#1A0F05] text-white hover:bg-[#FF9933] hover:text-[#1A0F05]'
                }`}
              >
                Apply Curation
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterDrawer;