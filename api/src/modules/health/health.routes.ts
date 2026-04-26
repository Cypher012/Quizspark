import { Hono } from "hono";
import { AppEnv } from "@/types";
import { sql } from "drizzle-orm";
import { createDb } from "@/db";

const health = new Hono<AppEnv>();

health.get("/", async (c) => {
  try {
    const db = createDb(c.env.DB);
    await db.run(sql`SELECT 1`);
    return c.json({ status: "ok", db: "connected" });
  } catch (e) {
    return c.json({ status: "error", db: String(e) }, 500);
  }
});

export default health;
