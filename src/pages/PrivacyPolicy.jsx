import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Lock, Eye, Database, Share2, Bell, Globe, Trash2, Smartphone, Landmark, ArrowLeft, Sun, Moon, User, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCloudinaryUrl } from '../utils/cloudinary';
import { useCart } from '../hooks/useCart';
import { AnimatePresence, motion } from 'framer-motion';
import Footer from '../components/Footer';

const logo = getCloudinaryUrl('logo');

gsap.registerPlugin(ScrollTrigger);

const PrivacyPolicy = ({ isDarkMode, onToggleDarkMode, onOpenCart }) => {
  const { cart } = useCart();
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".privacy-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
      });

      // Section Animations
      sectionsRef.current.forEach((section, index) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.05,
          ease: "power3.out"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToSections = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  const sections = [
    {
      id: "collection",
      title: "1. Information Collection",
      icon: <Database className="text-marigold" size={24} />,
      content: "We collect information that you provide directly to us, including your name, email address, farming location, and transaction details. We also automatically collect technical data such as IP addresses, device identifiers, and platform usage patterns."
    },
    {
      id: "usage",
      title: "2. How We Use Data",
      icon: <Smartphone className="text-marigold" size={24} />,
      content: "Your data is used to process orders, personalize your marketplace experience, provide precision farming insights, and communicate platform updates. Agricultural location data is specifically used to calculate logistics and delivery timelines."
    },
    {
      id: "sharing",
      title: "3. Data Sharing & Disclosure",
      icon: <Share2 className="text-marigold" size={24} />,
      content: "We do not sell your personal data. We share information with Sellers only to facilitate transactions and with third-party partners (like payment gateways and logistics providers) required to fulfill your orders."
    },
    {
      id: "security",
      title: "4. Security Measures",
      icon: <Lock className="text-marigold" size={24} />,
      content: "Agrinex employs industry-standard SSL encryption for all data transmissions. Your sensitive information is stored in secured cloud environments with strict access controls to prevent unauthorized access or data breaches."
    },
    {
      id: "cookies",
      title: "5. Cookies & Tracking",
      icon: <Eye className="text-marigold" size={24} />,
      content: "We use cookies to maintain your session, remember theme preferences, and analyze platform traffic. You can manage cookie settings through your browser, though some features of the marketplace may be restricted."
    },
    {
      id: "retention",
      title: "6. Data Retention",
      icon: <Trash2 className="text-marigold" size={24} />,
      content: "We retain your personal information as long as your account is active or as needed to provide you with services. Transactional data is kept for longer periods to comply with legal, tax, and auditing requirements."
    },
    {
      id: "rights",
      title: "7. User Rights",
      icon: <User className="text-marigold" size={24} />,
      content: "Under various digital privacy acts, you have the right to access, correct, or delete your personal data. You can manage most of these settings directly through your Account Portal or by contacting our support team."
    },
    {
      id: "international",
      title: "8. International Transfers",
      icon: <Globe className="text-marigold" size={24} />,
      content: "While our primary operations are in India, some data may be processed on servers located in other jurisdictions. By using Agrinex, you consent to the transfer of information to countries outside of your residence."
    },
    {
      id: "compliance",
      title: "9. Regulatory Compliance",
      icon: <Landmark className="text-marigold" size={24} />,
      content: "Agrinex operates in compliance with the Information Technology Act, 2000 and subsequent Digital Personal Data Protection (DPDP) frameworks. We periodically update this policy to reflect changing legal standards."
    }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen">
      <div className={`relative pt-10 pb-24 px-6 transition-colors duration-1000 ${isDarkMode ? 'bg-[#0D0804]' : 'bg-[#FDFCFB]'}`}>
        
        {/* Page-Specific Header (Non-Sticky) */}
        <div className="max-w-5xl mx-auto flex items-center justify-between mb-20">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="Agrinex Logo" 
              className="h-9 w-auto object-contain transition-all duration-500 group-hover:scale-105" 
            />
            <span className="font-yatra text-2xl tracking-tight">
              <span className={isDarkMode ? 'text-white' : 'text-[#1A0F05]'}>Agri</span>
              <span className="text-marigold">nex</span>
            </span>
          </Link>

          <div className="flex items-center gap-4 md:gap-8">
            <button 
              onClick={onToggleDarkMode}
              className={`p-3 rounded-2xl border transition-all duration-500 active:scale-90 ${
                isDarkMode ? 'border-white/10 text-white hover:bg-white hover:text-black' : 'border-black/10 text-black hover:bg-black hover:text-white'
              }`}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <Link 
              to="/account" 
              className={`flex items-center gap-2 opacity-70 hover:opacity-100 transition-all font-hind uppercase tracking-[0.2em] text-[10px] font-black ${isDarkMode ? 'text-white' : 'text-[#1A0F05]'}`}
            >
              <User size={18} strokeWidth={2.5} />
              <span className="hidden md:block">Account</span>
            </Link>
            
            <button 
              onClick={onOpenCart} 
              className={`relative flex items-center gap-2 opacity-70 hover:opacity-100 transition-all font-hind uppercase tracking-[0.2em] text-[10px] font-black ${isDarkMode ? 'text-white' : 'text-[#1A0F05]'}`}
            >
              <div className="relative">
                <ShoppingCart size={18} strokeWidth={2.5} />
                <AnimatePresence>
                  {cart.length > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2.5 -right-2.5 text-[9px] font-black w-4.5 h-4.5 flex items-center justify-center rounded-full bg-marigold text-[#1A0F05] border-2 border-transparent"
                    >
                      {cart.length}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span className="hidden md:block">Cart</span>
            </button>
          </div>
        </div>

        {/* Back Button */}
        <div className="max-w-5xl mx-auto mb-12">
          <Link 
            to="/" 
            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-marigold/50 hover:bg-marigold/10 transition-all duration-500 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform duration-500 text-marigold" />
            <span className="font-hind text-xs font-black uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-opacity">Back to Marketplace</span>
          </Link>
        </div>

        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-marigold/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-marigold/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <div className="privacy-header mb-16 text-center">
            <h1 className="font-yatra text-5xl md:text-8xl mb-6 tracking-tight">
              Privacy <span className="text-marigold">Policy</span>
            </h1>
            <p className="font-hind text-xl text-opacity-60 max-w-2xl mx-auto leading-relaxed">
              Your data is the seed of our trust. We protect it with precision. <br/>
              <span className="text-sm font-bold tracking-widest uppercase mt-4 block text-marigold">Version 1.4.2 • Updated May 2026</span>
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="glass rounded-3xl p-6 mb-12 flex flex-wrap justify-center gap-4 border-marigold/10">
            {sections.map((s) => (
              <button 
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className="text-[10px] font-bold uppercase tracking-widest text-opacity-40 hover:text-marigold transition-colors py-2 px-4 rounded-full bg-white/5 border border-white/5 hover:border-marigold/30"
              >
                {s.title.split('.')[1].trim()}
              </button>
            ))}
          </div>

          {/* Content Card */}
          <div className="glass rounded-[48px] p-8 md:p-16 overflow-hidden relative border-marigold/5">
            <div className="bg-grain absolute inset-0 pointer-events-none opacity-[0.03]" />
            
            <div className="space-y-20">
              {sections.map((section, idx) => (
                <div 
                  key={idx} 
                  id={section.id}
                  ref={addToSections}
                  className="relative group"
                >
                  <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
                    <div className="p-5 rounded-[24px] bg-marigold/5 border border-marigold/10 group-hover:bg-marigold/10 group-hover:scale-110 transition-all duration-500">
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <h2 className="font-yatra text-3xl mb-6 group-hover:text-marigold transition-colors duration-300">
                        {section.title}
                      </h2>
                      <div className="font-hind text-lg leading-relaxed text-opacity-70 space-y-4">
                        <p>{section.content}</p>
                      </div>
                    </div>
                  </div>
                  {idx !== sections.length - 1 && (
                    <div className="absolute -bottom-10 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-marigold/10 to-transparent" />
                  )}
                </div>
              ))}
            </div>

            {/* Support Note */}
            <div className="mt-24 p-10 rounded-[32px] bg-[#1A0F05]/5 dark:bg-white/5 border border-marigold/10">
              <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <div className="p-4 bg-marigold/10 rounded-full">
                  <Bell className="text-marigold" size={32} />
                </div>
                <div className="flex-1">
                  <h3 className="font-yatra text-2xl mb-2 text-marigold">Data Privacy Support</h3>
                  <p className="font-hind text-opacity-60">
                    Have questions about how your farming data is used? Our compliance team is ready to provide detailed transparency reports and assist with your rights.
                  </p>
                </div>
                <button className="bg-marigold text-[#1A0F05] px-10 py-5 rounded-2xl font-hind font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform active:scale-95 shadow-2xl">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default PrivacyPolicy;
