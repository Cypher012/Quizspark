import type { Topic, TopicWithCourse } from '#/features/topic/types'
import { apiClient } from './client'

export type CreateTopicPayload = {
  courseId: string
  title: string
  note: string | null
}

export type CreateTopicResponse = {
  message: string
  id: string
}

export type DeleteTopicResponse = {
  message: string
}

export function getTopicsWithCourse() {
  return apiClient
    .get<TopicWithCourse[]>('/api/topic/course')
    .then((response) => response.data)
}

export function getTopicById(id: string) {
  return apiClient
    .get<Topic>(`/api/topic/${encodeURIComponent(id)}`)
    .then((response) => response.data)
}

export function createTopic(payload: CreateTopicPayload) {
  return apiClient
    .post<CreateTopicResponse>('/api/topic', payload)
    .then((response) => response.data)
}

export function deleteTopic(id: string) {
  return apiClient
    .delete<DeleteTopicResponse>(`/api/topic/${encodeURIComponent(id)}`)
    .then((response) => response.data)
}
