import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
	await page.goto('https://localhost:3000/my-posts');

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
	await page.goto('https://playwright.dev/');

	// Click the get started link.
	await page.getByRole('link', { name: 'Get started' }).click();

	// Expects page to have a heading with the name of Installation.
	await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

// login
// create a journey, attach a post to it 

// ---
// login 
// got to page 
// select post and click on delete icon 
// select delete both journey and post 
// look at the results on the page : check if post exsits, check of journey exsitis 
// have the whole cluster runnning :_))))