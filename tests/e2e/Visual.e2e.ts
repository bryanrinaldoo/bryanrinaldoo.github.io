import { expect, takeSnapshot, test } from '@chromatic-com/playwright';

test.describe('Visual testing', () => {
  test.describe('Static pages', () => {
    test('takes screenshot of the homepage', async ({ page }, testInfo) => {
      await page.goto('/');

      await expect(
        page.getByRole('heading', { name: 'Turning business problems into working software.' }),
      ).toBeVisible();

      await takeSnapshot(page, testInfo);
    });
  });
});
