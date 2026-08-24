import { describe, it, expect } from "vitest";
import {
  calculateAge, calculateDaysBetween, calculateDateAddSubtract, calculateTimeDuration,
  calculateBMI, calculateCalories, calculatePace, calculateFuelCost,
  calculateElectricityCost, calculateCookingConversion,
} from "./everyday";

describe("Age calculator", () => {
  it("computes age components correctly", () => {
    const r = calculateAge({ birthDate: "2000-01-01", asOfDate: "2024-06-15" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(24);
  });
  it("rejects birth date after as-of date", () => {
    const r = calculateAge({ birthDate: "2024-01-01", asOfDate: "2000-01-01" });
    expect(r.ok).toBe(false);
  });
});

describe("Days between dates", () => {
  it("computes days between March 1 and January 1 (non-leap span)", () => {
    const r = calculateDaysBetween({ startDate: "2026-01-01", endDate: "2026-03-01" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(59);
  });
});

describe("Date add/subtract", () => {
  it("adds months correctly", () => {
    const r = calculateDateAddSubtract({ startDate: "2026-01-31", amount: "1", unit: "months", direction: "add" });
    expect(r.ok).toBe(true);
  });
  it("rejects negative amount", () => {
    const r = calculateDateAddSubtract({ startDate: "2026-01-01", amount: "-1", unit: "days", direction: "add" });
    expect(r.ok).toBe(false);
  });
});

describe("Time duration", () => {
  it("computes duration within the same day", () => {
    const r = calculateTimeDuration({ startTime: "09:00", endTime: "17:30" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(510); // 8h30m
  });
  it("handles crossing midnight", () => {
    const r = calculateTimeDuration({ startTime: "23:00", endTime: "01:00" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(120);
  });
});

describe("BMI", () => {
  it("computes metric BMI", () => {
    const r = calculateBMI({ unit: "metric", weight: "70", height: "175" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBeCloseTo(22.86, 1);
  });
  it("rejects zero height", () => {
    const r = calculateBMI({ unit: "metric", weight: "70", height: "0" });
    expect(r.ok).toBe(false);
  });
});

describe("Calorie (TDEE)", () => {
  it("computes a plausible TDEE for an average adult male", () => {
    const r = calculateCalories({ weightKg: "80", heightCm: "180", age: "30", sex: "male", activityFactor: "1.55" });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.numeric!).toBeGreaterThan(1500);
      expect(r.numeric!).toBeLessThan(4000);
    }
  });
});

describe("Pace", () => {
  it("computes pace per distance unit", () => {
    // 10 units in 50 minutes -> pace = 5 min/unit
    const r = calculatePace({ distance: "10", hours: "0", minutes: "50", seconds: "0" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBeCloseTo(5, 6);
  });
});

describe("Fuel cost", () => {
  it("computes total fuel cost for a trip", () => {
    const r = calculateFuelCost({ distance: "300", fuelEfficiency: "15", pricePerUnit: "3" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(60);
  });
});

describe("Electricity cost", () => {
  it("computes monthly electricity cost", () => {
    const r = calculateElectricityCost({ powerWatts: "100", hoursPerDay: "5", days: "30", ratePerKwh: "0.2" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBeCloseTo(3, 6);
  });
});

describe("Cooking conversion", () => {
  it("converts cups to tablespoons", () => {
    const r = calculateCookingConversion({ value: "1", from: "cupUS", to: "tbsp" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBeCloseTo(16, 0);
  });
});
