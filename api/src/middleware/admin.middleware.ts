import { Context } from "hono";
import { AppEnv } from "@/types";

export function requireAdmin(c: Context<AppEnv>) {
  const user = c.get("user");

  if (!user) {
    return c.json({ message: "Unauthorized" }, 401 as const);
  }

  if (user.role !== "admin") {
    return c.json({ message: "Forbidden" }, 403 as const);
  }

  return null;
}
