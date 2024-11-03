import test from "node:test";
import { createApp } from "./app";
import request from "supertest";
import { deepEqual } from "node:assert/strict";

test("GET /api/v1/students body", async () => {
  const app = createApp();

  const result = await request(app).get("/api/v1/students");

  deepEqual(result.status, 200);
  deepEqual(result.body.length, 1);
});
