import { queryOptions } from '@tanstack/react-query'

import { getCourseById, getCourses } from '#/lib/api/courses'
import { getTopicsWithCourse } from '#/lib/api/topics'
import type { Course, TopicWithCourse } from './types'

export const courseQueryKeys = {
  all: ['courses'] as const,
  detail: (courseId: string) => ['courses', courseId] as const,
  topicsWithCourse: ['topics', 'with-course'] as const,
}

export const coursesQueryOptions = queryOptions({
  queryKey: courseQueryKeys.all,
  queryFn: getCourses,
})

export function courseDetailQueryOptions(courseId: string) {
  return queryOptions({
    queryKey: courseQueryKeys.detail(courseId),
    queryFn: () => getCourseById(courseId),
  })
}

export const topicsWithCourseQueryOptions = queryOptions({
  queryKey: courseQueryKeys.topicsWithCourse,
  queryFn: getTopicsWithCourse,
})

export function getRelatedTopics(course: Course, topics: TopicWithCourse[]) {
  const topicsMatchedByCode = topics.filter(
    (topic) => topic.courseCode === course.courseCode,
  )

  if (topicsMatchedByCode.length > 0) {
    return topicsMatchedByCode
  }

  return topics.filter((topic) => topic.courseTitle === course.courseTitle)
}
