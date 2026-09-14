import { test, expect } from '@playwright/test';
test('all original pages load directly without hydration errors or missing images', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (message) => {
    if (/hydration|hydrated|Minified React error/i.test(message.text()))
      errors.push(message.text());
  });
  for (const route of ['index', 'coaches', 'schedule', 'photos', 'location']) {
    await page.goto(`/${route}.html`);
    await expect(page.locator('h1')).toHaveCount(1);
    for (const image of await page.locator('img').all()) await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        page
          .locator('img')
          .evaluateAll((images) =>
            images.every(
              (image) =>
                image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0,
            ),
          ),
      )
      .toBe(true);
    await expect(page.locator('nav a[aria-current=page]')).toHaveCount(1);
  }
  expect(errors).toEqual([]);
});
test('mobile menu, day selection and page widths work', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/index.html');
  await page.getByRole('button', { name: 'Menu +' }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'Schedule' }).click();
  await page.getByRole('button', { name: 'Sat', exact: true }).click();
  await expect(page.getByText('End time: please confirm', { exact: false })).toBeVisible();
  for (const route of ['index', 'coaches', 'schedule', 'photos', 'location']) {
    await page.goto(`/${route}.html`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
});
test('unavailable live calendar uses our styled weekly timetable', async ({ page }) => {
  await page.route('**/site-config.json', (route) =>
    route.fulfill({ json: { calendarId: 'gym@example.com' } }),
  );
  await page.goto('/schedule.html');
  await expect(page.getByRole('heading', { name: 'WEEKLY CLASS SCHEDULE.' })).toBeVisible();
  await expect(page.getByText('Live updates are unavailable.', { exact: false })).toBeVisible();
  await expect(page.locator('iframe')).toHaveCount(0);
});
test('valid feeds render live content and safely escape captions', async ({ page }) => {
  await page.route('**/feeds/instagram.json', (route) =>
    route.fulfill({
      json: {
        fetchedAt: new Date().toISOString(),
        items: [
          {
            id: 'post',
            imageUrl: 'https://cdn.example.com/test.jpg',
            permalink: 'https://www.instagram.com/p/test/',
            caption: '<script>alert(1)</script>',
          },
        ],
      },
    }),
  );
  await page.route('https://cdn.example.com/test.jpg', (route) =>
    route.fulfill({ path: 'assets/class-photos/image0.jpeg' }),
  );
  await page.goto('/photos.html');
  await expect(page.getByText('FROM INSTAGRAM', { exact: true })).toBeVisible();
  await expect(page.locator('.gallery-image img')).toHaveAttribute(
    'alt',
    '<script>alert(1)</script>',
  );
  await page.route('**/feeds/calendar.json', (route) =>
    route.fulfill({
      json: {
        fetchedAt: new Date().toISOString(),
        items: [
          {
            id: 'class',
            title: 'Test Muay Thai',
            start: new Date(Date.now() + 3600000).toISOString(),
            end: new Date(Date.now() + 7200000).toISOString(),
            allDay: false,
          },
        ],
      },
    }),
  );
  await page.goto('/schedule.html');
  await expect(page.getByRole('heading', { name: 'Test Muay Thai' })).toBeVisible();
});
