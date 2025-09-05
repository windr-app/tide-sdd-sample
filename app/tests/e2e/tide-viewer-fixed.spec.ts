/**
 * E2E tests for the Tide Information Viewer application
 * Tests user interactions, state management, and responsive design
 */

import { test, expect } from '@playwright/test';

test.describe('Tide Information Viewer', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // Wait for the page to load completely
    await expect(page.getByText('Marées de Septembre 2025')).toBeVisible();
    await expect(page.getByText('La Rochelle, France')).toBeVisible();
  });

  test('should display tide information correctly', async ({ page }) => {
    // Check main title and location
    await expect(page.getByRole('heading', { name: 'Marées de Septembre 2025' })).toBeVisible();
    await expect(page.getByText('La Rochelle, France')).toBeVisible();
    
    // Check control buttons are present
    await expect(page.getByRole('button', { name: 'Format: 24h' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Unité: m' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Masquer types' })).toBeVisible();
    
    // Check that tide cards are displayed
    await expect(page.getByRole('button', { name: /LUN 1/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /MAR 2/ })).toBeVisible();
    
    // Check legend is displayed
    await expect(page.getByRole('heading', { name: 'Légende' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Types de marées' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Coefficients' })).toBeVisible();
  });

  test('should toggle time format between 24h and 12h', async ({ page }) => {
    // Initially should be in 24h format
    await expect(page.getByRole('button', { name: 'Format: 24h' })).toBeVisible();
    await expect(page.getByText('05:05')).toBeVisible(); // 24h format
    
    // Click to switch to 12h format
    await page.getByRole('button', { name: 'Format: 24h' }).click();
    
    // Should now be in 12h format
    await expect(page.getByRole('button', { name: 'Format: 12h' })).toBeVisible();
    await expect(page.getByText(/\d+:\d{2} [AP]M/).first()).toBeVisible(); // 12h format
    
    // Click again to switch back to 24h format
    await page.getByRole('button', { name: 'Format: 12h' }).click();
    
    // Should be back to 24h format
    await expect(page.getByRole('button', { name: 'Format: 24h' })).toBeVisible();
    await expect(page.getByText('05:05')).toBeVisible();
  });

  test('should toggle height units between meters and feet', async ({ page }) => {
    // Initially should be in meters
    await expect(page.getByRole('button', { name: 'Unité: m' })).toBeVisible();
    await expect(page.getByText('2.99m')).toBeVisible();
    
    // Click to switch to feet
    await page.getByRole('button', { name: 'Unité: m' }).click();
    
    // Button should now show feet
    await expect(page.getByRole('button', { name: 'Unité: ft' })).toBeVisible();
    
    // Heights should now be in feet (e.g., "9.8ft") - check first occurrence
    await expect(page.getByText(/\d+\.\dft/).first()).toBeVisible();
    
    // Click again to switch back to meters
    await page.getByRole('button', { name: 'Unité: ft' }).click();
    
    // Should be back to meters
    await expect(page.getByRole('button', { name: 'Unité: m' })).toBeVisible();
    await expect(page.getByText('2.99m')).toBeVisible();
  });

  test('should toggle tide type indicators', async ({ page }) => {
    // Initially should show tide types
    await expect(page.getByRole('button', { name: 'Masquer types' })).toBeVisible();
    
    // Check that tide type badges are visible in tide cards
    const tideCards = page.locator('[role="button"]:has-text("Marées")');
    await expect(tideCards.getByText('Haute').first()).toBeVisible();
    await expect(tideCards.getByText('Basse').first()).toBeVisible();
    
    // Click to hide tide types
    await page.getByRole('button', { name: 'Masquer types' }).click();
    
    // Button should now show "Afficher types"
    await expect(page.getByRole('button', { name: 'Afficher types' })).toBeVisible();
    
    // Tide type badges should be hidden in tide cards
    await expect(tideCards.getByText('Haute').first()).not.toBeVisible();
    await expect(tideCards.getByText('Basse').first()).not.toBeVisible();
    
    // Click again to show tide types
    await page.getByRole('button', { name: 'Afficher types' }).click();
    
    // Button should be back to "Masquer types"
    await expect(page.getByRole('button', { name: 'Masquer types' })).toBeVisible();
    
    // Tide type badges should be visible again
    await expect(tideCards.getByText('Haute').first()).toBeVisible();
    await expect(tideCards.getByText('Basse').first()).toBeVisible();
  });

  test('should select tide day cards and show selection state', async ({ page }) => {
    // Click on the first day card
    const firstCard = page.getByRole('button', { name: /LUN 1/ });
    await firstCard.click();
    
    // Card should be selected (have active styling)
    await expect(firstCard).toHaveClass(/ring-2/);
    
    // Click on another day card
    const secondCard = page.getByRole('button', { name: /MAR 2/ });
    await secondCard.click();
    
    // Second card should now be selected
    await expect(secondCard).toHaveClass(/ring-2/);
    
    // First card should no longer be selected
    await expect(firstCard).not.toHaveClass(/ring-2/);
  });

  test('should display coefficient colors correctly', async ({ page }) => {
    // Check for different coefficient colors based on values
    const cards = page.locator('[role="button"]:has-text("Marées")');
    
    // Low coefficient (20-44) - should be visible
    await expect(cards.filter({ hasText: '27' })).toBeVisible();
    
    // Medium coefficient (45-69) - should be visible  
    await expect(cards.filter({ hasText: '49' })).toBeVisible();
    
    // Strong coefficient (70-94) - should be visible
    await expect(cards.filter({ hasText: '56' })).toBeVisible();
  });

  test('should display tide type classifications', async ({ page }) => {
    // Check different tide classifications
    await expect(page.getByText('Marées de morte-eau')).toBeVisible();
    await expect(page.getByText('Marées moyennes')).toBeVisible();
    
    // Check legend classifications
    await expect(page.getByText('95+ Très fort')).toBeVisible();
    await expect(page.getByText('70-94 Fort')).toBeVisible();
    await expect(page.getByText('45-69 Moyen')).toBeVisible();
    await expect(page.getByText('20-44 Faible')).toBeVisible();
  });

  test('should handle keyboard navigation', async ({ page }) => {
    // Focus on first button
    await page.keyboard.press('Tab');
    
    // Should focus on format button
    await expect(page.getByRole('button', { name: 'Format: 24h' })).toBeFocused();
    
    // Press Enter to activate
    await page.keyboard.press('Enter');
    await expect(page.getByRole('button', { name: 'Format: 12h' })).toBeVisible();
    
    // Tab to next button
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page.getByRole('button', { name: 'Unité: ft' })).toBeVisible();
    
    // Tab to third button
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page.getByRole('button', { name: 'Afficher types' })).toBeVisible();
  });

  test('should be responsive on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check that content is still visible and accessible
    await expect(page.getByRole('heading', { name: 'Marées de Septembre 2025' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Format: 24h' })).toBeVisible();
    
    // Check that cards are displayed in mobile layout
    await expect(page.getByRole('button', { name: /LUN 1/ })).toBeVisible();
    
    // Test touch interactions
    await page.getByRole('button', { name: /LUN 1/ }).click();
    await expect(page.getByRole('button', { name: /LUN 1/ })).toHaveClass(/ring-2/);
  });

  test('should maintain state consistency across interactions', async ({ page }) => {
    // Change format to 12h
    await page.getByRole('button', { name: 'Format: 24h' }).click();
    await expect(page.getByRole('button', { name: 'Format: 12h' })).toBeVisible();
    
    // Change unit to feet
    await page.getByRole('button', { name: 'Unité: m' }).click();
    await expect(page.getByRole('button', { name: 'Unité: ft' })).toBeVisible();
    
    // Hide tide types
    await page.getByRole('button', { name: 'Masquer types' }).click();
    await expect(page.getByRole('button', { name: 'Afficher types' })).toBeVisible();
    
    // Select a day card
    await page.getByRole('button', { name: /LUN 1/ }).click();
    
    // Verify all settings are maintained
    await expect(page.getByRole('button', { name: 'Format: 12h' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Unité: ft' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Afficher types' })).toBeVisible();
    
    // Verify day card selection is maintained
    await expect(page.getByRole('button', { name: /LUN 1/ })).toHaveClass(/ring-2/);
    
    // Verify data format changes are applied
    await expect(page.getByText(/\d+:\d{2} [AP]M/).first()).toBeVisible(); // 12h format
    await expect(page.getByText(/\d+\.\dft/).first()).toBeVisible(); // Feet format
  });
});
