"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Brain,
  TrendingUp,
  Clock,
  Target,
  ArrowRight,
  Flame,
  BookOpen,
  Zap,
  Calendar,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function DashboardPage() {
  const { user, decks, dailyProgress, flashcards } = useApp();

  // Calculate stats
  const todayProgress = dailyProgress[dailyProgress.length - 1];
  const totalCards = decks.reduce((sum, deck) => sum + deck.cardCount, 0);
  const masteredCards = decks.reduce((sum, deck) => sum + deck.masteredCount, 0);
  const dueCards = flashcards.filter(card => new Date(card.nextReview) <= new Date()).length;

  const stats = [
    {
      label: "Cards Due",
      value: dueCards,
      icon: Brain,
      color: "#1EB6D2",
      bgColor: "#1EB6D2/10",
    },
    {
      label: "Mastered",
      value: masteredCards,
      icon: Target,
      color: "#10B981",
      bgColor: "#10B981/10",
    },
    {
      label: "Study Time",
      value: `${Math.round((user?.totalStudyTime || 0) / 60)}h`,
      icon: Clock,
      color: "#F8C14D",
      bgColor: "#F8C14D/10",
    },
    {
      label: "Retention",
      value: `${todayProgress?.accuracy || 0}%`,
      icon: TrendingUp,
      color: "#8B5CF6",
      bgColor: "#8B5CF6/10",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-[#0B1C3F]">
            Welcome back, {user?.name?.split(" ")[0] || "Learner"}! 👋
          </h1>
          <p className="text-[#6B7280] mt-1">
            You have <span className="font-semibold text-[#1EB6D2]">{dueCards} cards</span> due for review today
          </p>
        </div>
        <Link
          href="/dashboard/study"
          className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-xl font-medium hover:opacity-90 transition-all"
          style={{ background: "linear-gradient(to right, #1EB6D2, #0B1C3F)" }}
        >
          <Brain className="w-5 h-5" />
          Start Studying
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>

      {/* Stats grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 border border-[#E8EBF0] hover:shadow-lg transition-shadow"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ backgroundColor: `${stat.color}15` }}
            >
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
            </div>
            <p className="text-2xl font-bold text-[#0B1C3F]">{stat.value}</p>
            <p className="text-sm text-[#6B7280]">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent decks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-[#E8EBF0] overflow-hidden"
        >
          <div className="p-5 border-b border-[#E8EBF0] flex items-center justify-between">
            <h2 className="font-semibold text-[#0B1C3F]">Recent Decks</h2>
            <Link href="/dashboard/decks" className="text-sm text-[#1EB6D2] hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-[#E8EBF0]">
            {decks.slice(0, 4).map((deck) => (
              <Link
                key={deck.id}
                href={`/dashboard/decks/${deck.id}`}
                className="flex items-center gap-4 p-4 hover:bg-[#F7F8FA] transition-colors"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
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
                <div className="text-right">
                  <div className="w-16 h-2 bg-[#E8EBF0] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(deck.masteredCount / deck.cardCount) * 100}%`,
                        backgroundColor: deck.color,
                      }}
                    />
                  </div>
                  <p className="text-xs text-[#6B7280] mt-1">
                    {Math.round((deck.masteredCount / deck.cardCount) * 100)}%
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Streak & Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          {/* Streak card */}
          <div 
            className="rounded-2xl p-5 text-white"
            style={{ background: "linear-gradient(to bottom right, #0B1C3F, #132952)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#F8C14D]/20 flex items-center justify-center">
                <Flame className="w-6 h-6 text-[#F8C14D]" />
              </div>
              <div>
                <p className="text-3xl font-bold">{user?.streak || 0}</p>
                <p className="text-white/70 text-sm">Day Streak</p>
              </div>
            </div>
            <p className="text-white/80 text-sm">
              Keep it up! Study today to maintain your streak.
            </p>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-2xl border border-[#E8EBF0] p-5">
            <h3 className="font-semibold text-[#0B1C3F] mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link
                href="/dashboard/decks/new"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F7F8FA] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#1EB6D2]/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-[#1EB6D2]" />
                </div>
                <span className="font-medium text-[#0B1C3F]">Create New Deck</span>
              </Link>
              <Link
                href="/dashboard/quiz"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F7F8FA] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#F8C14D]/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#F8C14D]" />
                </div>
                <span className="font-medium text-[#0B1C3F]">Take a Quiz</span>
              </Link>
              <Link
                href="/dashboard/analytics"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F7F8FA] transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#8B5CF6]" />
                </div>
                <span className="font-medium text-[#0B1C3F]">View Progress</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Weekly progress chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl border border-[#E8EBF0] p-5"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-[#0B1C3F]">Weekly Activity</h2>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#1EB6D2]" />
              <span className="text-[#6B7280]">Cards Studied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#F8C14D]" />
              <span className="text-[#6B7280]">Mastered</span>
            </div>
          </div>
        </div>
        <div className="h-48 flex items-end justify-between gap-2">
          {dailyProgress.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex flex-col gap-1" style={{ height: "160px" }}>
                <div
                  className="w-full rounded-t-lg bg-[#1EB6D2] transition-all"
                  style={{ height: `${(day.cardsStudied / 80) * 100}%` }}
                />
                <div
                  className="w-full rounded-b-lg bg-[#F8C14D] transition-all"
                  style={{ height: `${(day.cardsMastered / 80) * 100}%` }}
                />
              </div>
              <span className="text-xs text-[#6B7280]">
                {new Date(day.date).toLocaleDateString("en-US", { weekday: "short" })}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
