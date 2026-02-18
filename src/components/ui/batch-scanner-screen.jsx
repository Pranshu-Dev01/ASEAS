'use client';
import React, { useEffect, useRef } from 'react';

export function BatchScannerScreen({ isActive, onComplete }) {
    const galleryRef = useRef(null);

    useEffect(() => {
        if (!isActive || !galleryRef.current) return;

        const container = galleryRef.current;
        let animationFrameId;
        let startTime;
        let safetyTimeoutId;
        const scrollDuration = 1000; // 1 second scroll (Faster)
        const scrollAmount = 150; // Scroll right

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;

            if (elapsed < scrollDuration) {
                // Ease out cubic
                const progress = elapsed / scrollDuration;
                const ease = 1 - Math.pow(1 - progress, 3);
                container.scrollLeft = ease * scrollAmount;
                animationFrameId = requestAnimationFrame(animate);
            } else {
                // Animation done
                container.scrollLeft = scrollAmount;
                // Rely on safety timeout or just ensure onComplete is called if not already handled by cleanup
            }
        };

        // Start animation after a short delay
        const startTimeoutId = setTimeout(() => {
            animationFrameId = requestAnimationFrame(animate);
        }, 300); // Faster start

        // Safety fallback
        safetyTimeoutId = setTimeout(() => {
            if (onComplete) onComplete();
        }, 2000);

        return () => {
            cancelAnimationFrame(animationFrameId);
            clearTimeout(startTimeoutId);
            clearTimeout(safetyTimeoutId);
        };
    }, [isActive, onComplete]);

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101922] text-white overflow-hidden h-full flex flex-col font-['Lexend',sans-serif]">
            {/* Styles for this component specifically */}
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,0..1&display=swap');
      `}</style>

            {/* Top Navigation Bar */}
            <div className="flex items-center bg-[#101922]/80 backdrop-blur-md p-4 pb-2 justify-between z-50">
                <div className="text-white flex size-12 shrink-0 items-center cursor-pointer">
                    <span className="material-symbols-outlined">arrow_back_ios</span>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Batch Script Scanner</h2>
                    <span className="text-[10px] text-[#137fec] font-medium tracking-widest uppercase">ASEAS System</span>
                </div>
                <div className="flex w-12 items-center justify-end">
                    <button className="flex size-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-white">flashlight_on</span>
                    </button>
                </div>
            </div>

            {/* Main Viewfinder Area */}
            <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center">
                {/* Mock Camera Feed Background */}
                <div
                    className="absolute inset-0 bg-center bg-cover"
                    style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDxIuubr4hxnFs2RWi-pabIMsdkv5fqZr5OwjUpFoAs53kWxG19g2pnxvnOK82UHTFpuG7MfxOjrJZtUsAnkz2VFJ2AoZRy1rb9GkM0ahzvPmNwiVpWzAw0BL9-_ehF8feM6p1MQzIYXYX2q9ot4osOlzZBGlRpKYug0KbLIQ1jrrWbUe4t37jzwLYj8SGZRMtzJYG6k7Tm7Xq5UfCrbjHBmK49V4dTKxMC-oLVCxlh6_LHIl4h_cyXdqUYJLbJnUmU3F-a271EPZc')" }}
                />

                {/* Viewfinder Overlay / Guide */}
                <div className="absolute inset-0 flex flex-col">
                    <div className="bg-black/40 backdrop-blur-[2px] flex-1 w-full"></div>
                    <div className="flex h-[70%] w-full">
                        <div className="bg-black/40 backdrop-blur-[2px] w-8"></div>
                        {/* Alignment Rect */}
                        <div className="flex-1 border-2 border-[#137fec] rounded-xl relative shadow-[0_0_15px_rgba(19,127,236,0.5)]">
                            {/* Corner Markers */}
                            <div className="absolute -top-1 -left-1 size-6 border-t-4 border-l-4 border-[#137fec] rounded-tl-lg"></div>
                            <div className="absolute -top-1 -right-1 size-6 border-t-4 border-r-4 border-[#137fec] rounded-tr-lg"></div>
                            <div className="absolute -bottom-1 -left-1 size-6 border-b-4 border-l-4 border-[#137fec] rounded-bl-lg"></div>
                            <div className="absolute -bottom-1 -right-1 size-6 border-b-4 border-r-4 border-[#137fec] rounded-br-lg"></div>

                            {/* Instruction Overlay */}
                            <div className="absolute inset-x-0 -bottom-12 flex justify-center">
                                <p className="bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-medium text-white/90 border border-white/10 whitespace-nowrap">
                                    Align handwritten script within the frame
                                </p>
                            </div>
                        </div>
                        <div className="bg-black/40 backdrop-blur-[2px] w-8"></div>
                    </div>
                    <div className="bg-black/40 backdrop-blur-[2px] flex-1 w-full"></div>
                </div>
            </div>

            {/* Bottom Control Panel */}
            <div className="bg-[#101922]/95 border-t border-white/5 pt-4 pb-8 px-4 flex flex-col gap-6 z-50">
                {/* Mode Selector */}
                <div className="flex justify-center">
                    <div className="flex h-10 w-full max-w-xs items-center justify-center rounded-lg bg-white/5 p-1 border border-white/5">
                        <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-white/50 text-sm font-medium transition-all hover:bg-white/5">
                            <span className="truncate">Single</span>
                            <input className="hidden" name="scan-mode" type="radio" value="Single" />
                        </label>
                        <label className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 bg-[#137fec] text-white text-sm font-medium transition-all">
                            <span className="truncate">Batch Mode</span>
                            <input defaultChecked className="hidden" name="scan-mode" type="radio" value="Batch" />
                        </label>
                    </div>
                </div>

                {/* Camera Controls */}
                <div className="flex items-center justify-between px-6">
                    <button className="flex shrink-0 flex-col items-center justify-center gap-1 group">
                        <div className="flex items-center justify-center rounded-full size-12 bg-white/10 text-white group-hover:bg-white/20 transition-colors">
                            <span className="material-symbols-outlined">grid_on</span>
                        </div>
                        <span className="text-[10px] text-white/40 uppercase font-bold tracking-tighter">Grid</span>
                    </button>

                    {/* Shutter Button */}
                    <button className="relative flex shrink-0 items-center justify-center rounded-full size-20 border-4 border-white p-1 active:scale-95 transition-transform">
                        <div className="size-full bg-[#137fec] rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-4xl">camera</span>
                        </div>
                    </button>

                    <button className="flex shrink-0 flex-col items-center justify-center gap-1 group">
                        <div className="flex items-center justify-center rounded-full size-12 bg-[#137fec]/20 text-[#137fec] border border-[#137fec]/30 group-hover:bg-[#137fec]/30 transition-colors">
                            <span className="material-symbols-outlined">check_circle</span>
                        </div>
                        <span className="text-[10px] text-[#137fec] uppercase font-bold tracking-tighter">Finish</span>
                    </button>
                </div>

                {/* Gallery Strip & Counter */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-white/60">Recently Scanned</h3>
                        <div className="flex items-center gap-1.5 bg-[#137fec]/20 border border-[#137fec]/30 px-3 py-1 rounded-full">
                            <span className="size-2 bg-[#137fec] rounded-full animate-pulse"></span>
                            <span className="text-[#137fec] text-xs font-bold">Total Scanned: 42</span>
                        </div>
                    </div>
                    <div ref={galleryRef} className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                        {[
                            { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpRwvPzcPMrSnJzh_QOQPuUAiB0VrofjQigP0pgu-PDr2F__7PrYlyef4UVNYfbJ0YkVGJpMw8_bLhQ9P7t2p338qpzSQ6e_URXSa-TX1EIZpqEjqr4cDX7PI40A2mCtsIJx_Z4kXGttW2fsYH37yhwyh9BWpMSbayEEoZL4t1nxPtsSfMpUZB-rZCcPOHROg7aFKA-bSbnlDFfrZ-4aXvZElFuXeKH-FbKTzUR1lPrp-gnLo4veBHl4zpf8J_CX-fvqtEzPghVhQ", num: 42, active: true },
                            { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiLi8K9uhzZmTOJi-huWBiHQIN9M7bgkguOjVmyhvoIk6gSmgK87HNC8WH-NAviaH8BIkG0p83Gy7yZiuvNTN665S_8tggig1h9zmrK0GidENyLmE09Aze-Fxdig4bTmUXjTcfv-NP_HOSXoq8I837M4Tv0Cw4byJSaEp2SSgiEK2FMZAr1KpKCNM2KeSMTZ497IpeKElw1VMgpXM_LkFaUJu5J3vOQ8jThvWP1atk7AH-3W3rdRWv6ZJPyKVuaz0UY43D0DeDuE4", num: 41, active: false },
                            { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2VZ2qCzjARtM78NLWb17W3AQLoMV9lwSh4xGGtCT9iN87eH1L_Ou3Yd17SVXgup-tdjKU8qoTsGirCswpbfXCgpfwgF05Z4qjxbP9MB1BATk-6IZPtXyWwcanvmzRWDFIui_7LSQNXw1kId8g-3xt2ys5CjWEXimfNtcT_hT2AXD_22v6Akyq4pvUi1KxS69s95l0yLURmOJJ5a6Kt6XIf4c2AZS_YhnK4chaZOUv6soK5GT94vZUe2ORcIpvSWpOEVT_cq6BYFQ", num: 40, active: false },
                            { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-WWKWecyL1bPgcH-RhgcV9JRnCyEcg0RowtEYydJvsJVF-JAjB8F0T5gpSvuYj7aSTz8e_2pj3HDlmKE-ic7iN9xcaHtwieglQ1bk3mYKwnk1yfMStoNWVEzvexc8l17zJD5cdBxQKwKqGJRq0_IOkDiV9f28BX2DF5SZ8ipQwVCkCjjVoaiMdyGKIeG0BmRiXS3nloPN5718TGlgXiNcKK4dzg5WiiG7Zsk-3j9kLqJdSZ2vQwj07t4jS_zLnxG4jx-Cham6KnU", num: 39, active: false },
                            { url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhyz9Ydl9Z7JfY-pcIfpy5kBjsxUQ6A24E1ZccLOClZIYaZFoFgB91BHqrmt9QKQRoJY3JLCRel47d7uIEGNwCNToQxtU0T3FwW6w6sTpVNpx7fCNXAW1Cy-pQKncMrGuGCx6n6q7BKgRsDf7DgBUATLkHyXJM3jzuGczhb88Fgqr5ETWsur13MkYz-bKONF54tXvmzCn7Q0AcI3kPqkLlKdmcrjU13aHvYyZoGb7V4zdpTtgICXudApSv4CgZaWO6wgZt3UTpSic", num: 38, active: false },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-none flex-col gap-1">
                                <div
                                    className={`w-16 h-20 bg-center bg-no-repeat bg-cover rounded-md border relative ${item.active ? 'border-white/20' : 'border-white/10 grayscale-[0.5]'}`}
                                    style={{ backgroundImage: `url('${item.url}')` }}
                                >
                                    <div className="absolute bottom-1 right-1 bg-black/60 rounded px-1 text-[8px] font-bold">{item.num}</div>
                                </div>
                            </div>
                        ))}

                        <div className="flex flex-none items-center justify-center w-16 h-20 rounded-md border border-dashed border-white/20 bg-white/5">
                            <span className="material-symbols-outlined text-white/20">more_horiz</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
