import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Concatenate and merge class names, to reduce the amount of CSS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format datetime to "3/17/2023, 6:23:24 PM" format
export function formatDateTime(dateString: string) {
  const date = new Date(dateString);
  const formattedDateTime = date.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });
  return formattedDateTime;
}
