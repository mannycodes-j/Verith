import { expect, test, type Page, type Route } from "@playwright/test";

const now = "2026-07-29T18:00:00.000Z";
const caseId = "507f1f77bcf86cd799439011";
const profile = {
  id: "507f191e810c19729de860ea",
  email: "investigator@example.test",
  username: "investigator",
  displayName: "Evidence Investigator",
  role: "USER",
  status: "ACTIVE",
  theme: "light",
};
const verification = {
  id: caseId,
  sourceType: "TEXT",
  status: "QUEUED",
  currentStage: "RECEIVED",
  progress: 0,
  visibility: "PRIVATE",
  title: "Circulating public-health claim",
  question: "What does the available evidence support?",
  requestedLanguage: "en",
  claimsCount: 0,
  evidenceCount: 0,
  retryCount: 0,
  createdAt: now,
  updatedAt: now,
  streamUrl: `/api/v1/verifications/${caseId}/stream`,
};

function envelope(data: unknown) {
  return {
    success: true,
    message: "OK",
    data,
    meta: { requestId: "req_e2e", timestamp: now },
  };
}

async function json(route: Route, data: unknown, status = 200) {
  await route.fulfill({
    body: JSON.stringify(envelope(data)),
    contentType: "application/json",
    headers: {
      "access-control-allow-credentials": "true",
      "access-control-allow-origin": "http://127.0.0.1:3000",
    },
    status,
  });
}

async function installApiContract(page: Page) {
  await page.route("http://localhost:4000/api/v1/**", async (route) => {
    const request = route.request();
    const path = new URL(request.url()).pathname;
    const method = request.method();

    if (method === "OPTIONS") {
      return route.fulfill({
        headers: {
          "access-control-allow-credentials": "true",
          "access-control-allow-headers":
            "authorization,content-type,idempotency-key,x-csrf-token",
          "access-control-allow-methods": "GET,POST,PATCH,DELETE,OPTIONS",
          "access-control-allow-origin": "http://127.0.0.1:3000",
        },
        status: 204,
      });
    }

    if (path === "/api/v1/auth/login" && method === "POST") {
      return json(route, {
        accessToken: "e2e-access-token",
        accessTokenExpiresIn: "15m",
        user: profile,
      });
    }
    if (path === "/api/v1/users/me" && method === "GET") {
      return json(route, profile);
    }
    if (path === "/api/v1/verifications" && method === "POST") {
      expect(request.headers()["idempotency-key"]).toBeTruthy();
      const input = request.postDataJSON() as Record<string, unknown>;
      expect(input).toMatchObject({
        sourceType: "TEXT",
        visibility: "PRIVATE",
      });
      return json(route, verification);
    }
    if (path === "/api/v1/verifications" && method === "GET") {
      return json(route, {
        items: [],
        pagination: {
          nextCursor: null,
          previousCursor: null,
          hasNextPage: false,
          limit: 5,
        },
      });
    }
    if (
      path === `/api/v1/verifications/${caseId}` &&
      method === "GET"
    ) {
      return json(route, verification);
    }
    if (
      path === `/api/v1/verifications/${caseId}/events` &&
      method === "GET"
    ) {
      return json(route, [
        {
          id: "507f1f77bcf86cd799439012",
          verificationId: caseId,
          sequence: 1,
          stage: "RECEIVED",
          status: "QUEUED",
          progress: 0,
          safeMessage: "Investigation accepted.",
          occurredAt: now,
        },
      ]);
    }
    if (path === `/api/v1/verifications/${caseId}/stream`) {
      return route.fulfill({
        body: "",
        contentType: "text/event-stream",
        status: 200,
      });
    }
    if (path === "/api/v1/auth/logout" && method === "POST") {
      return json(route, undefined, 204);
    }

    return route.fulfill({
      body: JSON.stringify({
        success: false,
        message: `No E2E fixture for ${method} ${path}`,
        error: { code: "E2E_ROUTE_MISSING", details: null },
        meta: { requestId: "req_e2e_missing", timestamp: now },
      }),
      contentType: "application/json",
      status: 404,
    });
  });
}

test("authenticates, restores the workspace, and creates an investigation", async ({
  page,
}, testInfo) => {
  await installApiContract(page);
  await page.goto("/login");
  await page.getByLabel("Email or username").fill("investigator@example.test");
  await page.getByLabel("Password").fill("correct horse battery staple");
  await page.getByRole("button", { name: "Enter workspace" }).click();

  await expect(page).toHaveURL(/\/app$/);
  await expect(
    page.getByRole("heading", { name: "What would you like to verify?" }),
  ).toBeVisible();
  await expect(page.getByText("Evidence Investigator")).toBeVisible();

  await page.getByRole("link", { name: /Open investigation desk/ }).click();
  await page
    .getByLabel("Claim, headline, or article excerpt")
    .fill(
      "A circulating post claims a public-health agency changed its guidance yesterday.",
    );
  await page
    .getByLabel("Case title (optional)")
    .fill("Circulating public-health claim");
  await page
    .getByLabel("Investigation question (optional)")
    .fill("What does the available evidence support?");
  await page.getByRole("button", { name: "Run investigation" }).click();

  await expect(page).toHaveURL(new RegExp(`/app/verifications/${caseId}$`));
  await expect(page.getByText(`Case / ${caseId}`).first()).toBeVisible();
  await expect(page.getByText("QUEUED").first()).toBeVisible();
  await page.evaluate(() => window.scrollTo({ left: 0, top: 0 }));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await page.screenshot({
    fullPage: true,
    path: testInfo.outputPath("authenticated-investigation.png"),
  });
});
