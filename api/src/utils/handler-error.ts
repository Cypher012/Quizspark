import { Context } from "hono";
import { NotFoundError, ConflictError, BadRequestError } from "./errors";

export function handleError(e: unknown, c: Context) {
  if (e instanceof NotFoundError) {
    return c.json({ message: e.message }, 404 as any);
  }
  if (e instanceof ConflictError) {
    return c.json({ message: e.message }, 409 as any);
  }
  if (e instanceof BadRequestError) {
    return c.json({ message: e.message }, 400 as any);
  }
  return c.json({ message: "Internal server error" }, 500 as any);
}
