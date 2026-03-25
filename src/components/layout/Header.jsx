import Link from "next/link";
import { Sword, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-5xl items-center px-4">
        <Link href="/" className="flex items-center space-x-2 font-bold text-xl tracking-tight mr-6">
          코드도장 <span className="text-primary ml-1">🥋</span>
        </Link>

        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/training"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <Sword className="h-4 w-4" />
            수련장
          </Link>
        </nav>

        <div className="flex flex-1 items-center justify-end">
          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
