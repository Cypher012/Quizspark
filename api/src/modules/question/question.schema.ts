import { createRoute, z } from "@hono/zod-openapi";

const QuestionSchema = z.object({
  id: z.string(),
  content: z.string(),
  options: z.array(z.string()),
  correctIndex: z.number().int(),
  explanation: z.string().nullable(),
});

const QuestionWithTopicSchema = z.object({
  id: z.string(),
  content: z.string(),
  options: z.array(z.string()),
  correctIndex: z.number().int(),
  explanation: z.string().nullable(),
  topicTitle: z.string().nullable(),
});

const ErrorMessageSchema = z.object({
  message: z.string(),
});

const CreateQuestionResponseSchema = z.object({
  message: z.string(),
  id: z.string(),
});

const getAllQuestionsRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Questions"],
  summary: "Get all questions",
  responses: {
    200: {
      description: "List of questions",
      content: {
        "application/json": {
          schema: z.array(QuestionSchema),
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

const getAllQuestionsByTopicRoute = createRoute({
  method: "get",
  path: "/topic",
  tags: ["Questions"],
  summary: "Get all questions with topic details",
  responses: {
    200: {
      description: "List of questions with topic details",
      content: {
        "application/json": {
          schema: z.array(QuestionWithTopicSchema),
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

const getQuestionByIdRoute = createRoute({
  method: "get",
  path: "/:id",
  tags: ["Questions"],
  summary: "Get question by ID",
  responses: {
    200: {
      description: "Question found",
      content: {
        "application/json": {
          schema: QuestionSchema,
        },
      },
    },
    404: {
      description: "Question not found",
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

const createQuestionRoute = createRoute({
  method: "post",
  path: "/",
  tags: ["Questions"],
  summary: "Create a question",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            topicId: z.string().min(1),
            content: z.string().min(1),
            options: z.array(z.string().min(1)).min(1),
            correctIndex: z.number().int().min(0),
            explanation: z.string().nullable(),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: "Question created",
      content: {
        "application/json": {
          schema: CreateQuestionResponseSchema,
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
      description: "Question already exists",
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

const deleteQuestionRoute = createRoute({
  method: "delete",
  path: "/:id",
  tags: ["Questions"],
  summary: "Delete a question",
  responses: {
    200: {
      description: "Question deleted",
      content: {
        "application/json": {
          schema: z.object({ message: z.string() }),
        },
      },
    },
    404: {
      description: "Question not found",
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
  createQuestionRoute,
  deleteQuestionRoute,
  CreateQuestionResponseSchema,
  getAllQuestionsByTopicRoute,
  getAllQuestionsRoute,
  getQuestionByIdRoute,
  QuestionSchema,
  QuestionWithTopicSchema,
};
