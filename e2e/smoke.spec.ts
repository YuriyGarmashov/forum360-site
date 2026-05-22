import { test, expect } from "@playwright/test";

test("hero loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#hero-title")).toBeVisible();
  await expect(page.locator(".site-header")).toBeVisible();
});

test("case modal opens on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/#cases");
  await page.locator(".cases-row--data").first().click();
  await expect(page.locator(".modal.is-open")).toBeVisible();
  await expect(page.locator("#modalTitle")).not.toBeEmpty();
});

test("logo fits viewport at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/");
  const logo = page.locator(".logo-link");
  await expect(logo).toBeVisible();
  const box = await logo.boundingBox();
  expect(box).not.toBeNull();
  const viewport = page.viewportSize()!;
  expect(box!.x).toBeLessThanOrEqual(1);
  expect(box!.width).toBeLessThanOrEqual(viewport.width - 52);
});

async function expectTeamModalNoHorizontalOverflow(page: import("@playwright/test").Page) {
  await page.goto("/#team");
  await page.locator('.team-circle-hits path[data-member="ekaterina"]').click();
  await expect(page.locator(".modal--team-member.is-open")).toBeVisible();
  const scroll = page.locator(".modal--team-member .tmm-scroll");
  await expect(scroll).toBeVisible();
  const overflows = await scroll.evaluate(
    (el) => el.scrollWidth > el.clientWidth + 1
  );
  expect(overflows).toBe(false);
  await expect(page.locator(".tmm-name")).toBeVisible();
  await expect(page.locator(".tmm-stat-lab").first()).toBeVisible();
}

test("team modal at 320px without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await expectTeamModalNoHorizontalOverflow(page);
});

test("team modal at 768px without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1080 });
  await expectTeamModalNoHorizontalOverflow(page);
});

test("team modal on narrow viewport", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#team");
  await page.locator('.team-circle-hits path[data-member="ekaterina"]').click();
  await expect(page.locator(".modal--team-member.is-open")).toBeVisible();
});

test("compact desktop layout at 1100x620", async ({ page }) => {
  await page.setViewportSize({ width: 1100, height: 620 });
  await page.goto("/");
  const hero = page.locator(".hero");
  const heroBox = await hero.boundingBox();
  expect(heroBox).not.toBeNull();
  const viewport = page.viewportSize()!;
  expect(heroBox!.height).toBeGreaterThanOrEqual(viewport.height * 0.85);
  expect(heroBox!.height).toBeLessThanOrEqual(viewport.height);

  await page.goto("/#team");
  const circle = page.locator(".circle-container");
  await expect(circle).toBeVisible();
  const circleBox = await circle.boundingBox();
  expect(circleBox).not.toBeNull();
  expect(circleBox!.height).toBeGreaterThanOrEqual(viewport.height * 0.42);
  expect(circleBox!.height).toBeLessThanOrEqual(viewport.height * 0.72);
});

test("team modal on laptop 1024 viewport", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 1080 });
  await page.goto("/#team");
  await page.locator('.team-circle-hits path[data-member="ekaterina"]').click();
  await expect(page.locator(".modal--team-member.is-open")).toBeVisible();
  await expect(page.locator(".tooltip.tooltip--in-circle")).toBeHidden();
});
