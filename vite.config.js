import path from "path";
import { fileURLToPath } from "url"; // 1. URL을 파일 경로로 바꾸는 도구
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// 2. ESM 환경에서 __dirname 흉내내기
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // 이제 __dirname을 마음껏 쓸 수 있어!
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
