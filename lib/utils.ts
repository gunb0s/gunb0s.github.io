import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateToReadableString(isoString: string): string {
  const date = new Date(isoString);

  const options: Intl.DateTimeFormatOptions = {
    month: "short", // e.g., "Dec"
    day: "numeric", // e.g., "8"
    year: "numeric", // e.g., "2024"
    timeZone: "Asia/Seoul", // 한국 시간으로 변환
  };

  return date.toLocaleDateString("en-US", options);
}
