import axios from 'axios'
import type { AxiosError } from 'axios'

import { env } from '#/env'

type ApiErrorPayload = {
  message?: string
}

export const apiClient = axios.create({
  baseURL: env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
})

export class ApiError extends Error {
  status: number
  payload: unknown

  constructor(message: string, status: number, payload: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.payload = payload
  }
}

export function toApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const response = error.response
    const payload = response?.data
    const message =
      typeof payload === 'object' &&
      payload !== null &&
      'message' in payload &&
      typeof (payload as ApiErrorPayload).message === 'string'
        ? (payload as ApiErrorPayload).message
        : error.message || 'Request failed.'

    return new ApiError(message, response?.status ?? 500, payload)
  }

  if (error instanceof ApiError) {
    return error
  }

  return new ApiError('Request failed.', 500, error)
}

export function getErrorMessage(
  error: unknown,
  fallback = 'Something went wrong.',
) {
  if (error instanceof ApiError) {
    return error.message
  }

  if (axios.isAxiosError(error)) {
    return toApiError(error as AxiosError).message
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}
