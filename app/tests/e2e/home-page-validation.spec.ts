/**
 * E2E tests for home page validation
 * Validates that the home page loads correctly and displays all expected elements
 */

import { test, expect } from '@playwright/test';

test.describe('Home Page Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    
    // Wait for the page to load completely by checking for key elements
    await expect(page.getByText('Marées de Septembre 2025')).toBeVisible();
    await expect(page.getByText('La Rochelle, France')).toBeVisible();
  });

  test('should load home page with correct title and meta information', async ({ page }) => {
    // Verify page title contains expected text
    await expect(page).toHaveTitle(/Marées/);
    
    // Check for main title and location
    await expect(page.getByRole('heading', { name: 'Marées de Septembre 2025' })).toBeVisible();
    await expect(page.getByText('La Rochelle, France')).toBeVisible();
  });

  test('should display all essential UI elements', async ({ page }) => {
    // Check control buttons are present and properly labeled
    await expect(page.getByRole('button', { name: 'Format: 24h' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Unité: m' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Masquer types' })).toBeVisible();
    
    // Check that tide day cards are displayed for the first few days
    await expect(page.getByRole('button', { name: /LUN 1/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /MAR 2/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /MER 3/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /JEU 4/ })).toBeVisible();
    
    // Verify legend section is displayed
    await expect(page.getByRole('heading', { name: 'Légende' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Types de marées' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Coefficients' })).toBeVisible();
  });

  test('should display tide data with correct time format initially', async ({ page }) => {
    // Initially should be in 24h format (default)
    await expect(page.getByRole('button', { name: 'Format: 24h' })).toBeVisible();
    
    // Look for time patterns in 24h format (HH:MM without AM/PM)
    await expect(page.getByText(/^\d{2}:\d{2}$/).first()).toBeVisible();
    
    // Verify initial unit is meters
    await expect(page.getByRole('button', { name: 'Unité: m' })).toBeVisible();
    
    // Verify tide types are initially shown
    await expect(page.getByRole('button', { name: 'Masquer types' })).toBeVisible();
  });

  test('should display tide coefficient information', async ({ page }) => {
    // Check that coefficient badges are displayed
    const coefficientBadges = page.locator('[class*="badge"]').filter({ hasText: /^\d+$/ });
    await expect(coefficientBadges.first()).toBeVisible();
    
    // Verify coefficient values are within expected range (20-120)
    const firstCoefficient = await coefficientBadges.first().textContent();
    const coeffValue = parseInt(firstCoefficient || '0');
    expect(coeffValue).toBeGreaterThanOrEqual(20);
    expect(coeffValue).toBeLessThanOrEqual(120);
  });

  test('should display legend with proper styling indicators', async ({ page }) => {
    // Check tide type legend items
    await expect(page.getByText('Haute')).toBeVisible();
    await expect(page.getByText('Basse')).toBeVisible();
    
    // Check coefficient level descriptions
    await expect(page.getByText('95-120 Vives Eaux Exceptionnelles')).toBeVisible();
    await expect(page.getByText('70-94 Fort')).toBeVisible();
    await expect(page.getByText('45-69 Moyen')).toBeVisible();
    await expect(page.getByText('20-44 Faible')).toBeVisible();
  });

  test('should have proper accessibility attributes', async ({ page }) => {
    // Check that day cards have proper role and are accessible
    const dayCards = page.getByRole('button').filter({ hasText: /\w{3} \d{1,2}/ });
    await expect(dayCards.first()).toBeVisible();
    
    // Verify day cards are keyboard accessible
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Check that control buttons are properly labeled for screen readers
    await expect(page.getByRole('button', { name: 'Format: 24h' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Unité: m' })).toBeVisible();
  });

  test('should load without errors and display complete month data', async ({ page }) => {
    // Verify no loading spinner is showing (page fully loaded)
    await expect(page.getByText('Chargement des données de marée...')).not.toBeVisible();
    
    // Verify no error state is showing
    await expect(page.getByText('Erreur de chargement')).not.toBeVisible();
    await expect(page.getByText('Aucune donnée disponible')).not.toBeVisible();
    
    // Count day cards to ensure full month is displayed
    const dayCards = page.getByRole('button').filter({ hasText: /\w{3} \d{1,2}/ });
    const cardCount = await dayCards.count();
    expect(cardCount).toBeGreaterThan(25); // September should have ~30 days
  });
});