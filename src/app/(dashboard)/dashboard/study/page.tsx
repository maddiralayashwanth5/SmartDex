"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  RotateCcw,
  ThumbsDown,
  ThumbsUp,
  Zap,
  Clock,
  Target,
  ChevronRight,
  Brain,
  Lightbulb,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { Flashcard } from "@/types";
import { getCardsForStudy, calculateNextReview } from "@/lib/store";

export default function StudyPage() {
  const { decks, flashcards, updateFlashcard, getDeck } = useApp();
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
  const [studyCards, setStudyCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0, total: 0 });
  const [isComplete, setIsComplete] = useState(false);
  const [startTime] = useState(Date.now());

  // Get cards for selected deck
  useEffect(() => {
    if (selectedDeckId) {
      const deckCards = flashcards.filter(c => c.deckId === selectedDeckId);
      const dueCards = getCardsForStudy(deckCards, 20);
      setStudyCards(dueCards);
      setCurrentIndex(0);
      setIsComplete(false);
      setSessionStats({ correct: 0, incorrect: 0, total: 0 });
    }
  }, [selectedDeckId, flashcards]);

  const currentCard = studyCards[currentIndex];
  const selectedDeck = selectedDeckId ? getDeck(selectedDeckId) : null;

  const handleResponse = (quality: number) => {
    if (!currentCard) return;

    const isCorrect = quality >= 3;
    
    // Update card with spaced repetition
    const { easeFactor, interval, repetitions, nextReview } = calculateNextReview(
      quality,
      currentCard.easeFactor,
      currentCard.interval,
      currentCard.repetitions
    );

    updateFlashcard(currentCard.id, {
      easeFactor,
      interval,
      repetitions,
      nextReview,
      lastReview: new Date(),
      status: repetitions >= 5 ? 'mastered' : repetitions >= 2 ? 'review' : 'learning',
    });

    // Update session stats
    setSessionStats(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1),
      total: prev.total + 1,
    }));

    // Move to next card
    if (currentIndex < studyCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
      setShowHint(false);
    } else {
      setIsComplete(true);
    }
  };

  const resetSession = () => {
    setSelectedDeckId(null);
    setStudyCards([]);
    setCurrentIndex(0);
    setIsComplete(false);
    setSessionStats({ correct: 0, incorrect: 0, total: 0 });
  };

  // Deck selection view
  if (!selectedDeckId) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#0B1C3F]">Study Mode</h1>
          <p className="text-[#6B7280]">Select a deck to start studying</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {decks.map((deck) => {
            const deckCards = flashcards.filter(c => c.deckId === deck.id);
            const dueCount = getCardsForStudy(deckCards).length;
            
            return (
              <motion.button
                key={deck.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedDeckId(deck.id)}
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
                      {deck.cardCount} cards · {deck.masteredCount} mastered
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-0.5 bg-[#1EB6D2]/10 text-[#1EB6D2] text-xs font-medium rounded-full">
                        {dueCount} due
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#6B7280] group-hover:text-[#1EB6D2] transition-colors" />
                </div>
              </motion.button>
            );
          })}
        </div>

        {decks.length === 0 && (
          <div className="text-center py-16">
            <Brain className="w-16 h-16 text-[#6B7280] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#0B1C3F] mb-2">No decks yet</h3>
            <p className="text-[#6B7280] mb-4">Create a deck to start studying</p>
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

  // Session complete view
  if (isComplete) {
    const accuracy = sessionStats.total > 0 
      ? Math.round((sessionStats.correct / sessionStats.total) * 100) 
      : 0;
    const timeSpent = Math.round((Date.now() - startTime) / 1000 / 60);

    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl border border-[#E8EBF0] p-8"
        >
          <div 
            className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ background: "linear-gradient(to bottom right, #1EB6D2, #0B1C3F)" }}
          >
            <Target className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-2xl font-bold text-[#0B1C3F] mb-2">Session Complete!</h2>
          <p className="text-[#6B7280] mb-8">Great job studying {selectedDeck?.title}</p>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-[#F7F8FA] rounded-xl">
              <p className="text-2xl font-bold text-[#0B1C3F]">{sessionStats.total}</p>
              <p className="text-xs text-[#6B7280]">Cards Studied</p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl">
              <p className="text-2xl font-bold text-green-600">{accuracy}%</p>
              <p className="text-xs text-[#6B7280]">Accuracy</p>
            </div>
            <div className="p-4 bg-[#F7F8FA] rounded-xl">
              <p className="text-2xl font-bold text-[#0B1C3F]">{timeSpent}m</p>
              <p className="text-xs text-[#6B7280]">Time Spent</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={resetSession}
              className="flex-1 py-3 border border-[#E8EBF0] rounded-xl font-medium text-[#0B1C3F] hover:bg-[#F7F8FA] transition-colors"
            >
              Back to Decks
            </button>
            <button
              onClick={() => {
                setCurrentIndex(0);
                setIsComplete(false);
                setSessionStats({ correct: 0, incorrect: 0, total: 0 });
              }}
              className="flex-1 py-3 text-white rounded-xl font-medium hover:opacity-90 transition-all"
              style={{ background: "linear-gradient(to right, #1EB6D2, #0B1C3F)" }}
            >
              Study Again
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // No cards due
  if (studyCards.length === 0) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="bg-white rounded-3xl border border-[#E8EBF0] p-8">
          <div className="w-20 h-20 rounded-full bg-green-100 mx-auto mb-6 flex items-center justify-center">
            <Target className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#0B1C3F] mb-2">All caught up!</h2>
          <p className="text-[#6B7280] mb-6">No cards due for review in this deck</p>
          <button
            onClick={resetSession}
            className="px-6 py-3 text-white rounded-xl font-medium hover:opacity-90 transition-all"
            style={{ background: "linear-gradient(to right, #1EB6D2, #0B1C3F)" }}
          >
            Choose Another Deck
          </button>
        </div>
      </div>
    );
  }

  // Study view
  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={resetSession}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#0B1C3F] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Exit</span>
        </button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-[#6B7280]" />
            <span className="text-[#6B7280]">{currentIndex + 1} / {studyCards.length}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-green-600 font-medium">{sessionStats.correct}</span>
            <span className="text-[#6B7280]">/</span>
            <span className="text-red-500 font-medium">{sessionStats.incorrect}</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-[#E8EBF0] rounded-full mb-8">
        <div
          className="h-full bg-[#1EB6D2] rounded-full transition-all"
          style={{ width: `${((currentIndex + 1) / studyCards.length) * 100}%` }}
        />
      </div>

      {/* Flashcard */}
      <div
        className="relative cursor-pointer mb-6"
        style={{ perspective: "1000px", minHeight: "300px" }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard?.id + (isFlipped ? "-back" : "-front")}
            initial={{ rotateY: isFlipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: isFlipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full rounded-3xl p-8 text-white min-h-[300px] flex flex-col"
            style={{ 
              background: isFlipped 
                ? "linear-gradient(to bottom right, #1EB6D2, #0B1C3F)"
                : "linear-gradient(to bottom right, #0B1C3F, #132952)"
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                {isFlipped ? "Answer" : "Question"}
              </span>
              <RotateCcw className="w-5 h-5 text-white/50" />
            </div>
            <div className="flex-1 flex items-center justify-center">
              <p className="text-xl text-center leading-relaxed">
                {isFlipped ? currentCard?.back : currentCard?.front}
              </p>
            </div>
            <p className="text-white/40 text-xs text-center">
              {isFlipped ? "Click to see question" : "Click to reveal answer"}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hint button */}
      {currentCard?.hint && !isFlipped && (
        <div className="text-center mb-6">
          {showHint ? (
            <p className="text-[#6B7280] bg-[#F8C14D]/10 px-4 py-2 rounded-lg inline-block">
              💡 {currentCard.hint}
            </p>
          ) : (
            <button
              onClick={() => setShowHint(true)}
              className="flex items-center gap-2 mx-auto text-[#F8C14D] hover:underline"
            >
              <Lightbulb className="w-4 h-4" />
              Show Hint
            </button>
          )}
        </div>
      )}

      {/* Response buttons */}
      {isFlipped && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-4 gap-3"
        >
          <button
            onClick={() => handleResponse(1)}
            className="py-4 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors flex flex-col items-center gap-1"
          >
            <ThumbsDown className="w-5 h-5" />
            <span className="text-sm">Again</span>
          </button>
          <button
            onClick={() => handleResponse(2)}
            className="py-4 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors flex flex-col items-center gap-1"
          >
            <span className="text-lg">😐</span>
            <span className="text-sm">Hard</span>
          </button>
          <button
            onClick={() => handleResponse(3)}
            className="py-4 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors flex flex-col items-center gap-1"
          >
            <ThumbsUp className="w-5 h-5" />
            <span className="text-sm">Good</span>
          </button>
          <button
            onClick={() => handleResponse(5)}
            className="py-4 bg-[#1EB6D2] text-white rounded-xl font-medium hover:bg-[#1EB6D2]/90 transition-colors flex flex-col items-center gap-1"
          >
            <Zap className="w-5 h-5" />
            <span className="text-sm">Easy</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
