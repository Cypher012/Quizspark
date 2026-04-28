import { AppEnv } from "@/types";
import { authMiddleware } from "@/middleware/auth.middleware";
import { corsMiddleware } from "@/middleware/cors.middleware";
import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";
import { getAuth } from "@/utils/auth";
import healthRoute from "@/modules/health/health.routes";
import courseRoute from "@/modules/course/course.routes";
import questionRoute from "@/modules/question/question.routes";
import topicRoute from "@/modules/topic/topic.routes";

const app = new OpenAPIHono<AppEnv>();

app.use("*", corsMiddleware);
app.use("*", authMiddleware);

app.get("/", (c) => {
  return c.json({ message: "QuizSpark Backend APIs" }, 200);
});

const api = app.basePath("/api");

api.doc("/openapi.json", {
  openapi: "3.1.0",
  info: {
    title: "QuizSpark API",
    version: "1.0.0",
  },
});

api.get(
  "/docs",
  apiReference({
    url: "/api/openapi.json",
  }),
);

api.on(["POST", "GET"], "/auth/*", (c) => getAuth(c.env).handler(c.req.raw));
api.route("/health", healthRoute);
api.route("/course", courseRoute);
api.route("/topic", topicRoute);
api.route("/question", questionRoute);

export default app;
