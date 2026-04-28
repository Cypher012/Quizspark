import { CourseRepository, type CourseRecord } from "./course.repository";
import { NotFoundError, ConflictError } from "@/utils/errors";

export class CourseService {
  constructor(private repo: CourseRepository) {}

  async getAllCourses(): Promise<CourseRecord[]> {
    return this.repo.findAll();
  }

  async getCourseById(id: string): Promise<CourseRecord> {
    const course = await this.repo.findById(id);
    if (!course) throw new NotFoundError("Course not found");
    return course;
  }

  async createCourse(data: {
    courseTitle: string;
    courseCode: string;
    courseDescription: string;
  }) {
    const existing = await this.repo.findByCode(data.courseCode);
    if (existing) throw new ConflictError("Course code already exists");

    const id = data.courseCode.toLowerCase().replace(/\s+/g, "-");
    await this.repo.create({ id, ...data });
    return { message: "Course created successfully", id };
  }

  async updateCourse(
    id: string,
    data: Partial<{
      courseTitle: string;
      courseCode: string;
      courseDescription: string;
    }>,
  ) {
    await this.getCourseById(id); // throws if not found
    await this.repo.update(id, data);
  }

  async deleteCourse(id: string) {
    await this.getCourseById(id); // throws if not found
    await this.repo.delete(id);
  }
}
