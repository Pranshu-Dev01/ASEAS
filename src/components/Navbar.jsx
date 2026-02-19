'use client';
import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [active, setActive] = useState('Vision'); // Default active
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
      <div className="container mx-auto px-6 max-w-[1400px] grid grid-cols-3 items-center">

        {/* Column 1: Logo */}
        <div className="flex justify-start items-center">
          <a href="/" onClick={(e) => { e.preventDefault(); handleNavClick('Vision', 'vision'); setMobileMenuOpen(false); }} className="flex items-center z-10 shrink-0">
            <img src="/BlackRed-Flogo.png" alt="IntelliGrade Logo" className="h-12 md:h-16 lg:h-20 w-auto" />
          </a>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="flex justify-center">
          <div
            ref={navRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="hidden md:flex relative items-center justify-center px-4 py-2 rounded-full border border-transparent hover:border-white/10 transition-colors duration-500"
          >
            {/* Torch Light Effects */}
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
        </div>

        {/* Column 3: CTA Buttons and Mobile Toggle */}
        <div className="flex items-center justify-end gap-2 md:gap-4 z-10 shrink-0 overflow-visible">
          {/* Desktop/Tablet CTA Buttons */}
          <div className="hidden sm:flex items-center gap-2 md:gap-4">
            {/* Existing Users Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="px-3 py-1.5 text-[10px] md:text-[12px] uppercase tracking-widest font-bold rounded-full transition-all duration-300 bg-white text-black hover:bg-gray-200 flex items-center gap-1.5 md:gap-2 shadow-lg whitespace-nowrap"
              >
                Existing users
                <ChevronDown className={cn("w-3 h-3 md:w-4 md:h-4 transition-transform duration-300", dropdownOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-40 bg-white/80 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-50"
                  >
                    <div className="flex flex-col py-2">
                      <a
                        href="https://aseas-scanner.web.app"
                        className="px-6 py-3 text-left text-sm text-gray-700 hover:text-black hover:bg-black/5 transition-colors font-semibold block"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Teacher
                      </a>
                      <a
                        href="https://aseas-student.web.app"
                        className="px-6 py-3 text-left text-sm text-gray-700 hover:text-black hover:bg-black/5 transition-colors font-semibold block"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Student
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => handleNavClick('Join Waitlist', 'waitlist-form')}
              className="hidden lg:block px-4 py-1.5 text-[12px] uppercase tracking-widest font-bold rounded-full transition-all duration-500 bg-white text-black hover:bg-blue-500 hover:text-white shadow-lg whitespace-nowrap"
            >
              Join Waitlist
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex items-center justify-center p-2 text-white bg-white/10 rounded-full hover:bg-white/20 transition-all z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-40 flex flex-col items-center justify-center space-y-8 p-6 md:hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  handleNavClick(item.label, item.id);
                  setMobileMenuOpen(false);
                }}
                className={cn(
                  "text-2xl uppercase tracking-[0.3em] font-light transition-all duration-300",
                  active === item.label ? "text-white font-bold" : "text-gray-500 hover:text-white"
                )}
              >
                {item.label}
              </button>
            ))}

            <div className="w-full h-px bg-white/10 my-4" />

            <div className="flex flex-col items-center space-y-4 w-full">
              <p className="text-gray-500 text-sm uppercase tracking-widest mb-2 font-bold">Existing users</p>
              <a
                href="https://aseas-scanner.web.app"
                className="w-full max-w-[200px] text-center px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all font-semibold"
              >
                Teacher
              </a>
              <a
                href="https://aseas-student.web.app"
                className="w-full max-w-[200px] text-center px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all font-semibold"
              >
                Student
              </a>
              <button
                onClick={() => {
                  handleNavClick('Join Waitlist', 'waitlist-form');
                  setMobileMenuOpen(false);
                }}
                className="w-full max-w-[200px] px-6 py-3 text-sm uppercase tracking-widest font-bold rounded-full bg-white text-black hover:bg-blue-500 hover:text-white transition-all shadow-xl"
              >
                Join Waitlist
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;