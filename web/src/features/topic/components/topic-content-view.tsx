import ReactMarkdown from 'react-markdown'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'

type TopicContentViewProps = {
  title: string
  note: string | null
}

export function TopicContentView({
  title,
  note,
}: TopicContentViewProps) {
  return (
    <Card className="rounded-xl border-border/80 py-5">
      <CardHeader className="gap-3 px-5">
        <CardTitle className="text-2xl tracking-tight">{title}</CardTitle>
        <CardDescription>
          Stored markdown note rendered as a readable study sheet.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-5">
        {note ? (
          <div className="space-y-4 text-sm leading-7 text-foreground">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-2xl font-semibold tracking-tight">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="pt-2 text-xl font-semibold tracking-tight">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="pt-1 text-lg font-semibold">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-sm leading-7 text-foreground/90">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc space-y-2 pl-5 text-sm leading-7">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal space-y-2 pl-5 text-sm leading-7">
                    {children}
                  </ol>
                ),
                li: ({ children }) => <li>{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-border pl-4 text-muted-foreground">
                    {children}
                  </blockquote>
                ),
                code: ({ className, children }) => {
                  const isBlock = Boolean(className)

                  if (isBlock) {
                    return (
                      <code className="font-mono text-xs leading-6 text-foreground">
                        {children}
                      </code>
                    )
                  }

                  return (
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
                      {children}
                    </code>
                  )
                },
                pre: ({ children }) => (
                  <pre className="overflow-x-auto rounded-lg border bg-muted/35 p-4 font-mono text-xs leading-6 text-foreground">
                    {children}
                  </pre>
                ),
                hr: () => <hr className="border-border" />,
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-primary underline underline-offset-4"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {note}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed bg-muted/35 p-6">
            <p className="text-sm font-medium">No note yet</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              This topic does not currently have markdown note text attached.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
