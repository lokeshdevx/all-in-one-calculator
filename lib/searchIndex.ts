import { ALL_CALCULATORS, CATEGORY_META } from "../registry";

export interface SearchIndexItem {
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
}

export function buildSearchIndex(): SearchIndexItem[] {
  return ALL_CALCULATORS.map((c) => ({
    slug: c.slug,
    title: c.title,
    description: c.description,
    category: c.category,
    categoryLabel: CATEGORY_META[c.category].label,
  }));
}
