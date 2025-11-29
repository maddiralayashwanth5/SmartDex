"use client";

import { useState } from "react";

// Generate static params for the dynamic route
export function generateStaticParams() {
  // Return some sample deck IDs for static generation
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
  ];
}
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Brain,
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  Gamepad2,
  Share2,
  Clock,
  Target,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function DeckDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getDeck, getFlashcardsByDeck, deleteFlashcard, deleteDeck } = useApp();
  const [activeCardMenu, setActiveCardMenu] = useState<string | null>(null);
  const [showDeleteDeckModal, setShowDeleteDeckModal] = useState(false);
  const [showDeleteCardModal, setShowDeleteCardModal] = useState<string | null>(null);

  const deckId = params.id as string;
  const deck = getDeck(deckId);
  const cards = getFlashcardsByDeck(deckId);

  if (!deck) {
    return (
      <div className="text-center py-16">
        <h2 className="text-xl font-bold text-[#0B1C3F] mb-2">Deck not found</h2>
        <Link href="/dashboard/decks" className="text-[#1EB6D2] hover:underline">
          Back to decks
        </Link>
      </div>
    );
  }

  const handleDeleteDeck = () => {
    deleteDeck(deckId);
    router.push("/dashboard/decks");
  };

  const handleDeleteCard = (cardId: string) => {
    deleteFlashcard(cardId);
    setShowDeleteCardModal(null);
  };

  const dueCards = cards.filter(c => new Date(c.nextReview) <= new Date()).length;
  const progress = cards.length > 0 ? (deck.masteredCount / cards.length) * 100 : 0;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-4">
          <Link
            href="/dashboard/decks"
            className="p-2 hover:bg-white rounded-lg transition-colors mt-1"
          >
            <ArrowLeft className="w-5 h-5 text-[#6B7280]" />
          </Link>
          <div className="flex items-start gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shrink-0"
              style={{ backgroundColor: `${deck.color}20` }}
            >
              {deck.icon}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#0B1C3F]">{deck.title}</h1>
              <p className="text-[#6B7280] mt-1">{deck.description || "No description"}</p>
              <div className="flex items-center gap-3 mt-2">
                {deck.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-[#F7F8FA] text-[#6B7280] text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/dashboard/decks/${deckId}/edit`}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <Edit className="w-5 h-5 text-[#6B7280]" />
          </Link>
          <button className="p-2 hover:bg-white rounded-lg transition-colors">
            <Share2 className="w-5 h-5 text-[#6B7280]" />
          </button>
          <button
            onClick={() => setShowDeleteDeckModal(true)}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 border border-[#E8EBF0]">
          <p className="text-2xl font-bold text-[#0B1C3F]">{cards.length}</p>
          <p className="text-sm text-[#6B7280]">Total Cards</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#E8EBF0]">
          <p className="text-2xl font-bold text-[#1EB6D2]">{dueCards}</p>
          <p className="text-sm text-[#6B7280]">Due Today</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#E8EBF0]">
          <p className="text-2xl font-bold text-[#10B981]">{deck.masteredCount}</p>
          <p className="text-sm text-[#6B7280]">Mastered</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[#E8EBF0]">
          <p className="text-2xl font-bold text-[#0B1C3F]">{Math.round(progress)}%</p>
          <p className="text-sm text-[#6B7280]">Complete</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Link
          href="/dashboard/study"
          className="flex items-center gap-2 px-5 py-2.5 text-white rounded-xl font-medium hover:opacity-90 transition-all"
          style={{ background: "linear-gradient(to right, #1EB6D2, #0B1C3F)" }}
        >
          <Brain className="w-5 h-5" />
          Study Now
        </Link>
        <Link
          href="/dashboard/quiz"
          className="flex items-center gap-2 px-5 py-2.5 border border-[#E8EBF0] rounded-xl font-medium text-[#0B1C3F] hover:bg-[#F7F8FA] transition-colors"
        >
          <Gamepad2 className="w-5 h-5" />
          Take Quiz
        </Link>
        <Link
          href={`/dashboard/decks/${deckId}/add-cards`}
          className="flex items-center gap-2 px-5 py-2.5 border border-[#E8EBF0] rounded-xl font-medium text-[#0B1C3F] hover:bg-[#F7F8FA] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Cards
        </Link>
      </div>

      {/* Cards list */}
      <div className="bg-white rounded-2xl border border-[#E8EBF0] overflow-hidden">
        <div className="p-4 border-b border-[#E8EBF0] flex items-center justify-between">
          <h2 className="font-semibold text-[#0B1C3F]">Cards ({cards.length})</h2>
        </div>
        
        {cards.length === 0 ? (
          <div className="text-center py-12">
            <Brain className="w-12 h-12 text-[#6B7280] mx-auto mb-3" />
            <h3 className="font-medium text-[#0B1C3F] mb-1">No cards yet</h3>
            <p className="text-sm text-[#6B7280] mb-4">Add cards to start studying</p>
            <Link
              href={`/dashboard/decks/${deckId}/add-cards`}
              className="inline-flex items-center gap-2 px-4 py-2 text-[#1EB6D2] hover:bg-[#1EB6D2]/10 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Cards
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-[#E8EBF0]">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.03 }}
                className="p-4 hover:bg-[#F7F8FA] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#0B1C3F] mb-1">{card.front}</p>
                    <p className="text-sm text-[#6B7280] line-clamp-2">{card.back}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        card.status === "mastered" ? "bg-green-100 text-green-700" :
                        card.status === "review" ? "bg-blue-100 text-blue-700" :
                        card.status === "learning" ? "bg-yellow-100 text-yellow-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {card.status}
                      </span>
                      <span className="text-xs text-[#6B7280] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Next: {new Date(card.nextReview).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setActiveCardMenu(activeCardMenu === card.id ? null : card.id)}
                      className="p-1 hover:bg-white rounded transition-colors"
                    >
                      <MoreVertical className="w-4 h-4 text-[#6B7280]" />
                    </button>
                    {activeCardMenu === card.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setActiveCardMenu(null)} />
                        <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-xl shadow-xl border border-[#E8EBF0] z-20 overflow-hidden">
                          <button className="flex items-center gap-2 px-3 py-2 hover:bg-[#F7F8FA] transition-colors w-full text-sm">
                            <Edit className="w-4 h-4 text-[#6B7280]" />
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setActiveCardMenu(null);
                              setShowDeleteCardModal(card.id);
                            }}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-red-50 text-red-600 transition-colors w-full text-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Delete deck modal */}
      {showDeleteDeckModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
          >
            <h3 className="text-lg font-bold text-[#0B1C3F] mb-2">Delete Deck</h3>
            <p className="text-[#6B7280] mb-6">
              Are you sure you want to delete &quot;{deck.title}&quot;? This will also delete all {cards.length} cards.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteDeckModal(false)}
                className="flex-1 py-2.5 border border-[#E8EBF0] rounded-xl font-medium text-[#0B1C3F] hover:bg-[#F7F8FA] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteDeck}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Delete card modal */}
      {showDeleteCardModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
          >
            <h3 className="text-lg font-bold text-[#0B1C3F] mb-2">Delete Card</h3>
            <p className="text-[#6B7280] mb-6">
              Are you sure you want to delete this card?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteCardModal(null)}
                className="flex-1 py-2.5 border border-[#E8EBF0] rounded-xl font-medium text-[#0B1C3F] hover:bg-[#F7F8FA] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteCard(showDeleteCardModal)}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
