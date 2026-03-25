import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

export default function MarkdownViewer({ content, className }) {
  if (!content) return null;

  return (
    <div className={cn("text-sm text-muted-foreground max-w-none", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="mt-4 mb-2 text-lg font-bold text-foreground" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="mt-4 mb-2 text-base font-bold text-foreground" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="mt-4 mb-2 text-sm font-bold text-foreground" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="mb-3 leading-relaxed last:mb-0" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="mb-3 list-disc space-y-1 pl-5" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="mb-3 list-decimal space-y-1 pl-5" {...props} />
          ),
          li: ({ node, ...props }) => <li {...props} />,
          pre: ({ node, children, ...props }) => (
            <pre
              className="my-3 rounded-lg bg-muted p-4 overflow-x-auto [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-sm [&_code]:text-foreground"
              {...props}
            >
              {children}
            </pre>
          ),
          code: ({ node, ...props }) => (
            <code
              className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.8rem] text-primary"
              {...props}
            />
          ),
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-foreground" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
