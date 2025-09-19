/**
 * E2E tests for control interactions and responsive behavior
 * Validates all interactive elements and responsive design
 */

import { test, expect } from '@playwright/test';

test.describe('Control Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // Wait for the page to load completely
    await expect(page.getByText('Marées de Septembre 2025')).toBeVisible();
    await expect(page.getByText('La Rochelle, France')).toBeVisible();
  });

  test('should toggle time format between 24h and 12h', async ({ page }) => {
    // Initially should be in 24h format
    await expect(page.getByRole('button', { name: 'Format: 24h' })).toBeVisible();
    
    // Check that times are displayed in 24h format (no AM/PM)
    await expect(page.getByText(/^\\d{2}:\\d{2}$/).first()).toBeVisible();
    
    // Click to switch to 12h format
    await page.getByRole('button', { name: 'Format: 24h' }).click();
    
    // Should now be in 12h format
    await expect(page.getByRole('button', { name: 'Format: 12h' })).toBeVisible();
    
    // Check that times are now displayed in 12h format (with AM/PM)
    await expect(page.getByText(/\\d+:\\d{2} [AP]M/).first()).toBeVisible();
    
    // Click again to switch back to 24h format
    await page.getByRole('button', { name: 'Format: 12h' }).click();
    
    // Should be back to 24h format
    await expect(page.getByRole('button', { name: 'Format: 24h' })).toBeVisible();
    await expect(page.getByText(/^\\d{2}:\\d{2}$/).first()).toBeVisible();
  });

  test('should toggle height units between meters and feet', async ({ page }) => {
    // Initially should be in meters
    await expect(page.getByRole('button', { name: 'Unité: m' })).toBeVisible();
    
    // Click to switch to feet
    await page.getByRole('button', { name: 'Unité: m' }).click();
    
    // Should now show feet
    await expect(page.getByRole('button', { name: 'Unité: ft' })).toBeVisible();
    
    // Check that heights are displayed with ft suffix
    await expect(page.getByText(/\\d+\\.\\dft/).first()).toBeVisible();
    
    // Click again to switch back to meters
    await page.getByRole('button', { name: 'Unité: ft' }).click();
    
    // Should be back to meters
    await expect(page.getByRole('button', { name: 'Unité: m' })).toBeVisible();
    
    // Check that heights are displayed with m suffix
    await expect(page.getByText(/\\d+\\.\\dm/).first()).toBeVisible();
  });

  test('should toggle tide type visibility', async ({ page }) => {
    // Initially tide types should be shown
    await expect(page.getByRole('button', { name: 'Masquer types' })).toBeVisible();
    
    // Check that tide type badges are visible
    const tideCards = page.locator('[role="button"]').filter({ hasText: /\\w{3} \\d{1,2}/ });
    await expect(tideCards.getByText('Haute').first()).toBeVisible();
    await expect(tideCards.getByText('Basse').first()).toBeVisible();
    
    // Click to hide tide types
    await page.getByRole('button', { name: 'Masquer types' }).click();
    
    // Button should now show "Afficher types"
    await expect(page.getByRole('button', { name: 'Afficher types' })).toBeVisible();
    
    // Tide type badges should be hidden
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

  test('should maintain control state consistency', async ({ page }) => {
    // Set specific state
    await page.getByRole('button', { name: 'Format: 24h' }).click(); // Switch to 12h
    await page.getByRole('button', { name: 'Unité: m' }).click(); // Switch to ft
    await page.getByRole('button', { name: 'Masquer types' }).click(); // Hide types
    
    // Verify all controls show expected state
    await expect(page.getByRole('button', { name: 'Format: 12h' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Unité: ft' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Afficher types' })).toBeVisible();
    
    // Verify data display reflects the changes
    await expect(page.getByText(/\\d+:\\d{2} [AP]M/).first()).toBeVisible(); // 12h format
    await expect(page.getByText(/\\d+\\.\\dft/).first()).toBeVisible(); // Feet format
    
    // Select a day and verify settings persist
    await page.getByRole('button', { name: /LUN 1/ }).click();
    
    // Settings should remain unchanged
    await expect(page.getByRole('button', { name: 'Format: 12h' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Unité: ft' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Afficher types' })).toBeVisible();
  });
});

test.describe('Responsive Design', () => {
  test('should display correctly on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    
    // Wait for content to load
    await expect(page.getByText('Marées de Septembre 2025')).toBeVisible();
    
    // Check that main content is still visible and accessible
    await expect(page.getByRole('heading', { name: 'Marées de Septembre 2025' })).toBeVisible();
    await expect(page.getByText('La Rochelle, France')).toBeVisible();
    
    // Control buttons should still be accessible
    await expect(page.getByRole('button', { name: 'Format: 24h' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Unité: m' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Masquer types' })).toBeVisible();
    
    // Day cards should be displayed in mobile layout
    await expect(page.getByRole('button', { name: /LUN 1/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /MAR 2/ })).toBeVisible();
    
    // Test touch interactions
    await page.getByRole('button', { name: /LUN 1/ }).click();
    await expect(page.getByRole('button', { name: /LUN 1/ })).toHaveClass(/ring-2/);
  });

  test('should display correctly on tablet viewport', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    
    await page.goto('/');
    
    // Wait for content to load
    await expect(page.getByText('Marées de Septembre 2025')).toBeVisible();
    
    // Check that content is properly laid out for tablet
    await expect(page.getByRole('heading', { name: 'Marées de Septembre 2025' })).toBeVisible();
    
    // Controls should be accessible
    await expect(page.getByRole('button', { name: 'Format: 24h' })).toBeVisible();
    
    // Day cards should be visible with appropriate spacing
    const dayCards = page.getByRole('button').filter({ hasText: /\\w{3} \\d{1,2}/ });
    await expect(dayCards.first()).toBeVisible();
    
    // Test interactions work on tablet
    await dayCards.first().click();
    await expect(dayCards.first()).toHaveClass(/ring-2/);
  });

  test('should display correctly on desktop viewport', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    
    await page.goto('/');
    
    // Wait for content to load
    await expect(page.getByText('Marées de Septembre 2025')).toBeVisible();
    
    // All content should be visible without scrolling
    await expect(page.getByRole('heading', { name: 'Marées de Septembre 2025' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Légende' })).toBeVisible();
    
    // Controls should be properly spaced
    await expect(page.getByRole('button', { name: 'Format: 24h' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Unité: m' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Masquer types' })).toBeVisible();
    
    // Day cards should be displayed in grid layout
    const dayCards = page.getByRole('button').filter({ hasText: /\\w{3} \\d{1,2}/ });
    const cardCount = await dayCards.count();
    expect(cardCount).toBeGreaterThan(25);
    
    // Test that multiple cards can be seen at once
    await expect(dayCards.nth(0)).toBeVisible();
    await expect(dayCards.nth(3)).toBeVisible();
    await expect(dayCards.nth(6)).toBeVisible();
  });
});

test.describe('Loading and Error States', () => {
  test('should handle loading state gracefully', async ({ page }) => {
    // Intercept requests to simulate slow loading
    await page.route('**/*', async route => {
      await new Promise(resolve => setTimeout(resolve, 100));
      await route.continue();
    });
    
    page.goto('/');
    
    // Loading spinner should appear briefly
    await expect(page.getByText('Chargement des données de marée...')).toBeVisible({
      timeout: 2000
    });
    
    // Content should eventually load
    await expect(page.getByText('Marées de Septembre 2025')).toBeVisible({
      timeout: 10000
    });
    
    // Loading spinner should disappear
    await expect(page.getByText('Chargement des données de marée...')).not.toBeVisible();
  });

  test('should display proper content after loading completes', async ({ page }) => {
    await page.goto('/');
    
    // Wait for loading to complete
    await expect(page.getByText('Marées de Septembre 2025')).toBeVisible();
    
    // Verify no loading or error states are showing
    await expect(page.getByText('Chargement des données de marée...')).not.toBeVisible();
    await expect(page.getByText('Erreur de chargement')).not.toBeVisible();
    await expect(page.getByText('Aucune donnée disponible')).not.toBeVisible();
    
    // Verify main content is displayed
    await expect(page.getByRole('heading', { name: 'Marées de Septembre 2025' })).toBeVisible();
    await expect(page.getByText('La Rochelle, France')).toBeVisible();
    
    // Verify interactive elements are functional
    await expect(page.getByRole('button', { name: 'Format: 24h' })).toBeVisible();
    await page.getByRole('button', { name: 'Format: 24h' }).click();
    await expect(page.getByRole('button', { name: 'Format: 12h' })).toBeVisible();
  });
});