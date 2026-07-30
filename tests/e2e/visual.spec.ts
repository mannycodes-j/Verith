import { expect, test } from "@playwright/test";

const viewports = [
  { name: "mobile-320", width: 320, height: 800 },
  { name: "mobile-430", width: 430, height: 900 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop-1440", width: 1440, height: 1000 },
] as const;

for (const viewport of viewports) {
  test(`public editorial surfaces fit ${viewport.name}`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize(viewport);
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    for (const path of ["/", "/how-it-works", "/login"]) {
      await page.goto(path);
      await expect(page.locator("h1, h2").first()).toBeVisible();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      expect(overflow, `${path} has horizontal overflow`).toBeLessThanOrEqual(
        1,
      );
      await page.screenshot({
        fullPage: true,
        path: testInfo.outputPath(
          `${path === "/" ? "home" : path.slice(1)}-${viewport.name}.png`,
        ),
      });
    }

    expect(errors).toEqual([]);
  });
}
