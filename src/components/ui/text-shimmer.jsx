'use client';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * TextShimmer component that adds a linear shimmer animation to text.
 * 
 * @param {Object} props
 * @param {string} props.children - The text to shimmmer
 * @param {React.ElementType} props.as - The HTML element to render as (default: 'p')
 * @param {string} props.className - Additional classes for the text
 * @param {number} props.duration - Duration of the shimmer animation in seconds
 * @param {number} props.spread - Spread of the shimmer effect
 */
export function TextShimmer({
    children,
    as: Component = 'p',
    className,
    duration = 2,
    spread = 2,
}) {
    const dynamicSpread = useMemo(() => {
        return children.length * spread;
    }, [children, spread]);

    return (
        <motion.div
            as={Component}
            className={cn(
                'relative inline-block bg-[length:250%_100%,auto] bg-clip-text',
                'text-transparent [--base-color:#a1a1aa] [--base-gradient-color:#000]',
                '[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]',
                'dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff] dark:[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))]',
                className
            )}
            initial={{ backgroundPosition: '100% center' }}
            animate={{ backgroundPosition: '0% center' }}
            transition={{
                repeat: Infinity,
                duration,
                ease: 'linear',
            }}
            style={{
                '--spread': `${dynamicSpread}px`,
                backgroundImage: `var(--bg), linear-gradient(var(--base-color), var(--base-color))`,
            }}
        >
            {children}
        </motion.div>
    );
}
