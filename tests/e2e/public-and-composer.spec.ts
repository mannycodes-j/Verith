import { expect, test } from "@playwright/test";

const responseMeta = {
  requestId: "playwright-smoke-request",
  timestamp: "2026-08-08T00:00:00.000Z",
};

test("landing page renders the public product entry", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: /turn information overload into informed action/i,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /start investigating/i }).first(),
  ).toHaveAttribute("href", "/login");
});

test("login page renders without an authenticated session", async ({ page }) => {
  await page.route("**/api/v1/auth/google/config", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        message: "Request completed successfully",
        data: { enabled: false, clientId: null },
        meta: responseMeta,
      }),
    });
  });

  await page.goto("/login");

  await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible();
  await expect(page.getByLabel("Email or username")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
});

test("authenticated composer accepts links and exposes supported media inputs", async ({
  page,
}) => {
  await page.route("**/api/v1/users/me", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        message: "Request completed successfully",
        data: {
          id: "playwright-user",
          email: "smoke@example.com",
          username: "smoke-user",
          displayName: "Smoke User",
          role: "USER",
          status: "ACTIVE",
        },
        meta: responseMeta,
      }),
    });
  });
  await page.route("**/api/v1/notifications**", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        message: "Request completed successfully",
        data: { items: [], unreadCount: 0 },
        meta: responseMeta,
      }),
    });
  });

  await page.goto("/app/verify");
  await expect(
    page.getByRole("heading", {
      name: /build an evidence map around what you have seen/i,
    }),
  ).toBeVisible();

  await page.getByRole("tab", { name: "Link" }).click();
  await page.getByLabel("Source URL").fill("https://example.com/article");
  await expect(page.getByLabel("Source URL")).toHaveValue(
    "https://example.com/article",
  );

  await page.getByRole("tab", { name: "Screenshot" }).click();
  await expect(page.locator("#media-file")).toHaveAttribute(
    "accept",
    /image/,
  );

  await page.getByRole("tab", { name: "Video" }).click();
  await expect(page.locator("#media-file")).toHaveAttribute(
    "accept",
    /video\/mp4/,
  );
});
