import Link from "next/link";
import { ALL_CALCULATORS, CATEGORY_META } from "../registry";

const POPULAR_SLUGS = [
  "percentage-calculator",
  "loan-emi-calculator",
  "bmi-calculator",
  "age-calculator",
  "compound-interest-calculator",
  "length-converter",
  "scientific-calculator",
  "currency-converter",
];

export default function HomePage() {
  const popular = POPULAR_SLUGS.map((slug) =>
    ALL_CALCULATORS.find((c) => c.slug === slug),
  ).filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E3F2FD]/20 via-white to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#2196F3]/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#90CAF9]/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E3F2FD]/20 rounded-full blur-3xl" />

          {/* Floating Orbs */}
          <div className="absolute top-20 left-10 w-16 h-16 bg-[#2196F3]/5 rounded-full blur-2xl animate-float" />
          <div className="absolute bottom-20 right-10 w-20 h-20 bg-[#90CAF9]/5 rounded-full blur-2xl animate-float-delayed" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="text-center">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E3F2FD] px-4 py-1.5 mb-6 border border-[#90CAF9]/30 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2196F3] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2196F3]"></span>
              </span>
              <span className="text-xs font-semibold text-[#0D47A1] tracking-wider uppercase">
                {ALL_CALCULATORS.length}+ Free Calculators
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-[#0D47A1]">Calculate</span>
              <span className="bg-gradient-to-r from-[#2196F3] to-[#0D47A1] bg-clip-text text-transparent">
                {" "}
                Anything.
              </span>
            </h1>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-[#0D47A1]/70 max-w-2xl mx-auto leading-relaxed px-4">
              {ALL_CALCULATORS.length}+ accurate calculators, conversions, and
              formulas — every result shows exactly where the number came from.
            </p>

            {/* Quick Action Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
              <Link
                href="/calculators"
                className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#2196F3] to-[#0D47A1] text-white font-semibold shadow-lg shadow-[#2196F3]/30 hover:shadow-[#2196F3]/40 transition-all duration-300 hover:scale-105"
              >
                <span>Explore All Calculators</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/category/popular"
                className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl border-2 border-[#90CAF9]/50 bg-white/80 hover:bg-white text-[#0D47A1] font-semibold transition-all duration-300 hover:border-[#2196F3] hover:shadow-lg hover:shadow-[#2196F3]/10"
              >
                <span>🔥</span>
                <span>Popular Tools</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 sm:mt-16 flex flex-wrap justify-center items-center gap-6 sm:gap-10">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2196F3] to-[#0D47A1] border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-[#0D47A1]">
                    10,000+ Users
                  </div>
                  <div className="text-xs text-[#0D47A1]/60">
                    Trusted worldwide
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex text-[#2196F3]">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-base sm:text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-[#0D47A1]">4.9/5</div>
                  <div className="text-xs text-[#0D47A1]/60">
                    Average rating
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl">⚡</span>
                <div className="text-sm">
                  <div className="font-semibold text-[#0D47A1]">
                    Instant Results
                  </div>
                  <div className="text-xs text-[#0D47A1]/60">
                    Real-time calculations
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="relative mt-8">
          <svg
            className="w-full h-12 sm:h-16 text-white"
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 50 C360 100 720 0 1080 50 C1260 75 1380 60 1440 50 L1440 100 L0 100 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* Popular Calculators */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0D47A1]">
              🔥 Popular Calculators
            </h2>
            <p className="text-sm text-[#0D47A1]/60 mt-1">
              Most used tools by our community
            </p>
          </div>
          <Link
            href="/calculators"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[#2196F3] hover:text-[#0D47A1] transition-colors whitespace-nowrap"
          >
            <span>View all calculators</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map(
            (calc) =>
              calc && (
                <Link
                  key={calc.slug}
                  href={`/calculators/${calc.slug}`}
                  className="group relative rounded-2xl border border-[#90CAF9]/30 bg-white p-5 hover:border-[#2196F3] hover:shadow-xl hover:shadow-[#2196F3]/10 transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#0D47A1] group-hover:text-[#2196F3] transition-colors text-sm sm:text-base">
                        {calc.title}
                      </h3>
                    </div>
                    <span className="text-[#90CAF9] group-hover:text-[#2196F3] group-hover:translate-x-1 transition-all ml-2">
                      →
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#0D47A1]/60 line-clamp-2 leading-relaxed">
                    {calc.description}
                  </p>
                  <div className="absolute top-3 right-3">
                    <div className="h-2 w-2 rounded-full bg-[#90CAF9]/50 group-hover:bg-[#2196F3] transition-colors" />
                  </div>
                  <div className="mt-3 pt-3 border-t border-[#90CAF9]/20">
                    <span className="text-xs text-[#2196F3] font-medium">
                      Calculate now →
                    </span>
                  </div>
                </Link>
              ),
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 border-t border-[#90CAF9]/20 bg-gradient-to-b from-white to-[#E3F2FD]/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0D47A1]">
              📚 Browse by Category
            </h2>
            <p className="text-sm text-[#0D47A1]/60 mt-1">
              Find the right tool for your needs
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm font-medium text-[#0D47A1]/60 bg-[#E3F2FD] px-4 py-2 rounded-full">
            <span>📋</span>
            <span>{Object.keys(CATEGORY_META).length} Categories</span>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(CATEGORY_META).map(([key, meta]) => {
            const count = ALL_CALCULATORS.filter(
              (c) => c.category === key,
            ).length;
            return (
              <Link
                key={key}
                href={`/category/${key}`}
                className="group relative rounded-2xl border border-[#90CAF9]/30 bg-white p-6 hover:border-[#2196F3] hover:shadow-xl hover:shadow-[#2196F3]/10 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#2196F3]/0 via-[#2196F3]/0 to-[#2196F3]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display font-semibold text-lg text-[#0D47A1] group-hover:text-[#2196F3] transition-colors">
                      {meta.label}
                    </h3>
                    <span className="inline-flex items-center justify-center min-w-[32px] h-8 rounded-full bg-[#E3F2FD] px-3 text-xs font-bold text-[#2196F3] group-hover:bg-[#2196F3] group-hover:text-white transition-colors duration-300">
                      {count}
                    </span>
                  </div>
                  <p className="text-sm text-[#0D47A1]/60 mt-1 leading-relaxed line-clamp-2">
                    {meta.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-semibold text-[#2196F3] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Browse all</span>
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#E3F2FD] via-[#E3F2FD]/50 to-white border border-[#90CAF9]/30 p-8 sm:p-12 lg:p-16 text-center overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2196F3]/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#90CAF9]/5 rounded-full blur-3xl animate-pulse delay-1000" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-3xl sm:text-4xl">🚀</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0D47A1]">
              Ready to Calculate?
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#0D47A1]/70 max-w-2xl mx-auto leading-relaxed px-4">
              Join thousands of users who trust our calculators for accurate
              results with transparent steps.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
              <Link
                href="/calculators"
                className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#2196F3] to-[#0D47A1] text-white font-semibold shadow-lg shadow-[#2196F3]/30 hover:shadow-[#2196F3]/40 transition-all duration-300 hover:scale-105"
              >
                <span>Get Started</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl border-2 border-[#90CAF9]/50 bg-white/80 hover:bg-white text-[#0D47A1] font-semibold transition-all duration-300 hover:border-[#2196F3] hover:shadow-lg hover:shadow-[#2196F3]/10"
              >
                <span>Learn More</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
