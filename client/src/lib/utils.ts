import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Product prices come from the DB as formatted strings like
// "12 900.00РУБ" (thousands-separator space + currency suffix) or
// "Цена по запросу" for price-on-request. A bare parseFloat() stops at the
// first non-numeric character, so "12 900.00РУБ" silently becomes 12 —
// strip everything but digits/decimal point first. Returns NaN for
// price-on-request strings, same as a plain parseFloat would.
export function parsePrice(price: string | number | null | undefined): number {
  if (typeof price === "number") return price;
  if (!price) return NaN;
  return parseFloat(String(price).replace(/[^0-9.]/g, ""));
}
