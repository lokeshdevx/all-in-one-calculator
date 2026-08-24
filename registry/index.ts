import { CalculatorDefinition } from "../lib/types";
import { basicCalculators } from "./basic";
import { financeCalculators } from "./finance";
import { conversionCalculators } from "./conversions";
import { mathScienceCalculators } from "./mathScience";
import { everydayCalculators } from "./everyday";
import { developerCalculators } from "./developer";

// This is the single flat list every route, search index, and sitemap reads from.
// Adding calculator #71 (or #5000) means adding one entry to one of the category
// arrays above — no page, component, or route needs to change.
export const ALL_CALCULATORS: CalculatorDefinition[] = [
  ...basicCalculators,
  ...financeCalculators,
  ...conversionCalculators,
  ...mathScienceCalculators,
  ...everydayCalculators,
  ...developerCalculators,
];

export const CATEGORY_META: Record<
  CalculatorDefinition["category"],
  { label: string; description: string }
> = {
  basic: { label: "Math Basics", description: "Addition, subtraction, percentages, fractions, and other everyday arithmetic." },
  finance: { label: "Finance", description: "Interest, loans, EMI, investments, tax, salary, and currency." },
  conversions: { label: "Conversions", description: "Length, weight, temperature, volume, data storage, and more." },
  "math-science": { label: "Math & Science", description: "Algebra, geometry, statistics building blocks, and a scientific calculator." },
  everyday: { label: "Everyday", description: "Age, dates, BMI, calories, fuel cost, and other daily-life calculators." },
  developer: { label: "Developer", description: "Binary, hex, IP subnets, Unix permissions, and color conversions." },
};

export function getCalculatorBySlug(slug: string): CalculatorDefinition | undefined {
  return ALL_CALCULATORS.find((c) => c.slug === slug);
}

export function getCalculatorsByCategory(category: string): CalculatorDefinition[] {
  return ALL_CALCULATORS.filter((c) => c.category === category);
}

export function searchCalculators(query: string): CalculatorDefinition[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return ALL_CALCULATORS.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.slug.includes(q.replace(/\s+/g, "-"))
  );
}
