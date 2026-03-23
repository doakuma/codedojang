import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Github,
  LayoutDashboard,
  Sword,
  BookOpen,
  Menu,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { trainingRoutes } from "@/lib/routes";

export function MainLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 사이드바 콘텐츠 (데스크톱/모바일 공용)
  const SidebarContent = (
    <div className="h-full py-6 pr-6 lg:py-8">
      <h4 className="mb-2 px-2 text-sm font-semibold tracking-tight text-foreground/80">
        수련 비급 목록 (Training Logs)
      </h4>
      <div className="grid grid-flow-row auto-rows-max text-sm">
        {trainingRoutes.length > 0 ? (
          trainingRoutes.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              onClick={() => setIsMobileMenuOpen(false)} // 모바일에서 클릭 시 닫기
              className={({ isActive }) =>
                cn(
                  "group flex w-full items-center rounded-md border border-transparent px-2 py-1.5 hover:underline",
                  isActive
                    ? "font-medium text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )
              }
            >
              <BookOpen className="mr-2 h-4 w-4" />
              {route.label}
            </NavLink>
          ))
        ) : (
          <span className="px-2 py-1.5 text-muted-foreground">
            아직 등록된 수련이 없습니다.
            <br />
            <span className="text-xs opacity-70">(폴더명 'training' 확인)</span>
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      {/* 1. Header (Sticky & Glassmorphism) */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-14 max-w-screen-2xl items-center px-4">
          {/* Mobile Menu Trigger */}
          <Button
            variant="ghost"
            className="mr-2 px-0 text-base hover:bg-transparent focus:ring-0 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>

          {/* Logo */}
          <div className="mr-4 flex md:mr-6">
            <a href="/" className="mr-6 flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight">
                Codedojang <span className="text-primary">🥋</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation (Right) */}
          <div className="flex flex-1 items-center justify-end space-x-2 md:justify-end">
            <nav className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="hidden h-8 w-8 px-0 sm:inline-flex"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span className="sr-only">수련 현황</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hidden h-8 w-8 px-0 sm:inline-flex"
              >
                <Sword className="h-4 w-4" />
                <span className="sr-only">무기고</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 px-0">
                <a href="https://github.com" target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10 px-4">
        {/* 2. Sidebar (Desktop Only) */}
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          {SidebarContent}
        </aside>

        {/* Mobile Sidebar (Overlay) */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
            <div className="fixed inset-y-0 left-0 z-50 w-3/4 border-r bg-background p-6 shadow-lg sm:max-w-xs animate-in slide-in-from-left-full duration-200">
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-lg">Menu</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              {SidebarContent}
            </div>
          </div>
        )}

        {/* 3. Main Content */}
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
          <div className="mx-auto w-full min-w-0">
            {/* Fade-in Animation Wrapper */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-in-out">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* 4. Footer */}
      <footer className="border-t py-6 md:px-8 md:py-0">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Establishment 2026.{" "}
            <span className="font-medium text-foreground">Keep Grinding.</span>
          </p>
          <p className="text-center text-sm text-muted-foreground md:text-right">
            The Way of the Codedojang
          </p>
        </div>
      </footer>
    </div>
  );
}
