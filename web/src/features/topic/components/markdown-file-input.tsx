import { useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { Loader2Icon, UploadIcon, XIcon } from 'lucide-react'

import { Button } from '#/components/ui/button'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '#/components/ui/field'
import { Input } from '#/components/ui/input'

type MarkdownFileInputProps = {
  value: string
  onChange: (value: string) => void
  onError: (message: string | null) => void
}

export function MarkdownFileInput({
  value,
  onChange,
  onError,
}: MarkdownFileInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [isReadingFile, setIsReadingFile] = useState(false)

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    setIsReadingFile(true)
    onError(null)

    try {
      const markdownText = await file.text()
      setFileName(file.name)
      onChange(markdownText)
    } catch {
      setFileName(null)
      onChange('')
      onError('Unable to read the selected markdown file.')
    } finally {
      setIsReadingFile(false)
    }
  }

  function clearFile() {
    setFileName(null)
    onChange('')
    onError(null)

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <Field>
      <FieldLabel htmlFor="topic-markdown-file">Markdown note</FieldLabel>
      <Input
        ref={inputRef}
        id="topic-markdown-file"
        type="file"
        accept=".md,.markdown,text/markdown,text/plain"
        onChange={(event) => {
          void handleFileChange(event)
        }}
        className="cursor-pointer"
      />
      <FieldDescription>
        Upload a markdown file. The frontend reads its text in the browser and
        sends the extracted note as JSON.
      </FieldDescription>

      <div className="rounded-lg border bg-muted/30 p-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0 space-y-1">
            <p className="text-sm font-medium">
              {fileName ?? 'No markdown file selected'}
            </p>
            <p className="text-xs text-muted-foreground">
              {fileName
                ? 'You can replace or clear this file before submitting.'
                : 'A note file is optional. Leaving this empty will submit null.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {isReadingFile ? (
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2Icon className="size-4 animate-spin" />
                Reading file...
              </div>
            ) : null}

            {fileName ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearFile}
              >
                <XIcon className="size-4" />
                Clear
              </Button>
            ) : (
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <UploadIcon className="size-4" />
                Markdown upload
              </div>
            )}
          </div>
        </div>

        {value ? (
          <div className="mt-3 rounded-md border bg-background p-3">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Plaintext preview
            </p>
            <pre className="max-h-44 overflow-auto whitespace-pre-wrap break-words font-mono text-xs leading-6 text-foreground">
              {value}
            </pre>
          </div>
        ) : null}
      </div>
    </Field>
  )
}
