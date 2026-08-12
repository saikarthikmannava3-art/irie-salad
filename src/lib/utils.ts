import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function generateOrderNo(cityCode: string, date: Date, seq: number): string {
  const d = date.toISOString().slice(0, 10).replace(/-/g, "");
  return `ORD-${cityCode}-${d}-${String(seq).padStart(4, "0")}`;
}

export function generateSubscriptionNo(cityCode: string, date: Date, seq: number): string {
  const d = date.toISOString().slice(0, 10).replace(/-/g, "");
  return `SUB-${cityCode}-${d}-${String(seq).padStart(3, "0")}`;
}
