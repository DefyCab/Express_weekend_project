import test from "node:test";
import { createApp } from "./app";
import request from "supertest";
import { deepEqual } from "node:assert/strict";

test("GET /status", async () => {
  const app = createApp();

  app.get("/status", (req, res) => {
    res.json({ status: "ready" });
  });

  const result = await request(app).get("/status");

  deepEqual(result.status, 200);
  deepEqual(result.body, { status: "ready" });
});
