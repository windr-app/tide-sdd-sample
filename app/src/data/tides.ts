/**
 * Mock tide data for La Rochelle, extracted from tourism website
 * Source: https://www.larochelle-tourisme.com/horaires-des-marees?d=09
 */

import { MonthTides, DayTides, TideEvent, getTideType } from '@/types/tide';

/**
 * Helper function to create a TideEvent with automatic type classification
 */
function createTideEvent(time: string, height: number): TideEvent {
  return {
    time,
    height,
    type: getTideType(height)
  };
}

/**
 * September 2025 tide data for La Rochelle
 */
export const septemberTides: MonthTides = {
  year: 2025,
  month: 9,
  location: "La Rochelle, France",
  days: [
    {
      date: "2025-09-01",
      dayName: "LUN",
      dayNumber: 1,
      coefficient: 27,
      events: [
        createTideEvent("05:05", 2.99),
        createTideEvent("12:27", 4.53),
        createTideEvent("17:42", 3.03)
      ]
    },
    {
      date: "2025-09-02",
      dayName: "MAR",
      dayNumber: 2,
      coefficient: 24,
      eveningCoefficient: 24,
      events: [
        createTideEvent("06:21", 3.18),
        createTideEvent("01:19", 4.39),
        createTideEvent("19:11", 3.06),
        createTideEvent("13:52", 4.69)
      ]
    },
    {
      date: "2025-09-03",
      dayName: "MER",
      dayNumber: 3,
      coefficient: 25,
      events: [
        createTideEvent("07:38", 3.35),
        createTideEvent("02:35", 4.41),
        createTideEvent("20:18", 3.12),
        createTideEvent("15:02", 4.78)
      ]
    },
    {
      date: "2025-09-04",
      dayName: "JEU",
      dayNumber: 4,
      coefficient: 29,
      events: [
        createTideEvent("08:47", 3.48),
        createTideEvent("03:42", 4.52),
        createTideEvent("21:15", 3.22),
        createTideEvent("16:05", 4.91)
      ]
    },
    {
      date: "2025-09-05",
      dayName: "VEN",
      dayNumber: 5,
      coefficient: 35,
      events: [
        createTideEvent("09:48", 3.58),
        createTideEvent("04:39", 4.67),
        createTideEvent("22:05", 3.35),
        createTideEvent("17:02", 5.07)
      ]
    },
    {
      date: "2025-09-06",
      dayName: "SAM",
      dayNumber: 6,
      coefficient: 42,
      events: [
        createTideEvent("10:42", 3.65),
        createTideEvent("05:31", 4.85),
        createTideEvent("22:51", 3.51),
        createTideEvent("17:54", 5.24)
      ]
    },
    {
      date: "2025-09-07",
      dayName: "DIM",
      dayNumber: 7,
      coefficient: 49,
      events: [
        createTideEvent("11:32", 3.69),
        createTideEvent("06:18", 5.05),
        createTideEvent("23:34", 3.68),
        createTideEvent("18:42", 5.42)
      ]
    },
    {
      date: "2025-09-08",
      dayName: "LUN",
      dayNumber: 8,
      coefficient: 56,
      events: [
        createTideEvent("00:15", 3.86),
        createTideEvent("07:02", 5.26),
        createTideEvent("12:19", 3.71),
        createTideEvent("19:28", 5.61)
      ]
    },
    {
      date: "2025-09-09",
      dayName: "MAR",
      dayNumber: 9,
      coefficient: 63,
      events: [
        createTideEvent("00:54", 4.04),
        createTideEvent("07:44", 5.47),
        createTideEvent("13:04", 3.71),
        createTideEvent("20:12", 5.79)
      ]
    },
    {
      date: "2025-09-10",
      dayName: "MER",
      dayNumber: 10,
      coefficient: 69,
      events: [
        createTideEvent("01:32", 4.22),
        createTideEvent("08:25", 5.68),
        createTideEvent("13:47", 3.70),
        createTideEvent("20:54", 5.96)
      ]
    }
  ]
};

/**
 * Get tide data for a specific month/year
 * Currently only supports September 2025
 */
export function getTideData(month: number, year: number): MonthTides | null {
  if (month === 9 && year === 2025) {
    return septemberTides;
  }
  return null;
}

/**
 * Get tide data for a specific day
 */
export function getDayTides(date: string): DayTides | null {
  const day = septemberTides.days.find(d => d.date === date);
  return day || null;
}
