/**
 * Core data types for the Tide Information Viewer
 */

export interface TideEvent {
  /** Time in 24-hour format (HH:MM) */
  time: string;
  /** Water height in meters */
  height: number;
  /** Tide type derived from height threshold (≥4.0m = high, <4.0m = low) */
  type: 'high' | 'low';
}

export interface DayTides {
  /** ISO date format (YYYY-MM-DD) */
  date: string;
  /** French day abbreviation (LUN, MAR, MER, JEU, VEN, SAM, DIM) */
  dayName: string;
  /** Day of month (1-31) */
  dayNumber: number;
  /** Morning tide coefficient (20-120 scale) */
  coefficient: number;
  /** Optional evening coefficient when different from morning */
  eveningCoefficient?: number;
  /** Array of 2-4 tide events for the day */
  events: TideEvent[];
}

export interface MonthTides {
  /** Year (YYYY) */
  year: number;
  /** Month (1-12) */
  month: number;
  /** Location name */
  location: string;
  /** Array of daily tide data */
  days: DayTides[];
}

export interface TideDisplayOptions {
  /** Time format preference */
  timeFormat: '12h' | '24h';
  /** Height unit preference */
  heightUnit: 'm' | 'ft';
  /** Show tide type indicators */
  showTideType: boolean;
}

/**
 * Utility function to determine tide type from height
 */
export function getTideType(height: number): 'high' | 'low' {
  return height >= 4.0 ? 'high' : 'low';
}

/**
 * Utility function to validate time format
 */
export function isValidTimeFormat(time: string): boolean {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
}

/**
 * Utility function to validate coefficient range
 */
export function isValidCoefficient(coefficient: number): boolean {
  return coefficient >= 20 && coefficient <= 120;
}
