import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw } from "lucide-react";

export function SooryeonLayout({
  title,
  badges,
  description,
  onReset,
  children,
}) {
  return (
    <div className="container mx-auto max-w-5xl space-y-8 pb-10">
      {/* 1. 수련 개요 (Intro) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <div className="flex gap-2">
              {badges &&
                badges.map((badge) => (
                  <Badge key={badge} variant="secondary">
                    {badge}
                  </Badge>
                ))}
            </div>
          </div>
          {onReset && (
            <Button variant="ghost" size="sm" onClick={onReset}>
              <RotateCcw className="mr-2 h-4 w-4" /> 전체 초기화
            </Button>
          )}
        </div>
        <div className="text-lg text-muted-foreground max-w-3xl">
          {description}
        </div>
      </div>
      {children}
    </div>
  );
}
