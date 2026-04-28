export type TopicResponse = {
  id: string;
  title: string;
  content: string | null;
};

export type TopicCourseResponse = {
  id: string;
  title: string;
  content: string | null;
  courseTitle: string | null;
  courseCode: string | null;
};

export type CreateTopicParams = {
  id: string;
  courseId: string;
  title: string;
  content: string;
};

export type UpdateTopicParams = {
  id: string;
  title: string;
  content: string;
};
