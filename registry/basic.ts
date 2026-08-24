import { CalculatorDefinition } from "../lib/types";
import {
  calculateAddition,
  calculateSubtraction,
  calculateMultiplication,
  calculateDivision,
  calculatePercentage,
  calculateAverage,
  calculateRatio,
  calculateFraction,
  calculateDecimal,
  calculateModulo,
} from "../lib/calculations/basic";

export const basicCalculators: CalculatorDefinition[] = [
  {
    slug: "addition-calculator",
    title: "Addition Calculator",
    category: "basic",
    description:
      "Add two or more numbers instantly. Perfect for summing decimals, negatives, and large numbers.",
    fields: [
      {
        id: "numbers",
        label: "Numbers",
        type: "text",
        placeholder: "25, 35, 10",
        defaultValue: "25, 35, 10",
        required: true,
        helpText: "Separate values with commas or spaces",
      },
    ],
    calculate: calculateAddition,
    formula: "Sum = a₁ + a₂ + ... + aₙ",
    explanation:
      "Addition combines two or more quantities into a single total. Enter any number of values — positive, negative, decimal, or in scientific notation (e.g. 1e6) — separated by commas or spaces.",
    example: { inputs: { numbers: "25, 35, 10" }, note: "25 + 35 + 10 = 70" },
    faq: [
      {
        q: "Can I add negative numbers?",
        a: "Yes. Enter negative numbers with a minus sign, e.g. -5, and they'll be added normally.",
      },
      {
        q: "How many numbers can I add at once?",
        a: "There's no fixed limit — enter as many values as you need, separated by commas or spaces.",
      },
      {
        q: "Does it handle decimals?",
        a: "Absolutely! Decimals are supported with full precision.",
      },
    ],
    related: [
      "subtraction-calculator",
      "multiplication-calculator",
      "average-calculator",
    ],
  },
  {
    slug: "subtraction-calculator",
    title: "Subtraction Calculator",
    category: "basic",
    description:
      "Subtract numbers with precision. Perfect for budgeting, measurements, and more.",
    fields: [
      {
        id: "numbers",
        label: "Numbers",
        type: "text",
        placeholder: "100, 20, 5",
        defaultValue: "100, 20, 5",
        required: true,
        helpText: "First number is the starting value",
      },
    ],
    calculate: calculateSubtraction,
    formula: "Result = a₁ − a₂ − ... − aₙ",
    explanation:
      "Subtraction is applied left to right across all entered values: the second value is subtracted from the first, the third from that result, and so on.",
    example: { inputs: { numbers: "100, 20, 5" }, note: "100 − 20 − 5 = 75" },
    faq: [
      {
        q: "In what order are numbers subtracted?",
        a: "Left to right — the first number listed is the starting value.",
      },
      {
        q: "Can the result be negative?",
        a: "Yes, if the total subtracted exceeds the first value.",
      },
      {
        q: "Does it work with decimals?",
        a: "Yes, decimal numbers are fully supported.",
      },
    ],
    related: ["addition-calculator", "division-calculator"],
  },
  {
    slug: "multiplication-calculator",
    title: "Multiplication Calculator",
    category: "basic",
    description:
      "Multiply numbers quickly. Great for scaling, area calculations, and business math.",
    fields: [
      {
        id: "numbers",
        label: "Numbers",
        type: "text",
        placeholder: "6, 7",
        defaultValue: "6, 7",
        required: true,
        helpText: "Separate values with commas or spaces",
      },
    ],
    calculate: calculateMultiplication,
    formula: "Product = a₁ × a₂ × ... × aₙ",
    explanation:
      "Multiplication scales one quantity by another. When multiplying several numbers, the result is their running product.",
    example: { inputs: { numbers: "6, 7" }, note: "6 × 7 = 42" },
    faq: [
      {
        q: "What happens if one value is zero?",
        a: "Any product containing zero equals zero.",
      },
      {
        q: "How is the sign of the result determined?",
        a: "An odd number of negative values makes the product negative; an even number makes it positive.",
      },
      {
        q: "Can I multiply decimals?",
        a: "Yes, decimals are fully supported with precise results.",
      },
    ],
    related: ["division-calculator", "exponent-calculator"],
  },
  {
    slug: "division-calculator",
    title: "Division Calculator",
    category: "basic",
    description:
      "Divide numbers with precision. Shows quotient, remainder, and decimal results.",
    fields: [
      {
        id: "dividend",
        label: "Dividend (A)",
        type: "number",
        placeholder: "10",
        defaultValue: "10",
        required: true,
        helpText: "The number being divided",
      },
      {
        id: "divisor",
        label: "Divisor (B)",
        type: "number",
        placeholder: "4",
        defaultValue: "4",
        required: true,
        helpText: "The number to divide by",
      },
    ],
    calculate: calculateDivision,
    formula: "Quotient = A ÷ B",
    explanation:
      "Division splits the dividend into equal parts determined by the divisor. When both numbers are whole, an integer remainder is also shown.",
    example: { inputs: { dividend: "10", divisor: "4" }, note: "10 ÷ 4 = 2.5" },
    faq: [
      {
        q: "What happens if I divide by zero?",
        a: "Division by zero is mathematically undefined, so the calculator will show a validation message instead of a result.",
      },
      {
        q: "Does this show a remainder?",
        a: "Yes, for whole-number inputs it shows the integer quotient and remainder alongside the decimal result.",
      },
      {
        q: "Can I divide decimals?",
        a: "Yes, decimals are fully supported with exact precision.",
      },
    ],
    related: [
      "multiplication-calculator",
      "modulo-calculator",
      "fraction-calculator",
    ],
  },
  {
    slug: "percentage-calculator",
    title: "Percentage Calculator",
    category: "basic",
    description:
      "Solve percentage problems instantly. Perfect for discounts, tips, and financial calculations.",
    fields: [
      {
        id: "mode",
        label: "Calculation Type",
        type: "select",
        defaultValue: "of",
        options: [
          { label: "X% of Y — Find the percentage of a number", value: "of" },
          {
            label: "X is what % of Y — Find the percentage relationship",
            value: "isWhatPercentOf",
          },
          {
            label: "% increase from X to Y — Calculate growth or change",
            value: "increase",
          },
          {
            label: "Y is X% of what number? — Find the original value",
            value: "originalFromPercent",
          },
        ],
      },
      {
        id: "x",
        label: "X",
        type: "number",
        defaultValue: "20",
        required: true,
        helpText: "The percentage value or first number",
      },
      {
        id: "y",
        label: "Y",
        type: "number",
        defaultValue: "500",
        required: true,
        helpText: "The total or second number",
      },
    ],
    calculate: calculatePercentage,
    formula: "X% of Y = (X ÷ 100) × Y",
    explanation:
      "Percentages express a value relative to 100. This calculator covers the four most common percentage questions people run into, from a simple 'X% of Y' up to finding an original value before a percentage was applied.",
    example: {
      inputs: { mode: "of", x: "20", y: "500" },
      note: "20% of 500 = 100",
    },
    faq: [
      {
        q: "How do I calculate percentage decrease?",
        a: "Use the 'increase' mode — a negative result represents a decrease.",
      },
      {
        q: "What's the difference between percentage change and percentage of?",
        a: "'X% of Y' scales a value; percentage change compares two values relative to the first one.",
      },
      {
        q: "Can this calculate discounts?",
        a: "Yes! Use the 'X% of Y' mode to find the discount amount, or the 'increase' mode to find the final price.",
      },
    ],
    related: [
      "percentage-change-calculator",
      "discount-calculator",
      "tax-calculator",
    ],
  },
  {
    slug: "average-calculator",
    title: "Average / Mean Calculator",
    category: "basic",
    description:
      "Calculate the mean, median, or weighted average of any set of numbers.",
    fields: [
      {
        id: "numbers",
        label: "Numbers",
        type: "text",
        placeholder: "2, 4, 6, 8",
        defaultValue: "2, 4, 6, 8",
        required: true,
        helpText: "Separate values with commas or spaces",
      },
      {
        id: "weights",
        label: "Weights (Optional)",
        type: "text",
        placeholder: "Leave blank for simple average",
        helpText: "One weight per number, matching the order",
      },
    ],
    calculate: calculateAverage,
    formula:
      "Mean = (Σ values) ÷ count      |      Weighted mean = Σ(value×weight) ÷ Σ(weight)",
    explanation:
      "The mean summarizes a set of numbers with a single representative value. Add weights when some values should count more than others (e.g. grades worth different percentages).",
    example: { inputs: { numbers: "2, 4, 6, 8" }, note: "(2+4+6+8) ÷ 4 = 5" },
    faq: [
      {
        q: "What if I don't enter weights?",
        a: "The calculator computes a simple (unweighted) mean.",
      },
      {
        q: "Do weights need to add up to 100?",
        a: "No — weights are used in ratio to each other, so any positive numbers work.",
      },
      {
        q: "Can I calculate median or mode?",
        a: "Currently the calculator computes the mean, but median and mode are coming soon!",
      },
    ],
    related: ["percentage-calculator", "addition-calculator"],
  },
  {
    slug: "ratio-calculator",
    title: "Ratio Calculator",
    category: "basic",
    description:
      "Simplify ratios to lowest terms. View as fraction and percentage instantly.",
    fields: [
      {
        id: "a",
        label: "First Term (A)",
        type: "number",
        defaultValue: "8",
        required: true,
        helpText: "The first number in your ratio",
      },
      {
        id: "b",
        label: "Second Term (B)",
        type: "number",
        defaultValue: "12",
        required: true,
        helpText: "The second number in your ratio",
      },
    ],
    calculate: calculateRatio,
    formula: "Simplified ratio = A ÷ GCD(A,B) : B ÷ GCD(A,B)",
    explanation:
      "A ratio compares two quantities. Simplifying divides both terms by their greatest common divisor (GCD) so the ratio uses the smallest possible whole numbers.",
    example: {
      inputs: { a: "8", b: "12" },
      note: "8 : 12 simplifies to 2 : 3",
    },
    faq: [
      {
        q: "Can I simplify decimal ratios?",
        a: "Yes — decimals are scaled up to whole numbers before simplifying.",
      },
      {
        q: "How do I turn a ratio into a percentage?",
        a: "The result panel shows A as a percentage of B automatically.",
      },
      {
        q: "What about ratios with more than two terms?",
        a: "Currently we support two-term ratios, with multi-term support coming soon.",
      },
    ],
    related: ["fraction-calculator", "percentage-calculator"],
  },
  {
    slug: "fraction-calculator",
    title: "Fraction Calculator",
    category: "basic",
    description:
      "Add, subtract, multiply, or divide fractions. Automatic simplification included.",
    fields: [
      {
        id: "fraction1",
        label: "First Fraction",
        type: "text",
        placeholder: "1/2 or 1 1/2",
        defaultValue: "1/2",
        required: true,
        helpText: "Enter as '1/2' for half or '1 1/2' for one and a half",
      },
      {
        id: "op",
        label: "Operation",
        type: "select",
        defaultValue: "add",
        options: [
          { label: "Add (+)", value: "add" },
          { label: "Subtract (−)", value: "subtract" },
          { label: "Multiply (×)", value: "multiply" },
          { label: "Divide (÷)", value: "divide" },
        ],
      },
      {
        id: "fraction2",
        label: "Second Fraction",
        type: "text",
        placeholder: "1/3",
        defaultValue: "1/3",
        required: true,
        helpText:
          "Enter as '1/3' for one-third or '2 1/4' for two and a quarter",
      },
    ],
    calculate: calculateFraction,
    formula: "a/b + c/d = (a×d + c×b) ÷ (b×d),  similarly for − × ÷",
    explanation:
      "Fractions represent parts of a whole. This calculator accepts proper fractions (3/4), improper fractions (7/4), and mixed numbers (1 3/4), and always returns the simplified result.",
    example: {
      inputs: { fraction1: "1/2", op: "add", fraction2: "1/3" },
      note: "1/2 + 1/3 = 5/6",
    },
    faq: [
      {
        q: "Can I enter mixed numbers?",
        a: 'Yes — use a format like "1 1/2" for one and a half.',
      },
      {
        q: "Is the result always simplified?",
        a: "Yes, the fraction is automatically reduced to its lowest terms.",
      },
      {
        q: "What about negative fractions?",
        a: "Yes, negative fractions are fully supported. Enter as '-1/2' or '-1 1/2'.",
      },
    ],
    related: ["ratio-calculator", "decimal-calculator"],
  },
  {
    slug: "decimal-calculator",
    title: "Decimal Calculator",
    category: "basic",
    description:
      "Convert decimals to fractions or percentages. Round to any precision.",
    fields: [
      {
        id: "mode",
        label: "Operation",
        type: "select",
        defaultValue: "toFraction",
        options: [
          { label: "Decimal → Fraction", value: "toFraction" },
          { label: "Decimal → Percentage", value: "toPercentage" },
          { label: "Round to decimal places", value: "round" },
          { label: "Round to significant figures", value: "sigfigs" },
        ],
      },
      {
        id: "value",
        label: "Decimal Value",
        type: "number",
        defaultValue: "0.75",
        required: true,
        helpText: "The decimal number to convert or round",
      },
      {
        id: "places",
        label: "Decimal Places / Significant Figures",
        type: "number",
        defaultValue: "2",
        helpText: "Number of decimal places or significant digits",
      },
    ],
    calculate: calculateDecimal,
    formula: "Fraction = decimal × 10ⁿ ÷ 10ⁿ, simplified by GCD",
    explanation:
      "Decimals, fractions, and percentages are three ways of expressing the same value. This calculator converts between them and also handles rounding and significant-figure precision.",
    example: {
      inputs: { mode: "toFraction", value: "0.75" },
      note: "0.75 = 3/4",
    },
    faq: [
      {
        q: "How are repeating decimals handled?",
        a: "Enter as many digits as you know; the conversion uses up to 10 decimal digits of precision.",
      },
      {
        q: "What's the difference between rounding and significant figures?",
        a: "Rounding fixes the number of digits after the decimal point; significant figures fix the total number of meaningful digits regardless of magnitude.",
      },
      {
        q: "Can I convert percentages back to decimals?",
        a: "Yes, simply use the percentage mode in reverse or divide by 100.",
      },
    ],
    related: ["fraction-calculator", "percentage-calculator"],
  },
  {
    slug: "modulo-calculator",
    title: "Modulo / Remainder Calculator",
    category: "basic",
    description:
      "Find the remainder of any division. Supports negative numbers and large integers.",
    fields: [
      {
        id: "a",
        label: "A (Dividend)",
        type: "number",
        defaultValue: "10",
        required: true,
        helpText: "The number being divided",
      },
      {
        id: "b",
        label: "B (Modulus)",
        type: "number",
        defaultValue: "3",
        required: true,
        helpText: "The number to divide by (must not be zero)",
      },
    ],
    calculate: calculateModulo,
    formula: "A mod B = A − B × trunc(A ÷ B)",
    explanation:
      "The modulo operation returns the remainder after division. This calculator shows both the JavaScript-style remainder (which follows the sign of the dividend) and, when they differ, the always-non-negative mathematical modulo.",
    example: { inputs: { a: "10", b: "3" }, note: "10 mod 3 = 1" },
    faq: [
      {
        q: "Why can the result be negative?",
        a: "When the dividend is negative, the remainder follows its sign under JavaScript's % operator — this is shown alongside the mathematical modulo for clarity.",
      },
      {
        q: "What if B is zero?",
        a: "The modulus cannot be zero, so the calculator returns a validation message.",
      },
      {
        q: "Can I use this for large numbers?",
        a: "Yes, the calculator handles large integers with full precision.",
      },
    ],
    related: ["division-calculator", "base-converter"],
  },
];
