import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getCloudinaryUrl } from '../utils/cloudinary';

const StatsSection = ({ isDarkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const controlsRef = useRef(null);

  useEffect(() => {
    // Magnetic Entrance for Image & Controls
    gsap.fromTo(imageRef.current, 
      { scale: 0.8, opacity: 0, y: 50 },
      {
        scale: 1, opacity: 1, y: 0,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(controlsRef.current,
      { x: 50, opacity: 0 },
      {
        x: 0, opacity: 1,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  const stats = [
    { 
      label: "Premium Catalog", 
      target: 25000, 
      suffix: "+", 
      img: getCloudinaryUrl('1'),
      desc: "An elite collection of high-yield seeds, precision machinery, and organic soil health solutions."
    },
    { 
      label: "Global Logistics", 
      target: 1.5, 
      suffix: "M", 
      img: getCloudinaryUrl('2'),
      desc: "Direct-to-farmstead fulfillment network delivering essential agri-inputs across the Indian subcontinent."
    },
    { 
      label: "Strategic Partners", 
      target: 500, 
      suffix: "+", 
      img: getCloudinaryUrl('3'),
      desc: "Collaborating with world-class agricultural brands and verified sellers to ensure zero-compromise quality."
    },
    { 
      label: "Farmer Profit Growth", 
      target: 45, 
      suffix: "%", 
      img: getCloudinaryUrl('4'),
      desc: "Driving economic prosperity through optimized input costs and AI-driven marketplace precision."
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % stats.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + stats.length) % stats.length);
  };

  return (
    <div ref={sectionRef} className="relative h-[105vh] overflow-hidden transition-colors duration-1000" style={{ 
      backgroundColor: isDarkMode ? '#101A10' : '#E8E5E0' 
    }}>
      {/* Premium Jewel Divider */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] flex items-center justify-center z-30">
        <div className={`w-[80%] h-full bg-gradient-to-r from-transparent via-current to-transparent opacity-40 ${isDarkMode ? 'text-white' : 'text-[#1A0F05]'}`}></div>
        <div className="absolute w-2.5 h-2.5 bg-[#FF9933] rotate-45 shadow-[0_0_15px_#FF9933] z-40"></div>
      </div>
      <div className={`absolute inset-0 bg-jali opacity-5 pointer-events-none ${!isDarkMode && 'invert'}`}></div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className={`w-full h-full flex flex-col items-center px-8 md:px-24 ${
            currentIndex % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
          }`}
        >
          {/* Left Side - Framed Image */}
          <div className="w-full md:w-2/5 h-[50vh] md:h-[70vh] flex items-center justify-center relative group">
            <motion.div 
              ref={imageRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className={`relative w-full h-full rounded-[4rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.3)] border transition-all duration-1000 ${
                isDarkMode ? 'border-white/10 bg-[#150D07]' : 'border-gray-200 bg-white'
              }`}
            >
              <div className="absolute inset-0 z-10 opacity-20 pointer-events-none bg-grid-pattern"></div>
              <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[#FF9933] z-20"></div>
              <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[#FF9933] z-20"></div>

              <img 
                src={stats[currentIndex].img} 
                alt={stats[currentIndex].label} 
                className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
              />
            </motion.div>
          </div>

          {/* Right Side - Content */}
          <div className="w-full md:w-3/5 h-[50vh] md:h-screen flex items-center px-8 md:px-20 py-12 relative z-10">
            <div className="max-w-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-[1px] bg-[#FF9933]"></div>
                <span className="font-hind text-[#FF9933] text-[10px] uppercase tracking-[0.5em] font-black">Impact Milestone 0{currentIndex + 1}</span>
              </div>
              
              <div className={`font-yatra text-7xl md:text-9xl mb-6 flex items-baseline tracking-tighter transition-colors duration-1000 ${
                isDarkMode ? 'text-white' : 'text-[#1A0F05]'
              }`}>
                <span>{stats[currentIndex].target}</span>
                <span className="text-4xl md:text-5xl ml-2 text-[#FF9933] drop-shadow-[0_0_20px_rgba(255,153,51,0.4)]">{stats[currentIndex].suffix}</span>
              </div>
              
              <h3 className={`font-yatra text-3xl md:text-5xl mb-8 tracking-tight leading-tight transition-colors duration-1000 ${
                isDarkMode ? 'text-white' : 'text-[#1A0F05]'
              }`}>
                {stats[currentIndex].label}
              </h3>
              
              <p className={`font-hind text-xl leading-relaxed font-light max-w-lg transition-colors duration-1000 ${
                isDarkMode ? 'text-white/50' : 'text-[#1A0F05]/60'
              }`}>
                {stats[currentIndex].desc}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div ref={controlsRef} className="absolute bottom-12 right-12 md:right-24 flex items-center gap-8 z-30">
        <button 
          onClick={handlePrev}
          className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-500 group ${
            isDarkMode ? 'border-white/10 text-white' : 'border-[#1A0F05]/10 text-[#1A0F05]'
          } hover:bg-[#FF9933] hover:border-[#FF9933] hover:text-white`}
        >
          <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="flex flex-col items-center gap-2">
          <div className={`font-hind font-bold text-xl transition-colors duration-1000 ${
            isDarkMode ? 'text-white' : 'text-[#1A0F05]'
          }`}>
            0{currentIndex + 1} <span className="opacity-20 mx-1">/</span> 0{stats.length}
          </div>
        </div>

        <button 
          onClick={handleNext}
          className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-500 group ${
            isDarkMode ? 'border-white/10 text-white' : 'border-[#1A0F05]/10 text-[#1A0F05]'
          } hover:bg-[#FF9933] hover:border-[#FF9933] hover:text-white`}
        >
          <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StatsSection;
