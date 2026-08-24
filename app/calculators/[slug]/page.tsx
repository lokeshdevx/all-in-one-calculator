import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ALL_CALCULATORS, getCalculatorBySlug } from "../../../registry";
import CalculatorPageShell from "../../../components/calculator/CalculatorPageShell";

export function generateStaticParams() {
  return ALL_CALCULATORS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const def = getCalculatorBySlug(slug);
  if (!def) return {};
  return {
    title: `${def.title} | Calculate Anything`,
    description: def.description,
    alternates: { canonical: `/calculators/${def.slug}` },
    openGraph: {
      title: def.title,
      description: def.description,
      type: "website",
      url: `/calculators/${def.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: def.title,
      description: def.description,
    },
  };
}

export default async function CalculatorPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { slug } = await params;
  const def = getCalculatorBySlug(slug);
  if (!def) notFound();

  const rawParams = await searchParams;
  const initialValues: Record<string, string> = {};
  for (const field of def.fields) {
    const fromUrl = rawParams[field.id];
    initialValues[field.id] =
      typeof fromUrl === "string" ? fromUrl : (field.defaultValue ?? "");
  }

  // Get category info for breadcrumb
  const categoryInfo = def.category;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: def.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <div className="bg-gradient-to-b from-[#E3F2FD]/20 to-white border-b border-[#90CAF9]/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <nav aria-label="Breadcrumb" className="text-sm">
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
                <Link
                  href="/calculators"
                  className="text-[#0D47A1]/60 hover:text-[#2196F3] transition-colors font-medium"
                >
                  Calculators
                </Link>
              </li>
              <li className="text-[#0D47A1]/40">/</li>
              <li>
                <span className="text-[#0D47A1] font-semibold">
                  {def.title}
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-b from-white via-white to-[#E3F2FD]/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Category Badge */}
          {categoryInfo && (
            <div className="mb-4">
              <Link
                href={`/category/${categoryInfo}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E3F2FD] border border-[#90CAF9]/30 text-xs font-medium text-[#0D47A1] hover:bg-[#90CAF9]/20 transition-colors"
              >
                <span className="text-[#2196F3]">📁</span>
                <span>{categoryInfo}</span>
              </Link>
            </div>
          )}

          <CalculatorPageShell def={def} initialValues={initialValues} />

          {/* Related Resources Section */}
          {def.faq && def.faq.length > 0 && (
            <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-[#90CAF9]/20">
              <div className="bg-white rounded-2xl border border-[#90CAF9]/30 p-6 sm:p-8">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-[#0D47A1] mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                  {def.faq.map((item, index) => (
                    <div
                      key={index}
                      className="group p-4 rounded-xl bg-[#E3F2FD]/30 hover:bg-[#E3F2FD]/50 transition-colors border border-[#90CAF9]/20"
                    >
                      <h3 className="font-semibold text-[#0D47A1] group-hover:text-[#2196F3] transition-colors text-sm sm:text-base">
                        {item.q}
                      </h3>
                      <p className="mt-2 text-sm text-[#0D47A1]/70 leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Back to Calculators */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#90CAF9]/20">
            <Link
              href="/calculators"
              className="group inline-flex items-center gap-2 text-sm font-medium text-[#0D47A1]/60 hover:text-[#2196F3] transition-colors"
            >
              <span className="transition-transform group-hover:-translate-x-1">
                ←
              </span>
              <span>Back to all calculators</span>
            </Link>

            {categoryInfo && (
              <Link
                href={`/category/${categoryInfo}`}
                className="group inline-flex items-center gap-2 text-sm font-medium text-[#0D47A1]/60 hover:text-[#2196F3] transition-colors"
              >
                <span>View all {categoryInfo} calculators</span>
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
