'use client';
import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [active, setActive] = useState('Vision'); // Default active
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const navItems = [
    { label: 'Vision', id: 'vision' },
    { label: 'Student Hub', id: 'student-hub' },
    { label: 'Educator Suite', id: 'educator-suite' },
    { label: 'Partners', id: 'partners-section' }
  ];

  const handleNavClick = (label, id) => {
    setActive(label);
    if (label === 'Vision') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const offset = label === 'Partners' ? 0 : 80; // Small offset for better positioning
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-4 bg-black/60 backdrop-blur-xl border-b border-white/10' : 'py-8 bg-transparent'
      }`}>
      <div className="container mx-auto px-6 max-w-[1400px] flex items-center justify-between gap-12 md:gap-20">

        {/* Logo Area */}
        <a href="/" onClick={(e) => { e.preventDefault(); handleNavClick('Vision', 'vision'); }} className="flex items-center z-10 shrink-0">
          <img src="/BlackRed-Flogo.png" alt="IntelliGrade Logo" className="h-16 md:h-20 w-auto" />
        </a>

        {/* Spotlight Navigation Links Container */}
        <div
          ref={navRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="hidden md:flex relative items-center justify-center px-4 py-2 rounded-full border border-transparent hover:border-white/10 transition-colors duration-500"
        >
          {/* Torch Light Effects (same as before) */}
          <div
            className="pointer-events-none absolute -inset-px rounded-full opacity-0 transition duration-300 z-0"
            style={{
              opacity,
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -inset-px rounded-full opacity-0 transition duration-300 z-0"
            style={{
              opacity,
              background: `radial-gradient(200px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.15), transparent 40%)`,
            }}
            aria-hidden="true"
          />

          {/* Links */}
          <div className="flex items-center space-x-2 z-10 relative">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.label, item.id)}
                className={cn(
                  "px-4 py-2 text-[11px] md:text-sm uppercase tracking-[0.2em] font-semibold rounded-full transition-all duration-300 whitespace-nowrap",
                  active === item.label
                    ? "text-white bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.3)] backdrop-blur-sm"
                    : "text-gray-400 hover:text-white"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-6 z-10 shrink-0">
          <button
            onClick={() => handleNavClick('Join Waitlist', 'waitlist-form')}
            className="hidden md:block px-6 py-2 text-[13px] uppercase tracking-widest font-bold rounded-full transition-all duration-500 bg-white text-black hover:bg-blue-500 hover:text-white shadow-lg"
          >
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