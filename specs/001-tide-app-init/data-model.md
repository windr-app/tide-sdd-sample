# Data Model: Tide Information Viewer

## Core Entities

### TideEvent
Represents a single tidal occurrence with timing and water level information.

**Fields:**
- `time: string` - Time in 24-hour format (HH:MM)
- `height: number` - Water height in meters
- `type: 'high' | 'low'` - Derived from height threshold (≥4.0m = high, <4.0m = low)

**Validation Rules:**
- Time must match HH:MM format (00:00 - 23:59)
- Height must be positive number
- Type automatically derived from height using 4.0m threshold

**Example:**
```typescript
{
  time: "12:27",
  height: 4.53,
  type: "high"
}
```

### DayTides
Represents all tide events for a single day with associated metadata.

**Fields:**
- `date: string` - ISO date format (YYYY-MM-DD)
- `dayName: string` - French day abbreviation (LUN, MAR, MER, JEU, VEN, SAM, DIM)
- `dayNumber: number` - Day of month (1-31)
- `coefficient: number` - Morning tide coefficient (20-120 scale)
- `eveningCoefficient?: number` - Optional evening coefficient when different from morning
- `events: TideEvent[]` - Array of 2-4 tide events for the day

**Validation Rules:**
- Date must be valid ISO date
- Day number must match date's day of month
- Coefficient must be between 20-120
- Events array must contain 2-4 TideEvent objects
- Events must be chronologically ordered by time

**Example:**
```typescript
{
  date: "2025-09-02",
  dayName: "MAR",
  dayNumber: 2,
  coefficient: 24,
  eveningCoefficient: 24,
  events: [
    { time: "06:21", height: 3.18, type: "low" },
    { time: "01:19", height: 4.39, type: "high" },
    { time: "19:11", height: 3.06, type: "low" },
    { time: "13:52", height: 4.69, type: "high" }
  ]
}
```

### MonthTides
Represents tide data for an entire month.

**Fields:**
- `month: number` - Month number (1-12)
- `year: number` - Four-digit year
- `location: string` - Location name (e.g., "La Rochelle")
- `days: DayTides[]` - Array of daily tide data

**Validation Rules:**
- Month must be 1-12
- Year must be valid four-digit year
- Location must be non-empty string
- Days array must contain 28-31 DayTides objects
- Days must be in chronological order

**Example:**
```typescript
{
  month: 9,
  year: 2025,
  location: "La Rochelle",
  days: [
    // ... array of DayTides objects
  ]
}
```

## Relationships

```
MonthTides (1) → (28-31) DayTides → (2-4) TideEvent
```

- One MonthTides contains multiple DayTides
- Each DayTides contains multiple TideEvent objects
- TideEvent is a value object (no independent existence)

## State Transitions

### TideEvent
- **Created**: When parsed from source data
- **Type Derived**: Based on height threshold (immutable after creation)

### DayTides
- **Created**: When daily data is processed
- **Events Sorted**: Events automatically sorted by time after creation

### MonthTides
- **Loaded**: When application initializes
- **Filtered**: When user selects specific date range (derived state)

## Data Sources

### Static Mock Data
Primary data source extracted from La Rochelle tourism website.

**Source Format:**
```
| DAY DATE | COEF | TIME HEIGHT | TIME HEIGHT | COEF | TIME HEIGHT | TIME HEIGHT |
```

**Transformation Rules:**
1. Parse day name and date number from first column
2. Extract coefficients from appropriate columns
3. Parse time/height pairs from remaining columns
4. Sort events chronologically
5. Classify high/low based on height threshold

### Data File Structure
```typescript
// src/data/tides-2025-09.ts
export const septemberTides: MonthTides = {
  month: 9,
  year: 2025,
  location: "La Rochelle",
  days: [
    // ... processed tide data
  ]
};
```

## Type Definitions

```typescript
// src/types/tide.ts
export type TideType = 'high' | 'low';

export interface TideEvent {
  time: string;
  height: number;
  type: TideType;
}

export interface DayTides {
  date: string;
  dayName: string;
  dayNumber: number;
  coefficient: number;
  eveningCoefficient?: number;
  events: TideEvent[];
}

export interface MonthTides {
  month: number;
  year: number;
  location: string;
  days: DayTides[];
}

// Utility types
export interface TideFilters {
  startDate?: string;
  endDate?: string;
  tideType?: TideType;
  minCoefficient?: number;
  maxCoefficient?: number;
}

export interface TideDisplayOptions {
  showCoefficients: boolean;
  timeFormat: '12h' | '24h';
  heightUnit: 'm' | 'ft';
}
```

## Data Access Patterns

### Read Operations
- `getTidesForMonth(month: number, year: number): MonthTides`
- `getTidesForDateRange(start: string, end: string): DayTides[]`
- `getTidesByType(type: TideType): TideEvent[]`
- `getHighestTide(month: number): TideEvent`
- `getLowestTide(month: number): TideEvent`

### Filter Operations
- `filterByCoefficient(min: number, max: number): DayTides[]`
- `filterByTideType(type: TideType): TideEvent[]`
- `sortByHeight(ascending: boolean): TideEvent[]`

### Utility Operations
- `formatTideTime(time: string, format: '12h' | '24h'): string`
- `calculateTideStrength(coefficient: number): 'weak' | 'moderate' | 'strong'`
- `isHighTide(height: number): boolean`

## Performance Considerations

### Data Size
- September 2025: ~30 days × 3 events avg = ~90 TideEvent objects
- Total size: <10KB for full month data
- Negligible memory impact

### Access Patterns
- Primarily read-only operations
- Frequent filtering by date range
- Occasional sorting by height/time
- Static data enables aggressive caching

### Optimization Strategies
- Pre-sort events by time during data loading
- Cache filtered results for common queries
- Use immutable data structures to enable shallow comparison
- Lazy load additional months if needed in future
