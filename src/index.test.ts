import test, { describe } from "node:test";
import { createApp } from "./app";
import request from "supertest";
import { deepEqual } from "node:assert/strict";

describe("Students feature methods", () => {
  test("getAll students", async () => {
    const app = createApp();

    const result = await request(app).get("/api/v1/students");

    deepEqual(result.status, 200);
    deepEqual(result.body.length, 2);
  });

  test("getOneStudent", async () => {
    const app = createApp();

    const id = "bdb4a301-c5b9-492c-bdb2-daded15e7198";

    const result = await request(app).get(`/api/v1/students/${id}`);

    deepEqual(result.status, 200);
    deepEqual(result.body.name, "Love");
  });

  test("createStudent", async () => {
    const app = createApp();

    const student = {
      id: "555555f2-7bb1-416c-bae5-fd8f339ec5a5",
      name: "Klara Södergren",
    };

    const result = await request(app)
      .post("/api/v1/students")
      .send(student)
      .set("Content-Type", "application/json");

    deepEqual(result.body[result.body.length - 1], {
      id: "555555f2-7bb1-416c-bae5-fd8f339ec5a5",
      name: "Klara Södergren",
    });
  });
});
