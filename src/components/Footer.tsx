"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Mail, 
  MapPin, 
  Phone,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Send,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const footerLinks = {
  Product: [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Use Cases", href: "#use-cases" },
    { name: "API", href: "#" },
    { name: "Integrations", href: "#" },
  ],
  Resources: [
    { name: "Documentation", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Tutorials", href: "#" },
    { name: "Community", href: "#" },
    { name: "Help Center", href: "#" },
  ],
  Company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Partners", href: "#" },
    { name: "Contact", href: "#" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "GDPR", href: "#" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setContactForm({ name: "", email: "", message: "" });
  };

  return (
    <footer className="bg-[#0B1C3F] text-white">
      {/* Newsletter section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2 font-[family-name:var(--font-poppins)]">
                Stay Updated
              </h3>
              <p className="text-white/70">
                Get the latest learning tips, feature updates, and exclusive offers.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <div className="flex-1 relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-white/50 focus:outline-none focus:border-[#1EB6D2] transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-[#1EB6D2] text-white rounded-full font-medium hover:bg-[#1EB6D2]/90 transition-all hover:scale-105 flex items-center gap-2"
              >
                {isSubscribed ? "Subscribed!" : "Subscribe"}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-6 gap-12">
          {/* Brand and contact */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1EB6D2] to-[#F8C14D] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-[family-name:var(--font-poppins)]">
                Smart<span className="text-[#1EB6D2]">Dex</span>
              </span>
            </Link>
            <p className="text-white/70 mb-6 leading-relaxed">
              Empowering learners worldwide with AI-powered flashcards and smart study tools.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/70">
                <Mail className="w-4 h-4 text-[#1EB6D2]" />
                <span>hello@smartdex.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <Phone className="w-4 h-4 text-[#1EB6D2]" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-white/70">
                <MapPin className="w-4 h-4 text-[#1EB6D2]" />
                <span>San Francisco, CA</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#1EB6D2] transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4 text-white">{category}</h4>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-[#1EB6D2] transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact form */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold mb-4 font-[family-name:var(--font-poppins)]">
                Get in Touch
              </h3>
              <p className="text-white/70 mb-6">
                Have questions or feedback? We&apos;d love to hear from you.
              </p>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-[#1EB6D2] transition-colors"
                  />
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="Your email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-[#1EB6D2] transition-colors"
                  />
                </div>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Your message"
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:border-[#1EB6D2] transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#1EB6D2] text-white rounded-full font-medium hover:bg-[#1EB6D2]/90 transition-all hover:scale-105 flex items-center gap-2"
                >
                  Send Message
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* App download / CTA */}
            <div className="flex flex-col justify-center">
              <div className="bg-gradient-to-br from-[#1EB6D2]/20 to-[#F8C14D]/10 rounded-3xl p-8 text-center">
                <h3 className="text-xl font-bold mb-3 font-[family-name:var(--font-poppins)]">
                  Start Learning Today
                </h3>
                <p className="text-white/70 mb-6">
                  Join 50,000+ learners already using SmartDex to master new skills.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button className="px-6 py-3 bg-white text-[#0B1C3F] rounded-full font-semibold hover:bg-white/90 transition-all hover:scale-105">
                    Get Started Free
                  </button>
                  <button className="px-6 py-3 border border-white/30 text-white rounded-full font-medium hover:bg-white/10 transition-all">
                    View Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} SmartDex. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-white/50 hover:text-white text-sm transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-white/50 hover:text-white text-sm transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-white/50 hover:text-white text-sm transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
