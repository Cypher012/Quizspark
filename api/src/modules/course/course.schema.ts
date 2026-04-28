import { createRoute, z } from "@hono/zod-openapi";

const CourseSchema = z.object({
  id: z.string(),
  courseTitle: z.string(),
  courseCode: z.string(),
  courseDescription: z.string(),
});

const CourseNotFoundSchema = z.object({
  message: z.string(),
});

const ErrorMessageSchema = z.object({
  message: z.string(),
});

const CreateCourseResponseSchema = z.object({
  message: z.string(),
  id: z.string(),
});

const getAllCoursesRoute = createRoute({
  method: "get",
  path: "/",
  tags: ["Courses"],
  summary: "Get all courses",
  responses: {
    200: {
      description: "List of courses",
      content: {
        "application/json": {
          schema: z.array(CourseSchema),
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

const getCourseByIdRoute = createRoute({
  method: "get",
  path: "/:id",
  tags: ["Courses"],
  summary: "Get course by ID",
  responses: {
    200: {
      description: "Course found",
      content: {
        "application/json": {
          schema: CourseSchema,
        },
      },
    },
    404: {
      description: "Course not found",
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

const createCourseRoute = createRoute({
  method: "post",
  path: "/",
  tags: ["Courses"],
  summary: "Create a course",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            courseTitle: z.string().min(1),
            courseCode: z.string().min(1),
            courseDescription: z.string().min(1),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: "Course created",
      content: {
        "application/json": {
          schema: CreateCourseResponseSchema,
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
      description: "Course code already exists",
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

const deleteCourseRoute = createRoute({
  method: "delete",
  path: "/:id",
  tags: ["Courses"],
  summary: "Delete a course",
  responses: {
    200: {
      description: "Course deleted",
      content: {
        "application/json": {
          schema: z.object({ message: z.string() }),
        },
      },
    },
    404: {
      description: "Course not found",
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
  getAllCoursesRoute,
  getCourseByIdRoute,
  createCourseRoute,
  deleteCourseRoute,
  CourseSchema,
  CourseNotFoundSchema,
  CreateCourseResponseSchema,
};
