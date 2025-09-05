import { test, expect } from '@playwright/test';

test('check text content', async ({ page }) => {
  await page.goto('/');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Take a screenshot to see what's on the page
  await page.screenshot({ path: 'debug-screenshot.png' });
  
  // Try to find any text on the page
  const bodyText = await page.textContent('body');
  console.log('Page content:', bodyText?.substring(0, 200));
  
  // Check for the location text which should be simpler
  await expect(page.getByText('La Rochelle, France')).toBeVisible();
});
