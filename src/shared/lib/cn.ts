import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge class lists with Tailwind-aware conflict resolution. */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
