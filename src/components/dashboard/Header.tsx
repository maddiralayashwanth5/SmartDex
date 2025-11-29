"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  Menu,
  Flame,
  X,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function Header() {
  const { user, sidebarOpen, setSidebarOpen } = useApp();
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const notifications = [
    { id: 1, title: "Study reminder", message: "You have 15 cards due for review", time: "5 min ago", unread: true },
    { id: 2, title: "Achievement unlocked!", message: "You've completed a 7-day streak!", time: "1 hour ago", unread: true },
    { id: 3, title: "New feature", message: "Try our new AI voice mode", time: "Yesterday", unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="h-16 bg-white border-b border-[#E8EBF0] flex items-center justify-between px-4 lg:px-6">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 hover:bg-[#F7F8FA] rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-[#6B7280]" />
        </button>

        {/* Search */}
        <div className="hidden md:flex items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search decks, cards..."
              className="w-64 lg:w-80 pl-10 pr-4 py-2 bg-[#F7F8FA] border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1EB6D2] focus:border-transparent focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Mobile search button */}
        <button
          onClick={() => setShowSearch(true)}
          className="md:hidden p-2 hover:bg-[#F7F8FA] rounded-lg transition-colors"
        >
          <Search className="w-5 h-5 text-[#6B7280]" />
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Streak */}
        {user && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#F8C14D]/10 rounded-full">
            <Flame className="w-4 h-4 text-[#F8C14D]" />
            <span className="text-sm font-semibold text-[#0B1C3F]">{user.streak}</span>
            <span className="text-xs text-[#6B7280]">day streak</span>
          </div>
        )}

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 hover:bg-[#F7F8FA] rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5 text-[#6B7280]" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowNotifications(false)} 
                />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#E8EBF0] z-50 overflow-hidden"
                >
                  <div className="p-4 border-b border-[#E8EBF0] flex items-center justify-between">
                    <h3 className="font-semibold text-[#0B1C3F]">Notifications</h3>
                    <button className="text-xs text-[#1EB6D2] hover:underline">
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-[#E8EBF0] last:border-0 hover:bg-[#F7F8FA] transition-colors cursor-pointer ${
                          notification.unread ? "bg-[#1EB6D2]/5" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {notification.unread && (
                            <div className="w-2 h-2 bg-[#1EB6D2] rounded-full mt-2 shrink-0" />
                          )}
                          <div className={notification.unread ? "" : "ml-5"}>
                            <p className="font-medium text-[#0B1C3F] text-sm">
                              {notification.title}
                            </p>
                            <p className="text-xs text-[#6B7280] mt-0.5">
                              {notification.message}
                            </p>
                            <p className="text-xs text-[#6B7280]/70 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-[#E8EBF0]">
                    <button className="w-full py-2 text-center text-sm text-[#1EB6D2] hover:bg-[#1EB6D2]/10 rounded-lg transition-colors">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* User avatar */}
        {user && (
          <button className="w-9 h-9 rounded-full bg-[#1EB6D2]/20 flex items-center justify-center hover:ring-2 hover:ring-[#1EB6D2]/30 transition-all">
            <span className="text-[#1EB6D2] font-semibold text-sm">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </button>
        )}
      </div>

      {/* Mobile search overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-50 p-4"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSearch(false)}
                className="p-2 hover:bg-[#F7F8FA] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#6B7280]" />
              </button>
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search decks, cards..."
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 bg-[#F7F8FA] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1EB6D2]"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
