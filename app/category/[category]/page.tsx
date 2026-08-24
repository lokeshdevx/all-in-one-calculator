import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ALL_CALCULATORS, CATEGORY_META } from "../../../registry";

export function generateStaticParams() {
  return Object.keys(CATEGORY_META).map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const meta = CATEGORY_META[category as keyof typeof CATEGORY_META];
  if (!meta) return {};
  return {
    title: `${meta.label} | Calculate Anything`,
    description: meta.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const meta = CATEGORY_META[category as keyof typeof CATEGORY_META];
  if (!meta) notFound();
  const calcs = ALL_CALCULATORS.filter((c) => c.category === category);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E3F2FD]/20 via-white to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm mb-6">
          <ol className="flex items-center flex-wrap gap-1.5">
            <li>
              <Link
                href="/"
                className="text-[#0D47A1]/60 hover:text-[#2196F3] transition-colors font-medium"
              >
                Home
              </Link>
            </li>
            <li className="text-[#0D47A1]/40">/</li>
            <li>
              <span className="text-[#0D47A1] font-semibold">{meta.label}</span>
            </li>
          </ol>
        </nav>

        {/* Header Section */}
        <div className="mb-8 sm:mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0D47A1]">
                {meta.label}
              </h1>
              <p className="mt-2 text-base sm:text-lg text-[#0D47A1]/70 max-w-2xl">
                {meta.description}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E3F2FD] border border-[#90CAF9]/30">
                <span className="text-sm font-semibold text-[#0D47A1]">
                  {calcs.length}
                </span>
                <span className="text-xs text-[#0D47A1]/60">calculators</span>
              </div>
            </div>
          </div>
        </div>

        {/* Calculator Grid */}
        {calcs.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {calcs.map((c) => (
              <Link
                key={c.slug}
                href={`/calculators/${c.slug}`}
                className="group relative rounded-2xl border border-[#90CAF9]/30 bg-white p-5 sm:p-6 hover:border-[#2196F3] hover:shadow-xl hover:shadow-[#2196F3]/10 transition-all duration-300 hover:-translate-y-1"
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
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-[#0D47A1] mb-2">
              No calculators found
            </h3>
            <p className="text-[#0D47A1]/60">
              This category doesn't have any calculators yet.
            </p>
          </div>
        )}

        {/* Back to Categories */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-[#90CAF9]/20">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[#0D47A1]/60 hover:text-[#2196F3] transition-colors"
          >
            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            <span>Back to all categories</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
