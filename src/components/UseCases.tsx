"use client";

import { motion } from "framer-motion";
import { GraduationCap, Trophy, Users, Briefcase } from "lucide-react";

const useCases = [
  {
    icon: GraduationCap,
    title: "Students",
    description: "Ace your exams with AI-generated flashcards from your lecture notes and textbooks.",
    stats: "40% faster learning",
    color: "#1EB6D2",
    image: "📚",
  },
  {
    icon: Trophy,
    title: "Competitive Exam Aspirants",
    description: "Prepare for UPSC, GRE, GMAT, and more with optimized spaced repetition.",
    stats: "2x retention rate",
    color: "#F8C14D",
    image: "🏆",
  },
  {
    icon: Users,
    title: "Educators",
    description: "Create and share flashcard decks with your students. Track their progress easily.",
    stats: "Save 5+ hours/week",
    color: "#0B1C3F",
    image: "👨‍🏫",
  },
  {
    icon: Briefcase,
    title: "Corporate Training",
    description: "Onboard employees faster with AI-powered training materials and assessments.",
    stats: "60% faster onboarding",
    color: "#1EB6D2",
    image: "💼",
  },
];

export default function UseCases() {
  return (
    <section id="use-cases" className="py-24 bg-[#0B1C3F] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1EB6D2]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F8C14D]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[#1EB6D2]/20 text-[#1EB6D2] rounded-full text-sm font-medium mb-4">
            Who It&apos;s For
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-poppins)]">
            Built for Every Learner
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Whether you&apos;re a student, educator, or professional, SmartDex adapts to your learning needs
          </p>
        </motion.div>

        {/* Use cases grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-[#1EB6D2]/50 transition-all duration-300 hover:bg-white/10">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 text-3xl"
                    style={{ backgroundColor: `${useCase.color}20` }}
                  >
                    {useCase.image}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white font-[family-name:var(--font-poppins)]">
                        {useCase.title}
                      </h3>
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-medium"
                        style={{ backgroundColor: `${useCase.color}20`, color: useCase.color }}
                      >
                        {useCase.stats}
                      </span>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {useCase.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-white/60 mb-4">Join thousands of learners already using SmartDex</p>
          <button className="px-8 py-4 bg-[#1EB6D2] text-white rounded-full font-semibold text-lg hover:bg-[#1EB6D2]/90 transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#1EB6D2]/30">
            Start Learning Today
          </button>
        </motion.div>
      </div>
    </section>
  );
}
