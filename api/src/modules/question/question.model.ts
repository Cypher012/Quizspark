export type QuestionRecord = {
  id: string;
  topicId: string;
  content: string;
  options: string[];
  correctIndex: number;
  explanation: string | null;
};

export type QuestionResponse = {
  id: string;
  content: string;
  options: string[];
  correctIndex: number;
  explanation: string | null;
};

export type QuestionTopicResponse = {
  id: string;
  content: string;
  options: string[];
  correctIndex: number;
  explanation: string | null;
  topicTitle: string | null;
};

export type CreateQuestionParams = {
  id: string;
  topicId: string;
  content: string;
  options: string[];
  correctIndex: number;
  explanation: string | null;
};

export type UpdateQuestionParams = {
  content: string;
  options: string[];
  correctIndex: number;
  explanation: string | null;
};
