'use client';
import React, { useEffect, useRef } from 'react';

export function InsightsDashboard({ isActive, onComplete }) {
    const scrollRef = useRef(null);
    const hasAnimatedRef = useRef(false);

    useEffect(() => {
        if (!isActive || !scrollRef.current || hasAnimatedRef.current) return;

        const scrollContainer = scrollRef.current;
        let animationFrameId;
        let startTime;
        let safetyTimeoutId;
        const scrollDuration = 1500; // 1.5 seconds down (Faster)
        const pauseDuration = 600; // 0.6 second pause
        const scrollAmount = 250; // Scroll down 250px

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;

            let targetScroll = 0;

            if (elapsed < scrollDuration) {
                // Scrolling down
                const progress = elapsed / scrollDuration;
                const ease = 1 - Math.pow(1 - progress, 3);
                targetScroll = ease * scrollAmount;
                scrollContainer.scrollTop = targetScroll;
                animationFrameId = requestAnimationFrame(animate);
            } else if (elapsed < scrollDuration + pauseDuration) {
                // Paused at bottom
                targetScroll = scrollAmount;
                scrollContainer.scrollTop = targetScroll;
                animationFrameId = requestAnimationFrame(animate);
            } else if (elapsed < scrollDuration * 2 + pauseDuration) {
                // Scrolling up
                const progress = (elapsed - (scrollDuration + pauseDuration)) / scrollDuration;
                const ease = 1 - Math.pow(1 - progress, 3);
                targetScroll = scrollAmount - (ease * scrollAmount);
                scrollContainer.scrollTop = targetScroll;
                animationFrameId = requestAnimationFrame(animate);
            } else {
                // Animation finished
                scrollContainer.scrollTop = 0;
                hasAnimatedRef.current = true;
                if (onComplete) onComplete();
            }
        };

        const startTimeoutId = setTimeout(() => {
            animationFrameId = requestAnimationFrame(animate);
        }, 300);

        // Safety fallback
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
        <div ref={scrollRef} className="bg-[#f6f7f8] dark:bg-[#101922] font-['Lexend',sans-serif] text-slate-900 dark:text-white h-full overflow-y-auto pb-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {/* Top Navigation Bar */}
            <nav className="sticky top-0 z-50 flex items-center bg-[#f6f7f8]/80 dark:bg-[#101922]/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-slate-200 dark:border-slate-800">
                <div className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-start cursor-pointer">
                    <span className="material-symbols-outlined">arrow_back_ios</span>
                </div>
                <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center">Performance Stats</h2>
                <div className="flex w-12 items-center justify-end">
                    <button className="flex cursor-pointer items-center justify-center rounded-lg h-12 bg-transparent text-slate-900 dark:text-white p-0">
                        <span className="material-symbols-outlined">share</span>
                    </button>
                </div>
            </nav>

            <main className="max-w-md mx-auto">
                {/* Time Filter Segmented Buttons */}
                <div className="flex px-4 py-3 mt-2">
                    <div className="flex h-11 flex-1 items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-800 p-1">
                        <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-[#101922] has-[:checked]:shadow-sm text-slate-500 dark:text-slate-400 has-[:checked]:text-[#137fec] text-sm font-semibold transition-all">
                            <span className="truncate">This Term</span>
                            <input defaultChecked className="hidden" name="timeframe" type="radio" value="This Term" />
                        </label>
                        <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-[#101922] has-[:checked]:shadow-sm text-slate-500 dark:text-slate-400 has-[:checked]:text-[#137fec] text-sm font-semibold transition-all">
                            <span className="truncate">Last Term</span>
                            <input className="hidden" name="timeframe" type="radio" value="Last Term" />
                        </label>
                        <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 has-[:checked]:bg-white dark:has-[:checked]:bg-[#101922] has-[:checked]:shadow-sm text-slate-500 dark:text-slate-400 has-[:checked]:text-[#137fec] text-sm font-semibold transition-all">
                            <span className="truncate">Overall</span>
                            <input className="hidden" name="timeframe" type="radio" value="Overall" />
                        </label>
                    </div>
                </div>

                {/* Score Trend Chart Section */}
                <div className="px-4 py-4">
                    <div className="flex flex-col gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 shadow-sm">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Semester Score Trend</p>
                                <p className="text-slate-900 dark:text-white text-3xl font-bold leading-tight">88.4%</p>
                            </div>
                            <div className="flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded-full">
                                <span className="material-symbols-outlined text-green-500 text-sm">trending_up</span>
                                <p className="text-green-500 text-sm font-bold">+5.2%</p>
                            </div>
                        </div>
                        <div className="flex min-h-[180px] flex-1 flex-col gap-6 py-4">
                            <svg fill="none" height="140" preserveAspectRatio="none" viewBox="0 0 400 140" width="100%" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 100 Q 40 80, 80 90 T 160 50 T 240 70 T 320 30 T 400 20 V 140 H 0 Z" fill="url(#trendGradient)"></path>
                                <path d="M0 100 Q 40 80, 80 90 T 160 50 T 240 70 T 320 30 T 400 20" stroke="#137fec" strokeLinecap="round" strokeWidth="4"></path>
                                <defs>
                                    <linearGradient gradientUnits="userSpaceOnUse" id="trendGradient" x1="200" x2="200" y1="0" y2="140">
                                        <stop stopColor="#137fec" stopOpacity="0.3"></stop>
                                        <stop offset="1" stopColor="#137fec" stopOpacity="0"></stop>
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="flex justify-between px-2">
                                <p className="text-slate-400 text-xs font-bold uppercase">Jan</p>
                                <p className="text-slate-400 text-xs font-bold uppercase">Feb</p>
                                <p className="text-slate-400 text-xs font-bold uppercase">Mar</p>
                                <p className="text-slate-400 text-xs font-bold uppercase">Apr</p>
                                <p className="text-slate-400 text-xs font-bold uppercase">May</p>
                                <p className="text-slate-400 text-xs font-bold uppercase">Jun</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Highlight Card / Insight Banner */}
                <div className="px-4 pb-4">
                    <div className="bg-[#137fec] rounded-xl p-5 flex items-center justify-between shadow-lg shadow-[#137fec]/20">
                        <div className="flex flex-col gap-1">
                            <p className="text-white/80 text-xs font-semibold uppercase tracking-wider">Top Improvement</p>
                            <h3 className="text-white text-xl font-bold">Conceptual Clarity</h3>
                        </div>
                        <div className="flex flex-col items-end">
                            <p className="text-white text-2xl font-black">+15%</p>
                            <p className="text-white/80 text-xs font-medium">This Month</p>
                        </div>
                    </div>
                </div>

                {/* Skill Breakdown Section */}
                <div className="px-4">
                    <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight pb-4">Skill Breakdown</h2>
                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-6 flex flex-col items-center shadow-sm">
                        {/* Simple Radar Chart Visualization (SVG) */}
                        <div className="relative w-full aspect-square max-w-[280px]">
                            <svg className="w-full h-full" viewBox="0 0 200 200">
                                {/* Background Pentagons */}
                                <polygon className="text-slate-200 dark:text-slate-800" fill="none" points="100,20 176,75 147,165 53,165 24,75" stroke="currentColor" strokeWidth="1"></polygon>
                                <polygon className="text-slate-200 dark:text-slate-800" fill="none" points="100,50 145,83 128,137 72,137 55,83" stroke="currentColor" strokeWidth="1"></polygon>
                                <polygon className="text-slate-200 dark:text-slate-800" fill="none" points="100,80 115,91 109,109 91,109 85,91" stroke="currentColor" strokeWidth="1"></polygon>
                                {/* Axis Lines */}
                                <line className="text-slate-200 dark:text-slate-800" stroke="currentColor" strokeWidth="1" x1="100" x2="100" y1="100" y2="20"></line>
                                <line className="text-slate-200 dark:text-slate-800" stroke="currentColor" strokeWidth="1" x1="100" x2="176" y1="100" y2="75"></line>
                                <line className="text-slate-200 dark:text-slate-800" stroke="currentColor" strokeWidth="1" x1="100" x2="147" y1="100" y2="165"></line>
                                <line className="text-slate-200 dark:text-slate-800" stroke="currentColor" strokeWidth="1" x1="100" x2="53" y1="100" y2="165"></line>
                                <line className="text-slate-200 dark:text-slate-800" stroke="currentColor" strokeWidth="1" x1="100" x2="24" y1="100" y2="75"></line>
                                {/* Data Area */}
                                <polygon fill="#137fec" fillOpacity="0.3" points="100,30 155,75 140,140 70,150 45,75" stroke="#137fec" strokeWidth="2"></polygon>
                                {/* Data Points */}
                                <circle cx="100" cy="30" fill="#137fec" r="3"></circle>
                                <circle cx="155" cy="75" fill="#137fec" r="3"></circle>
                                <circle cx="140" cy="140" fill="#137fec" r="3"></circle>
                                <circle cx="70" cy="150" fill="#137fec" r="3"></circle>
                                <circle cx="45" cy="75" fill="#137fec" r="3"></circle>
                            </svg>
                            {/* Labels */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-[10px] font-bold text-slate-500 uppercase text-center w-24">Conceptual Clarity</div>
                            <div className="absolute top-1/4 -right-10 text-[10px] font-bold text-slate-500 uppercase text-center w-24">Handwriting</div>
                            <div className="absolute bottom-4 -right-2 text-[10px] font-bold text-slate-500 uppercase text-center w-24">Technical Terms</div>
                            <div className="absolute bottom-4 -left-2 text-[10px] font-bold text-slate-500 uppercase text-center w-24">Punctuality</div>
                            <div className="absolute top-1/4 -left-10 text-[10px] font-bold text-slate-500 uppercase text-center w-24">Critical Thinking</div>
                        </div>
                        {/* Competency Breakdown List */}
                        <div className="w-full mt-8 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="size-2 rounded-full bg-[#137fec]"></div>
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Conceptual Clarity</span>
                                </div>
                                <span className="text-sm font-bold text-slate-900 dark:text-white">92%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="size-2 rounded-full bg-[#137fec]/40"></div>
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Handwriting Legibility</span>
                                </div>
                                <span className="text-sm font-bold text-slate-900 dark:text-white">74%</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="size-2 rounded-full bg-[#137fec]/40"></div>
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Technical Terms</span>
                                </div>
                                <span className="text-sm font-bold text-slate-900 dark:text-white">81%</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommendations Card */}
                <div className="px-4 pt-6 pb-6">
                    <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight pb-4">Next Steps</h2>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <div className="size-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                                <span className="material-symbols-outlined">edit_note</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-slate-900 dark:text-white">Practice Cursive Writing</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Improve legibility for final exams</p>
                            </div>
                            <span className="material-symbols-outlined text-slate-400 text-sm">chevron_right</span>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <div className="size-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                                <span className="material-symbols-outlined">menu_book</span>
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-slate-900 dark:text-white">Glossary Flashcards</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Master 20 new technical terms</p>
                            </div>
                            <span className="material-symbols-outlined text-slate-400 text-sm">chevron_right</span>
                        </div>
                    </div>
                </div>
            </main>

            {/* Fixed Bottom Tab Bar */}
            <div className="sticky bottom-0 left-0 right-0 h-20 bg-white/80 dark:bg-[#101922]/80 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 flex justify-around items-start pt-3 px-6 z-50">
                <div className="flex flex-col items-center gap-1 text-slate-400 hover:text-[#137fec] cursor-pointer transition-colors">
                    <span className="material-symbols-outlined">home</span>
                    <span className="text-[10px] font-bold uppercase">Home</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-[#137fec] cursor-pointer">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>leaderboard</span>
                    <span className="text-[10px] font-bold uppercase">Stats</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-slate-400 hover:text-[#137fec] cursor-pointer transition-colors">
                    <span className="material-symbols-outlined">school</span>
                    <span className="text-[10px] font-bold uppercase">Courses</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-slate-400 hover:text-[#137fec] cursor-pointer transition-colors">
                    <span className="material-symbols-outlined">person</span>
                    <span className="text-[10px] font-bold uppercase">Profile</span>
                </div>
            </div>
        </div>
    );
}
