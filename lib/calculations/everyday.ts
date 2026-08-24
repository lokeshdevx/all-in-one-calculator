import { CalcOutput, fail, ok } from "../types";
import { parseNumber, formatNumber } from "../parse";

function parseDate(raw: string | undefined): Date | null {
  if (!raw) return null;
  const d = new Date(raw + "T00:00:00");
  return isNaN(d.getTime()) ? null : d;
}

const MS_PER_DAY = 86400000;

// ---- 51. Age Calculator ----
export function calculateAge(values: Record<string, string>): CalcOutput {
  const birth = parseDate(values.birthDate);
  const asOf = values.asOfDate ? parseDate(values.asOfDate) : new Date();
  if (!birth) return fail("Please enter a valid birth date.");
  if (!asOf) return fail("Please enter a valid 'as of' date.");
  if (birth > asOf) return fail("Birth date must be before the 'as of' date.");

  let years = asOf.getFullYear() - birth.getFullYear();
  let months = asOf.getMonth() - birth.getMonth();
  let days = asOf.getDate() - birth.getDate();
  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(asOf.getFullYear(), asOf.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  const totalDays = Math.round((asOf.getTime() - birth.getTime()) / MS_PER_DAY);

  return ok(
    `${years} years, ${months} months, ${days} days`,
    [
      {
        title: "Compare year, month, day components",
        content: `${asOf.toDateString()} − ${birth.toDateString()}`,
      },
      {
        title: "Borrow across months/years as needed",
        content: `${years} years, ${months} months, ${days} days`,
      },
      { title: "Total days lived", content: `${formatNumber(totalDays)} days` },
    ],
    years,
  );
}

// ---- 52. Days Between Dates ----
export function calculateDaysBetween(
  values: Record<string, string>,
): CalcOutput {
  const start = parseDate(values.startDate);
  const end = parseDate(values.endDate);
  if (!start || !end) return fail("Please enter two valid dates.");
  const diffDays = Math.round((end.getTime() - start.getTime()) / MS_PER_DAY);
  const weeks = Math.trunc(Math.abs(diffDays) / 7);
  const remDays = Math.abs(diffDays) % 7;
  return ok(
    `${formatNumber(diffDays)} days`,
    [
      {
        title: "Subtract the dates",
        content: `${end.toDateString()} − ${start.toDateString()} = ${diffDays} days`,
      },
      { title: "As weeks + days", content: `${weeks} weeks, ${remDays} days` },
    ],
    diffDays,
  );
}

// ---- 53. Date Add/Subtract ----
export function calculateDateAddSubtract(
  values: Record<string, string>,
): CalcOutput {
  const start = parseDate(values.startDate);
  const amount = parseNumber(values.amount);
  const unit = values.unit ?? "days";
  const direction = values.direction ?? "add";
  if (!start) return fail("Please enter a valid start date.");
  if (amount === null || !Number.isInteger(amount) || amount < 0)
    return fail("Please enter a non-negative whole number of units.");

  const result = new Date(start);
  const signedAmount = direction === "subtract" ? -amount : amount;
  if (unit === "days") result.setDate(result.getDate() + signedAmount);
  else if (unit === "weeks")
    result.setDate(result.getDate() + signedAmount * 7);
  else if (unit === "months") result.setMonth(result.getMonth() + signedAmount);
  else if (unit === "years")
    result.setFullYear(result.getFullYear() + signedAmount);
  else return fail("Unknown unit selected.");

  return ok(result.toDateString(), [
    {
      title: "Operation",
      content: `${start.toDateString()} ${direction === "add" ? "+" : "−"} ${amount} ${unit}`,
    },
    { title: "Result", content: result.toDateString() },
  ]);
}

// ---- 54. Time Duration Calculator ----
export function calculateTimeDuration(
  values: Record<string, string>,
): CalcOutput {
  const start = values.startTime;
  const end = values.endTime;
  if (!start || !end)
    return fail("Please enter both a start and end time (HH:MM).");
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  if ([sh, sm, eh, em].some((v) => Number.isNaN(v)))
    return fail("Please enter times in HH:MM format.");
  let startMinutes = sh * 60 + sm;
  let endMinutes = eh * 60 + em;
  let diff = endMinutes - startMinutes;
  let crossedMidnight = false;
  if (diff < 0) {
    diff += 24 * 60;
    crossedMidnight = true;
  }
  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;
  return ok(
    `${hours}h ${minutes}m`,
    [
      {
        title: "Convert to minutes since midnight",
        content: `Start = ${startMinutes} min, End = ${endMinutes} min`,
      },
      {
        title: "Subtract",
        content: crossedMidnight
          ? `End time is past midnight relative to start → add 24h`
          : `${endMinutes} − ${startMinutes} = ${diff} minutes`,
      },
      {
        title: "Convert back to hours and minutes",
        content: `${hours}h ${minutes}m`,
      },
    ],
    diff,
  );
}

// ---- 55. BMI Calculator ----
export function calculateBMI(values: Record<string, string>): CalcOutput {
  const unit = values.unit ?? "metric";
  const weight = parseNumber(values.weight);
  const height = parseNumber(values.height);
  if (weight === null || height === null || weight <= 0 || height <= 0) {
    return fail("Please enter valid positive numbers for weight and height.");
  }

  let bmi: number;
  let steps;
  if (unit === "metric") {
    const heightM = height / 100;
    bmi = weight / (heightM * heightM);
    steps = [
      {
        title: "Convert height to meters",
        content: `${formatNumber(height)} cm ÷ 100 = ${formatNumber(heightM)} m`,
      },
      { title: "Formula", content: "BMI = weight(kg) ÷ height(m)²" },
      {
        title: "Substitute values",
        content: `${formatNumber(weight)} ÷ ${formatNumber(heightM)}² = ${formatNumber(bmi, 2)}`,
      },
    ];
  } else {
    bmi = (weight / (height * height)) * 703;
    steps = [
      { title: "Formula", content: "BMI = 703 × weight(lb) ÷ height(in)²" },
      {
        title: "Substitute values",
        content: `703 × ${formatNumber(weight)} ÷ ${formatNumber(height)}² = ${formatNumber(bmi, 2)}`,
      },
    ];
  }
  let category: string;
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal weight";
  else if (bmi < 30) category = "Overweight";
  else category = "Obesity";

  steps.push({
    title: "WHO category (general population)",
    content: `${formatNumber(bmi, 1)} → ${category}`,
  });
  return ok(`${formatNumber(bmi, 1)} (${category})`, steps, bmi);
}

// ---- 56. Calorie Calculator (Mifflin-St Jeor BMR + activity factor) ----
export function calculateCalories(values: Record<string, string>): CalcOutput {
  const weight = parseNumber(values.weightKg);
  const height = parseNumber(values.heightCm);
  const age = parseNumber(values.age);
  const sex = values.sex ?? "male";
  const activity = parseNumber(values.activityFactor) ?? 1.2;
  if (
    weight === null ||
    height === null ||
    age === null ||
    weight <= 0 ||
    height <= 0 ||
    age <= 0
  ) {
    return fail(
      "Please enter valid positive numbers for weight, height, and age.",
    );
  }
  const bmr =
    sex === "male"
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
  const tdee = bmr * activity;
  return ok(
    `${formatNumber(tdee, 0)} kcal/day`,
    [
      {
        title: "Formula (Mifflin-St Jeor BMR)",
        content:
          sex === "male"
            ? "BMR = 10×weight + 6.25×height − 5×age + 5"
            : "BMR = 10×weight + 6.25×height − 5×age − 161",
      },
      {
        title: "Substitute values",
        content: `10×${formatNumber(weight)} + 6.25×${formatNumber(height)} − 5×${formatNumber(age)} ${sex === "male" ? "+ 5" : "− 161"} = ${formatNumber(bmr, 0)} kcal`,
      },
      {
        title: "Apply activity factor",
        content: `${formatNumber(bmr, 0)} × ${formatNumber(activity)} = ${formatNumber(tdee, 0)} kcal/day`,
      },
    ],
    tdee,
  );
}

// ---- 57. Pace Calculator ----
export function calculatePace(values: Record<string, string>): CalcOutput {
  const distance = parseNumber(values.distance);
  const hours = parseNumber(values.hours) ?? 0;
  const minutes = parseNumber(values.minutes) ?? 0;
  const seconds = parseNumber(values.seconds) ?? 0;
  if (distance === null || distance <= 0)
    return fail("Please enter a positive distance.");
  const totalMinutes = hours * 60 + minutes + seconds / 60;
  if (totalMinutes <= 0) return fail("Please enter a positive total time.");
  const paceMinPerUnit = totalMinutes / distance;
  const paceMin = Math.floor(paceMinPerUnit);
  const paceSec = Math.round((paceMinPerUnit - paceMin) * 60);
  const speed = distance / (totalMinutes / 60);
  return ok(
    `${paceMin}:${String(paceSec).padStart(2, "0")} per unit distance`,
    [
      {
        title: "Total time in minutes",
        content: `${hours}h ${minutes}m ${seconds}s = ${formatNumber(totalMinutes, 3)} min`,
      },
      { title: "Pace formula", content: "Pace = Total time ÷ Distance" },
      {
        title: "Substitute values",
        content: `${formatNumber(totalMinutes, 3)} ÷ ${formatNumber(distance)} = ${formatNumber(paceMinPerUnit, 4)} min/unit`,
      },
      {
        title: "Speed",
        content: `${formatNumber(distance)} ÷ (${formatNumber(totalMinutes, 3)}/60) = ${formatNumber(speed, 3)} units/hour`,
      },
    ],
    paceMinPerUnit,
  );
}

// ---- 58. Fuel Cost Calculator ----
export function calculateFuelCost(values: Record<string, string>): CalcOutput {
  const distance = parseNumber(values.distance);
  const efficiency = parseNumber(values.fuelEfficiency);
  const price = parseNumber(values.pricePerUnit);
  if (distance === null || efficiency === null || price === null) {
    return fail(
      "Please enter valid numbers for distance, fuel efficiency, and fuel price.",
    );
  }
  if (distance < 0 || price < 0)
    return fail("Distance and price cannot be negative.");
  if (efficiency <= 0)
    return fail("Fuel efficiency must be greater than zero.");
  const fuelNeeded = distance / efficiency;
  const cost = fuelNeeded * price;
  return ok(
    formatNumber(cost, 2),
    [
      {
        title: "Fuel needed",
        content: `${formatNumber(distance)} ÷ ${formatNumber(efficiency)} = ${formatNumber(fuelNeeded, 4)} units of fuel`,
      },
      {
        title: "Cost",
        content: `${formatNumber(fuelNeeded, 4)} × ${formatNumber(price)} = ${formatNumber(cost, 2)}`,
      },
    ],
    cost,
  );
}

// ---- 59. Electricity Cost Calculator ----
export function calculateElectricityCost(
  values: Record<string, string>,
): CalcOutput {
  const watts = parseNumber(values.powerWatts);
  const hoursPerDay = parseNumber(values.hoursPerDay);
  const days = parseNumber(values.days) ?? 30;
  const rate = parseNumber(values.ratePerKwh);
  if (watts === null || hoursPerDay === null || rate === null) {
    return fail(
      "Please enter valid numbers for power, hours per day, and rate per kWh.",
    );
  }
  if (watts < 0 || hoursPerDay < 0 || days < 0 || rate < 0) {
    return fail("Values cannot be negative.");
  }
  const kwhPerDay = (watts * hoursPerDay) / 1000;
  const totalKwh = kwhPerDay * days;
  const cost = totalKwh * rate;
  return ok(
    formatNumber(cost, 2),
    [
      {
        title: "Daily energy use",
        content: `(${formatNumber(watts)} W × ${formatNumber(hoursPerDay)} h) ÷ 1000 = ${formatNumber(kwhPerDay, 4)} kWh/day`,
      },
      {
        title: "Total energy over the period",
        content: `${formatNumber(kwhPerDay, 4)} × ${formatNumber(days)} days = ${formatNumber(totalKwh, 4)} kWh`,
      },
      {
        title: "Cost",
        content: `${formatNumber(totalKwh, 4)} × ${formatNumber(rate)} = ${formatNumber(cost, 2)}`,
      },
    ],
    cost,
  );
}

// ---- 60. Cooking Measurement Converter ----
const COOKING_TO_ML: Record<string, number> = {
  tsp: 4.92892,
  tbsp: 14.7868,
  flozUS: 29.5735,
  cupUS: 236.588,
  pintUS: 473.176,
  quartUS: 946.353,
  ml: 1,
  l: 1000,
};
const COOKING_LABELS: Record<string, string> = {
  tsp: "Teaspoon",
  tbsp: "Tablespoon",
  flozUS: "Fluid Ounce (US)",
  cupUS: "Cup (US)",
  pintUS: "Pint (US)",
  quartUS: "Quart (US)",
  ml: "Milliliter",
  l: "Liter",
};
export function calculateCookingConversion(
  values: Record<string, string>,
): CalcOutput {
  const value = parseNumber(values.value);
  const from = values.from;
  const to = values.to;
  if (value === null) return fail("Please enter a valid amount.");
  if (!from || !to || !(from in COOKING_TO_ML) || !(to in COOKING_TO_ML)) {
    return fail("Please select valid units.");
  }
  const ml = value * COOKING_TO_ML[from];
  const result = ml / COOKING_TO_ML[to];
  return ok(
    `${formatNumber(result, 4)} ${COOKING_LABELS[to]}(s)`,
    [
      {
        title: "Convert to milliliters",
        content: `${formatNumber(value)} × ${COOKING_TO_ML[from]} = ${formatNumber(ml, 4)} ml`,
      },
      {
        title: "Convert to target unit",
        content: `${formatNumber(ml, 4)} ÷ ${COOKING_TO_ML[to]} = ${formatNumber(result, 4)} ${COOKING_LABELS[to]}(s)`,
      },
    ],
    result,
  );
}
