import { QuestionRepository } from "./question.repository";
import {
  type CreateQuestionParams,
  type QuestionRecord,
  QuestionResponse,
  QuestionTopicResponse,
  type UpdateQuestionParams,
} from "./question.model";
import { cuid } from "@/utils/cuid";
import { BadRequestError, ConflictError, NotFoundError } from "@/utils/errors";

export class QuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async create(data: Omit<CreateQuestionParams, "id">) {
    this.validateQuestionPayload(data.options, data.correctIndex);

    const existingQuestion = await this.questionRepository.findByContentInTopic(
      data.topicId,
      data.content,
    );

    if (existingQuestion) {
      throw new ConflictError("Question already exists");
    }

    const id = cuid();
    await this.questionRepository.create({ ...data, id });
    return { message: "Question created successfully", id };
  }

  async findAll(): Promise<QuestionResponse[]> {
    return this.questionRepository.findAll();
  }

  async findAllByTopic(): Promise<QuestionTopicResponse[]> {
    return this.questionRepository.findAllByTopic();
  }

  async findById(id: string): Promise<QuestionResponse> {
    const question = await this.questionRepository.findById(id);
    if (!question) throw new NotFoundError("Question not found");
    return question;
  }

  async findByID(id: string): Promise<QuestionResponse> {
    return this.findById(id);
  }

  async update(id: string, data: Partial<UpdateQuestionParams>) {
    const existingQuestion = await this.getExistingQuestion(id);
    if (Object.keys(data).length === 0) {
      return;
    }

    this.validateQuestionPayload(
      data.options ?? existingQuestion.options,
      data.correctIndex ?? existingQuestion.correctIndex,
    );

    const nextContent = data.content ?? existingQuestion.content;
    const duplicateQuestion =
      await this.questionRepository.findByContentInTopic(
        existingQuestion.topicId,
        nextContent,
        id,
      );

    if (duplicateQuestion) {
      throw new ConflictError("Question already exists");
    }

    await this.questionRepository.update(id, data);
  }

  async delete(id: string) {
    await this.getExistingQuestion(id);
    await this.questionRepository.delete(id);
  }

  private async getExistingQuestion(id: string): Promise<QuestionRecord> {
    const question = await this.questionRepository.findRecordById(id);
    if (!question) throw new NotFoundError("Question not found");
    return question;
  }

  private validateQuestionPayload(options: string[], correctIndex: number) {
    if (options.length === 0) {
      throw new BadRequestError("Question must have at least one option");
    }

    if (!Number.isInteger(correctIndex) || correctIndex < 0) {
      throw new BadRequestError("Correct index must be a non-negative integer");
    }

    if (correctIndex >= options.length) {
      throw new BadRequestError("Correct index is out of range for the options");
    }
  }
}
