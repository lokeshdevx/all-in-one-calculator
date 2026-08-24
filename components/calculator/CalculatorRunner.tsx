"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CalcField, CalcOutput } from "../../lib/types";
import { runCalculation } from "../../lib/actions";
import {
  Calculator,
  Copy,
  Share2,
  Printer,
  RotateCcw,
  Check,
  Sparkles,
  ArrowRight,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function CalculatorRunner({
  slug,
  fields,
  initialValues,
}: {
  slug: string;
  fields: CalcField[];
  initialValues: Record<string, string>;
}) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [output, setOutput] = useState<CalcOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function updateField(id: string, value: string) {
    setValues((prev) => ({ ...prev, [id]: value }));
  }

  function calculate(currentValues: Record<string, string>) {
    startTransition(async () => {
      const result = await runCalculation(slug, currentValues);
      setOutput(result);
    });
  }

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      calculate(values);
      const params = new URLSearchParams();
      for (const [k, v] of Object.entries(values)) {
        if (v !== undefined && v !== "") params.set(k, v);
      }
      router.replace(`?${params.toString()}`, { scroll: false });
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [values]);

  function handleReset() {
    const defaults: Record<string, string> = {};
    for (const f of fields) defaults[f.id] = f.defaultValue ?? "";
    setValues(defaults);
  }

  async function handleCopy() {
    if (output?.ok) {
      await navigator.clipboard.writeText(output.result);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  async function handleShare() {
    await navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 1500);
  }

  const gridColsClass = useMemo(
    () => (fields.length > 4 ? "sm:grid-cols-2" : "sm:grid-cols-1"),
    [fields],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Input Section */}
      <div className="space-y-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-[#E3F2FD]/30 border border-[#90CAF9]/30 shadow-xl shadow-[#2196F3]/5">
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#2196F3]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#90CAF9]/5 rounded-full blur-3xl" />

          <div className="relative p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#2196F3] to-[#0D47A1] shadow-lg shadow-[#2196F3]/30">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-[#0D47A1]">
                  Enter Values
                </h2>
                <p className="text-sm text-[#0D47A1]/60">
                  Fill in the fields below to calculate
                </p>
              </div>
            </div>

            <form
              className={`grid gap-5 ${gridColsClass}`}
              onSubmit={(e) => {
                e.preventDefault();
                calculate(values);
              }}
            >
              {fields.map((field) => (
                <div key={field.id} className="group">
                  <label
                    htmlFor={field.id}
                    className="block text-sm font-semibold text-[#0D47A1] mb-1.5"
                  >
                    {field.label}
                    {field.required && (
                      <span className="text-[#2196F3] ml-1">*</span>
                    )}
                  </label>

                  {field.type === "select" ? (
                    <div className="relative">
                      <select
                        id={field.id}
                        value={values[field.id] ?? ""}
                        onChange={(e) => updateField(field.id, e.target.value)}
                        className="w-full rounded-xl border-2 border-[#90CAF9]/40 bg-white px-4 py-3 text-sm outline-none transition-all text-[#0D47A1] appearance-none focus:border-[#2196F3] focus:ring-4 focus:ring-[#2196F3]/10 hover:border-[#2196F3]/60"
                      >
                        {field.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-[#90CAF9]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        id={field.id}
                        type={field.type === "number" ? "text" : field.type}
                        inputMode={
                          field.type === "number" ? "decimal" : undefined
                        }
                        placeholder={field.placeholder}
                        value={values[field.id] ?? ""}
                        onChange={(e) => updateField(field.id, e.target.value)}
                        onFocus={() => setFocusedField(field.id)}
                        onBlur={() => setFocusedField(null)}
                        aria-describedby={
                          field.helpText ? `${field.id}-help` : undefined
                        }
                        className={`w-full h-12 rounded-xl border-2 px-4 py-3 text-sm outline-none transition-all font-mono-num text-[#0D47A1] placeholder:text-[#0D47A1]/40 bg-white
                          ${
                            focusedField === field.id
                              ? "border-[#2196F3] ring-4 ring-[#2196F3]/10 h-12"
                              : "border-[#90CAF9]/40 hover:border-[#2196F3]/60"
                          }`}
                      />
                    </div>
                  )}

                  {field.helpText && (
                    <span
                      id={`${field.id}-help`}
                      className="text-xs text-[#0D47A1]/50 mt-1 block"
                    >
                      {field.helpText}
                    </span>
                  )}
                </div>
              ))}

              <div className="flex flex-wrap gap-3 pt-4 sm:col-span-full">
                <button
                  type="submit"
                  className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#2196F3] to-[#0D47A1] text-white font-semibold shadow-lg shadow-[#2196F3]/30 hover:shadow-[#2196F3]/40 transition-all hover:scale-105"
                >
                  <Calculator className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>Calculate</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#90CAF9]/40 text-[#0D47A1] font-medium hover:bg-[#E3F2FD] hover:border-[#2196F3] transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Result Section */}
      <div className="space-y-6">
        {/* Result Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#E3F2FD]/50 to-white border border-[#90CAF9]/30 shadow-xl shadow-[#2196F3]/5">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#2196F3]/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#90CAF9]/5 rounded-full blur-3xl" />

          <div className="relative p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#2196F3]">
                  Result
                </span>
                {isPending && (
                  <Loader2 className="w-4 h-4 text-[#2196F3] animate-spin" />
                )}
              </div>
              {output?.ok && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200">
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-xs font-medium text-green-700">
                    Ready
                  </span>
                </div>
              )}
            </div>

            <div className="min-h-[120px] flex items-center">
              {isPending ? (
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#2196F3] animate-bounce" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#2196F3] animate-bounce delay-100" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#2196F3] animate-bounce delay-200" />
                  </div>
                  <span className="text-sm font-medium text-[#0D47A1]/60">
                    Calculating...
                  </span>
                </div>
              ) : output === null ? (
                <div className="flex flex-col items-center w-full text-center">
                  <div className="w-12 h-12 rounded-full bg-[#E3F2FD] flex items-center justify-center mb-3">
                    <Calculator className="w-6 h-6 text-[#90CAF9]" />
                  </div>
                  <span className="text-sm text-[#0D47A1]/50">
                    Enter values to see the result
                  </span>
                </div>
              ) : output.ok ? (
                <div className="w-full">
                  <span className="text-3xl sm:text-4xl font-mono-num font-bold text-[#0D47A1] break-words">
                    {output.result}
                  </span>
                  {output?.unit && (
                    <span className="ml-2 text-lg text-[#0D47A1]/60 font-medium">
                      {output?.unit}
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3 w-full p-4 rounded-xl bg-red-50 border border-red-200">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-red-700">
                    {output.error}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={handleCopy}
            disabled={!output?.ok}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-[#90CAF9]/40 text-[#0D47A1] font-medium hover:bg-[#E3F2FD] hover:border-[#2196F3] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#2196F3]" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Result</span>
              </>
            )}
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-[#90CAF9]/40 text-[#0D47A1] font-medium hover:bg-[#E3F2FD] hover:border-[#2196F3] transition-all"
          >
            {copiedLink ? (
              <>
                <Check className="w-4 h-4 text-[#2196F3]" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Share Link</span>
              </>
            )}
          </button>
        </div>

        {/* Steps Section */}
        {output?.ok && output.steps.length > 0 && (
          <div className="relative overflow-hidden rounded-3xl bg-white border border-[#90CAF9]/30 shadow-xl shadow-[#2196F3]/5">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-[#E3F2FD]">
                  <Sparkles className="w-5 h-5 text-[#2196F3]" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-[#0D47A1]">
                    Step-by-Step Solution
                  </h3>
                  <p className="text-sm text-[#0D47A1]/60">
                    See how the result was calculated
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {output.steps.map((step, i) => (
                  <div
                    key={i}
                    className="group relative rounded-2xl bg-gradient-to-br from-white to-[#E3F2FD]/20 border border-[#90CAF9]/20 p-5 hover:border-[#2196F3]/40 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#2196F3] to-[#0D47A1] text-white text-sm font-bold shadow-lg shadow-[#2196F3]/30">
                          {i + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-[#0D47A1] mb-1.5">
                          {step.title}
                        </h4>
                        <div className="font-mono-num text-sm text-[#0D47A1]/70 bg-[#E3F2FD]/30 p-3 rounded-xl border border-[#90CAF9]/20 break-words">
                          {step.content}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
