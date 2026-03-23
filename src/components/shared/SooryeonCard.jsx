import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpen, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { MarkdownViewer } from "./MarkdownViewer";

export function SooryeonCard({
  title,
  description,
  icon: Icon,
  iconClassName,
  children,
  guideText,
  actionButton,
  solution,
  isApproved,
  detail,
}) {
  return (
    <Card
      className={cn(
        "flex flex-col h-full transition-colors",
        isApproved && "border-green-500/50 bg-green-500/5",
      )}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {Icon && <Icon className={cn("h-5 w-5", iconClassName)} />}
            {title}
          </CardTitle>
          {isApproved && (
            <Badge
              variant="outline"
              className="border-green-600 text-green-600 bg-green-100 dark:bg-green-900/20"
            >
              <CheckCircle2 className="mr-1 h-3 w-3" /> 승인
            </Badge>
          )}
        </div>
        <CardDescription>{description}</CardDescription>
        {detail && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="detail" className="border-none">
              <AccordionTrigger
                className={cn(
                  "py-2 text-xs text-muted-foreground hover:no-underline",
                  isApproved && "text-green-600 dark:text-green-400",
                )}
              >
                📜 수련 비급 상세 보기
              </AccordionTrigger>
              <AccordionContent className="py-2">
                <MarkdownViewer content={detail} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        {children}
        {guideText && (
          <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
            {guideText}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button
          className="flex-1"
          variant={actionButton?.variant || "default"}
          onClick={actionButton?.onClick}
        >
          {actionButton?.label}
        </Button>

        {solution && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" title="비급 보기">
                <BookOpen className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{solution.title}</DialogTitle>
                <DialogDescription>{solution.description}</DialogDescription>
              </DialogHeader>
              <div className="rounded-md bg-muted p-4 overflow-x-auto">
                <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">
                  {solution.code}
                </pre>
              </div>
              {solution.review && (
                <div className="mt-4 rounded-md border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/10">
                  <h4 className="mb-2 flex items-center font-semibold text-green-800 dark:text-green-300">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    사부님의 평가
                  </h4>
                  <div className="text-sm text-green-700 dark:text-green-400 [&_p]:text-inherit">
                    <MarkdownViewer content={solution.review} />
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
}
