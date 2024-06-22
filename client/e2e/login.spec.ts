import { test, expect } from '@playwright/test';

test('should log in with Auth0', async ({ page }) => {
	test.setTimeout(120000);
	// LogIn 
	await page.goto('/');    
	
	await page.getByText('Log In').click();

	await page.waitForURL('https://dev-hxsl4k6mw7xspicu.eu.auth0.com/**');
	await page.fill('input[name="username"]', 'aleks@email.com' || '');
	await page.fill('input[name="password"]', '4rBGqQfX2VTrwg5' || '');
	await page.click('button[type="submit"]');

	await page.waitForURL('http://localhost:3000/');
	await expect(page.locator('text=Welcome')).toBeVisible({ timeout: 100000 });

});