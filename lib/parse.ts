// Safe numeric parsing helpers. No eval() anywhere in this codebase.

/**
 * Parses a user-facing numeric string that may contain thousands separators,
 * currency symbols, or scientific notation, e.g. "1,000", "$1,000.50", "1e6".
 * Returns null if the string is not a valid finite number.
 */
export function parseNumber(raw: string | undefined | null): number | null {
  if (raw === undefined || raw === null) return null;
  const trimmed = raw.trim();
  if (trimmed === "") return null;

  // Strip currency symbols and thousands separators (commas, Indian lakh/crore grouping, spaces)
  const cleaned = trimmed
    .replace(/[₹$€£¥]/g, "")
    .replace(/,/g, "")
    .replace(/\s+/g, "");

  if (!/^[+-]?(\d+(\.\d+)?|\.\d+)([eE][+-]?\d+)?$/.test(cleaned)) {
    return null;
  }

  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

export function requireNumber(
  raw: string | undefined,
  fieldLabel: string
): { value: number } | { error: string } {
  const n = parseNumber(raw);
  if (n === null) {
    return { error: `"${fieldLabel}" must be a valid number.` };
  }
  return { value: n };
}

export function requireInt(
  raw: string | undefined,
  fieldLabel: string
): { value: number } | { error: string } {
  const n = parseNumber(raw);
  if (n === null || !Number.isInteger(n)) {
    return { error: `"${fieldLabel}" must be a whole number.` };
  }
  return { value: n };
}

export function requirePositive(
  raw: string | undefined,
  fieldLabel: string
): { value: number } | { error: string } {
  const n = parseNumber(raw);
  if (n === null) return { error: `"${fieldLabel}" must be a valid number.` };
  if (n <= 0) return { error: `"${fieldLabel}" must be greater than zero.` };
  return { value: n };
}

export function requireNonNegative(
  raw: string | undefined,
  fieldLabel: string
): { value: number } | { error: string } {
  const n = parseNumber(raw);
  if (n === null) return { error: `"${fieldLabel}" must be a valid number.` };
  if (n < 0) return { error: `"${fieldLabel}" cannot be negative.` };
  return { value: n };
}

/** Formats a number for display: trims floating point noise, adds thousands separators. */
export function formatNumber(n: number, maxDecimals = 6): string {
  if (!Number.isFinite(n)) return "—";
  if (Object.is(n, -0)) n = 0;
  const rounded = Math.round(n * 10 ** maxDecimals) / 10 ** maxDecimals;
  return rounded.toLocaleString("en-US", { maximumFractionDigits: maxDecimals });
}

export function formatCurrency(n: number, symbol = "$"): string {
  if (!Number.isFinite(n)) return "—";
  return `${symbol}${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
