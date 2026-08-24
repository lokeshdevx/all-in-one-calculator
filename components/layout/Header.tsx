"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { CATEGORY_META } from "../../registry";
import { buildSearchIndex } from "../../lib/searchIndex";
import SearchBar from "../search/SearchBar";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";

export default function Header() {
  const searchItems = buildSearchIndex();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        sticky top-0 z-50 transition-all duration-300
        ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-[#90CAF9]/30"
            : "bg-white/98 backdrop-blur-sm border-b border-[#90CAF9]/20"
        }
      `}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 shrink-0 transition-transform hover:scale-[1.02]"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#2196F3] to-[#0D47A1] shadow-lg shadow-[#2196F3]/30 transition-all group-hover:shadow-[#2196F3]/40 group-hover:scale-105">
            <span className="font-mono-num text-lg font-bold text-white">
              ∑
            </span>
            <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-display text-xl font-semibold tracking-tight hidden sm:inline bg-gradient-to-r from-[#0D47A1] to-[#2196F3] bg-clip-text text-transparent">
            Calculate Anything
          </span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden lg:flex items-center gap-1 text-sm">
          {Object.entries(CATEGORY_META).map(([key, meta]) => (
            <Link
              key={key}
              href={`/category/${key}`}
              className="relative px-3 py-2 rounded-lg text-[#0D47A1]/70 hover:text-[#0D47A1] transition-all hover:bg-[#E3F2FD] whitespace-nowrap font-medium"
            >
              {meta.label}
              <span className="absolute inset-x-1 bottom-0 h-0.5 rounded-full bg-[#2196F3] scale-x-0 transition-transform origin-left group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/calculators"
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#2196F3] to-[#0D47A1] text-white text-sm font-medium shadow-lg shadow-[#2196F3]/30 hover:shadow-[#2196F3]/40 transition-all hover:scale-105 whitespace-nowrap"
          >
            <span>All Calculators</span>
            <span className="text-xs opacity-70 transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-[#E3F2FD] transition-colors text-[#0D47A1]"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <SearchBar items={searchItems} size="md" />
      </div>

      {/* Mobile Menu */}
      <div
        className={`
          lg:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        <div className="border-t border-[#90CAF9]/20 px-4 py-3 space-y-1 bg-white/95 backdrop-blur-sm">
          {Object.entries(CATEGORY_META).map(([key, meta]) => (
            <Link
              key={key}
              href={`/category/${key}`}
              className="block px-3 py-2.5 rounded-lg text-[#0D47A1]/70 hover:text-[#0D47A1] hover:bg-[#E3F2FD] transition-all font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              {meta.label}
            </Link>
          ))}
          <div className="pt-2 mt-2 border-t border-[#90CAF9]/20">
            <Link
              href="/calculators"
              className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-gradient-to-r from-[#2196F3] to-[#0D47A1] text-white font-medium shadow-lg shadow-[#2196F3]/20 hover:shadow-[#2196F3]/30 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              <span>All Calculators</span>
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
