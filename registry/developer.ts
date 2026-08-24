import { CalculatorDefinition } from "../lib/types";
import {
  calculateBinaryArithmetic, calculateHexArithmetic, calculateBaseConverter,
  calculateUnixTimestamp, calculateByteSize, calculateProgress,
  calculateUnixPermissions, calculateIPSubnet, calculateRgbHex,
} from "../lib/calculations/developer";

export const developerCalculators: CalculatorDefinition[] = [
  {
    slug: "binary-calculator",
    title: "Binary Calculator",
    category: "developer",
    description: "Add, subtract, multiply, or divide numbers entered in binary (base 2).",
    fields: [
      { id: "a", label: "First binary number", type: "text", defaultValue: "1010", required: true },
      { id: "op", label: "Operation", type: "select", defaultValue: "add", options: [
        { label: "Add", value: "add" }, { label: "Subtract", value: "subtract" }, { label: "Multiply", value: "multiply" }, { label: "Divide", value: "divide" },
      ] },
      { id: "b", label: "Second binary number", type: "text", defaultValue: "0110", required: true },
    ],
    calculate: calculateBinaryArithmetic,
    formula: "Convert both operands to decimal, apply the operation, convert the result back to binary",
    explanation: "Binary numbers use only digits 0 and 1. Rather than performing binary arithmetic directly, this calculator converts to decimal, computes normally, and converts the result back for clarity.",
    example: { inputs: { a: "1010", op: "add", b: "0110" }, note: "1010₂ (10) + 0110₂ (6) = 10000₂ (16)" },
    faq: [
      { q: "Can I subtract a larger binary number from a smaller one?", a: "This calculator only supports non-negative results; for negative results, swap the operands or use signed representations manually." },
      { q: "How do I convert a single binary number to decimal?", a: "Use the Base Converter for direct base-to-base conversion without arithmetic." },
    ],
    related: ["hexadecimal-calculator", "base-converter"],
  },
  {
    slug: "hexadecimal-calculator",
    title: "Hexadecimal Calculator",
    category: "developer",
    description: "Add, subtract, multiply, or divide numbers entered in hexadecimal (base 16).",
    fields: [
      { id: "a", label: "First hex number", type: "text", defaultValue: "FF", required: true },
      { id: "op", label: "Operation", type: "select", defaultValue: "add", options: [
        { label: "Add", value: "add" }, { label: "Subtract", value: "subtract" }, { label: "Multiply", value: "multiply" }, { label: "Divide", value: "divide" },
      ] },
      { id: "b", label: "Second hex number", type: "text", defaultValue: "01", required: true },
    ],
    calculate: calculateHexArithmetic,
    formula: "Convert both operands to decimal, apply the operation, convert the result back to hexadecimal",
    explanation: "Hexadecimal uses 16 digits (0-9, A-F) and is common in programming for representing bytes and memory addresses compactly.",
    example: { inputs: { a: "FF", op: "add", b: "01" }, note: "0xFF (255) + 0x01 (1) = 0x100 (256)" },
    faq: [
      { q: "Do I need to prefix numbers with 0x?", a: "No — the prefix is optional and stripped automatically if present." },
      { q: "Is hex case-sensitive?", a: "No — both uppercase and lowercase letters A-F are accepted." },
    ],
    related: ["binary-calculator", "base-converter", "rgb-hex-converter"],
  },
  {
    slug: "base-converter",
    title: "Base Converter",
    category: "developer",
    description: "Convert numbers between binary, octal, decimal, and hexadecimal.",
    fields: [
      { id: "value", label: "Value", type: "text", defaultValue: "255", required: true },
      { id: "fromBase", label: "From base", type: "select", defaultValue: "10", options: [
        { label: "Binary (2)", value: "2" }, { label: "Octal (8)", value: "8" }, { label: "Decimal (10)", value: "10" }, { label: "Hexadecimal (16)", value: "16" },
      ] },
      { id: "toBase", label: "To base", type: "select", defaultValue: "2", options: [
        { label: "Binary (2)", value: "2" }, { label: "Octal (8)", value: "8" }, { label: "Decimal (10)", value: "10" }, { label: "Hexadecimal (16)", value: "16" },
      ] },
    ],
    calculate: calculateBaseConverter,
    formula: "Value (base A) → decimal → Value (base B)",
    explanation: "Every positional numeral system represents the same underlying quantity with a different set of digits and place values. Converting through decimal as an intermediate step works for any pair of bases.",
    example: { inputs: { value: "255", fromBase: "10", toBase: "2" }, note: "255 (decimal) = 11111111 (binary)" },
    faq: [
      { q: "Can I convert directly between binary and hex?", a: "Yes — select binary as the source base and hex as the target; the conversion still routes through decimal internally." },
      { q: "What if my input has invalid digits for the chosen base?", a: "The calculator validates the input and reports an error, e.g. entering '9' as a binary digit." },
    ],
    related: ["binary-calculator", "hexadecimal-calculator"],
  },
  {
    slug: "binary-decimal-converter",
    title: "Binary ↔ Decimal Converter",
    category: "developer",
    description: "Convert numbers directly between binary (base 2) and decimal (base 10).",
    fields: [
      { id: "mode", label: "Direction", type: "select", defaultValue: "binToDec", options: [
        { label: "Binary → Decimal", value: "binToDec" }, { label: "Decimal → Binary", value: "decToBin" },
      ] },
      { id: "value", label: "Value", type: "text", defaultValue: "11111111", required: true },
    ],
    calculate: (values) => {
      const mode = values.mode ?? "binToDec";
      return calculateBaseConverter({
        value: values.value,
        fromBase: mode === "binToDec" ? "2" : "10",
        toBase: mode === "binToDec" ? "10" : "2",
      });
    },
    formula: "Decimal = Σ (bit × 2^position)",
    explanation: "Binary represents numbers using only powers of two. Each binary digit (bit) corresponds to a power of 2, and summing the active bits' place values gives the decimal equivalent.",
    example: { inputs: { mode: "binToDec", value: "11111111" }, note: "11111111₂ = 255 in decimal." },
    faq: [
      { q: "What's the largest 8-bit binary number?", a: "11111111, which equals 255 in decimal." },
      { q: "Can I convert decimal to binary here too?", a: "Yes — switch the direction dropdown to Decimal → Binary." },
    ],
    related: ["base-converter", "hex-decimal-converter"],
  },
  {
    slug: "hex-decimal-converter",
    title: "Hex ↔ Decimal Converter",
    category: "developer",
    description: "Convert numbers directly between hexadecimal (base 16) and decimal (base 10).",
    fields: [
      { id: "mode", label: "Direction", type: "select", defaultValue: "hexToDec", options: [
        { label: "Hex → Decimal", value: "hexToDec" }, { label: "Decimal → Hex", value: "decToHex" },
      ] },
      { id: "value", label: "Value", type: "text", defaultValue: "FF", required: true },
    ],
    calculate: (values) => {
      const mode = values.mode ?? "hexToDec";
      return calculateBaseConverter({
        value: values.value,
        fromBase: mode === "hexToDec" ? "16" : "10",
        toBase: mode === "hexToDec" ? "10" : "16",
      });
    },
    formula: "Decimal = Σ (hex digit value × 16^position)",
    explanation: "Hexadecimal represents numbers using 16 symbols (0-9, A-F). Each position's digit is multiplied by a power of 16 and summed to get the decimal equivalent.",
    example: { inputs: { mode: "hexToDec", value: "FF" }, note: "0xFF = 255 in decimal." },
    faq: [
      { q: "Why is hexadecimal common in programming?", a: "Each hex digit maps exactly to 4 bits, so two hex digits represent one byte cleanly — more compact than binary and easy to convert." },
      { q: "Is A-F case sensitive?", a: "No, both uppercase and lowercase are accepted." },
    ],
    related: ["base-converter", "binary-decimal-converter"],
  },
  {
    slug: "unix-timestamp-converter",
    title: "Unix Timestamp Converter",
    category: "developer",
    description: "Convert between Unix timestamps and human-readable dates.",
    fields: [
      { id: "mode", label: "Direction", type: "select", defaultValue: "toDate", options: [
        { label: "Timestamp → Date", value: "toDate" }, { label: "Date → Timestamp", value: "toTimestamp" },
      ] },
      { id: "timestamp", label: "Timestamp (for Timestamp → Date)", type: "number", defaultValue: "0" },
      { id: "unit", label: "Timestamp unit", type: "select", defaultValue: "seconds", options: [
        { label: "Seconds", value: "seconds" }, { label: "Milliseconds", value: "milliseconds" }, { label: "Microseconds", value: "microseconds" },
      ] },
      { id: "date", label: "Date/time (for Date → Timestamp)", type: "text", placeholder: "2026-01-15T12:00:00Z" },
    ],
    calculate: calculateUnixTimestamp,
    formula: "Unix time = seconds elapsed since 1970-01-01T00:00:00 UTC",
    explanation: "Unix timestamps count elapsed time from a fixed reference point (the Unix epoch), making date arithmetic and storage simpler for computers.",
    example: { inputs: { mode: "toDate", timestamp: "0", unit: "seconds" }, note: "Timestamp 0 corresponds to January 1, 1970, 00:00:00 UTC." },
    faq: [
      { q: "Why do some systems use milliseconds instead of seconds?", a: "JavaScript's Date object internally uses milliseconds since the epoch for finer time resolution; select the matching unit for correct results." },
      { q: "Does this account for time zones?", a: "Unix timestamps are always UTC-based; convert to a local time zone separately if needed." },
    ],
    related: ["time-converter", "date-calculator"],
  },
  {
    slug: "byte-size-converter",
    title: "Byte Size Converter",
    category: "developer",
    description: "See a byte count expressed in both decimal (KB/MB/GB) and binary (KiB/MiB/GiB) scales at once.",
    fields: [
      { id: "bytes", label: "Bytes", type: "number", defaultValue: "1073741824", required: true },
    ],
    calculate: calculateByteSize,
    formula: "Decimal: divide by 1000 per step   |   Binary: divide by 1024 per step",
    explanation: "This calculator shows a raw byte count auto-scaled in both the decimal (SI, base-1000) and binary (IEC, base-1024) systems side by side, so the difference between e.g. GB and GiB is immediately visible.",
    example: { inputs: { bytes: "1073741824" }, note: "1,073,741,824 bytes = 1.074 GB (decimal) = 1 GiB (binary)." },
    faq: [
      { q: "Why do KB and KiB give different results for the same byte count?", a: "KB is defined as 1000 bytes; KiB is defined as 1024 bytes — a roughly 2.4% difference that compounds at larger scales." },
      { q: "Which should software developers use?", a: "IEC binary units (KiB, MiB, GiB) are more precise for describing memory and are increasingly preferred in technical documentation." },
    ],
    related: ["data-storage-converter", "base-converter"],
  },
  {
    slug: "percentage-progress-calculator",
    title: "Percentage / Progress Calculator",
    category: "developer",
    description: "Calculate percentage completion of a task, project, or download given completed and total units.",
    fields: [
      { id: "completed", label: "Completed", type: "number", defaultValue: "30", required: true },
      { id: "total", label: "Total", type: "number", defaultValue: "120", required: true },
    ],
    calculate: calculateProgress,
    formula: "Progress % = (Completed ÷ Total) × 100",
    explanation: "This is the same core percentage formula used across dashboards and progress bars — how much of a total has been finished.",
    example: { inputs: { completed: "30", total: "120" }, note: "30 of 120 tasks complete = 25% progress." },
    faq: [
      { q: "Can completed exceed total?", a: "No — completed must be between 0 and the total; the calculator flags out-of-range values." },
      { q: "How is 'remaining' calculated?", a: "Remaining = Total − Completed, shown alongside the percentage." },
    ],
    related: ["percentage-calculator"],
  },
  {
    slug: "unix-permissions-calculator",
    title: "Unix Permissions Calculator",
    category: "developer",
    description: "Convert Unix/Linux file permissions between octal (e.g. 755) and symbolic (e.g. rwxr-xr-x) notation.",
    fields: [
      { id: "mode", label: "Direction", type: "select", defaultValue: "toSymbolic", options: [
        { label: "Octal → Symbolic", value: "toSymbolic" }, { label: "Symbolic → Octal", value: "toOctal" },
      ] },
      { id: "octal", label: "Octal value (for Octal → Symbolic)", type: "text", defaultValue: "755" },
      { id: "symbolic", label: "Symbolic value (for Symbolic → Octal)", type: "text", placeholder: "rwxr-xr-x" },
    ],
    calculate: calculateUnixPermissions,
    formula: "Each octal digit (0-7) expands to 3 bits: read (4), write (2), execute (1)",
    explanation: "Unix file permissions are grouped into owner, group, and other, each represented by 3 bits for read/write/execute — commonly shown either as a 3-digit octal number or a 9-character symbolic string.",
    example: { inputs: { mode: "toSymbolic", octal: "755" }, note: "755 → rwxr-xr-x (owner: read/write/execute, group & other: read/execute)." },
    faq: [
      { q: "What does a leading 4th digit in chmod (e.g. 4755) mean?", a: "It represents special permission bits (setuid/setgid/sticky); this calculator focuses on the standard 3-digit owner/group/other permissions." },
      { q: "Why is 7 the maximum digit value?", a: "4 (read) + 2 (write) + 1 (execute) = 7, the maximum combination of all three permission bits." },
    ],
    related: ["base-converter", "ip-subnet-calculator"],
  },
  {
    slug: "ip-subnet-calculator",
    title: "IP Subnet Calculator",
    category: "developer",
    description: "Calculate network address, broadcast address, and usable host range from an IPv4 address and CIDR prefix.",
    fields: [
      { id: "ip", label: "IPv4 address", type: "text", defaultValue: "192.168.1.130", required: true },
      { id: "cidr", label: "CIDR prefix length", type: "number", defaultValue: "24", required: true },
    ],
    calculate: calculateIPSubnet,
    formula: "Network = IP AND SubnetMask   |   Broadcast = Network OR (NOT SubnetMask)   |   Usable hosts = 2^(32−prefix) − 2",
    explanation: "A CIDR prefix defines how many leading bits of an IPv4 address identify the network versus the host. This calculator derives the subnet mask, network and broadcast addresses, and the usable host range.",
    example: { inputs: { ip: "192.168.1.130", cidr: "24" }, note: "192.168.1.130/24 has network address 192.168.1.0 and broadcast 192.168.1.255." },
    faq: [
      { q: "Why subtract 2 from the total host count?", a: "The first address in a subnet is reserved as the network address and the last as the broadcast address, leaving the rest as usable host addresses." },
      { q: "What happens at /31 or /32?", a: "These are edge cases (point-to-point links or single-host routes) with no separate usable range in the traditional sense." },
    ],
    related: ["unix-permissions-calculator", "base-converter"],
  },
  {
    slug: "rgb-hex-converter",
    title: "RGB ↔ HEX Converter",
    category: "developer",
    description: "Convert colors between RGB (red, green, blue) values and hexadecimal color codes.",
    fields: [
      { id: "mode", label: "Direction", type: "select", defaultValue: "rgbToHex", options: [
        { label: "RGB → HEX", value: "rgbToHex" }, { label: "HEX → RGB", value: "hexToRgb" },
      ] },
      { id: "r", label: "R (0-255)", type: "number", defaultValue: "59" },
      { id: "g", label: "G (0-255)", type: "number", defaultValue: "130" },
      { id: "b", label: "B (0-255)", type: "number", defaultValue: "246" },
      { id: "hex", label: "Hex color (for HEX → RGB)", type: "text", placeholder: "#3B82F6" },
    ],
    calculate: calculateRgbHex,
    formula: "Hex = concatenation of each channel's 2-digit hexadecimal value",
    explanation: "RGB represents color as three 0-255 intensity channels; hex packs the same three values into a compact 6-digit code, two hex digits per channel.",
    example: { inputs: { mode: "rgbToHex", r: "59", g: "130", b: "246" }, note: "rgb(59, 130, 246) = #3B82F6" },
    faq: [
      { q: "Why must R, G, B be 0-255?", a: "Each color channel is stored as a single byte, which can represent 256 possible intensity levels (0-255)." },
      { q: "Does this support alpha/transparency (RGBA)?", a: "This build covers standard 6-digit RGB/hex; an 8-digit RGBA variant can be added to the registry." },
    ],
    related: ["hexadecimal-calculator"],
  },
];
