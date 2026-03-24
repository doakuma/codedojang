import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ROADMAP } from "@/lib/roadmap";

export default function TrainingLayout({ children }) {
  return (
    <div className="flex h-screen w-full bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r hidden md:flex flex-col">
        <div className="p-4 font-bold text-lg border-b flex items-center gap-2">
          🥋 <span>코드도장</span>
        </div>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                수련 목록
              </h2>
              <div className="space-y-1">
                <Link href="/training">
                  <Button variant="ghost" className="w-full justify-start">
                    대시보드
                  </Button>
                </Link>
                <Separator className="my-2" />
                {ROADMAP.map((item) => (
                  <Link key={item.id} href={`/training/${item.id}`}>
                    <Button
                      variant="ghost"
                      className="w-full justify-start font-normal"
                    >
                      {item.title}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto py-8 px-4 md:px-8 max-w-5xl">
          {children}
        </div>
      </main>
    </div>
  );
}
