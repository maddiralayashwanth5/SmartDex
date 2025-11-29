"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  X,
  Clock,
  Trophy,
  ChevronRight,
  Gamepad2,
  Zap,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { generateQuizQuestions } from "@/lib/store";

interface QuizQuestion {
  question: string;
  correctAnswer: string;
  options: string[];
  cardId: string;
}

export default function QuizPage() {
  const { decks, flashcards, getDeck } = useApp();
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
  const [quizType, setQuizType] = useState<"multiple-choice" | "typing">("multiple-choice");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  // Timer
  useEffect(() => {
    if (selectedDeckId && !isComplete) {
      const interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [selectedDeckId, isComplete, startTime]);

  const startQuiz = (deckId: string) => {
    const deckCards = flashcards.filter(c => c.deckId === deckId);
    const generatedQuestions = generateQuizQuestions(deckCards, 10, quizType);
    setQuestions(generatedQuestions as QuizQuestion[]);
    setSelectedDeckId(deckId);
    setStartTime(Date.now());
    setCurrentIndex(0);
    setScore(0);
    setIsComplete(false);
  };

  const currentQuestion = questions[currentIndex];
  const selectedDeck = selectedDeckId ? getDeck(selectedDeckId) : null;

  const checkAnswer = () => {
    const answer = quizType === "multiple-choice" ? selectedAnswer : typedAnswer;
    const isCorrect = answer?.toLowerCase().trim() === currentQuestion?.correctAnswer.toLowerCase().trim();
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setTypedAnswer("");
      setShowResult(false);
    } else {
      setIsComplete(true);
    }
  };

  const resetQuiz = () => {
    setSelectedDeckId(null);
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setIsComplete(false);
    setSelectedAnswer(null);
    setTypedAnswer("");
    setShowResult(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Deck selection
  if (!selectedDeckId) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0B1C3F]">Quiz Mode</h1>
          <p className="text-[#6B7280]">Test your knowledge with interactive quizzes</p>
        </div>

        {/* Quiz type selection */}
        <div className="bg-white rounded-2xl border border-[#E8EBF0] p-6 mb-6">
          <h2 className="font-semibold text-[#0B1C3F] mb-4">Quiz Type</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <button
              onClick={() => setQuizType("multiple-choice")}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                quizType === "multiple-choice"
                  ? "border-[#1EB6D2] bg-[#1EB6D2]/5"
                  : "border-[#E8EBF0] hover:border-[#1EB6D2]/50"
              }`}
            >
              <Gamepad2 className="w-6 h-6 text-[#1EB6D2] mb-2" />
              <p className="font-medium text-[#0B1C3F]">Multiple Choice</p>
              <p className="text-sm text-[#6B7280]">Select the correct answer from options</p>
            </button>
            <button
              onClick={() => setQuizType("typing")}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                quizType === "typing"
                  ? "border-[#1EB6D2] bg-[#1EB6D2]/5"
                  : "border-[#E8EBF0] hover:border-[#1EB6D2]/50"
              }`}
            >
              <Zap className="w-6 h-6 text-[#F8C14D] mb-2" />
              <p className="font-medium text-[#0B1C3F]">Type Answer</p>
              <p className="text-sm text-[#6B7280]">Type your answer from memory</p>
            </button>
          </div>
        </div>

        {/* Deck selection */}
        <h2 className="font-semibold text-[#0B1C3F] mb-4">Select a Deck</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {decks.filter(d => d.cardCount >= 4).map((deck) => (
            <motion.button
              key={deck.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => startQuiz(deck.id)}
              className="bg-white rounded-2xl border border-[#E8EBF0] p-5 text-left hover:shadow-lg transition-all group"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
                  style={{ backgroundColor: `${deck.color}20` }}
                >
                  {deck.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#0B1C3F] group-hover:text-[#1EB6D2] transition-colors">
                    {deck.title}
                  </h3>
                  <p className="text-sm text-[#6B7280] mt-1">
                    {deck.cardCount} cards available
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#6B7280] group-hover:text-[#1EB6D2] transition-colors" />
              </div>
            </motion.button>
          ))}
        </div>

        {decks.filter(d => d.cardCount >= 4).length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E8EBF0]">
            <Gamepad2 className="w-16 h-16 text-[#6B7280] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#0B1C3F] mb-2">No decks available</h3>
            <p className="text-[#6B7280] mb-4">You need at least 4 cards in a deck to take a quiz</p>
            <Link
              href="/dashboard/decks/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-white rounded-xl font-medium"
              style={{ background: "linear-gradient(to right, #1EB6D2, #0B1C3F)" }}
            >
              Create Deck
            </Link>
          </div>
        )}
      </div>
    );
  }

  // Quiz complete
  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl border border-[#E8EBF0] p-8"
        >
          <div 
            className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ background: percentage >= 70 ? "linear-gradient(to bottom right, #10B981, #059669)" : "linear-gradient(to bottom right, #F8C14D, #F97316)" }}
          >
            <Trophy className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-[#0B1C3F] mb-2">
            {percentage >= 90 ? "Excellent!" : percentage >= 70 ? "Great Job!" : percentage >= 50 ? "Good Effort!" : "Keep Practicing!"}
          </h2>
          <p className="text-[#6B7280] mb-8">Quiz completed for {selectedDeck?.title}</p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-[#F7F8FA] rounded-xl">
              <p className="text-2xl font-bold text-[#0B1C3F]">{score}/{questions.length}</p>
              <p className="text-xs text-[#6B7280]">Correct</p>
            </div>
            <div className={`p-4 rounded-xl ${percentage >= 70 ? "bg-green-50" : "bg-orange-50"}`}>
              <p className={`text-2xl font-bold ${percentage >= 70 ? "text-green-600" : "text-orange-600"}`}>{percentage}%</p>
              <p className="text-xs text-[#6B7280]">Score</p>
            </div>
            <div className="p-4 bg-[#F7F8FA] rounded-xl">
              <p className="text-2xl font-bold text-[#0B1C3F]">{formatTime(timeElapsed)}</p>
              <p className="text-xs text-[#6B7280]">Time</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={resetQuiz}
              className="flex-1 py-3 border border-[#E8EBF0] rounded-xl font-medium text-[#0B1C3F] hover:bg-[#F7F8FA] transition-colors"
            >
              Back to Decks
            </button>
            <button
              onClick={() => startQuiz(selectedDeckId)}
              className="flex-1 py-3 text-white rounded-xl font-medium hover:opacity-90 transition-all"
              style={{ background: "linear-gradient(to right, #1EB6D2, #0B1C3F)" }}
            >
              Try Again
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Quiz in progress
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={resetQuiz}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#0B1C3F] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Exit</span>
        </button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F7F8FA] rounded-full">
            <Clock className="w-4 h-4 text-[#6B7280]" />
            <span className="text-sm font-medium text-[#0B1C3F]">{formatTime(timeElapsed)}</span>
          </div>
          <span className="text-sm text-[#6B7280]">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-[#E8EBF0] rounded-full mb-8">
        <div
          className="h-full bg-[#1EB6D2] rounded-full transition-all"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="bg-white rounded-3xl border border-[#E8EBF0] p-8 mb-6">
        <p className="text-xl font-medium text-[#0B1C3F] text-center mb-8">
          {currentQuestion?.question}
        </p>

        {quizType === "multiple-choice" ? (
          <div className="space-y-3">
            {currentQuestion?.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              const showCorrect = showResult && isCorrect;
              const showIncorrect = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => !showResult && setSelectedAnswer(option)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                    showCorrect
                      ? "border-green-500 bg-green-50"
                      : showIncorrect
                      ? "border-red-500 bg-red-50"
                      : isSelected
                      ? "border-[#1EB6D2] bg-[#1EB6D2]/5"
                      : "border-[#E8EBF0] hover:border-[#1EB6D2]/50"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    showCorrect
                      ? "bg-green-500 text-white"
                      : showIncorrect
                      ? "bg-red-500 text-white"
                      : isSelected
                      ? "bg-[#1EB6D2] text-white"
                      : "bg-[#F7F8FA] text-[#6B7280]"
                  }`}>
                    {showCorrect ? <Check className="w-4 h-4" /> : showIncorrect ? <X className="w-4 h-4" /> : String.fromCharCode(65 + index)}
                  </div>
                  <span className={`${showCorrect ? "text-green-700" : showIncorrect ? "text-red-700" : "text-[#0B1C3F]"}`}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div>
            <input
              type="text"
              value={typedAnswer}
              onChange={(e) => setTypedAnswer(e.target.value)}
              disabled={showResult}
              placeholder="Type your answer..."
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                showResult
                  ? typedAnswer.toLowerCase().trim() === currentQuestion?.correctAnswer.toLowerCase().trim()
                    ? "border-green-500 bg-green-50"
                    : "border-red-500 bg-red-50"
                  : "border-[#E8EBF0] focus:border-[#1EB6D2]"
              }`}
            />
            {showResult && typedAnswer.toLowerCase().trim() !== currentQuestion?.correctAnswer.toLowerCase().trim() && (
              <p className="mt-3 text-green-600">
                Correct answer: <span className="font-medium">{currentQuestion?.correctAnswer}</span>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        {!showResult ? (
          <button
            onClick={checkAnswer}
            disabled={quizType === "multiple-choice" ? !selectedAnswer : !typedAnswer.trim()}
            className="px-8 py-3 text-white rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50"
            style={{ background: "linear-gradient(to right, #1EB6D2, #0B1C3F)" }}
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="px-8 py-3 text-white rounded-xl font-medium hover:opacity-90 transition-all"
            style={{ background: "linear-gradient(to right, #1EB6D2, #0B1C3F)" }}
          >
            {currentIndex < questions.length - 1 ? "Next Question" : "See Results"}
          </button>
        )}
      </div>
    </div>
  );
}
