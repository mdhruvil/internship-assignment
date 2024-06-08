import { Hono } from "hono";


export const app = new Hono().basePath("/api/v1");

app.get("/", (c) => {
  return c.json({ message: "Hello World" });
});
