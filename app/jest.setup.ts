import '@testing-library/jest-dom'

// Make sure jest-dom matchers are available globally
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveClass(...classNames: string[]): R;
    }
  }
}
