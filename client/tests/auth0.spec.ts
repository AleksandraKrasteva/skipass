// auth.spec.ts
import { test, expect } from '@playwright/test';

test('should log in with Auth0', async ({ page }) => {
	await page.goto('/');
    
	
	await page.getByText('Log In').click();

	// Handle Auth0 redirection
	await page.waitForURL('https://dev-hxsl4k6mw7xspicu.eu.auth0.com/*');
	await page.fill('input[name="Email address"]', 'aleks@email.com' || '');
	await page.fill('input[name="Password"]', 'aleks@email.com' || '');
	await page.click('button[type="submit"]');

	// Wait for redirection back to your application
	await page.waitForURL('http://localhost:3000/');
	await expect(page.locator('text=Welcome/*')).toBeVisible();
});
