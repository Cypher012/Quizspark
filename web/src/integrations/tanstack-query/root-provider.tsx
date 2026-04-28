import { QueryClient } from '@tanstack/react-query'
import { ApiError } from '#/lib/api/client'

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry(failureCount, error) {
          if (
            error instanceof ApiError &&
            [401, 403, 404].includes(error.status)
          ) {
            return false
          }

          return failureCount < 2
        },
      },
      mutations: {
        retry: false,
      },
    },
  })
}

export function getContext() {
  const queryClient = makeQueryClient()

  return {
    queryClient,
  }
}
