import type { Course } from '#/features/course/types'

export type { Course }

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
