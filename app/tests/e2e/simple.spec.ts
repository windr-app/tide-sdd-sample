import { test, expect } from '@playwright/test';

test('simple tide test', async ({ page }) => {
  await page.goto('/');
  
  // Just check if the main heading is visible
  await expect(page.getByText('Marées de Septembre 2025')).toBeVisible();
});
