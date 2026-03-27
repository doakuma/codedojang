'use client';

import Link from "next/link";
import { Sword, Github, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

export function Header() {
  const { theme, toggleTheme, isMounted } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-5xl items-center px-4">
        <Link href="/" className="flex items-center space-x-2 font-bold text-xl tracking-tight mr-6">
          코드도보통지
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

        <div className="flex flex-1 items-center justify-end gap-1">
          {isMounted && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={toggleTheme}
              title={theme === 'light' ? '다크 모드' : '라이트 모드'}
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              <span className="sr-only">테마 전환</span>
            </Button>
          )}
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
