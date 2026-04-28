import { queryOptions } from '@tanstack/react-query'

import { coursesQueryOptions } from '#/features/course/queries'
import { getTopicById, getTopicsWithCourse } from '#/lib/api/topics'

export const topicQueryKeys = {
  all: ['topics'] as const,
  withCourse: ['topics', 'with-course'] as const,
  detail: (topicId: string) => ['topics', topicId] as const,
}

export const topicsWithCourseQueryOptions = queryOptions({
  queryKey: topicQueryKeys.withCourse,
  queryFn: getTopicsWithCourse,
})

export function topicDetailQueryOptions(topicId: string) {
  return queryOptions({
    queryKey: topicQueryKeys.detail(topicId),
    queryFn: () => getTopicById(topicId),
  })
}

export { coursesQueryOptions }
