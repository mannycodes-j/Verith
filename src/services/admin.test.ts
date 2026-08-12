import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { apiClient } from "./apiClient";
import { adminService } from "./admin";

const originalGet = apiClient.get;
const originalPatch = apiClient.patch;

describe("adminService contract adapters", () => {
  afterEach(() => {
    apiClient.get = originalGet;
    apiClient.patch = originalPatch;
  });

  it("sends only supported user filters and preserves cursor pagination", async () => {
    const calls: string[] = [];
    apiClient.get = (async (endpoint: string) => {
      calls.push(endpoint);
      return {
        items: [],
        pagination: {
          hasNextPage: false,
          limit: 20,
          nextCursor: null,
          previousCursor: null,
        },
      };
    }) as typeof apiClient.get;

    await adminService.users({
      cursor: "507f1f77bcf86cd799439011",
      role: "ADMIN",
      search: "investigator",
      status: "ACTIVE",
    });

    const query = new URL(calls[0]!, "https://verith.test").searchParams;
    assert.equal(query.get("cursor"), "507f1f77bcf86cd799439011");
    assert.equal(query.get("role"), "ADMIN");
    assert.equal(query.get("search"), "investigator");
    assert.equal(query.get("status"), "ACTIVE");
    assert.deepEqual([...query.keys()].sort(), [
      "cursor",
      "limit",
      "role",
      "search",
      "status",
    ]);
  });

  it("never forces provider health checks from the operations screen", async () => {
    const calls: string[] = [];
    apiClient.get = (async (endpoint: string) => {
      calls.push(endpoint);
      return [];
    }) as typeof apiClient.get;

    await Promise.all([
      adminService.aiHealth(),
      adminService.searchHealth(),
    ]);

    assert.deepEqual(calls, [
      "/integrations/ai/health",
      "/integrations/search/health",
    ]);
    assert.equal(calls.join(" ").includes("force=true"), false);
  });

  it("reactivates a badge without mutating its fixed definition", async () => {
    const calls: Array<{ body: unknown; endpoint: string }> = [];
    apiClient.patch = (async (endpoint: string, body: unknown) => {
      calls.push({ body, endpoint });
      return { _id: "badge-1", active: true };
    }) as typeof apiClient.patch;

    await adminService.updateBadgeActive("badge-1", true);

    assert.deepEqual(calls, [
      {
        body: { active: true },
        endpoint: "/admin/gamification/badges/badge-1",
      },
    ]);
  });

  it("sends editorial updates to each protected content endpoint", async () => {
    const calls: Array<{ body: unknown; endpoint: string }> = [];
    apiClient.patch = (async (endpoint: string, body: unknown) => {
      calls.push({ body, endpoint });
      return { _id: "record-1" };
    }) as typeof apiClient.patch;

    await adminService.updateContent("courses", "course-1", {
      title: "Updated course",
    });
    await adminService.updateContent("quizzes", "quiz-1", {
      title: "Updated quiz",
    });

    assert.deepEqual(calls, [
      {
        body: { title: "Updated course" },
        endpoint: "/admin/learning/courses/course-1",
      },
      {
        body: { title: "Updated quiz" },
        endpoint: "/admin/quizzes/quiz-1",
      },
    ]);
  });
});
