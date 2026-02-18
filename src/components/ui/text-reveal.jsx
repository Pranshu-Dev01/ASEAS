"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * TextRevealByWord component redesigned as a Glassmorphism Vision Card.
 * 
 * @param {Object} props
 * @param {string} props.text - The text to display
 * @param {string} props.className - Additional classes for the container
 */
const TextRevealByWord = ({
    text,
    className,
}) => {
    return (
        <div className={cn("relative z-20 w-full py-24 px-6 flex justify-center items-center bg-black", className)}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={cn(
                    "relative max-w-5xl p-8 md:p-12 lg:p-16 rounded-[2.5rem]",
                    "bg-white/[0.03] backdrop-blur-2xl border border-white/10",
                    "shadow-[0_24px_80px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(255,255,255,0.02)]",
                    "overflow-hidden group"
                )}
            >
                {/* Decorative background glow */}
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

                <p
                    className={
                        "relative z-10 text-3xl md:text-4xl lg:text-5xl font-light text-white italic leading-[1.3] tracking-tight text-center md:text-left"
                    }
                    style={{ fontFamily: 'var(--font-playfair)' }}
                >
                    {text}
                </p>

                {/* Subtle animated border highlight */}
                <div className="absolute inset-0 border border-white/5 rounded-[2.5rem] pointer-events-none" />
            </motion.div>
        </div>
    );
};

export { TextRevealByWord };
