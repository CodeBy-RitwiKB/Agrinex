import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../hooks/useCart';
import { ShieldCheck, CreditCard, Smartphone, Banknote, ArrowRight, Loader2, ArrowLeft, CheckCircle2, Lock, Sun, Moon, User } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { getCloudinaryUrl } from '../utils/cloudinary';

const logo = getCloudinaryUrl('logo');

const PaymentPage = ({ isDarkMode, onToggleDarkMode }) => {
  const { cart, cartTotal, resetCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form States
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const [upiData, setUpiData] = useState({
    id: '',
    mode: 'vpa' // 'vpa' or 'qr'
  });

  const handleCardChange = (e) => {
    let { name, value } = e.target;

    if (name === 'number') {
      value = value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim().substring(0, 19);
    } else if (name === 'expiry') {
      value = value.replace(/\//g, '').replace(/(\d{2})/g, '$1/').trim().substring(0, 5);
      if (value.endsWith('/')) value = value.slice(0, -1);
    } else if (name === 'cvv') {
      value = value.substring(0, 3);
    }

    setCardData(prev => ({ ...prev, [name]: value }));
  };

  const getCardType = (number) => {
    if (number.startsWith('4')) return 'Visa';
    if (number.startsWith('5')) return 'Mastercard';
    if (number.startsWith('6')) return 'RuPay';
    return 'Card';
  };

  // Get shipping info from state or defaults
  const shippingInfo = location.state?.shippingInfo || { name: 'Customer', address: 'Selected Address' };
  const deliveryFee = location.state?.deliveryFee || 0;
  const discount = location.state?.discount || 0;
  const finalTotal = cartTotal + deliveryFee - discount;

  const { token } = useStore();
  const [error, setError] = useState(null);

  const handleFinalConfirm = async () => {
    if (!token) {
      setError('Please login to complete your purchase');
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items: cart.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })),
          total_amount: finalTotal,
          payment_method: selectedMethod,
          shipping_address: shippingInfo.address
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to place order');
      }

      setIsSuccess(true);
      resetCart();
    } catch (err) {
      console.error('Checkout Error:', err);
      setError(err.message);
    } finally {
      setIsVerifying(false);
    }
  };

  if (isSuccess) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-6 transition-colors duration-1000 ${isDarkMode ? 'bg-[#0D0804]' : 'bg-[#EFEDE8]'}`}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 bg-[#FF9933] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(255,153,51,0.4)]">
            <CheckCircle2 size={48} color="white" />
          </div>
          <h1 className="font-yatra text-5xl mb-4">Purchase <span className="text-[#FF9933]">Successful!</span></h1>
          <p className="font-hind text-lg opacity-60 mb-10">Your high-yield harvest is being prepared. A confirmation has been sent to {shippingInfo.name}.</p>
          <Link to="/" className={`px-10 py-4 rounded-2xl font-hind font-black uppercase tracking-[0.2em] text-xs transition-all duration-500 ${isDarkMode ? 'bg-white text-black hover:bg-[#FF9933]' : 'bg-black text-white hover:bg-[#FF9933] hover:text-black'
            }`}>
            Return to Marketplace
          </Link>
        </motion.div>
      </div>
    );
  }

  const UPILogo = () => (
    <img
      src="https://res.cloudinary.com/dhpvb2emj/image/upload/q_auto/f_auto/v1778253725/upi_logo.png"
      alt="UPI Logo"
      className="w-10 h-auto object-contain brightness-550 contrast-125 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
    />
  );

  const CardLogos = () => (
    <img 
      src="https://res.cloudinary.com/dhpvb2emj/image/upload/q_auto/f_auto/v1778254088/debit_card.png" 
      alt="Card Logos" 
      className="w-10 h-auto object-contain brightness-125 contrast-110" 
    />
  );

  const PODLogo = () => (
    <img 
      src="https://res.cloudinary.com/dhpvb2emj/image/upload/q_auto/f_auto/v1778254195/pod.png" 
      alt="Pay on Delivery" 
      className="w-10 h-auto object-contain brightness-125 contrast-110" 
    />
  );

  const methods = [
    { id: 'card', name: 'Credit / Debit Card', icon: <CardLogos />, description: 'Visa, Mastercard, RuPay' },
    { id: 'upi', name: 'UPI / PhonePe / GPay', icon: <UPILogo />, description: 'Instant secure transfer' },
    { id: 'pod', name: 'Pay on Delivery', icon: <PODLogo />, description: 'Cash or QR at your door' },
  ];

  return (
    <div className={`min-h-screen pt-10 pb-20 px-6 transition-colors duration-1000 ${isDarkMode ? 'bg-[#0D0804] text-white' : 'bg-[#EFEDE8] text-[#1A0F05]'}`}>
      <div className="max-w-4xl mx-auto">
        
        {/* Embedded Header (Navbar Elements) */}
        <div className="flex items-center justify-between gap-8 mb-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer shrink-0 group">
            <img 
              src={logo} 
              alt="Agrinex Logo" 
              className="h-9 w-auto object-contain transition-all duration-500 group-hover:scale-105" 
            />
            <span className="font-yatra text-xl md:text-2xl tracking-tight">
              <span className={isDarkMode ? 'text-white' : 'text-[#1A0F05]'}>Agri</span>
              <span className="text-[#FF9933]">nex</span>
            </span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-8 shrink-0">
            <button 
              onClick={onToggleDarkMode}
              className={`p-2 rounded-full border transition-all duration-500 active:scale-90 ${
                isDarkMode ? 'border-white/10 hover:bg-white hover:text-[#1A0F05]' : 'border-[#1A0F05]/10 hover:bg-[#1A0F05] hover:text-white'
              }`}
            >
              {isDarkMode ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
            </button>

            <Link 
              to="/account"
              className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-all group font-hind uppercase tracking-[0.2em] text-[10px] font-black"
            >
              <User size={18} strokeWidth={2.5} />
              <span className="hidden md:block">Account</span>
            </Link>
          </div>
        </div>

        {/* Header Content */}
        <div className="mb-12">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity mb-4">
            <ArrowLeft size={14} /> Back to Shipping
          </button>
          <h1 className="font-yatra text-6xl tracking-tighter">Select <span className="text-[#FF9933]">Payment</span></h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left: Payment Options */}
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="block text-[10px] font-black mt-2 mb-6 uppercase tracking-[0.3em] opacity-60 ml-6">Payment Methods</label>
              <div className="space-y-4">
                {methods.map((method) => (
                  <div key={method.id} className="space-y-4">
                    <div
                      onClick={() => setSelectedMethod(selectedMethod === method.id ? null : method.id)}
                      className={`p-6 rounded-[2.5rem] border cursor-pointer transition-all duration-500 flex items-center gap-6 ${selectedMethod === method.id
                        ? 'border-[#FF9933] bg-[#FF9933]/5 ring-1 ring-[#FF9933]/50 shadow-2xl scale-[1.02]'
                        : 'border-current opacity-40 hover:opacity-100'
                        }`}
                    >
                      <div className={`p-4 rounded-2xl transition-colors duration-500 ${selectedMethod === method.id ? 'bg-[#FF9933] text-white shadow-lg' : 'bg-[#FF9933]/10 text-[#FF9933]'}`}>
                        {method.icon}
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-yatra text-xl tracking-tight">{method.name}</h4>
                        <p className="text-[10px] font-hind opacity-60 uppercase tracking-widest">{method.description}</p>
                      </div>
                      {selectedMethod === method.id && (
                        <div className="text-[#FF9933]">
                          <CheckCircle2 size={24} />
                        </div>
                      )}
                    </div>

                    {/* Expandable Card Form */}
                    <AnimatePresence>
                      {selectedMethod === 'card' && method.id === 'card' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <form onSubmit={(e) => e.preventDefault()} className={`p-8 rounded-[2.5rem] border border-dashed flex flex-col gap-6 ${isDarkMode ? 'bg-white/[0.02] border-white/10' : 'bg-black/[0.02] border-black/10'}`}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">Card Details</span>
                              <div className="flex gap-2 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                                <Lock size={12} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Encrypted</span>
                              </div>
                            </div>

                            <div className="relative">
                              <input
                                type="text"
                                name="number"
                                placeholder="0000 0000 0000 0000"
                                value={cardData.number}
                                onChange={handleCardChange}
                                className={`w-full bg-transparent border-b border-current/20 py-4 font-hind text-lg tracking-[0.2em] focus:outline-none focus:border-[#FF9933] transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}
                              />
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                <span className="text-[10px] font-black opacity-40 uppercase tracking-widest">{getCardType(cardData.number)}</span>
                                <CreditCard size={18} className="opacity-40" />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                              <div className="flex flex-col gap-2">
                                <label className="text-[8px] font-black uppercase tracking-widest opacity-40">Expiry Date</label>
                                <input
                                  type="text"
                                  name="expiry"
                                  placeholder="MM / YY"
                                  value={cardData.expiry}
                                  onChange={handleCardChange}
                                  className={`bg-transparent border-b border-current/20 py-4 font-hind text-lg tracking-widest focus:outline-none focus:border-[#FF9933] transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}
                                />
                              </div>
                              <div className="flex flex-col gap-2">
                                <label className="text-[8px] font-black uppercase tracking-widest opacity-40">CVV</label>
                                <input
                                  type="password"
                                  name="cvv"
                                  autoComplete="cc-csc"
                                  placeholder="***"
                                  value={cardData.cvv}
                                  onChange={handleCardChange}
                                  className={`bg-transparent border-b border-current/20 py-4 font-hind text-lg tracking-[0.5em] focus:outline-none focus:border-[#FF9933] transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}
                                />
                              </div>
                            </div>

                            <div className="flex flex-col gap-2">
                              <label className="text-[8px] font-black uppercase tracking-widest opacity-40">Cardholder Name</label>
                              <input
                                type="text"
                                name="name"
                                placeholder="NAME ON CARD"
                                value={cardData.name}
                                onChange={handleCardChange}
                                className={`bg-transparent border-b border-current/20 py-4 font-hind text-sm uppercase tracking-widest focus:outline-none focus:border-[#FF9933] transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}
                              />
                            </div>
                          </form>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Expandable UPI Form */}
                    <AnimatePresence>
                      {selectedMethod === 'upi' && method.id === 'upi' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <form onSubmit={(e) => e.preventDefault()} className={`p-8 rounded-[2.5rem] border border-dashed flex flex-col gap-8 ${isDarkMode ? 'bg-white/[0.02] border-white/10' : 'bg-black/[0.02] border-black/10'}`}>

                            {/* Mode Switcher */}
                            <div className="flex p-1 bg-current/5 rounded-2xl">
                              <button
                                onClick={() => setUpiData(prev => ({ ...prev, mode: 'vpa' }))}
                                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${upiData.mode === 'vpa' ? 'bg-[#FF9933] text-white shadow-lg' : 'opacity-40 hover:opacity-100'}`}
                              >
                                UPI ID
                              </button>
                              <button
                                onClick={() => setUpiData(prev => ({ ...prev, mode: 'qr' }))}
                                className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${upiData.mode === 'qr' ? 'bg-[#FF9933] text-white shadow-lg' : 'opacity-40 hover:opacity-100'}`}
                              >
                                Scan QR
                              </button>
                            </div>

                            {upiData.mode === 'vpa' ? (
                              <div className="space-y-6">
                                <div className="relative">
                                  <input
                                    type="text"
                                    placeholder="username@bank"
                                    value={upiData.id}
                                    onChange={(e) => setUpiData(prev => ({ ...prev, id: e.target.value }))}
                                    className={`w-full bg-transparent border-b border-current/20 py-4 font-hind text-lg tracking-wider focus:outline-none focus:border-[#FF9933] transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}
                                  />
                                  <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-40">
                                    <Smartphone size={18} />
                                  </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {['@okaxis', '@okicici', '@paytm', '@ybl'].map(handle => (
                                    <button
                                      key={handle}
                                      onClick={() => setUpiData(prev => ({ ...prev, id: (upiData.id.split('@')[0] || 'user') + handle }))}
                                      className="px-3 py-1.5 rounded-full border border-current/10 text-[8px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 hover:border-[#FF9933] transition-all"
                                    >
                                      {handle}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-6 py-4">
                                <div className={`p-4 rounded-[2rem] border aspect-square w-48 flex items-center justify-center relative overflow-hidden ${isDarkMode ? 'bg-white border-white/10' : 'bg-white border-black/5 shadow-xl'}`}>
                                  {/* Simulated QR Code with CSS */}
                                  <div className="grid grid-cols-4 gap-2 w-full h-full opacity-80">
                                    {[...Array(16)].map((_, i) => (
                                      <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? 'bg-black' : 'bg-transparent'}`} />
                                    ))}
                                  </div>
                                  <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
                                    <div className="w-12 h-12 bg-[#FF9933] rounded-2xl flex items-center justify-center shadow-lg">
                                      <CheckCircle2 color="white" size={24} />
                                    </div>
                                  </div>
                                </div>
                                <p className="text-[10px] font-hind text-center opacity-40 uppercase tracking-widest leading-relaxed">
                                  Scan this QR with any UPI app<br />(GPay, PhonePe, BHIM)
                                </p>
                              </div>
                            )}
                          </form>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Note */}
            <div className={`p-6 rounded-3xl border flex items-center gap-4 ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-black/5'}`}>
              <ShieldCheck size={24} className="text-green-500" />
              <p className="text-[10px] font-hind opacity-60 uppercase tracking-widest leading-relaxed">
                Your payment is processed through a secure 256-bit encrypted gateway. Agrinex does not store your card details.
              </p>
            </div>
          </div>

          {/* Right: Summary Box */}
          <div className="w-[550px]">
            <div className={`p-8 rounded-[3rem] border sticky top-32 transition-all duration-1000 ${isDarkMode
              ? 'bg-white/[0.03] backdrop-blur-[100px] border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]'
              : 'bg-white border-black/5 shadow-2xl'
              }`}>
              <h3 className="font-yatra text-3xl mb-8">Order <span className="text-[#FF9933]">Summary</span></h3>

              {/* Itemized List */}
              <div
                data-lenis-prevent
                className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar"
              >
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border border-current/10 bg-white/5 p-1">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-hind font-bold leading-tight">{item.name}</h4>
                      <p className="text-[10px] opacity-40 font-black tracking-widest uppercase mt-1">Quantity: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-yatra">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-8 pt-6 border-t border-current/10">
                <div className="flex justify-between text-sm font-hind opacity-50">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm font-hind text-green-500">
                    <span className="opacity-70 italic">Harvest Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-hind opacity-50">
                  <span>Delivery ({deliveryFee > 0 ? 'Express' : 'Standard'})</span>
                  <span>{deliveryFee > 0 ? `$${deliveryFee.toFixed(2)}` : 'FREE'}</span>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-current/10 mt-6">
                  <span className="font-yatra text-2xl">Total</span>
                  <span className="font-yatra text-5xl text-[#FF9933] tracking-tighter">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest text-center"
                  >
                    {error}
                  </motion.div>
                )}
                
                <button
                  disabled={isVerifying}
                  onClick={handleFinalConfirm}
                  className={`w-full py-6 rounded-2xl flex items-center justify-center gap-4 font-hind font-black uppercase tracking-[0.2em] text-xs transition-all duration-500 relative overflow-hidden ${isDarkMode
                    ? 'bg-white text-black hover:bg-[#FF9933]'
                    : 'bg-black text-white hover:bg-[#FF9933] hover:text-black'
                    }`}
                >
                  {isVerifying ? (
                    <div className="flex items-center gap-3">
                      <Loader2 size={18} className="animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    <>Place Order <ArrowRight size={18} /></>
                  )}
                </button>

              <div className="mt-8 flex flex-col gap-3">
                <div className="flex items-center gap-3 opacity-40">
                  <div className="h-[1px] flex-grow bg-current" />
                  <span className="text-[8px] font-black uppercase tracking-[0.3em]">Verified Secure</span>
                  <div className="h-[1px] flex-grow bg-current" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
