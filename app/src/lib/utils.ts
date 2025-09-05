import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format time for display based on preference
 */
export function formatTime(time: string, format: '12h' | '24h' = '24h'): string {
  if (format === '24h') {
    return time;
  }

  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

/**
 * Format height for display
 */
export function formatHeight(height: number, unit: 'm' | 'ft' = 'm'): string {
  if (unit === 'ft') {
    const feet = height * 3.28084;
    return `${feet.toFixed(1)}ft`;
  }
  return `${height.toFixed(2)}m`;
}

/**
 * Get tide type color classes
 */
export function getTideTypeColor(type: 'high' | 'low'): string {
  return type === 'high' ? 'text-blue-600 bg-blue-50' : 'text-orange-600 bg-orange-50';
}

/**
 * Get coefficient level description and color
 */
export function getCoefficientInfo(coefficient: number): {
  level: string;
  color: string;
  description: string;
} {
  if (coefficient >= 95) {
    return {
      level: 'Très fort',
      color: 'text-red-600 bg-red-50',
      description: 'Grandes marées exceptionnelles'
    };
  } else if (coefficient >= 70) {
    return {
      level: 'Fort',
      color: 'text-orange-600 bg-orange-50',
      description: 'Grandes marées'
    };
  } else if (coefficient >= 45) {
    return {
      level: 'Moyen',
      color: 'text-blue-600 bg-blue-50',
      description: 'Marées moyennes'
    };
  } else {
    return {
      level: 'Faible',
      color: 'text-gray-600 bg-gray-50',
      description: 'Marées de morte-eau'
    };
  }
}

/**
 * Sort tide events by time
 */
export function sortTideEvents(events: Array<{ time: string; height: number; type: 'high' | 'low' }>) {
  return [...events].sort((a, b) => {
    const timeA = a.time.split(':').map(Number);
    const timeB = b.time.split(':').map(Number);
    const minutesA = timeA[0] * 60 + timeA[1];
    const minutesB = timeB[0] * 60 + timeB[1];
    return minutesA - minutesB;
  });
}
