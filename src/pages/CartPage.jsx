import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../hooks/useCart';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, Truck, ShieldCheck, ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Globe, Sun, Moon, User, ShoppingCart } from 'lucide-react';
import _PhoneInput from 'react-phone-input-2';
const PhoneInput = _PhoneInput.default || _PhoneInput;
import 'react-phone-input-2/lib/style.css';
import { getCloudinaryUrl } from '../utils/cloudinary';

const logo = getCloudinaryUrl('logo');

const CartPage = ({ isDarkMode, onToggleDarkMode, onOpenCart }) => {
  const { cart = [], removeFromCart, updateQuantity, cartTotal = 0, shippingData, updateShippingData } = useCart() || {};
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [detectedCountry, setDetectedCountry] = useState('in');
  const [coupon, setCoupon] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const formRef = React.useRef(null);

  useEffect(() => {
    // Set default country (India)
    setDetectedCountry('in');

    // Force clear selections every time we enter the cart page to prevent accidents
    updateShippingData({ deliveryType: '', paymentType: '' });
  }, []);

  const handleInputChange = (e, field) => {
    updateShippingData({ [field]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const newErrors = {};

    // 1. Validate Text Fields
    if (!shippingData.name) newErrors.name = "Full Name is required";
    if (!shippingData.phone) newErrors.phone = "Phone Number is required";
    if (!shippingData.address1) newErrors.address1 = "Primary Address is required";
    if (!shippingData.pincode) newErrors.pincode = "Pincode is required";
    else if (!/^[0-9]{6}$/.test(shippingData.pincode)) newErrors.pincode = "Invalid Pincode (6 digits)";

    // 2. Validate Delivery
    if (!shippingData.deliveryType) newErrors.delivery = "Please select a delivery method";

    // 3. Validate Payment
    if (!shippingData.paymentType) newErrors.payment = "Please select a payment method";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Smoothly scroll to the first error
      const firstErrorKey = Object.keys(newErrors)[0];
      const element = document.getElementById(`field-${firstErrorKey}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    navigate('/payment', { 
      state: { 
        shippingInfo: shippingData,
        deliveryFee: shippingData.deliveryType === 'express' ? 10 : 0,
        discount: isCouponApplied ? cartTotal * 0.1 : 0
      } 
    });
  };

  const ErrorLabel = ({ message }) => (
    <motion.span 
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-[9px] font-black uppercase tracking-widest text-red-500 mt-2 block ml-1"
    >
      {message}
    </motion.span>
  );

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
          <p className="font-hind text-lg opacity-60 mb-10">Your high-yield harvest is being prepared for dispatch. A confirmation email has been sent to your account.</p>
          <Link to="/" className={`px-10 py-4 rounded-2xl font-hind font-black uppercase tracking-[0.2em] text-xs transition-all duration-500 ${
            isDarkMode ? 'bg-white text-black hover:bg-[#FF9933]' : 'bg-black text-white hover:bg-[#FF9933] hover:text-black'
          }`}>
            Return to Marketplace
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-10 pb-20 px-6 transition-colors duration-1000 ${isDarkMode ? 'bg-[#0D0804] text-white' : 'bg-[#EFEDE8] text-[#1A0F05]'}`}>
      <div className="max-w-7xl mx-auto">
        
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
            
            <button 
              onClick={onOpenCart}
              className="relative flex items-center gap-2 opacity-70 hover:opacity-100 transition-all group font-hind uppercase tracking-[0.2em] text-[10px] font-black"
            >
              <div className="relative">
                <ShoppingCart size={18} strokeWidth={2.5} />
                {cart.length > 0 && (
                  <span className={`absolute -top-2.5 -right-2.5 text-[9px] font-black w-4.5 h-4.5 flex items-center justify-center rounded-full border-2 ${
                    isDarkMode ? 'bg-[#FF9933] text-[#1A0F05] border-[#1A0F05]' : 'bg-[#1A0F05] text-white border-white'
                  }`}>
                    {cart.length}
                  </span>
                )}
              </div>
              <span className="hidden md:block">Cart</span>
            </button>
          </div>
        </div>

        {/* Main Content Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="font-yatra text-6xl md:text-7xl tracking-tighter">Your <span className="text-[#FF9933]">Harvest</span> Cart</h1>
          </div>
          <div className="flex items-center gap-6 opacity-40 text-xs font-hind font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2"><ShieldCheck size={16} /> Secure Checkout</span>
            <span className="flex items-center gap-2"><Truck size={16} /> Premium Delivery</span>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="h-[50vh] flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 border-2 border-current opacity-10 rounded-full flex items-center justify-center mb-8">
              <ShoppingBag size={32} />
            </div>
            <h2 className="font-yatra text-3xl mb-4">Your cart is as empty as a dry field.</h2>
            <p className="font-hind opacity-60 mb-10">Explore our premium catalog to start your next harvest.</p>
            <Link to="/" className="bg-[#FF9933] text-[#1A0F05] px-10 py-4 rounded-2xl font-hind font-black uppercase tracking-[0.2em] text-xs hover:scale-105 transition-all">
              Explore Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left: Item Review */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Review Items ({cart.length})</span>
                <div className="h-[1px] bg-current opacity-10 w-full" />
              </div>

              <div className="space-y-6">
                {cart.map((item) => (
                  <motion.div 
                    layout
                    key={item.id}
                    className={`p-6 rounded-[2.5rem] border flex flex-col sm:flex-row gap-8 relative group transition-all duration-500 ${
                      isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-white border-black/5 hover:shadow-2xl'
                    }`}
                  >
                    <div className="w-full sm:w-40 h-40 rounded-[1.8rem] overflow-hidden shrink-0">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                    </div>
                    
                    <div className="flex-grow flex flex-col justify-between py-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-yatra text-2xl mb-1">{item.name}</h3>
                          <span className="px-3 py-1 bg-[#FF9933]/10 text-[#FF9933] text-[9px] font-black uppercase tracking-widest rounded-full border border-[#FF9933]/20">
                            {item.category}
                          </span>
                        </div>
                        <span className="font-yatra text-3xl">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>

                      <div className="flex items-center justify-between mt-6 sm:mt-0">
                        <div className="flex items-center gap-6 bg-black/5 dark:bg-white/5 p-1.5 rounded-full border border-current opacity-20 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:text-[#FF9933] transition-colors"><Minus size={14} /></button>
                          <span className="text-sm font-black w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:text-[#FF9933] transition-colors"><Plus size={14} /></button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-500 hover:opacity-100 opacity-40 transition-opacity"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Checkout Details */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 transition-all duration-1000">
              <div className={`p-8 rounded-[3rem] border transition-all duration-1000 ${
                isDarkMode 
                  ? 'bg-white/[0.03] backdrop-blur-[100px] border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]' 
                  : 'bg-white border-black/5 shadow-2xl'
              }`}>
                <h2 className="font-yatra text-3xl mb-8">Checkout <span className="text-[#FF9933]">Details</span></h2>
                
                <form noValidate onSubmit={handlePlaceOrder} className="space-y-6">
                  <div className="space-y-5">
                    {/* Name & Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div id="field-name" className="space-y-2">
                        <label className={`text-[10px] font-black uppercase tracking-[0.3em] ml-1 transition-colors duration-500 ${errors.name ? 'text-red-500' : 'opacity-60'}`}>Full Name*</label>
                        <input 
                          required
                          type="text"
                          value={shippingData.name}
                          onChange={(e) => {
                            handleInputChange(e, 'name');
                            if (errors.name) setErrors(prev => ({ ...prev, name: null }));
                          }}
                          placeholder="Krish Vig"
                          className={`w-full p-4 rounded-2xl bg-transparent border outline-none transition-all duration-500 font-hind text-sm ${
                            errors.name 
                              ? 'border-red-500/50 bg-red-500/5 shadow-[0_0_15px_rgba(239,68,68,0.1)]' 
                              : isDarkMode ? 'border-white/10 focus:border-[#FF9933]' : 'border-gray-100 focus:border-[#1A0F05]'
                          }`}
                        />
                        {errors.name && <ErrorLabel message={errors.name} />}
                      </div>
                      <div id="field-phone" className="space-y-2 premium-phone-input" data-lenis-prevent>
                        <label className={`text-[10px] font-black uppercase tracking-[0.3em] ml-1 transition-colors duration-500 ${errors.phone ? 'text-red-500' : 'opacity-60'}`}>Phone Number*</label>
                        <PhoneInput
                          country={detectedCountry}
                          value={shippingData.phone}
                          countryCodeEditable={false}
                          onChange={(phone) => {
                            updateShippingData({ phone });
                            if (errors.phone) setErrors(prev => ({ ...prev, phone: null }));
                          }}
                          containerClass="phone-container"
                          inputClass={`!w-full !h-auto !py-4 !pl-11 !pr-4 !rounded-2xl !bg-transparent !border !font-hind !text-sm !transition-all !duration-500 ${
                            errors.phone 
                              ? '!border-red-500/50 !bg-red-500/5 !shadow-[0_0_15px_rgba(239,68,68,0.1)]' 
                              : isDarkMode ? '!border-white/10 !text-white focus:!border-[#FF9933]' : '!border-gray-100 !text-[#1A0F05] focus:!border-[#1A0F05]'
                          }`}
                          buttonClass={`!rounded-l-2xl !border-none !bg-transparent !pl-0.5 !transition-all !duration-500 ${
                            isDarkMode ? 'hover:!bg-white/5' : 'hover:!bg-black/5'
                          }`}
                          dropdownClass={`custom-scrollbar !rounded-[2rem] !border-white/10 !shadow-2xl !font-hind !text-sm ${
                            isDarkMode ? '!bg-[#0D0804]/90 !text-white' : '!bg-white/90 !text-[#1A0F05]'
                          }`}
                          searchClass={`!bg-transparent !border-b !border-current !opacity-20 !font-hind`}
                        />
                        {errors.phone && <ErrorLabel message={errors.phone} />}
                      </div>
                    </div>

                    {/* Address Line 1 */}
                    <div id="field-address1" className="space-y-2">
                      <label className={`text-[10px] font-black uppercase tracking-[0.3em] ml-1 transition-colors duration-500 ${errors.address1 ? 'text-red-500' : 'opacity-60'}`}>Address Line 1*</label>
                      <input 
                        required
                        type="text"
                        value={shippingData.address1}
                        onChange={(e) => {
                          handleInputChange(e, 'address1');
                          if (errors.address1) setErrors(prev => ({ ...prev, address1: null }));
                        }}
                        placeholder="House No, Building Name, Street"
                        className={`w-full p-4 rounded-2xl bg-transparent border outline-none transition-all duration-500 font-hind text-sm ${
                          errors.address1 
                            ? 'border-red-500/50 bg-red-500/5 shadow-[0_0_15px_rgba(239,68,68,0.1)]' 
                            : isDarkMode ? 'border-white/10 focus:border-[#FF9933]' : 'border-gray-100 focus:border-[#1A0F05]'
                        }`}
                      />
                      {errors.address1 && <ErrorLabel message={errors.address1} />}
                    </div>

                    {/* Address Line 2 & PIN */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 ml-1 block truncate">Address Line 2 (Optional)</label>
                        <input 
                          type="text"
                          value={shippingData.address2}
                          onChange={(e) => handleInputChange(e, 'address2')}
                          placeholder="Landmark, Area"
                          className={`w-full p-4 rounded-2xl bg-transparent border outline-none transition-all duration-500 font-hind text-sm ${
                            isDarkMode ? 'border-white/10 focus:border-[#FF9933]' : 'border-gray-100 focus:border-[#1A0F05]'
                          }`}
                        />
                      </div>
                      <div id="field-pincode" className="space-y-2">
                        <label className={`text-[10px] font-black uppercase tracking-[0.3em] ml-1 transition-colors duration-500 block truncate ${errors.pincode ? 'text-red-500' : 'opacity-60'}`}>Pincode*</label>
                        <input 
                          required
                          type="text"
                          pattern="[0-9]{6}"
                          value={shippingData.pincode}
                          onChange={(e) => {
                            handleInputChange(e, 'pincode');
                            if (errors.pincode) setErrors(prev => ({ ...prev, pincode: null }));
                          }}
                          placeholder="110001"
                          className={`w-full p-4 rounded-2xl bg-transparent border outline-none transition-all duration-500 font-hind text-sm ${
                            errors.pincode 
                              ? 'border-red-500/50 bg-red-500/5 shadow-[0_0_15px_rgba(239,68,68,0.1)]' 
                              : isDarkMode ? 'border-white/10 focus:border-[#FF9933]' : 'border-gray-100 focus:border-[#1A0F05]'
                          }`}
                        />
                        {errors.pincode && <ErrorLabel message={errors.pincode} />}
                      </div>
                    </div>

                    {/* Coupon Code */}
                    <div className="pt-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 ml-1">Have a Coupon?</label>
                      <div className="flex gap-3 mt-2">
                        <input 
                          type="text"
                          value={coupon}
                          onChange={(e) => setCoupon(e.target.value)}
                          placeholder="Enter code (e.g. AGRI10)"
                          className={`flex-grow p-4 rounded-2xl bg-transparent border outline-none transition-all duration-500 font-hind text-sm ${
                            isDarkMode ? 'border-white/10 focus:border-[#FF9933]' : 'border-gray-100 focus:border-[#1A0F05]'
                          }`}
                        />
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            if (coupon.toUpperCase() === 'AGRI10') setIsCouponApplied(true);
                          }}
                          className={`px-8 rounded-2xl font-hind font-black uppercase tracking-widest text-[10px] transition-all duration-500 ${
                            isCouponApplied 
                              ? 'bg-green-500 text-white cursor-default' 
                              : isDarkMode ? 'bg-white text-black hover:bg-[#FF9933]' : 'bg-black text-white hover:bg-[#FF9933]'
                          }`}
                        >
                          {isCouponApplied ? 'Applied' : 'Apply'}
                        </button>
                      </div>
                      {isCouponApplied && (
                        <motion.p 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-[10px] text-green-500 font-black uppercase tracking-widest mt-2 ml-1"
                        >
                          10% Harvest Discount Applied!
                        </motion.p>
                      )}
                    </div>
                  </div>
                    
                    {/* Delivery Method */}
                    <div id="field-delivery" className={`space-y-4 pt-4 border-t ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                      <div className="flex items-center justify-between">
                        <label className={`text-[10px] font-black uppercase tracking-[0.3em] ml-1 transition-colors duration-500 ${errors.delivery ? 'text-red-500' : 'opacity-60'}`}>Delivery Method*</label>
                        {errors.delivery && (
                          <motion.span 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-[9px] font-black uppercase tracking-widest text-white bg-red-500 px-3 py-1 rounded-full shadow-lg shadow-red-500/20"
                          >
                            Required
                          </motion.span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div 
                          onClick={() => {
                            updateShippingData({ deliveryType: 'standard' });
                            if (errors.delivery) setErrors(prev => ({ ...prev, delivery: null }));
                          }}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1 ${
                            shippingData.deliveryType === 'standard' 
                              ? 'border-[#FF9933] bg-[#FF9933]/5' 
                              : errors.delivery ? 'border-red-500/30 bg-red-500/5' : 'border-current opacity-20 hover:opacity-100'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <Truck size={18} className={shippingData.deliveryType === 'standard' ? 'text-[#FF9933]' : ''} />
                            {shippingData.deliveryType === 'standard' && <CheckCircle2 size={14} className="text-[#FF9933]" />}
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest">Standard Delivery</span>
                          <span className="text-[9px] opacity-60">3-5 Business Days • Free</span>
                        </div>
                        <div 
                          onClick={() => {
                            updateShippingData({ deliveryType: 'express' });
                            if (errors.delivery) setErrors(prev => ({ ...prev, delivery: null }));
                          }}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1 ${
                            shippingData.deliveryType === 'express' 
                              ? 'border-[#FF9933] bg-[#FF9933]/5' 
                              : errors.delivery ? 'border-red-500/30 bg-red-500/5' : 'border-current opacity-20 hover:opacity-100'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <ShieldCheck size={18} className={shippingData.deliveryType === 'express' ? 'text-[#FF9933]' : ''} />
                            {shippingData.deliveryType === 'express' && <CheckCircle2 size={14} className="text-[#FF9933]" />}
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest">Express Delivery</span>
                          <span className="text-[9px] opacity-60">1-2 Business Days • $10.00</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Type */}
                    <div id="field-payment" className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className={`text-[10px] font-black uppercase tracking-[0.3em] ml-1 transition-colors duration-500 ${errors.payment ? 'text-red-500' : 'opacity-60'}`}>Payment Type*</label>
                        {errors.payment && (
                          <motion.span 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-[9px] font-black uppercase tracking-widest text-white bg-red-500 px-3 py-1 rounded-full shadow-lg shadow-red-500/20"
                          >
                            Required
                          </motion.span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div 
                          onClick={() => {
                            updateShippingData({ paymentType: 'online' });
                            if (errors.payment) setErrors(prev => ({ ...prev, payment: null }));
                          }}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1 ${
                            shippingData.paymentType === 'online' 
                              ? 'border-[#FF9933] bg-[#FF9933]/5' 
                              : errors.payment ? 'border-red-500/30 bg-red-500/5' : 'border-current opacity-20 hover:opacity-100'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <CreditCard size={18} className={shippingData.paymentType === 'online' ? 'text-[#FF9933]' : ''} />
                            {shippingData.paymentType === 'online' && <CheckCircle2 size={14} className="text-[#FF9933]" />}
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest">Online Payment</span>
                          <span className="text-[9px] opacity-60">Card / UPI / NetBanking</span>
                        </div>
                        <div 
                          onClick={() => {
                            updateShippingData({ paymentType: 'pod' });
                            if (errors.payment) setErrors(prev => ({ ...prev, payment: null }));
                          }}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1 ${
                            shippingData.paymentType === 'pod' 
                              ? 'border-[#FF9933] bg-[#FF9933]/5' 
                              : errors.payment ? 'border-red-500/30 bg-red-500/5' : 'border-current opacity-20 hover:opacity-100'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <ShieldCheck size={18} className={shippingData.paymentType === 'pod' ? 'text-[#FF9933]' : ''} />
                            {shippingData.paymentType === 'pod' && <CheckCircle2 size={14} className="text-[#FF9933]" />}
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest">Pay on Delivery</span>
                          <span className="text-[9px] opacity-60">Verified Farmers only</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-current/10 space-y-4">
                    <div className="flex justify-between items-center text-sm font-hind">
                      <span className="opacity-50">Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    {isCouponApplied && (
                      <div className="flex justify-between items-center text-sm font-hind text-green-500">
                        <span className="opacity-50 italic">Harvest Discount (10%)</span>
                        <span>-${(cartTotal * 0.1).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-sm font-hind">
                      <span className="opacity-50">Delivery ({shippingData.deliveryType === 'express' ? 'Express' : 'Standard'})</span>
                      {shippingData.deliveryType === 'express' ? (
                        <span>$10.00</span>
                      ) : (
                        <span className="text-green-500 font-bold uppercase tracking-widest text-[10px]">Free</span>
                      )}
                    </div>
                    <div className="flex justify-between items-center pt-4">
                      <span className="font-yatra text-2xl">Total</span>
                      <span className="font-yatra text-4xl text-[#FF9933]">
                        ${(
                          cartTotal - 
                          (isCouponApplied ? cartTotal * 0.1 : 0) + 
                          (shippingData.deliveryType === 'express' ? 10 : 0)
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button 
                    disabled={isProcessing}
                    className={`w-full py-6 rounded-2xl flex items-center justify-center gap-4 font-hind font-black uppercase tracking-[0.2em] text-xs transition-all duration-500 relative overflow-hidden ${
                      isDarkMode 
                        ? 'bg-white text-black hover:bg-[#FF9933]' 
                        : 'bg-black text-white hover:bg-[#FF9933] hover:text-black'
                    }`}
                  >
                    {isProcessing ? (
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                      />
                    ) : (
                      <>Proceed to Payment <ArrowRight size={18} /></>
                    )}
                  </button>
                </form>

                <p className="text-center mt-8 text-[9px] font-hind opacity-50 uppercase tracking-[0.2em] leading-loose">
                  By placing your order, you agree to the <br />
                  Agrinex Terms of Trade & Digital Agriculture Act.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
