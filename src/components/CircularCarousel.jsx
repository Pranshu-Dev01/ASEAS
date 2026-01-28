'use client';
import { motion } from 'framer-motion';
import React from 'react';

const LAYERS = [
  {
    id: 'inner',
    radius: 250,
    xScale: 1.4, // Making it oval
    baseRotate: -37.96,
    duration: 30,
    logos: ["/logos/university-1.png", "/logos/university-2.png", "/logos/university-3.png", "/logos/university-4.png", "/logos/university-1.png", "/logos/university-2.png", "/logos/university-3.png", "/logos/university-4.png"]
  },
  {
    id: 'middle',
    radius: 450,
    xScale: 1.4, // Making it oval
    baseRotate: 46.19,
    duration: 50,
    logos: ["/logos/university-5.png", "/logos/university-6.png", "/logos/university-7.png", "/logos/university-8.png", "/logos/university-5.png", "/logos/university-6.png", "/logos/university-7.png", "/logos/university-8.png"]
  }
];

const PlanetCarousel = () => {
  // User preferred 65 degrees
  const TILT = 50;

  return (
    <div className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden [perspective:1500px]">

      {/* 1. THE 3D STAGE (The horizontal X-Z plane) */}
      <div
        className="relative flex items-center justify-center w-full h-full"
        style={{
          transform: `rotateX(${TILT}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >

        {/* 2. CENTER SPHERE (ASEAS) - Stands upright */}
        <div
          className="absolute z-50 flex flex-col items-center justify-center w-40 h-40 rounded-full bg-black shadow-[0_0_60px_rgba(255,255,255,0.1)] border border-white/10"
          style={{ transform: `rotateX(-${TILT}deg)` }}
        >
          <div className="relative z-10 text-center">
            <h1 className="text-white font-bold tracking-widest text-2xl">ASEAS</h1>
            <p className="text-blue-400 text-[9px] mt-1 uppercase">AI Evaluation</p>
          </div>
          <div className="absolute inset-0 z-20 pointer-events-none rounded-full shadow-[inset_-15px_-15px_30px_rgba(0,0,0,0.8),inset_15px_15px_30px_rgba(255,255,255,0.15)]" />
        </div>

        {LAYERS.map((layer) => (
          <div
            key={layer.id}
            className="absolute flex items-center justify-center transform-gpu"
            style={{
              width: layer.radius * 2,
              height: layer.radius * 2,
              transformStyle: 'preserve-3d',
              // Apply the Oval Scale to the Container
              transform: `scaleX(${layer.xScale})`
            }}
          >
            {/* 3. VISIBLE ORBIT LINE (Now Oval due to parent scale) */}
            <motion.div
              className="absolute inset-0 rounded-full border border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.3)]"
              animate={{ opacity: [2, 0.8, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* 4. THE ROTATING WRAPPER */}
            <motion.div
              className="w-full h-full relative"
              style={{ transformStyle: 'preserve-3d' }}
              initial={{ rotateZ: layer.baseRotate }}
              animate={{ rotateZ: layer.baseRotate + 360 }}
              transition={{ duration: layer.duration, repeat: Infinity, ease: "linear" }}
            >
              {layer.logos.map((src, index) => {
                const angle = index * (360 / layer.logos.length);

                return (
                  <div
                    key={index}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      // Place the logo on the orbit path (relative to the scaled container)
                      transform: `translate(-50%, -50%) rotateZ(${angle}deg) translateX(${layer.radius}px)`,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {/* 5. THE LOGO SPHERE (Stands straight up) */}
                    <motion.div
                      style={{ transformStyle: 'preserve-3d' }}
                      initial={{ rotateZ: -angle - layer.baseRotate }}
                      animate={{ rotateZ: -angle - layer.baseRotate - 360 }}
                      transition={{ duration: layer.duration, repeat: Infinity, ease: "linear" }}
                    >
                      {/* 6. CORRECTION WRAPPER: Un-scales and Un-tilts */}
                      <div
                        className="relative w-24 h-24 flex items-center justify-center"
                        style={{
                          transformStyle: 'preserve-3d',
                          // Order: 1. Un-scale the oval distortion (X axis)
                          //        2. Stand it up against the 65deg tilt (X axis)
                          transform: `scaleX(${1 / layer.xScale}) rotateX(-${TILT}deg)`
                        }}
                      >

                        {/* FINAL VISUAL: SOLID CYAN SPHERE + NATURAL LOGO */}
                        <motion.div
                          className="relative w-24 h-24 rounded-full bg-white border border-cyan-400/50 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                          style={{
                            // Radial gradient gives the "Solid Ball" 3D look
                            background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 1) 0%, rgba(248, 244, 244, 1) 50%, rgba(21,94,117,1) 100%)'
                          }}
                          animate={{
                            boxShadow: ["0 0 20px rgba(34,211,238,0.4)", "0 0 50px rgba(34,211,238,0.7)", "0 0 20px rgba(34,211,238,0.4)"],
                            scale: [1, 1.05, 1],
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          {/* The Logo Image - NO INVERT to keep colors */}
                          <img
                            src={src}
                            alt="Logo"
                            className="w-16 h-16 object-contain z-10 drop-shadow-lg"
                          />

                          {/* Shine/Glare Overlay */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-black/30 pointer-events-none" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanetCarousel;