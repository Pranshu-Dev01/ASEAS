"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A robust typing animation component that reveals text character by character.
 */
export function TypingAnimation({
    text,
    duration = 50,
    className,
    start = true,
}) {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Reset if we're told to stop/haven't started
        if (!start) {
            setDisplayedText("");
            setCurrentIndex(0);
            return;
        }

        // Don't start if we've already finished
        if (currentIndex >= text.length) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                if (prev < text.length) {
                    const next = prev + 1;
                    setDisplayedText(text.substring(0, next));
                    return next;
                }
                clearInterval(interval);
                return prev;
            });
        }, duration);

        return () => clearInterval(interval);
    }, [text, duration, start]);

    return (
        <div
            className={cn(
                "relative font-display text-center text-4xl font-bold leading-tight tracking-[-0.02em]",
                className,
            )}
        >
            <span className="inline">
              {displayedText}
            </span>
            {/* Flickering cursor - made absolute or less intrusive */}
            {start && currentIndex < text.length && (
                <span className="inline-block w-0.5 h-[1em] bg-emerald-500 ml-0.5 animate-pulse align-middle" />
            )}
        </div>
    );
}
