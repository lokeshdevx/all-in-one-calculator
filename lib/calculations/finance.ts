import { CalcOutput, fail, ok } from "../types";
import { parseNumber, formatNumber, formatCurrency } from "../parse";

export function calculateSimpleInterest(values: Record<string, string>): CalcOutput {
  const p = parseNumber(values.principal);
  const r = parseNumber(values.rate);
  const t = parseNumber(values.time);
  if (p === null || r === null || t === null) return fail("Enter valid numbers for principal, rate, and time.");
  if (p < 0 || r < 0 || t < 0) return fail("Principal, rate, and time cannot be negative.");
  const interest = (p * r * t) / 100;
  const total = p + interest;
  return ok(formatCurrency(interest), [
    { title: "Formula", content: "SI = (P × R × T) ÷ 100" },
    { title: "Substitute values", content: `(${formatNumber(p)} × ${formatNumber(r)} × ${formatNumber(t)}) ÷ 100 = ${formatNumber(interest)}` },
    { title: "Total payable", content: `Principal + Interest = ${formatNumber(p)} + ${formatNumber(interest)} = ${formatNumber(total)}` },
  ], interest);
}

export function calculateCompoundInterest(values: Record<string, string>): CalcOutput {
  const p = parseNumber(values.principal);
  const r = parseNumber(values.rate);
  const t = parseNumber(values.time);
  const n = parseNumber(values.compoundsPerYear) ?? 1;
  if (p === null || r === null || t === null) return fail("Enter valid numbers for principal, rate, and time.");
  if (p < 0 || r < 0 || t < 0 || n <= 0) return fail("Principal, rate, and time cannot be negative, and compounding frequency must be positive.");
  const amount = p * (1 + r / 100 / n) ** (n * t);
  const interest = amount - p;
  return ok(formatCurrency(interest), [
    { title: "Formula", content: "A = P × (1 + r/(100n))^(n×t)" },
    { title: "Compute the periodic rate", content: `${formatNumber(r)} ÷ 100 ÷ ${n} = ${formatNumber(r / 100 / n, 8)}` },
    { title: "Compute number of periods", content: `${n} × ${formatNumber(t)} = ${formatNumber(n * t)}` },
    { title: "Compute final amount", content: `${formatNumber(p)} × (1 + ${formatNumber(r / 100 / n, 6)})^${formatNumber(n * t)} = ${formatNumber(amount)}` },
    { title: "Interest earned", content: `${formatNumber(amount)} − ${formatNumber(p)} = ${formatNumber(interest)}` },
  ], interest);
}

export function calculateEMI(values: Record<string, string>): CalcOutput {
  const p = parseNumber(values.principal);
  const annualRate = parseNumber(values.rate);
  const years = parseNumber(values.years);
  if (p === null || annualRate === null || years === null) return fail("Enter valid numbers for loan amount, interest rate, and term.");
  if (p <= 0 || annualRate < 0 || years <= 0) return fail("Loan amount and term must be positive; rate cannot be negative.");
  const n = years * 12;
  if (annualRate === 0) {
    const emi = p / n;
    return ok(formatCurrency(emi), [
      { title: "Zero-interest case", content: "With a 0% rate, EMI = Principal ÷ Number of months" },
      { title: "Substitute values", content: `${formatNumber(p)} ÷ ${n} = ${formatNumber(emi)}` },
    ], emi);
  }
  const r = annualRate / 12 / 100;
  const factor = (1 + r) ** n;
  const emi = (p * r * factor) / (factor - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - p;
  return ok(formatCurrency(emi), [
    { title: "Convert annual rate to monthly rate", content: `${formatNumber(annualRate)} ÷ 12 ÷ 100 = ${formatNumber(r, 8)}` },
    { title: "Convert years to months", content: `${formatNumber(years)} × 12 = ${n}` },
    { title: "Formula", content: "EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1)" },
    { title: "Substitute values", content: `${formatNumber(p)} × ${formatNumber(r, 6)} × ${formatNumber(factor, 6)} ÷ (${formatNumber(factor, 6)} − 1) = ${formatNumber(emi)}` },
    { title: "Total interest over the loan", content: `(${formatNumber(emi)} × ${n}) − ${formatNumber(p)} = ${formatNumber(totalInterest)}` },
  ], emi);
}

export function calculateMortgage(values: Record<string, string>): CalcOutput {
  // Same amortization math as EMI, but also reports property-tax/insurance add-ons if given.
  const base = calculateEMI(values);
  if (!base.ok) return base;
  const tax = parseNumber(values.monthlyTax) ?? 0;
  const insurance = parseNumber(values.monthlyInsurance) ?? 0;
  if (tax < 0 || insurance < 0) return fail("Monthly tax and insurance cannot be negative.");
  const principalAndInterest = base.numeric ?? 0;
  const totalMonthly = principalAndInterest + tax + insurance;
  return ok(formatCurrency(totalMonthly), [
    ...base.steps,
    { title: "Add taxes and insurance", content: `${formatNumber(principalAndInterest)} + ${formatNumber(tax)} + ${formatNumber(insurance)} = ${formatNumber(totalMonthly)}` },
  ], totalMonthly);
}

export function calculateSIP(values: Record<string, string>): CalcOutput {
  const monthly = parseNumber(values.monthlyInvestment);
  const annualRate = parseNumber(values.annualReturnRate);
  const years = parseNumber(values.years);
  if (monthly === null || annualRate === null || years === null) return fail("Enter valid numbers for the monthly investment, expected return, and duration.");
  if (monthly <= 0 || years <= 0) return fail("Monthly investment and duration must be positive.");
  const n = years * 12;
  const r = annualRate / 12 / 100;
  const futureValue =
    r === 0 ? monthly * n : monthly * (((1 + r) ** n - 1) / r) * (1 + r);
  const invested = monthly * n;
  const gains = futureValue - invested;
  return ok(formatCurrency(futureValue), [
    { title: "Convert annual return to monthly rate", content: `${formatNumber(annualRate)} ÷ 12 ÷ 100 = ${formatNumber(r, 8)}` },
    { title: "Formula", content: "FV = P × (((1+r)^n − 1) ÷ r) × (1+r)" },
    { title: "Substitute values", content: `${formatNumber(monthly)} × ((( 1+${formatNumber(r, 6)})^${n} − 1) ÷ ${formatNumber(r, 6)}) × (1+${formatNumber(r, 6)}) = ${formatNumber(futureValue)}` },
    { title: "Total invested", content: `${formatNumber(monthly)} × ${n} = ${formatNumber(invested)}` },
    { title: "Wealth gained", content: `${formatNumber(futureValue)} − ${formatNumber(invested)} = ${formatNumber(gains)}` },
  ], futureValue);
}

export function calculateROI(values: Record<string, string>): CalcOutput {
  const cost = parseNumber(values.cost);
  const revenue = parseNumber(values.revenue);
  if (cost === null || revenue === null) return fail("Enter valid numbers for initial cost and final value.");
  if (cost === 0) return fail("Initial cost cannot be zero.");
  const gain = revenue - cost;
  const roi = (gain / cost) * 100;
  return ok(`${formatNumber(roi)}%`, [
    { title: "Formula", content: "ROI = ((Final Value − Cost) ÷ Cost) × 100" },
    { title: "Net gain", content: `${formatNumber(revenue)} − ${formatNumber(cost)} = ${formatNumber(gain)}` },
    { title: "Substitute values", content: `(${formatNumber(gain)} ÷ ${formatNumber(cost)}) × 100 = ${formatNumber(roi)}%` },
  ], roi);
}

export function calculateProfitLoss(values: Record<string, string>): CalcOutput {
  const cost = parseNumber(values.costPrice);
  const sale = parseNumber(values.sellingPrice);
  if (cost === null || sale === null) return fail("Enter valid numbers for cost price and selling price.");
  if (cost < 0 || sale < 0) return fail("Prices cannot be negative.");
  const diff = sale - cost;
  const isProfit = diff >= 0;
  const pct = cost === 0 ? 0 : (Math.abs(diff) / cost) * 100;
  return ok(
    `${isProfit ? "Profit" : "Loss"} of ${formatCurrency(Math.abs(diff))} (${formatNumber(pct)}%)`,
    [
      { title: "Difference", content: `Selling Price − Cost Price = ${formatNumber(sale)} − ${formatNumber(cost)} = ${formatNumber(diff)}` },
      { title: "Classify", content: diff >= 0 ? "Positive difference → profit" : "Negative difference → loss" },
      { title: `${isProfit ? "Profit" : "Loss"} percentage`, content: `(${formatNumber(Math.abs(diff))} ÷ ${formatNumber(cost)}) × 100 = ${formatNumber(pct)}%` },
    ],
    diff
  );
}

export function calculateDiscount(values: Record<string, string>): CalcOutput {
  const price = parseNumber(values.price);
  const pct = parseNumber(values.discountPercent);
  if (price === null || pct === null) return fail("Enter valid numbers for original price and discount percentage.");
  if (price < 0 || pct < 0) return fail("Price and discount percentage cannot be negative.");
  const discountAmount = (price * pct) / 100;
  const finalPrice = price - discountAmount;
  return ok(formatCurrency(finalPrice), [
    { title: "Discount amount", content: `(${formatNumber(price)} × ${formatNumber(pct)}) ÷ 100 = ${formatNumber(discountAmount)}` },
    { title: "Final price", content: `${formatNumber(price)} − ${formatNumber(discountAmount)} = ${formatNumber(finalPrice)}` },
  ], finalPrice);
}

export function calculateTax(values: Record<string, string>): CalcOutput {
  const amount = parseNumber(values.amount);
  const rate = parseNumber(values.taxRate);
  if (amount === null || rate === null) return fail("Enter valid numbers for the amount and tax rate.");
  if (amount < 0 || rate < 0) return fail("Amount and tax rate cannot be negative.");
  const mode = values.mode ?? "exclusive";
  if (mode === "exclusive") {
    const tax = (amount * rate) / 100;
    const total = amount + tax;
    return ok(formatCurrency(total), [
      { title: "Tax amount", content: `(${formatNumber(amount)} × ${formatNumber(rate)}) ÷ 100 = ${formatNumber(tax)}` },
      { title: "Total with tax", content: `${formatNumber(amount)} + ${formatNumber(tax)} = ${formatNumber(total)}` },
    ], total);
  }
  // inclusive: amount already includes tax, back out the base price
  const base = amount / (1 + rate / 100);
  const tax = amount - base;
  return ok(formatCurrency(base), [
    { title: "Formula", content: "Base = Total ÷ (1 + Rate/100)" },
    { title: "Substitute", content: `${formatNumber(amount)} ÷ (1 + ${formatNumber(rate)}/100) = ${formatNumber(base)}` },
    { title: "Tax portion", content: `${formatNumber(amount)} − ${formatNumber(base)} = ${formatNumber(tax)}` },
  ], base);
}

export function calculateSalary(values: Record<string, string>): CalcOutput {
  const gross = parseNumber(values.grossAnnual);
  const taxRate = parseNumber(values.effectiveTaxRate);
  const otherDeductions = parseNumber(values.otherMonthlyDeductions) ?? 0;
  if (gross === null || taxRate === null) return fail("Enter valid numbers for gross annual salary and effective tax rate.");
  if (gross < 0 || taxRate < 0 || otherDeductions < 0) return fail("Values cannot be negative.");
  const annualTax = (gross * taxRate) / 100;
  const annualNet = gross - annualTax;
  const monthlyNetBeforeOther = annualNet / 12;
  const monthlyTakeHome = monthlyNetBeforeOther - otherDeductions;
  return ok(formatCurrency(monthlyTakeHome) + " / month", [
    { title: "Annual tax", content: `(${formatNumber(gross)} × ${formatNumber(taxRate)}) ÷ 100 = ${formatNumber(annualTax)}` },
    { title: "Annual net", content: `${formatNumber(gross)} − ${formatNumber(annualTax)} = ${formatNumber(annualNet)}` },
    { title: "Monthly net (before other deductions)", content: `${formatNumber(annualNet)} ÷ 12 = ${formatNumber(monthlyNetBeforeOther)}` },
    { title: "Subtract other monthly deductions", content: `${formatNumber(monthlyNetBeforeOther)} − ${formatNumber(otherDeductions)} = ${formatNumber(monthlyTakeHome)}` },
  ], monthlyTakeHome);
}

// Static snapshot rates for illustration only — see the on-page disclaimer.
// A production deployment must replace this with a live FX rate service and
// surface rate + rate date + rate source, per spec section 4.
export const STATIC_FX_RATES_USD: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, INR: 87.5, JPY: 149.5, CNY: 7.15, CAD: 1.36,
  AUD: 1.51, CHF: 0.80, SGD: 1.30, HKD: 7.82, NZD: 1.63, AED: 3.67, SAR: 3.75,
  QAR: 3.64, KWD: 0.307, BHD: 0.377, OMR: 0.385, THB: 34.8, MYR: 4.45,
  IDR: 15850, PHP: 56.3, KRW: 1385, ZAR: 18.1, BRL: 5.55, MXN: 18.6, TRY: 34.1,
  RUB: 89.0, SEK: 10.4, NOK: 10.6, DKK: 6.86, PLN: 3.98, CZK: 23.4, HUF: 385,
  ILS: 3.68, EGP: 48.5, PKR: 278, BDT: 119, LKR: 300, NPR: 133,
};
export const FX_SNAPSHOT_DATE = "2026-01-15";
export const FX_SNAPSHOT_SOURCE = "Static illustrative snapshot (not live)";

export function calculateCurrency(values: Record<string, string>): CalcOutput {
  const amount = parseNumber(values.amount);
  const from = values.from?.toUpperCase();
  const to = values.to?.toUpperCase();
  if (amount === null) return fail("Enter a valid amount.");
  if (!from || !to || !(from in STATIC_FX_RATES_USD) || !(to in STATIC_FX_RATES_USD)) {
    return fail("Select valid source and target currencies.");
  }
  const usd = amount / STATIC_FX_RATES_USD[from];
  const result = usd * STATIC_FX_RATES_USD[to];
  return ok(`${formatNumber(result, 2)} ${to}`, [
    { title: "Rate source", content: `${FX_SNAPSHOT_SOURCE} · dated ${FX_SNAPSHOT_DATE}. Not live — do not use for real transactions.` },
    { title: "Convert source amount to USD", content: `${formatNumber(amount)} ${from} ÷ ${STATIC_FX_RATES_USD[from]} = ${formatNumber(usd, 4)} USD` },
    { title: "Convert USD to target currency", content: `${formatNumber(usd, 4)} USD × ${STATIC_FX_RATES_USD[to]} = ${formatNumber(result, 2)} ${to}` },
  ], result);
}

export function calculateInflation(values: Record<string, string>): CalcOutput {
  const present = parseNumber(values.presentValue);
  const rate = parseNumber(values.annualInflationRate);
  const years = parseNumber(values.years);
  if (present === null || rate === null || years === null) return fail("Enter valid numbers for amount, inflation rate, and years.");
  if (present < 0 || years < 0) return fail("Amount and years cannot be negative.");
  const futureValue = present * (1 + rate / 100) ** years;
  const purchasingPowerOfPresentAmountInFuture = present / (1 + rate / 100) ** years;
  return ok(formatCurrency(futureValue), [
    { title: "Formula", content: "Future cost = Present value × (1 + rate/100)^years" },
    { title: "Substitute values", content: `${formatNumber(present)} × (1 + ${formatNumber(rate)}/100)^${formatNumber(years)} = ${formatNumber(futureValue)}` },
    {
      title: "Equivalent purchasing power today",
      content: `${formatNumber(present)} will feel like ${formatNumber(purchasingPowerOfPresentAmountInFuture)} in today's money after ${formatNumber(years)} years of ${formatNumber(rate)}% inflation.`,
    },
  ], futureValue);
}

export function calculateTip(values: Record<string, string>): CalcOutput {
  const bill = parseNumber(values.billAmount);
  const tipPct = parseNumber(values.tipPercent);
  const people = parseNumber(values.splitBetween) ?? 1;
  if (bill === null || tipPct === null) return fail("Enter valid numbers for the bill amount and tip percentage.");
  if (bill < 0 || tipPct < 0 || people <= 0) return fail("Bill and tip percentage cannot be negative, and the number of people must be positive.");
  const tip = (bill * tipPct) / 100;
  const total = bill + tip;
  const perPerson = total / people;
  return ok(formatCurrency(perPerson) + (people > 1 ? " per person" : ""), [
    { title: "Tip amount", content: `(${formatNumber(bill)} × ${formatNumber(tipPct)}) ÷ 100 = ${formatNumber(tip)}` },
    { title: "Total bill", content: `${formatNumber(bill)} + ${formatNumber(tip)} = ${formatNumber(total)}` },
    ...(people > 1 ? [{ title: "Split between people", content: `${formatNumber(total)} ÷ ${people} = ${formatNumber(perPerson)}` }] : []),
  ], perPerson);
}
