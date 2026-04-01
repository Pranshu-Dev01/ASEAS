import Hero from '@/components/Hero';
import { AndroidDemo } from '@/components/AndroidDemo';
import RadiusScrollWrapper from '@/components/RadiusOnScroll';
import WaitlistForm from '@/components/WaitlistForm';
import CircularCarousel from '@/components/CircularCarousel';
import { FooterColumnDemo } from '@/components/FooterColumnDemo';
import { InView } from '@/components/ui/in-view';
import { TextShimmer } from '@/components/ui/text-shimmer';
import { GlowingEffectDemo } from '@/components/GlowingEffectDemo';

export default function Home() {
  const visionText = "Redefining the standard of human intelligence. To build the global neural infrastructure for academic evaluation, ensuring every student’s potential is measured with absolute precision and zero bias. Empowering educators through intelligence. We bridge the gap between traditional handwriting and advanced AI. Our mission is to liberate teachers from the friction of manual grading, turning raw data into actionable pedagogical insights. Precision: Semantic understanding via RoBERTa NLP. Integrity: Eliminating human bias and evaluation fatigue. Velocity: Transforming weeks of grading into seconds of processing.";

  return (
    <main className="bg-black min-h-screen overflow-x-hidden">
      <Hero />

      {/* Vision Section with Scroll Animation */}
      <section id="vision" className="relative z-20 pt-4 pb-24 px-6 flex flex-col justify-center items-center overflow-hidden bg-black">
        <div className="mb-12">
          <TextShimmer
            className="text-2xl md:text-5xl font-black uppercase tracking-tighter italic [--base-color:#cbd5e1] [--base-gradient-color:#ffffff]"
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
          <div className="w-full max-w-7xl mx-auto">
            <GlowingEffectDemo />
          </div>
        </InView>
      </section>


      <div id="partners-section" className="flex flex-col items-center pt-10 pb-20 bg-black overflow-hidden">
        <div className="mb-2 text-center">
          <TextShimmer
            className="text-2xl md:text-5xl font-black uppercase tracking-tighter italic [--base-color:#cbd5e1] [--base-gradient-color:#ffffff]"
            duration={3}
          >
            Our Stakeholders
          </TextShimmer>
        </div>
        <CircularCarousel />
      </div>


      {/* Android Demo Section */}
      <AndroidDemo />



      <div id="waitlist-form">
        <WaitlistForm />
      </div>
      <FooterColumnDemo />
    </main>
  );
}