// auth.spec.ts
import { test, expect } from '@playwright/test';
import '@testing-library/jest-dom';

test('should view posts', async ({ page }) => {

	test.setTimeout(120000);	
	
	//Create Post
	await page.goto('/my-posts');
	await expect(page.locator('text=My posts')).toBeVisible();

	await page.getByLabel('post-text').fill('This is a very well written post');
	await expect(page.locator('text=JourneysPresent')).toBeVisible({timeout:120000});

	// await page.getByLabel('select-area').click();
	await page.getByRole('combobox').click(); 
	await page.getByRole('combobox').selectOption({index:0});
	await page.getByRole('combobox').click(); 


	// await page.click('text=Journey'); 
	// await page.getByLabel('pick-journey').click();

	const option = await page.locator('li', { hasText: /^2024/ }).first();
	await option.click();
	// await page.getByPlaceholder('select an optional journey').selectOption({index:0});
	await page.getByText('Create post').click();

  

	//Delete post and journey 
	// await page.getByLabel('delete-post').click(); 

	//check that the post is deleted 

	//check that the journey is deleted 
});