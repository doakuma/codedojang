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
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export function SooryeonCard({
  title,
  description,
  icon: Icon,
  iconClassName,
  children,
  guideText,
  actionButton,
  solution,
}) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {Icon && <Icon className={cn("h-5 w-5", iconClassName)} />}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
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
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
}
