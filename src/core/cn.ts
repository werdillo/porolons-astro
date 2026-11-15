import { clsx, type ClassValue } from "clsx";

/** Joins class names, dropping falsy values. Conflicting utilities are not merged: the later one wins by CSS order. */
export function cn(...inputs: ClassValue[]): string {
    return clsx(inputs);
}
