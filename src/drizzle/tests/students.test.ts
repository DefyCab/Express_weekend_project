import test, { describe } from "node:test";
import { createApp } from "../../app";
import request from "supertest";
import { deepEqual } from "node:assert/strict";

// TODO: don't test against the actual database

describe("Students feature methods", () => {
  test("getAll students", async () => {
    const app = createApp();

    const result = await request(app).get("/api/v1/students");

    deepEqual(result.status, 200);
  });

  test("getOneStudent", async () => {
    const app = createApp();

    const id = "a7fe038e-87b8-4405-9e07-bae2ce22ba7a";

    const result = await request(app).get(`/api/v1/students/${id}`);

    deepEqual(result.status, 200);
    deepEqual(result.body[0].name, "Siv Ersson");
  });

  test.skip("createStudent", async () => {
    const app = createApp();

    const student = {
      name: "Klara Södergren",
      email: "test@test.com",
      age: 15,
    };

    const result = await request(app)
      .post("/api/v1/students")
      .send(student)
      .set("Content-Type", "application/json");

    deepEqual(result.status, 201);
  });
});
