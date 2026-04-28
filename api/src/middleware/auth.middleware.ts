import { createMiddleware } from "hono/factory";
import { AppEnv } from "@/types";
import { getAuth } from "@/utils/auth";

export const authMiddleware = createMiddleware<AppEnv>(async (c, next) => {
  const auth = getAuth(c.env);
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) {
    c.set("user", null);
    c.set("session", null);
    await next();
    return;
  }
  c.set("user", session.user);
  c.set("session", session.session);
  await next();
});
