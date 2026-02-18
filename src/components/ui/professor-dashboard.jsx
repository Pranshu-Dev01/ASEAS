'use client';
import React, { useEffect, useRef } from 'react';

export function ProfessorDashboard({ isActive, onComplete }) {
    const scrollRef = useRef(null);
    const hasAnimatedRef = useRef(false);

    useEffect(() => {
        if (!isActive || !scrollRef.current || hasAnimatedRef.current) return;

        const scrollContainer = scrollRef.current;
        let animationFrameId;
        let startTime;
        let safetyTimeoutId;
        const scrollDuration = 2000;
        const pauseDuration = 800;
        const scrollAmount = 350;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;

            let targetScroll = 0;

            if (elapsed < scrollDuration) {
                const progress = elapsed / scrollDuration;
                const ease = 1 - Math.pow(1 - progress, 3);
                targetScroll = ease * scrollAmount;
                scrollContainer.scrollTop = targetScroll;
                animationFrameId = requestAnimationFrame(animate);
            } else if (elapsed < scrollDuration + pauseDuration) {
                targetScroll = scrollAmount;
                scrollContainer.scrollTop = targetScroll;
                animationFrameId = requestAnimationFrame(animate);
            } else if (elapsed < scrollDuration * 2 + pauseDuration) {
                const progress = (elapsed - (scrollDuration + pauseDuration)) / scrollDuration;
                const ease = 1 - Math.pow(1 - progress, 3);
                targetScroll = scrollAmount - (ease * scrollAmount);
                scrollContainer.scrollTop = targetScroll;
                animationFrameId = requestAnimationFrame(animate);
            } else {
                scrollContainer.scrollTop = 0;
                hasAnimatedRef.current = true;
                if (onComplete) onComplete();
            }
        };

        const startTimeoutId = setTimeout(() => {
            animationFrameId = requestAnimationFrame(animate);
        }, 300);

        safetyTimeoutId = setTimeout(() => {
            if (onComplete) onComplete();
        }, 8000);

        return () => {
            cancelAnimationFrame(animationFrameId);
            clearTimeout(startTimeoutId);
            clearTimeout(safetyTimeoutId);
        };
    }, [isActive, onComplete]);

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101922] text-slate-900 dark:text-white font-['Lexend',sans-serif] h-full flex flex-col relative overflow-hidden text-left">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
                
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            {/* Top Navigation Bar */}
            <div className="sticky top-0 left-0 right-0 z-50 bg-[#f6f7f8]/80 dark:bg-[#101922]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center p-4 pb-2 justify-between">
                    <div className="flex size-12 shrink-0 items-center">
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#137fec]"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAP8GrR96Om3F4isUEM8EW4J4_35XYApDe1i41S0NlEDA_PYKH1rD6OJ-Lzw-V7fzOZK0syLEuvo8oBOtm3qa-EjODqU97_NL52bke1Q8AQYWUErDY0-m1QU-ntltOl2edYDtsHgW61huGcsz7H1o1bw2tDHnB56TJ6k9_cghkICSyO2htKQqENrkGjVV_njBFFWezkY0wGiknQjb7xPYszYCbMuqqhHkjYEpxT4kHaCbBme0jEU77jn6AgVyXCfVWrDMhtJKVKrtI")' }}
                        ></div>
                    </div>
                    <div className="flex-1 px-3">
                        <h2 className="text-slate-900 dark:text-white text-base font-bold leading-tight tracking-tight">Hello Dr. Yogesh</h2>
                        <p className="text-slate-500 dark:text-[#92adc9] text-[10px] font-medium uppercase tracking-wider">Automated Script Evaluation</p>
                    </div>
                    <div className="flex w-12 items-center justify-end">
                        <button className="flex items-center justify-center rounded-full h-8 w-8 bg-slate-200 dark:bg-[#233648] text-slate-900 dark:text-white transition-colors">
                            <span className="material-symbols-outlined text-[20px]">notifications</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <main ref={scrollRef} className="flex-1 overflow-y-auto px-4 pb-32 no-scrollbar pt-4">
                {/* Section Header: Current Class */}
                <div className="mb-2">
                    <div className="inline-flex items-center gap-2 bg-[#137fec]/10 text-[#137fec] px-3 py-1 rounded-full text-[10px] font-semibold mb-2">
                        <span className="size-1.5 bg-[#137fec] rounded-full animate-pulse"></span>
                        LIVE SESSION
                    </div>
                    <h3 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">Current Class: AIML-D</h3>
                </div>

                {/* Statistical Cards Grid */}
                <div className="grid grid-cols-2 gap-3 mt-6">
                    {/* Total Scanned */}
                    <div className="col-span-2 flex flex-col gap-2 rounded-xl p-5 bg-white dark:bg-[#233648] shadow-sm border border-slate-100 dark:border-slate-800">
                        <div className="flex justify-between items-start">
                            <p className="text-slate-500 dark:text-[#92adc9] text-[10px] font-medium">Total Scanned Images</p>
                            <span className="material-symbols-outlined text-[#137fec] text-sm">analytics</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <p className="text-slate-900 dark:text-white tracking-tight text-2xl font-bold">1,240</p>
                            <p className="text-[#0bda5b] text-[10px] font-bold leading-normal">+12%</p>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-[#111a22] h-1.5 rounded-full mt-2 overflow-hidden">
                            <div className="bg-[#137fec] h-full w-[85%] rounded-full"></div>
                        </div>
                    </div>
                    {/* Evaluation Progress */}
                    <div className="flex flex-col gap-2 rounded-xl p-4 bg-white dark:bg-[#233648] shadow-sm border border-slate-100 dark:border-slate-800">
                        <p className="text-slate-500 dark:text-[#92adc9] text-[10px] font-medium">Evaluation</p>
                        <p className="text-slate-900 dark:text-white tracking-tight text-lg font-bold">75/100</p>
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px] text-[#137fec]">check_circle</span>
                            <p className="text-[#137fec] text-[10px] font-bold">75% Done</p>
                        </div>
                    </div>
                    {/* Pending Reviews */}
                    <div className="flex flex-col gap-2 rounded-xl p-4 bg-white dark:bg-[#233648] shadow-sm border border-slate-100 dark:border-slate-800">
                        <p className="text-slate-500 dark:text-[#92adc9] text-[10px] font-medium">Pending</p>
                        <p className="text-slate-900 dark:text-white tracking-tight text-lg font-bold">25</p>
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[12px] text-[#fa6238]">pending_actions</span>
                            <p className="text-[#fa6238] text-[10px] font-bold">Needs Review</p>
                        </div>
                    </div>
                </div>

                {/* Section Header: Recent Batches */}
                <div className="flex items-center justify-between mt-8 mb-4">
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">Recent Batches</h2>
                    <button className="text-[#137fec] text-xs font-bold">View All</button>
                </div>

                {/* List Items: Recent Batches */}
                <div className="space-y-3">
                    <div className="flex items-center gap-3 bg-white dark:bg-[#1c2a38] p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-left">
                        <div className="text-white flex items-center justify-center rounded-lg bg-[#137fec]/20 text-[#137fec] shrink-0 size-10">
                            <span className="material-symbols-outlined text-[20px]">folder_zip</span>
                        </div>
                        <div className="flex flex-col flex-1 justify-center min-w-0">
                            <p className="text-slate-900 dark:text-white text-sm font-bold leading-tight truncate">Batch A - Final Exam</p>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="flex-1 bg-slate-100 dark:bg-[#101922] h-1 rounded-full">
                                    <div className="bg-[#137fec] h-full w-full rounded-full"></div>
                                </div>
                                <p className="text-[#0bda5b] text-[9px] font-bold">100%</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white dark:bg-[#1c2a38] p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-left">
                        <div className="text-white flex items-center justify-center rounded-lg bg-[#137fec]/20 text-[#137fec] shrink-0 size-10">
                            <span className="material-symbols-outlined text-[20px]">folder_open</span>
                        </div>
                        <div className="flex flex-col flex-1 justify-center min-w-0">
                            <p className="text-slate-900 dark:text-white text-sm font-bold leading-tight truncate">Batch B - Midterm 2</p>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="flex-1 bg-slate-100 dark:bg-[#101922] h-1 rounded-full">
                                    <div className="bg-[#137fec] h-full w-[45%] rounded-full"></div>
                                </div>
                                <p className="text-[#137fec] text-[9px] font-bold">45%</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white dark:bg-[#1c2a38] p-3 rounded-xl border border-slate-100 dark:border-slate-800 text-left">
                        <div className="text-white flex items-center justify-center rounded-lg bg-[#137fec]/20 text-[#137fec] shrink-0 size-10">
                            <span className="material-symbols-outlined text-[20px]">folder</span>
                        </div>
                        <div className="flex flex-col flex-1 justify-center min-w-0">
                            <p className="text-slate-900 dark:text-white text-sm font-bold leading-tight truncate">Batch C - Assignment 4</p>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="flex-1 bg-slate-100 dark:bg-[#101922] h-1 rounded-full">
                                    <div className="bg-[#137fec] h-full w-[10%] rounded-full"></div>
                                </div>
                                <p className="text-slate-400 text-[9px] font-bold">10%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Quick Action Floating Button */}
            <div className="absolute bottom-24 right-4">
                <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#137fec] text-white shadow-xl shadow-[#137fec]/30">
                    <span className="material-symbols-outlined text-[24px]">add_photo_alternate</span>
                </button>
            </div>

            {/* Bottom Navigation Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/80 dark:bg-[#101922]/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-4 pt-2 pb-6">
                <div className="flex items-center justify-between max-w-md mx-auto">
                    <div className="flex flex-col items-center gap-1 text-[#137fec]">
                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
                        <span className="text-[9px] font-bold">Home</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-slate-400">
                        <span className="material-symbols-outlined text-[20px]">description</span>
                        <span className="text-[9px] font-medium">Scripts</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-slate-400">
                        <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                        <span className="text-[9px] font-medium">Auto-Grade</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-slate-400">
                        <span className="material-symbols-outlined text-[20px]">bar_chart</span>
                        <span className="text-[9px] font-medium">Reports</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
