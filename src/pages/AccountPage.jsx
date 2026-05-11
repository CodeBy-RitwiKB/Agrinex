import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, ArrowRight, Shield, Fingerprint, Leaf, Sun, Moon, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaGoogle } from 'react-icons/fa';
import { useStore } from '../store/useStore';

const AccountPage = ({ isDarkMode, onToggleDarkMode }) => {
  const navigate = useNavigate();
  const { setAuth } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [isReset, setIsReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : { ...formData };

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Success
      const { token, ...userData } = data;
      setAuth(userData, token);
      
      // Redirect based on role
      if (userData.role === 'admin') navigate('/admin');
      else if (userData.role === 'merchant') navigate('/dashboard');
      else navigate('/customer/dashboard');
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, newPassword: formData.password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Reset failed');
      }

      setSuccessMsg(data.message);
      setTimeout(() => {
        setIsReset(false);
        setIsLogin(true);
      }, 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    if (isReset) handleResetPassword(e);
    else handleAuth(e);
  };

  return (
    <div className={`min-h-screen relative overflow-hidden flex items-center justify-center px-6 py-20 transition-colors duration-1000 ${
      isDarkMode ? 'bg-[#0D0D0D]' : 'bg-[#EFEDE8]'
    }`}>
      {/* 🌙 Bespoke Dark Mode Toggle */}
      <div className="absolute top-10 right-10 z-50">
        <button 
          onClick={onToggleDarkMode}
          className={`p-4 rounded-full border transition-all duration-500 active:scale-90 ${
            isDarkMode ? 'border-white/20 text-white hover:bg-white hover:text-black' : 'border-black/10 text-black hover:bg-black hover:text-white'
          }`}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Immersive Background Element */}
      <div className={`absolute top-0 left-0 w-full h-full opacity-10 transition-opacity duration-1000 ${isDarkMode ? 'invert' : ''}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FF9933]/20 via-transparent to-transparent"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        
        {/* Left Side: Brand Story */}
        <div className="hidden lg:flex flex-col -mt-16">
          <h1 className="text-7xl font-yatra tracking-tighter leading-[0.9] mb-10">
            Join the Elite <br /> 
            <span className="text-[#FF9933]">Community</span>
          </h1>
          
          <p className="text-xl font-hind opacity-60 leading-relaxed max-w-lg mb-12">
            Access curated agricultural premium goods, verified merchants, and precision farming data with your Agrinex account.
          </p>

          <div className="grid grid-cols-2 gap-8">
            {[
              { label: "Verified Merchants", value: "2.4k+" },
              { label: "Daily Transactions", value: "₹4.8Cr" }
            ].map(stat => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-3xl font-yatra text-[#FF9933]">{stat.value}</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <motion.div 
            layout
            className={`p-10 rounded-[3rem] border transition-all duration-1000 relative overflow-hidden ${
              isDarkMode 
                ? 'bg-[#142B14]/80 backdrop-blur-2xl border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.5)]' 
                : 'bg-white/80 backdrop-blur-2xl border-white shadow-[0_40px_100px_rgba(0,0,0,0.05)]'
            }`}
          >
            {/* Header */}
            <div className="mb-10">
              <h2 className="text-4xl font-yatra mb-2 leading-tight">
                {isReset ? (
                  <>Reset <span className="text-[#FF9933]">Password</span></>
                ) : isLogin ? (
                  <>Welcome <span className="text-[#FF9933]">Back</span></>
                ) : (
                  <>Create <span className="text-[#FF9933]">Account</span></>
                )}
              </h2>
              <p className="text-sm font-hind opacity-50 tracking-wide">
                {isReset ? 'Enter your email and a new password.' : isLogin ? 'Enter your credentials to access your account.' : 'Create your digital agricultural account.'}
              </p>
            </div>

            {/* Success Message */}
            <AnimatePresence>
              {successMsg && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mb-6 p-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold uppercase tracking-widest text-center"
                >
                  {successMsg}
                </motion.div>
              )}
            </AnimatePresence>

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

            {/* Mode Switcher */}
            {!isReset && (
              <div className={`flex p-1.5 rounded-2xl mb-10 transition-colors duration-500 ${
                isDarkMode ? 'bg-black/20' : 'bg-[#EFEDE8]'
              }`}>
                <button 
                  onClick={() => { setIsLogin(true); setIsReset(false); setError(null); setSuccessMsg(null); }}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                    isLogin && !isReset 
                      ? (isDarkMode ? 'bg-[#FF9933] text-[#1A0F05]' : 'bg-[#1A0F05] text-white shadow-xl') 
                      : 'opacity-40 hover:opacity-100'
                  }`}
                >
                  Log In
                </button>
                <button 
                  onClick={() => { setIsLogin(false); setIsReset(false); setError(null); setSuccessMsg(null); }}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                    !isLogin && !isReset 
                      ? (isDarkMode ? 'bg-[#FF9933] text-[#1A0F05]' : 'bg-[#1A0F05] text-white shadow-xl') 
                      : 'opacity-40 hover:opacity-100'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Forms */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLogin ? 'login' : 'signup'}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  {!isLogin && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 ml-1">Full Name</label>
                      <div className="relative group">
                        <User className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity" size={18} />
                        <input 
                          type="text" 
                          name="full_name"
                          placeholder="Rajesh Kumar"
                          required
                          value={formData.full_name}
                          onChange={handleInputChange}
                          autoComplete="name"
                          className={`w-full pl-14 pr-6 py-5 rounded-2xl bg-transparent border outline-none transition-all duration-500 font-hind ${
                            isDarkMode ? 'border-white/10 focus:border-[#FF9933]' : 'border-gray-100 focus:border-[#1A0F05]'
                          }`}
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 ml-1">Email Address</label>
                    <div className="relative group">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity" size={18} />
                      <input 
                        type="email" 
                        name="email"
                        placeholder="rajesh@agrinex.com"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        autoComplete="email"
                        className={`w-full pl-14 pr-6 py-5 rounded-2xl bg-transparent border outline-none transition-all duration-500 font-hind ${
                          isDarkMode ? 'border-white/10 focus:border-[#FF9933]' : 'border-gray-100 focus:border-[#1A0F05]'
                        }`}
                      />
                    </div>
                  </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center px-1">
                        <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">
                          {isReset ? 'New Password' : 'Password'}
                        </label>
                        {isLogin && !isReset && (
                          <button 
                            type="button" 
                            onClick={() => { setIsReset(true); setError(null); }}
                            className="text-[8px] font-black uppercase tracking-[0.2em] text-[#FF9933] hover:underline"
                          >
                            Forgot?
                          </button>
                        )}
                        {isReset && (
                          <button 
                            type="button" 
                            onClick={() => { setIsReset(false); setError(null); }}
                            className="text-[8px] font-black uppercase tracking-[0.2em] text-[#FF9933] hover:underline"
                          >
                            Back to Login
                          </button>
                        )}
                      </div>
                    <div className="relative group">
                      <Lock className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 transition-opacity" size={18} />
                      <input 
                        type={showPassword ? "text" : "password"} 
                        name="password"
                        placeholder="••••••••"
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        autoComplete={isLogin ? "current-password" : "new-password"}
                        className={`w-full pl-14 pr-14 py-5 rounded-2xl bg-transparent border outline-none transition-all duration-500 font-hind ${
                          isDarkMode ? 'border-white/10 focus:border-[#FF9933]' : 'border-gray-100 focus:border-[#1A0F05]'
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
                </motion.div>
              </AnimatePresence>

              <button 
                type="submit"
                disabled={loading}
                className={`w-full py-5 rounded-2xl font-hind font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all duration-500 group shadow-2xl disabled:opacity-50 ${
                  isDarkMode 
                    ? 'bg-white text-[#1A0F05] hover:bg-[#FF9933]' 
                    : 'bg-[#1A0F05] text-white hover:bg-[#FF9933] hover:text-[#1A0F05]'
                }`}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    {isReset ? 'Reset Password' : isLogin ? 'Sign In' : 'Join Community'} 
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Divider Line */}
            <div className="mt-10 pt-10 border-t border-current opacity-10 w-full" />
            
            <div className="flex flex-col items-center gap-6 -mt-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Direct Verification</span>
              <div className="flex gap-4">
                {/* Google Button */}
                <button className={`group p-4 rounded-2xl border transition-all duration-500 flex items-center justify-center relative overflow-hidden ${
                  isDarkMode 
                    ? 'border-white/20 bg-white/5 hover:border-transparent shadow-lg' 
                    : 'border-[#1A0F05]/10 bg-white/50 hover:border-transparent shadow-sm hover:shadow-2xl'
                } hover:scale-110 active:scale-95`}>
                  {/* True 4-Color Google Spectrum Background */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                    style={{ background: 'linear-gradient(135deg, #4285F4, #EA4335, #FBBC05, #34A853)' }}
                  />
                  
                  <div className="relative z-10 flex items-center justify-center">
                    <div className="group-hover:hidden transition-all duration-500">
                      <FcGoogle size={24} />
                    </div>
                    <div className="hidden group-hover:block transition-all duration-500">
                      <FaGoogle size={22} className="text-white" />
                    </div>
                  </div>
                </button>
                {/* Facebook Button */}
                <button className={`group p-4 rounded-2xl border transition-all duration-500 flex items-center justify-center ${
                  isDarkMode 
                    ? 'border-white/20 bg-white/5 hover:bg-[#1877F2] hover:border-[#1877F2] shadow-lg hover:shadow-[0_0_30px_rgba(24,119,242,0.4)]' 
                    : 'border-[#1A0F05]/10 bg-white/50 hover:bg-[#1877F2] hover:border-[#1877F2] shadow-sm hover:shadow-xl'
                } hover:scale-110 active:scale-95`}>
                  <FaFacebookF size={20} className={`transition-all duration-500 group-hover:scale-110 ${
                    isDarkMode ? 'text-[#1877F2] group-hover:text-white' : 'text-[#1877F2] group-hover:text-white'
                  }`} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Brand Text */}
      <div className="absolute -bottom-10 -right-10 opacity-[0.03] select-none pointer-events-none">
        <h2 className="text-[30rem] font-yatra leading-none">AGRI</h2>
      </div>
    </div>
  );
};

export default AccountPage;
