import Hero from '@/components/Hero';
import { AndroidDemo } from '@/components/AndroidDemo';
import RadiusScrollWrapper from '@/components/RadiusOnScroll';
import WaitlistForm from '@/components/WaitlistForm';
import CircularCarousel from '@/components/CircularCarousel';
import { FooterColumnDemo } from '@/components/FooterColumnDemo';
import { InView } from '@/components/ui/in-view';
import { TextShimmer } from '@/components/ui/text-shimmer';

export default function Home() {
  const visionText = "Redefining the standard of human intelligence. To build the global neural infrastructure for academic evaluation, ensuring every student’s potential is measured with absolute precision and zero bias. Empowering educators through intelligence. We bridge the gap between traditional handwriting and advanced AI. Our mission is to liberate teachers from the friction of manual grading, turning raw data into actionable pedagogical insights. Precision: Semantic understanding via RoBERTa NLP. Integrity: Eliminating human bias and evaluation fatigue. Velocity: Transforming weeks of grading into seconds of processing.";

  return (
    <main className="bg-black min-h-screen overflow-x-hidden">
      <Hero />

      {/* Vision Section with Scroll Animation */}
      <section id="vision" className="relative z-20 pt-4 pb-24 px-6 flex flex-col justify-center items-center overflow-hidden">
        <div className="mb-8">
          <TextShimmer
            className="text-2xl font-medium tracking-[0.2em] uppercase [--base-color:#cbd5e1] [--base-gradient-color:#ffffff]"
            duration={3}
          >
            Our Vision
          </TextShimmer>
        </div>
        <InView
          variants={{
            hidden: { opacity: 0, y: 100, filter: "blur(4px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)" },
          }}
          viewOptions={{ margin: "0px 0px -200px 0px", once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className={
            "relative max-w-5xl p-8 md:p-12 lg:p-16 rounded-[2.5rem] " +
            "bg-black/40 backdrop-blur-3xl border border-white/20 " +
            "shadow-[0_24px_80px_rgba(0,0,0,0.6),inset_0_0_20px_rgba(255,255,255,0.05)]"
          }>
            {/* Decorative background glows */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/15 rounded-full blur-[110px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-500/15 rounded-full blur-[110px] pointer-events-none" />

            <p className="relative z-10 text-2xl md:text-3xl lg:text-4xl font-normal text-white italic leading-[1.5] tracking-tight text-center md:text-left drop-shadow-sm">
              {visionText}
            </p>
          </div>
        </InView>
      </section>


      <CircularCarousel />


      {/* Android Demo Section */}
      <AndroidDemo />



      <div id="waitlist-form">
        <WaitlistForm />
      </div>
      <FooterColumnDemo />
    </main>
  );
}