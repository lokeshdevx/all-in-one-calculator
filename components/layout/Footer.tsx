import Link from "next/link";
import { CATEGORY_META } from "../../registry";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-[#90CAF9]/30 bg-gradient-to-b from-white to-[#E3F2FD]/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#2196F3] to-[#0D47A1] shadow-lg shadow-[#2196F3]/30 transition-all group-hover:shadow-[#2196F3]/40 group-hover:scale-105">
                <span className="font-mono-num text-xl font-bold text-white">
                  ∑
                </span>
                <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="font-display text-xl font-semibold tracking-tight bg-gradient-to-r from-[#0D47A1] to-[#2196F3] bg-clip-text text-transparent">
                Calculate Anything
              </span>
            </Link>

            <p className="text-sm text-[#0D47A1]/70 max-w-sm leading-relaxed">
              Accurate calculators, conversions, and formulas — every result
              shows its work with transparent, step-by-step solutions.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[#0D47A1]/50 uppercase tracking-wider">
                  Trusted by
                </span>
                <span className="flex items-center gap-1 text-sm font-semibold text-[#0D47A1]">
                  <span className="text-[#2196F3]">★</span> 10,000+
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[#0D47A1]/40">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#2196F3]/40 animate-pulse" />
                <span className="text-[10px] uppercase tracking-wider font-medium">
                  v2.0
                </span>
              </div>
            </div>
          </div>

          {/* Category Links */}
          {Object.entries(CATEGORY_META).map(([key, meta]) => (
            <div key={key} className="space-y-3">
              <h3 className="font-display text-sm font-semibold text-[#0D47A1] tracking-wide">
                {meta.label}
              </h3>
              <Link
                href={`/category/${key}`}
                className="group inline-flex items-center gap-1.5 text-sm text-[#0D47A1]/60 hover:text-[#2196F3] transition-all hover:gap-3"
              >
                <span>Browse {meta.label.toLowerCase()}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#2196F3] opacity-0 group-hover:opacity-100 transition-all transform -translate-x-1 group-hover:translate-x-0" />
              </Link>
            </div>
          ))}
        </div>

        {/* Divider with decorative element */}
        <div className="relative mt-12 pt-8 border-t border-[#90CAF9]/30">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#90CAF9]/30 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#2196F3]" />
              <span className="text-[10px] font-medium text-[#0D47A1]/60 uppercase tracking-wider">
                Built with ❤️
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#0D47A1]/50">
            © {currentYear} Calculate Anything. Built with a registry-driven
            architecture.
          </p>

          <div className="flex items-center gap-6 text-xs">
            <Link
              href="/privacy"
              className="text-[#0D47A1]/50 hover:text-[#2196F3] transition-colors font-medium"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-[#0D47A1]/50 hover:text-[#2196F3] transition-colors font-medium"
            >
              Terms
            </Link>
            <Link
              href="/about"
              className="text-[#0D47A1]/50 hover:text-[#2196F3] transition-colors font-medium"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-[#0D47A1]/50 hover:text-[#2196F3] transition-colors font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
