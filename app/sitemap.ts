import { MetadataRoute } from "next";
import { ALL_CALCULATORS, CATEGORY_META } from "../registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://example.com"; // replace with the deployed domain
  const staticPages = ["", "/calculators"].map((path) => ({ url: `${base}${path}` }));
  const categoryPages = Object.keys(CATEGORY_META).map((c) => ({ url: `${base}/category/${c}` }));
  const calculatorPages = ALL_CALCULATORS.map((c) => ({ url: `${base}/calculators/${c.slug}` }));
  return [...staticPages, ...categoryPages, ...calculatorPages];
}
