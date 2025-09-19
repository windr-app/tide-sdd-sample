# E2E Testing Setup Guide

This document provides instructions for setting up and running Playwright end-to-end tests for the Tide Information Viewer application.

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## Installation

1. **Install dependencies** (if not already done):
   ```bash
   cd app
   npm install
   ```

2. **Install Playwright browsers**:
   ```bash
   npx playwright install
   ```

   Or install specific browsers:
   ```bash
   npx playwright install chromium firefox webkit
   ```

## Running Tests

### Run all E2E tests
```bash
npm run test:e2e
```

### Run specific test files
```bash
npx playwright test home-page-validation.spec.ts
npx playwright test day-navigation.spec.ts
npx playwright test control-interactions.spec.ts
```

### Run tests in headed mode (with browser UI)
```bash
npx playwright test --headed
```

### Run tests in specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run tests with debugging
```bash
npx playwright test --debug
```

## Test Structure

The E2E tests are organized into three main categories:

### 1. Home Page Validation (`home-page-validation.spec.ts`)
- Validates page loading and title
- Checks presence of essential UI elements
- Verifies initial display state
- Tests accessibility attributes
- Ensures complete month data is loaded

### 2. Day Navigation (`day-navigation.spec.ts`)
- Tests day card selection and navigation
- Verifies state preservation between day changes
- Tests keyboard navigation
- Validates different tide data display per day
- Checks coefficient range navigation

### 3. Control Interactions (`control-interactions.spec.ts`)
- Tests time format toggle (24h ↔ 12h)
- Tests height unit toggle (meters ↔ feet)
- Tests tide type visibility toggle
- Validates responsive design across viewports
- Tests loading and error states

## Test Configuration

The tests are configured in `playwright.config.ts` with:

- **Base URL**: `http://localhost:3000`
- **Browsers**: Chromium, Firefox, Safari (WebKit)
- **Mobile testing**: Included for responsive design
- **Automatic server startup**: Development server starts automatically
- **Trace collection**: Enabled for debugging failed tests

## Development Server

The tests automatically start the development server (`npm run dev`) before running. If you want to run the server manually:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Viewing Test Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```

## Debugging Failed Tests

1. **View traces** for failed tests:
   ```bash
   npx playwright show-trace test-results/[test-name]/trace.zip
   ```

2. **Run in debug mode**:
   ```bash
   npx playwright test --debug [test-file]
   ```

3. **Take screenshots** on failure (automatically configured)

4. **Use console logs** - all console output is captured in test results

## Test Data

The tests use the existing mock tide data for September 2025 La Rochelle, which includes:

- 30 days of tide data
- Multiple daily tide events (2-4 per day)
- Coefficient variations (20-120 range)
- Different day names and dates
- High/low tide classifications

## Continuous Integration

For CI/CD environments:

```bash
# Run tests in CI mode (no parallelization, with retries)
npx playwright test --reporter=github
```

Environment variables for CI:
- `CI=true` - Enables CI-specific configuration
- Retries are automatically enabled in CI

## Troubleshooting

### Browser Installation Issues
If browsers fail to install, try:
```bash
npx playwright install --force
```

### Port Conflicts
If port 3000 is occupied:
```bash
# The config will automatically use the next available port
# Or set a specific port in playwright.config.ts
```

### Slow Tests
For faster test execution in development:
```bash
# Run only in Chromium
npx playwright test --project=chromium

# Run specific test suites
npx playwright test home-page-validation
```

### Memory Issues
For systems with limited memory:
```bash
# Reduce parallel workers
npx playwright test --workers=1
```

## Test Coverage

Current test coverage includes:

✅ **Home page loading and validation**
✅ **Essential UI element presence**
✅ **Day navigation and selection**
✅ **State preservation across interactions**
✅ **Control button functionality**
✅ **Responsive design (mobile, tablet, desktop)**
✅ **Keyboard accessibility**
✅ **Loading states**
✅ **Data format changes**
✅ **Coefficient range validation**

## Contributing

When adding new tests:

1. Follow the existing test structure and naming conventions
2. Use meaningful test descriptions
3. Include proper assertions for both positive and negative cases
4. Test responsive behavior when adding UI elements
5. Ensure tests are isolated and don't depend on each other
6. Add appropriate `beforeEach` setup for common operations

## Performance Considerations

- Tests automatically wait for elements to be visible
- Network requests are not mocked by default (tests use real data)
- Screenshots and traces are only collected on failures
- Parallel execution is enabled for faster test runs