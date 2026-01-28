'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function RadiusOnScroll({ children }) {
  const containerRef = useRef(null);

  // Track scroll progress of the container relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"] // Starts when top of container hits top of viewport
  });

  // Transform values:
  // As we scroll down (0 -> 1 progress of the container passing through):
  // 1. Width shrinks from 100% to roughly 90% (creating margins)
  // 2. Border Radius flows from 0px (sharp) to 48px (rounded card)
  // 3. Optional: Subtle scale down to enhance depth

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], ["0px", "48px"]);

  // We can also add a subtle opacity change or position shift if needed, 
  // but scale/radius is the core of the effect.

  return (
    <div ref={containerRef} className="relative w-full min-h-screen flex flex-col items-center">
      <motion.div
        style={{
          scale,
          borderRadius,
        }}
        className="sticky top-0 w-full h-screen overflow-hidden bg-black shadow-2xl z-0 origin-top"
      >
        {children}

        {/* Optional: Overlay to darken as it shrinks/goes back? 
            Usually not needed if it's the main focus. 
        */}
      </motion.div>

      {/* Spacer to allow scrolling "past" the sticky element so the animation plays out */}
      {/* This invisible div ensures we have trackable scroll space */}
      {/* <div className="h-screen w-full pointer-events-none" /> */}
    </div>
  );
}