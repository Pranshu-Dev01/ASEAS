'use client';
import React, { useEffect, useRef } from 'react';

export function ClarificationChat({ isActive, onComplete }) {
    const scrollRef = useRef(null);
    const hasAnimatedRef = useRef(false);

    useEffect(() => {
        if (!isActive || !scrollRef.current || hasAnimatedRef.current) return;

        const scrollContainer = scrollRef.current;
        let animationFrameId;
        let startTime;
        let safetyTimeoutId;
        const scrollDuration = 2000; // 2 seconds scroll
        const pauseDuration = 800; // 0.8 second pause
        const scrollAmount = 300; // Scroll down

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
            }
        };

        const startTimeoutId = setTimeout(() => {
            animationFrameId = requestAnimationFrame(animate);
        }, 300);

        // Safety fallback
        safetyTimeoutId = setTimeout(() => {
            if (onComplete) onComplete();
        }, 10000);

        return () => {
            cancelAnimationFrame(animationFrameId);
            clearTimeout(startTimeoutId);
            clearTimeout(safetyTimeoutId);
        };
    }, [isActive, onComplete]);

    return (
        <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#f6f7f8] dark:bg-[#101922] text-slate-900 dark:text-white font-['Lexend',sans-serif]">
            {/* TopAppBar */}
            <header className="flex items-center bg-[#f6f7f8] dark:bg-[#101922] p-4 pb-2 justify-between z-10 border-b border-gray-200 dark:border-gray-800">
                <div className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center">
                    <span className="material-symbols-outlined text-2xl">arrow_back_ios</span>
                </div>
                <div className="flex flex-col items-center flex-1">
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">AI Clarification Chat</h2>
                    <p className="text-xs text-[#137fec] font-medium">Chemistry Midterm</p>
                </div>
                <div className="flex w-12 items-center justify-end">
                    <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-transparent text-slate-900 dark:text-white p-0">
                        <span className="material-symbols-outlined text-2xl">info</span>
                    </button>
                </div>
            </header>

            {/* Content Area */}
            <main ref={scrollRef} className="flex-1 overflow-y-auto pb-24 no-scrollbar">
                {/* Context ListItem (Sticky Info) */}
                <div className="sticky top-0 z-20 bg-[#f6f7f8]/90 dark:bg-[#101922]/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-4 px-4 min-h-[72px] py-2 justify-between">
                        <div className="flex items-center gap-4">
                            <div className="text-white flex items-center justify-center rounded-lg bg-[#137fec] shrink-0 size-12">
                                <span className="material-symbols-outlined">description</span>
                            </div>
                            <div className="flex flex-col justify-center">
                                <p className="text-slate-900 dark:text-white text-base font-medium leading-normal line-clamp-1">Question 4: Catalyst Explanation</p>
                                <p className="text-slate-500 dark:text-[#92adc9] text-sm font-normal leading-normal line-clamp-2">Topic: Chemical Kinetics | Score: 3/5</p>
                            </div>
                        </div>
                        <div className="shrink-0">
                            <div className="flex size-7 items-center justify-center">
                                <div className="size-3 rounded-full bg-[#0bda5b]"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chat History */}
                <div className="flex flex-col gap-2 py-4">
                    {/* Timestamp */}
                    <div className="text-center py-2">
                        <span className="text-xs text-slate-400 font-medium">Today, 10:45 AM</span>
                    </div>

                    {/* Student Message */}
                    <div className="flex items-end gap-3 p-4 justify-end">
                        <div className="flex flex-1 flex-col gap-1 items-end">
                            <p className="text-slate-500 dark:text-[#92adc9] text-[11px] font-semibold leading-normal uppercase tracking-wider">Student</p>
                            <div className="text-base font-normal leading-normal flex max-w-[85%] rounded-2xl rounded-tr-none px-4 py-3 bg-[#137fec] text-white shadow-sm">
                                Why did I lose 2 marks on the Catalyst explanation?
                            </div>
                        </div>
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-8 shrink-0 border border-[#137fec]/20"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBIzJXUdQZj3NQYtQSspq1CXmYZpu5ruetLtmCZkdfKxq4A6TT_R5Q11wq3CIeKAi8k5-uurrPYqbhxG0Jz1MnkoLlK1w_dkF5yl8yh1nxXEYgRNACVPPGW4qUqW7wdKiQ7zpyKHkY836MReixIJwj6CPuz8xzflUf74aKhgJMYUIVi1p6RKMPMNXlLGIkH6MLBKrlx52HU5OP8e30-S0YAU1uxc29bI0M9Wc9uwQXgX71Hf4-yanbzEPN3y-V3h5u4n0SbFO4wrDM")' }}
                        ></div>
                    </div>

                    {/* AI Response */}
                    <div className="flex items-start gap-3 p-4">
                        <div className="bg-[#137fec]/10 flex items-center justify-center rounded-full w-8 h-8 shrink-0 border border-[#137fec]/30">
                            <span className="material-symbols-outlined text-[#137fec] text-sm">smart_toy</span>
                        </div>
                        <div className="flex flex-1 flex-col gap-2 items-start">
                            <p className="text-slate-500 dark:text-[#92adc9] text-[11px] font-semibold leading-normal uppercase tracking-wider">AI Tutor</p>
                            <div className="text-base font-normal leading-normal flex flex-col gap-3 max-w-[90%] rounded-2xl rounded-tl-none px-4 py-3 bg-slate-200 dark:bg-[#233648] text-slate-900 dark:text-white shadow-sm">
                                <p>
                                    Your analogy of the <span className="font-bold text-[#137fec] italic">'tunnel'</span> was great, but you missed mentioning that the catalyst itself remains <span className="font-bold border-b-2 border-[#137fec]/50">chemically unchanged</span> at the end of the reaction.
                                </p>
                                {/* Reference Link Component */}
                                <div className="flex w-full items-center gap-3 rounded-lg bg-white/10 dark:bg-black/20 p-3 border border-white/10">
                                    <div className="flex-1 overflow-hidden">
                                        <p className="text-slate-900 dark:text-white text-xs font-bold uppercase tracking-tighter opacity-70">Context Reference</p>
                                        <p className="text-slate-900 dark:text-white text-sm font-medium leading-tight line-clamp-1">View My Answer Script</p>
                                    </div>
                                    <div
                                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-10 border border-white/20"
                                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBF5o7c7FBAWsli-gcCfBIVhoarfpdyJSYUEXK1cNHtFHcmR2FTDTQie2_5G1EVvxEImPRjtnB9gukoK-dSI8YEG0-UkLe5LoIa0-Zi4SSlvAfluwmmKzJhQupIIpIZ3iWEbm9gjt9_Cx_3YQjLaKP4SuoGI3oPUlHUa6uLrxigoNxlgJ663MJDBXkMD0J5rNtMLiafE_oobOCt5z--8IM6mORZTXR0IKfR0E8_YWZiFN2g9hPetv5pgW_anEVrHSphhwzxP2KO0OE")' }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Follow-up Suggestion Chips */}
                    <div className="flex gap-2 px-14 py-2 overflow-x-auto no-scrollbar">
                        <button className="whitespace-nowrap rounded-full border border-[#137fec] text-[#137fec] px-3 py-1 text-xs font-medium bg-[#137fec]/5">What is the tunnel analogy?</button>
                        <button className="whitespace-nowrap rounded-full border border-[#137fec] text-[#137fec] px-3 py-1 text-xs font-medium bg-[#137fec]/5">Show full marks example</button>
                    </div>

                    {/* Extra space for scrolling demo */}
                    <div className="h-40"></div>
                </div>
            </main>

            {/* Composer */}
            <div className="absolute bottom-0 left-0 w-full bg-[#f6f7f8] dark:bg-[#101922] border-t border-gray-200 dark:border-gray-800 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] pb-6">
                <div className="flex items-center px-4 py-3 gap-3">
                    <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shrink-0"
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAOQ7SdjcL_YHOmQmhMwcuHlwF1AM-bV30jdV6PM1n_eCyvPWcrYjGTqQmyEGHK5JZoF3b0ZzEtn8xa42eVDXFt7AsUiYDuq1_NJBG5cWhTHhsaviVLx5WeO9juQA2Y2A00RG0yi5M8ga_tfKpN8U0WVZAHYL9NgHV69-h-AMk6ExgkvAoSU5VavAtQxhgzQrRVj2HCSpu1Hkxr4U5Hv_Sn6TvXTgPDXUu7tCVjuJzyqi4Tjz--6N_AyPFv0fOCQdO9vMyQZPiixa4")' }}
                    ></div>
                    <div className="flex flex-col min-w-0 flex-1">
                        <div className="flex w-full items-stretch rounded-xl shadow-sm bg-slate-200 dark:bg-[#233648]">
                            <input
                                className="flex w-full min-w-0 flex-1 rounded-l-xl text-slate-900 dark:text-white outline-none border-none bg-transparent px-4 py-3 placeholder:text-slate-500 dark:placeholder:text-[#92adc9] text-base font-normal leading-normal"
                                placeholder="Ask a follow-up..."
                                readOnly
                            />
                            <div className="flex items-center gap-1 justify-end pr-3">
                                <button className="p-1.5 text-slate-500 dark:text-[#92adc9] hover:text-[#137fec] transition-colors">
                                    <span className="material-symbols-outlined">add_circle</span>
                                </button>
                                <button className="min-w-[40px] flex items-center justify-center rounded-lg h-8 w-8 bg-[#137fec] text-white">
                                    <span className="material-symbols-outlined text-sm">send</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
