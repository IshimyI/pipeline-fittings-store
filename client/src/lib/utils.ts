import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parsePrice(price: string | number | null | undefined): number {
  if (typeof price === "number") return price;
  if (!price) return NaN;
  return parseFloat(String(price).replace(/[^0-9.]/g, ""));
}
