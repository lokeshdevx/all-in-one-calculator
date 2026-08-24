// Shared types used by every calculator's calculation engine.

export interface CalcStep {
  title: string;
  content: string;
}

export type CalcOutput =
  | { ok: true; result: string; numeric?: number; steps: CalcStep[] }
  | { ok: false; error: string };

export function fail(error: string): CalcOutput {
  return { ok: false, error };
}

export function ok(result: string, steps: CalcStep[], numeric?: number): CalcOutput {
  return { ok: true, result, steps, numeric };
}

// ---- input schema (drives the auto-generated form) ----

export type FieldType = "number" | "text" | "select" | "date";

export interface FieldOption {
  label: string;
  value: string;
}

export interface CalcField {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  defaultValue?: string;
  options?: FieldOption[];
  helpText?: string;
  required?: boolean;
  step?: string; // html step attribute for number inputs
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface CalculatorDefinition {
  slug: string;
  title: string;
  shortTitle?: string;
  category:
    | "basic"
    | "finance"
    | "conversions"
    | "math-science"
    | "everyday"
    | "developer";
  description: string;
  fields: CalcField[];
  calculate: (values: Record<string, string>) => CalcOutput;
  formula: string;
  explanation: string;
  example: {
    inputs: Record<string, string>;
    note?: string;
  };
  faq: FaqItem[];
  related: string[]; // slugs
}
