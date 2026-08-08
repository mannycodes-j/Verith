import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { apiClient } from "./apiClient";
import { adminService } from "./admin";

const originalGet = apiClient.get;

describe("adminService contract adapters", () => {
  afterEach(() => {
    apiClient.get = originalGet;
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
});
