'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroCanvas from './HeroCanvas';

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-[150vh] w-full flex flex-col items-center bg-black">
      {/* Fixed 3D Background */}
      <div className="fixed inset-0 w-full h-screen pointer-events-none">
        {mounted && <HeroCanvas />}
      </div>

      {/* DYNAMIC CONTRACTING NAVBAR */}
      <div className="fixed top-0 w-full flex justify-center z-[100] transition-all duration-500">
        <motion.div
          animate={{
            width: isScrolled ? '65%' : '90%',
            maxWidth: isScrolled ? '850px' : '1150px',
            padding: isScrolled ? '10px 32px' : '14px 45px',
            backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.65)',
            backdropFilter: isScrolled ? 'blur(25px)' : 'blur(12px)',
            border: isScrolled ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.1)',
            y: isScrolled ? 25 : 20,
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 18 }}
          className="flex items-center justify-between h-auto relative rounded-full shadow-2xl"
        >
          {/* Logo */}
          <a className="flex items-center shrink-0 z-10" href="/">
            <img
              alt="Logo"
              className={`transition-all duration-500 ${isScrolled ? 'h-5 md:h-6' : 'h-7 md:h-8'} w-auto`}
              src="/BlackRed-Flogo.png"
            />
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 lg:space-x-12">
  {['Home', 'Color Analysis', 'Partnership', 'Careers', 'About'].map((item, i) => (
    <a
      key={item}
      className={`text-[13px] md:text-[14px] uppercase tracking-[0.25em] font-bold transition-all duration-300 ${
        i === 0 ? 'text-[#5620b4]' : 'text-black/70 hover:text-[#11a1c2]'
      }`}
      href={`/${item.toLowerCase().replace(' ', '-')}`}
    >
      {item}
    </a>
  ))}
</nav>

          {/* Join Waitlist Button */}
          <div className="flex items-center gap-4">
            <button className="hidden md:flex items-center px-5 py-2 text-[10px] uppercase tracking-widest font-bold rounded-full transition-all duration-500 bg-black text-white hover:bg-[#23bed6] hover:scale-105 active:scale-95">
              Join Waitlist
            </button>
          </div>
        </motion.div>
      </div>

      {/* HERO CONTENT SECTION */}
      <div className="relative pt-[40vh] container mx-auto px-6 z-10 text-center h-screen flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // Custom cubic-bezier for "expensive" feel
        >
          <h1 className="text-6xl md:text-8xl font-light text-white mb-8 tracking-tighter italic" 
              style={{ fontFamily: 'var(--font-playfair)', fontWeight: 300 }}>
            IntelliGrade <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-500 bg-clip-text text-transparent not-italic font-bold"
            style={{ 
  fontFamily: 'var(--font-geometric)', 
  fontWeight: 600, 
  letterSpacing: '-0.01em' 
}}>
              ASEAS
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-12 font-light leading-relaxed">
            Revolutionizing academic integrity with AI-driven handwritten script evaluation.
          </p>

          {/* Floating Scroll Indicator */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-2 mt-12"
          >
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;