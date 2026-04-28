import { OpenAPIHono } from "@hono/zod-openapi";
import { AppEnv } from "@/types";
import { createDb } from "@/db";
import { CourseRepository } from "./course.repository";
import { CourseService } from "./course.service";
import {
  getAllCoursesRoute,
  getCourseByIdRoute,
  createCourseRoute,
  deleteCourseRoute,
} from "./course.schema";
import { handleError } from "@/utils/handler-error";
import { requireAdmin } from "@/middleware/admin.middleware";

const course = new OpenAPIHono<AppEnv>();

function getService(db: D1Database) {
  const repo = new CourseRepository(createDb(db));
  return new CourseService(repo);
}

course.openapi(getAllCoursesRoute, async (c) => {
  try {
    const service = getService(c.env.DB);
    const courses = await service.getAllCourses();
    return c.json(courses, 200);
  } catch (e) {
    console.error(e);
    return handleError(e, c);
  }
});

course.openapi(getCourseByIdRoute, async (c) => {
  try {
    const service = getService(c.env.DB);
    const found = await service.getCourseById(c.req.param("id"));
    return c.json(found, 200);
  } catch (e) {
    console.error(e);
    return handleError(e, c);
  }
});

course.openapi(createCourseRoute, async (c) => {
  const denied = requireAdmin(c);
  if (denied) return denied;

  try {
    const service = getService(c.env.DB);
    const body = c.req.valid("json");
    const result = await service.createCourse(body);
    return c.json(result, 201);
  } catch (e) {
    console.error(e);
    return handleError(e, c);
  }
});

course.openapi(deleteCourseRoute, async (c) => {
  const denied = requireAdmin(c);
  if (denied) return denied;

  try {
    const service = getService(c.env.DB);
    await service.deleteCourse(c.req.param("id"));
    return c.json({ message: "Course deleted" }, 200);
  } catch (e) {
    console.error(e);
    return handleError(e, c);
  }
});

export default course;
