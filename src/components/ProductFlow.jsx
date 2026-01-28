'use client';
import { motion } from 'framer-motion';

const steps = [
  { title: "Upload", desc: "Students upload handwritten sheets.", icon: "📄" },
  { title: "OCR", desc: "RoBERTa-based conversion to text.", icon: "🔍" },
  { title: "NLP", desc: "Semantic comparison with key answers.", icon: "🤖" },
  { title: "Result", desc: "Automated marking & red-flagging.", icon: "✅" }
];

export default function ProductFlow() {
  return (
    <section className="py-32 bg-black relative">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-20 bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent">
          How ASEAS Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-blue-500/20 -z-0" />
          
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative z-10 bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl hover:border-blue-500/50 transition-all group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}