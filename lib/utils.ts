import { type ClassValue, clsx } from "clsx";

// Simple cn utility for merging class names
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
