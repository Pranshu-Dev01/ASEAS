'use client';
import { Android } from "@/components/ui/android";
import { BatchScannerScreen } from "@/components/ui/batch-scanner-screen";
import { StudentHomeDashboard } from "@/components/ui/student-home-dashboard";
import { InsightsDashboard } from "@/components/ui/insights-dashboard";
import { ClarificationChat } from "@/components/ui/clarification-chat";
import { EvaluationDetailScreen } from "@/components/ui/evaluation-detail-screen";
import { ProfessorDashboard } from "@/components/ui/professor-dashboard";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

function AndroidDemo() {
    const studentRef = useRef(null);
    const teacherRef = useRef(null);
    const isStudentInView = useInView(studentRef, { once: true, amount: 0.3 });
    const isTeacherInView = useInView(teacherRef, { once: true, amount: 0.3 });

    const [activeScreen, setActiveScreen] = useState(null);
    const [activeTeacherScreen, setTeacherActiveScreen] = useState(null);

    useEffect(() => {
        if (isStudentInView && activeScreen === null) {
            setActiveScreen(0);
        }
    }, [isStudentInView]);

    useEffect(() => {
        if (isTeacherInView && activeTeacherScreen === null) {
            setTeacherActiveScreen(0);
        }
    }, [isTeacherInView]);

    const handleAnimationComplete = (screenIndex) => {
        // Move to next screen with a slight delay
        setTimeout(() => {
            if (screenIndex < 2) {
                setActiveScreen(screenIndex + 1);
            } else {
                setActiveScreen(null); // End sequence
            }
        }, 300);
    };

    const handleTeacherAnimationComplete = (screenIndex) => {
        setTimeout(() => {
            if (screenIndex < 2) {
                setTeacherActiveScreen(screenIndex + 1);
            } else {
                setTeacherActiveScreen(null);
            }
        }, 300);
    };

    const frameVariants = {
        idle: {
            scale: 1,
            y: 0,
            filter: "brightness(0.7)",
            zIndex: 0,
            transition: { duration: 0.5, ease: "easeInOut" }
        },
        active: {
            scale: 1.1,
            y: -15,
            filter: "brightness(1)",
            zIndex: 10,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <div className="relative flex min-h-[500px] w-full flex-col items-center justify-center overflow-hidden bg-black py-20">
            {/* Background Gradient */}
            <div className="absolute inset-0 z-0 bg-gradient-to-tr from-violet-600/20 via-transparent to-blue-600/20 blur-3xl opacity-50" />

            <div className="relative z-10 container mx-auto px-4">
                <div id="student-hub" ref={studentRef} className="mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isStudentInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center"
                    >
                        <TypingAnimation
                            text="Experience the Future"
                            start={isStudentInView}
                            className="text-3xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter italic"
                        />
                        <div className="inline-block relative">
                            <p className="text-[#00f2ff] text-2xl md:text-3xl font-black tracking-[0.5em] uppercase mb-4 relative z-10">Student Portal</p>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={isStudentInView ? { width: "100%" } : {}}
                                transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                                className="absolute bottom-2 left-0 h-1 bg-gradient-to-r from-transparent via-[#00f2ff] to-transparent"
                            />
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center justify-center">
                    {/* Frame 1: Student Dashboard */}
                    <div className="flex flex-col items-center">
                        <div className="text-center mb-6">
                            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-1">Module Preview</p>
                            <h3 className={`text-lg font-semibold transition-colors duration-500 ${activeScreen === 0 ? 'text-[#00f2ff]' : 'text-white'}`}>1. Student Dashboard</h3>
                        </div>
                        <motion.div
                            variants={frameVariants}
                            initial="idle"
                            animate={activeScreen === 0 ? "active" : "idle"}
                        >
                            <Android
                                className="w-[280px] h-[560px] sm:w-[320px] sm:h-[640px] md:w-[380px] md:h-[760px] lg:w-[400px] lg:h-[800px]"
                            >
                                <StudentHomeDashboard
                                    isActive={activeScreen === 0}
                                    onComplete={() => handleAnimationComplete(0)}
                                />
                            </Android>
                        </motion.div>
                    </div>

                    {/* Frame 2: AI Clarification Chat */}
                    <div className="flex flex-col items-center relative">
                        <div className="text-center mb-6">
                            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-1">Module Preview</p>
                            <h3 className={`text-lg font-semibold transition-colors duration-500 ${activeScreen === 1 ? 'text-[#137fec]' : 'text-white'}`}>2. AI Clarification</h3>
                        </div>

                        <motion.div
                            variants={frameVariants}
                            initial="idle"
                            animate={activeScreen === 1 ? "active" : "idle"}
                        >
                            <Android
                                className="w-[280px] h-[560px] sm:w-[320px] sm:h-[640px] md:w-[380px] md:h-[760px] lg:w-[400px] lg:h-[800px]"
                            >
                                <ClarificationChat
                                    isActive={activeScreen === 1}
                                    onComplete={() => handleAnimationComplete(1)}
                                />
                            </Android>
                        </motion.div>
                    </div>

                    {/* Frame 3: Insights Dashboard */}
                    <div className="flex flex-col items-center">
                        <div className="text-center mb-6">
                            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-1">Module Preview</p>
                            <h3 className={`text-lg font-semibold transition-colors duration-500 ${activeScreen === 2 ? 'text-emerald-500' : 'text-white'}`}>3. Insights Dashboard</h3>
                        </div>
                        <motion.div
                            variants={frameVariants}
                            initial="idle"
                            animate={activeScreen === 2 ? "active" : "idle"}
                        >
                            <Android
                                className="w-[280px] h-[560px] sm:w-[320px] sm:h-[640px] md:w-[380px] md:h-[760px] lg:w-[400px] lg:h-[800px]"
                            >
                                <InsightsDashboard
                                    isActive={activeScreen === 2}
                                    onComplete={() => handleAnimationComplete(2)}
                                />
                            </Android>
                        </motion.div>
                    </div>
                </div>

                {/* Teachers Portal Section */}
                <div id="educator-suite" ref={teacherRef} className="mb-24 mt-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isTeacherInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center"
                    >
                        <TypingAnimation
                            text="Educator Insights"
                            start={isTeacherInView}
                            className="text-3xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter italic"
                        />
                        <div className="max-w-2xl mx-auto">
                            <div className="inline-block relative mb-6">
                                <p className="text-emerald-500 text-2xl md:text-3xl font-black tracking-[0.5em] uppercase relative z-10">Teachers Portal</p>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={isTeacherInView ? { width: "100%" } : {}}
                                    transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                                    className="absolute bottom-2 left-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
                                />
                            </div>
                            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
                                Empowering educators with real-time analytics, automated scoring, and comprehensive class management tools.
                            </p>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center justify-center">
                    {/* Frame 1: Grading Console */}
                    <div className="flex flex-col items-center">
                        <div className="text-center mb-6">
                            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-1">Module Preview</p>
                            <h3 className={`text-lg font-semibold transition-colors duration-500 ${activeTeacherScreen === 0 ? 'text-primary' : 'text-white'}`}>1. Image capture</h3>
                        </div>
                        <motion.div
                            variants={frameVariants}
                            initial="idle"
                            animate={activeTeacherScreen === 0 ? "active" : "idle"}
                        >
                            <Android className="w-[280px] h-[560px] sm:w-[320px] sm:h-[640px] md:w-[380px] md:h-[760px] lg:w-[400px] lg:h-[800px]">
                                <BatchScannerScreen
                                    isActive={activeTeacherScreen === 0}
                                    onComplete={() => handleTeacherAnimationComplete(0)}
                                />
                            </Android>
                        </motion.div>
                    </div>

                    {/* Frame 2: Evaluation Detail */}
                    <div className="flex flex-col items-center">
                        <div className="text-center mb-6">
                            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-1">Module Preview</p>
                            <h3 className={`text-lg font-semibold transition-colors duration-500 ${activeTeacherScreen === 1 ? 'text-primary' : 'text-white'}`}>2. Evaluation Detail</h3>
                        </div>
                        <motion.div
                            variants={frameVariants}
                            initial="idle"
                            animate={activeTeacherScreen === 1 ? "active" : "idle"}
                        >
                            <Android className="w-[280px] h-[560px] sm:w-[320px] sm:h-[640px] md:w-[380px] md:h-[760px] lg:w-[400px] lg:h-[800px]">
                                <EvaluationDetailScreen
                                    isActive={activeTeacherScreen === 1}
                                    onComplete={() => handleTeacherAnimationComplete(1)}
                                />
                            </Android>
                        </motion.div>
                    </div>

                    {/* Frame 3: Professor Dashboard */}
                    <div className="flex flex-col items-center">
                        <div className="text-center mb-6">
                            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-1">Module Preview</p>
                            <h3 className={`text-lg font-semibold transition-colors duration-500 ${activeTeacherScreen === 2 ? 'text-primary' : 'text-white'}`}>3. Professor Dashboard</h3>
                        </div>
                        <motion.div
                            variants={frameVariants}
                            initial="idle"
                            animate={activeTeacherScreen === 2 ? "active" : "idle"}
                        >
                            <Android className="w-[280px] h-[560px] sm:w-[320px] sm:h-[640px] md:w-[380px] md:h-[760px] lg:w-[400px] lg:h-[800px]">
                                <ProfessorDashboard
                                    isActive={activeTeacherScreen === 2}
                                    onComplete={() => handleTeacherAnimationComplete(2)}
                                />
                            </Android>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { AndroidDemo };
