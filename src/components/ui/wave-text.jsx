"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/**
 * A text component that creates a "wave" animation on hover.
 * 
 * @param {Object} props
 * @param {string} props.text - The text to animate
 * @param {string} props.className - Additional Tailwind classes
 */
function Text_03({
    text = "Hover me",
    className = "",
    charClassName = "",
    ...props
}) {
    // Split text into lines if it contains <br /> or \n, 
    // but the split pattern here is for characters.
    // If we want to support multi-line wave, we handle it differently.
    // Since the user wants it for "IntelliGrade ASEAS", 
    // I will handle it as a single block that can wrap.

    return (
        <motion.span
            className={cn(
                "w-full text-center inline-block cursor-pointer transition-all leading-tight group",
                className
            )}
            whileHover="hover"
            initial="initial"
            {...props}
        >
            {text.split("").map((char, index) => (
                <motion.span
                    key={index}
                    className={cn("inline-block whitespace-pre", charClassName)}
                    variants={{
                        initial: {
                            y: 0,
                            scale: 1,
                        },
                        hover: {
                            y: -4,
                            scale: 1.2,
                            transition: {
                                type: "spring",
                                stiffness: 300,
                                damping: 15,
                                delay: index * 0.03,
                            },
                        },
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.span>
    );
}

export { Text_03 };
