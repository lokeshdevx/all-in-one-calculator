import { CalcOutput, fail, ok } from "../types";
import { parseNumber, formatNumber } from "../parse";

/** Parses a free-form list of numbers separated by commas, spaces, or newlines. */
function parseNumberList(raw: string): number[] | null {
  if (!raw || raw.trim() === "") return null;
  const parts = raw.split(/[\s,]+/).filter((p) => p !== "");
  const nums: number[] = [];
  for (const p of parts) {
    const n = parseNumber(p);
    if (n === null) return null;
    nums.push(n);
  }
  return nums.length > 0 ? nums : null;
}

export function calculateAddition(values: Record<string, string>): CalcOutput {
  const nums = parseNumberList(values.numbers ?? "");
  if (!nums) return fail("Enter two or more numbers separated by commas or spaces.");
  if (nums.length < 1) return fail("Enter at least one number.");
  const sum = nums.reduce((a, b) => a + b, 0);
  const steps = [
    { title: "Inputs", content: nums.map((n) => formatNumber(n)).join(" + ") },
    { title: "Add all values", content: `${nums.map((n) => formatNumber(n)).join(" + ")} = ${formatNumber(sum)}` },
  ];
  return ok(formatNumber(sum), steps, sum);
}

export function calculateSubtraction(values: Record<string, string>): CalcOutput {
  const nums = parseNumberList(values.numbers ?? "");
  if (!nums || nums.length < 2) return fail("Enter two or more numbers separated by commas or spaces.");
  const result = nums.slice(1).reduce((acc, n) => acc - n, nums[0]);
  const steps = [
    { title: "Inputs", content: nums.map((n) => formatNumber(n)).join(" - ") },
    { title: "Subtract left to right", content: `${nums.map((n) => formatNumber(n)).join(" - ")} = ${formatNumber(result)}` },
  ];
  return ok(formatNumber(result), steps, result);
}

export function calculateMultiplication(values: Record<string, string>): CalcOutput {
  const nums = parseNumberList(values.numbers ?? "");
  if (!nums || nums.length < 1) return fail("Enter two or more numbers separated by commas or spaces.");
  const product = nums.reduce((a, b) => a * b, 1);
  const steps = [
    { title: "Inputs", content: nums.map((n) => formatNumber(n)).join(" × ") },
    { title: "Multiply all values", content: `${nums.map((n) => formatNumber(n)).join(" × ")} = ${formatNumber(product)}` },
  ];
  return ok(formatNumber(product), steps, product);
}

export function calculateDivision(values: Record<string, string>): CalcOutput {
  const a = parseNumber(values.dividend);
  const b = parseNumber(values.divisor);
  if (a === null || b === null) return fail("Enter valid numbers for both the dividend and divisor.");
  if (b === 0) return fail("Division by zero is undefined. Enter a non-zero divisor.");
  const quotient = a / b;
  const remainder = Number.isInteger(a) && Number.isInteger(b) ? a % b : null;
  const steps = [
    { title: "Set up the division", content: `${formatNumber(a)} ÷ ${formatNumber(b)}` },
    { title: "Divide", content: `${formatNumber(a)} ÷ ${formatNumber(b)} = ${formatNumber(quotient, 8)}` },
  ];
  if (remainder !== null) {
    steps.push({
      title: "Integer remainder",
      content: `${formatNumber(a)} = ${formatNumber(b)} × ${formatNumber(Math.trunc(quotient))} + ${formatNumber(remainder)}`,
    });
  }
  return ok(formatNumber(quotient, 8), steps, quotient);
}

export function calculatePercentage(values: Record<string, string>): CalcOutput {
  const mode = values.mode ?? "of";
  const x = parseNumber(values.x);
  const y = parseNumber(values.y);
  if (x === null || y === null) return fail("Enter valid numbers for both fields.");

  if (mode === "of") {
    // X% of Y
    const result = (x / 100) * y;
    return ok(formatNumber(result), [
      { title: "Formula", content: "Result = (X ÷ 100) × Y" },
      { title: "Substitute values", content: `(${formatNumber(x)} ÷ 100) × ${formatNumber(y)} = ${formatNumber(result)}` },
    ], result);
  }
  if (mode === "isWhatPercentOf") {
    // X is what % of Y
    if (y === 0) return fail("The second value cannot be zero.");
    const result = (x / y) * 100;
    return ok(`${formatNumber(result)}%`, [
      { title: "Formula", content: "Percentage = (X ÷ Y) × 100" },
      { title: "Substitute values", content: `(${formatNumber(x)} ÷ ${formatNumber(y)}) × 100 = ${formatNumber(result)}%` },
    ], result);
  }
  if (mode === "increase") {
    if (x === 0) return fail("The original value cannot be zero.");
    const result = ((y - x) / x) * 100;
    return ok(`${formatNumber(result)}%`, [
      { title: "Formula", content: "% change = ((New − Old) ÷ Old) × 100" },
      { title: "Substitute values", content: `((${formatNumber(y)} − ${formatNumber(x)}) ÷ ${formatNumber(x)}) × 100 = ${formatNumber(result)}%` },
    ], result);
  }
  if (mode === "originalFromPercent") {
    // Y is X% of what number?
    if (x === 0) return fail("The percentage cannot be zero.");
    const result = y / (x / 100);
    return ok(formatNumber(result), [
      { title: "Formula", content: "Original = Value ÷ (Percent ÷ 100)" },
      { title: "Substitute values", content: `${formatNumber(y)} ÷ (${formatNumber(x)} ÷ 100) = ${formatNumber(result)}` },
    ], result);
  }
  return fail("Unknown percentage mode.");
}

export function calculateAverage(values: Record<string, string>): CalcOutput {
  const nums = parseNumberList(values.numbers ?? "");
  if (!nums || nums.length === 0) return fail("Enter one or more numbers separated by commas or spaces.");
  const weightsRaw = values.weights?.trim();
  if (weightsRaw) {
    const weights = parseNumberList(weightsRaw);
    if (!weights || weights.length !== nums.length) {
      return fail("If you provide weights, there must be exactly one weight per number.");
    }
    const weightSum = weights.reduce((a, b) => a + b, 0);
    if (weightSum === 0) return fail("Weights cannot all be zero.");
    const weightedSum = nums.reduce((acc, n, i) => acc + n * weights[i], 0);
    const result = weightedSum / weightSum;
    return ok(formatNumber(result), [
      { title: "Formula", content: "Weighted mean = Σ(value × weight) ÷ Σ(weight)" },
      {
        title: "Substitute values",
        content: `(${nums.map((n, i) => `${formatNumber(n)}×${formatNumber(weights[i])}`).join(" + ")}) ÷ ${formatNumber(weightSum)} = ${formatNumber(result)}`,
      },
    ], result);
  }
  const sum = nums.reduce((a, b) => a + b, 0);
  const result = sum / nums.length;
  return ok(formatNumber(result), [
    { title: "Formula", content: "Mean = Sum of values ÷ Count of values" },
    { title: "Substitute values", content: `${formatNumber(sum)} ÷ ${nums.length} = ${formatNumber(result)}` },
  ], result);
}

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
}

export function calculateRatio(values: Record<string, string>): CalcOutput {
  const a = parseNumber(values.a);
  const b = parseNumber(values.b);
  if (a === null || b === null) return fail("Enter valid numbers for both terms of the ratio.");
  if (a === 0 && b === 0) return fail("Both terms cannot be zero.");
  if (!Number.isInteger(a) || !Number.isInteger(b)) {
    // scale up decimals to integers for simplification
    const factor = 100000;
    const ai = Math.round(a * factor);
    const bi = Math.round(b * factor);
    const g = gcd(ai, bi) || 1;
    const sa = ai / g;
    const sb = bi / g;
    return ok(`${sa} : ${sb}`, [
      { title: "Scale to remove decimals", content: `${formatNumber(a)} : ${formatNumber(b)} → ${ai} : ${bi}` },
      { title: "Divide by the GCD", content: `GCD(${ai}, ${bi}) = ${g} → ${sa} : ${sb}` },
    ]);
  }
  const g = gcd(a, b) || 1;
  const sa = a / g;
  const sb = b / g;
  const asFraction = `${a}/${b}`;
  const asPercentage = b !== 0 ? `${formatNumber((a / b) * 100)}%` : "—";
  return ok(`${sa} : ${sb}`, [
    { title: "Find the GCD", content: `GCD(${a}, ${b}) = ${g}` },
    { title: "Divide both terms by the GCD", content: `${a} ÷ ${g} : ${b} ÷ ${g} = ${sa} : ${sb}` },
    { title: "As a fraction", content: asFraction },
    { title: "As a percentage (a is what % of b)", content: asPercentage },
  ]);
}

interface Frac {
  n: number;
  d: number;
}

function parseFraction(raw: string): Frac | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  // mixed number: "1 2/3"
  const mixedMatch = trimmed.match(/^(-?\d+)\s+(\d+)\/(\d+)$/);
  if (mixedMatch) {
    const whole = Number(mixedMatch[1]);
    const n = Number(mixedMatch[2]);
    const d = Number(mixedMatch[3]);
    if (d === 0) return null;
    const sign = whole < 0 ? -1 : 1;
    return { n: sign * (Math.abs(whole) * d + n), d };
  }
  const simpleMatch = trimmed.match(/^(-?\d+)\/(-?\d+)$/);
  if (simpleMatch) {
    const n = Number(simpleMatch[1]);
    const d = Number(simpleMatch[2]);
    if (d === 0) return null;
    return { n, d };
  }
  const wholeMatch = trimmed.match(/^-?\d+$/);
  if (wholeMatch) {
    return { n: Number(trimmed), d: 1 };
  }
  return null;
}

function simplifyFraction(f: Frac): Frac {
  const g = gcd(f.n, f.d) || 1;
  let n = f.n / g;
  let d = f.d / g;
  if (d < 0) {
    n = -n;
    d = -d;
  }
  return { n, d };
}

function fracToString(f: Frac): string {
  return `${f.n}/${f.d}`;
}

export function calculateFraction(values: Record<string, string>): CalcOutput {
  const op = values.op ?? "add";
  const f1 = parseFraction(values.fraction1 ?? "");
  const f2 = parseFraction(values.fraction2 ?? "");
  if (!f1 || !f2) return fail('Enter fractions like "3/4" or mixed numbers like "1 2/3".');
  if (f1.d === 0 || f2.d === 0) return fail("A fraction's denominator cannot be zero.");

  let result: Frac;
  let opSymbol: string;
  if (op === "add") {
    result = { n: f1.n * f2.d + f2.n * f1.d, d: f1.d * f2.d };
    opSymbol = "+";
  } else if (op === "subtract") {
    result = { n: f1.n * f2.d - f2.n * f1.d, d: f1.d * f2.d };
    opSymbol = "−";
  } else if (op === "multiply") {
    result = { n: f1.n * f2.n, d: f1.d * f2.d };
    opSymbol = "×";
  } else if (op === "divide") {
    if (f2.n === 0) return fail("Cannot divide by a fraction equal to zero.");
    result = { n: f1.n * f2.d, d: f1.d * f2.n };
    opSymbol = "÷";
  } else {
    return fail("Unknown fraction operation.");
  }

  const simplified = simplifyFraction(result);
  const decimal = simplified.n / simplified.d;
  const steps = [
    { title: "Set up the operation", content: `${fracToString(f1)} ${opSymbol} ${fracToString(f2)}` },
    { title: "Compute", content: `${fracToString(result)}` },
    { title: "Simplify", content: `${fracToString(simplified)}` },
    { title: "As a decimal", content: formatNumber(decimal, 6) },
    { title: "As a percentage", content: `${formatNumber(decimal * 100, 4)}%` },
  ];
  return ok(fracToString(simplified), steps, decimal);
}

export function calculateDecimal(values: Record<string, string>): CalcOutput {
  const mode = values.mode ?? "toFraction";
  const raw = values.value;
  const n = parseNumber(raw);
  if (n === null) return fail("Enter a valid decimal number.");

  if (mode === "toFraction") {
    // Convert decimal to fraction using up to 10 decimal digits of precision
    const decimalPlaces = (raw!.split(".")[1] || "").length;
    const denominator = 10 ** Math.min(decimalPlaces, 10);
    const numerator = Math.round(n * denominator);
    const g = gcd(numerator, denominator) || 1;
    const sn = numerator / g;
    const sd = denominator / g;
    return ok(`${sn}/${sd}`, [
      { title: "Write as a fraction over a power of 10", content: `${numerator}/${denominator}` },
      { title: "Simplify using the GCD", content: `GCD(${numerator}, ${denominator}) = ${g} → ${sn}/${sd}` },
    ]);
  }
  if (mode === "toPercentage") {
    const result = n * 100;
    return ok(`${formatNumber(result)}%`, [
      { title: "Formula", content: "Percentage = Decimal × 100" },
      { title: "Substitute", content: `${formatNumber(n)} × 100 = ${formatNumber(result)}%` },
    ], result);
  }
  if (mode === "round") {
    const places = parseNumber(values.places) ?? 2;
    const result = Math.round(n * 10 ** places) / 10 ** places;
    return ok(formatNumber(result, places), [
      { title: "Round to the requested decimal places", content: `${formatNumber(n, 10)} rounded to ${places} place(s) = ${formatNumber(result, places)}` },
    ], result);
  }
  if (mode === "sigfigs") {
    const sig = parseNumber(values.places) ?? 3;
    if (n === 0) return ok("0", [{ title: "Significant figures", content: "0 has one significant figure: 0" }], 0);
    const magnitude = Math.floor(Math.log10(Math.abs(n)));
    const factor = 10 ** (sig - 1 - magnitude);
    const result = Math.round(n * factor) / factor;
    return ok(String(result), [
      { title: "Determine order of magnitude", content: `10^${magnitude}` },
      { title: "Round to the requested significant figures", content: `${formatNumber(n, 10)} → ${result}` },
    ], result);
  }
  return fail("Unknown decimal operation.");
}

export function calculateModulo(values: Record<string, string>): CalcOutput {
  const a = parseNumber(values.a);
  const b = parseNumber(values.b);
  if (a === null || b === null) return fail("Enter valid numbers for both values.");
  if (b === 0) return fail("The modulus (second value) cannot be zero.");
  const rawMod = a % b;
  // JS % keeps the sign of the dividend; also show the mathematical (always non-negative-when-b>0) modulo.
  const mathMod = ((rawMod % b) + b) % b;
  const quotient = Math.trunc(a / b);
  const steps = [
    { title: "Formula", content: "a mod b = a − b × floor(a ÷ b)   (or use trunc for JS-style remainder)" },
    { title: "Divide", content: `${formatNumber(a)} ÷ ${formatNumber(b)} = ${formatNumber(a / b, 6)}` },
    { title: "Truncated quotient", content: `trunc(${formatNumber(a / b, 6)}) = ${quotient}` },
    { title: "Remainder (JS-style, sign follows dividend)", content: `${formatNumber(a)} − ${formatNumber(b)} × ${quotient} = ${formatNumber(rawMod)}` },
  ];
  if (mathMod !== rawMod) {
    steps.push({ title: "Mathematical modulo (always same sign as divisor)", content: formatNumber(mathMod) });
  }
  return ok(formatNumber(rawMod), steps, rawMod);
}
