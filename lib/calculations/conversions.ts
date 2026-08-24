import { CalcOutput, fail, ok } from "../types";
import { parseNumber, formatNumber } from "../parse";
import {
  UnitCategory, convertLinear,
  LENGTH, WEIGHT, AREA, VOLUME, SPEED, TIME, DATA_STORAGE, ENERGY, PRESSURE, POWER,
  TEMPERATURE_UNITS, TempUnit, toCelsius, fromCelsius,
} from "../units/tables";

function makeLinearCalculator(category: UnitCategory) {
  return function calculate(values: Record<string, string>): CalcOutput {
    const value = parseNumber(values.value);
    const from = values.from;
    const to = values.to;
    if (value === null) return fail("Enter a valid numeric value to convert.");
    if (!from || !to) return fail("Select both a source and target unit.");
    const conversion = convertLinear(value, from, to, category);
    if (!conversion) return fail("Unknown unit selected.");
    const { result, base } = conversion;
    const fromUnit = category.units.find((u) => u.id === from)!;
    const toUnit = category.units.find((u) => u.id === to)!;
    return ok(`${formatNumber(result, 8)} ${toUnit.label.match(/\(([^)]+)\)/)?.[1] ?? toUnit.label}`, [
      { title: "Convert to base unit", content: `${formatNumber(value)} ${fromUnit.label} × ${fromUnit.toBase} = ${formatNumber(base, 10)} ${category.baseUnitLabel}` },
      { title: "Convert base unit to target", content: `${formatNumber(base, 10)} ${category.baseUnitLabel} ÷ ${toUnit.toBase} = ${formatNumber(result, 8)} ${toUnit.label}` },
    ], result);
  };
}

export const calculateLength = makeLinearCalculator(LENGTH);
export const calculateWeight = makeLinearCalculator(WEIGHT);
export const calculateArea = makeLinearCalculator(AREA);
export const calculateVolume = makeLinearCalculator(VOLUME);
export const calculateSpeed = makeLinearCalculator(SPEED);
export const calculateTime = makeLinearCalculator(TIME);
export const calculateDataStorage = makeLinearCalculator(DATA_STORAGE);
export const calculateEnergy = makeLinearCalculator(ENERGY);
export const calculatePressure = makeLinearCalculator(PRESSURE);
export const calculatePower = makeLinearCalculator(POWER);

export function calculateTemperature(values: Record<string, string>): CalcOutput {
  const value = parseNumber(values.value);
  const from = values.from as TempUnit;
  const to = values.to as TempUnit;
  if (value === null) return fail("Enter a valid numeric value to convert.");
  const validIds = TEMPERATURE_UNITS.map((u) => u.id);
  if (!validIds.includes(from) || !validIds.includes(to)) return fail("Select valid source and target temperature scales.");

  if (from === "kelvin" && value < 0) return fail("Kelvin cannot be negative (absolute zero is 0 K).");
  if (from === "rankine" && value < 0) return fail("Rankine cannot be negative (absolute zero is 0 °R).");

  const celsius = toCelsius(value, from);
  if (celsius < -273.15) return fail("This value is below absolute zero and is physically impossible.");
  const result = fromCelsius(celsius, to);

  const fromLabel = TEMPERATURE_UNITS.find((u) => u.id === from)!.label;
  const toLabel = TEMPERATURE_UNITS.find((u) => u.id === to)!.label;
  return ok(`${formatNumber(result, 4)} ${toLabel}`, [
    { title: "Convert to Celsius (intermediate step)", content: `${formatNumber(value)} ${fromLabel} → ${formatNumber(celsius, 6)} °C` },
    { title: "Convert Celsius to target scale", content: `${formatNumber(celsius, 6)} °C → ${formatNumber(result, 4)} ${toLabel}` },
  ], result);
}
