import { and, eq, ne } from "drizzle-orm";
import { question, topic } from "@/db/schema";
import { createDb } from "@/db";
import {
  type CreateQuestionParams,
  type QuestionRecord,
  type QuestionResponse,
  type QuestionTopicResponse,
  type UpdateQuestionParams,
} from "./question.model";

const questionSelectFields = {
  id: question.id,
  content: question.content,
  options: question.options,
  correctIndex: question.correctIndex,
  explanation: question.explanation,
};

const questionRecordSelectFields = {
  id: question.id,
  topicId: question.topicId,
  content: question.content,
  options: question.options,
  correctIndex: question.correctIndex,
  explanation: question.explanation,
};

const questionTopicSelectFields = {
  id: question.id,
  content: question.content,
  options: question.options,
  correctIndex: question.correctIndex,
  explanation: question.explanation,
  topicTitle: topic.title,
};

type QuestionListRow = {
  id: string;
  content: string;
  options: string;
  correctIndex: number;
  explanation: string | null;
};

type QuestionRecordRow = QuestionListRow & {
  topicId: string;
};

type QuestionTopicRow = QuestionListRow & {
  topicTitle: string | null;
};

function parseOptions(options: string): string[] {
  const parsed = JSON.parse(options);
  if (!Array.isArray(parsed) || !parsed.every((option) => typeof option === "string")) {
    throw new Error("Invalid question options format");
  }

  return parsed;
}

function stringifyOptions(options: string[]): string {
  return JSON.stringify(options);
}

function mapQuestionRow(row: QuestionListRow): QuestionResponse {
  return {
    id: row.id,
    content: row.content,
    options: parseOptions(row.options),
    correctIndex: row.correctIndex,
    explanation: row.explanation,
  };
}

function mapQuestionRecordRow(row: QuestionRecordRow): QuestionRecord {
  return {
    id: row.id,
    topicId: row.topicId,
    content: row.content,
    options: parseOptions(row.options),
    correctIndex: row.correctIndex,
    explanation: row.explanation,
  };
}

function mapQuestionTopicRow(row: QuestionTopicRow): QuestionTopicResponse {
  return {
    id: row.id,
    content: row.content,
    options: parseOptions(row.options),
    correctIndex: row.correctIndex,
    explanation: row.explanation,
    topicTitle: row.topicTitle,
  };
}

function toQuestionInsert(data: CreateQuestionParams) {
  return {
    ...data,
    options: stringifyOptions(data.options),
  };
}

function toQuestionUpdate(data: Partial<UpdateQuestionParams>) {
  const { options, ...rest } = data;

  return {
    ...rest,
    ...(options !== undefined ? { options: stringifyOptions(options) } : {}),
  };
}

export class QuestionRepository {
  constructor(private db: ReturnType<typeof createDb>) {}

  async create(data: CreateQuestionParams) {
    await this.db.insert(question).values(toQuestionInsert(data));
  }

  async findAll(): Promise<QuestionResponse[]> {
    const result = await this.db.select(questionSelectFields).from(question);
    return result.map(mapQuestionRow);
  }

  async findAllByTopic(): Promise<QuestionTopicResponse[]> {
    const result = await this.db
      .select(questionTopicSelectFields)
      .from(question)
      .leftJoin(topic, eq(question.topicId, topic.id));

    return result.map(mapQuestionTopicRow);
  }

  async findById(id: string): Promise<QuestionResponse | null> {
    const result = await this.db
      .select(questionSelectFields)
      .from(question)
      .where(eq(question.id, id))
      .limit(1);

    return result[0] ? mapQuestionRow(result[0]) : null;
  }

  async findByID(id: string): Promise<QuestionResponse | null> {
    return this.findById(id);
  }

  async findRecordById(id: string): Promise<QuestionRecord | null> {
    const result = await this.db
      .select(questionRecordSelectFields)
      .from(question)
      .where(eq(question.id, id))
      .limit(1);

    return result[0] ? mapQuestionRecordRow(result[0]) : null;
  }

  async findByContentInTopic(
    topicId: string,
    content: string,
    excludeId?: string,
  ): Promise<QuestionRecord | null> {
    const result = await this.db
      .select(questionRecordSelectFields)
      .from(question)
      .where(
        excludeId
          ? and(
              eq(question.topicId, topicId),
              eq(question.content, content),
              ne(question.id, excludeId),
            )
          : and(eq(question.topicId, topicId), eq(question.content, content)),
      )
      .limit(1);

    return result[0] ? mapQuestionRecordRow(result[0]) : null;
  }

  async update(id: string, data: Partial<UpdateQuestionParams>) {
    if (Object.keys(data).length === 0) {
      return;
    }

    await this.db.update(question).set(toQuestionUpdate(data)).where(eq(question.id, id));
  }

  async delete(id: string) {
    await this.db.delete(question).where(eq(question.id, id));
  }
}
