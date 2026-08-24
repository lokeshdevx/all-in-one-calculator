import { CalculatorDefinition } from "../lib/types";
import {
  calculateAge,
  calculateDaysBetween,
  calculateDateAddSubtract,
  calculateTimeDuration,
  calculateBMI,
  calculateCalories,
  calculatePace,
  calculateFuelCost,
  calculateElectricityCost,
  calculateCookingConversion,
} from "../lib/calculations/everyday";

export const everydayCalculators: CalculatorDefinition[] = [
  {
    slug: "age-calculator",
    title: "Age Calculator",
    category: "everyday",
    description:
      "Calculate your exact age in years, months, and days. Perfect for birthdays, milestones, and more.",
    fields: [
      {
        id: "birthDate",
        label: "Birth Date",
        type: "date",
        required: true,
        helpText: "Select your date of birth",
      },
      {
        id: "asOfDate",
        label: "As of Date",
        type: "date",
        helpText: "Leave blank for today's date",
      },
    ],
    calculate: calculateAge,
    formula:
      "Age = (asOfDate − birthDate) broken into years, months, and days with calendar-aware borrowing",
    explanation:
      "Age isn't just a day count — this calculator compares year, month, and day components directly, borrowing from the next higher unit when needed, the same way you'd count age by hand. Perfect for birthday planning, eligibility checks, and milestone tracking.",
    example: {
      inputs: { birthDate: "2000-01-01", asOfDate: "2024-06-15" },
      note: "Born Jan 1, 2000 → 24 years, 5 months, 14 days old on June 15, 2024.",
    },
    faq: [
      {
        q: "What if I leave 'as of' blank?",
        a: "It defaults to today's date automatically.",
      },
      {
        q: "Does this account for leap years?",
        a: "Yes — calendar month lengths (including February 29 in leap years) are used automatically.",
      },
      {
        q: "Can I use this for age verification?",
        a: "Yes! It provides precise age calculation for age-restricted activities.",
      },
    ],
    related: ["days-between-dates-calculator", "date-calculator"],
  },
  {
    slug: "date-calculator",
    title: "Date Calculator",
    category: "everyday",
    description:
      "Add or subtract days, weeks, months, or years from any date. Great for planning and scheduling.",
    fields: [
      {
        id: "startDate",
        label: "Start Date",
        type: "date",
        required: true,
        helpText: "The date to start from",
      },
      {
        id: "direction",
        label: "Direction",
        type: "select",
        defaultValue: "add",
        options: [
          { label: "Add ➕", value: "add" },
          { label: "Subtract ➖", value: "subtract" },
        ],
      },
      {
        id: "amount",
        label: "Amount",
        type: "number",
        defaultValue: "30",
        required: true,
        helpText: "The number of units to add or subtract",
      },
      {
        id: "unit",
        label: "Unit",
        type: "select",
        defaultValue: "days",
        options: [
          { label: "Days", value: "days" },
          { label: "Weeks", value: "weeks" },
          { label: "Months", value: "months" },
          { label: "Years", value: "years" },
        ],
      },
    ],
    calculate: calculateDateAddSubtract,
    formula: "Result date = Start date ± amount (in the chosen unit)",
    explanation:
      "This shifts a date forward or backward by a specified duration, correctly handling month-length and leap-year differences. Perfect for scheduling deadlines, planning events, or calculating due dates.",
    example: {
      inputs: {
        startDate: "2026-01-01",
        direction: "add",
        amount: "30",
        unit: "days",
      },
      note: "Jan 1, 2026 + 30 days = Jan 31, 2026.",
    },
    faq: [
      {
        q: "What happens when adding months to Jan 31?",
        a: "JavaScript's date rollover applies — adding a month to Jan 31 may land on March 2 or 3 if February is shorter, since Feb 31 doesn't exist.",
      },
      {
        q: "Can I subtract a date range instead?",
        a: "Use the Days Between Dates Calculator for that.",
      },
      {
        q: "Does this work with leap years?",
        a: "Yes, leap years are handled automatically.",
      },
    ],
    related: ["days-between-dates-calculator", "age-calculator"],
  },
  {
    slug: "time-duration-calculator",
    title: "Time Duration Calculator",
    category: "everyday",
    description:
      "Calculate the duration between two times. Perfect for work hours, meetings, and schedules.",
    fields: [
      {
        id: "startTime",
        label: "Start Time",
        type: "text",
        defaultValue: "09:00",
        required: true,
        helpText: "Enter in 24-hour format (HH:MM)",
      },
      {
        id: "endTime",
        label: "End Time",
        type: "text",
        defaultValue: "17:30",
        required: true,
        helpText: "Enter in 24-hour format (HH:MM)",
      },
    ],
    calculate: calculateTimeDuration,
    formula:
      "Duration = End time − Start time (add 24h if the result is negative)",
    explanation:
      "Time duration converts both times to minutes since midnight, subtracts them, and — if the end time is earlier than the start — assumes the duration wrapped past midnight. Perfect for calculating work hours, event lengths, or overnight shifts.",
    example: {
      inputs: { startTime: "09:00", endTime: "17:30" },
      note: "9:00 AM to 5:30 PM = 8 hours 30 minutes.",
    },
    faq: [
      {
        q: "How does this handle overnight shifts?",
        a: "If the end time is numerically earlier than the start (e.g. 23:00 to 01:00), it assumes the end time is on the next day.",
      },
      {
        q: "Does it support 12-hour AM/PM format?",
        a: "Enter times in 24-hour HH:MM format for unambiguous results.",
      },
      {
        q: "Can I calculate duration across multiple days?",
        a: "For multi-day durations, use the Days Between Dates Calculator instead.",
      },
    ],
    related: ["date-calculator", "pace-calculator"],
  },
  {
    slug: "days-between-dates-calculator",
    title: "Days Between Dates Calculator",
    category: "everyday",
    description:
      "Count the exact number of days between any two dates. Perfect for countdowns and planning.",
    fields: [
      {
        id: "startDate",
        label: "Start Date",
        type: "date",
        required: true,
        helpText: "The beginning date",
      },
      {
        id: "endDate",
        label: "End Date",
        type: "date",
        required: true,
        helpText: "The ending date",
      },
    ],
    calculate: calculateDaysBetween,
    formula: "Days = End date − Start date",
    explanation:
      "This subtracts two calendar dates directly, also breaking the result into whole weeks plus remaining days for convenience. Perfect for countdowns, project planning, or calculating days since an event.",
    example: {
      inputs: { startDate: "2026-01-01", endDate: "2026-03-01" },
      note: "Jan 1 to Mar 1, 2026 = 59 days.",
    },
    faq: [
      {
        q: "Can the result be negative?",
        a: "Yes, if the end date is before the start date.",
      },
      {
        q: "Does this include both endpoints?",
        a: "It counts the number of days elapsed between the two dates, not an inclusive day count — add 1 if you need to count both the start and end days.",
      },
      {
        q: "Does it account for leap years?",
        a: "Yes, leap years are handled automatically.",
      },
    ],
    related: ["age-calculator", "date-calculator"],
  },
  {
    slug: "bmi-calculator",
    title: "BMI Calculator",
    category: "everyday",
    description:
      "Calculate your Body Mass Index instantly. Includes WHO category classification.",
    fields: [
      {
        id: "unit",
        label: "Units",
        type: "select",
        defaultValue: "metric",
        options: [
          { label: "Metric (kg, cm)", value: "metric" },
          { label: "Imperial (lb, in)", value: "imperial" },
        ],
      },
      {
        id: "weight",
        label: "Weight",
        type: "number",
        defaultValue: "70",
        required: true,
        helpText: "Your weight in kg or lb",
      },
      {
        id: "height",
        label: "Height",
        type: "number",
        defaultValue: "175",
        required: true,
        helpText: "Your height in cm or inches",
      },
    ],
    calculate: calculateBMI,
    formula:
      "Metric: BMI = weight(kg) ÷ height(m)²     |     Imperial: BMI = 703 × weight(lb) ÷ height(in)²",
    explanation:
      "BMI is a general population screening ratio of weight to height, not a diagnostic tool — it doesn't account for muscle mass, body composition, age, or sex, so treat the category as a rough indicator rather than a health verdict. Perfect for health awareness and tracking.",
    example: {
      inputs: { unit: "metric", weight: "70", height: "175" },
      note: "70 kg at 175 cm = BMI 22.9 (Normal weight).",
    },
    faq: [
      {
        q: "Is BMI accurate for athletes?",
        a: "No — BMI doesn't distinguish muscle from fat, so it can overestimate body fat in very muscular people.",
      },
      {
        q: "What are the standard BMI categories?",
        a: "Under 18.5 = underweight, 18.5–24.9 = normal, 25–29.9 = overweight, 30+ = obesity (WHO general adult population bands).",
      },
      {
        q: "Should I use this as a health diagnosis?",
        a: "No — BMI is a screening tool only. Always consult a healthcare professional for health advice.",
      },
    ],
    related: ["calorie-calculator"],
  },
  {
    slug: "calorie-calculator",
    title: "Calorie Calculator",
    category: "everyday",
    description:
      "Estimate your daily calorie needs. Perfect for fitness, weight management, and nutrition planning.",
    fields: [
      {
        id: "weightKg",
        label: "Weight",
        type: "number",
        defaultValue: "70",
        required: true,
        helpText: "Your weight in kilograms",
      },
      {
        id: "heightCm",
        label: "Height",
        type: "number",
        defaultValue: "175",
        required: true,
        helpText: "Your height in centimeters",
      },
      {
        id: "age",
        label: "Age",
        type: "number",
        defaultValue: "30",
        required: true,
        helpText: "Your age in years",
      },
      {
        id: "sex",
        label: "Sex",
        type: "select",
        defaultValue: "male",
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ],
      },
      {
        id: "activityFactor",
        label: "Activity Level",
        type: "select",
        defaultValue: "1.2",
        options: [
          { label: "Sedentary (little to no exercise)", value: "1.2" },
          { label: "Lightly active (exercise 1-3 days/week)", value: "1.375" },
          {
            label: "Moderately active (exercise 3-5 days/week)",
            value: "1.55",
          },
          { label: "Very active (exercise 6-7 days/week)", value: "1.725" },
          { label: "Extremely active (daily intense exercise)", value: "1.9" },
        ],
      },
    ],
    calculate: calculateCalories,
    formula: "BMR (Mifflin-St Jeor) → TDEE = BMR × Activity Factor",
    explanation:
      "This estimates Total Daily Energy Expenditure by first computing Basal Metabolic Rate — the energy used at rest — then scaling it by an activity multiplier. It's a population-average estimate, not a personalized medical figure. Perfect for fitness planning, weight management, and understanding your energy needs.",
    example: {
      inputs: {
        weightKg: "70",
        heightCm: "175",
        age: "30",
        sex: "male",
        activityFactor: "1.55",
      },
      note: "Moderately active 30-year-old male at 70kg/175cm = ~2500 kcal/day.",
    },
    faq: [
      {
        q: "Is this suitable for weight-loss planning?",
        a: "It's a starting estimate; individual needs vary, so consult a healthcare professional for personalized guidance.",
      },
      {
        q: "Why does the formula differ by sex?",
        a: "The Mifflin-St Jeor equation includes a fixed offset that differs between men and women, reflecting average differences in body composition.",
      },
      {
        q: "How accurate is this calculation?",
        a: "It's a good estimate for average populations, but individual metabolism varies. Use it as a starting point.",
      },
    ],
    related: ["bmi-calculator"],
  },
  {
    slug: "pace-calculator",
    title: "Pace Calculator",
    category: "everyday",
    description:
      "Calculate your running, cycling, or walking pace. Shows speed and time per distance unit.",
    fields: [
      {
        id: "distance",
        label: "Distance",
        type: "number",
        defaultValue: "10",
        required: true,
        helpText: "Distance covered in your preferred unit",
      },
      {
        id: "hours",
        label: "Hours",
        type: "number",
        defaultValue: "0",
        helpText: "Hours spent exercising",
      },
      {
        id: "minutes",
        label: "Minutes",
        type: "number",
        defaultValue: "50",
        helpText: "Minutes spent exercising",
      },
      {
        id: "seconds",
        label: "Seconds",
        type: "number",
        defaultValue: "0",
        helpText: "Seconds spent exercising",
      },
    ],
    calculate: calculatePace,
    formula:
      "Pace = Total time ÷ Distance     |     Speed = Distance ÷ (Total time ÷ 60)",
    explanation:
      "Pace expresses how long each unit of distance takes (e.g. minutes per km), while speed expresses how much distance is covered per hour — two ways of looking at the same effort. Perfect for runners, cyclists, and fitness enthusiasts tracking their performance.",
    example: {
      inputs: { distance: "10", hours: "0", minutes: "50", seconds: "0" },
      note: "10 units in 50 minutes = 5:00 pace, or 12 units/hour.",
    },
    faq: [
      {
        q: "What distance unit does this use?",
        a: "Whatever unit you're measuring in (km, miles, etc.) — the calculator works with unitless ratios, so pick one and stay consistent.",
      },
      {
        q: "How do I convert pace to speed manually?",
        a: "Speed = 60 ÷ pace (in minutes per unit), giving units covered per hour.",
      },
      {
        q: "Can I use this for walking or swimming?",
        a: "Yes! It works for any activity with a distance and time.",
      },
    ],
    related: ["time-duration-calculator", "fuel-cost-calculator"],
  },
  {
    slug: "fuel-cost-calculator",
    title: "Fuel Cost Calculator",
    category: "everyday",
    description:
      "Estimate trip fuel costs. Perfect for road trips, commuting, and travel planning.",
    fields: [
      {
        id: "distance",
        label: "Trip Distance",
        type: "number",
        defaultValue: "300",
        required: true,
        helpText: "Total distance of your trip",
      },
      {
        id: "fuelEfficiency",
        label: "Fuel Efficiency",
        type: "number",
        defaultValue: "15",
        required: true,
        helpText: "Distance covered per unit of fuel",
      },
      {
        id: "pricePerUnit",
        label: "Price Per Unit of Fuel",
        type: "number",
        defaultValue: "3",
        required: true,
        helpText: "Cost of fuel per liter or gallon",
      },
    ],
    calculate: calculateFuelCost,
    formula:
      "Fuel needed = Distance ÷ Efficiency     |     Cost = Fuel needed × Price",
    explanation:
      "This scales your vehicle's fuel efficiency by the trip distance to find how much fuel is needed, then multiplies by the current price to estimate total cost. Perfect for budgeting trips, comparing vehicles, or planning travel expenses.",
    example: {
      inputs: { distance: "300", fuelEfficiency: "15", pricePerUnit: "3" },
      note: "300 km at 15 km/liter @ $3/liter = $60 fuel cost.",
    },
    faq: [
      {
        q: "Does this work with miles per gallon?",
        a: "Yes — just make sure distance, efficiency, and price all use consistent units (e.g. miles and gallons, or km and liters).",
      },
      {
        q: "Does it include tolls or other trip costs?",
        a: "No, this covers fuel cost only. Use it as part of your total trip budget.",
      },
      {
        q: "Can I compare fuel costs for different vehicles?",
        a: "Yes! Run the calculation with different efficiency values to compare costs.",
      },
    ],
    related: ["electricity-cost-calculator", "pace-calculator"],
  },
  {
    slug: "electricity-cost-calculator",
    title: "Electricity Cost Calculator",
    category: "everyday",
    description:
      "Calculate appliance electricity costs. Perfect for energy saving and budget planning.",
    fields: [
      {
        id: "powerWatts",
        label: "Power (Watts)",
        type: "number",
        defaultValue: "100",
        required: true,
        helpText: "Appliance power consumption in watts",
      },
      {
        id: "hoursPerDay",
        label: "Hours Per Day",
        type: "number",
        defaultValue: "5",
        required: true,
        helpText: "Average daily usage in hours",
      },
      {
        id: "days",
        label: "Number of Days",
        type: "number",
        defaultValue: "30",
        helpText: "Leave blank for monthly estimate",
      },
      {
        id: "ratePerKwh",
        label: "Electricity Rate",
        type: "number",
        defaultValue: "0.15",
        required: true,
        helpText: "Cost per kilowatt-hour from your bill",
      },
    ],
    calculate: calculateElectricityCost,
    formula: "kWh = (Watts × Hours) ÷ 1000     |     Cost = kWh × Days × Rate",
    explanation:
      "Electricity bills are based on kilowatt-hours (kWh) — the power drawn multiplied by how long it's used, converted from watts to kilowatts. Perfect for understanding appliance costs, energy saving, and household budgeting.",
    example: {
      inputs: {
        powerWatts: "100",
        hoursPerDay: "5",
        days: "30",
        ratePerKwh: "0.15",
      },
      note: "100W device, 5 hours/day, 30 days @ $0.15/kWh = $2.25.",
    },
    faq: [
      {
        q: "Where do I find my appliance's wattage?",
        a: "It's usually printed on a label on the device, or listed in its manual/spec sheet.",
      },
      {
        q: "How do I find my electricity rate?",
        a: "Check your latest utility bill — it's typically listed as a per-kWh charge.",
      },
      {
        q: "Can I compare different appliances?",
        a: "Yes! Calculate each appliance separately to see which ones cost the most to run.",
      },
    ],
    related: ["fuel-cost-calculator", "power-converter"],
  },
  {
    slug: "cooking-measurement-converter",
    title: "Cooking Measurement Converter",
    category: "everyday",
    description:
      "Convert between kitchen measurements instantly. Perfect for recipes and cooking.",
    fields: [
      {
        id: "value",
        label: "Value",
        type: "number",
        defaultValue: "1",
        required: true,
        helpText: "The amount to convert",
      },
      {
        id: "from",
        label: "From",
        type: "select",
        defaultValue: "cupUS",
        options: [
          { label: "Teaspoon", value: "tsp" },
          { label: "Tablespoon", value: "tbsp" },
          { label: "Fluid Ounce (US)", value: "flozUS" },
          { label: "Cup (US)", value: "cupUS" },
          { label: "Pint (US)", value: "pintUS" },
          { label: "Quart (US)", value: "quartUS" },
          { label: "Milliliter", value: "ml" },
          { label: "Liter", value: "l" },
        ],
      },
      {
        id: "to",
        label: "To",
        type: "select",
        defaultValue: "tbsp",
        options: [
          { label: "Teaspoon", value: "tsp" },
          { label: "Tablespoon", value: "tbsp" },
          { label: "Fluid Ounce (US)", value: "flozUS" },
          { label: "Cup (US)", value: "cupUS" },
          { label: "Pint (US)", value: "pintUS" },
          { label: "Quart (US)", value: "quartUS" },
          { label: "Milliliter", value: "ml" },
          { label: "Liter", value: "l" },
        ],
      },
    ],
    calculate: calculateCookingConversion,
    formula: "Result = (Value × FromUnit→ml) ÷ ToUnit→ml",
    explanation:
      "Recipe measurements convert through milliliters as a common base, using US customary definitions for teaspoons, tablespoons, and cups. Perfect for scaling recipes, adapting international recipes, or adjusting serving sizes.",
    example: {
      inputs: { value: "1", from: "cupUS", to: "tbsp" },
      note: "1 US cup = 16 tablespoons.",
    },
    faq: [
      {
        q: "Are these US or metric cup sizes?",
        a: "This converter uses US customary cup/tablespoon/teaspoon sizes.",
      },
      {
        q: "Where's the full volume converter?",
        a: "For non-cooking volume units (gallons, cubic meters, etc.), use the general Volume Converter.",
      },
      {
        q: "Can I convert recipe serving sizes?",
        a: "Use this to convert individual measurements, then scale your recipe manually.",
      },
    ],
    related: ["volume-converter"],
  },
];
