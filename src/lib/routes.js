import { lazy } from "react";

// Vite의 import.meta.glob을 사용하여 src/pages/training 폴더 내의 모든 .jsx 파일을 찾습니다.
// 경로는 현재 파일(src/lib) 기준으로 상위 폴더를 탐색합니다.
const trainingModules = import.meta.glob("../pages/training/*.jsx");

// 파일 경로를 기반으로 라우트 설정 객체 배열을 생성합니다.
export const trainingRoutes = Object.keys(trainingModules).map((filePath) => {
  // 예: "../pages/training/Dojo_useState.jsx" -> "Dojo_useState"
  const fileName = filePath.split("/").pop().replace(".jsx", "");
  // UI 표시용 라벨: "Dojo_useState" -> "Dojo useState"
  const label = fileName.replace(/_/g, " ");

  return {
    path: `/training/${fileName}`,
    label,
    Component: lazy(trainingModules[filePath]),
  };
});
