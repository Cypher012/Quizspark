import { OpenAPIHono } from "@hono/zod-openapi";
import { AppEnv } from "@/types";
import { createDb } from "@/db";
import { requireAdmin } from "@/middleware/admin.middleware";
import { handleError } from "@/utils/handler-error";
import { TopicRepository } from "./topic.repository";
import { TopicService } from "./topic.service";
import {
  createTopicRoute,
  deleteTopicRoute,
  getAllTopicsByCourseRoute,
  getAllTopicsRoute,
  getTopicByIdRoute,
} from "./topic.schema";

const topic = new OpenAPIHono<AppEnv>();

function getService(db: D1Database) {
  const repo = new TopicRepository(createDb(db));
  return new TopicService(repo);
}

topic.openapi(getAllTopicsRoute, async (c) => {
  try {
    const service = getService(c.env.DB);
    const topics = await service.findAll();
    return c.json(topics, 200);
  } catch (e) {
    console.error(e);
    return handleError(e, c);
  }
});

topic.openapi(getAllTopicsByCourseRoute, async (c) => {
  try {
    const service = getService(c.env.DB);
    const topics = await service.findAllByCourse();
    return c.json(topics, 200);
  } catch (e) {
    console.error(e);
    return handleError(e, c);
  }
});

topic.openapi(getTopicByIdRoute, async (c) => {
  try {
    const service = getService(c.env.DB);
    const found = await service.findById(c.req.param("id"));
    return c.json(found, 200);
  } catch (e) {
    console.error(e);
    return handleError(e, c);
  }
});

topic.openapi(createTopicRoute, async (c) => {
  const denied = requireAdmin(c);
  if (denied) return denied;

  try {
    const service = getService(c.env.DB);
    const body = c.req.valid("json");
    const result = await service.create(body);
    return c.json(result, 201);
  } catch (e) {
    console.error(e);
    return handleError(e, c);
  }
});

topic.openapi(deleteTopicRoute, async (c) => {
  const denied = requireAdmin(c);
  if (denied) return denied;

  try {
    const service = getService(c.env.DB);
    await service.delete(c.req.param("id"));
    return c.json({ message: "Topic deleted" }, 200);
  } catch (e) {
    console.error(e);
    return handleError(e, c);
  }
});

export default topic;
