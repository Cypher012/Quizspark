import { createRoute, z } from "@hono/zod-openapi";

const healthRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Health"],
  summary: "Health check",
  responses: {
    200: {
      description: "API is healthy",
      content: {
        "application/json": {
          schema: z.object({
            status: z.string(),
            db: z.string(),
          }),
        },
      },
    },
    500: {
      description: "API is unhealthy",
      content: {
        "application/json": {
          schema: z.object({
            status: z.string(),
            db: z.string(),
          }),
        },
      },
    },
  },
});

export { healthRoute };
