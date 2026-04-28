export type Course = {
  id: string
  courseTitle: string
  courseCode: string
  courseDescription: string
}

export type Topic = {
  id: string
  title: string
  note: string | null
}

export type TopicWithCourse = {
  id: string
  title: string
  note: string | null
  courseTitle: string | null
  courseCode: string | null
}
