'use client';
import React, { useEffect, useRef } from 'react';

export function StudentHomeDashboard({ isActive, onComplete }) {
    const scrollRef = useRef(null);
    // Keep track if we've already run the animation to prevent re-running if prop changes strangely
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

            // Sequence: Scroll Down -> Pause -> Scroll Up -> End
            let targetScroll = 0;

            if (elapsed < scrollDuration) {
                // Scrolling down
                const progress = elapsed / scrollDuration;
                const ease = 1 - Math.pow(1 - progress, 3);
                targetScroll = ease * scrollAmount;
                scrollContainer.scrollTo({ top: targetScroll });
                animationFrameId = requestAnimationFrame(animate);
            } else if (elapsed < scrollDuration + pauseDuration) {
                // Paused at bottom
                targetScroll = scrollAmount;
                scrollContainer.scrollTo({ top: targetScroll });
                animationFrameId = requestAnimationFrame(animate);
            } else if (elapsed < scrollDuration * 2 + pauseDuration) {
                // Scrolling up
                const progress = (elapsed - (scrollDuration + pauseDuration)) / scrollDuration;
                const ease = 1 - Math.pow(1 - progress, 3);
                targetScroll = scrollAmount - (ease * scrollAmount);
                scrollContainer.scrollTo({ top: targetScroll });
                animationFrameId = requestAnimationFrame(animate);
            } else {
                // Animation finished
                scrollContainer.scrollTo({ top: 0 });
                hasAnimatedRef.current = true;
                // Rely on safety timeout
            }
        };

        // Start animation after a short delay
        const startTimeoutId = setTimeout(() => {
            animationFrameId = requestAnimationFrame(animate);
        }, 300);

        // Safety fallback
        safetyTimeoutId = setTimeout(() => {
            if (onComplete) onComplete();
        }, 5000);

        return () => {
            cancelAnimationFrame(animationFrameId);
            clearTimeout(startTimeoutId);
            clearTimeout(safetyTimeoutId);
        };
    }, [isActive, onComplete]);

    return (
        <div className="relative h-full bg-[#f6f7f8] text-slate-900 font-['Lexend',sans-serif] overflow-hidden">
            {/* Scrollable Content Area */}
            <div
                ref={scrollRef}
                className="h-full overflow-y-auto pb-28 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
                {/* Sticky Header */}
                <div className="sticky top-0 z-40 bg-[#f6f7f8]/80 backdrop-blur-md px-4 py-3 border-b border-slate-200">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="size-10 rounded-full border-2 border-[#00f2ff] overflow-hidden p-0.5">
                                <div
                                    className="w-full h-full rounded-full bg-cover bg-center"
                                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBUBQsU-BvsOBI96Tx0l2hbPUDu1XIsKgXFVXt2SKtArTxllq-c-u-qq-1U0TSVXqcS1SRoswKypGw1IoHo9YhnG8l8tEoPWZml-pd_UgoWvp1R-jRft7Vhjq0wseSAjtiA1G3ehhuxnW_jcIX4d9zJCeWiplHVyvT9Ry10k9vkGDZIuqhlz-JFUXu7A9eCBimfYO1Xu2FPRxpzC8m1FPs9Okrxnx0EixP-U5umrPnoBPE9cegv80RyK0IeKJvNraCvwmPRstGmekg')" }}
                                />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold leading-tight tracking-tight text-slate-900">Hello, Aryan!</h2>
                                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Class of 2025</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                                <span className="material-symbols-outlined text-slate-600">notifications</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Greeting */}
                <div className="px-4 pt-6 pb-2">
                    <p className="text-[#3b82f6] text-sm font-semibold tracking-wide uppercase">Good morning!</p>
                    <p className="text-slate-600 text-base font-normal mt-1">You're <span className="text-[#fbbf24] font-bold">5% away</span> from your semester goal. Keep pushing!</p>
                </div>

                {/* Main Card */}
                <div className="px-4 py-4">
                    <div className="relative overflow-hidden rounded-2xl p-6 shadow-xl shadow-blue-500/20" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 50%, #00f2ff 100%)' }}>
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <p className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Highlighted Subject</p>
                                    <h3 className="text-white text-3xl font-extrabold tracking-tight">Chemistry</h3>
                                </div>
                                <div className="bg-black/20 backdrop-blur-md rounded-xl px-4 py-2 text-white border border-white/20">
                                    <span className="text-2xl font-black">A-</span>
                                </div>
                            </div>
                            <div className="space-y-5">
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center">
                                        <p className="text-white/90 text-sm font-medium">Progress over last 3 tests</p>
                                        <span className="text-white text-sm font-bold bg-white/20 px-2 py-0.5 rounded-full">+15%</span>
                                    </div>
                                    <div className="h-2.5 w-full bg-black/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-white rounded-full" style={{ width: '75%' }}></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <div className="flex flex-col">
                                        <p className="text-white/70 text-[10px] font-bold uppercase tracking-wider">Total Score</p>
                                        <p className="text-white text-2xl font-black">85<span className="text-white/60 text-lg font-normal">/100</span></p>
                                    </div>
                                    <button className="bg-white text-[#3b82f6] px-6 py-2.5 rounded-xl text-sm font-bold shadow-xl active:scale-95 transition-transform">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommended Path */}
                <div className="px-4 py-2">
                    <h2 className="text-slate-900 text-lg font-bold mb-3 flex items-center gap-2">
                        Recommended Path <span className="bg-[#fbbf24]/20 text-[#fbbf24] text-[10px] px-2 py-0.5 rounded-full uppercase">AI Pick</span>
                    </h2>
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-start gap-4 shadow-sm">
                        <div className="bg-[#fbbf24]/10 p-2.5 rounded-xl border border-[#fbbf24]/20">
                            <span className="material-symbols-outlined text-[#fbbf24]" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-slate-900 text-sm font-bold mb-1">Smart Improvement Suggestion</p>
                            <p className="text-slate-500 text-xs leading-relaxed mb-4">We noticed you struggled with <b className="text-slate-700">Organic Chemistry</b> in your last quiz. Let's master it together.</p>
                            <button className="bg-slate-50 hover:bg-slate-100 text-[#d97706] border border-[#fbbf24]/30 px-4 py-2 rounded-xl text-xs font-bold transition-all w-full text-center">
                                Start Review Session
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recent Evaluations */}
                <div className="px-4 py-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-slate-900 text-lg font-bold">Recent Evaluations</h2>
                        <button className="text-[#3b82f6] text-xs font-bold px-2 py-1">See All</button>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
                            <div className="flex items-center gap-3">
                                <div className="size-11 bg-[#3b82f6]/10 rounded-xl flex items-center justify-center border border-[#3b82f6]/20">
                                    <span className="material-symbols-outlined text-[#3b82f6]">calculate</span>
                                </div>
                                <div>
                                    <p className="text-slate-900 text-sm font-bold">Mathematics Quiz</p>
                                    <p className="text-slate-500 text-[11px] mt-0.5">Oct 12 • Algebra Foundations</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[#3b82f6] font-black text-lg">B+</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
                            <div className="flex items-center gap-3">
                                <div className="size-11 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20">
                                    <span className="material-symbols-outlined text-emerald-500">science</span>
                                </div>
                                <div>
                                    <p className="text-slate-900 text-sm font-bold">Physics Lab</p>
                                    <p className="text-slate-500 text-[11px] mt-0.5">Oct 10 • Kinetic Energy</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-emerald-500 font-black text-lg">A</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
                            <div className="flex items-center gap-3">
                                <div className="size-11 bg-[#fbbf24]/10 rounded-xl flex items-center justify-center border border-[#fbbf24]/20">
                                    <span className="material-symbols-outlined text-[#fbbf24]">history_edu</span>
                                </div>
                                <div>
                                    <p className="text-slate-900 text-sm font-bold">History Essay</p>
                                    <p className="text-slate-500 text-[11px] mt-0.5">Oct 08 • Modern Era</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[#fbbf24] font-black text-lg">A-</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Insights */}
                <div className="px-4 pb-6">
                    <h2 className="text-slate-900 text-lg font-bold mb-4">Insights</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="bg-[#3b82f6]/10 w-fit p-2 rounded-lg mb-3">
                                <span className="material-symbols-outlined text-[#3b82f6] text-xl">school</span>
                            </div>
                            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Overall GPA</p>
                            <p className="text-slate-900 text-2xl font-black mt-1">3.82</p>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                            <div className="bg-rose-500/10 w-fit p-2 rounded-lg mb-3">
                                <span className="material-symbols-outlined text-rose-500 text-xl">event_available</span>
                            </div>
                            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Attendance</p>
                            <p className="text-slate-900 text-2xl font-black mt-1">96%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Nav */}
            <div className="absolute bottom-0 left-0 right-0 bg-[#f6f7f8]/90 backdrop-blur-2xl border-t border-slate-200 px-6 pt-3 pb-8 flex justify-between items-center z-50">
                <button className="flex flex-col items-center gap-1.5 text-[#3b82f6]">
                    <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Home</span>
                </button>
                <button className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-slate-400 transition-colors">
                    <span className="material-symbols-outlined text-[28px]">assignment</span>
                    <span className="text-[10px] font-medium uppercase tracking-tighter">Grades</span>
                </button>
                <button className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-slate-400 transition-colors">
                    <span className="material-symbols-outlined text-[28px]">auto_stories</span>
                    <span className="text-[10px] font-medium uppercase tracking-tighter">Study</span>
                </button>
                <button className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-slate-400 transition-colors">
                    <span className="material-symbols-outlined text-[28px]">account_circle</span>
                    <span className="text-[10px] font-medium uppercase tracking-tighter">Profile</span>
                </button>
            </div>
        </div>
    );
}
