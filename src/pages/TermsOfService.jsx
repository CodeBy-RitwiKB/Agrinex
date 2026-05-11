import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, FileText, Scale, AlertCircle, HelpCircle, Leaf, Settings, Truck, Info, Gavel, Landmark, ArrowLeft, Sun, Moon, User, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCloudinaryUrl } from '../utils/cloudinary';
import { useCart } from '../hooks/useCart';
import { AnimatePresence, motion } from 'framer-motion';
import Footer from '../components/Footer';

const logo = getCloudinaryUrl('logo');

gsap.registerPlugin(ScrollTrigger);

const TermsOfService = ({ isDarkMode, onToggleDarkMode, onOpenCart }) => {
  const { cart } = useCart();
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".tos-header", {
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
      id: "agreement",
      title: "1. Agreement to Terms",
      icon: <FileText className="text-marigold" size={24} />,
      content: "By accessing the Agrinex Marketplace, you agree to be bound by these Terms. Our platform is a digital venue facilitating agricultural trade. Any use of the platform constitutes a legally binding agreement between you and Agrinex."
    },
    {
      id: "platform-role",
      title: "2. Platform Role & Intermediary Status",
      icon: <Shield className="text-marigold" size={24} />,
      content: "Agrinex acts solely as an intermediary (facilitator). We do not own, store, or inspect the products listed by third-party sellers. The contract of sale is strictly between the Buyer and the Seller. Agrinex is not a party to any transaction and disclaims all liability arising from such agreements."
    },
    {
      id: "perishables",
      title: "3. Perishable Goods Policy",
      icon: <Leaf className="text-marigold" size={24} />,
      content: "Due to the nature of agricultural produce, Buyers must inspect all perishable goods immediately upon delivery. Any claims regarding quality or condition must be reported to Agrinex and the Seller within 24 hours of receipt, supported by time-stamped photographic evidence. Failure to do so constitutes unconditional acceptance of the goods."
    },
    {
      id: "machinery",
      title: "4. Machinery & Industrial Equipment",
      icon: <Settings className="text-marigold" size={24} />,
      content: "All machinery and tools are sold 'AS IS' and 'WITH ALL FAULTS' unless otherwise specified. Buyers assume all risk of operation. Agrinex expressly disclaims any warranties of merchantability or fitness for a particular purpose. It is the Buyer's responsibility to conduct safety inspections before use."
    },
    {
      id: "payments",
      title: "5. Payments, Fees & Taxation",
      icon: <Landmark className="text-marigold" size={24} />,
      content: "Payments are processed through authorized third-party gateways. Sellers are solely responsible for calculating and remitting all applicable taxes (including GST where applicable). Agrinex reserves the right to charge service fees for platform usage, which will be disclosed prior to transaction completion."
    },
    {
      id: "logistics",
      title: "6. Logistics & Force Majeure",
      icon: <Truck className="text-marigold" size={24} />,
      content: "Delivery timelines are estimates provided by Sellers. Agrinex is not liable for delays caused by 'Force Majeure' events, including extreme weather, crop failures, transit strikes, or government restrictions affecting agricultural supply chains."
    },
    {
      id: "content",
      title: "7. User Content & Intellectual Property",
      icon: <Info className="text-marigold" size={24} />,
      content: "By uploading product photos, descriptions, or reviews, you grant Agrinex a non-exclusive, royalty-free, perpetual license to use that content for marketing and platform improvement. You represent that you own all rights to any content you upload."
    },
    {
      id: "conduct",
      title: "8. Prohibited Activities",
      icon: <Gavel className="text-marigold" size={24} />,
      content: "Users are prohibited from: price-fixing, fraudulent bidding, bypassing platform payment systems, or uploading malicious code. Violation may result in immediate account termination and legal action."
    },
    {
      id: "indemnity",
      title: "9. Indemnification",
      icon: <AlertCircle className="text-marigold" size={24} />,
      content: "You agree to indemnify and hold Agrinex harmless from any claims, losses, or legal fees arising from your use of the platform, violation of these terms, or infringement of any third-party rights."
    },
    {
      id: "liability",
      title: "10. Limitation of Liability",
      icon: <Shield className="text-marigold" size={24} />,
      content: "In no event shall Agrinex's total liability exceed the total service fees paid by you to the platform in the 6 months preceding the claim. We are not liable for lost profits, lost crops, or any indirect damages."
    },
    {
      id: "law",
      title: "11. Governing Law & Dispute Resolution",
      icon: <Scale className="text-marigold" size={24} />,
      content: "These terms are governed by the laws of India. Any disputes shall first be attempted to be settled via internal mediation. If unresolved, disputes will be subject to the exclusive jurisdiction of the courts in your registered regional office location."
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

        {/* Back Button - Restored to Original Position */}
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
          <div className="tos-header mb-16 text-center">
            <h1 className="font-yatra text-5xl md:text-8xl mb-6 tracking-tight">
              Legal <span className="text-marigold">Framework</span>
            </h1>
            <p className="font-hind text-xl text-opacity-60 max-w-2xl mx-auto leading-relaxed">
              Precision governance for the future of agricultural commerce. <br/>
              <span className="text-sm font-bold tracking-widest uppercase mt-4 block text-marigold">Version 2.1.0 • Revised May 2026</span>
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

            {/* Compliance Note */}
            <div className="mt-24 p-10 rounded-[32px] bg-[#1A0F05]/5 dark:bg-white/5 border border-marigold/10">
              <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <div className="p-4 bg-marigold/10 rounded-full">
                  <Shield className="text-marigold" size={32} />
                </div>
                <div className="flex-1">
                  <h3 className="font-yatra text-2xl mb-2 text-marigold">Zero Tolerance Policy</h3>
                  <p className="font-hind text-opacity-60">
                    We maintain a strict zero-tolerance policy towards fraudulent activity and unethical agricultural practices. Agrinex reserves the right to vet users through multi-factor verification systems at our discretion to ensure platform integrity.
                  </p>
                </div>
                <button className="bg-marigold text-[#1A0F05] px-10 py-5 rounded-2xl font-hind font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform active:scale-95 shadow-2xl">
                  Report Violation
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

export default TermsOfService;
