import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Concatenate and merge class names, to reduce the amount of CSS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
