import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import ProductFlow from '@/components/ProductFlow';
import RadiusScrollWrapper from '@/components/RadiusOnScroll';
import WaitlistForm from '@/components/WaitlistForm';
import CircularCarousel from '@/components/CircularCarousel';

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Hero />
      <CircularCarousel />
      <Marquee />

      {/* Interactive Flow */}
      <ProductFlow />

      {/* The Red Flag Section from your screenshot */}
      <RadiusScrollWrapper>
        <h2 className="text-4xl font-bold mb-4">AI Red-Flag Detection</h2>
        <p className="text-gray-400 max-w-lg mx-auto">
          ASEAS automatically identifies uncertain answers and flags them for
          manual review, ensuring 100% accuracy in high-stakes exams.
        </p>

      </RadiusScrollWrapper>

      <WaitlistForm />
    </main>
  );
}