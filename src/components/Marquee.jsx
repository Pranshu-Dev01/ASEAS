'use client';
import React from 'react';
import { motion } from 'framer-motion';

const logos = [
  "NVIDIA", "Microsoft", "AWS", "Google", "Nasscom", "DPIIT", "Startup Karnataka"
];

const Marquee = () => {
  return (
    <div className="py-20 bg-black overflow-hidden border-y border-white/5">
      <div className="container mx-auto px-6 mb-10">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold text-center">
          Trusted & Supported By
        </p>
      </div>
      
      <div className="flex relative">
        <motion.div 
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-20 items-center"
        >
          {/* Loop twice for infinite effect */}
          {[...logos, ...logos].map((logo, index) => (
            <span 
              key={index} 
              className="text-3xl md:text-5xl font-black text-white/20 hover:text-blue-500/50 transition-colors cursor-default"
            >
              {logo}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Marquee;