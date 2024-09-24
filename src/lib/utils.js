import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function filterString(str) {
  const words = str.trim().split(/\s+/);
  if (words.length <= 10) {
    return str;
  }
  return words.slice(0, 10).join(" ") + "...";
}
