import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Store, ShieldCheck, Sun, Moon, Eye, EyeOff } from 'lucide-react';
import { useStore } from '../store/useStore';
import { getCloudinaryUrl } from '../utils/cloudinary';
import BloomReveal from '../lib/bloom/BloomReveal';

const logo = getCloudinaryUrl('logo');

const MerchantSignupPage = ({ isDarkMode, onToggleDarkMode }) => {
  const navigate = useNavigate();
  const { setAuth } = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          role: 'merchant' // Explicitly set role for this portal
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Success
      const { token, ...userData } = data;
      setAuth(userData, token);

      // Merchants always go to their dashboard
      navigate('/dashboard');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden flex items-center justify-center px-6 pt-40 pb-20 transition-colors duration-1000 ${isDarkMode ? 'bg-[#0D0D0D]' : 'bg-[#EFEDE8]'
      }`}>
      
      {/* Custom Top Header (Non-Navbar) */}
      <div className="absolute top-0 left-0 right-0 p-10 flex items-center justify-between z-50 pointer-events-none">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 pointer-events-auto group ml-4">
          <img
            src={logo}
            alt="Agrinex Logo"
            className="h-9 w-auto object-contain transition-all duration-500 group-hover:scale-105"
          />
          <span className={`font-yatra text-xl md:text-2xl tracking-tight`}>
            <span className={isDarkMode ? 'text-white' : 'text-[#1A0F05]'}> Agri </span>
            <span className={isDarkMode ? 'text-[#FF9933]' : 'text-[#E67E00]'}> nex </span>
          </span>
        </Link>

        {/* Bloom Mode Toggle */}
        <div className="pointer-events-auto mr-4">
          <BloomReveal isDarkMode={isDarkMode} onToggle={onToggleDarkMode} duration={1.5}>
            <button 
              className={`p-4 rounded-full border relative group transition-all duration-500 active:scale-90 ${
                isDarkMode ? 'border-white/10 text-white hover:bg-white hover:text-[#1A0F05]' : 'border-black/10 text-black hover:bg-[#1A0F05] hover:text-white'
              }`}
            >
              <div className="absolute inset-0 rounded-full bg-[#FF9933]/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative z-10 flex items-center justify-center">
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </div>
            </button>
          </BloomReveal>
        </div>
      </div>

      {/* Immersive Background Element */}
      <div className={`absolute top-0 left-0 w-full h-full opacity-10 transition-opacity duration-1000 ${isDarkMode ? 'invert' : ''}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FF9933]/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FF9933]/20 via-transparent to-transparent">
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">

        {/* Left Side: Merchant Value Prop */}
        <div className="hidden lg:flex flex-col">
          <h1 className="text-7xl font-yatra tracking-tighter leading-[0.9] mb-10">
            Empower Your <br />
            <span className="text-[#FF9933]">Agriculture</span> Business
          </h1>

          <p className="text-xl font-hind opacity-60 leading-relaxed max-w-lg mb-12">
            Join the Agrinex ecosystem. Reach thousands of buyers, manage your inventory with precision, and scale your operations with verified business tools.
          </p>

          <div className="space-y-6">
            {[
              { label: "Zero Setup Fee", desc: "Start selling instantly without any upfront costs." },
              { label: "Verified Buyer Network", desc: "Access thousands of verified Indian farmers and traders." },
              { label: "Advanced Analytics", desc: "Track performance with our high-fidelity command center." }
            ].map(item => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="mt-1 text-[#FF9933]">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest">{item.label}</p>
                  <p className="text-xs opacity-50 font-hind mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-10 rounded-[3rem] border transition-all duration-1000 relative overflow-hidden ${isDarkMode
                ? 'bg-[#142B14]/80 backdrop-blur-2xl border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)]'
                : 'bg-white/80 backdrop-blur-2xl border-white shadow-[0_40px_100px_rgba(0,0,0,0.05)]'
              }`}
          >
            {/* Header */}
            <div className="mb-10 text-center lg:text-left">
              <h2 className="text-4xl font-yatra mb-2 leading-tight">
                Merchant <span className="text-[#FF9933]">Registration</span>
              </h2>
              <p className="text-sm font-hind opacity-50 tracking-wide">
                Join the largest agricultural marketplace in India.
              </p>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest text-center"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity" size={18} />
                  <input
                    type="text"
                    name="full_name"
                    placeholder="Your Full Name"
                    required
                    value={formData.full_name}
                    onChange={handleInputChange}
                    autoComplete="name"
                    className={`w-full pl-14 pr-6 py-5 rounded-2xl bg-transparent border outline-none transition-all duration-500 font-hind ${isDarkMode ? 'border-white/10 focus:border-[#FF9933]' : 'border-gray-100 focus:border-[#1A0F05]'
                      }`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 ml-1">Business Email</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity" size={18} />
                  <input
                    type="email"
                    name="email"
                    placeholder="business@agrinex.com"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    autoComplete="email"
                    className={`w-full pl-14 pr-6 py-5 rounded-2xl bg-transparent border outline-none transition-all duration-500 font-hind ${isDarkMode ? 'border-white/10 focus:border-[#FF9933]' : 'border-gray-100 focus:border-[#1A0F05]'
                      }`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 ml-1">Secure Password</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity" size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    autoComplete="new-password"
                    className={`w-full pl-14 pr-14 py-5 rounded-2xl bg-transparent border outline-none transition-all duration-500 font-hind ${isDarkMode ? 'border-white/10 focus:border-[#FF9933]' : 'border-gray-100 focus:border-[#1A0F05]'
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 transition-opacity p-1"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-6 rounded-3xl font-hind font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all duration-500 group shadow-2xl disabled:opacity-50 ${isDarkMode
                    ? 'bg-[#FF9933] text-[#1A0F05] hover:shadow-[0_0_40px_rgba(255,153,51,0.3)]'
                    : 'bg-[#1A0F05] text-white hover:bg-[#FF9933] hover:text-[#1A0F05]'
                  }`}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Create Merchant Account
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 text-center">
              <p className="text-xs font-hind opacity-50">
                Already a partner? <Link to="/account" className="text-[#FF9933] font-bold hover:underline">Log in here</Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Brand Text */}
      <div className="absolute -bottom-10 -right-10 opacity-[0.03] select-none pointer-events-none">
        <h2 className="text-[30rem] font-yatra leading-none">SELLER</h2>
      </div>
    </div>
  );
};

export default MerchantSignupPage;
