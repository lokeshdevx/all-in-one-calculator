import { CalcOutput, fail, ok } from "../types";
import { parseNumber, formatNumber } from "../parse";

// ---- 61. Binary Calculator (arithmetic on binary strings) ----
function parseBinary(raw: string): number | null {
  if (!/^[01]+$/.test(raw.trim())) return null;
  return parseInt(raw.trim(), 2);
}
export function calculateBinaryArithmetic(values: Record<string, string>): CalcOutput {
  const a = parseBinary(values.a ?? "");
  const b = parseBinary(values.b ?? "");
  const op = values.op ?? "add";
  if (a === null || b === null) return fail("Enter valid binary numbers (only 0s and 1s).");
  let result: number;
  let symbol: string;
  if (op === "add") { result = a + b; symbol = "+"; }
  else if (op === "subtract") { result = a - b; symbol = "−"; }
  else if (op === "multiply") { result = a * b; symbol = "×"; }
  else if (op === "divide") {
    if (b === 0) return fail("Division by zero is undefined.");
    result = Math.trunc(a / b);
    symbol = "÷";
  } else return fail("Unknown operation.");
  if (result < 0) return fail("This calculator only supports non-negative binary results.");
  return ok(result.toString(2), [
    { title: "Convert binary inputs to decimal", content: `${values.a} → ${a}, ${values.b} → ${b}` },
    { title: `Compute in decimal (${symbol})`, content: `${a} ${symbol} ${b} = ${result}` },
    { title: "Convert result back to binary", content: `${result} → ${result.toString(2)}` },
  ], result);
}

// ---- 62. Hexadecimal Calculator ----
function parseHex(raw: string): number | null {
  const trimmed = raw.trim().replace(/^0x/i, "");
  if (!/^[0-9a-fA-F]+$/.test(trimmed)) return null;
  return parseInt(trimmed, 16);
}
export function calculateHexArithmetic(values: Record<string, string>): CalcOutput {
  const a = parseHex(values.a ?? "");
  const b = parseHex(values.b ?? "");
  const op = values.op ?? "add";
  if (a === null || b === null) return fail("Enter valid hexadecimal numbers (0-9, A-F).");
  let result: number;
  let symbol: string;
  if (op === "add") { result = a + b; symbol = "+"; }
  else if (op === "subtract") { result = a - b; symbol = "−"; }
  else if (op === "multiply") { result = a * b; symbol = "×"; }
  else if (op === "divide") {
    if (b === 0) return fail("Division by zero is undefined.");
    result = Math.trunc(a / b);
    symbol = "÷";
  } else return fail("Unknown operation.");
  if (result < 0) return fail("This calculator only supports non-negative hexadecimal results.");
  return ok("0x" + result.toString(16).toUpperCase(), [
    { title: "Convert hex inputs to decimal", content: `${values.a} → ${a}, ${values.b} → ${b}` },
    { title: `Compute in decimal (${symbol})`, content: `${a} ${symbol} ${b} = ${result}` },
    { title: "Convert result back to hexadecimal", content: `${result} → 0x${result.toString(16).toUpperCase()}` },
  ], result);
}

// ---- 63/64/general: Base Converter (binary/octal/decimal/hex) ----
export function calculateBaseConverter(values: Record<string, string>): CalcOutput {
  const value = values.value?.trim();
  const fromBase = parseNumber(values.fromBase);
  const toBase = parseNumber(values.toBase);
  if (!value) return fail("Enter a value to convert.");
  if (fromBase === null || toBase === null || ![2, 8, 10, 16].includes(fromBase) || ![2, 8, 10, 16].includes(toBase)) {
    return fail("Base must be one of 2 (binary), 8 (octal), 10 (decimal), or 16 (hexadecimal).");
  }
  const decimal = parseInt(value.replace(/^0[xob]/i, ""), fromBase);
  if (Number.isNaN(decimal)) return fail(`"${value}" is not a valid base-${fromBase} number.`);
  const result = decimal.toString(toBase).toUpperCase();
  const baseLabel = (n: number) => (n === 2 ? "binary" : n === 8 ? "octal" : n === 10 ? "decimal" : "hexadecimal");
  return ok(result, [
    { title: `Convert from base-${fromBase} (${baseLabel(fromBase)}) to decimal`, content: `${value} → ${decimal}` },
    { title: `Convert decimal to base-${toBase} (${baseLabel(toBase)})`, content: `${decimal} → ${result}` },
  ], decimal);
}

// ---- 65. Unix Timestamp Converter ----
export function calculateUnixTimestamp(values: Record<string, string>): CalcOutput {
  const mode = values.mode ?? "toDate";
  if (mode === "toDate") {
    const ts = parseNumber(values.timestamp);
    if (ts === null) return fail("Enter a valid Unix timestamp (seconds since Jan 1, 1970 UTC).");
    const unit = values.unit ?? "seconds";
    const ms = unit === "seconds" ? ts * 1000 : unit === "milliseconds" ? ts : ts / 1000;
    const date = new Date(ms);
    if (isNaN(date.getTime())) return fail("This timestamp is out of the representable date range.");
    return ok(date.toISOString(), [
      { title: "Convert to milliseconds", content: `${formatNumber(ts)} ${unit} → ${formatNumber(ms)} ms` },
      { title: "Convert to date (UTC)", content: date.toUTCString() },
    ]);
  }
  const dateStr = values.date;
  if (!dateStr) return fail("Enter a valid date/time.");
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return fail("Enter a valid date/time.");
  const seconds = Math.floor(date.getTime() / 1000);
  return ok(String(seconds), [
    { title: "Parse the date", content: date.toUTCString() },
    { title: "Convert to Unix seconds", content: `${date.getTime()} ms ÷ 1000 = ${seconds}` },
  ], seconds);
}

// ---- 66. Byte Size Converter (decimal vs binary, alias of data-storage but standalone entry point) ----
export function calculateByteSize(values: Record<string, string>): CalcOutput {
  const bytes = parseNumber(values.bytes);
  if (bytes === null || bytes < 0) return fail("Enter a non-negative number of bytes.");
  const decimalUnits = ["B", "KB", "MB", "GB", "TB", "PB"];
  const binaryUnits = ["B", "KiB", "MiB", "GiB", "TiB", "PiB"];
  function scale(base: number, units: string[]) {
    let v = bytes!;
    let i = 0;
    while (v >= base && i < units.length - 1) { v /= base; i++; }
    return `${formatNumber(v, 3)} ${units[i]}`;
  }
  const decimalResult = scale(1000, decimalUnits);
  const binaryResult = scale(1024, binaryUnits);
  return ok(`${decimalResult}  /  ${binaryResult} (binary)`, [
    { title: "Decimal scaling (÷1000 per step)", content: decimalResult },
    { title: "Binary scaling (÷1024 per step)", content: binaryResult },
    { title: "Note", content: "KB/MB/GB use base 1000; KiB/MiB/GiB use base 1024 — they are not interchangeable." },
  ], bytes);
}

// ---- 67. Percentage / Progress Calculator ----
export function calculateProgress(values: Record<string, string>): CalcOutput {
  const completed = parseNumber(values.completed);
  const total = parseNumber(values.total);
  if (completed === null || total === null) return fail("Enter valid numbers for completed and total.");
  if (total <= 0) return fail("Total must be greater than zero.");
  if (completed < 0 || completed > total) return fail("Completed must be between 0 and the total.");
  const pct = (completed / total) * 100;
  const remaining = total - completed;
  return ok(`${formatNumber(pct, 2)}%`, [
    { title: "Formula", content: "Progress = (Completed ÷ Total) × 100" },
    { title: "Substitute values", content: `(${formatNumber(completed)} ÷ ${formatNumber(total)}) × 100 = ${formatNumber(pct, 2)}%` },
    { title: "Remaining", content: `${formatNumber(total)} − ${formatNumber(completed)} = ${formatNumber(remaining)}` },
  ], pct);
}

// ---- 68. Unix Permissions Calculator ----
const PERM_LETTERS = ["r", "w", "x"];
export function calculateUnixPermissions(values: Record<string, string>): CalcOutput {
  const mode = values.mode ?? "toSymbolic";
  if (mode === "toSymbolic") {
    const octal = values.octal?.trim();
    if (!octal || !/^[0-7]{3,4}$/.test(octal)) return fail("Enter a 3- or 4-digit octal permission value, e.g. 755.");
    const digits = octal.length === 4 ? octal.slice(1) : octal;
    const symbolic = digits
      .split("")
      .map((d) => {
        const n = Number(d);
        return PERM_LETTERS.map((letter, i) => (n & (4 >> i) ? letter : "-")).join("");
      })
      .join("");
    return ok(symbolic, [
      { title: "Split into owner/group/other digits", content: digits.split("").join(" · ") },
      { title: "Expand each digit to r/w/x bits", content: symbolic },
    ]);
  }
  const symbolic = values.symbolic?.trim();
  if (!symbolic || !/^[rwx-]{9}$/.test(symbolic)) return fail('Enter a 9-character permission string, e.g. "rwxr-xr--".');
  const groups = [symbolic.slice(0, 3), symbolic.slice(3, 6), symbolic.slice(6, 9)];
  const octalDigits = groups.map((g) =>
    g.split("").reduce((acc, ch, i) => acc + (ch !== "-" ? 4 >> i : 0), 0)
  );
  return ok(octalDigits.join(""), [
    { title: "Split into owner/group/other", content: groups.join(" · ") },
    { title: "Convert each group to a digit", content: `${groups.map((g, i) => `${g}→${octalDigits[i]}`).join(", ")}` },
  ]);
}

// ---- 69. IP Subnet Calculator ----
function ipToInt(ip: string): number | null {
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some((p) => Number.isNaN(p) || p < 0 || p > 255)) return null;
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}
function intToIp(n: number): string {
  return [24, 16, 8, 0].map((shift) => (n >>> shift) & 255).join(".");
}
export function calculateIPSubnet(values: Record<string, string>): CalcOutput {
  const ip = values.ip?.trim();
  const cidr = parseNumber(values.cidr);
  if (!ip) return fail("Enter a valid IPv4 address, e.g. 192.168.1.10.");
  if (cidr === null || !Number.isInteger(cidr) || cidr < 0 || cidr > 32) return fail("Enter a CIDR prefix length between 0 and 32.");
  const ipInt = ipToInt(ip);
  if (ipInt === null) return fail("Enter a valid IPv4 address, e.g. 192.168.1.10.");
  const maskInt = cidr === 0 ? 0 : (0xffffffff << (32 - cidr)) >>> 0;
  const network = (ipInt & maskInt) >>> 0;
  const broadcast = (network | (~maskInt >>> 0)) >>> 0;
  const totalHosts = 2 ** (32 - cidr);
  const usableHosts = cidr >= 31 ? 0 : totalHosts - 2;
  return ok(`${intToIp(network)}/${cidr}`, [
    { title: "Subnet mask", content: intToIp(maskInt) },
    { title: "Network address", content: `${ip} AND ${intToIp(maskInt)} = ${intToIp(network)}` },
    { title: "Broadcast address", content: intToIp(broadcast) },
    { title: "Usable host addresses", content: `2^(32−${cidr}) − 2 = ${formatNumber(usableHosts)}` },
    { title: "First / last usable host", content: cidr >= 31 ? "N/A (point-to-point or single host)" : `${intToIp(network + 1)} – ${intToIp(broadcast - 1)}` },
  ]);
}

// ---- 70. RGB ↔ HEX Converter ----
export function calculateRgbHex(values: Record<string, string>): CalcOutput {
  const mode = values.mode ?? "rgbToHex";
  if (mode === "rgbToHex") {
    const r = parseNumber(values.r), g = parseNumber(values.g), b = parseNumber(values.b);
    if (r === null || g === null || b === null) return fail("Enter valid R, G, B values.");
    if ([r, g, b].some((v) => v < 0 || v > 255 || !Number.isInteger(v))) return fail("R, G, B must be whole numbers between 0 and 255.");
    const hex = "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();
    return ok(hex, [
      { title: "Convert each channel to 2-digit hex", content: `R:${r}→${r.toString(16).padStart(2, "0")}, G:${g}→${g.toString(16).padStart(2, "0")}, B:${b}→${b.toString(16).padStart(2, "0")}` },
      { title: "Combine", content: hex },
    ]);
  }
  const hex = values.hex?.trim().replace(/^#/, "");
  if (!hex || !/^[0-9a-fA-F]{6}$/.test(hex)) return fail("Enter a valid 6-digit hex color, e.g. #3B82F6.");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return ok(`rgb(${r}, ${g}, ${b})`, [
    { title: "Split into channel pairs", content: `${hex.slice(0, 2)} · ${hex.slice(2, 4)} · ${hex.slice(4, 6)}` },
    { title: "Convert each pair from hex to decimal", content: `R:${r}, G:${g}, B:${b}` },
  ]);
}
