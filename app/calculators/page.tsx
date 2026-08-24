import type { Metadata } from "next";
import Link from "next/link";
import { ALL_CALCULATORS, CATEGORY_META } from "../../registry";
import { buildSearchIndex } from "../../lib/searchIndex";
import SearchBar from "../../components/search/SearchBar";
import {
  Calculator,
  Search,
  ArrowRight,
  Grid3x3,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "All Calculators | Calculate Anything",
  description:
    "Browse every calculator on Calculate Anything, grouped by category.",
};

export default function AllCalculatorsPage() {
  const searchItems = buildSearchIndex();
  const totalCalculators = ALL_CALCULATORS.length;

  // Get popular calculators (first 6 for display)
  const popularCalculators = ALL_CALCULATORS.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E3F2FD]/20 via-white to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header Section */}
        <div className="relative mb-10 sm:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#2196F3] to-[#0D47A1] shadow-lg shadow-[#2196F3]/30">
                  <Grid3x3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D47A1] tracking-tight">
                    All Calculators
                  </h1>
                </div>
              </div>
              <p className="text-base sm:text-lg text-[#0D47A1]/70 max-w-2xl">
                Browse our complete collection of {totalCalculators} accurate
                calculators, conversions, and formulas — every result shows its
                work.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E3F2FD] border border-[#90CAF9]/30">
                <Calculator className="w-4 h-4 text-[#2196F3]" />
                <span className="text-sm font-semibold text-[#0D47A1]">
                  {totalCalculators}
                </span>
                <span className="text-xs text-[#0D47A1]/60">calculators</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200">
                <Sparkles className="w-4 h-4 text-green-600" />
                <span className="text-xs font-medium text-green-700">
                  Updated
                </span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-6 max-w-9xl">
            <div className="relative">
              <SearchBar
                items={searchItems}
                placeholder="Search any calculator..."
                size="md"
              />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 sm:mb-12">
          <div className="bg-white rounded-2xl border border-[#90CAF9]/30 p-4 text-center hover:shadow-lg hover:shadow-[#2196F3]/5 transition-all hover:-translate-y-0.5">
            <div className="text-2xl font-bold text-[#2196F3]">
              {totalCalculators}
            </div>
            <div className="text-xs text-[#0D47A1]/60 mt-1">
              Total Calculators
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#90CAF9]/30 p-4 text-center hover:shadow-lg hover:shadow-[#2196F3]/5 transition-all hover:-translate-y-0.5">
            <div className="text-2xl font-bold text-[#2196F3]">
              {Object.keys(CATEGORY_META).length}
            </div>
            <div className="text-xs text-[#0D47A1]/60 mt-1">Categories</div>
          </div>
          <div className="bg-white rounded-2xl border border-[#90CAF9]/30 p-4 text-center hover:shadow-lg hover:shadow-[#2196F3]/5 transition-all hover:-translate-y-0.5">
            <div className="text-2xl font-bold text-[#2196F3]">100%</div>
            <div className="text-xs text-[#0D47A1]/60 mt-1">Free to Use</div>
          </div>
          <div className="bg-white rounded-2xl border border-[#90CAF9]/30 p-4 text-center hover:shadow-lg hover:shadow-[#2196F3]/5 transition-all hover:-translate-y-0.5">
            <div className="text-2xl font-bold text-[#2196F3]">⚡</div>
            <div className="text-xs text-[#0D47A1]/60 mt-1">
              Instant Results
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="space-y-10 sm:space-y-12">
          {Object.entries(CATEGORY_META).map(([key, meta]) => {
            const calcs = ALL_CALCULATORS.filter((c) => c.category === key);
            return (
              <section key={key} className="relative">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0D47A1]">
                      {meta.label}
                    </h2>
                    <p className="text-sm text-[#0D47A1]/60 mt-0.5">
                      {calcs.length} calculators
                    </p>
                  </div>
                  <Link
                    href={`/category/${key}`}
                    className="group inline-flex items-center gap-2 text-sm font-medium text-[#2196F3] hover:text-[#0D47A1] transition-colors"
                  >
                    <span>View all</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {calcs.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/calculators/${c.slug}`}
                      className="group relative rounded-2xl border border-[#90CAF9]/30 bg-white p-4 sm:p-5 hover:border-[#2196F3] hover:shadow-xl hover:shadow-[#2196F3]/10 transition-all hover:-translate-y-1"
                    >
                      {/* Decorative gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#2196F3]/0 via-[#2196F3]/0 to-[#2196F3]/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

                      <div className="relative">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-[#0D47A1] group-hover:text-[#2196F3] transition-colors text-sm sm:text-base">
                            {c.title}
                          </h3>
                          <span className="text-[#90CAF9] group-hover:text-[#2196F3] group-hover:translate-x-1 transition-all shrink-0 mt-0.5">
                            →
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-[#0D47A1]/60 mt-1.5 line-clamp-2 leading-relaxed">
                          {c.description}
                        </p>
                        <div className="mt-3 pt-3 border-t border-[#90CAF9]/20 flex items-center justify-between">
                          <span className="text-xs text-[#2196F3] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            Calculate now
                          </span>
                          <div className="h-1.5 w-1.5 rounded-full bg-[#90CAF9]/50 group-hover:bg-[#2196F3] transition-colors" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#E3F2FD] via-[#E3F2FD]/50 to-white border border-[#90CAF9]/30 p-8 sm:p-12 text-center">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#2196F3]/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#90CAF9]/5 rounded-full blur-3xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="text-3xl">🚀</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0D47A1]">
                Can't find what you're looking for?
              </h2>
              <p className="mt-3 text-[#0D47A1]/70 max-w-lg mx-auto">
                Browse all categories or use the search bar to find the perfect
                calculator for your needs.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#2196F3] to-[#0D47A1] text-white font-semibold shadow-lg shadow-[#2196F3]/30 hover:shadow-[#2196F3]/40 transition-all hover:scale-105"
                >
                  <span>Go to Home</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/category/popular"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#90CAF9]/50 bg-white/80 hover:bg-white text-[#0D47A1] font-semibold transition-all hover:border-[#2196F3] hover:shadow-lg hover:shadow-[#2196F3]/10"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>View Popular</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
