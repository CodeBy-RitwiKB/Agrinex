import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { Link } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose, isDarkMode }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const drawerVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: { type: 'spring', damping: 25, stiffness: 200 }
    },
    exit: { 
      x: '100%',
      transition: { type: 'spring', damping: 25, stiffness: 200 }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          {/* Drawer */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed top-0 right-0 h-full w-full max-w-md z-[201] shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col ${
              isDarkMode ? 'bg-[#0D0804] text-white border-l border-white/5' : 'bg-[#EFEDE8] text-[#1A0F05] border-l border-black/5'
            }`}
          >
            {/* Header */}
            <div className={`p-8 flex items-center justify-between border-b ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-[#FF9933]" />
                <h2 className="font-yatra text-2xl tracking-tight">Your <span className="text-[#FF9933]">Cart</span></h2>
              </div>
              <button 
                onClick={onClose}
                className={`p-3 rounded-full border transition-all duration-500 hover:rotate-90 ${
                  isDarkMode ? 'border-white/10 hover:bg-white hover:text-black' : 'border-black/10 hover:bg-black hover:text-white'
                }`}
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div 
              data-lenis-prevent
              className="flex-grow overflow-y-auto p-8 space-y-6 custom-scrollbar"
            >
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center opacity-30 gap-4">
                  <ShoppingBag size={64} strokeWidth={1} />
                  <p className="font-hind text-xs uppercase tracking-[0.3em] font-black">Cart is empty</p>
                </div>
              ) : (
                cart.map((item, i) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-4 rounded-3xl border flex gap-4 group relative transition-all duration-500 ${
                      isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-black/5 hover:shadow-xl'
                    }`}
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <h4 className="font-yatra text-lg leading-tight mb-1">{item.name}</h4>
                        <p className="text-[10px] font-hind opacity-40 uppercase tracking-widest">{item.category}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-3 bg-black/5 dark:bg-white/5 p-1 rounded-full border border-current opacity-20 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1.5 hover:text-[#FF9933] transition-colors"><Minus size={12} /></button>
                            <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1.5 hover:text-[#FF9933] transition-colors"><Plus size={12} /></button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-full transition-all opacity-40 group-hover:opacity-100"
                            title="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <span className="font-yatra text-[#FF9933]">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className={`p-8 space-y-6 border-t ${
                isDarkMode ? 'bg-[#150D07] border-white/10' : 'bg-white border-black/10'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Subtotal</span>
                  <span className="font-yatra text-3xl">${cartTotal.toFixed(2)}</span>
                </div>
                <Link 
                  to="/cart"
                  onClick={onClose}
                  className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-hind font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 group ${
                    isDarkMode ? 'bg-[#FF9933] text-[#1A0F05] hover:bg-white' : 'bg-[#1A0F05] text-white hover:bg-[#FF9933] hover:text-[#1A0F05]'
                  }`}
                >
                  Proceed to Checkout <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
