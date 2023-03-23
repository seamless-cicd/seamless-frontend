import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { RunType } from '../schema/runSchema';
import { StageType } from '../schema/stageSchema';

// Concatenate and merge class names, to reduce the amount of CSS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format datetime to "3/17/2023, 6:23:24 PM" format
// Used for log timestamps
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

// Group Runs or Stages by status
type ArrayElement = RunType | StageType;

export function groupBy<T extends ArrayElement>(array: T[], key: keyof T) {
  return array.reduce((result, currentValue) => {
    const keyValue = currentValue[key] as unknown as string;
    (result[keyValue] = result[keyValue] || []).push(currentValue);
    return result;
  }, {} as Record<string, T[]>);
}
