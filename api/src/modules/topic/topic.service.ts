import { TopicRepository } from "./topic.repository";
import {
  type CreateTopicParams,
  TopicCourseResponse,
  type TopicRecord,
  TopicResponse,
  type UpdateTopicParams,
} from "./topic.model";
import { cuid } from "@/utils/cuid";
import { ConflictError, NotFoundError } from "@/utils/errors";

export class TopicService {
  constructor(private readonly topicRepository: TopicRepository) {}

  async create(data: Omit<CreateTopicParams, "id">) {
    const existingTopic = await this.topicRepository.findByTitleInCourse(
      data.courseId,
      data.title,
    );

    if (existingTopic) {
      throw new ConflictError("Topic already exists");
    }

    const id = cuid();
    await this.topicRepository.create({ ...data, id });
    return { message: "Topic created successfully", id };
  }

  async findAll(): Promise<TopicResponse[]> {
    return this.topicRepository.findAll();
  }

  async findAllByCourse(): Promise<TopicCourseResponse[]> {
    return this.topicRepository.findAllByCourse();
  }

  async findById(id: string): Promise<TopicResponse> {
    const topic = await this.topicRepository.findById(id);
    if (!topic) throw new NotFoundError("Topic not found");
    return topic;
  }

  async findByID(id: string): Promise<TopicResponse> {
    return this.findById(id);
  }

  async update(id: string, data: Partial<UpdateTopicParams>) {
    const existingTopic = await this.getExistingTopic(id);
    if (Object.keys(data).length === 0) {
      return;
    }

    const nextTitle = data.title ?? existingTopic.title;
    const duplicateTopic = await this.topicRepository.findByTitleInCourse(
      existingTopic.courseId,
      nextTitle,
      id,
    );

    if (duplicateTopic) {
      throw new ConflictError("Topic already exists");
    }

    await this.topicRepository.update(id, data);
  }

  async delete(id: string) {
    await this.getExistingTopic(id);
    await this.topicRepository.delete(id);
  }

  private async getExistingTopic(id: string): Promise<TopicRecord> {
    const topic = await this.topicRepository.findRecordById(id);
    if (!topic) throw new NotFoundError("Topic not found");
    return topic;
  }
}
