// Unit tables for the conversion engine.
// Every non-temperature category stores a `toBase` multiplier: value_in_base = value * toBase.
// Temperature uses explicit convert functions because it is offset-based, not purely multiplicative.
// The architecture is intentionally a flat registry: adding unit #500 means adding one line here,
// not touching any component or route.

export interface UnitDef {
  id: string;
  label: string;
  toBase: number; // multiply by this to get the base unit value
}

export interface UnitCategory {
  id: string;
  label: string;
  baseUnitLabel: string;
  units: UnitDef[];
}

export const LENGTH: UnitCategory = {
  id: "length",
  label: "Length",
  baseUnitLabel: "meter",
  units: [
    { id: "km", label: "Kilometer (km)", toBase: 1000 },
    { id: "hm", label: "Hectometer (hm)", toBase: 100 },
    { id: "dam", label: "Decameter (dam)", toBase: 10 },
    { id: "m", label: "Meter (m)", toBase: 1 },
    { id: "dm", label: "Decimeter (dm)", toBase: 0.1 },
    { id: "cm", label: "Centimeter (cm)", toBase: 0.01 },
    { id: "mm", label: "Millimeter (mm)", toBase: 0.001 },
    { id: "um", label: "Micrometer (µm)", toBase: 1e-6 },
    { id: "nm", label: "Nanometer (nm)", toBase: 1e-9 },
    { id: "mi", label: "Mile (mi)", toBase: 1609.344 },
    { id: "yd", label: "Yard (yd)", toBase: 0.9144 },
    { id: "ft", label: "Foot (ft)", toBase: 0.3048 },
    { id: "in", label: "Inch (in)", toBase: 0.0254 },
    { id: "nmi", label: "Nautical Mile (nmi)", toBase: 1852 },
    { id: "fathom", label: "Fathom", toBase: 1.8288 },
    { id: "chain", label: "Chain", toBase: 20.1168 },
    { id: "furlong", label: "Furlong", toBase: 201.168 },
    { id: "au", label: "Astronomical Unit (AU)", toBase: 1.495978707e11 },
    { id: "ly", label: "Light Year", toBase: 9.4607304725808e15 },
    { id: "parsec", label: "Parsec", toBase: 3.0856775814913673e16 },
  ],
};

export const WEIGHT: UnitCategory = {
  id: "weight",
  label: "Weight / Mass",
  baseUnitLabel: "kilogram",
  units: [
    { id: "mcg", label: "Microgram (µg)", toBase: 1e-9 },
    { id: "mg", label: "Milligram (mg)", toBase: 1e-6 },
    { id: "g", label: "Gram (g)", toBase: 0.001 },
    { id: "kg", label: "Kilogram (kg)", toBase: 1 },
    { id: "tonne", label: "Metric Ton (t)", toBase: 1000 },
    { id: "oz", label: "Ounce (oz)", toBase: 0.028349523125 },
    { id: "lb", label: "Pound (lb)", toBase: 0.45359237 },
    { id: "stone", label: "Stone", toBase: 6.35029318 },
    { id: "shortTon", label: "Short Ton (US)", toBase: 907.18474 },
    { id: "longTon", label: "Long Ton (UK)", toBase: 1016.0469088 },
    { id: "grain", label: "Grain", toBase: 6.479891e-5 },
    { id: "carat", label: "Carat", toBase: 0.0002 },
    { id: "amu", label: "Atomic Mass Unit", toBase: 1.66053906660e-27 },
  ],
};

export const AREA: UnitCategory = {
  id: "area",
  label: "Area",
  baseUnitLabel: "square meter",
  units: [
    { id: "mm2", label: "Square Millimeter", toBase: 1e-6 },
    { id: "cm2", label: "Square Centimeter", toBase: 1e-4 },
    { id: "m2", label: "Square Meter", toBase: 1 },
    { id: "km2", label: "Square Kilometer", toBase: 1e6 },
    { id: "in2", label: "Square Inch", toBase: 0.00064516 },
    { id: "ft2", label: "Square Foot", toBase: 0.09290304 },
    { id: "yd2", label: "Square Yard", toBase: 0.83612736 },
    { id: "acre", label: "Acre", toBase: 4046.8564224 },
    { id: "hectare", label: "Hectare", toBase: 10000 },
    { id: "mi2", label: "Square Mile", toBase: 2589988.110336 },
  ],
};

export const VOLUME: UnitCategory = {
  id: "volume",
  label: "Volume",
  baseUnitLabel: "liter",
  units: [
    { id: "ml", label: "Milliliter (ml)", toBase: 0.001 },
    { id: "cl", label: "Centiliter (cl)", toBase: 0.01 },
    { id: "dl", label: "Deciliter (dl)", toBase: 0.1 },
    { id: "l", label: "Liter (l)", toBase: 1 },
    { id: "kl", label: "Kiloliter (kl)", toBase: 1000 },
    { id: "cm3", label: "Cubic Centimeter", toBase: 0.001 },
    { id: "m3", label: "Cubic Meter", toBase: 1000 },
    { id: "tsp", label: "Teaspoon (US)", toBase: 0.00492892 },
    { id: "tbsp", label: "Tablespoon (US)", toBase: 0.0147868 },
    { id: "flozUS", label: "Fluid Ounce (US)", toBase: 0.0295735 },
    { id: "cupUS", label: "Cup (US)", toBase: 0.236588 },
    { id: "pintUS", label: "Pint (US)", toBase: 0.473176 },
    { id: "quartUS", label: "Quart (US)", toBase: 0.946353 },
    { id: "galUS", label: "Gallon (US)", toBase: 3.78541 },
    { id: "flozImp", label: "Imperial Fluid Ounce", toBase: 0.0284131 },
    { id: "pintImp", label: "Imperial Pint", toBase: 0.568261 },
    { id: "quartImp", label: "Imperial Quart", toBase: 1.13652 },
    { id: "galImp", label: "Imperial Gallon", toBase: 4.54609 },
  ],
};

export const SPEED: UnitCategory = {
  id: "speed",
  label: "Speed",
  baseUnitLabel: "meter per second",
  units: [
    { id: "mps", label: "Meters per second (m/s)", toBase: 1 },
    { id: "kmh", label: "Kilometers per hour (km/h)", toBase: 1 / 3.6 },
    { id: "mph", label: "Miles per hour (mph)", toBase: 0.44704 },
    { id: "knot", label: "Knot", toBase: 0.514444 },
    { id: "fps", label: "Feet per second (ft/s)", toBase: 0.3048 },
    { id: "mach", label: "Mach (approx., at sea level)", toBase: 343 },
  ],
};

export const TIME: UnitCategory = {
  id: "time",
  label: "Time",
  baseUnitLabel: "second",
  units: [
    { id: "ns", label: "Nanosecond", toBase: 1e-9 },
    { id: "us", label: "Microsecond", toBase: 1e-6 },
    { id: "ms", label: "Millisecond", toBase: 0.001 },
    { id: "s", label: "Second", toBase: 1 },
    { id: "min", label: "Minute", toBase: 60 },
    { id: "hr", label: "Hour", toBase: 3600 },
    { id: "day", label: "Day", toBase: 86400 },
    { id: "week", label: "Week", toBase: 604800 },
    { id: "month", label: "Month (30.44 days avg.)", toBase: 2629746 },
    { id: "year", label: "Year (365.25 days)", toBase: 31557600 },
  ],
};

export const DATA_STORAGE: UnitCategory = {
  id: "data-storage",
  label: "Data Storage",
  baseUnitLabel: "byte",
  units: [
    { id: "bit", label: "Bit", toBase: 0.125 },
    { id: "byte", label: "Byte (B)", toBase: 1 },
    { id: "kb", label: "Kilobyte (KB, decimal)", toBase: 1e3 },
    { id: "mb", label: "Megabyte (MB, decimal)", toBase: 1e6 },
    { id: "gb", label: "Gigabyte (GB, decimal)", toBase: 1e9 },
    { id: "tb", label: "Terabyte (TB, decimal)", toBase: 1e12 },
    { id: "pb", label: "Petabyte (PB, decimal)", toBase: 1e15 },
    { id: "kib", label: "Kibibyte (KiB, binary)", toBase: 1024 },
    { id: "mib", label: "Mebibyte (MiB, binary)", toBase: 1024 ** 2 },
    { id: "gib", label: "Gibibyte (GiB, binary)", toBase: 1024 ** 3 },
    { id: "tib", label: "Tebibyte (TiB, binary)", toBase: 1024 ** 4 },
    { id: "pib", label: "Pebibyte (PiB, binary)", toBase: 1024 ** 5 },
  ],
};

export const ENERGY: UnitCategory = {
  id: "energy",
  label: "Energy",
  baseUnitLabel: "joule",
  units: [
    { id: "j", label: "Joule (J)", toBase: 1 },
    { id: "kj", label: "Kilojoule (kJ)", toBase: 1000 },
    { id: "mj", label: "Megajoule (MJ)", toBase: 1e6 },
    { id: "cal", label: "Calorie (cal)", toBase: 4.184 },
    { id: "kcal", label: "Kilocalorie (kcal)", toBase: 4184 },
    { id: "wh", label: "Watt-hour (Wh)", toBase: 3600 },
    { id: "kwh", label: "Kilowatt-hour (kWh)", toBase: 3.6e6 },
    { id: "ev", label: "Electronvolt (eV)", toBase: 1.602176634e-19 },
    { id: "btu", label: "BTU", toBase: 1055.05585 },
    { id: "erg", label: "Erg", toBase: 1e-7 },
    { id: "ftlb", label: "Foot-pound", toBase: 1.3558179483 },
  ],
};

export const PRESSURE: UnitCategory = {
  id: "pressure",
  label: "Pressure",
  baseUnitLabel: "pascal",
  units: [
    { id: "pa", label: "Pascal (Pa)", toBase: 1 },
    { id: "kpa", label: "Kilopascal (kPa)", toBase: 1000 },
    { id: "mpa", label: "Megapascal (MPa)", toBase: 1e6 },
    { id: "bar", label: "Bar", toBase: 1e5 },
    { id: "mbar", label: "Millibar", toBase: 100 },
    { id: "atm", label: "Atmosphere (atm)", toBase: 101325 },
    { id: "torr", label: "Torr", toBase: 133.322368 },
    { id: "mmhg", label: "mmHg", toBase: 133.322387415 },
    { id: "inhg", label: "inHg", toBase: 3386.389 },
    { id: "psi", label: "PSI", toBase: 6894.757293168 },
  ],
};

export const POWER: UnitCategory = {
  id: "power",
  label: "Power",
  baseUnitLabel: "watt",
  units: [
    { id: "w", label: "Watt (W)", toBase: 1 },
    { id: "kw", label: "Kilowatt (kW)", toBase: 1000 },
    { id: "mw", label: "Megawatt (MW)", toBase: 1e6 },
    { id: "gw", label: "Gigawatt (GW)", toBase: 1e9 },
    { id: "hp", label: "Horsepower (mechanical)", toBase: 745.6998715823 },
    { id: "hpMetric", label: "Metric Horsepower (PS)", toBase: 735.49875 },
    { id: "btuh", label: "BTU/hour", toBase: 0.29307107 },
    { id: "ftlbmin", label: "Foot-pound/minute", toBase: 0.0225969658 },
  ],
};

export const ALL_LINEAR_CATEGORIES: UnitCategory[] = [
  LENGTH, WEIGHT, AREA, VOLUME, SPEED, TIME, DATA_STORAGE, ENERGY, PRESSURE, POWER,
];

export function convertLinear(value: number, fromId: string, toId: string, category: UnitCategory) {
  const from = category.units.find((u) => u.id === fromId);
  const to = category.units.find((u) => u.id === toId);
  if (!from || !to) return null;
  const base = value * from.toBase;
  const result = base / to.toBase;
  return { from, to, base, result };
}

// ---- Temperature: offset-based, handled separately ----

export type TempUnit = "celsius" | "fahrenheit" | "kelvin" | "rankine" | "reaumur" | "romer" | "delisle" | "newton";

export const TEMPERATURE_UNITS: { id: TempUnit; label: string }[] = [
  { id: "celsius", label: "Celsius (°C)" },
  { id: "fahrenheit", label: "Fahrenheit (°F)" },
  { id: "kelvin", label: "Kelvin (K)" },
  { id: "rankine", label: "Rankine (°R)" },
  { id: "reaumur", label: "Réaumur (°Ré)" },
  { id: "romer", label: "Rømer (°Rø)" },
  { id: "delisle", label: "Delisle (°De)" },
  { id: "newton", label: "Newton (°N)" },
];

export function toCelsius(value: number, unit: TempUnit): number {
  switch (unit) {
    case "celsius": return value;
    case "fahrenheit": return (value - 32) * (5 / 9);
    case "kelvin": return value - 273.15;
    case "rankine": return (value - 491.67) * (5 / 9);
    case "reaumur": return value * (5 / 4);
    case "romer": return (value - 7.5) * (40 / 21);
    case "delisle": return 100 - value * (2 / 3);
    case "newton": return value * (100 / 33);
  }
}

export function fromCelsius(c: number, unit: TempUnit): number {
  switch (unit) {
    case "celsius": return c;
    case "fahrenheit": return c * (9 / 5) + 32;
    case "kelvin": return c + 273.15;
    case "rankine": return (c + 273.15) * (9 / 5);
    case "reaumur": return c * (4 / 5);
    case "romer": return c * (21 / 40) + 7.5;
    case "delisle": return (100 - c) * (3 / 2);
    case "newton": return c * (33 / 100);
  }
}
