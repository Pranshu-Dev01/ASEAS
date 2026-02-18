'use client';
import { useRef } from 'react';
import {
    motion,
    useInView,
} from 'framer-motion';

/**
 * InView component that triggers animations when the children enter the viewport.
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The elements to animate
 * @param {Object} props.variants - Framer Motion variants for hidden and visible states
 * @param {Object} props.transition - Framer Motion transition settings
 * @param {Object} props.viewOptions - Options for the useInView hook (margin, amount, once)
 */
export function InView({
    children,
    variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    },
    transition,
    viewOptions,
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, viewOptions);

    return (
        <motion.div
            ref={ref}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
            variants={variants}
            transition={transition}
        >
            {children}
        </motion.div>
    );
}
