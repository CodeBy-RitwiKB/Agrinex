import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const CTASection = () => {
  const buttonRef = useRef(null);
  const fillRef = useRef(null);
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
      color: "#1A0F05",
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
      color: "#FFFFFF",
      duration: 2.0,
      ease: "power3.out"
    });
  };

  return (
    <section id="cta-section" className="min-h-[105vh] bg-[#FF9933] flex items-center justify-center text-center px-6 overflow-hidden relative">
      <div className="absolute inset-0 bg-jali opacity-20"></div>
      
      {/* Decorative Ornaments */}
      <div className="absolute top-20 left-20 w-32 h-32 border border-[#1A0F05]/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-[#1A0F05]/5 rounded-full blur-3xl"></div>

      <div className="max-w-4xl relative z-10">
        <h2 className="font-yatra text-[#1A0F05] text-6xl md:text-9xl mb-8 gsap-reveal leading-none">Ready to Grow?</h2>
        <p className="font-hind text-[#1A0F05] text-lg md:text-2xl mb-12 opacity-70 gsap-reveal max-w-2xl mx-auto">
          Join 50,000+ visionaries revolutionizing their impact with precision data and elite commerce.
        </p>
        
        <Link to="/merchant/join" target="_blank" rel="noopener noreferrer" className="inline-block">
          <button 
            ref={buttonRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative px-10 py-5 bg-[#1A0F05] text-white rounded-full font-hind text-xs font-black uppercase tracking-[0.3em] overflow-hidden group shadow-2xl transition-transform duration-500 hover:scale-105 active:scale-95 gsap-reveal"
          >
            <span ref={textRef} className="relative z-10">
              Start Your Journey
            </span>
            
            {/* GSAP Ripple Fill */}
            <div 
              ref={fillRef}
              className="absolute w-[200%] aspect-square bg-white rounded-full -translate-x-1/2 -translate-y-1/2 scale-0 pointer-events-none z-0"
              style={{ top: 0, left: 0 }}
            />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
