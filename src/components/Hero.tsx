"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Upload, Brain, TrendingUp, Sparkles } from "lucide-react";
import FlipCard from "./FlipCard";

const floatingCards = [
  { question: "What is photosynthesis?", answer: "The process by which plants convert sunlight into energy", category: "Biology" },
  { question: "What is the capital of Japan?", answer: "Tokyo", category: "Geography" },
  { question: "What is Newton's First Law?", answer: "An object at rest stays at rest unless acted upon by a force", category: "Physics" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden" style={{ background: "linear-gradient(to bottom right, #F7F8FA, #FFFFFF, #E8EBF0)" }}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#1EB6D2]/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-[#0B1C3F]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-[#F8C14D]/10 rounded-full blur-3xl" />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(11,28,63,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(11,28,63,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1EB6D2]/10 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#1EB6D2]" />
              <span className="text-sm font-medium text-[#0B1C3F]">AI-Powered Learning Revolution</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0B1C3F] leading-tight mb-6 font-[family-name:var(--font-poppins)]"
            >
              Learn Smarter with{" "}
              <span className="gradient-text">AI Flashcards</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-[#6B7280] mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Upload your notes, documents, or PDFs and let AI transform them into smart flashcards. 
              Master any subject with spaced repetition and interactive quizzes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button className="group px-8 py-4 text-white rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-[#1EB6D2]/30 transition-all hover:scale-105 flex items-center justify-center gap-2" style={{ background: "linear-gradient(to right, #1EB6D2, #0B1C3F)" }}>
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group px-8 py-4 border-2 border-[#0B1C3F] text-[#0B1C3F] rounded-full font-semibold text-lg hover:bg-[#0B1C3F] hover:text-white transition-all flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Try Demo
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start"
            >
              {[
                { value: "50K+", label: "Active Learners" },
                { value: "2M+", label: "Flashcards Created" },
                { value: "95%", label: "Retention Rate" },
              ].map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <p className="text-2xl font-bold text-[#0B1C3F]">{stat.value}</p>
                  <p className="text-sm text-[#6B7280]">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right content - Flashcard preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Main flashcard */}
            <div className="flex justify-center">
              <div className="relative">
                <FlipCard
                  question={floatingCards[0].question}
                  answer={floatingCards[0].answer}
                  category={floatingCards[0].category}
                />
                
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center"
                >
                  <Upload className="w-7 h-7 text-[#1EB6D2]" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center"
                >
                  <Brain className="w-7 h-7 text-[#F8C14D]" />
                </motion.div>

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute top-1/2 -right-8 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center"
                >
                  <TrendingUp className="w-6 h-6 text-[#0B1C3F]" />
                </motion.div>
              </div>
            </div>

            {/* Background cards */}
            <div className="absolute top-8 -left-8 opacity-30 scale-75 -rotate-12 hidden lg:block">
              <div 
                className="w-64 h-40 rounded-2xl shadow-lg" 
                style={{ background: "linear-gradient(to bottom right, #0B1C3F, #132952)" }}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 opacity-20 scale-75 rotate-12 hidden lg:block">
              <div 
                className="w-64 h-40 rounded-2xl shadow-lg" 
                style={{ background: "linear-gradient(to bottom right, #1EB6D2, #0B1C3F)" }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-[#0B1C3F]/30 rounded-full flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 bg-[#1EB6D2] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
