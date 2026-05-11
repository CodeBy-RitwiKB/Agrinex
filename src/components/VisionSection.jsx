import React from 'react';

const VisionSection = ({ isDarkMode }) => {
  return (
    <section className={`min-h-screen flex items-center justify-center px-6 md:px-12 py-32 relative overflow-hidden transition-colors duration-1000 ${
      isDarkMode ? 'bg-[#101A10]' : 'bg-[#EFEDE8]'
    }`}>
      <div className={`absolute inset-0 bg-jali opacity-[0.03] ${!isDarkMode && 'invert'}`}></div>
      
      {/* Premium Jewel Divider */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] flex items-center justify-center z-30">
        <div className={`w-[80%] h-full bg-gradient-to-r from-transparent via-current to-transparent opacity-40 ${isDarkMode ? 'text-white' : 'text-[#1A0F05]'}`}></div>
        <div className="absolute w-2.5 h-2.5 bg-[#FF9933] rotate-45 shadow-[0_0_15px_#FF9933] z-40"></div>
      </div>

      <div className="max-w-6xl text-center relative z-10">
        <div className="flex flex-col items-center mb-12 gsap-reveal">
          <span className="font-hind text-[#FF9933] text-xs uppercase tracking-[0.4em] font-bold mb-4">Our Philosophy</span>
          <div className="w-12 h-[1px] bg-[#FF9933]"></div>
        </div>
        
        <h2 className={`font-yatra text-5xl md:text-8xl leading-tight mb-16 gsap-reveal tracking-tight ${
          isDarkMode ? 'text-white' : 'text-[#1A0F05]'
        }`}>
          Honoring Tradition,<br /> 
          <span className="text-[#FF9933]">Powering the Future.</span>
        </h2>
        
        <p className={`font-hind text-lg md:text-2xl leading-relaxed max-w-4xl mx-auto gsap-reveal font-light ${
          isDarkMode ? 'text-white/50' : 'text-[#1A0F05]/60'
        }`}>
          In the heart of every seed lies a legacy. Agrinex fuses India's generational farming wisdom with AI-driven precision 
          to create a sustainable, high-yield future for every farmer.
        </p>
      </div>
    </section>
  );
};

export default VisionSection;
