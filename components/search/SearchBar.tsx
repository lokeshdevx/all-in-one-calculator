"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { SearchIndexItem } from "../../lib/searchIndex";

export default function SearchBar({
  items,
  placeholder = "Search calculators, units, formulas…",
  autoFocus = false,
  size = "md",
}: {
  items: SearchIndexItem[];
  placeholder?: string;
  autoFocus?: boolean;
  size?: "md" | "lg";
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return items
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q),
      )
      .slice(0, 8);
  }, [query, items]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const inputClasses =
    size === "lg"
      ? "w-full rounded-xl border border-card-border bg-card px-5 py-4 text-lg outline-none focus:border-teal !h-[50px]"
      : "w-full rounded-lg border border-card-border bg-card px-4 py-2 text-sm outline-none focus:border-teal !h-[50px]";

  return (
    <div ref={containerRef} className="relative w-full">
      <input
        type="text"
        role="combobox"
        aria-expanded={open && results.length > 0}
        aria-controls="search-results-listbox"
        aria-label="Search calculators"
        autoFocus={autoFocus}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        className={inputClasses}
      />
      {open && results.length > 0 && (
        <ul
          id="search-results-listbox"
          role="listbox"
          className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-card-border bg-card shadow-lg"
        >
          {results.map((r) => (
            <li key={r.slug} role="option" aria-selected="false">
              <Link
                href={`/calculators/${r.slug}`}
                onClick={() => setOpen(false)}
                className="flex flex-col gap-0.5 px-4 py-3 hover:bg-teal/10 transition-colors border-b border-card-border last:border-0"
              >
                <span className="font-medium">{r.title}</span>
                <span className="text-xs text-ink-soft">
                  {r.categoryLabel} · {r.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {open && query.trim() && results.length === 0 && (
        <div className="absolute z-20 mt-2 w-full rounded-xl border border-card-border bg-card px-4 py-3 text-sm text-ink-soft shadow-lg">
          No calculators found for &ldquo;{query}&rdquo;.
        </div>
      )}
    </div>
  );
}
