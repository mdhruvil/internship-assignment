import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ExtractedMessage } from "./gmail";
import { Classification } from "./classifier";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateInitials(fullName: string): string {
  const nameParts = fullName.split(" ");
  const initials = nameParts.map((part) => part.charAt(0)).join("");

  return initials.toUpperCase();
}

export function saveMailsInLocalStorage(emails: ExtractedMessage[]) {
  localStorage.setItem("emails", JSON.stringify(emails));
}

export function getMailsFromLocalStorage(): ExtractedMessage[] {
  return JSON.parse(
    localStorage.getItem("emails") ?? "[]",
  ) as ExtractedMessage[];
}
export function getApiKeyFromLocalStorage() {
  return localStorage.getItem("apiKey");
}

export function getMailFromId(id: string): ExtractedMessage | undefined {
  const emails = JSON.parse(
    localStorage.getItem("emails") ?? "[]",
  ) as ExtractedMessage[];
  return emails.find((email) => email.id === id);
}

export function getClassificationFromId(
  id: string,
): Classification | undefined {
  const classifications = JSON.parse(
    localStorage.getItem("classifications") ?? "[]",
  ) as Classification[];
  return classifications.find((classification) => classification.id === id);
}
