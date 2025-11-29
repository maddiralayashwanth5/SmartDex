"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How does the AI generate flashcards?",
    answer: "Our AI analyzes your uploaded content—whether it's notes, PDFs, or documents—and identifies key concepts, definitions, and relationships. It then creates question-answer pairs optimized for learning and retention.",
  },
  {
    question: "What file formats are supported?",
    answer: "SmartDex supports PDF, DOCX, TXT, and plain text. You can also paste text directly or upload images with text (OCR supported). We're constantly adding support for more formats.",
  },
  {
    question: "How does spaced repetition work?",
    answer: "Spaced repetition is a learning technique that schedules reviews at increasing intervals. When you answer a card correctly, you'll see it less frequently. Cards you struggle with appear more often until you master them.",
  },
  {
    question: "Can I share my flashcard decks with others?",
    answer: "Yes! Pro and Enterprise users can share decks publicly or with specific people. You can also collaborate on decks with team members and track their progress.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use industry-standard encryption for all data in transit and at rest. Your content is never shared with third parties, and you can delete your data at any time.",
  },
  {
    question: "Can I use SmartDex offline?",
    answer: "Yes, our mobile apps support offline mode. Your flashcards sync automatically when you're back online. This is perfect for studying during commutes or in areas with poor connectivity.",
  },
  {
    question: "What's the difference between Free and Pro?",
    answer: "Free gives you up to 100 flashcards with basic AI generation. Pro unlocks unlimited cards, advanced AI features, PDF uploads, voice mode, detailed analytics, and priority support.",
  },
  {
    question: "Do you offer student discounts?",
    answer: "Yes! Students with a valid .edu email get 50% off Pro plans. Contact our support team with your student email to claim your discount.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-[#F7F8FA]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-[#1EB6D2]/10 text-[#1EB6D2] rounded-full text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1C3F] mb-4 font-[family-name:var(--font-poppins)]">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-[#6B7280]">
            Everything you need to know about SmartDex
          </p>
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div
                className={`bg-white rounded-2xl overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "shadow-lg" : "shadow-sm"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-[#0B1C3F] pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      openIndex === index
                        ? "bg-[#1EB6D2] text-white"
                        : "bg-[#E8EBF0] text-[#0B1C3F]"
                    }`}
                  >
                    {openIndex === index ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5">
                        <p className="text-[#6B7280] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-[#6B7280] mb-4">
            Still have questions? We&apos;re here to help.
          </p>
          <button className="px-6 py-3 bg-[#0B1C3F] text-white rounded-full font-medium hover:bg-[#0B1C3F]/90 transition-all hover:scale-105">
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  );
}
