"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export function SooryeonCard({ title, description, children, solution }) {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <Card className="w-full h-full flex flex-col hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
          <Badge variant="outline">수련</Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </CardHeader>

      <CardContent className="flex-grow space-y-4">{children}</CardContent>

      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <Play className="w-4 h-4 mr-2" /> 실행
        </Button>
        {solution && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowSolution(!showSolution)}
          >
            <BookOpen className="w-4 h-4 mr-2" />{" "}
            {showSolution ? "비급 닫기" : "비급 전수"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
