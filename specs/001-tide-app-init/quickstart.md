# Quickstart Guide: Tide Information Viewer

## Overview
This guide provides step-by-step instructions to set up, develop, and test the Tide Information Viewer application.

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git for version control
- VS Code or similar IDE (recommended)

## Project Setup

### 1. Initialize NextJS Project
```bash
# Create new NextJS project with TypeScript (Next.js 15)
npx create-next-app@latest tide-viewer --typescript --tailwind --eslint --app --src-dir

# Navigate to project directory
cd tide-viewer

# Install additional dependencies
npm install lucide-react class-variance-authority clsx tailwind-merge
```

### 2. Initialize ShadCN UI
```bash
# Initialize ShadCN configuration
npx shadcn-ui@latest init

# Install required UI components
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add table
npx shadcn-ui@latest add select
npx shadcn-ui@latest add slider
```

### 3. Project Structure Setup
```bash
# Create required directories
mkdir -p src/components/tide
mkdir -p src/lib/tide
mkdir -p src/data
mkdir -p src/types
mkdir -p tests/{components,integration,e2e}

# Create core files
touch src/types/tide.ts
touch src/data/tides-2025-09.ts
touch src/lib/tide/data-service.ts
touch src/components/tide/TideViewer.tsx
```

## Development Workflow

### 1. Define Types (TDD Phase: RED)
Create type definitions in `src/types/tide.ts`:

```typescript
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
```

### 2. Write Failing Tests First (RED Phase)
```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom

# Create test configuration
echo '{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}' > tsconfig.json
```

Create `tests/components/TideViewer.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react';
import { TideViewer } from '@/components/tide/TideViewer';

describe('TideViewer', () => {
  it('should display loading state initially', () => {
    render(<TideViewer month={9} year={2025} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should display tide data when loaded', async () => {
    render(<TideViewer month={9} year={2025} />);
    
    // Wait for data to load
    await screen.findByText(/La Rochelle/i);
    
    // Check for September data
    expect(screen.getByText(/September 2025/i)).toBeInTheDocument();
  });
});
```

### 3. Run Tests (Confirm RED)
```bash
# Run tests - should fail initially
npm test

# Expected output: Tests fail because components don't exist yet
```

### 4. Create Mock Data (GREEN Phase Start)
Create sample data in `src/data/tides-2025-09.ts`:

```typescript
import { MonthTides } from '@/types/tide';

export const septemberTides: MonthTides = {
  month: 9,
  year: 2025,
  location: "La Rochelle",
  days: [
    {
      date: "2025-09-01",
      dayName: "LUN",
      dayNumber: 1,
      coefficient: 27,
      events: [
        { time: "05:05", height: 2.99, type: "low" },
        { time: "12:27", height: 4.53, type: "high" },
        { time: "17:42", height: 3.03, type: "low" }
      ]
    },
    // Add more days as needed...
  ]
};
```

### 5. Implement Components (GREEN Phase)
Create `src/components/tide/TideViewer.tsx`:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { MonthTides } from '@/types/tide';
import { TideCalendar } from './TideCalendar';
import { loadTideData } from '@/lib/tide/data-service';

interface TideViewerProps {
  month: number;
  year: number;
  className?: string;
}

export function TideViewer({ month, year, className }: TideViewerProps) {
  const [data, setData] = useState<MonthTides | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTideData(month, year)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [month, year]);

  if (loading) return <div>Loading tide data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <div className={className}>
      <h1>Tide Information - {data.location}</h1>
      <TideCalendar monthData={data} />
    </div>
  );
}
```

### 6. Verify Tests Pass (GREEN Phase)
```bash
# Run tests - should pass now
npm test

# Expected output: All tests pass
```

### 7. Refactor (REFACTOR Phase)
- Extract custom hooks (`useTideData`)
- Optimize component rendering
- Add proper error boundaries
- Improve type safety

## Integration Testing

### 1. Component Integration Tests
Create `tests/integration/tide-flow.test.tsx`:

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { TideViewer } from '@/components/tide/TideViewer';

describe('Tide Application Integration', () => {
  it('should display complete tide information flow', async () => {
    render(<TideViewer month={9} year={2025} />);
    
    // Wait for data to load
    await screen.findByText(/La Rochelle/i);
    
    // Verify day cards are displayed
    expect(screen.getByText(/LUN\. 01/i)).toBeInTheDocument();
    
    // Verify tide events are shown
    expect(screen.getByText(/05:05/i)).toBeInTheDocument();
    expect(screen.getByText(/2\.99m/i)).toBeInTheDocument();
    
    // Verify coefficients are displayed
    expect(screen.getByText(/27/i)).toBeInTheDocument();
  });
});
```

### 2. Data Service Integration Tests
Create `tests/integration/data-service.test.ts`:

```typescript
import { loadTideData } from '@/lib/tide/data-service';

describe('Tide Data Service Integration', () => {
  it('should load September 2025 data successfully', async () => {
    const data = await loadTideData(9, 2025);
    
    expect(data.month).toBe(9);
    expect(data.year).toBe(2025);
    expect(data.location).toBe('La Rochelle');
    expect(data.days).toHaveLength(30); // September has 30 days
  });

  it('should validate tide event data structure', async () => {
    const data = await loadTideData(9, 2025);
    const firstDay = data.days[0];
    
    expect(firstDay.events).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          time: expect.stringMatching(/\d{2}:\d{2}/),
          height: expect.any(Number),
          type: expect.stringMatching(/high|low/)
        })
      ])
    );
  });
});
```

## End-to-End Testing

### 1. Install Playwright
```bash
# Install Playwright
npm install --save-dev @playwright/test

# Initialize Playwright configuration
npx playwright install
```

### 2. Create E2E Tests
Create `tests/e2e/tide-app.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Tide Information Viewer E2E', () => {
  test('should display tide information for La Rochelle', async ({ page }) => {
    await page.goto('/');
    
    // Wait for application to load
    await expect(page.locator('h1')).toContainText('La Rochelle');
    
    // Check for tide data
    await expect(page.locator('[data-testid="tide-day-card"]')).toHaveCount(30);
    
    // Verify first day data
    const firstDay = page.locator('[data-testid="tide-day-card"]').first();
    await expect(firstDay).toContainText('LUN. 01');
    await expect(firstDay).toContainText('27'); // coefficient
  });

  test('should handle responsive design', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/');
    
    // Check grid layout
    const calendar = page.locator('[data-testid="tide-calendar"]');
    await expect(calendar).toHaveClass(/grid/);
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Verify mobile layout adapts
    await expect(calendar).toHaveClass(/flex-col|stack/);
  });
});
```

## Running the Application

### 1. Development Server
```bash
# Start development server
npm run dev

# Application available at http://localhost:3000
```

### 2. Testing Commands
```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Run all tests
npm run test:all
```

### 3. Build and Deploy
```bash
# Build for production
npm run build

# Start production server
npm start

# Deploy to Vercel (if configured)
vercel deploy
```

## Validation Checklist

### Functional Requirements Validation
- [ ] ✅ Display tide times in 24h format
- [ ] ✅ Clearly indicate high/low tide types
- [ ] ✅ Show tide coefficients
- [ ] ✅ Display dates for each tide event
- [ ] ✅ Present data in chronological order
- [ ] ✅ Focus on La Rochelle location
- [ ] ✅ Use static mock data (no external APIs)

### Technical Requirements Validation
- [ ] ✅ NextJS 15+ with TypeScript
- [ ] ✅ ShadCN UI components
- [ ] ✅ Responsive design
- [ ] ✅ Test-driven development
- [ ] ✅ Accessibility compliance
- [ ] ✅ Performance optimization

### User Experience Validation
- [ ] ✅ Fast initial load (<3s)
- [ ] ✅ Intuitive navigation
- [ ] ✅ Clear visual hierarchy
- [ ] ✅ Mobile-friendly interface
- [ ] ✅ Error handling
- [ ] ✅ Loading states

## Troubleshooting

### Common Issues
1. **Tests failing**: Ensure test environment is properly configured
2. **ShadCN components not found**: Run `npx shadcn-ui@latest add [component]`
3. **TypeScript errors**: Check type definitions and imports
4. **Build failures**: Verify all dependencies are installed

### Getting Help
- Check NextJS documentation: https://nextjs.org/docs
- ShadCN UI components: https://ui.shadcn.com
- React Testing Library guides: https://testing-library.com/docs/react-testing-library/intro/

This quickstart guide provides a complete path from project initialization to deployment, following TDD principles and ensuring all requirements are met.
