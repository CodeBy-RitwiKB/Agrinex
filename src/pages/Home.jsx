import React, { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Components
import Hero from '../components/Hero';
import VisionSection from '../components/VisionSection';
import StatsSection from '../components/StatsSection';
import CategoriesSection from '../components/CategoriesSection';
import ProductsSection from '../components/ProductsSection';
import TrustBar from '../components/TrustBar';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import FilterDrawer from '../components/FilterDrawer';

const Home = ({ categories, products, isDarkMode }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // 1. Global GSAP Reveal Animations
    const reveals = gsap.utils.toArray('.gsap-reveal');
    reveals.forEach((el) => {
      gsap.fromTo(el, 
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: el,
            start: "top 98%",
            toggleActions: "play none none reverse",
          },
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          clearProps: "all"
        }
      );
    });

    // 2. Global Stats Counter Logic
    const stats = gsap.utils.toArray('.stat-number');
    stats.forEach((stat) => {
      const target = parseInt(stat.getAttribute('data-target'));
      gsap.to(stat, {
        scrollTrigger: {
          trigger: stat,
          start: "top 95%",
        },
        innerText: target,
        duration: 2,
        snap: { innerText: 1 },
        ease: "power2.inOut",
      });
    });

    // 3. Handle Hash Scroll (e.g., coming back from Department Page)
    if (window.location.hash === '#shop-by-department') {
      const el = document.getElementById('shop-by-department');
      if (el) {
        // Force immediate visibility to avoid reveal delay and white flash
        gsap.set(el, { opacity: 1, y: 0, visibility: 'visible' });
        
        // Use a more immediate scroll to prevent showing the Hero section
        const targetY = el.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo(0, targetY);
        
        // Then, slightly after, use GSAP to ensure Lenis/SmoothScroll is in sync
        requestAnimationFrame(() => {
          gsap.to(window, {
            scrollTo: { y: targetY, autoKill: false },
            duration: 0.1, // Fast sync
            onComplete: () => {
              // Clear hash from URL to prevent re-scroll on refresh
              window.history.replaceState(null, null, window.location.pathname);
            }
          });
        });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <Hero />
      <VisionSection isDarkMode={isDarkMode} />
      <CategoriesSection categories={categories} isDarkMode={isDarkMode} />
      <ProductsSection products={products} onOpenFilters={() => setIsFilterOpen(true)} isDarkMode={isDarkMode} />
      <TrustBar isDarkMode={isDarkMode} />
      <StatsSection isDarkMode={isDarkMode} />
      <CTASection isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
      <FilterDrawer isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} isDarkMode={isDarkMode} />
    </>
  );
};

export default Home;
