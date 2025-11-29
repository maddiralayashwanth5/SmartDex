"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

interface FlipCardProps {
  question: string;
  answer: string;
  category?: string;
}

export default function FlipCard({ question, answer, category = "General" }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="flip-card cursor-pointer group"
      style={{ width: "320px", height: "256px", perspective: "1000px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="flip-card-inner relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front */}
        <div
          className="flip-card-front absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between shadow-xl"
          style={{ backfaceVisibility: "hidden", background: "linear-gradient(to bottom right, #0B1C3F, #132952)" }}
        >
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-[#1EB6D2]/20 text-[#1EB6D2] rounded-full text-xs font-medium">
              {category}
            </span>
            <RotateCcw className="w-5 h-5 text-white/50 group-hover:text-[#F8C14D] transition-colors" />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <p className="text-white text-lg font-medium text-center leading-relaxed">
              {question}
            </p>
          </div>
          <p className="text-white/40 text-xs text-center">Click to reveal answer</p>
        </div>

        {/* Back */}
        <div
          className="flip-card-back absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between shadow-xl"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: "linear-gradient(to bottom right, #1EB6D2, #0B1C3F)" }}
        >
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 bg-white/20 text-white rounded-full text-xs font-medium">
              Answer
            </span>
            <RotateCcw className="w-5 h-5 text-white/50 group-hover:text-[#F8C14D] transition-colors" />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <p className="text-white text-lg font-medium text-center leading-relaxed">
              {answer}
            </p>
          </div>
          <p className="text-white/40 text-xs text-center">Click to see question</p>
        </div>
      </motion.div>
    </div>
  );
}
