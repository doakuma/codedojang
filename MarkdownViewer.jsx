import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

export function MarkdownViewer({ content, className }) {
  return (
    <div
      className={cn("prose prose-sm dark:prose-invert max-w-none", className)}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
