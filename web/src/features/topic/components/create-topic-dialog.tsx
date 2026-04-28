import { useState } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#/components/ui/dialog'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'
import { createTopic } from '#/lib/api/topics'
import { getErrorMessage, toApiError } from '#/lib/api/client'
import { getValidationMessage } from '../form-utils'
import { coursesQueryOptions, topicQueryKeys } from '../queries'
import { MarkdownFileInput } from './markdown-file-input'

type CreateTopicDialogProps = {
  onCreated?: (id: string) => Promise<void> | void
  coursePreset?: {
    id: string
    courseTitle?: string
    courseCode?: string
  }
  triggerLabel?: string
  triggerVariant?: 'default' | 'outline' | 'secondary' | 'ghost'
  triggerNode?: ReactNode
}

type TopicFormValues = {
  courseId: string
  title: string
  note: string
}

const initialValues: TopicFormValues = {
  courseId: '',
  title: '',
  note: '',
}

export function CreateTopicDialog({
  onCreated,
  coursePreset,
  triggerLabel = 'New topic',
  triggerVariant = 'default',
  triggerNode,
}: CreateTopicDialogProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [fileErrorMessage, setFileErrorMessage] = useState<string | null>(null)

  const coursesQuery = useQuery({
    ...coursesQueryOptions,
    enabled: !coursePreset,
  })
  const createTopicMutation = useMutation({
    mutationFn: createTopic,
  })

  const form = useForm({
    defaultValues: {
      ...initialValues,
      courseId: coursePreset?.id ?? '',
    },
    onSubmit: async ({ value, formApi }) => {
      formApi.setErrorMap({ onSubmit: undefined })
      if (!coursePreset) {
        formApi.setFieldMeta('courseId', (previous) => ({
          ...previous,
          errorMap: {
            ...previous.errorMap,
            onSubmit: undefined,
          },
        }))
      }
      formApi.setFieldMeta('title', (previous) => ({
        ...previous,
        errorMap: {
          ...previous.errorMap,
          onSubmit: undefined,
        },
      }))

      if (!value.courseId) {
        if (!coursePreset) {
          formApi.setFieldMeta('courseId', (previous) => ({
            ...previous,
            errorMap: {
              ...previous.errorMap,
              onSubmit: 'Choose a course before creating a topic.',
            },
          }))
        }
        return
      }

      if (fileErrorMessage) {
        formApi.setErrorMap({ onSubmit: fileErrorMessage })
        return
      }

      try {
        const response = await createTopicMutation.mutateAsync({
          courseId: value.courseId,
          title: value.title.trim(),
          note: value.note.trim().length > 0 ? value.note : null,
        })

        await queryClient.invalidateQueries({
          queryKey: topicQueryKeys.withCourse,
        })

        toast.success(response.message)
        formApi.reset()
        setFileErrorMessage(null)
        setOpen(false)

        if (onCreated) {
          await onCreated(response.id)
          return
        }

        await navigate({
          to: '/topics/$topicId',
          params: { topicId: response.id },
        })
      } catch (error) {
        const apiError = toApiError(error)

        if (apiError.status === 409) {
          formApi.setFieldMeta('title', (previous) => ({
            ...previous,
            errorMap: {
              ...previous.errorMap,
              onSubmit: apiError.message,
            },
          }))
          return
        }

        formApi.setErrorMap({ onSubmit: apiError.message })
      }
    },
  })

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)

        if (!nextOpen) {
          form.reset()
          createTopicMutation.reset()
          setFileErrorMessage(null)
        }
      }}
    >
      <DialogTrigger asChild>
        {triggerNode ?? (
          <Button variant={triggerVariant}>
            <PlusIcon className="size-4" />
            {triggerLabel}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create topic</DialogTitle>
          <DialogDescription>
            {coursePreset
              ? 'Add a topic for this course and optionally attach a markdown note file.'
              : 'Choose a course, add a topic title, and optionally upload a markdown file whose text will be stored as the topic note.'}
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-5"
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            void form.handleSubmit()
          }}
        >
          {!coursePreset && coursesQuery.isError ? (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
              <p className="text-sm font-medium">Unable to load courses</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {getErrorMessage(
                  coursesQuery.error,
                  'The course selector could not be loaded.',
                )}
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => void coursesQuery.refetch()}
              >
                Retry
              </Button>
            </div>
          ) : null}

          <FieldGroup>
            {coursePreset ? (
              <Field>
                <FieldLabel>Course</FieldLabel>
                <div className="rounded-lg border bg-muted/30 px-3 py-3">
                  <p className="text-sm font-medium">
                    {coursePreset.courseCode
                      ? `${coursePreset.courseCode} · `
                      : ''}
                    {coursePreset.courseTitle ?? 'Selected course'}
                  </p>
                  <FieldDescription className="mt-1">
                    This topic will be created inside the current course.
                  </FieldDescription>
                </div>
              </Field>
            ) : (
              <form.Field
                name="courseId"
                validators={{
                  onSubmit: ({ value }) =>
                    value ? undefined : 'Course selection is required.',
                }}
              >
                {(field) => (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Course</FieldLabel>
                    <Select
                      value={field.state.value}
                      onValueChange={(nextValue) => {
                        field.handleChange(nextValue)
                        field.setErrorMap({ onSubmit: undefined })
                      }}
                      disabled={coursesQuery.isPending || coursesQuery.isError}
                    >
                      <SelectTrigger
                        id={field.name}
                        className="w-full"
                        aria-invalid={field.state.meta.errors.length > 0}
                      >
                        <SelectValue
                          placeholder={
                            coursesQuery.isPending
                              ? 'Loading courses...'
                              : 'Select a course'
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {(coursesQuery.data ?? []).map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.courseCode} · {course.courseTitle}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError>
                      {getValidationMessage(field.state.meta.errors[0])}
                    </FieldError>
                  </Field>
                )}
              </form.Field>
            )}

            <form.Field
              name="title"
              validators={{
                onSubmit: ({ value }) =>
                  value.trim() ? undefined : 'Topic title is required.',
              }}
            >
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Topic title</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => {
                      field.handleChange(event.target.value)
                      field.setErrorMap({ onSubmit: undefined })
                      form.setErrorMap({ onSubmit: undefined })
                    }}
                    placeholder="Search Algorithms"
                    aria-invalid={field.state.meta.errors.length > 0}
                  />
                  <FieldError>
                    {getValidationMessage(field.state.meta.errors[0])}
                  </FieldError>
                </Field>
              )}
            </form.Field>

            <form.Field name="note">
              {(field) => (
                <MarkdownFileInput
                  value={field.state.value}
                  onChange={(nextValue) => {
                    field.handleChange(nextValue)
                    form.setErrorMap({ onSubmit: undefined })
                  }}
                  onError={setFileErrorMessage}
                />
              )}
            </form.Field>
          </FieldGroup>

          <FieldError>{fileErrorMessage}</FieldError>

          <form.Subscribe selector={(state) => state.errorMap.onSubmit}>
            {(error) => <FieldError>{getValidationMessage(error)}</FieldError>}
          </form.Subscribe>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={createTopicMutation.isPending}
            >
              Cancel
            </Button>
            <form.Subscribe
              selector={(state) => ({
                canSubmit: state.canSubmit,
                isSubmitting: state.isSubmitting,
              })}
            >
              {({ canSubmit, isSubmitting }) => (
                <Button
                  type="submit"
                  disabled={
                    !canSubmit ||
                    isSubmitting ||
                    (!coursePreset &&
                      (coursesQuery.isPending || coursesQuery.isError))
                  }
                >
                  {isSubmitting ? 'Creating...' : 'Create topic'}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
