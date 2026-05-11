import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, CreditCard, Smartphone, Banknote, ArrowRight, Loader2 } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, onConfirm, total, isDarkMode }) => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isVerifying, setIsVerifying] = useState(false);

  const methods = [
    { id: 'card', name: 'Credit / Debit Card', icon: <CreditCard size={20} />, description: 'Visa, Mastercard, RuPay' },
    { id: 'upi', name: 'UPI / PhonePe / GPay', icon: <Smartphone size={20} />, description: 'Instant secure transfer' },
    { id: 'pod', name: 'Pay on Delivery', icon: <Banknote size={20} />, description: 'Cash or QR at your door' },
  ];

  const handleFinalConfirm = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onConfirm();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[300]"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-[301] p-1 rounded-[3rem] overflow-hidden ${
              isDarkMode ? 'bg-gradient-to-b from-white/10 to-transparent shadow-[0_0_100px_rgba(0,0,0,0.5)]' : 'bg-white shadow-2xl'
            }`}
          >
            <div className={`p-10 rounded-[2.8rem] ${isDarkMode ? 'bg-[#0D0804]' : 'bg-[#F9F8F6]'}`}>
              
              {/* Header */}
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#FF9933]/20 rounded-xl text-[#FF9933]">
                    <ShieldCheck size={24} />
                  </div>
                  <h2 className="font-yatra text-3xl tracking-tight">Finalize <span className="text-[#FF9933]">Payment</span></h2>
                </div>
                <button onClick={onClose} className="p-2 hover:rotate-90 transition-transform opacity-40 hover:opacity-100">
                  <X size={24} />
                </button>
              </div>

              {/* Order Summary Mini */}
              <div className={`mb-10 p-6 rounded-3xl border flex items-center justify-between ${
                isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-black/5'
              }`}>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Total Amount Payable</span>
                <span className="font-yatra text-3xl text-[#FF9933]">${total.toFixed(2)}</span>
              </div>

              {/* Method Selection */}
              <div className="space-y-4 mb-10">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 ml-1">Select Payment Method</label>
                <div className="space-y-3">
                  {methods.map((method) => (
                    <div 
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all duration-500 flex items-center gap-4 ${
                        selectedMethod === method.id 
                          ? 'border-[#FF9933] bg-[#FF9933]/5 ring-1 ring-[#FF9933]/50 shadow-xl' 
                          : 'border-current opacity-20 hover:opacity-60'
                      }`}
                    >
                      <div className={`p-3 rounded-xl ${selectedMethod === method.id ? 'bg-[#FF9933] text-white' : 'bg-current opacity-10'}`}>
                        {method.icon}
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-hind font-bold text-sm">{method.name}</h4>
                        <p className="text-[10px] opacity-60 uppercase tracking-widest">{method.description}</p>
                      </div>
                      {selectedMethod === method.id && (
                        <motion.div layoutId="check" className="text-[#FF9933]">
                          <ShieldCheck size={20} />
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Confirm Button */}
              <button 
                disabled={isVerifying}
                onClick={handleFinalConfirm}
                className={`w-full py-6 rounded-2xl flex items-center justify-center gap-4 font-hind font-black uppercase tracking-[0.2em] text-xs transition-all duration-500 relative overflow-hidden ${
                  isDarkMode 
                    ? 'bg-white text-black hover:bg-[#FF9933]' 
                    : 'bg-black text-white hover:bg-[#FF9933] hover:text-black'
                }`}
              >
                {isVerifying ? (
                  <div className="flex items-center gap-3">
                    <Loader2 size={20} className="animate-spin" />
                    Verifying Transaction...
                  </div>
                ) : (
                  <>Complete Purchase <ArrowRight size={18} /></>
                )}
              </button>

              <p className="text-center mt-6 text-[8px] font-hind opacity-30 uppercase tracking-[0.2em]">
                Your transaction is protected by 256-bit SSL encryption.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
