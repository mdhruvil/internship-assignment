import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateInitials(fullName: string): string {
  const nameParts = fullName.split(" ");
  const initials = nameParts.map((part) => part.charAt(0)).join("");

  return initials.toUpperCase();
}
