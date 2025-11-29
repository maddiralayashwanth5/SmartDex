"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Plus,
  Search,
  Grid3X3,
  List,
  MoreVertical,
  Edit,
  Trash2,
  Share2,
  Brain,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function DecksPage() {
  const { decks, deleteDeck } = useApp();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const filteredDecks = decks.filter(
    (deck) =>
      deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deck.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deck.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleDelete = (id: string) => {
    deleteDeck(id);
    setShowDeleteModal(null);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0B1C3F]">My Decks</h1>
          <p className="text-[#6B7280]">{decks.length} decks · {decks.reduce((sum, d) => sum + d.cardCount, 0)} cards total</p>
        </div>
        <Link
          href="/dashboard/decks/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-white rounded-xl font-medium hover:opacity-90 transition-all"
          style={{ background: "linear-gradient(to right, #1EB6D2, #0B1C3F)" }}
        >
          <Plus className="w-5 h-5" />
          Create Deck
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search decks..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E8EBF0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1EB6D2] focus:border-transparent transition-all"
          />
        </div>
        <div className="flex items-center gap-2 bg-white border border-[#E8EBF0] rounded-xl p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === "grid" ? "bg-[#1EB6D2]/10 text-[#1EB6D2]" : "text-[#6B7280] hover:bg-[#F7F8FA]"
            }`}
          >
            <Grid3X3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === "list" ? "bg-[#1EB6D2]/10 text-[#1EB6D2]" : "text-[#6B7280] hover:bg-[#F7F8FA]"
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Decks grid/list */}
      {filteredDecks.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F7F8FA] flex items-center justify-center">
            <Brain className="w-8 h-8 text-[#6B7280]" />
          </div>
          <h3 className="text-lg font-semibold text-[#0B1C3F] mb-2">No decks found</h3>
          <p className="text-[#6B7280] mb-4">
            {searchQuery ? "Try a different search term" : "Create your first deck to get started"}
          </p>
          {!searchQuery && (
            <Link
              href="/dashboard/decks/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-white rounded-xl font-medium"
              style={{ background: "linear-gradient(to right, #1EB6D2, #0B1C3F)" }}
            >
              <Plus className="w-5 h-5" />
              Create Deck
            </Link>
          )}
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDecks.map((deck, index) => (
            <motion.div
              key={deck.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl border border-[#E8EBF0] overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <Link href={`/dashboard/decks/${deck.id}`}>
                <div
                  className="h-24 flex items-center justify-center text-5xl"
                  style={{ backgroundColor: `${deck.color}20` }}
                >
                  {deck.icon}
                </div>
              </Link>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <Link href={`/dashboard/decks/${deck.id}`}>
                    <h3 className="font-semibold text-[#0B1C3F] hover:text-[#1EB6D2] transition-colors">
                      {deck.title}
                    </h3>
                  </Link>
                  <div className="relative">
                    <button
                      onClick={() => setActiveMenu(activeMenu === deck.id ? null : deck.id)}
                      className="p-1 hover:bg-[#F7F8FA] rounded-lg transition-colors"
                    >
                      <MoreVertical className="w-4 h-4 text-[#6B7280]" />
                    </button>
                    {activeMenu === deck.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                        <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-xl border border-[#E8EBF0] z-20 overflow-hidden">
                          <Link
                            href={`/dashboard/decks/${deck.id}/edit`}
                            className="flex items-center gap-2 px-4 py-2.5 hover:bg-[#F7F8FA] transition-colors"
                          >
                            <Edit className="w-4 h-4 text-[#6B7280]" />
                            <span className="text-sm">Edit</span>
                          </Link>
                          <button className="flex items-center gap-2 px-4 py-2.5 hover:bg-[#F7F8FA] transition-colors w-full">
                            <Share2 className="w-4 h-4 text-[#6B7280]" />
                            <span className="text-sm">Share</span>
                          </button>
                          <button
                            onClick={() => {
                              setActiveMenu(null);
                              setShowDeleteModal(deck.id);
                            }}
                            className="flex items-center gap-2 px-4 py-2.5 hover:bg-red-50 text-red-600 transition-colors w-full"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span className="text-sm">Delete</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <p className="text-sm text-[#6B7280] line-clamp-2 mb-3">
                  {deck.description || "No description"}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#6B7280]">
                    {deck.cardCount} cards
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-[#E8EBF0] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${deck.cardCount > 0 ? (deck.masteredCount / deck.cardCount) * 100 : 0}%`,
                          backgroundColor: deck.color,
                        }}
                      />
                    </div>
                    <span className="text-xs text-[#6B7280]">
                      {deck.cardCount > 0 ? Math.round((deck.masteredCount / deck.cardCount) * 100) : 0}%
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#E8EBF0] overflow-hidden">
          {filteredDecks.map((deck, index) => (
            <motion.div
              key={deck.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4 p-4 border-b border-[#E8EBF0] last:border-0 hover:bg-[#F7F8FA] transition-colors"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                style={{ backgroundColor: `${deck.color}20` }}
              >
                {deck.icon}
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/dashboard/decks/${deck.id}`}>
                  <h3 className="font-medium text-[#0B1C3F] hover:text-[#1EB6D2] transition-colors truncate">
                    {deck.title}
                  </h3>
                </Link>
                <p className="text-sm text-[#6B7280] truncate">
                  {deck.description || "No description"}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-6">
                <div className="text-center">
                  <p className="font-semibold text-[#0B1C3F]">{deck.cardCount}</p>
                  <p className="text-xs text-[#6B7280]">Cards</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-[#0B1C3F]">{deck.masteredCount}</p>
                  <p className="text-xs text-[#6B7280]">Mastered</p>
                </div>
                <div className="w-24">
                  <div className="w-full h-2 bg-[#E8EBF0] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${deck.cardCount > 0 ? (deck.masteredCount / deck.cardCount) * 100 : 0}%`,
                        backgroundColor: deck.color,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => setActiveMenu(activeMenu === deck.id ? null : deck.id)}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-[#6B7280]" />
                </button>
                {activeMenu === deck.id && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                    <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-xl border border-[#E8EBF0] z-20 overflow-hidden">
                      <Link
                        href={`/dashboard/decks/${deck.id}/edit`}
                        className="flex items-center gap-2 px-4 py-2.5 hover:bg-[#F7F8FA] transition-colors"
                      >
                        <Edit className="w-4 h-4 text-[#6B7280]" />
                        <span className="text-sm">Edit</span>
                      </Link>
                      <button className="flex items-center gap-2 px-4 py-2.5 hover:bg-[#F7F8FA] transition-colors w-full">
                        <Share2 className="w-4 h-4 text-[#6B7280]" />
                        <span className="text-sm">Share</span>
                      </button>
                      <button
                        onClick={() => {
                          setActiveMenu(null);
                          setShowDeleteModal(deck.id);
                        }}
                        className="flex items-center gap-2 px-4 py-2.5 hover:bg-red-50 text-red-600 transition-colors w-full"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="text-sm">Delete</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
          >
            <h3 className="text-lg font-bold text-[#0B1C3F] mb-2">Delete Deck</h3>
            <p className="text-[#6B7280] mb-6">
              Are you sure you want to delete this deck? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 py-2.5 border border-[#E8EBF0] rounded-xl font-medium text-[#0B1C3F] hover:bg-[#F7F8FA] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showDeleteModal)}
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
