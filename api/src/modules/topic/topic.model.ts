export type TopicRecord = {
  id: string;
  courseId: string;
  title: string;
  note: string | null;
};

export type TopicResponse = {
  id: string;
  title: string;
  note: string | null;
};

export type TopicCourseResponse = {
  id: string;
  title: string;
  note: string | null;
  courseTitle: string | null;
  courseCode: string | null;
};

export type CreateTopicParams = {
  id: string;
  courseId: string;
  title: string;
  note: string | null;
};

export type UpdateTopicParams = {
  title: string;
  note: string | null;
};
