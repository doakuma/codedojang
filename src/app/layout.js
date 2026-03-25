import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "코드도장 | React 정공법 수련",
  description: "7대 문파 49관문으로 체득하는 리액트 정공법",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t py-6 md:px-8 md:py-0">
          <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row max-w-5xl px-4">
            <p className="text-sm text-muted-foreground">
              Establishment 2026.{" "}
              <span className="font-medium text-foreground">Keep Grinding.</span>
            </p>
            <p className="text-sm text-muted-foreground">The Way of the Codedojang</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
