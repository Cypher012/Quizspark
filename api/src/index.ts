import { Hono } from "hono";
import { AppEnv } from "@/types";
import { authMiddleware } from "@/middleware/auth.middleware";
import { corsMiddleware } from "@/middleware/cors.middleware";
import { auth } from "@/utils/auth";
import healthRoute from "@/modules/health/health.routes";

const app = new Hono<AppEnv>();

app.use("*", corsMiddleware);
app.use("*", authMiddleware);

app.get("/", (c) => {
  return c.text(`Hello Hono!, ${JSON.stringify(c.env)}`);
});

app.route("/health", healthRoute);

const api = app.basePath("/api");

api.on(["POST", "GET"], "/auth/*", (c) => auth.handler(c.req.raw));

export default app;
