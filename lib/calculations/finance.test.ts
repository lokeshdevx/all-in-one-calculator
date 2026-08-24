import { describe, it, expect } from "vitest";
import {
  calculateSimpleInterest, calculateCompoundInterest, calculateEMI, calculateSIP,
  calculateROI, calculateProfitLoss, calculateDiscount, calculateTax, calculateTip,
  calculateInflation,
} from "./finance";

describe("Simple Interest", () => {
  it("computes SI correctly", () => {
    const r = calculateSimpleInterest({ principal: "1000", rate: "5", time: "2" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(100);
  });
  it("rejects negative principal", () => {
    const r = calculateSimpleInterest({ principal: "-1000", rate: "5", time: "2" });
    expect(r.ok).toBe(false);
  });
});

describe("Compound Interest", () => {
  it("matches known compound interest value", () => {
    // P=1000, r=10%, t=1yr, n=1 -> A = 1100, interest = 100
    const r = calculateCompoundInterest({ principal: "1000", rate: "10", time: "1", compoundsPerYear: "1" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBeCloseTo(100, 6);
  });
  it("monthly compounding differs from annual", () => {
    const annual = calculateCompoundInterest({ principal: "1000", rate: "12", time: "1", compoundsPerYear: "1" });
    const monthly = calculateCompoundInterest({ principal: "1000", rate: "12", time: "1", compoundsPerYear: "12" });
    expect(annual.ok && monthly.ok).toBe(true);
    if (annual.ok && monthly.ok) expect(monthly.numeric!).toBeGreaterThan(annual.numeric!);
  });
});

describe("EMI", () => {
  it("computes EMI for a standard loan", () => {
    // Verified against standard EMI formula: P=1000000, R=8.5%, N=240 months
    const r = calculateEMI({ principal: "1000000", rate: "8.5", years: "20" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBeCloseTo(8678.4, 0);
  });
  it("handles zero interest rate", () => {
    const r = calculateEMI({ principal: "12000", rate: "0", years: "1" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBeCloseTo(1000, 6);
  });
  it("rejects zero principal", () => {
    const r = calculateEMI({ principal: "0", rate: "5", years: "1" });
    expect(r.ok).toBe(false);
  });
});

describe("SIP", () => {
  it("computes future value with positive returns", () => {
    const r = calculateSIP({ monthlyInvestment: "1000", annualReturnRate: "12", years: "1" });
    expect(r.ok).toBe(true);
    if (r.ok) {
      const invested = 12000;
      expect(r.numeric!).toBeGreaterThan(invested);
    }
  });
});

describe("ROI", () => {
  it("computes positive ROI", () => {
    const r = calculateROI({ cost: "1000", revenue: "1500" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(50);
  });
  it("computes negative ROI (loss)", () => {
    const r = calculateROI({ cost: "1000", revenue: "800" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(-20);
  });
  it("rejects zero cost", () => {
    const r = calculateROI({ cost: "0", revenue: "500" });
    expect(r.ok).toBe(false);
  });
});

describe("Profit & Loss", () => {
  it("detects profit", () => {
    const r = calculateProfitLoss({ costPrice: "100", sellingPrice: "150" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.result).toMatch(/Profit/);
  });
  it("detects loss", () => {
    const r = calculateProfitLoss({ costPrice: "150", sellingPrice: "100" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.result).toMatch(/Loss/);
  });
});

describe("Discount", () => {
  it("applies percentage discount", () => {
    const r = calculateDiscount({ price: "200", discountPercent: "25" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(150);
  });
});

describe("Tax", () => {
  it("adds exclusive tax", () => {
    const r = calculateTax({ amount: "100", taxRate: "10", mode: "exclusive" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(110);
  });
  it("backs out inclusive tax", () => {
    const r = calculateTax({ amount: "110", taxRate: "10", mode: "inclusive" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBeCloseTo(100, 6);
  });
});

describe("Tip", () => {
  it("splits tip and total between people", () => {
    const r = calculateTip({ billAmount: "100", tipPercent: "20", splitBetween: "4" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(30); // (100+20)/4
  });
  it("rejects zero people", () => {
    const r = calculateTip({ billAmount: "100", tipPercent: "20", splitBetween: "0" });
    expect(r.ok).toBe(false);
  });
});

describe("Inflation", () => {
  it("computes future cost", () => {
    const r = calculateInflation({ presentValue: "1000", annualInflationRate: "10", years: "1" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBeCloseTo(1100, 6);
  });
});
