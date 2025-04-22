import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// 合并类名，可以处理Tailwind类的智能合并
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
} 