import { test, expect } from '@playwright/test';

test('should generate and view journeys', async ({ page }) => {

	test.setTimeout(120000);
    	
    await page.goto('/journeys');
	await page.getByText('Get today\'s journey').click(); 
	await expect(page.locator('text=My journeys')).toBeVisible({timeout:120000});

});