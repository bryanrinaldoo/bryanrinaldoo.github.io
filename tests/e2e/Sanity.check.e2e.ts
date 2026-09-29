import { expect, test } from '@playwright/test';

// `*.check.e2e.ts` tests also run against deployed environments (Checkly).

test.describe('Sanity', () => {
  test.describe('Static pages', () => {
    test('displays the homepage', async ({ page }) => {
      await page.goto('/');

      await expect(
        page.getByRole('heading', { name: 'Turning business problems into working software.' }),
      ).toBeVisible();
    });

    test('links to email and LinkedIn', async ({ page }) => {
      await page.goto('/');

      await expect(page.getByRole('link', { name: 'LinkedIn' }).first()).toBeVisible();
      await expect(page.getByRole('link', { name: 'Email me' }).first()).toBeVisible();
    });
  });
});
