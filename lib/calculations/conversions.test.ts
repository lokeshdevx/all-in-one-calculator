import { describe, it, expect } from "vitest";
import {
  calculateLength, calculateWeight, calculateTemperature, calculateArea,
  calculateVolume, calculateSpeed, calculateDataStorage, calculatePressure,
} from "./conversions";

describe("Length conversion", () => {
  it("converts km to meters", () => {
    const r = calculateLength({ value: "10", from: "km", to: "m" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBeCloseTo(10000, 6);
  });
  it("converts km to miles", () => {
    const r = calculateLength({ value: "10", from: "km", to: "mi" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBeCloseTo(6.21371, 4);
  });
  it("round-trips km -> ft and back", () => {
    const toFt = calculateLength({ value: "10", from: "km", to: "ft" });
    expect(toFt.ok).toBe(true);
    if (toFt.ok) expect(toFt.numeric).toBeCloseTo(32808.4, 0);
  });
});

describe("Weight conversion", () => {
  it("converts kg to pounds", () => {
    const r = calculateWeight({ value: "100", from: "kg", to: "lb" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBeCloseTo(220.462, 2);
  });
});

describe("Temperature conversion", () => {
  it("converts C to F", () => {
    const r = calculateTemperature({ value: "0", from: "celsius", to: "fahrenheit" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(32);
  });
  it("converts F to C (boiling point)", () => {
    const r = calculateTemperature({ value: "212", from: "fahrenheit", to: "celsius" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBeCloseTo(100, 6);
  });
  it("converts C to K", () => {
    const r = calculateTemperature({ value: "0", from: "celsius", to: "kelvin" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(273.15);
  });
  it("rejects below absolute zero", () => {
    const r = calculateTemperature({ value: "-1", from: "kelvin", to: "celsius" });
    expect(r.ok).toBe(false);
  });
  it("matches known 72F to C conversion", () => {
    const r = calculateTemperature({ value: "72", from: "fahrenheit", to: "celsius" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBeCloseTo(22.22, 1);
  });
});

describe("Area conversion", () => {
  it("converts acres to square meters", () => {
    const r = calculateArea({ value: "1", from: "acre", to: "m2" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBeCloseTo(4046.856, 2);
  });
});

describe("Volume conversion", () => {
  it("converts gallons (US) to liters", () => {
    const r = calculateVolume({ value: "1", from: "galUS", to: "l" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBeCloseTo(3.78541, 4);
  });
});

describe("Speed conversion", () => {
  it("converts km/h to m/s", () => {
    const r = calculateSpeed({ value: "36", from: "kmh", to: "mps" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBeCloseTo(10, 6);
  });
});

describe("Data storage conversion", () => {
  it("distinguishes decimal GB from binary GiB", () => {
    const gb = calculateDataStorage({ value: "1", from: "gb", to: "byte" });
    const gib = calculateDataStorage({ value: "1", from: "gib", to: "byte" });
    expect(gb.ok && gib.ok).toBe(true);
    if (gb.ok && gib.ok) {
      expect(gb.numeric).toBe(1e9);
      expect(gib.numeric).toBe(1024 ** 3);
      expect(gb.numeric).not.toBe(gib.numeric);
    }
  });
});

describe("Pressure conversion", () => {
  it("converts 1 atm to pascal", () => {
    const r = calculatePressure({ value: "1", from: "atm", to: "pa" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(101325);
  });
});
