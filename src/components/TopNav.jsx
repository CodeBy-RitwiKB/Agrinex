import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Leaf, User, Sun, Moon } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { Link, useLocation } from 'react-router-dom';
import { getCloudinaryUrl } from '../utils/cloudinary';
import BloomReveal from '../lib/bloom/BloomReveal';

const logo = getCloudinaryUrl('logo');

const TopNav = ({ isDarkMode, onToggleDarkMode, onOpenCart }) => {
  const { cart } = useCart();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDarkSection, setIsDarkSection] = useState(true);
  const [isCTASection, setIsCTASection] = useState(false);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        // Scroll state for background
        if (window.scrollY > 20) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }

        // Hide/Show logic
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }

        // Precise CTA Detection
        const ctaElement = document.getElementById('cta-section');
        let isOverCTA = false;
        if (ctaElement) {
          const rect = ctaElement.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom >= 0) {
            isOverCTA = true;
          }
        }

        // Adapt Color logic for natural scroll flow
        if (!isHomePage) {
          setIsDarkSection(isDarkMode);
          setIsCTASection(false);
          return;
        }

        const vh = window.innerHeight;
        if (isOverCTA) {
          setIsDarkSection(false);
          setIsCTASection(true);
        } else if (window.scrollY < vh * 1.9) {
          setIsDarkSection(true); // Hero & Vision (Dark)
          setIsCTASection(false);
        } else if (window.scrollY < vh * 4.6) {
          setIsDarkSection(false); // Marketplace Block (Categories, Products - Light)
          setIsCTASection(false);
        } else {
          setIsDarkSection(true); // TrustBar, Stats, Footer (Dark/Mixed)
          setIsCTASection(false);
        }

        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY, isHomePage, isDarkMode]);

  // Initial and path-change color update
  useEffect(() => {
    if (!isHomePage) {
      setIsDarkSection(isDarkMode);
    } else {
      // Re-trigger scroll logic for home page
      window.scrollTo(window.scrollX, window.scrollY + 1);
      window.scrollTo(window.scrollX, window.scrollY - 1);
    }
  }, [location.pathname, isDarkMode]);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Debounced Search Logic
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setIsSearching(true);
        try {
          const response = await fetch(`http://localhost:5000/api/products/search?q=${searchQuery}`);
          const data = await response.json();
          setSearchResults(data);
          setShowResults(true);
        } catch (err) {
          console.error('Search error:', err);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 400); // 400ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const navTextColor = isDarkSection ? 'text-white' : (isDarkMode ? 'text-white' : 'text-[#1A0F05]');
  const glassBg = isScrolled
    ? (isDarkSection || isDarkMode
      ? 'bg-[#0D0804]/40 border-white/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]'
      : 'bg-white/40 border-[#1A0F05]/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]')
    : 'bg-transparent border-transparent';

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -120 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 pointer-events-none"
    >

      {/* 🌟 Adaptive Floating Glass Navbar */}
      <nav className={`max-w-7xl mx-auto flex items-center justify-between gap-8 pointer-events-auto transition-all duration-700 px-8 py-3 rounded-[2rem] border backdrop-blur-md ${glassBg} ${navTextColor}`}>

        {/* 1. Indian-Soul Adaptive Logo */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer shrink-0 group">
          <img
            src={logo}
            alt="Agrinex Logo"
            className="h-9 w-auto object-contain transition-all duration-500 group-hover:scale-105"
          />
          <span className={`font-yatra text-xl md:text-2xl tracking-tight transition-all duration-[1500ms]`}>
            <span className={isDarkSection || isDarkMode ? 'text-white' : 'text-[#1A0F05]'}>
              Agri
            </span>
            <span className={isCTASection ? 'text-[#1A0F05]' : (isDarkSection || isDarkMode ? 'text-[#FF9933]' : 'text-[#E67E00]')}>
              nex
            </span>
          </span>
        </Link>

        {/* 2. Dynamic Industry-Style Search Bar */}
        {location.pathname !== '/cart' && location.pathname !== '/terms' && (
          <div className="relative flex-grow max-w-md hidden lg:block">
            <div className={`flex items-center bg-transparent border-b transition-all duration-500 group ${
              isDarkSection || isDarkMode ? 'border-white/20 focus-within:border-white' : 'border-[#1A0F05]/10 focus-within:border-[#1A0F05]'
            }`}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search premium agriculture..."
                className={`w-full px-4 py-1.5 bg-transparent outline-none text-xs font-hind font-medium placeholder-current opacity-40 focus:opacity-100 transition-opacity`}
              />
              <div className="pr-4 flex items-center gap-2">
                {isSearching ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-4 h-4 border-2 border-[#FF9933] border-t-transparent rounded-full"
                  />
                ) : (
                  <Search size={16} strokeWidth={2.5} className="opacity-40 group-focus-within:opacity-100 transition-all" />
                )}
              </div>
            </div>

            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {showResults && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className={`absolute top-full left-0 right-0 mt-4 p-4 rounded-[2rem] border shadow-2xl backdrop-blur-xl ${
                    isDarkMode ? 'bg-[#1A0F05]/95 border-white/10' : 'bg-white/95 border-black/5'
                  }`}
                >
                  <div className="space-y-2 max-h-[300px] overflow-y-auto no-scrollbar">
                    {searchResults.map((item) => (
                      <Link
                        key={item.id}
                        to={`/product/${item.id}`}
                        onClick={() => {
                          setSearchQuery('');
                          setShowResults(false);
                        }}

                        className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
                          isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            isDarkMode ? 'bg-white/5 text-[#FF9933]' : 'bg-black/5 text-[#E67E00]'
                          }`}>
                            <Leaf size={16} />
                          </div>
                          <div>
                            <h5 className="text-xs font-hind font-bold uppercase tracking-wider">{item.name}</h5>
                            <p className="text-[10px] font-hind opacity-40 uppercase tracking-widest">{item.tag || 'Agriculture'}</p>
                          </div>
                        </div>
                        <span className="text-xs font-yatra text-[#FF9933]">₹{Number(item.price).toFixed(2)}</span>
                      </Link>

                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}


        {/* 3. Hollow Actions */}
        <div className="flex items-center gap-4 md:gap-8 shrink-0">
          {/* Dark Mode Switch */}
          <BloomReveal isDarkMode={isDarkMode} onToggle={onToggleDarkMode} duration={1.5}>
            <button 
              className={`p-2 rounded-full border relative group transition-all duration-500 active:scale-90 ${
                isDarkSection || isDarkMode ? 'border-white/10 hover:bg-white hover:text-[#1A0F05]' : 'border-[#1A0F05]/10 hover:bg-[#1A0F05] hover:text-white'
              }`}
            >
              <div className="absolute inset-0 rounded-full bg-[#FF9933]/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative z-10 flex items-center justify-center">
                {isDarkMode ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
              </div>
            </button>
          </BloomReveal>

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
              <AnimatePresence>
                {cart.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className={`absolute -top-2.5 -right-2.5 text-[9px] font-black w-4.5 h-4.5 flex items-center justify-center rounded-full border-2 ${isDarkSection ? 'bg-[#FF9933] text-[#1A0F05] border-[#1A0F05]' : 'bg-[#1A0F05] text-white border-white'
                      }`}
                  >
                    {cart.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <span className="hidden md:block">Cart</span>
          </button>
        </div>
      </nav>
    </motion.div>
  );
};

export default TopNav;