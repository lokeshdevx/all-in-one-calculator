"use server";

import { getCalculatorBySlug } from "../registry";
import { CalcOutput } from "./types";

export async function runCalculation(
  slug: string,
  values: Record<string, string>
): Promise<CalcOutput> {
  const def = getCalculatorBySlug(slug);
  if (!def) {
    return { ok: false, error: "Unknown calculator." };
  }
  try {
    return def.calculate(values);
  } catch (e) {
    return { ok: false, error: "Something went wrong evaluating that input. Please check your values and try again." };
  }
}
