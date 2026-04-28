import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
import { Textarea } from '#/components/ui/textarea'
import { toApiError } from '#/lib/api/client'
import { createCourse } from '#/lib/api/courses'
import { getValidationMessage } from '../form-utils'
import { courseQueryKeys } from '../queries'

type CreateCourseDialogProps = {
  onCreated?: (id: string) => Promise<void> | void
}

type CourseFormValues = {
  courseTitle: string
  courseCode: string
  courseDescription: string
}

const initialValues: CourseFormValues = {
  courseTitle: '',
  courseCode: '',
  courseDescription: '',
}

export function CreateCourseDialog({
  onCreated,
}: CreateCourseDialogProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  const createCourseMutation = useMutation({
    mutationFn: createCourse,
  })

  const form = useForm({
    defaultValues: initialValues,
    onSubmit: async ({ value, formApi }) => {
      formApi.setErrorMap({ onSubmit: undefined })
      formApi.setFieldMeta('courseTitle', (previous) => ({
        ...previous,
        errorMap: {
          ...previous.errorMap,
          onSubmit: undefined,
        },
      }))
      formApi.setFieldMeta('courseCode', (previous) => ({
        ...previous,
        errorMap: {
          ...previous.errorMap,
          onSubmit: undefined,
        },
      }))
      formApi.setFieldMeta('courseDescription', (previous) => ({
        ...previous,
        errorMap: {
          ...previous.errorMap,
          onSubmit: undefined,
        },
      }))

      try {
        const response = await createCourseMutation.mutateAsync({
          courseTitle: value.courseTitle.trim(),
          courseCode: value.courseCode.trim(),
          courseDescription: value.courseDescription.trim(),
        })

        await queryClient.invalidateQueries({
          queryKey: courseQueryKeys.all,
        })

        toast.success(response.message)
        formApi.reset()
        setOpen(false)

        if (onCreated) {
          await onCreated(response.id)
          return
        }

        await navigate({
          to: '/courses/$courseId',
          params: { courseId: response.id },
        })
      } catch (error) {
        const apiError = toApiError(error)

        if (apiError.status === 409) {
          formApi.setFieldMeta('courseCode', (previous) => ({
            ...previous,
            errorMap: {
              ...previous.errorMap,
              onSubmit: apiError.message,
            },
          }))
          return
        }

        formApi.setErrorMap({
          onSubmit: apiError.message,
        })
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
          createCourseMutation.reset()
        }
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="size-4" />
          New course
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create course</DialogTitle>
          <DialogDescription>
            Add a course using the backend’s exact create contract. The returned
            course id remains the navigation source of truth.
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
          <FieldGroup>
            <form.Field
              name="courseTitle"
              validators={{
                onSubmit: ({ value }) =>
                  value.trim() ? undefined : 'Course title is required.',
              }}
            >
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Course title</FieldLabel>
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
                    placeholder="Introduction to Artificial Intelligence"
                    aria-invalid={field.state.meta.errors.length > 0}
                  />
                  <FieldError>
                    {getValidationMessage(field.state.meta.errors[0])}
                  </FieldError>
                </Field>
              )}
            </form.Field>

            <form.Field
              name="courseCode"
              validators={{
                onSubmit: ({ value }) =>
                  value.trim() ? undefined : 'Course code is required.',
              }}
            >
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Course code</FieldLabel>
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
                    placeholder="CPE 316"
                    aria-invalid={field.state.meta.errors.length > 0}
                  />
                  <FieldDescription>
                    The backend derives the course id from this code, but the
                    frontend still uses the returned id from the API.
                  </FieldDescription>
                  <FieldError>
                    {getValidationMessage(field.state.meta.errors[0])}
                  </FieldError>
                </Field>
              )}
            </form.Field>

            <form.Field
              name="courseDescription"
              validators={{
                onSubmit: ({ value }) =>
                  value.trim()
                    ? undefined
                    : 'Course description is required.',
              }}
            >
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Course description</FieldLabel>
                  <Textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => {
                      field.handleChange(event.target.value)
                      field.setErrorMap({ onSubmit: undefined })
                      form.setErrorMap({ onSubmit: undefined })
                    }}
                    placeholder="Briefly describe the course scope and focus."
                    className="min-h-28"
                    aria-invalid={field.state.meta.errors.length > 0}
                  />
                  <FieldError>
                    {getValidationMessage(field.state.meta.errors[0])}
                  </FieldError>
                </Field>
              )}
            </form.Field>
          </FieldGroup>

          <form.Subscribe selector={(state) => state.errorMap.onSubmit}>
            {(error) => <FieldError>{getValidationMessage(error)}</FieldError>}
          </form.Subscribe>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={createCourseMutation.isPending}
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
                  disabled={!canSubmit || isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create course'}
                </Button>
              )}
            </form.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
