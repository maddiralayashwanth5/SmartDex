"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Sparkles,
  Upload,
  FileText,
  Link as LinkIcon,
  Plus,
  Trash2,
  Wand2,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";

const deckIcons = ["📚", "🧬", "💻", "🌍", "🎨", "🔬", "📊", "🎵", "🏛️", "⚡", "🧮", "📖"];
const deckColors = ["#1EB6D2", "#F8C14D", "#0B1C3F", "#8B5CF6", "#10B981", "#EF4444", "#F97316", "#EC4899"];

interface ManualCard {
  front: string;
  back: string;
}

export default function NewDeckPage() {
  const router = useRouter();
  const { createDeck, bulkCreateFlashcards } = useApp();
  
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("📚");
  const [selectedColor, setSelectedColor] = useState("#1EB6D2");
  const [isPublic, setIsPublic] = useState(false);
  const [tags, setTags] = useState("");
  
  const [creationMethod, setCreationMethod] = useState<"manual" | "ai" | "import">("manual");
  const [manualCards, setManualCards] = useState<ManualCard[]>([{ front: "", back: "" }]);
  const [aiContent, setAiContent] = useState("");
  const [aiCardCount, setAiCardCount] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCards, setGeneratedCards] = useState<ManualCard[]>([]);

  const addManualCard = () => {
    setManualCards([...manualCards, { front: "", back: "" }]);
  };

  const removeManualCard = (index: number) => {
    setManualCards(manualCards.filter((_, i) => i !== index));
  };

  const updateManualCard = (index: number, field: "front" | "back", value: string) => {
    const updated = [...manualCards];
    updated[index][field] = value;
    setManualCards(updated);
  };

  const generateAICards = async () => {
    if (!aiContent.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock cards based on content
    const mockCards: ManualCard[] = [];
    const sentences = aiContent.split(/[.!?]+/).filter(s => s.trim().length > 10);
    
    for (let i = 0; i < Math.min(aiCardCount, sentences.length, 10); i++) {
      const sentence = sentences[i]?.trim();
      if (sentence) {
        mockCards.push({
          front: `What is ${sentence.split(" ").slice(0, 5).join(" ")}...?`,
          back: sentence,
        });
      }
    }
    
    // Add some default cards if not enough content
    while (mockCards.length < Math.min(aiCardCount, 5)) {
      mockCards.push({
        front: `Question ${mockCards.length + 1} about the topic`,
        back: `Answer ${mockCards.length + 1} explaining the concept in detail`,
      });
    }
    
    setGeneratedCards(mockCards);
    setIsGenerating(false);
  };

  const handleCreate = () => {
    if (!title.trim()) return;
    
    // Create the deck
    const deckId = Date.now().toString();
    createDeck({
      title,
      description,
      icon: selectedIcon,
      color: selectedColor,
      isPublic,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      lastStudied: undefined,
    });
    
    // Add cards
    const cardsToAdd = creationMethod === "ai" ? generatedCards : manualCards.filter(c => c.front && c.back);
    
    if (cardsToAdd.length > 0) {
      bulkCreateFlashcards(
        cardsToAdd.map(card => ({
          deckId,
          front: card.front,
          back: card.back,
        }))
      );
    }
    
    router.push("/dashboard/decks");
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/dashboard/decks"
          className="p-2 hover:bg-white rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#6B7280]" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#0B1C3F]">Create New Deck</h1>
          <p className="text-[#6B7280]">Step {step} of 2</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-[#E8EBF0] rounded-full mb-8">
        <div
          className="h-full bg-[#1EB6D2] rounded-full transition-all"
          style={{ width: `${(step / 2) * 100}%` }}
        />
      </div>

      {step === 1 ? (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl border border-[#E8EBF0] p-6"
        >
          <h2 className="text-lg font-semibold text-[#0B1C3F] mb-6">Deck Details</h2>
          
          <div className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-[#0B1C3F] mb-2">
                Deck Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Biology 101"
                className="w-full px-4 py-3 border border-[#E8EBF0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1EB6D2] focus:border-transparent"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-[#0B1C3F] mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What is this deck about?"
                rows={3}
                className="w-full px-4 py-3 border border-[#E8EBF0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1EB6D2] focus:border-transparent resize-none"
              />
            </div>

            {/* Icon selection */}
            <div>
              <label className="block text-sm font-medium text-[#0B1C3F] mb-2">
                Icon
              </label>
              <div className="flex flex-wrap gap-2">
                {deckIcons.map((icon) => (
                  <button
                    key={icon}
                    onClick={() => setSelectedIcon(icon)}
                    className={`w-12 h-12 rounded-xl text-2xl flex items-center justify-center transition-all ${
                      selectedIcon === icon
                        ? "bg-[#1EB6D2]/20 ring-2 ring-[#1EB6D2]"
                        : "bg-[#F7F8FA] hover:bg-[#E8EBF0]"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Color selection */}
            <div>
              <label className="block text-sm font-medium text-[#0B1C3F] mb-2">
                Color
              </label>
              <div className="flex flex-wrap gap-2">
                {deckColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-xl transition-all ${
                      selectedColor === color ? "ring-2 ring-offset-2 ring-[#0B1C3F]" : ""
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-[#0B1C3F] mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g., science, biology, cells"
                className="w-full px-4 py-3 border border-[#E8EBF0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1EB6D2] focus:border-transparent"
              />
            </div>

            {/* Public toggle */}
            <label className="flex items-center justify-between p-4 bg-[#F7F8FA] rounded-xl cursor-pointer">
              <div>
                <p className="font-medium text-[#0B1C3F]">Make deck public</p>
                <p className="text-sm text-[#6B7280]">Others can discover and study this deck</p>
              </div>
              <button
                onClick={() => setIsPublic(!isPublic)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  isPublic ? "bg-[#1EB6D2]" : "bg-[#E8EBF0]"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    isPublic ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </label>
          </div>

          <div className="flex justify-end mt-8">
            <button
              onClick={() => setStep(2)}
              disabled={!title.trim()}
              className="px-6 py-3 text-white rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50"
              style={{ background: "linear-gradient(to right, #1EB6D2, #0B1C3F)" }}
            >
              Continue
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Creation method selection */}
          <div className="bg-white rounded-2xl border border-[#E8EBF0] p-6">
            <h2 className="text-lg font-semibold text-[#0B1C3F] mb-4">Add Cards</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <button
                onClick={() => setCreationMethod("manual")}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  creationMethod === "manual"
                    ? "border-[#1EB6D2] bg-[#1EB6D2]/5"
                    : "border-[#E8EBF0] hover:border-[#1EB6D2]/50"
                }`}
              >
                <Plus className="w-6 h-6 text-[#1EB6D2] mb-2" />
                <p className="font-medium text-[#0B1C3F]">Manual</p>
                <p className="text-xs text-[#6B7280]">Create cards one by one</p>
              </button>
              <button
                onClick={() => setCreationMethod("ai")}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  creationMethod === "ai"
                    ? "border-[#1EB6D2] bg-[#1EB6D2]/5"
                    : "border-[#E8EBF0] hover:border-[#1EB6D2]/50"
                }`}
              >
                <Sparkles className="w-6 h-6 text-[#F8C14D] mb-2" />
                <p className="font-medium text-[#0B1C3F]">AI Generate</p>
                <p className="text-xs text-[#6B7280]">Generate from text</p>
              </button>
              <button
                onClick={() => setCreationMethod("import")}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  creationMethod === "import"
                    ? "border-[#1EB6D2] bg-[#1EB6D2]/5"
                    : "border-[#E8EBF0] hover:border-[#1EB6D2]/50"
                }`}
              >
                <Upload className="w-6 h-6 text-[#8B5CF6] mb-2" />
                <p className="font-medium text-[#0B1C3F]">Import</p>
                <p className="text-xs text-[#6B7280]">Upload file or URL</p>
              </button>
            </div>
          </div>

          {/* Manual card creation */}
          {creationMethod === "manual" && (
            <div className="bg-white rounded-2xl border border-[#E8EBF0] p-6">
              <div className="space-y-4">
                {manualCards.map((card, index) => (
                  <div key={index} className="p-4 bg-[#F7F8FA] rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-[#6B7280]">Card {index + 1}</span>
                      {manualCards.length > 1 && (
                        <button
                          onClick={() => removeManualCard(index)}
                          className="p-1 hover:bg-red-100 rounded text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-[#6B7280] mb-1">Front (Question)</label>
                        <textarea
                          value={card.front}
                          onChange={(e) => updateManualCard(index, "front", e.target.value)}
                          placeholder="Enter question..."
                          rows={2}
                          className="w-full px-3 py-2 border border-[#E8EBF0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1EB6D2] focus:border-transparent resize-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#6B7280] mb-1">Back (Answer)</label>
                        <textarea
                          value={card.back}
                          onChange={(e) => updateManualCard(index, "back", e.target.value)}
                          placeholder="Enter answer..."
                          rows={2}
                          className="w-full px-3 py-2 border border-[#E8EBF0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1EB6D2] focus:border-transparent resize-none text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={addManualCard}
                className="mt-4 flex items-center gap-2 px-4 py-2 text-[#1EB6D2] hover:bg-[#1EB6D2]/10 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Card
              </button>
            </div>
          )}

          {/* AI generation */}
          {creationMethod === "ai" && (
            <div className="bg-white rounded-2xl border border-[#E8EBF0] p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#0B1C3F] mb-2">
                    Paste your content
                  </label>
                  <textarea
                    value={aiContent}
                    onChange={(e) => setAiContent(e.target.value)}
                    placeholder="Paste your notes, text, or any learning material here..."
                    rows={6}
                    className="w-full px-4 py-3 border border-[#E8EBF0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1EB6D2] focus:border-transparent resize-none"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0B1C3F] mb-2">
                      Number of cards
                    </label>
                    <select
                      value={aiCardCount}
                      onChange={(e) => setAiCardCount(Number(e.target.value))}
                      className="px-4 py-2 border border-[#E8EBF0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1EB6D2]"
                    >
                      <option value={5}>5 cards</option>
                      <option value={10}>10 cards</option>
                      <option value={15}>15 cards</option>
                      <option value={20}>20 cards</option>
                    </select>
                  </div>
                  <button
                    onClick={generateAICards}
                    disabled={!aiContent.trim() || isGenerating}
                    className="mt-6 flex items-center gap-2 px-6 py-2.5 text-white rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50"
                    style={{ background: "linear-gradient(to right, #F8C14D, #F97316)" }}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-5 h-5" />
                        Generate Cards
                      </>
                    )}
                  </button>
                </div>

                {/* Generated cards preview */}
                {generatedCards.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-[#E8EBF0]">
                    <h3 className="font-medium text-[#0B1C3F] mb-4">
                      Generated Cards ({generatedCards.length})
                    </h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {generatedCards.map((card, index) => (
                        <div key={index} className="p-3 bg-[#F7F8FA] rounded-lg">
                          <p className="text-sm font-medium text-[#0B1C3F]">{card.front}</p>
                          <p className="text-sm text-[#6B7280] mt-1">{card.back}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Import */}
          {creationMethod === "import" && (
            <div className="bg-white rounded-2xl border border-[#E8EBF0] p-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-6 border-2 border-dashed border-[#E8EBF0] rounded-xl text-center hover:border-[#1EB6D2] transition-colors cursor-pointer">
                  <FileText className="w-10 h-10 text-[#6B7280] mx-auto mb-3" />
                  <p className="font-medium text-[#0B1C3F]">Upload File</p>
                  <p className="text-sm text-[#6B7280] mt-1">PDF, DOCX, TXT</p>
                </div>
                <div className="p-6 border-2 border-dashed border-[#E8EBF0] rounded-xl text-center hover:border-[#1EB6D2] transition-colors cursor-pointer">
                  <LinkIcon className="w-10 h-10 text-[#6B7280] mx-auto mb-3" />
                  <p className="font-medium text-[#0B1C3F]">Import from URL</p>
                  <p className="text-sm text-[#6B7280] mt-1">Webpage, Article</p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 border border-[#E8EBF0] rounded-xl font-medium text-[#0B1C3F] hover:bg-[#F7F8FA] transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleCreate}
              className="px-6 py-3 text-white rounded-xl font-medium hover:opacity-90 transition-all"
              style={{ background: "linear-gradient(to right, #1EB6D2, #0B1C3F)" }}
            >
              Create Deck
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
