import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ChevronLeft, Sun, Moon, User, ShoppingCart, Leaf, Target, ShieldCheck, Globe, ArrowRight, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getCloudinaryUrl } from '../utils/cloudinary';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const OurStory = ({ isDarkMode, onToggleDarkMode, onOpenCart }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    // Parallax effect for images
    gsap.utils.toArray('.parallax-img').forEach((img) => {
      gsap.to(img, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Reveal animations
    const sections = gsap.utils.toArray('.story-reveal');
    sections.forEach((section) => {
      gsap.fromTo(section,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          }
        }
      );
    });
  }, []);

  const logo = getCloudinaryUrl('logo');

  return (
    <div ref={containerRef} className={`min-h-screen transition-colors duration-1000 selection:bg-[#FF9933] selection:text-[#1A0F05] ${isDarkMode ? 'bg-[#0D0804] text-white' : 'bg-[#EFEDE8] text-[#1A0F05]'
      }`}>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#FF9933] z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Custom Brand Header */}
      <header className={`sticky top-0 z-50 w-full px-6 md:px-12 py-4 flex items-center justify-between transition-all duration-500 ${isDarkMode ? 'bg-[#0D0804]/80 backdrop-blur-xl border-b border-white/5' : 'bg-[#EFEDE8]/80 backdrop-blur-xl border-b border-[#1A0F05]/5'
        }`}>
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Agrinex" className="h-8 w-auto transition-transform duration-500 group-hover:scale-110" />
          <span className="font-yatra text-2xl tracking-tighter">Agri<span className="text-[#FF9933]">nex</span></span>
        </Link>

        <div className="flex items-center gap-6">
          <button
            onClick={onToggleDarkMode}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isDarkMode ? 'bg-white/5 hover:bg-[#FF9933] text-white hover:text-[#1A0F05]' : 'bg-[#1A0F05]/5 hover:bg-[#1A0F05] text-[#1A0F05] hover:text-white'
              }`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link
            to="/account"
            className={`flex items-center gap-2 font-hind font-bold uppercase tracking-widest text-[10px] transition-all duration-300 ${isDarkMode ? 'text-white/60 hover:text-[#FF9933]' : 'text-[#1A0F05]/60 hover:text-[#1A0F05]'
              }`}
          >
            <User size={16} />
            <span className="hidden md:block text-[12px]">Account</span>
          </Link>

          <button
            onClick={onOpenCart}
            className={`relative p-2 transition-all duration-300 ${isDarkMode ? 'text-white/60 hover:text-[#FF9933]' : 'text-[#1A0F05]/60 hover:text-[#1A0F05]'
              }`}
          >
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF9933] text-[#1A0F05] text-[10px] font-black rounded-full flex items-center justify-center">
              11
            </span>
          </button>
        </div>
      </header>

      {/* Hero Section - Elite Boutique Style */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={getCloudinaryUrl('hero_bg')}
            alt="Nature"
            className="w-full h-full object-cover opacity-20 scale-125 blur-sm"
          />
          <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-b from-[#0D0804] via-transparent to-[#0D0804]' : 'bg-gradient-to-b from-[#EFEDE8] via-transparent to-[#EFEDE8]'
            }`} />
        </div>

        <div className="relative z-10 text-center max-w-7xl px-6 pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="w-12 h-[1px] bg-[#FF9933]"></span>
              <span className="font-hind text-[#FF9933] text-[10px] uppercase tracking-[0.8em] font-black">Est. 2024 • Agri-Tech Visionaries</span>
              <span className="w-12 h-[1px] bg-[#FF9933]"></span>
            </div>

            <h1 className="text-7xl md:text-[12rem] font-yatra tracking-tighter leading-none mb-12">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] to-[#FFCC66] drop-shadow-2xl">Genesis</span>
            </h1>

            <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-12">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-[#FF9933] bg-[#1A0F05] flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="Founder" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-lg md:text-xl font-hind opacity-60 max-w-2xl text-center md:text-left leading-relaxed">
                "We didn't just build a marketplace. We built a digital sanctuary where the integrity of the soil meets the precision of the future."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
          <div className={`w-[1px] h-24 bg-gradient-to-b from-transparent to-[#FF9933]`} />
        </div>
      </section>

      {/* The Vision - Immersive Split Layout */}
      <section className="story-reveal py-40 px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-7 relative group">
            <div className="absolute -inset-10 bg-[#FF9933]/10 rounded-[4rem] blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            <div className="overflow-hidden rounded-[3rem] shadow-2xl">
              <img
                src={getCloudinaryUrl('organic')}
                alt="Sustainable Farming"
                className="parallax-img w-full h-[700px] object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            {/* Floating Glass Badge */}
            <div className="absolute -bottom-10 -right-10 p-10 backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[2rem] hidden md:block">
              <Leaf className="text-[#FF9933] mb-4" size={40} />
              <h4 className="font-yatra text-2xl mb-1">Earth First</h4>
              <p className="font-hind text-xs opacity-50 uppercase tracking-widest">Sustainability Standard</p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-3xl bg-[#FF9933]/10 flex items-center justify-center text-[#FF9933]">
                <Target size={32} />
              </div>
              <h2 className="text-5xl font-yatra tracking-tight">The Precision <span className="text-[#FF9933]">Mandate</span></h2>
            </div>
            <p className="text-2xl font-hind opacity-60 leading-relaxed mb-12 italic">
              "Farming isn't just an occupation; it's the heartbeat of the nation. We are here to make that pulse stronger."
            </p>
            <p className="text-lg font-hind opacity-50 leading-relaxed mb-12">
              Agrinex leverages blockchain-verified supply chains and IoT-driven logistics to ensure that what you see on the screen is exactly what arrives at your door. Zero compromises. Zero friction.
            </p>
            <div className="space-y-6">
              {[
                { title: "Direct-to-Source", desc: "Removing the middleman to empower the hands that feed us." },
                { title: "Transparent Pricing", desc: "Boutique quality shouldn't mean hidden costs." },
                { title: "Eco-Vetting", desc: "Every product is checked against 12 sustainability markers." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-2 h-2 rounded-full bg-[#FF9933] mt-2 group-hover:scale-150 transition-transform" />
                  <div>
                    <h4 className="font-yatra text-xl mb-1">{item.title}</h4>
                    <p className="font-hind text-sm opacity-40">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Timeline - Glassmorphic Horizontal Scroll */}
      <section className="story-reveal py-40 px-6 md:px-12 bg-[#FF9933]/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto mb-24">
          <h2 className="text-6xl md:text-8xl font-yatra tracking-tighter text-center">Our <span className="text-[#FF9933]">Trajectory</span></h2>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { year: "2024 Q1", title: "The Spark", desc: "Initial blueprinting in a small garage in Pune." },
            { year: "2024 Q2", title: "Merchant Beta", desc: "Onboarding the first 50 verified sustainable farmers." },
            { year: "2024 Q3", title: "Tech Fusion", desc: "Integration of AI-driven quality assessment tools." },
            { year: "2024 Q4", title: "The Launch", desc: "Agrinex becomes the elite standard for Agri-Commerce." }
          ].map((step, i) => (
            <div key={i} className={`p-10 rounded-[3rem] border transition-all duration-700 hover:bg-[#FF9933] hover:text-[#1A0F05] group cursor-default ${isDarkMode ? 'border-white/5 bg-[#0D0804]/50' : 'border-[#1A0F05]/5 bg-[#EFEDE8]/50'
              }`}>
              <span className="font-black font-hind text-[10px] uppercase tracking-[0.4em] text-[#FF9933] group-hover:text-[#1A0F05] mb-8 block">{step.year}</span>
              <h3 className="text-3xl font-yatra mb-6">{step.title}</h3>
              <p className="font-hind opacity-50 group-hover:opacity-80 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founder's Message - Intimate Section */}
      <section className="story-reveal py-40 px-6 md:px-12">
        <div className={`max-w-4xl mx-auto p-20 rounded-[4rem] relative border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-[#1A0F05]/5 border-[#1A0F05]/5'
          }`}>
          <Quote className="text-[#FF9933] opacity-20 absolute top-10 left-10" size={120} />
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-yatra mb-12">A Message from our <span className="text-[#FF9933]">Founder</span></h2>
            <p className="text-2xl font-hind leading-relaxed opacity-80 mb-12 italic">
              "We didn't build Agrinex to be the biggest. We built it to be the best. For us, every seed traded and every tool sold represents a promise—a promise of a future where agriculture is both high-tech and high-heart."
            </p>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-2 border-[#FF9933] p-1 mb-6">
                <img src="https://media.licdn.com/dms/image/v2/D5603AQFZrO0Yh-2f2Q/profile-displayphoto-scale_400_400/B56Zsq0Q7fKAAk-/0/1765949903521?e=1779926400&v=beta&t=YSKFG_4z4_AoSDz4GwdFlz8gCncsuEVQGifgRa9Os3A" alt="Founder" className="w-full h-full object-cover rounded-full" />
              </div>
              <h4 className="font-yatra text-2xl">Ritwik B.</h4>
              <p className="font-hind text-[10px] uppercase tracking-[0.4em] opacity-40">Chief Visionary Officer</p>
              {/* Handwritten Signature SVG Placeholder */}
              <div className="mt-8 text-4xl font-yatra opacity-20 transform -rotate-12 select-none">Ritwik</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Epic Finale */}
      <section className="story-reveal py-40 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[#FF9933] opacity-5 -z-10" />
        <div className="max-w-5xl mx-auto">
          <h2 className="text-6xl md:text-9xl font-yatra tracking-tighter mb-16 leading-none">The Future is <span className="text-[#FF9933]">Grown</span> Here</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-10">
            <Link to="/#products" className="group flex items-center gap-6 px-16 py-8 bg-[#FF9933] text-[#1A0F05] rounded-full font-hind font-black uppercase tracking-[0.3em] text-sm hover:scale-105 transition-all shadow-[0_30px_60px_rgba(255,153,51,0.3)]">
              Enter Marketplace <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Simplified Global Footer */}
      <Footer isDarkMode={isDarkMode} simplified={true} />
    </div>
  );
};

export default OurStory;
