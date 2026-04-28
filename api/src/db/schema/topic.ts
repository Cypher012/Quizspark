import { sqliteTable, text, index } from "drizzle-orm/sqlite-core";
import { timestamps } from "../helpers";
import { course } from "./course";

export const topic = sqliteTable(
  "topics",
  {
    id: text("id").primaryKey(),
    courseId: text("course_id")
      .notNull()
      .references(() => course.id),
    title: text("title").notNull(),
    note: text("note"),
    ...timestamps,
  },
  (table) => [index("topics_course_id_idx").on(table.courseId)],
);
