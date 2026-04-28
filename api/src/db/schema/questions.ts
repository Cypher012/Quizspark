// table questions {
//   id uuid pk [not null]
//   topic_id uuid [not null, ref: > topics.id]
//   content text [not null]
//   options text [not null]
//   correct_index int [not null]
//   explanation text
// }

import { sqliteTable, text, index, integer } from "drizzle-orm/sqlite-core";
import { timestamps } from "../helpers";
import { topic } from "./topic";

export const question = sqliteTable(
  "questions",
  {
    id: text("id").primaryKey(),
    topicId: text("topic_id")
      .notNull()
      .references(() => topic.id),
    content: text("content").notNull(),
    options: text("options").notNull(),
    correctIndex: integer("correct_index").notNull(),
    explanation: text("explanation"),
    ...timestamps,
  },
  (table) => [index("questions_topic_id_idx").on(table.topicId)],
);
