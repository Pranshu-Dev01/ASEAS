'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-4 bg-black/60 backdrop-blur-xl border-b border-white/10' : 'py-8 bg-transparent'
      }`}>
      <div className="container mx-auto px-6 max-w-[1400px] flex items-center justify-between">

        {/* Logo Area */}
        <a href="/" className="flex items-center z-10">
          <div className="text-xl font-bold tracking-tighter text-white flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)]">
              <span className="text-white text-xs">IG</span>
            </div>
            <span>INTELLIGRADE</span>
          </div>
        </a>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-10 lg:space-x-14">
          {['Product', 'Technology', 'Institutions', 'About'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gray-400 hover:text-blue-400 transition-all duration-300"
            >
              {item}
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-6 z-10">
          <button className="hidden md:block px-6 py-2 text-[10px] uppercase tracking-widest font-bold rounded-full transition-all duration-500 bg-white text-black hover:bg-blue-500 hover:text-white shadow-lg">
            Join Waitlist
          </button>

          {/* Mobile Menu Icon */}
          <button className="md:hidden flex flex-col gap-1.5 p-2">
            <span className="w-6 h-[1.5px] bg-white"></span>
            <span className="w-6 h-[1.5px] bg-white"></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;