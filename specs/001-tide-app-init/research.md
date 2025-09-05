# Research Phase: Tide Information Viewer

## Overview
This document consolidates research findings for implementing a NextJS tide information viewer using data from La Rochelle tourism website.

## Data Structure Analysis

### Source Data Format (La Rochelle Tourism Website)
From https://www.larochelle-tourisme.com/horaires-des-marees?d=09, the tide data follows this structure:

**Table Format:**
```
| DAY DATE | COEF | TIME HEIGHT | TIME HEIGHT | COEF | TIME HEIGHT | TIME HEIGHT |
| LUN. 01  | 27   | 05:05 2.99m | 12:27 4.53m | 17:42 3.03m |   |
| MAR. 02  | 24   | 06:21 3.18m | 01:19 4.39m | 24 | 19:11 3.06m | 13:52 4.69m |
```

**Pattern Identification:**
- Each day can have 2-4 tide events
- Coefficients appear at start and middle of each row
- Times in 24h format (HH:MM)
- Heights in meters with 'm' suffix
- High tides typically >4m, low tides typically <3m
- Empty cells when fewer than 4 events per day

## Technical Research

### Decision: NextJS 15 with App Router
**Rationale**: 
- Latest version with cutting-edge performance improvements
- Enhanced App Router with better caching and streaming
- Improved React 19 compatibility and features
- Built-in TypeScript support with better type inference
- Excellent development experience with faster hot reloading

**Alternatives considered**: 
- NextJS 14 (stable but missing latest features)
- NextJS 13 (older, less performant)
- Create React App (deprecated, no SSR)
- Vite (good but no SSR out of box)

### Decision: ShadCN UI Component Library
**Rationale**:
- Modern, accessible components
- Tailwind CSS integration
- Radix UI primitives (solid foundation)
- Copy-paste approach (no runtime dependency)
- Excellent TypeScript support

**Alternatives considered**:
- Material UI (heavier, different design language)
- Chakra UI (less modern styling)
- Ant Design (business-focused, not suitable for public app)

### Decision: Static Mock Data Approach
**Rationale**:
- No external API dependencies
- Faster development and testing
- Predictable data for demonstration
- Easier to deploy and maintain

**Alternatives considered**:
- Live API integration (complex, external dependency)
- Web scraping (unreliable, legal concerns)
- Third-party tide APIs (costs, rate limits)

### Decision: TypeScript for Type Safety
**Rationale**:
- Better developer experience
- Compile-time error catching
- Excellent IDE support
- Industry standard for React projects

**Alternatives considered**:
- Plain JavaScript (less safe, harder to maintain)
- Flow (less ecosystem support)

## Data Modeling Research

### Tide Event Structure
```typescript
interface TideEvent {
  time: string;        // "HH:MM" format
  height: number;      // meters
  type: 'high' | 'low'; // derived from height
}

interface DayTides {
  date: string;        // "YYYY-MM-DD" format
  dayName: string;     // "LUN", "MAR", etc.
  dayNumber: number;   // 1-31
  coefficient: number; // morning coefficient
  eveningCoefficient?: number; // optional evening coefficient
  events: TideEvent[]; // 2-4 events per day
}
```

### Height Analysis for High/Low Classification
From sample data analysis:
- **Low tides**: typically 0.6m - 3.2m
- **High tides**: typically 4.5m - 6.6m
- **Threshold**: 4.0m (tides ≥4.0m = high, <4.0m = low)

## UI/UX Research

### Decision: Card-based Layout
**Rationale**:
- Clear visual separation per day
- Mobile-friendly responsive design
- Easy to scan tide information
- Follows modern web design patterns

### Decision: Color-coded Tide Types
**Rationale**:
- Blue for high tides (water association)
- Orange/amber for low tides (sand/shore association)
- Improves accessibility and quick recognition

### Decision: Responsive Table/Card Hybrid
**Rationale**:
- Desktop: table format for easy comparison
- Mobile: card format for better usability
- Follows responsive design best practices

## Testing Strategy Research

### Decision: Jest + React Testing Library
**Rationale**:
- Industry standard for React testing
- Excellent component testing capabilities
- Good integration with NextJS
- Focuses on user behavior testing

### Decision: Playwright for E2E Testing
**Rationale**:
- Modern, fast E2E testing framework
- Cross-browser testing support
- Better than Selenium for modern apps
- Good TypeScript support

**Alternatives considered**:
- Cypress (good but heavier, different architecture)
- Selenium (older, slower, more complex)

## Performance Research

### Decision: Static Generation (SSG)
**Rationale**:
- Tide data is static/predictable
- Fastest possible load times
- Better SEO if needed
- Reduced server costs

### Decision: Image Optimization
**Rationale**:
- NextJS built-in image optimization
- WebP format support
- Automatic responsive images
- Improved Core Web Vitals

## Accessibility Research

### Decision: WCAG 2.1 AA Compliance
**Rationale**:
- Legal requirement in many jurisdictions
- Better user experience for all users
- ShadCN components are accessible by default

**Key considerations**:
- Semantic HTML structure
- Proper color contrast ratios
- Keyboard navigation support
- Screen reader compatibility
- Focus management

## Deployment Research

### Decision: Vercel Deployment
**Rationale**:
- Created by NextJS team
- Excellent NextJS integration
- Free tier available
- Automatic deployments from Git

**Alternatives considered**:
- Netlify (good but less NextJS-optimized)
- AWS (complex setup for simple app)
- Self-hosted (more maintenance overhead)

## Resolution Summary

All technical unknowns have been resolved through research:
- ✅ Data structure understood and modeled
- ✅ Technology stack selected and justified
- ✅ UI/UX approach defined
- ✅ Testing strategy established
- ✅ Performance optimization planned
- ✅ Accessibility requirements identified
- ✅ Deployment strategy chosen

**Next Phase**: Design & Contracts (data models, component contracts, test scenarios)
