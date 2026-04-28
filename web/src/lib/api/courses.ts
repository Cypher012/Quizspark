import type { Course } from '#/features/course/types'
import { apiClient } from './client'

export type CreateCoursePayload = {
  courseTitle: string
  courseCode: string
  courseDescription: string
}

export type CreateCourseResponse = {
  message: string
  id: string
}

export type DeleteCourseResponse = {
  message: string
}

export function getCourses() {
  return apiClient.get<Course[]>('/api/course').then((response) => response.data)
}

export function getCourseById(id: string) {
  return apiClient
    .get<Course>(`/api/course/${encodeURIComponent(id)}`)
    .then((response) => response.data)
}

export function createCourse(payload: CreateCoursePayload) {
  return apiClient
    .post<CreateCourseResponse>('/api/course', payload)
    .then((response) => response.data)
}

export function deleteCourse(id: string) {
  return apiClient
    .delete<DeleteCourseResponse>(`/api/course/${encodeURIComponent(id)}`)
    .then((response) => response.data)
}
