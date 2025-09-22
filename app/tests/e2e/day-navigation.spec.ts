/**
 * E2E tests for day navigation functionality
 * Validates user interaction to navigate between days and confirms state preservation
 */

import { test, expect } from '@playwright/test';

test.describe('Day Navigation and State Preservation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // Wait for the page to load completely
    await expect(page.getByText('Marées de Septembre 2025')).toBeVisible();
    await expect(page.getByText('La Rochelle, France')).toBeVisible();
  });

  test('should navigate to next day view when clicking day cards', async ({ page }) => {
    // Click on the first day card (LUN 1)
    const firstDayCard = page.getByRole('button', { name: /LUN 1/ });
    await firstDayCard.click();
    
    // Verify the card is selected (has ring-2 styling)
    await expect(firstDayCard).toHaveClass(/ring-2/);
    
    // Click on the second day card (MAR 2)
    const secondDayCard = page.getByRole('button', { name: /MAR 2/ });
    await secondDayCard.click();
    
    // Verify the second card is now selected
    await expect(secondDayCard).toHaveClass(/ring-2/);
    
    // Verify the first card is no longer selected
    await expect(firstDayCard).not.toHaveClass(/ring-2/);
    
    // Click on a third day (MER 3) to verify navigation continues to work
    const thirdDayCard = page.getByRole('button', { name: /MER 3/ });
    await thirdDayCard.click();
    await expect(thirdDayCard).toHaveClass(/ring-2/);
    
    // Verify previous cards are deselected
    await expect(firstDayCard).not.toHaveClass(/ring-2/);
    await expect(secondDayCard).not.toHaveClass(/ring-2/);
  });

  test('should show different tide data when navigating between days', async ({ page }) => {
    // Get initial tide data for day 1
    const firstDayCard = page.getByRole('button', { name: /LUN 1/ });
    await firstDayCard.click();
    
    // Wait for selection to be applied
    await expect(firstDayCard).toHaveClass(/ring-2/);
    
    // Get tide times for the first day
    const firstDayTimes = await page.locator('text=/^\\d{2}:\\d{2}$/').allTextContents();
    
    // Navigate to a different day (MAR 2)
    const secondDayCard = page.getByRole('button', { name: /MAR 2/ });
    await secondDayCard.click();
    
    // Wait for selection to be applied
    await expect(secondDayCard).toHaveClass(/ring-2/);
    
    // Get tide times for the second day
    const secondDayTimes = await page.locator('text=/^\\d{2}:\\d{2}$/').allTextContents();
    
    // Verify that the tide data is different between days
    expect(firstDayTimes).not.toEqual(secondDayTimes);
    
    // Navigate to another day (VEN 5) with different coefficient
    const fifthDayCard = page.getByRole('button', { name: /VEN 5/ });
    await fifthDayCard.click();
    await expect(fifthDayCard).toHaveClass(/ring-2/);
    
    // Verify different coefficient is shown
    const fifthDayCoefficient = await fifthDayCard.locator('[class*="badge"]').first().textContent();
    const firstDayCoefficient = await firstDayCard.locator('[class*="badge"]').first().textContent();
    expect(fifthDayCoefficient).not.toEqual(firstDayCoefficient);
  });

  test('should preserve control settings when navigating between days', async ({ page }) => {
    // Change time format to 12h
    await page.getByRole('button', { name: 'Format: 24h' }).click();
    await expect(page.getByRole('button', { name: 'Format: 12h' })).toBeVisible();
    
    // Change unit to feet
    await page.getByRole('button', { name: 'Unité: m' }).click();
    await expect(page.getByRole('button', { name: 'Unité: ft' })).toBeVisible();
    
    // Hide tide types
    await page.getByRole('button', { name: 'Masquer types' }).click();
    await expect(page.getByRole('button', { name: 'Afficher types' })).toBeVisible();
    
    // Select a day card
    const dayCard = page.getByRole('button', { name: /LUN 1/ });
    await dayCard.click();
    await expect(dayCard).toHaveClass(/ring-2/);
    
    // Verify all settings are maintained after day selection
    await expect(page.getByRole('button', { name: 'Format: 12h' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Unité: ft' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Afficher types' })).toBeVisible();
    
    // Navigate to another day
    const secondDayCard = page.getByRole('button', { name: /MAR 2/ });
    await secondDayCard.click();
    await expect(secondDayCard).toHaveClass(/ring-2/);
    
    // Verify settings are still preserved
    await expect(page.getByRole('button', { name: 'Format: 12h' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Unité: ft' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Afficher types' })).toBeVisible();
    
    // Verify data format changes are applied
    await expect(page.getByText(/\\d+:\\d{2} [AP]M/).first()).toBeVisible(); // 12h format
    await expect(page.getByText(/\\d+\\.\\dft/).first()).toBeVisible(); // Feet format
  });

  test('should handle keyboard navigation between days', async ({ page }) => {
    // Focus on the first day card using keyboard navigation
    await page.keyboard.press('Tab'); // Focus on format button
    await page.keyboard.press('Tab'); // Focus on unit button  
    await page.keyboard.press('Tab'); // Focus on type button
    await page.keyboard.press('Tab'); // Focus on first day card
    
    // Verify the first day card is focused
    const firstDayCard = page.getByRole('button', { name: /LUN 1/ });
    await expect(firstDayCard).toBeFocused();
    
    // Select with Enter key
    await page.keyboard.press('Enter');
    await expect(firstDayCard).toHaveClass(/ring-2/);
    
    // Navigate to next day with Tab and select with Enter
    await page.keyboard.press('Tab');
    const secondDayCard = page.getByRole('button', { name: /MAR 2/ });
    await expect(secondDayCard).toBeFocused();
    
    await page.keyboard.press('Enter');
    await expect(secondDayCard).toHaveClass(/ring-2/);
    await expect(firstDayCard).not.toHaveClass(/ring-2/);
  });

  test('should maintain selection state when toggling controls', async ({ page }) => {
    // Select a day first
    const selectedDay = page.getByRole('button', { name: /JEU 4/ });
    await selectedDay.click();
    await expect(selectedDay).toHaveClass(/ring-2/);
    
    // Toggle time format and verify selection is maintained
    await page.getByRole('button', { name: 'Format: 24h' }).click();
    await expect(page.getByRole('button', { name: 'Format: 12h' })).toBeVisible();
    await expect(selectedDay).toHaveClass(/ring-2/);
    
    // Toggle unit and verify selection is maintained
    await page.getByRole('button', { name: 'Unité: m' }).click();
    await expect(page.getByRole('button', { name: 'Unité: ft' })).toBeVisible();
    await expect(selectedDay).toHaveClass(/ring-2/);
    
    // Toggle tide type visibility and verify selection is maintained
    await page.getByRole('button', { name: 'Masquer types' }).click();
    await expect(page.getByRole('button', { name: 'Afficher types' })).toBeVisible();
    await expect(selectedDay).toHaveClass(/ring-2/);
    
    // Toggle back and verify selection is still maintained
    await page.getByRole('button', { name: 'Afficher types' }).click();
    await expect(page.getByRole('button', { name: 'Masquer types' })).toBeVisible();
    await expect(selectedDay).toHaveClass(/ring-2/);
  });

  test('should handle navigation across different coefficient ranges', async ({ page }) => {
    // Navigate to a low coefficient day (LUN 1, coefficient 27)
    const lowCoefficientDay = page.getByRole('button', { name: /LUN 1/ });
    await lowCoefficientDay.click();
    await expect(lowCoefficientDay).toHaveClass(/ring-2/);
    
    // Verify low coefficient styling/content
    const lowCoeff = await lowCoefficientDay.locator('[class*="badge"]').first().textContent();
    expect(parseInt(lowCoeff || '0')).toBeLessThan(45); // Should be in faible range
    
    // Navigate to a higher coefficient day (VEN 5, coefficient 35)
    const mediumCoefficientDay = page.getByRole('button', { name: /VEN 5/ });
    await mediumCoefficientDay.click();
    await expect(mediumCoefficientDay).toHaveClass(/ring-2/);
    await expect(lowCoefficientDay).not.toHaveClass(/ring-2/);
    
    // Verify different coefficient is displayed
    const mediumCoeff = await mediumCoefficientDay.locator('[class*="badge"]').first().textContent();
    expect(parseInt(mediumCoeff || '0')).toBeGreaterThan(parseInt(lowCoeff || '0'));
    
    // Navigate to an even higher coefficient day (SAM 6, coefficient 42)
    const higherCoefficientDay = page.getByRole('button', { name: /SAM 6/ });
    await higherCoefficientDay.click();
    await expect(higherCoefficientDay).toHaveClass(/ring-2/);
    
    // Verify progression of coefficients
    const higherCoeff = await higherCoefficientDay.locator('[class*="badge"]').first().textContent();
    expect(parseInt(higherCoeff || '0')).toBeGreaterThan(parseInt(mediumCoeff || '0'));
  });

  test('should display updated content when navigating to next day', async ({ page }) => {
    // Select first day and capture its specific details
    const firstDay = page.getByRole('button', { name: /LUN 1/ });
    await firstDay.click();
    await expect(firstDay).toHaveClass(/ring-2/);
    
    // Capture details specific to the first day
    const firstDayNumber = await firstDay.locator('text=1').textContent();
    const firstDayName = await firstDay.locator('text=LUN').textContent();
    
    // Navigate to second day
    const secondDay = page.getByRole('button', { name: /MAR 2/ });
    await secondDay.click();
    await expect(secondDay).toHaveClass(/ring-2/);
    
    // Verify the UI now reflects the second day selection
    const secondDayNumber = await secondDay.locator('text=2').textContent();
    const secondDayName = await secondDay.locator('text=MAR').textContent();
    
    // Confirm change is reflected in UI
    expect(firstDayNumber).not.toEqual(secondDayNumber);
    expect(firstDayName).not.toEqual(secondDayName);
    
    // Verify only one day is selected at a time
    await expect(firstDay).not.toHaveClass(/ring-2/);
    await expect(secondDay).toHaveClass(/ring-2/);
  });
});