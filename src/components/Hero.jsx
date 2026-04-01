'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroCanvas from './HeroCanvas';
import Navbar from './Navbar';
import { Text_03 } from './ui/wave-text';

import { TypingAnimation } from './ui/typing-animation';

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
    <section className="relative min-h-[85vh] md:min-h-[110vh] w-full flex flex-col items-center bg-black">
      {/* Fixed 3D Background */}
      <div className="fixed inset-0 w-full h-screen pointer-events-none">
        {mounted && <HeroCanvas />}
      </div>

      <Navbar />

      {/* HERO CONTENT SECTION */}
      <div className="relative pt-20 container mx-auto px-6 z-10 text-center pb-12 h-screen flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} // Custom cubic-bezier for "expensive" feel
        >
          <div className="mb-4 md:mb-6 select-none">
            <Text_03
              text="IntelliGrade"
              className="text-3xl md:text-6xl font-light text-white tracking-tighter italic"
              style={{ fontFamily: 'var(--font-playfair)', fontWeight: 300 }}
            />
            <Text_03
              text="ASEAS"
              className="text-3xl md:text-6xl block not-italic select-none"
              charClassName="font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-500 bg-clip-text text-transparent transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]"
              style={{
                fontFamily: 'var(--font-geometric)',
                fontWeight: 600,
                letterSpacing: '-0.01em'
              }}
            />
          </div>

          <TypingAnimation
            text="Revolutionizing academic integrity with AI-driven handwritten script evaluation."
            className="text-gray-400 text-base md:text-xl max-w-xl mx-auto mb-12 font-light leading-relaxed min-h-[4em] md:h-[3em] text-center w-full flex flex-col justify-center items-center"
            duration={40}
          />

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