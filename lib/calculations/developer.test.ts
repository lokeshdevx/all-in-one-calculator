import { describe, it, expect } from "vitest";
import {
  calculateBinaryArithmetic, calculateHexArithmetic, calculateBaseConverter,
  calculateUnixTimestamp, calculateByteSize, calculateProgress,
  calculateUnixPermissions, calculateIPSubnet, calculateRgbHex,
} from "./developer";

describe("Binary arithmetic", () => {
  it("adds two binary numbers", () => {
    const r = calculateBinaryArithmetic({ a: "1010", b: "0110", op: "add" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.result).toBe("10000"); // 10 + 6 = 16
  });
  it("rejects invalid binary digits", () => {
    const r = calculateBinaryArithmetic({ a: "102", b: "10", op: "add" });
    expect(r.ok).toBe(false);
  });
});

describe("Hex arithmetic", () => {
  it("adds two hex numbers", () => {
    const r = calculateHexArithmetic({ a: "FF", b: "01", op: "add" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.result).toBe("0x100");
  });
});

describe("Base converter", () => {
  it("converts decimal to binary", () => {
    const r = calculateBaseConverter({ value: "255", fromBase: "10", toBase: "2" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.result).toBe("11111111");
  });
  it("converts hex to decimal", () => {
    const r = calculateBaseConverter({ value: "FF", fromBase: "16", toBase: "10" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.result).toBe("255");
  });
});

describe("Unix timestamp", () => {
  it("converts timestamp to ISO date", () => {
    const r = calculateUnixTimestamp({ mode: "toDate", timestamp: "0", unit: "seconds" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.result).toBe("1970-01-01T00:00:00.000Z");
  });
  it("converts date to timestamp", () => {
    const r = calculateUnixTimestamp({ mode: "toTimestamp", date: "1970-01-01T00:00:00.000Z" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(0);
  });
});

describe("Byte size converter", () => {
  it("distinguishes decimal from binary scaling", () => {
    const r = calculateByteSize({ bytes: "1073741824" }); // 1 GiB exactly
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.result).toContain("1 GiB");
    }
  });
});

describe("Progress calculator", () => {
  it("computes percent complete", () => {
    const r = calculateProgress({ completed: "30", total: "120" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.numeric).toBe(25);
  });
  it("rejects completed > total", () => {
    const r = calculateProgress({ completed: "130", total: "120" });
    expect(r.ok).toBe(false);
  });
});

describe("Unix permissions", () => {
  it("converts octal 755 to symbolic", () => {
    const r = calculateUnixPermissions({ mode: "toSymbolic", octal: "755" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.result).toBe("rwxr-xr-x");
  });
  it("converts symbolic back to octal", () => {
    const r = calculateUnixPermissions({ mode: "toOctal", symbolic: "rwxr-xr-x" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.result).toBe("755");
  });
});

describe("IP subnet calculator", () => {
  it("computes network and broadcast for a /24", () => {
    const r = calculateIPSubnet({ ip: "192.168.1.130", cidr: "24" });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.result).toBe("192.168.1.0/24");
      expect(r.steps.find((s) => s.title.includes("Broadcast"))?.content).toBe("192.168.1.255");
    }
  });
  it("computes a /27 subnet correctly", () => {
    const r = calculateIPSubnet({ ip: "10.0.0.40", cidr: "27" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.result).toBe("10.0.0.32/27");
  });
});

describe("RGB <-> HEX", () => {
  it("converts RGB to hex", () => {
    const r = calculateRgbHex({ mode: "rgbToHex", r: "59", g: "130", b: "246" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.result).toBe("#3B82F6");
  });
  it("converts hex to RGB", () => {
    const r = calculateRgbHex({ mode: "hexToRgb", hex: "#3B82F6" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.result).toBe("rgb(59, 130, 246)");
  });
  it("rejects out-of-range RGB values", () => {
    const r = calculateRgbHex({ mode: "rgbToHex", r: "300", g: "0", b: "0" });
    expect(r.ok).toBe(false);
  });
});
