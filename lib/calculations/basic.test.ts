import { describe, it, expect } from "vitest";
import {
  calculateAddition, calculateSubtraction, calculateMultiplication, calculateDivision,
  calculatePercentage, calculateAverage, calculateRatio, calculateFraction,
  calculateDecimal, calculateModulo,
} from "./basic";

describe("Addition", () => {
  it("adds multiple positive integers", () => {
    const r = calculateAddition({ numbers: "25, 35, 10" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(70);
  });
  it("handles decimals and negatives", () => {
    const r = calculateAddition({ numbers: "-2.5, 3.75, -1" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBeCloseTo(0.25);
  });
  it("handles scientific notation", () => {
    const r = calculateAddition({ numbers: "1e3, 2e3" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(3000);
  });
  it("rejects invalid input", () => {
    const r = calculateAddition({ numbers: "abc, 5" });
    expect(r.ok).toBe(false);
  });
});

describe("Subtraction", () => {
  it("subtracts left to right", () => {
    const r = calculateSubtraction({ numbers: "100, 20, 5" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(75);
  });
  it("requires at least two numbers", () => {
    const r = calculateSubtraction({ numbers: "5" });
    expect(r.ok).toBe(false);
  });
});

describe("Multiplication", () => {
  it("multiplies including negatives", () => {
    const r = calculateMultiplication({ numbers: "-2, 3, 4" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(-24);
  });
});

describe("Division", () => {
  it("divides two numbers", () => {
    const r = calculateDivision({ dividend: "10", divisor: "4" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(2.5);
  });
  it("rejects division by zero", () => {
    const r = calculateDivision({ dividend: "10", divisor: "0" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toMatch(/zero/i);
  });
  it("handles negative dividend", () => {
    const r = calculateDivision({ dividend: "-9", divisor: "3" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(-3);
  });
});

describe("Percentage", () => {
  it("computes X% of Y", () => {
    const r = calculatePercentage({ mode: "of", x: "20", y: "500" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(100);
  });
  it("computes X is what % of Y", () => {
    const r = calculatePercentage({ mode: "isWhatPercentOf", x: "50", y: "200" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(25);
  });
  it("computes percentage increase", () => {
    const r = calculatePercentage({ mode: "increase", x: "100", y: "150" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(50);
  });
  it("rejects zero denominator for isWhatPercentOf", () => {
    const r = calculatePercentage({ mode: "isWhatPercentOf", x: "10", y: "0" });
    expect(r.ok).toBe(false);
  });
});

describe("Average", () => {
  it("computes simple mean", () => {
    const r = calculateAverage({ numbers: "2, 4, 6, 8" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(5);
  });
  it("computes weighted mean", () => {
    const r = calculateAverage({ numbers: "80, 90", weights: "1, 3" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBeCloseTo(87.5);
  });
  it("rejects mismatched weights length", () => {
    const r = calculateAverage({ numbers: "1,2,3", weights: "1,1" });
    expect(r.ok).toBe(false);
  });
});

describe("Ratio", () => {
  it("simplifies an integer ratio", () => {
    const r = calculateRatio({ a: "8", b: "12" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.result).toBe("2 : 3");
  });
  it("rejects both terms zero", () => {
    const r = calculateRatio({ a: "0", b: "0" });
    expect(r.ok).toBe(false);
  });
});

describe("Fraction", () => {
  it("adds two fractions", () => {
    const r = calculateFraction({ op: "add", fraction1: "1/2", fraction2: "1/3" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.result).toBe("5/6");
  });
  it("multiplies fractions", () => {
    const r = calculateFraction({ op: "multiply", fraction1: "2/3", fraction2: "3/4" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.result).toBe("1/2");
  });
  it("handles mixed numbers", () => {
    const r = calculateFraction({ op: "add", fraction1: "1 1/2", fraction2: "1/2" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.result).toBe("2/1");
  });
  it("rejects divide by zero fraction", () => {
    const r = calculateFraction({ op: "divide", fraction1: "1/2", fraction2: "0/5" });
    expect(r.ok).toBe(false);
  });
});

describe("Decimal", () => {
  it("converts decimal to fraction", () => {
    const r = calculateDecimal({ mode: "toFraction", value: "0.75" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.result).toBe("3/4");
  });
  it("converts decimal to percentage", () => {
    const r = calculateDecimal({ mode: "toPercentage", value: "0.5" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(50);
  });
  it("rounds to given decimal places", () => {
    const r = calculateDecimal({ mode: "round", value: "3.14159", places: "2" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(3.14);
  });
});

describe("Modulo", () => {
  it("computes positive mod", () => {
    const r = calculateModulo({ a: "10", b: "3" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(1);
  });
  it("computes negative dividend mod (JS semantics)", () => {
    const r = calculateModulo({ a: "-10", b: "3" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(-1);
  });
  it("rejects zero modulus", () => {
    const r = calculateModulo({ a: "10", b: "0" });
    expect(r.ok).toBe(false);
  });
});
