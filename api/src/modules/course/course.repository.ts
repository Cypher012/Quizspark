import { eq } from "drizzle-orm";
import { course } from "@/db/schema";
import { createDb } from "@/db";

const courseFields = {
  id: course.id,
  courseTitle: course.courseTitle,
  courseCode: course.courseCode,
  courseDescription: course.courseDescription,
};

export type CourseRecord = {
  id: string;
  courseTitle: string;
  courseCode: string;
  courseDescription: string;
};

export class CourseRepository {
  constructor(private db: ReturnType<typeof createDb>) {}

  async create(data: CourseRecord) {
    await this.db.insert(course).values(data);
    return;
  }

  async findAll(): Promise<CourseRecord[]> {
    return this.db.select(courseFields).from(course);
  }

  async findById(id: string): Promise<CourseRecord | null> {
    const result = await this.db
      .select(courseFields)
      .from(course)
      .where(eq(course.id, id))
      .limit(1);
    return result[0] ?? null;
  }

  async findByCode(code: string): Promise<CourseRecord | null> {
    const result = await this.db
      .select(courseFields)
      .from(course)
      .where(eq(course.courseCode, code))
      .limit(1);
    return result[0] ?? null;
  }

  async update(
    id: string,
    data: Partial<{
      courseTitle: string;
      courseCode: string;
      courseDescription: string;
    }>,
  ) {
    await this.db.update(course).set(data).where(eq(course.id, id));
  }

  async delete(id: string) {
    await this.db.delete(course).where(eq(course.id, id));
  }
}
