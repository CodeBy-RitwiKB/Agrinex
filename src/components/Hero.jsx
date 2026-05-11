import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { getCloudinaryUrl } from '../utils/cloudinary';

const Hero = () => {
  const sectionRef = useRef(null);
  const buttonRef = useRef(null);
  const fillRef = useRef(null);

  // Custom high-end easing
  const customEase = [0.76, 0, 0.24, 1];

  const textRef = useRef(null);

  const handleMouseEnter = (e) => {
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.set(fillRef.current, { x, y });
    gsap.to(fillRef.current, {
      scale: 2.5,
      duration: 2.0,
      ease: "power3.out"
    });
    gsap.to(textRef.current, {
      color: "#FFFFFF",
      duration: 2.0,
      ease: "power3.out"
    });
  };

  const handleMouseLeave = (e) => {
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(fillRef.current, {
      x,
      y,
      scale: 0,
      duration: 2.0,
      ease: "power3.out"
    });
    gsap.to(textRef.current, {
      color: "#1A0F05",
      duration: 2.0,
      ease: "power3.out"
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: customEase },
    },
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative h-screen w-full overflow-hidden bg-[#1A0F05] flex items-center justify-center px-4 md:px-12 lg:px-24"
    >
      {/* Background Video (With Warm Golden Overlay) */}
      <video 
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none"
      >
        <source src={getCloudinaryUrl('video', {}, true)} type="video/mp4" />
      </video>
      
      {/* Warm Earthy Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A0F05]/80 via-transparent to-[#1A0F05]/90 z-0"></div>

      {/* Jali Pattern Overlay */}
      <div className="absolute inset-0 bg-jali z-0 opacity-40"></div>

      {/* Main Content Area */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-7xl flex flex-col items-center text-center pt-10"
      >

        {/* Headline Stack */}
        <div className="flex flex-col mb-8 select-none items-center">
          <motion.div variants={itemVariants}>
            <h1 className="font-yatra text-5xl md:text-7xl lg:text-8xl text-white opacity-90 tracking-tight leading-none">
              Premium
            </h1>
          </motion.div>
          <motion.div variants={itemVariants} className="-mt-1 md:-mt-2">
            <h1 className="font-yatra text-6xl md:text-8xl lg:text-9xl leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#FFBB33] via-[#FF9933] to-[#FF6600] drop-shadow-[0_10px_30px_rgba(255,153,51,0.2)]">
              Harvest
            </h1>
          </motion.div>
        </div>

        {/* Subheading */}
        <motion.div variants={itemVariants} className="mb-12 max-w-xl">
          <p className="font-hind text-base md:text-lg text-white/70 font-medium leading-relaxed tracking-wide">
            Fusing India’s deep-rooted agricultural wisdom with future-ready precision technology. 
            Sustainable farming, redefined for the modern age.
          </p>
        </motion.div>

        {/* Premium Action Button */}
        <motion.div variants={itemVariants}>
          <Link 
            to="/our-story"
            className="inline-block"
          >
            <button 
              ref={buttonRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="group relative px-10 py-4 bg-[#FF9933] text-[#1A0F05] font-hind text-sm tracking-widest uppercase rounded-full overflow-hidden transition-all duration-500 hover:shadow-[0_15px_40px_rgba(255,153,51,0.4)] hover:-translate-y-1 active:scale-95"
            >
              <span ref={textRef} className="relative z-10 font-black">
                Explore Our Vision
              </span>
              
              {/* GSAP Ripple Fill */}
              <div 
                ref={fillRef}
                className="absolute w-[200%] aspect-square bg-[#1A0F05] rounded-full -translate-x-1/2 -translate-y-1/2 scale-0 pointer-events-none z-0"
                style={{ top: 0, left: 0 }}
              />
            </button>
          </Link>
        </motion.div>
      </motion.div>

    </section>
  );
};

export default Hero;