"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Library,
  Brain,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  Sparkles,
  ChevronLeft,
  Plus,
  Gamepad2,
  Crown,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

const mainNavItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Decks", href: "/dashboard/decks", icon: Library },
  { name: "Study", href: "/dashboard/study", icon: Brain },
  { name: "Quiz", href: "/dashboard/quiz", icon: Gamepad2 },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
];

const bottomNavItems = [
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Help", href: "/dashboard/help", icon: HelpCircle },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout, sidebarOpen, setSidebarOpen } = useApp();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: sidebarOpen ? 280 : 80,
          x: 0 
        }}
        className={`fixed left-0 top-0 h-full bg-white border-r border-[#E8EBF0] z-50 flex flex-col transition-all duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-[#E8EBF0]">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg shrink-0"
              style={{ background: "linear-gradient(to bottom right, #1EB6D2, #0B1C3F)" }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-bold text-[#0B1C3F]"
              >
                Smart<span className="text-[#1EB6D2]">Dex</span>
              </motion.span>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex w-8 h-8 items-center justify-center rounded-lg hover:bg-[#F7F8FA] transition-colors"
          >
            <ChevronLeft className={`w-5 h-5 text-[#6B7280] transition-transform ${!sidebarOpen ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Create button */}
        <div className="p-4">
          <Link
            href="/dashboard/decks/new"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-medium transition-all hover:opacity-90"
            style={{ background: "linear-gradient(to right, #1EB6D2, #0B1C3F)" }}
          >
            <Plus className="w-5 h-5" />
            {sidebarOpen && <span>Create Deck</span>}
          </Link>
        </div>

        {/* Main navigation */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? "bg-[#1EB6D2]/10 text-[#1EB6D2]"
                    : "text-[#6B7280] hover:bg-[#F7F8FA] hover:text-[#0B1C3F]"
                }`}
              >
                <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-[#1EB6D2]" : ""}`} />
                {sidebarOpen && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-medium"
                  >
                    {item.name}
                  </motion.span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Pro upgrade card */}
        {sidebarOpen && user?.plan === "free" && (
          <div className="mx-4 mb-4 p-4 rounded-xl bg-gradient-to-br from-[#F8C14D]/20 to-[#F8C14D]/5 border border-[#F8C14D]/30">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="w-5 h-5 text-[#F8C14D]" />
              <span className="font-semibold text-[#0B1C3F]">Upgrade to Pro</span>
            </div>
            <p className="text-xs text-[#6B7280] mb-3">
              Unlock unlimited decks, AI generation, and more.
            </p>
            <Link
              href="/dashboard/settings/billing"
              className="block w-full py-2 text-center bg-[#F8C14D] text-[#0B1C3F] rounded-lg text-sm font-medium hover:bg-[#F8C14D]/90 transition-colors"
            >
              Upgrade Now
            </Link>
          </div>
        )}

        {/* Bottom navigation */}
        <div className="border-t border-[#E8EBF0] px-3 py-2">
          {bottomNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? "bg-[#1EB6D2]/10 text-[#1EB6D2]"
                    : "text-[#6B7280] hover:bg-[#F7F8FA] hover:text-[#0B1C3F]"
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.name}</span>}
              </Link>
            );
          })}
          
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-[#6B7280] hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>

        {/* User profile */}
        {sidebarOpen && user && (
          <div className="p-4 border-t border-[#E8EBF0]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1EB6D2]/20 flex items-center justify-center">
                <span className="text-[#1EB6D2] font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[#0B1C3F] truncate">{user.name}</p>
                <p className="text-xs text-[#6B7280] truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}
      </motion.aside>

      {/* Logout confirmation modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4"
            onClick={() => setShowLogoutConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
            >
              <h3 className="text-lg font-bold text-[#0B1C3F] mb-2">Logout</h3>
              <p className="text-[#6B7280] mb-6">Are you sure you want to logout?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-2.5 border border-[#E8EBF0] rounded-xl font-medium text-[#0B1C3F] hover:bg-[#F7F8FA] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
