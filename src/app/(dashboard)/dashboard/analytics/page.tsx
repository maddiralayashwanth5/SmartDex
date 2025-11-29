"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Clock,
  Target,
  Flame,
  Brain,
  Calendar,
  Award,
  BarChart3,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function AnalyticsPage() {
  const { user, decks, flashcards, dailyProgress } = useApp();

  // Calculate overall stats
  const totalCards = flashcards.length;
  const masteredCards = flashcards.filter(c => c.status === "mastered").length;
  const learningCards = flashcards.filter(c => c.status === "learning").length;
  const reviewCards = flashcards.filter(c => c.status === "review").length;
  const newCards = flashcards.filter(c => c.status === "new").length;

  const avgAccuracy = dailyProgress.length > 0
    ? Math.round(dailyProgress.reduce((sum, d) => sum + d.accuracy, 0) / dailyProgress.length)
    : 0;

  const totalStudyTime = dailyProgress.reduce((sum, d) => sum + d.studyTime, 0);
  const totalCardsStudied = dailyProgress.reduce((sum, d) => sum + d.cardsStudied, 0);

  const stats = [
    { label: "Total Cards", value: totalCards, icon: Brain, color: "#1EB6D2" },
    { label: "Mastered", value: masteredCards, icon: Target, color: "#10B981" },
    { label: "Study Streak", value: `${user?.streak || 0} days`, icon: Flame, color: "#F8C14D" },
    { label: "Avg Accuracy", value: `${avgAccuracy}%`, icon: TrendingUp, color: "#8B5CF6" },
  ];

  // Get last 7 days for chart
  const last7Days = dailyProgress.slice(-7);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0B1C3F]">Analytics</h1>
        <p className="text-[#6B7280]">Track your learning progress and performance</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-5 border border-[#E8EBF0]"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ backgroundColor: `${stat.color}15` }}
            >
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
            </div>
            <p className="text-2xl font-bold text-[#0B1C3F]">{stat.value}</p>
            <p className="text-sm text-[#6B7280]">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly activity chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-[#E8EBF0] p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-[#0B1C3F]">Weekly Activity</h2>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#1EB6D2]" />
                <span className="text-[#6B7280]">Cards Studied</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                <span className="text-[#6B7280]">Mastered</span>
              </div>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-3">
            {last7Days.map((day, index) => {
              const maxCards = Math.max(...last7Days.map(d => d.cardsStudied), 1);
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col gap-1 h-48">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.cardsStudied / maxCards) * 100}%` }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="w-full rounded-t-lg bg-[#1EB6D2]"
                    />
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.cardsMastered / maxCards) * 100}%` }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className="w-full rounded-b-lg bg-[#10B981]"
                    />
                  </div>
                  <span className="text-xs text-[#6B7280]">
                    {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Card status breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-[#E8EBF0] p-6"
        >
          <h2 className="font-semibold text-[#0B1C3F] mb-6">Card Status</h2>
          <div className="space-y-4">
            {[
              { label: "Mastered", count: masteredCards, color: "#10B981" },
              { label: "Review", count: reviewCards, color: "#1EB6D2" },
              { label: "Learning", count: learningCards, color: "#F8C14D" },
              { label: "New", count: newCards, color: "#6B7280" },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-[#0B1C3F]">{item.label}</span>
                  <span className="text-sm font-medium text-[#0B1C3F]">{item.count}</span>
                </div>
                <div className="h-2 bg-[#E8EBF0] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${totalCards > 0 ? (item.count / totalCards) * 100 : 0}%` }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Pie chart visual */}
          <div className="mt-6 flex justify-center">
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                {totalCards > 0 && (
                  <>
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="transparent"
                      stroke="#10B981"
                      strokeWidth="3"
                      strokeDasharray={`${(masteredCards / totalCards) * 100} 100`}
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="transparent"
                      stroke="#1EB6D2"
                      strokeWidth="3"
                      strokeDasharray={`${(reviewCards / totalCards) * 100} 100`}
                      strokeDashoffset={`-${(masteredCards / totalCards) * 100}`}
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="transparent"
                      stroke="#F8C14D"
                      strokeWidth="3"
                      strokeDasharray={`${(learningCards / totalCards) * 100} 100`}
                      strokeDashoffset={`-${((masteredCards + reviewCards) / totalCards) * 100}`}
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.915"
                      fill="transparent"
                      stroke="#6B7280"
                      strokeWidth="3"
                      strokeDasharray={`${(newCards / totalCards) * 100} 100`}
                      strokeDashoffset={`-${((masteredCards + reviewCards + learningCards) / totalCards) * 100}`}
                    />
                  </>
                )}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xl font-bold text-[#0B1C3F]">{totalCards}</p>
                  <p className="text-xs text-[#6B7280]">Total</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Deck performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl border border-[#E8EBF0] overflow-hidden"
      >
        <div className="p-6 border-b border-[#E8EBF0]">
          <h2 className="font-semibold text-[#0B1C3F]">Deck Performance</h2>
        </div>
        <div className="divide-y divide-[#E8EBF0]">
          {decks.map((deck) => {
            const progress = deck.cardCount > 0 ? (deck.masteredCount / deck.cardCount) * 100 : 0;
            return (
              <div key={deck.id} className="flex items-center gap-4 p-4 hover:bg-[#F7F8FA] transition-colors">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{ backgroundColor: `${deck.color}20` }}
                >
                  {deck.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-[#0B1C3F] truncate">{deck.title}</h3>
                  <p className="text-sm text-[#6B7280]">
                    {deck.cardCount} cards · {deck.masteredCount} mastered
                  </p>
                </div>
                <div className="w-32 hidden sm:block">
                  <div className="h-2 bg-[#E8EBF0] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${progress}%`, backgroundColor: deck.color }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#0B1C3F]">{Math.round(progress)}%</p>
                  <p className="text-xs text-[#6B7280]">Complete</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Summary stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl border border-[#E8EBF0] p-6 text-center"
        >
          <Clock className="w-8 h-8 text-[#1EB6D2] mx-auto mb-3" />
          <p className="text-3xl font-bold text-[#0B1C3F]">{Math.round(totalStudyTime / 60)}h</p>
          <p className="text-sm text-[#6B7280]">Total Study Time</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="bg-white rounded-2xl border border-[#E8EBF0] p-6 text-center"
        >
          <BarChart3 className="w-8 h-8 text-[#F8C14D] mx-auto mb-3" />
          <p className="text-3xl font-bold text-[#0B1C3F]">{totalCardsStudied}</p>
          <p className="text-sm text-[#6B7280]">Cards Reviewed</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl border border-[#E8EBF0] p-6 text-center"
        >
          <Award className="w-8 h-8 text-[#8B5CF6] mx-auto mb-3" />
          <p className="text-3xl font-bold text-[#0B1C3F]">{decks.length}</p>
          <p className="text-sm text-[#6B7280]">Active Decks</p>
        </motion.div>
      </div>
    </div>
  );
}
