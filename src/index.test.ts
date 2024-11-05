import test, { describe } from "node:test";
import { createApp } from "./app";
import request from "supertest";
import { deepEqual } from "node:assert/strict";

describe("Students feature methods", () => {
  test("getAll students", async () => {
    const app = createApp();

    const result = await request(app).get("/api/v1/students");

    deepEqual(result.status, 200);
  });

  test.skip("getOneStudent", async () => {
    const app = createApp();

    const id = "bdb4a301-c5b9-492c-bdb2-daded15e7198";

    const result = await request(app).get(`/api/v1/students/${id}`);

    deepEqual(result.status, 200);
    deepEqual(result.body.name, "Love");
  });

  test("createStudent", async () => {
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
