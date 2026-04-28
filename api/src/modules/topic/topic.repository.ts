import { and, eq, ne } from "drizzle-orm";
import { course, topic } from "@/db/schema";
import { createDb } from "@/db";
import {
  type CreateTopicParams,
  type TopicRecord,
  TopicCourseResponse,
  TopicResponse,
  type UpdateTopicParams,
} from "./topic.model";

const topicSelectFields = {
  id: topic.id,
  title: topic.title,
  note: topic.note,
};

const topicRecordSelectFields = {
  id: topic.id,
  courseId: topic.courseId,
  title: topic.title,
  note: topic.note,
};

const topicCourseSelectFields = {
  id: topic.id,
  title: topic.title,
  note: topic.note,
  courseTitle: course.courseTitle,
  courseCode: course.courseCode,
};

export class TopicRepository {
  constructor(private db: ReturnType<typeof createDb>) {}

  async create(data: CreateTopicParams) {
    await this.db.insert(topic).values(data);
  }

  async findAll(): Promise<TopicResponse[]> {
    return this.db.select(topicSelectFields).from(topic);
  }

  async findAllByCourse(): Promise<TopicCourseResponse[]> {
    return this.db
      .select(topicCourseSelectFields)
      .from(topic)
      .leftJoin(course, eq(topic.courseId, course.id));
  }

  async findById(id: string): Promise<TopicResponse | null> {
    const result = await this.db
      .select(topicSelectFields)
      .from(topic)
      .where(eq(topic.id, id))
      .limit(1);

    return result[0] ?? null;
  }

  async findByID(id: string): Promise<TopicResponse | null> {
    return this.findById(id);
  }

  async findRecordById(id: string): Promise<TopicRecord | null> {
    const result = await this.db
      .select(topicRecordSelectFields)
      .from(topic)
      .where(eq(topic.id, id))
      .limit(1);

    return result[0] ?? null;
  }

  async findByTitleInCourse(
    courseId: string,
    title: string,
    excludeId?: string,
  ): Promise<TopicRecord | null> {
    const result = await this.db
      .select(topicRecordSelectFields)
      .from(topic)
      .where(
        excludeId
          ? and(
              eq(topic.courseId, courseId),
              eq(topic.title, title),
              ne(topic.id, excludeId),
            )
          : and(eq(topic.courseId, courseId), eq(topic.title, title)),
      )
      .limit(1);

    return result[0] ?? null;
  }

  async update(id: string, data: Partial<UpdateTopicParams>) {
    if (Object.keys(data).length === 0) {
      return;
    }

    await this.db.update(topic).set(data).where(eq(topic.id, id));
  }

  async delete(id: string) {
    await this.db.delete(topic).where(eq(topic.id, id));
  }
}
