import { evaluate } from "mathjs";
import { CalcOutput, fail, ok } from "../types";
import { parseNumber, formatNumber } from "../parse";

// ---- 35. Scientific Calculator ----
// Uses mathjs's expression parser (no eval/new Function). mathjs's parser only
// understands mathematical syntax; it cannot execute arbitrary JS.
export function calculateScientific(values: Record<string, string>): CalcOutput {
  const expr = values.expression?.trim();
  if (!expr) return fail("Enter a mathematical expression, e.g. sin(45 deg) + sqrt(16).");
  if (/[;{}]|=>/.test(expr)) return fail("Only mathematical expressions are allowed.");
  try {
    const result = evaluate(expr);
    if (typeof result !== "number" || !Number.isFinite(result)) {
      return fail("The expression did not evaluate to a finite number.");
    }
    return ok(formatNumber(result, 10), [
      { title: "Parsed expression", content: expr },
      { title: "Evaluated result", content: formatNumber(result, 10) },
    ], result);
  } catch (e) {
    return fail("Could not parse that expression. Check for balanced parentheses and valid function names.");
  }
}

// ---- 36. Percentage Change ----
export function calculatePercentageChange(values: Record<string, string>): CalcOutput {
  const oldVal = parseNumber(values.oldValue);
  const newVal = parseNumber(values.newValue);
  if (oldVal === null || newVal === null) return fail("Enter valid numbers for both values.");
  if (oldVal === 0) return fail("The original value cannot be zero.");
  const change = ((newVal - oldVal) / Math.abs(oldVal)) * 100;
  return ok(`${change >= 0 ? "+" : ""}${formatNumber(change)}%`, [
    { title: "Formula", content: "% change = ((New − Old) ÷ |Old|) × 100" },
    { title: "Substitute values", content: `((${formatNumber(newVal)} − ${formatNumber(oldVal)}) ÷ ${formatNumber(Math.abs(oldVal))}) × 100 = ${formatNumber(change)}%` },
  ], change);
}

// ---- 37. Exponent / Power ----
export function calculateExponent(values: Record<string, string>): CalcOutput {
  const base = parseNumber(values.base);
  const exponent = parseNumber(values.exponent);
  if (base === null || exponent === null) return fail("Enter valid numbers for base and exponent.");
  if (base === 0 && exponent < 0) return fail("Zero cannot be raised to a negative exponent.");
  const result = Math.pow(base, exponent);
  if (!Number.isFinite(result)) return fail("The result is too large to represent (overflow).");
  return ok(formatNumber(result, 10), [
    { title: "Formula", content: "Result = base^exponent" },
    { title: "Substitute values", content: `${formatNumber(base)}^${formatNumber(exponent)} = ${formatNumber(result, 10)}` },
  ], result);
}

// ---- 38. Square Root ----
export function calculateSquareRoot(values: Record<string, string>): CalcOutput {
  const n = parseNumber(values.value);
  const rootDegree = parseNumber(values.degree) ?? 2;
  if (n === null) return fail("Enter a valid number.");
  if (rootDegree === 0) return fail("The root degree cannot be zero.");
  if (n < 0 && rootDegree % 2 === 0) return fail("Cannot take an even root of a negative number (result would be imaginary).");
  const result = n < 0 ? -Math.pow(-n, 1 / rootDegree) : Math.pow(n, 1 / rootDegree);
  return ok(formatNumber(result, 10), [
    { title: "Formula", content: rootDegree === 2 ? "Result = √value" : `Result = value^(1/${formatNumber(rootDegree)})` },
    { title: "Substitute values", content: `${formatNumber(n)}^(1/${formatNumber(rootDegree)}) = ${formatNumber(result, 10)}` },
  ], result);
}

// ---- 39. Logarithm ----
export function calculateLogarithm(values: Record<string, string>): CalcOutput {
  const n = parseNumber(values.value);
  const base = values.base === "e" ? Math.E : values.base === "10" ? 10 : parseNumber(values.base);
  if (n === null || base === null) return fail("Enter a valid number and base.");
  if (n <= 0) return fail("Logarithm is only defined for positive numbers.");
  if (base <= 0 || base === 1) return fail("The logarithm base must be positive and not equal to 1.");
  const result = Math.log(n) / Math.log(base);
  const baseLabel = base === Math.E ? "e" : formatNumber(base);
  return ok(formatNumber(result, 10), [
    { title: "Formula", content: "log_base(n) = ln(n) ÷ ln(base)" },
    { title: "Substitute values", content: `ln(${formatNumber(n)}) ÷ ln(${baseLabel}) = ${formatNumber(result, 10)}` },
  ], result);
}

// ---- 40 / 41. GCD & LCM ----
function gcdOf(a: number, b: number): number {
  a = Math.abs(a); b = Math.abs(b);
  while (b) { [a, b] = [b, a % b]; }
  return a;
}
function parseIntList(raw: string): number[] | null {
  const parts = raw.split(/[\s,]+/).filter(Boolean);
  const nums: number[] = [];
  for (const p of parts) {
    const n = parseNumber(p);
    if (n === null || !Number.isInteger(n)) return null;
    nums.push(n);
  }
  return nums.length >= 2 ? nums : null;
}

export function calculateGCD(values: Record<string, string>): CalcOutput {
  const nums = parseIntList(values.numbers ?? "");
  if (!nums) return fail("Enter two or more whole numbers separated by commas or spaces.");
  const result = nums.reduce((a, b) => gcdOf(a, b));
  return ok(String(result), [
    { title: "Inputs", content: nums.join(", ") },
    { title: "Apply the Euclidean algorithm pairwise", content: `GCD(${nums.join(", ")}) = ${result}` },
  ], result);
}

export function calculateLCM(values: Record<string, string>): CalcOutput {
  const nums = parseIntList(values.numbers ?? "");
  if (!nums) return fail("Enter two or more whole numbers separated by commas or spaces.");
  if (nums.some((n) => n === 0)) return fail("LCM is undefined when one of the numbers is zero.");
  const lcm2 = (a: number, b: number) => Math.abs(a * b) / gcdOf(a, b);
  const result = nums.reduce((a, b) => lcm2(a, b));
  return ok(String(result), [
    { title: "Inputs", content: nums.join(", ") },
    { title: "Formula", content: "LCM(a,b) = |a×b| ÷ GCD(a,b), applied pairwise" },
    { title: "Result", content: `LCM(${nums.join(", ")}) = ${result}` },
  ], result);
}

// ---- 42. Prime Number ----
export function calculatePrime(values: Record<string, string>): CalcOutput {
  const n = parseNumber(values.value);
  if (n === null || !Number.isInteger(n)) return fail("Enter a whole number.");
  if (n < 2) {
    return ok("Not prime", [{ title: "Rule", content: "Numbers less than 2 are not prime by definition." }], 0);
  }
  const factors: number[] = [];
  let remaining = n;
  for (let d = 2; d * d <= remaining; d++) {
    while (remaining % d === 0) {
      factors.push(d);
      remaining /= d;
    }
  }
  if (remaining > 1) factors.push(remaining);
  const isPrime = factors.length === 1;
  return ok(isPrime ? "Prime" : "Not prime", [
    { title: "Trial division up to √n", content: `Checking divisibility up to √${n} ≈ ${formatNumber(Math.sqrt(n), 2)}` },
    { title: "Prime factorization", content: factors.join(" × ") },
    { title: "Conclusion", content: isPrime ? `${n} has exactly one prime factor (itself) → prime.` : `${n} = ${factors.join(" × ")} → not prime.` },
  ], isPrime ? 1 : 0);
}

// ---- 43. Factorial ----
export function calculateFactorial(values: Record<string, string>): CalcOutput {
  const n = parseNumber(values.value);
  if (n === null || !Number.isInteger(n) || n < 0) return fail("Enter a non-negative whole number.");
  if (n > 170) return fail("Value too large — factorial exceeds representable number range (max 170).");
  let result = 1;
  const steps: string[] = [];
  for (let i = 2; i <= n; i++) result *= i;
  const expansion = n <= 1 ? "1" : Array.from({ length: n }, (_, i) => i + 1).join(" × ");
  return ok(formatNumber(result, 0), [
    { title: "Definition", content: `${n}! = ${expansion}` },
    { title: "Result", content: formatNumber(result, 0) },
  ], result);
}

// ---- 44. Probability ----
export function calculateProbability(values: Record<string, string>): CalcOutput {
  const favorable = parseNumber(values.favorableOutcomes);
  const total = parseNumber(values.totalOutcomes);
  if (favorable === null || total === null) return fail("Enter valid numbers for favorable and total outcomes.");
  if (total <= 0) return fail("Total outcomes must be greater than zero.");
  if (favorable < 0 || favorable > total) return fail("Favorable outcomes must be between 0 and the total outcomes.");
  const p = favorable / total;
  return ok(`${formatNumber(p * 100, 4)}%  (${formatNumber(p, 6)})`, [
    { title: "Formula", content: "P(event) = Favorable outcomes ÷ Total outcomes" },
    { title: "Substitute values", content: `${formatNumber(favorable)} ÷ ${formatNumber(total)} = ${formatNumber(p, 6)}` },
    { title: "As a percentage", content: `${formatNumber(p, 6)} × 100 = ${formatNumber(p * 100, 4)}%` },
  ], p);
}

// ---- 45. Permutation & Combination ----
function factorial(n: number): number {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}
export function calculatePermCombo(values: Record<string, string>): CalcOutput {
  const n = parseNumber(values.n);
  const r = parseNumber(values.r);
  const mode = values.mode ?? "permutation";
  if (n === null || r === null || !Number.isInteger(n) || !Number.isInteger(r)) return fail("Enter whole numbers for n and r.");
  if (n < 0 || r < 0) return fail("n and r must be non-negative.");
  if (r > n) return fail("r cannot be greater than n.");
  if (n > 170) return fail("n is too large — factorial would overflow.");
  if (mode === "permutation") {
    const result = factorial(n) / factorial(n - r);
    return ok(formatNumber(result, 0), [
      { title: "Formula", content: "P(n,r) = n! ÷ (n−r)!" },
      { title: "Substitute values", content: `${n}! ÷ ${n - r}! = ${formatNumber(result, 0)}` },
    ], result);
  }
  const result = factorial(n) / (factorial(r) * factorial(n - r));
  return ok(formatNumber(result, 0), [
    { title: "Formula", content: "C(n,r) = n! ÷ (r! × (n−r)!)" },
    { title: "Substitute values", content: `${n}! ÷ (${r}! × ${n - r}!) = ${formatNumber(result, 0)}` },
  ], result);
}

// ---- 46. Algebra: solve ax + b = c ----
export function calculateAlgebra(values: Record<string, string>): CalcOutput {
  const a = parseNumber(values.a);
  const b = parseNumber(values.b);
  const c = parseNumber(values.c);
  if (a === null || b === null || c === null) return fail("Enter valid numbers for a, b, and c in a·x + b = c.");
  if (a === 0) {
    if (b === c) return ok("Infinite solutions", [{ title: "Special case", content: "a = 0 and b = c → every x satisfies the equation." }]);
    return fail("No solution: a = 0 but b ≠ c makes the equation impossible.");
  }
  const x = (c - b) / a;
  return ok(`x = ${formatNumber(x, 8)}`, [
    { title: "Equation", content: `${formatNumber(a)}x + ${formatNumber(b)} = ${formatNumber(c)}` },
    { title: "Isolate x", content: `x = (${formatNumber(c)} − ${formatNumber(b)}) ÷ ${formatNumber(a)}` },
    { title: "Result", content: `x = ${formatNumber(x, 8)}` },
  ], x);
}

// ---- 47. Quadratic Equation ----
export function calculateQuadratic(values: Record<string, string>): CalcOutput {
  const a = parseNumber(values.a);
  const b = parseNumber(values.b);
  const c = parseNumber(values.c);
  if (a === null || b === null || c === null) return fail("Enter valid numbers for a, b, and c in ax² + bx + c = 0.");
  if (a === 0) return fail("'a' cannot be zero — this would not be a quadratic equation.");
  const discriminant = b * b - 4 * a * c;
  const steps = [
    { title: "Equation", content: `${formatNumber(a)}x² + ${formatNumber(b)}x + ${formatNumber(c)} = 0` },
    { title: "Discriminant", content: `Δ = b² − 4ac = ${formatNumber(b)}² − 4×${formatNumber(a)}×${formatNumber(c)} = ${formatNumber(discriminant)}` },
  ];
  if (discriminant > 0) {
    const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    steps.push({ title: "Two real roots", content: `x = (−b ± √Δ) ÷ 2a → x₁ = ${formatNumber(x1, 8)}, x₂ = ${formatNumber(x2, 8)}` });
    return ok(`x₁ = ${formatNumber(x1, 8)}, x₂ = ${formatNumber(x2, 8)}`, steps, x1);
  }
  if (discriminant === 0) {
    const x = -b / (2 * a);
    steps.push({ title: "One repeated real root", content: `x = −b ÷ 2a = ${formatNumber(x, 8)}` });
    return ok(`x = ${formatNumber(x, 8)} (double root)`, steps, x);
  }
  const realPart = -b / (2 * a);
  const imagPart = Math.sqrt(-discriminant) / (2 * a);
  steps.push({ title: "Complex roots (Δ < 0)", content: `x = ${formatNumber(realPart, 6)} ± ${formatNumber(Math.abs(imagPart), 6)}i` });
  return ok(`x = ${formatNumber(realPart, 6)} ± ${formatNumber(Math.abs(imagPart), 6)}i`, steps);
}

// ---- 48/49. Geometry: Area & Perimeter for common shapes ----
export function calculateGeometry(values: Record<string, string>): CalcOutput {
  const shape = values.shape ?? "circle";
  const num = (key: string) => parseNumber(values[key]);

  if (shape === "circle") {
    const r = num("radius");
    if (r === null || r <= 0) return fail("Enter a positive radius.");
    const area = Math.PI * r * r;
    const circumference = 2 * Math.PI * r;
    return ok(`Area = ${formatNumber(area, 4)}, Circumference = ${formatNumber(circumference, 4)}`, [
      { title: "Area formula", content: `A = πr² = π × ${formatNumber(r)}² = ${formatNumber(area, 4)}` },
      { title: "Circumference formula", content: `C = 2πr = 2 × π × ${formatNumber(r)} = ${formatNumber(circumference, 4)}` },
    ], area);
  }
  if (shape === "rectangle") {
    const w = num("width"), h = num("height");
    if (w === null || h === null || w <= 0 || h <= 0) return fail("Enter positive width and height.");
    const area = w * h;
    const perimeter = 2 * (w + h);
    return ok(`Area = ${formatNumber(area, 4)}, Perimeter = ${formatNumber(perimeter, 4)}`, [
      { title: "Area formula", content: `A = w × h = ${formatNumber(w)} × ${formatNumber(h)} = ${formatNumber(area, 4)}` },
      { title: "Perimeter formula", content: `P = 2(w + h) = 2(${formatNumber(w)} + ${formatNumber(h)}) = ${formatNumber(perimeter, 4)}` },
    ], area);
  }
  if (shape === "triangle") {
    const base = num("base"), height = num("height");
    const s1 = num("side1"), s2 = num("side2"), s3 = num("side3");
    if (base !== null && height !== null && base > 0 && height > 0) {
      const area = 0.5 * base * height;
      return ok(`Area = ${formatNumber(area, 4)}`, [
        { title: "Area formula", content: `A = ½ × base × height = ½ × ${formatNumber(base)} × ${formatNumber(height)} = ${formatNumber(area, 4)}` },
      ], area);
    }
    if (s1 !== null && s2 !== null && s3 !== null && s1 > 0 && s2 > 0 && s3 > 0) {
      if (s1 + s2 <= s3 || s2 + s3 <= s1 || s1 + s3 <= s2) return fail("These three side lengths cannot form a triangle.");
      const perimeter = s1 + s2 + s3;
      const s = perimeter / 2;
      const area = Math.sqrt(s * (s - s1) * (s - s2) * (s - s3));
      return ok(`Area = ${formatNumber(area, 4)}, Perimeter = ${formatNumber(perimeter, 4)}`, [
        { title: "Semi-perimeter", content: `s = (${formatNumber(s1)}+${formatNumber(s2)}+${formatNumber(s3)}) ÷ 2 = ${formatNumber(s)}` },
        { title: "Heron's formula", content: `A = √(s(s−a)(s−b)(s−c)) = ${formatNumber(area, 4)}` },
      ], area);
    }
    return fail("Enter either base & height, or all three side lengths.");
  }
  if (shape === "sphere") {
    const r = num("radius");
    if (r === null || r <= 0) return fail("Enter a positive radius.");
    const volume = (4 / 3) * Math.PI * r ** 3;
    const surface = 4 * Math.PI * r ** 2;
    return ok(`Volume = ${formatNumber(volume, 4)}, Surface Area = ${formatNumber(surface, 4)}`, [
      { title: "Volume formula", content: `V = (4/3)πr³ = ${formatNumber(volume, 4)}` },
      { title: "Surface area formula", content: `S = 4πr² = ${formatNumber(surface, 4)}` },
    ], volume);
  }
  if (shape === "cylinder") {
    const r = num("radius"), h = num("height");
    if (r === null || h === null || r <= 0 || h <= 0) return fail("Enter a positive radius and height.");
    const volume = Math.PI * r * r * h;
    const surface = 2 * Math.PI * r * (r + h);
    return ok(`Volume = ${formatNumber(volume, 4)}, Surface Area = ${formatNumber(surface, 4)}`, [
      { title: "Volume formula", content: `V = πr²h = ${formatNumber(volume, 4)}` },
      { title: "Surface area formula", content: `S = 2πr(r+h) = ${formatNumber(surface, 4)}` },
    ], volume);
  }
  if (shape === "cone") {
    const r = num("radius"), h = num("height");
    if (r === null || h === null || r <= 0 || h <= 0) return fail("Enter a positive radius and height.");
    const volume = (1 / 3) * Math.PI * r * r * h;
    const slant = Math.sqrt(r * r + h * h);
    const surface = Math.PI * r * (r + slant);
    return ok(`Volume = ${formatNumber(volume, 4)}, Surface Area = ${formatNumber(surface, 4)}`, [
      { title: "Volume formula", content: `V = (1/3)πr²h = ${formatNumber(volume, 4)}` },
      { title: "Slant height", content: `l = √(r²+h²) = ${formatNumber(slant, 4)}` },
      { title: "Surface area formula", content: `S = πr(r+l) = ${formatNumber(surface, 4)}` },
    ], volume);
  }
  return fail("Unknown shape selected.");
}

// ---- 50. Pythagorean Theorem ----
export function calculatePythagorean(values: Record<string, string>): CalcOutput {
  const a = parseNumber(values.a);
  const b = parseNumber(values.b);
  const c = parseNumber(values.c);
  const knownCount = [a, b, c].filter((v) => v !== null).length;
  if (knownCount !== 2) return fail("Enter exactly two of the three sides (a, b, c) and leave the unknown one blank.");

  if (a !== null && b !== null) {
    if (a <= 0 || b <= 0) return fail("Side lengths must be positive.");
    const result = Math.sqrt(a * a + b * b);
    return ok(`c = ${formatNumber(result, 6)}`, [
      { title: "Formula", content: "c = √(a² + b²)" },
      { title: "Substitute values", content: `√(${formatNumber(a)}² + ${formatNumber(b)}²) = ${formatNumber(result, 6)}` },
    ], result);
  }
  if (a !== null && c !== null) {
    if (a <= 0 || c <= 0 || c <= a) return fail("The hypotenuse (c) must be positive and longer than side a.");
    const result = Math.sqrt(c * c - a * a);
    return ok(`b = ${formatNumber(result, 6)}`, [
      { title: "Formula", content: "b = √(c² − a²)" },
      { title: "Substitute values", content: `√(${formatNumber(c)}² − ${formatNumber(a)}²) = ${formatNumber(result, 6)}` },
    ], result);
  }
  // b and c known
  if (b! <= 0 || c! <= 0 || c! <= b!) return fail("The hypotenuse (c) must be positive and longer than side b.");
  const result = Math.sqrt(c! * c! - b! * b!);
  return ok(`a = ${formatNumber(result, 6)}`, [
    { title: "Formula", content: "a = √(c² − b²)" },
    { title: "Substitute values", content: `√(${formatNumber(c!)}² − ${formatNumber(b!)}²) = ${formatNumber(result, 6)}` },
  ], result);
}
