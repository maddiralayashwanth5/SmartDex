"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Moon,
  Volume2,
  Globe,
  Save,
  Camera,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function SettingsPage() {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState("profile");
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [notifications, setNotifications] = useState({
    studyReminders: true,
    achievements: true,
    weeklyReport: false,
    marketing: false,
  });
  const [preferences, setPreferences] = useState({
    darkMode: false,
    soundEffects: true,
    language: "en",
    dailyGoal: 20,
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "preferences", label: "Preferences", icon: Moon },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#0B1C3F]">Settings</h1>
        <p className="text-[#6B7280]">Manage your account and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-56 shrink-0">
          <div className="bg-white rounded-2xl border border-[#E8EBF0] p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-colors ${
                  activeTab === tab.id
                    ? "bg-[#1EB6D2]/10 text-[#1EB6D2]"
                    : "text-[#6B7280] hover:bg-[#F7F8FA]"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-[#E8EBF0] p-6"
          >
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-[#0B1C3F]">Profile Settings</h2>
                
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-[#1EB6D2]/20 flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#1EB6D2]">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#1EB6D2] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#1EB6D2]/90 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <p className="font-medium text-[#0B1C3F]">{user?.name}</p>
                    <p className="text-sm text-[#6B7280]">{user?.plan} plan</p>
                  </div>
                </div>

                {/* Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#0B1C3F] mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-[#E8EBF0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1EB6D2] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#0B1C3F] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-[#E8EBF0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1EB6D2] focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  className="flex items-center gap-2 px-6 py-3 text-white rounded-xl font-medium hover:opacity-90 transition-all"
                  style={{ background: "linear-gradient(to right, #1EB6D2, #0B1C3F)" }}
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-[#0B1C3F]">Notification Settings</h2>
                
                <div className="space-y-4">
                  {[
                    { key: "studyReminders", label: "Study Reminders", desc: "Get reminded when you have cards due" },
                    { key: "achievements", label: "Achievements", desc: "Notifications for unlocked achievements" },
                    { key: "weeklyReport", label: "Weekly Report", desc: "Receive a weekly progress summary" },
                    { key: "marketing", label: "Marketing", desc: "Updates about new features and tips" },
                  ].map((item) => (
                    <label
                      key={item.key}
                      className="flex items-center justify-between p-4 bg-[#F7F8FA] rounded-xl cursor-pointer"
                    >
                      <div>
                        <p className="font-medium text-[#0B1C3F]">{item.label}</p>
                        <p className="text-sm text-[#6B7280]">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          notifications[item.key as keyof typeof notifications] ? "bg-[#1EB6D2]" : "bg-[#E8EBF0]"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                            notifications[item.key as keyof typeof notifications] ? "translate-x-6" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "preferences" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-[#0B1C3F]">Preferences</h2>
                
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 bg-[#F7F8FA] rounded-xl cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Moon className="w-5 h-5 text-[#6B7280]" />
                      <div>
                        <p className="font-medium text-[#0B1C3F]">Dark Mode</p>
                        <p className="text-sm text-[#6B7280]">Use dark theme</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setPreferences(prev => ({ ...prev, darkMode: !prev.darkMode }))}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        preferences.darkMode ? "bg-[#1EB6D2]" : "bg-[#E8EBF0]"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          preferences.darkMode ? "translate-x-6" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </label>

                  <label className="flex items-center justify-between p-4 bg-[#F7F8FA] rounded-xl cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Volume2 className="w-5 h-5 text-[#6B7280]" />
                      <div>
                        <p className="font-medium text-[#0B1C3F]">Sound Effects</p>
                        <p className="text-sm text-[#6B7280]">Play sounds during study</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setPreferences(prev => ({ ...prev, soundEffects: !prev.soundEffects }))}
                      className={`w-12 h-6 rounded-full transition-colors ${
                        preferences.soundEffects ? "bg-[#1EB6D2]" : "bg-[#E8EBF0]"
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          preferences.soundEffects ? "translate-x-6" : "translate-x-0.5"
                        }`}
                      />
                    </button>
                  </label>

                  <div className="p-4 bg-[#F7F8FA] rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <Globe className="w-5 h-5 text-[#6B7280]" />
                      <p className="font-medium text-[#0B1C3F]">Language</p>
                    </div>
                    <select
                      value={preferences.language}
                      onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                      className="w-full px-4 py-2 border border-[#E8EBF0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1EB6D2]"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                    </select>
                  </div>

                  <div className="p-4 bg-[#F7F8FA] rounded-xl">
                    <p className="font-medium text-[#0B1C3F] mb-3">Daily Goal</p>
                    <p className="text-sm text-[#6B7280] mb-3">Cards to study per day</p>
                    <input
                      type="range"
                      min="5"
                      max="100"
                      value={preferences.dailyGoal}
                      onChange={(e) => setPreferences(prev => ({ ...prev, dailyGoal: Number(e.target.value) }))}
                      className="w-full"
                    />
                    <p className="text-center font-medium text-[#1EB6D2] mt-2">{preferences.dailyGoal} cards</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "billing" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-[#0B1C3F]">Billing & Subscription</h2>
                
                <div className="p-6 rounded-xl border-2 border-[#1EB6D2] bg-[#1EB6D2]/5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold text-[#0B1C3F]">Pro Plan</p>
                      <p className="text-sm text-[#6B7280]">$12/month</p>
                    </div>
                    <span className="px-3 py-1 bg-[#1EB6D2] text-white text-sm font-medium rounded-full">
                      Active
                    </span>
                  </div>
                  <p className="text-sm text-[#6B7280]">
                    Next billing date: December 15, 2024
                  </p>
                </div>

                <div className="space-y-3">
                  <button className="w-full py-3 border border-[#E8EBF0] rounded-xl font-medium text-[#0B1C3F] hover:bg-[#F7F8FA] transition-colors">
                    Update Payment Method
                  </button>
                  <button className="w-full py-3 border border-[#E8EBF0] rounded-xl font-medium text-[#0B1C3F] hover:bg-[#F7F8FA] transition-colors">
                    View Billing History
                  </button>
                  <button className="w-full py-3 border border-red-200 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-colors">
                    Cancel Subscription
                  </button>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-[#0B1C3F]">Security</h2>
                
                <div className="space-y-4">
                  <div className="p-4 bg-[#F7F8FA] rounded-xl">
                    <p className="font-medium text-[#0B1C3F] mb-1">Password</p>
                    <p className="text-sm text-[#6B7280] mb-3">Last changed 30 days ago</p>
                    <button className="px-4 py-2 border border-[#E8EBF0] rounded-lg text-sm font-medium text-[#0B1C3F] hover:bg-white transition-colors">
                      Change Password
                    </button>
                  </div>

                  <div className="p-4 bg-[#F7F8FA] rounded-xl">
                    <p className="font-medium text-[#0B1C3F] mb-1">Two-Factor Authentication</p>
                    <p className="text-sm text-[#6B7280] mb-3">Add an extra layer of security</p>
                    <button className="px-4 py-2 bg-[#1EB6D2] text-white rounded-lg text-sm font-medium hover:bg-[#1EB6D2]/90 transition-colors">
                      Enable 2FA
                    </button>
                  </div>

                  <div className="p-4 bg-[#F7F8FA] rounded-xl">
                    <p className="font-medium text-[#0B1C3F] mb-1">Active Sessions</p>
                    <p className="text-sm text-[#6B7280] mb-3">Manage your active sessions</p>
                    <button className="px-4 py-2 border border-[#E8EBF0] rounded-lg text-sm font-medium text-[#0B1C3F] hover:bg-white transition-colors">
                      View Sessions
                    </button>
                  </div>

                  <div className="pt-4 border-t border-[#E8EBF0]">
                    <button className="text-red-600 text-sm font-medium hover:underline">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
