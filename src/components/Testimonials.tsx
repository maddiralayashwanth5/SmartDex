"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Medical Student",
    image: "👩‍⚕️",
    content: "SmartDex transformed how I study for my medical exams. The AI-generated flashcards from my textbooks saved me hours of manual work, and the spaced repetition helped me retain complex terminology.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "UPSC Aspirant",
    image: "📖",
    content: "I&apos;ve tried many flashcard apps, but SmartDex&apos;s AI is on another level. It understands context and creates meaningful questions. My retention rate improved by 60% in just two months.",
    rating: 5,
  },
  {
    name: "Dr. Emily Watson",
    role: "University Professor",
    image: "👩‍🏫",
    content: "As an educator, I love how easy it is to create and share flashcard decks with my students. The analytics help me identify which topics need more attention in my lectures.",
    rating: 5,
  },
  {
    name: "Alex Rivera",
    role: "Software Engineer",
    image: "💻",
    content: "Learning new programming languages and frameworks is so much easier with SmartDex. I upload documentation and get perfectly structured flashcards. The voice mode is great for commute learning.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Language Learner",
    image: "🌍",
    content: "I&apos;m learning Japanese and SmartDex has been incredible. The AI creates flashcards with proper context, and the quiz mode keeps me engaged. Highly recommend for language learning!",
    rating: 5,
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrentIndex((prev) => {
      if (dir === 1) return (prev + 1) % testimonials.length;
      return prev === 0 ? testimonials.length - 1 : prev - 1;
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#F7F8FA]">
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
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1C3F] mb-4 font-[family-name:var(--font-poppins)]">
            Loved by Learners Worldwide
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            See what our community has to say about their learning journey with SmartDex
          </p>
        </motion.div>

        {/* Testimonial slider */}
        <div className="relative max-w-4xl mx-auto">
          {/* Quote icon */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#1EB6D2] rounded-full flex items-center justify-center z-10">
            <Quote className="w-6 h-6 text-white" />
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                {/* Avatar */}
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#1EB6D2] to-[#0B1C3F] flex items-center justify-center text-4xl">
                  {testimonials[currentIndex].image}
                </div>

                {/* Rating */}
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[#F8C14D] fill-[#F8C14D]" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-lg md:text-xl text-[#0B1C3F] leading-relaxed mb-6 max-w-2xl mx-auto">
                  &ldquo;{testimonials[currentIndex].content}&rdquo;
                </p>

                {/* Author */}
                <div>
                  <p className="font-bold text-[#0B1C3F] font-[family-name:var(--font-poppins)]">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-[#6B7280] text-sm">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => navigate(-1)}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#0B1C3F] hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "w-8 bg-[#1EB6D2]"
                      : "bg-[#E8EBF0] hover:bg-[#1EB6D2]/50"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => navigate(1)}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-[#0B1C3F] hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
