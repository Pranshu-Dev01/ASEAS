'use client';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';

const LAYERS = [
  {
    id: 'inner',
    radius: 188,
    xScale: 1.4, // Making it oval
    baseRotate: -37.96,
    duration: 30,
    logos: ["/logos/university-1.png", "/logos/university-2.png", "/logos/university-3.png", "/logos/university-4.png", "/logos/university-1.png", "/logos/university-2.png"]
  },
  {
    id: 'middle',
    radius: 338,
    xScale: 1.4, // Making it oval
    baseRotate: 46.19,
    duration: 50,
    logos: ["/logos/university-5.png", "/logos/university-6.png", "/logos/university-7.png", "/logos/university-8.png", "/logos/university-5.png", "/logos/university-6.png"]
  }
];

const PlanetCarousel = () => {
  // User preferred 65 degrees
  const TILT = 50;
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setScale(0.5);
      else if (width < 768) setScale(0.7);
      else if (width < 1024) setScale(0.85);
      else setScale(1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative h-[300px] sm:h-[450px] md:h-[600px] w-full flex items-center justify-center z-20 overflow-hidden">
      {/* Perspective Container - Kept inner to avoid distortion when moving the section */}
      <div
        className="relative w-full h-full flex items-center justify-center [perspective:1125px] transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: `scale(${scale})`
        }}
      >

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
            className="absolute z-50 flex flex-col items-center justify-center w-32 h-32 rounded-full bg-black shadow-[0_0_60px_rgba(255,255,255,0.1)] border border-white/10"
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
                className="absolute inset-0 rounded-full border-4 border-cyan-500/50 shadow-[0_0_0px_rgba(6,182,212,1.0)]"
                animate={{ opacity: [5, 1, 5] }}
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
                        // translateZ(50px) allows the sphere to sit ON TOP of the orbit line, avoiding intersection
                        transform: `translate(-50%, -50%) rotateZ(${angle}deg) translateX(${layer.radius}px) translateZ(50px)`,
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
                          className="relative w-18 h-18 flex items-center justify-center"
                          style={{
                            transformStyle: 'preserve-3d',
                            // Order: 1. Un-scale the oval distortion (X axis)
                            //        2. Stand it up against the 65deg tilt (X axis)
                            transform: `scaleX(${1 / layer.xScale}) rotateX(-${TILT}deg)`
                          }}
                        >

                          {/* FINAL VISUAL: SOLID WHITE SPHERE + NATURAL LOGO */}
                          <motion.div
                            className="relative w-18 h-18 rounded-full bg-white border border-white/20 flex items-center justify-center"
                            style={{
                              // Radial gradient gives the "Solid Ball" 3D look - Pure white/gray scale
                              background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 1) 100%, rgba(240, 240, 240, 1) 100%, rgba(180, 180, 180, 1) 100%)'
                            }}
                          >
                            {/* The Logo Image - NO INVERT to keep colors */}
                            <img
                              src={src}
                              alt="Logo"
                              className="w-12 h-12 object-contain z-10 drop-shadow-lg"
                            />

                            {/* Shine/Glare Overlay */}

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
    </div>
  );
};

export default PlanetCarousel;