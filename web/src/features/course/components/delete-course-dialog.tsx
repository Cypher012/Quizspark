import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2Icon } from 'lucide-react'
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
import { FieldError } from '#/components/ui/field'
import { deleteCourse } from '#/lib/api/courses'
import { getErrorMessage } from '#/lib/api/client'
import { courseQueryKeys } from '../queries'

type DeleteCourseDialogProps = {
  course: {
    id: string
    courseTitle: string
    courseCode: string
  }
  onDeleted?: (id: string) => Promise<void> | void
  buttonLabel?: string
  buttonVariant?: 'ghost' | 'outline' | 'destructive'
  buttonSize?: 'sm' | 'default' | 'icon'
}

export function DeleteCourseDialog({
  course,
  onDeleted,
  buttonLabel = 'Delete',
  buttonVariant = 'outline',
  buttonSize = 'sm',
}: DeleteCourseDialogProps) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const deleteCourseMutation = useMutation({
    mutationFn: () => deleteCourse(course.id),
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({
        queryKey: courseQueryKeys.all,
      })
      queryClient.removeQueries({
        queryKey: courseQueryKeys.detail(course.id),
      })
      toast.success(response.message)
      setOpen(false)

      if (onDeleted) {
        await onDeleted(course.id)
      }
    },
    onError: (error) => {
      setErrorMessage(getErrorMessage(error, 'Unable to delete course right now.'))
    },
  })

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)

        if (!nextOpen) {
          setErrorMessage(null)
          deleteCourseMutation.reset()
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant={buttonVariant} size={buttonSize}>
          <Trash2Icon className="size-4" />
          {buttonSize === 'icon' ? (
            <span className="sr-only">{buttonLabel}</span>
          ) : (
            buttonLabel
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Delete course</DialogTitle>
          <DialogDescription>
            This will remove{' '}
            <span className="font-medium text-foreground">
              {course.courseTitle}
            </span>{' '}
            ({course.courseCode}). There is no edit flow in this feature, so
            deletion should stay deliberate.
          </DialogDescription>
        </DialogHeader>

        <FieldError>{errorMessage}</FieldError>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={deleteCourseMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              setErrorMessage(null)
              void deleteCourseMutation.mutateAsync()
            }}
            disabled={deleteCourseMutation.isPending}
          >
            {deleteCourseMutation.isPending ? 'Deleting...' : 'Delete course'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
