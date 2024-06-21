// auth.spec.ts
import { test, expect } from '@playwright/test';
// import '@testing-library/jest-dom';


// import '@testing-library/jest-dom/extend-expect';

// const mockedUseAuth0 = <jest.Mock<typeof useAuth0>>useAuth0;
{/* 
mockedUseAuth0.mockReturnValue({
  isAuthenticated: {true},
  user,
  logout: jest.fn(),
  loginWithRedirect: jest.fn()
}); */}



test('should log in with Auth0', async ({ page }) => {

	// jest.mock('@auth0/auth0-react', () => ({
	// 	Auth0Provider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
	// 	useAuth0: () => ({
	// 		isAuthenticated: true,
	// 		user: { name: 'Test User', email: 'test@example.com', nickname: 'testuser' },
	// 		loginWithRedirect: jest.fn(),
	// 		logout: jest.fn(),
	// 	}),
	// }));

	test.setTimeout(120000);
	// LogIn 
	await page.goto('http://localhost:3000/');    
	
	await page.getByText('Log In').click();

	// await page.waitForURL('https://dev-hxsl4k6mw7xspicu.eu.auth0.com/**');
	// await page.fill('input[name="username"]', 'aleks@email.com' || '');
	// await page.fill('input[name="password"]', '4rBGqQfX2VTrwg5' || '');
	// await page.click('button[type="submit"]');

	// await page.waitForURL('http://localhost:3000/');
	await expect(page.locator('text=Welcome')).toBeVisible({ timeout: 100000 });
    
	//Create Journey
	await page.goto('http://localhost:3000/journeys');
	await page.getByText('Log In').click();

	await page.getByText('Get today\'s journey').click(); 
	await expect(page.locator('text=My journeys')).toBeVisible({timeout:120000});

	//Create Post
	await page.goto('http://localhost:3000/my-posts');
	await page.getByText('Log In').click();

	await expect(page.locator('text=My posts')).toBeVisible();

	await page.getByLabel('post-text').fill('This is a very well written post');
	await expect(page.locator('text=JourneysPresent')).toBeVisible({timeout:120000});

	await page.getByRole('combobox').click(); 

	const option = await page.locator('li', { hasText: /^2024/ }).first();
	await option.click();

	await page.getByText('Create post').click();

	//Delete post and journey 
	await page.getByLabel('delete-post').click(); 
	await page.getByText('delete post and journey').click(); 
	
	await expect(page.locator('text=No posts present')).toBeVisible({timeout:120000});

	await page.goto('http://localhost:3000/journeys');
	await page.getByText('Log In').click();
	await expect(page.locator('text=No journeys present')).toBeVisible({timeout:120000});








	//check that the post is deleted 

	//check that the journey is deleted 
});