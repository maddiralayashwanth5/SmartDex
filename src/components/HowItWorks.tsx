"use client";

import { motion } from "framer-motion";
import { Upload, Sparkles, TrendingUp, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Your Content",
    description: "Drop your notes, PDFs, documents, or paste text. Our AI accepts any learning material you have.",
    color: "#1EB6D2",
    step: "01",
  },
  {
    icon: Sparkles,
    title: "AI Generates Flashcards",
    description: "Our advanced AI analyzes your content and creates smart, optimized flashcards automatically.",
    color: "#F8C14D",
    step: "02",
  },
  {
    icon: TrendingUp,
    title: "Study & Track Progress",
    description: "Learn with spaced repetition, take quizzes, and watch your memory scores improve over time.",
    color: "#0B1C3F",
    step: "03",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[#1EB6D2]/10 text-[#1EB6D2] rounded-full text-sm font-medium mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1C3F] mb-4 font-[family-name:var(--font-poppins)]">
            How SmartDex Works
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            Transform any learning material into smart flashcards in three simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-[#1EB6D2] via-[#F8C14D] to-[#0B1C3F]" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-[#E8EBF0] group">
                {/* Step number */}
                <div className="absolute -top-4 left-8 px-4 py-1 bg-[#0B1C3F] text-white text-sm font-bold rounded-full">
                  {step.step}
                </div>

                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${step.color}20` }}
                >
                  <step.icon className="w-8 h-8" style={{ color: step.color }} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#0B1C3F] mb-3 font-[family-name:var(--font-poppins)]">
                  {step.title}
                </h3>
                <p className="text-[#6B7280] leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow for non-last items */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg items-center justify-center z-10">
                    <ArrowRight className="w-4 h-4 text-[#1EB6D2]" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-[#1EB6D2] to-[#0B1C3F] text-white rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-[#1EB6D2]/30 transition-all hover:scale-105">
            Start Creating Flashcards
          </button>
        </motion.div>
      </div>
    </section>
  );
}
