import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamps } from "../helpers";

export const course = sqliteTable("courses", {
  id: text("id").primaryKey(),
  courseTitle: text("course_title").notNull(),
  courseCode: text("course_code").notNull().unique(),
  courseDescription: text("course_description").notNull(),
  ...timestamps,
});
