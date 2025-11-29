"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Building } from "lucide-react";

const plans = [
  {
    name: "Free",
    icon: Sparkles,
    description: "Perfect for getting started",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "Up to 100 flashcards",
      "Basic AI generation",
      "Spaced repetition",
      "Mobile app access",
      "Community support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    icon: Zap,
    description: "For serious learners",
    monthlyPrice: 12,
    yearlyPrice: 99,
    features: [
      "Unlimited flashcards",
      "Advanced AI generation",
      "PDF & document upload",
      "Voice mode",
      "Detailed analytics",
      "Quiz mode",
      "Priority support",
      "Cross-device sync",
    ],
    cta: "Start Pro Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    icon: Building,
    description: "For teams & organizations",
    monthlyPrice: 49,
    yearlyPrice: 399,
    features: [
      "Everything in Pro",
      "Team management",
      "Custom branding",
      "API access",
      "SSO integration",
      "Dedicated support",
      "Custom AI training",
      "Analytics dashboard",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-[#1EB6D2]/10 text-[#1EB6D2] rounded-full text-sm font-medium mb-4">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1C3F] mb-4 font-[family-name:var(--font-poppins)]">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            Choose the plan that fits your learning goals. Upgrade or downgrade anytime.
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center items-center gap-4 mb-12"
        >
          <span className={`text-sm font-medium ${!isYearly ? "text-[#0B1C3F]" : "text-[#6B7280]"}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative w-14 h-7 bg-[#E8EBF0] rounded-full transition-colors"
            style={{ backgroundColor: isYearly ? "#1EB6D2" : "#E8EBF0" }}
          >
            <motion.div
              className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
              animate={{ left: isYearly ? "calc(100% - 24px)" : "4px" }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <span className={`text-sm font-medium ${isYearly ? "text-[#0B1C3F]" : "text-[#6B7280]"}`}>
            Yearly
          </span>
          {isYearly && (
            <span className="px-2 py-1 bg-[#F8C14D]/20 text-[#0B1C3F] text-xs font-medium rounded-full">
              Save 30%
            </span>
          )}
        </motion.div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 ${
                plan.popular
                  ? "bg-gradient-to-br from-[#0B1C3F] to-[#132952] text-white shadow-2xl scale-105"
                  : "bg-white border border-[#E8EBF0] shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#F8C14D] text-[#0B1C3F] text-sm font-bold rounded-full">
                  Most Popular
                </div>
              )}

              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  plan.popular ? "bg-[#1EB6D2]/20" : "bg-[#1EB6D2]/10"
                }`}
              >
                <plan.icon className={`w-6 h-6 ${plan.popular ? "text-[#1EB6D2]" : "text-[#1EB6D2]"}`} />
              </div>

              {/* Plan name */}
              <h3 className={`text-xl font-bold mb-1 font-[family-name:var(--font-poppins)] ${
                plan.popular ? "text-white" : "text-[#0B1C3F]"
              }`}>
                {plan.name}
              </h3>
              <p className={`text-sm mb-4 ${plan.popular ? "text-white/70" : "text-[#6B7280]"}`}>
                {plan.description}
              </p>

              {/* Price */}
              <div className="mb-6">
                <span className={`text-4xl font-bold ${plan.popular ? "text-white" : "text-[#0B1C3F]"}`}>
                  ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className={`text-sm ${plan.popular ? "text-white/70" : "text-[#6B7280]"}`}>
                  /{isYearly ? "year" : "month"}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        plan.popular ? "bg-[#1EB6D2]/20" : "bg-[#1EB6D2]/10"
                      }`}
                    >
                      <Check className="w-3 h-3 text-[#1EB6D2]" />
                    </div>
                    <span className={`text-sm ${plan.popular ? "text-white/90" : "text-[#6B7280]"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full py-3 rounded-full font-semibold transition-all hover:scale-105 ${
                  plan.popular
                    ? "bg-[#1EB6D2] text-white hover:bg-[#1EB6D2]/90"
                    : "bg-[#0B1C3F] text-white hover:bg-[#0B1C3F]/90"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Money back guarantee */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-[#6B7280] text-sm mt-8"
        >
          30-day money-back guarantee • No credit card required for free plan
        </motion.p>
      </div>
    </section>
  );
}
