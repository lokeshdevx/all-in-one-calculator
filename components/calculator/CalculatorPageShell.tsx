import Link from "next/link";
import { CalculatorDefinition } from "../../lib/types";
import { getCalculatorBySlug, CATEGORY_META } from "../../registry";
import CalculatorRunner from "./CalculatorRunner";
import {
  Calculator,
  BookOpen,
  Lightbulb,
  FileText,
  HelpCircle,
  ArrowRight,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export default function CalculatorPageShell({
  def,
  initialValues,
}: {
  def: CalculatorDefinition;
  initialValues: Record<string, string>;
}) {
  const related = def.related
    .map((slug) => getCalculatorBySlug(slug))
    .filter(Boolean) as CalculatorDefinition[];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E3F2FD]/20 via-white to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center flex-wrap gap-1.5 text-sm">
            <li>
              <Link
                href="/"
                className="text-[#0D47A1]/60 hover:text-[#2196F3] transition-colors font-medium"
              >
                Home
              </Link>
            </li>
            <li className="text-[#0D47A1]/40">
              <ChevronRight className="w-4 h-4" />
            </li>
            <li>
              <Link
                href={`/category/${def.category}`}
                className="text-[#0D47A1]/60 hover:text-[#2196F3] transition-colors font-medium"
              >
                {CATEGORY_META[def.category].label}
              </Link>
            </li>
            <li className="text-[#0D47A1]/40">
              <ChevronRight className="w-4 h-4" />
            </li>
            <li>
              <span className="text-[#0D47A1] font-semibold">{def.title}</span>
            </li>
          </ol>
        </nav>

        {/* Header Section */}
        <div className="relative mb-8 sm:mb-10">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#2196F3] to-[#0D47A1] shadow-lg shadow-[#2196F3]/30">
                  <Calculator className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0D47A1] tracking-tight">
                    {def.title}
                  </h1>
                </div>
              </div>
              <p className="text-base sm:text-lg text-[#0D47A1]/70 max-w-3xl leading-relaxed">
                {def.description}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={`/category/${def.category}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E3F2FD] border border-[#90CAF9]/30 text-sm font-medium text-[#0D47A1] hover:bg-[#90CAF9]/20 transition-colors whitespace-nowrap"
              >
                <span>📁</span>
                <span>{CATEGORY_META[def.category].label}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Calculator Runner */}
        <CalculatorRunner
          slug={def.slug}
          fields={def.fields}
          initialValues={initialValues}
        />

        {/* Formula Section */}
        <div className="mt-10 sm:mt-12">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-[#E3F2FD]/30 border border-[#90CAF9]/30 shadow-xl shadow-[#2196F3]/5">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#2196F3]/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#90CAF9]/5 rounded-full blur-3xl" />

            <div className="relative p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-[#E3F2FD]">
                  <BookOpen className="w-5 h-5 text-[#2196F3]" />
                </div>
                <h2 className="font-display text-xl font-bold text-[#0D47A1]">
                  Formula
                </h2>
              </div>
              <div className="font-mono-num text-sm bg-white p-4 rounded-xl border border-[#90CAF9]/20 overflow-x-auto shadow-inner">
                <pre className="whitespace-pre text-[#0D47A1]">
                  {def.formula}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Explanation Section */}
        <div className="mt-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-[#E3F2FD]/30 border border-[#90CAF9]/30 shadow-xl shadow-[#2196F3]/5">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#2196F3]/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#90CAF9]/5 rounded-full blur-3xl" />

            <div className="relative p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-[#E3F2FD]">
                  <Lightbulb className="w-5 h-5 text-[#2196F3]" />
                </div>
                <h2 className="font-display text-xl font-bold text-[#0D47A1]">
                  Explanation
                </h2>
              </div>
              <p className="text-[#0D47A1]/80 leading-relaxed text-sm sm:text-base">
                {def.explanation}
              </p>
            </div>
          </div>
        </div>

        {/* Worked Example Section */}
        <div className="mt-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-[#E3F2FD]/30 border border-[#90CAF9]/30 shadow-xl shadow-[#2196F3]/5">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#2196F3]/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#90CAF9]/5 rounded-full blur-3xl" />

            <div className="relative p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-[#E3F2FD]">
                  <FileText className="w-5 h-5 text-[#2196F3]" />
                </div>
                <h2 className="font-display text-xl font-bold text-[#0D47A1]">
                  Worked Example
                </h2>
              </div>
              <div className="bg-white rounded-xl border border-[#90CAF9]/20 p-4 sm:p-6">
                <div className="grid gap-2 sm:grid-cols-2">
                  {Object.entries(def.example.inputs).map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between p-2 rounded-lg bg-[#E3F2FD]/30 border border-[#90CAF9]/20"
                    >
                      <span className="text-sm font-medium text-[#0D47A1]">
                        {k}
                      </span>
                      <span className="text-sm font-mono-num text-[#2196F3] font-semibold">
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
                {def.example.note && (
                  <div className="mt-3 p-3 rounded-lg bg-[#E3F2FD] border border-[#90CAF9]/30">
                    <p className="text-sm font-medium text-[#0D47A1]">
                      💡 {def.example.note}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-6">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-[#E3F2FD]/30 border border-[#90CAF9]/30 shadow-xl shadow-[#2196F3]/5">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#2196F3]/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#90CAF9]/5 rounded-full blur-3xl" />

            <div className="relative p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-[#E3F2FD]">
                  <HelpCircle className="w-5 h-5 text-[#2196F3]" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-[#0D47A1]">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-sm text-[#0D47A1]/60">
                    Common questions about this calculator
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {def.faq.map((item, i) => (
                  <div
                    key={i}
                    className="group rounded-2xl bg-white border border-[#90CAF9]/20 p-5 hover:border-[#2196F3]/40 hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold text-[#0D47A1] group-hover:text-[#2196F3] transition-colors text-sm sm:text-base">
                      {item.q}
                    </h3>
                    <p className="text-sm text-[#0D47A1]/70 mt-2 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Calculators */}
        {related.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-xl font-bold text-[#0D47A1]">
                  Related Calculators
                </h2>
                <p className="text-sm text-[#0D47A1]/60">
                  You might also find these useful
                </p>
              </div>
              <Link
                href={`/category/${def.category}`}
                className="group inline-flex items-center gap-2 text-sm font-medium text-[#2196F3] hover:text-[#0D47A1] transition-colors"
              >
                <span>View all</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/calculators/${r.slug}`}
                  className="group relative rounded-2xl border border-[#90CAF9]/30 bg-white p-5 hover:border-[#2196F3] hover:shadow-xl hover:shadow-[#2196F3]/10 transition-all hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#0D47A1] group-hover:text-[#2196F3] transition-colors text-sm">
                        {r.title}
                      </h3>
                      <p className="text-xs text-[#0D47A1]/60 mt-1 line-clamp-2">
                        {r.description}
                      </p>
                    </div>
                    <span className="text-[#90CAF9] group-hover:text-[#2196F3] group-hover:translate-x-1 transition-all shrink-0">
                      →
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#90CAF9]/50 group-hover:bg-[#2196F3] transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
