'use client';
import React, { useEffect, useRef } from 'react';

export function EvaluationDetailScreen({ isActive, onComplete }) {
    const scrollRef = useRef(null);
    const hasAnimatedRef = useRef(false);

    useEffect(() => {
        if (!isActive || !scrollRef.current || hasAnimatedRef.current) return;

        const scrollContainer = scrollRef.current;
        let animationFrameId;
        let startTime;
        let safetyTimeoutId;
        const scrollDuration = 2500; // 2.5 seconds scroll down
        const pauseDuration = 800; // 0.8 second pause
        const scrollAmount = 700; // Scroll down further to show entire screen content

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
        <div className="bg-[#f6f7f8] dark:bg-[#101922] text-slate-900 dark:text-white h-full flex flex-col font-['Lexend',sans-serif] overflow-hidden">
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
                
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #233648;
                    border-radius: 10px;
                }
            `}</style>

            {/* Sticky Header */}
            <div className="sticky top-0 z-50 flex items-center bg-[#f6f7f8] dark:bg-[#101922] p-4 pb-2 justify-between border-b border-gray-200 dark:border-gray-800">
                <div className="text-[#137fec] flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-[#137fec]/10 cursor-pointer">
                    <span className="material-symbols-outlined text-[20px]">arrow_back_ios_new</span>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-slate-900 dark:text-white text-base font-bold leading-tight tracking-tight text-center">Script 12 of 38</h2>
                    <p className="text-gray-500 dark:text-[#92adc9] text-xs font-medium">Chemistry: Reaction Kinetics</p>
                </div>
                <div className="flex w-10 items-center justify-end">
                    <p className="text-[#137fec] text-xs font-bold leading-normal tracking-wider shrink-0">STU-882</p>
                </div>
            </div>

            <main ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar custom-scrollbar pb-32">
                <div className="w-full bg-slate-200 dark:bg-[#0a1016] relative flex flex-col">
                    <div className="relative w-full bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden bg-slate-300 dark:bg-[#111a22] min-h-[300px] shadow-inner"
                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDwQ6aelaxjgrRCO6Dsk97ZXB73jipuIKHq1Ry-qg6tLoe6dCl3SWcDC7qej7nwt9H2ApHvcE_YB5s4oGuz_eUMadNd-QVux0biX4YIUmIVY7eS2O_8Ro7TenJ1m48gzl1V_59dUvx30JitijmIHqz39qcPTb17ysn4T5nTawSRyMFpjhUA96coiQSwoiR6SfOqyC-DsoOZ9f65N93gIAE2Z5gm1BFrkUQ2hESPOQTIpuz5cjBPIjUWbsARlrSP3esF0lkz830PZ04')" }}
                    >
                        <div className="absolute inset-0 bg-white/40 dark:bg-slate-900/40 backdrop-blur-[2px] flex flex-col p-6">
                            <div className="p-6 rounded-lg shadow-sm text-slate-800 text-xl leading-relaxed max-w-sm rotate-[-0.5deg] font-['Caveat',cursive] bg-white/90">
                                <p className="mb-4">So, for reaction kinetics, I think of the <span className="underline decoration-blue-500">activation energy</span> like a big hill the molecules have to climb over.</p>
                                <p>If we add a <span className="text-[#137fec]">catalyst</span>, it's basically finding a tunnel through that hill so they don't have to work as hard to react...</p>
                            </div>
                        </div>
                        <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                            <button className="bg-white/80 dark:bg-[#101922]/80 backdrop-blur p-2 rounded-lg shadow-lg">
                                <span className="material-symbols-outlined text-[#137fec]">zoom_in</span>
                            </button>
                            <button className="bg-white/80 dark:bg-[#101922]/80 backdrop-blur p-2 rounded-lg shadow-lg">
                                <span className="material-symbols-outlined text-[#137fec]">zoom_out</span>
                            </button>
                        </div>
                        <div className="relative z-20 m-4 self-start bg-[#137fec] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">
                            Student Handwritten Script
                        </div>
                    </div>
                </div>

                <div className="min-h-[600px] bg-[#f6f7f8] dark:bg-[#101922] flex flex-col rounded-t-3xl -mt-6 relative z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_-10px_30px_rgba(0,0,0,0.5)] border-t border-gray-200 dark:border-gray-800 px-4">
                    <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mt-3 mb-1"></div>

                    <div className="flex flex-wrap gap-4 py-4">
                        <div className="flex min-w-[120px] flex-1 flex-col gap-1 rounded-xl p-5 bg-white dark:bg-[#233648] border border-gray-100 dark:border-transparent shadow-sm">
                            <div className="flex items-center justify-between">
                                <p className="text-gray-500 dark:text-gray-400 text-[10px] font-medium uppercase tracking-wider">Suggested Grade</p>
                                <span className="material-symbols-outlined text-[#137fec] text-sm">auto_awesome</span>
                            </div>
                            <p className="text-slate-900 dark:text-white tracking-tight text-2xl font-bold leading-tight">18.5<span className="text-xs text-gray-400 font-normal">/20</span></p>
                        </div>
                        <div className="flex min-w-[120px] flex-1 flex-col gap-1 rounded-xl p-5 bg-white dark:bg-[#233648] border border-gray-100 dark:border-transparent shadow-sm">
                            <p className="text-gray-500 dark:text-gray-400 text-[10px] font-medium uppercase tracking-wider">Logic Match</p>
                            <div className="flex items-end gap-1">
                                <p className="text-[#137fec] tracking-tight text-2xl font-bold leading-tight">High</p>
                                <span className="material-symbols-outlined text-[#137fec] pb-1">psychology</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex items-center gap-2 px-1 pb-2">
                            <span className="material-symbols-outlined text-[#137fec] size-5 text-[20px]">description</span>
                            <h3 className="text-slate-900 dark:text-white text-base font-bold leading-tight">AI Transcription</h3>
                        </div>
                        <div className="bg-white dark:bg-[#1a2632] p-4 rounded-xl border border-gray-100 dark:border-gray-800 text-left">
                            <p className="text-slate-700 dark:text-gray-200 text-xs font-normal leading-relaxed italic border-l-4 border-[#137fec]/40 pl-4">
                                "So, for reaction kinetics, I think of the <span className="bg-[#137fec]/10 text-[#137fec] px-1 rounded">activation energy</span> like a big hill the molecules have to climb over. If we add a <span className="bg-[#137fec]/10 text-[#137fec] px-1 rounded">catalyst</span>, it's basically finding a tunnel through that hill..."
                            </p>
                        </div>
                    </div>

                    <div className="mb-6 text-left">
                        <h3 className="text-gray-500 dark:text-gray-400 text-[10px] font-medium uppercase tracking-wider mb-3 px-1">Keywords Identified</h3>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-[#137fec]/10 text-[#137fec] text-[10px] font-semibold rounded-full border border-[#137fec]/20">Activation Energy</span>
                            <span className="px-3 py-1 bg-[#137fec]/10 text-[#137fec] text-[10px] font-semibold rounded-full border border-[#137fec]/20">Catalyst</span>
                        </div>
                    </div>

                    <div className="mb-6 text-left">
                        <div className="flex items-center gap-2 px-1 pb-2">
                            <span className="material-symbols-outlined text-[#137fec] size-5 text-[20px]">fact_check</span>
                            <h3 className="text-slate-900 dark:text-white text-base font-bold leading-tight">Thematic Evaluation</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/10 rounded-lg border border-green-100 dark:border-green-900/20">
                                <span className="material-symbols-outlined text-green-500 mt-0.5 text-lg">verified</span>
                                <div>
                                    <p className="text-sm font-bold dark:text-green-400">Conceptual Accuracy (+9.5)</p>
                                    <p className="text-xs text-slate-600 dark:text-gray-400">Student uses unique 'tunnel' analogy which correctly identifies the lowering of activation energy.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-white/80 dark:bg-[#101922]/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 p-4 pb-8 z-50">
                <div className="flex gap-3 w-full">
                    <button className="flex-1 flex items-center justify-center gap-2 bg-slate-200 dark:bg-[#233648] text-slate-900 dark:text-white py-3 rounded-xl font-bold text-xs">
                        <span className="material-symbols-outlined text-[18px]">edit_note</span>
                        Review
                    </button>
                    <button className="flex-[1.5] flex items-center justify-center gap-2 bg-[#137fec] text-white py-3 rounded-xl font-bold text-xs shadow-lg shadow-[#137fec]/20">
                        <span className="material-symbols-outlined text-[18px]">check_circle</span>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}
