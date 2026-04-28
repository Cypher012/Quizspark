import { useState } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
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
import { deleteTopic } from '#/lib/api/topics'
import { getErrorMessage } from '#/lib/api/client'
import { topicQueryKeys } from '../queries'

type DeleteTopicDialogProps = {
  topic: {
    id: string
    title: string
  }
  onDeleted?: (id: string) => Promise<void> | void
  buttonLabel?: string
  buttonVariant?: 'ghost' | 'outline' | 'destructive'
  buttonSize?: 'sm' | 'default' | 'icon'
}

export function DeleteTopicDialog({
  topic,
  onDeleted,
  buttonLabel = 'Delete',
  buttonVariant = 'outline',
  buttonSize = 'sm',
}: DeleteTopicDialogProps) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const deleteTopicMutation = useMutation({
    mutationFn: () => deleteTopic(topic.id),
    onSuccess: async (response) => {
      await queryClient.invalidateQueries({
        queryKey: topicQueryKeys.withCourse,
      })
      queryClient.removeQueries({
        queryKey: topicQueryKeys.detail(topic.id),
      })
      toast.success(response.message)
      setOpen(false)

      if (onDeleted) {
        await onDeleted(topic.id)
      }
    },
    onError: (error) => {
      setErrorMessage(getErrorMessage(error, 'Unable to delete topic right now.'))
    },
  })

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)

        if (!nextOpen) {
          setErrorMessage(null)
          deleteTopicMutation.reset()
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
          <DialogTitle>Delete topic</DialogTitle>
          <DialogDescription>
            This will remove{' '}
            <span className="font-medium text-foreground">{topic.title}</span>.
          </DialogDescription>
        </DialogHeader>

        <FieldError>{errorMessage}</FieldError>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={deleteTopicMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              setErrorMessage(null)
              void deleteTopicMutation.mutateAsync()
            }}
            disabled={deleteTopicMutation.isPending}
          >
            {deleteTopicMutation.isPending ? 'Deleting...' : 'Delete topic'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
