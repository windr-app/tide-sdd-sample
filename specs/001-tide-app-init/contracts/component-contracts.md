# Component Contracts: Tide Information Viewer

Since this is a frontend-only application with static data, we define component contracts instead of API endpoints.

## Component Interface Contracts

### TideViewer (Main Container)
**Purpose**: Root component that orchestrates tide data display

**Props Interface:**
```typescript
interface TideViewerProps {
  month: number;
  year: number;
  className?: string;
}
```

**Expected Behavior:**
- Load tide data for specified month/year
- Display loading state while data loads
- Handle error states gracefully
- Render TideCalendar component with loaded data

**Contract Tests:**
- ✅ MUST render loading state initially
- ✅ MUST display error message for invalid month/year
- ✅ MUST pass correct data to TideCalendar component
- ✅ MUST handle empty data gracefully

### TideCalendar (Data Display)
**Purpose**: Displays monthly tide data in calendar format

**Props Interface:**
```typescript
interface TideCalendarProps {
  monthData: MonthTides;
  displayOptions?: TideDisplayOptions;
  onDaySelect?: (day: DayTides) => void;
  className?: string;
}
```

**Expected Behavior:**
- Render each day as a TideDayCard
- Apply responsive layout (grid on desktop, stack on mobile)
- Handle day selection interactions
- Display month/location header information

**Contract Tests:**
- ✅ MUST render correct number of day cards
- ✅ MUST display month and location in header
- ✅ MUST call onDaySelect when day is clicked
- ✅ MUST apply responsive classes correctly

### TideDayCard (Individual Day)
**Purpose**: Displays tide information for a single day

**Props Interface:**
```typescript
interface TideDayCardProps {
  dayData: DayTides;
  displayOptions?: TideDisplayOptions;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
}
```

**Expected Behavior:**
- Display day name, number, and coefficients
- Render all tide events using TideEvent components
- Apply selection styling when isSelected=true
- Handle click events for day selection

**Contract Tests:**
- ✅ MUST display day name and number
- ✅ MUST show coefficient(s) prominently
- ✅ MUST render all tide events
- ✅ MUST apply selection styling when selected
- ✅ MUST call onClick when clicked

### TideEventDisplay (Individual Tide)
**Purpose**: Displays single tide event with time, height, and type

**Props Interface:**
```typescript
interface TideEventDisplayProps {
  event: TideEvent;
  displayOptions?: TideDisplayOptions;
  showType?: boolean;
  className?: string;
}
```

**Expected Behavior:**
- Display time in specified format (12h/24h)
- Show height with appropriate units
- Apply color coding for tide type (high=blue, low=orange)
- Include tide type indicator if showType=true

**Contract Tests:**
- ✅ MUST display time in correct format
- ✅ MUST show height with units
- ✅ MUST apply correct color for tide type
- ✅ MUST show type indicator when showType=true

### TideFilters (Filter Controls)
**Purpose**: Provides UI controls for filtering tide data

**Props Interface:**
```typescript
interface TideFiltersProps {
  filters: TideFilters;
  onFiltersChange: (filters: TideFilters) => void;
  className?: string;
}
```

**Expected Behavior:**
- Render date range picker
- Provide tide type filter (high/low/all)
- Include coefficient range slider
- Apply filters when values change

**Contract Tests:**
- ✅ MUST render all filter controls
- ✅ MUST call onFiltersChange when filters change
- ✅ MUST display current filter values
- ✅ MUST validate date ranges

## Data Service Contracts

### TideDataService
**Purpose**: Handles data loading and processing

**Interface:**
```typescript
interface TideDataService {
  loadMonthData(month: number, year: number): Promise<MonthTides>;
  filterTides(data: MonthTides, filters: TideFilters): DayTides[];
  searchTides(data: MonthTides, query: string): TideEvent[];
}
```

**Expected Behavior:**
- Load static tide data from appropriate file
- Apply filters to loaded data
- Return filtered results efficiently
- Handle invalid parameters gracefully

**Contract Tests:**
- ✅ MUST return valid MonthTides for valid inputs
- ✅ MUST throw error for invalid month/year
- ✅ MUST apply filters correctly
- ✅ MUST return empty array for no matches

## Hook Contracts

### useTideData
**Purpose**: Custom hook for managing tide data state

**Interface:**
```typescript
interface UseTideDataReturn {
  data: MonthTides | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

function useTideData(month: number, year: number): UseTideDataReturn;
```

**Expected Behavior:**
- Load data automatically when month/year changes
- Provide loading and error states
- Cache loaded data to prevent unnecessary reloads
- Expose refetch function for manual refresh

**Contract Tests:**
- ✅ MUST start with loading=true
- ✅ MUST load data when parameters change
- ✅ MUST set error state on load failure
- ✅ MUST cache data between renders

### useTideFilters
**Purpose**: Custom hook for managing filter state

**Interface:**
```typescript
interface UseTideFiltersReturn {
  filters: TideFilters;
  setFilters: (filters: TideFilters) => void;
  resetFilters: () => void;
  filteredData: DayTides[];
}

function useTideFilters(data: MonthTides | null): UseTideFiltersReturn;
```

**Expected Behavior:**
- Initialize with default filter values
- Apply filters to provided data automatically
- Provide reset functionality
- Memoize filtered results for performance

**Contract Tests:**
- ✅ MUST initialize with default filters
- ✅ MUST apply filters when data or filters change
- ✅ MUST reset to defaults when resetFilters called
- ✅ MUST memoize filtered results

## Type Validation Contracts

### Runtime Type Checking
For data loaded from static files, implement runtime validation:

```typescript
// Contract: validateTideEvent
function validateTideEvent(event: unknown): event is TideEvent {
  // Must validate time format, height range, type values
}

// Contract: validateDayTides  
function validateDayTides(day: unknown): day is DayTides {
  // Must validate date, coefficients, events array
}

// Contract: validateMonthTides
function validateMonthTides(month: unknown): month is MonthTides {
  // Must validate month/year, location, days array
}
```

**Contract Tests:**
- ✅ MUST reject invalid time formats
- ✅ MUST reject negative heights
- ✅ MUST reject invalid coefficient ranges
- ✅ MUST reject malformed date strings

## Error Handling Contracts

### Error Boundary Contract
```typescript
interface ErrorBoundaryProps {
  fallback: ComponentType<{ error: Error }>;
  children: ReactNode;
}
```

**Expected Behavior:**
- Catch JavaScript errors in child components
- Display fallback UI instead of crashing
- Log errors for debugging purposes
- Provide retry mechanism when possible

**Contract Tests:**
- ✅ MUST catch errors in child components
- ✅ MUST render fallback UI on error
- ✅ MUST log errors with context
- ✅ MUST reset error state on retry

## Accessibility Contracts

### Keyboard Navigation
**Requirements:**
- All interactive elements must be keyboard accessible
- Focus indicators must be visible
- Logical tab order must be maintained
- Screen reader content must be descriptive

### ARIA Labels
**Requirements:**
- Tide type indicators must have aria-label
- Coefficient values must have descriptive text
- Navigation elements must have appropriate roles
- Live regions for dynamic content updates

**Contract Tests:**
- ✅ MUST be navigable with keyboard only
- ✅ MUST have visible focus indicators
- ✅ MUST provide screen reader descriptions
- ✅ MUST announce dynamic content changes
