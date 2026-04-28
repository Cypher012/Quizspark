import { createRoute, z } from "@hono/zod-openapi";

const TopicSchema = z.object({
  id: z.string(),
  title: z.string(),
  note: z.string().nullable(),
});

const TopicWithCourseSchema = z.object({
  id: z.string(),
  title: z.string(),
  note: z.string().nullable(),
  courseTitle: z.string().nullable(),
  courseCode: z.string().nullable(),
});

const ErrorMessageSchema = z.object({
  message: z.string(),
});

const CreateTopicResponseSchema = z.object({
  message: z.string(),
  id: z.string(),
});

const getAllTopicsRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Topics"],
  summary: "Get all topics",
  responses: {
    200: {
      description: "List of topics",
      content: {
        "application/json": {
          schema: z.array(TopicSchema),
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: ErrorMessageSchema,
        },
      },
    },
  },
});

const getAllTopicsByCourseRoute = createRoute({
  method: "get",
  path: "/course",
  tags: ["Topics"],
  summary: "Get all topics with course details",
  responses: {
    200: {
      description: "List of topics with course details",
      content: {
        "application/json": {
          schema: z.array(TopicWithCourseSchema),
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: ErrorMessageSchema,
        },
      },
    },
  },
});

const getTopicByIdRoute = createRoute({
  method: "get",
  path: "/:id",
  tags: ["Topics"],
  summary: "Get topic by ID",
  responses: {
    200: {
      description: "Topic found",
      content: {
        "application/json": {
          schema: TopicSchema,
        },
      },
    },
    404: {
      description: "Topic not found",
      content: {
        "application/json": {
          schema: ErrorMessageSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: ErrorMessageSchema,
        },
      },
    },
  },
});

const createTopicRoute = createRoute({
  method: "post",
  path: "/",
  tags: ["Topics"],
  summary: "Create a topic",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            courseId: z.string().min(1),
            title: z.string().min(1),
            note: z.string().nullable(),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: "Topic created",
      content: {
        "application/json": {
          schema: CreateTopicResponseSchema,
        },
      },
    },
    400: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: ErrorMessageSchema,
        },
      },
    },
    409: {
      description: "Topic already exists",
      content: {
        "application/json": {
          schema: ErrorMessageSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: ErrorMessageSchema,
        },
      },
    },
  },
});

const deleteTopicRoute = createRoute({
  method: "delete",
  path: "/:id",
  tags: ["Topics"],
  summary: "Delete a topic",
  responses: {
    200: {
      description: "Topic deleted",
      content: {
        "application/json": {
          schema: z.object({ message: z.string() }),
        },
      },
    },
    404: {
      description: "Topic not found",
      content: {
        "application/json": {
          schema: ErrorMessageSchema,
        },
      },
    },
    500: {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: ErrorMessageSchema,
        },
      },
    },
  },
});

export {
  getAllTopicsRoute,
  getAllTopicsByCourseRoute,
  getTopicByIdRoute,
  createTopicRoute,
  deleteTopicRoute,
  CreateTopicResponseSchema,
  TopicSchema,
  TopicWithCourseSchema,
};
