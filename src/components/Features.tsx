"use client";

import { motion } from "framer-motion";
import { 
  Brain, 
  BarChart3, 
  Gamepad2, 
  Mic, 
  RefreshCw, 
  Zap,
  Clock,
  Target
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Spaced Repetition",
    description: "Our algorithm schedules reviews at optimal intervals to maximize long-term retention.",
    color: "#1EB6D2",
  },
  {
    icon: BarChart3,
    title: "Memory Analytics",
    description: "Track your learning progress with detailed memory scores and performance insights.",
    color: "#F8C14D",
  },
  {
    icon: Gamepad2,
    title: "Quiz Mode",
    description: "Test your knowledge with interactive quizzes, multiple choice, and typing challenges.",
    color: "#0B1C3F",
  },
  {
    icon: Mic,
    title: "AI Voice Mode",
    description: "Learn hands-free with AI-powered voice reading and speech recognition practice.",
    color: "#1EB6D2",
  },
  {
    icon: RefreshCw,
    title: "Cross-Device Sync",
    description: "Access your flashcards anywhere. Study on desktop, tablet, or mobile seamlessly.",
    color: "#F8C14D",
  },
  {
    icon: Zap,
    title: "Instant Generation",
    description: "Upload content and get AI-generated flashcards in seconds, not hours.",
    color: "#0B1C3F",
  },
];

const additionalFeatures = [
  { icon: Clock, text: "Smart scheduling" },
  { icon: Target, text: "Goal tracking" },
  { icon: Brain, text: "Adaptive learning" },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-[#F7F8FA] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-[#F8C14D]/20 text-[#0B1C3F] rounded-full text-sm font-medium mb-4">
            Powerful Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1C3F] mb-4 font-[family-name:var(--font-poppins)]">
            Everything You Need to{" "}
            <span className="gradient-text">Learn Faster</span>
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            SmartDex combines cutting-edge AI with proven learning science to help you master any subject
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E8EBF0] hover:border-transparent hover:-translate-y-1">
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-[#0B1C3F] mb-2 font-[family-name:var(--font-poppins)]">
                  {feature.title}
                </h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional features bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-wrap justify-center gap-6"
        >
          {additionalFeatures.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-[#E8EBF0]"
            >
              <item.icon className="w-4 h-4 text-[#1EB6D2]" />
              <span className="text-sm text-[#0B1C3F] font-medium">{item.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Progress graph preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 bg-white rounded-3xl p-8 shadow-xl border border-[#E8EBF0]"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[#0B1C3F] mb-3 font-[family-name:var(--font-poppins)]">
                Track Your Learning Journey
              </h3>
              <p className="text-[#6B7280] mb-6">
                Visualize your progress with beautiful analytics. See your memory retention improve over time.
              </p>
              <div className="flex gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#1EB6D2]">87%</p>
                  <p className="text-xs text-[#6B7280]">Retention</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#F8C14D]">156</p>
                  <p className="text-xs text-[#6B7280]">Cards Mastered</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#0B1C3F]">12</p>
                  <p className="text-xs text-[#6B7280]">Day Streak</p>
                </div>
              </div>
            </div>
            
            {/* Animated graph */}
            <div className="flex-1 w-full">
              <div className="h-48 flex items-end justify-between gap-2 px-4">
                {[40, 55, 45, 70, 60, 85, 75, 90, 80, 95, 88, 92].map((height, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="flex-1 rounded-t-lg bg-gradient-to-t from-[#1EB6D2] to-[#0B1C3F]"
                  />
                ))}
              </div>
              <div className="flex justify-between px-4 mt-2">
                <span className="text-xs text-[#6B7280]">Jan</span>
                <span className="text-xs text-[#6B7280]">Jun</span>
                <span className="text-xs text-[#6B7280]">Dec</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
