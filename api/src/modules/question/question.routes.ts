import { OpenAPIHono } from "@hono/zod-openapi";
import { AppEnv } from "@/types";
import { createDb } from "@/db";
import { requireAdmin } from "@/middleware/admin.middleware";
import { handleError } from "@/utils/handler-error";
import { QuestionRepository } from "./question.repository";
import { QuestionService } from "./question.service";
import {
  createQuestionRoute,
  deleteQuestionRoute,
  getAllQuestionsByTopicRoute,
  getAllQuestionsRoute,
  getQuestionByIdRoute,
} from "./question.schema";

const question = new OpenAPIHono<AppEnv>();

function getService(db: D1Database) {
  const repo = new QuestionRepository(createDb(db));
  return new QuestionService(repo);
}

question.openapi(getAllQuestionsRoute, async (c) => {
  try {
    const service = getService(c.env.DB);
    const questions = await service.findAll();
    return c.json(questions, 200);
  } catch (e) {
    console.error(e);
    return handleError(e, c);
  }
});

question.openapi(getAllQuestionsByTopicRoute, async (c) => {
  try {
    const service = getService(c.env.DB);
    const questions = await service.findAllByTopic();
    return c.json(questions, 200);
  } catch (e) {
    console.error(e);
    return handleError(e, c);
  }
});

question.openapi(getQuestionByIdRoute, async (c) => {
  try {
    const service = getService(c.env.DB);
    const found = await service.findById(c.req.param("id"));
    return c.json(found, 200);
  } catch (e) {
    console.error(e);
    return handleError(e, c);
  }
});

question.openapi(createQuestionRoute, async (c) => {
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

question.openapi(deleteQuestionRoute, async (c) => {
  const denied = requireAdmin(c);
  if (denied) return denied;

  try {
    const service = getService(c.env.DB);
    await service.delete(c.req.param("id"));
    return c.json({ message: "Question deleted" }, 200);
  } catch (e) {
    console.error(e);
    return handleError(e, c);
  }
});

export default question;
