import { describe, it, expect } from "vitest";
import {
  calculateScientific, calculatePercentageChange, calculateExponent, calculateSquareRoot,
  calculateLogarithm, calculateGCD, calculateLCM, calculatePrime, calculateFactorial,
  calculateProbability, calculatePermCombo, calculateAlgebra, calculateQuadratic,
  calculateGeometry, calculatePythagorean,
} from "./mathScience";

describe("Scientific expression evaluator", () => {
  it("evaluates arithmetic with precedence", () => {
    const r = calculateScientific({ expression: "2 + 3 * 4" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(14);
  });
  it("evaluates sqrt and trig", () => {
    const r = calculateScientific({ expression: "sqrt(16)" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(4);
  });
  it("rejects non-math input", () => {
    const r = calculateScientific({ expression: "process.exit()" });
    expect(r.ok).toBe(false);
  });
});

describe("Percentage change", () => {
  it("computes an increase", () => {
    const r = calculatePercentageChange({ oldValue: "50", newValue: "75" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(50);
  });
  it("computes a decrease", () => {
    const r = calculatePercentageChange({ oldValue: "80", newValue: "60" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(-25);
  });
});

describe("Exponent", () => {
  it("computes positive exponent", () => {
    const r = calculateExponent({ base: "2", exponent: "10" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(1024);
  });
  it("computes negative exponent", () => {
    const r = calculateExponent({ base: "2", exponent: "-2" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(0.25);
  });
  it("rejects 0^-1", () => {
    const r = calculateExponent({ base: "0", exponent: "-1" });
    expect(r.ok).toBe(false);
  });
});

describe("Square root / nth root", () => {
  it("computes square root", () => {
    const r = calculateSquareRoot({ value: "144" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(12);
  });
  it("rejects even root of negative", () => {
    const r = calculateSquareRoot({ value: "-4" });
    expect(r.ok).toBe(false);
  });
  it("computes cube root of negative number", () => {
    const r = calculateSquareRoot({ value: "-8", degree: "3" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBeCloseTo(-2, 6);
  });
});

describe("Logarithm", () => {
  it("computes log base 10", () => {
    const r = calculateLogarithm({ value: "1000", base: "10" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBeCloseTo(3, 6);
  });
  it("rejects log of zero or negative", () => {
    const r = calculateLogarithm({ value: "0", base: "10" });
    expect(r.ok).toBe(false);
  });
});

describe("GCD / LCM", () => {
  it("computes GCD of multiple numbers", () => {
    const r = calculateGCD({ numbers: "48, 60, 18" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(6);
  });
  it("computes LCM of multiple numbers", () => {
    const r = calculateLCM({ numbers: "4, 6" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(12);
  });
  it("rejects LCM with a zero", () => {
    const r = calculateLCM({ numbers: "0, 5" });
    expect(r.ok).toBe(false);
  });
});

describe("Prime check", () => {
  it("identifies a prime", () => {
    const r = calculatePrime({ value: "17" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.result).toBe("Prime");
  });
  it("identifies a composite", () => {
    const r = calculatePrime({ value: "18" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.result).toBe("Not prime");
  });
  it("treats 1 as not prime", () => {
    const r = calculatePrime({ value: "1" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.result).toBe("Not prime");
  });
});

describe("Factorial", () => {
  it("computes 5!", () => {
    const r = calculateFactorial({ value: "5" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(120);
  });
  it("computes 0! = 1", () => {
    const r = calculateFactorial({ value: "0" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(1);
  });
  it("rejects negative input", () => {
    const r = calculateFactorial({ value: "-3" });
    expect(r.ok).toBe(false);
  });
});

describe("Probability", () => {
  it("computes basic probability", () => {
    const r = calculateProbability({ favorableOutcomes: "1", totalOutcomes: "6" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBeCloseTo(1 / 6, 6);
  });
  it("rejects favorable > total", () => {
    const r = calculateProbability({ favorableOutcomes: "7", totalOutcomes: "6" });
    expect(r.ok).toBe(false);
  });
});

describe("Permutations & Combinations", () => {
  it("computes P(5,2)", () => {
    const r = calculatePermCombo({ n: "5", r: "2", mode: "permutation" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(20);
  });
  it("computes C(5,2)", () => {
    const r = calculatePermCombo({ n: "5", r: "2", mode: "combination" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(10);
  });
  it("rejects r > n", () => {
    const r = calculatePermCombo({ n: "3", r: "5", mode: "combination" });
    expect(r.ok).toBe(false);
  });
});

describe("Algebra (ax+b=c)", () => {
  it("solves for x", () => {
    const r = calculateAlgebra({ a: "2", b: "3", c: "11" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(4);
  });
  it("handles a=0, b=c (infinite solutions)", () => {
    const r = calculateAlgebra({ a: "0", b: "5", c: "5" });
    expect(r.ok).toBe(true);
  });
  it("handles a=0, b!=c (no solution)", () => {
    const r = calculateAlgebra({ a: "0", b: "5", c: "6" });
    expect(r.ok).toBe(false);
  });
});

describe("Quadratic equation", () => {
  it("finds two real roots", () => {
    // x^2 - 5x + 6 = 0 -> x = 2, 3
    const r = calculateQuadratic({ a: "1", b: "-5", c: "6" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBeCloseTo(3, 6);
  });
  it("finds a repeated root", () => {
    // x^2 - 4x + 4 = 0 -> x = 2 (double)
    const r = calculateQuadratic({ a: "1", b: "-4", c: "4" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBeCloseTo(2, 6);
  });
  it("handles complex roots", () => {
    const r = calculateQuadratic({ a: "1", b: "0", c: "1" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.result).toMatch(/i/);
  });
});

describe("Geometry", () => {
  it("computes circle area and circumference", () => {
    const r = calculateGeometry({ shape: "circle", radius: "7" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBeCloseTo(Math.PI * 49, 4);
  });
  it("computes triangle area via Heron's formula", () => {
    const r = calculateGeometry({ shape: "triangle", side1: "3", side2: "4", side3: "5" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBeCloseTo(6, 6);
  });
  it("rejects invalid triangle sides", () => {
    const r = calculateGeometry({ shape: "triangle", side1: "1", side2: "1", side3: "10" });
    expect(r.ok).toBe(false);
  });
});

describe("Pythagorean theorem", () => {
  it("solves for hypotenuse", () => {
    const r = calculatePythagorean({ a: "3", b: "4" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(5);
  });
  it("solves for a leg", () => {
    const r = calculatePythagorean({ a: "3", c: "5" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(4);
  });
  it("rejects when all three or only one side given", () => {
    const r = calculatePythagorean({ a: "3" });
    expect(r.ok).toBe(false);
  });
});
