import { Suspense } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css"; // Global Styles

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MainLayout } from "@/components/layout/MainLayout";
import { trainingRoutes } from "@/lib/routes";
import {
  Activity,
  BookOpen,
  Calendar,
  ChevronRight,
  Trophy,
} from "lucide-react";

// 대시보드(Home) 컴포넌트 개편
function Home() {
  const navigate = useNavigate();

  // 1. 통계 데이터 계산
  const totalCount = trainingRoutes.length;
  // 목록의 마지막 항목을 '최신 수련'으로 간주 (또는 날짜 파싱 로직 추가 가능)
  const lastTraining = totalCount > 0 ? trainingRoutes[totalCount - 1] : null;
  const todayDate = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
          오늘의 수련을 시작합니다.
        </h1>
        <p className="text-xl text-muted-foreground">
          정공법(正攻法)으로 나아가는 개발자의 길. 현재 도장의 상태입니다.
        </p>
      </div>

      {/* Stats Cards (Grid Layout) */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 수련 횟수</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCount}회</div>
            <p className="text-xs text-muted-foreground">
              꾸준함이 비범함을 만듭니다.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              최근 수련 일자
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayDate}</div>
            <p className="text-xs text-muted-foreground">
              오늘도 수련장은 열려있습니다.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">수련 레벨</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">초심자</div>
            <p className="text-xs text-muted-foreground">
              정진(精進) 하여 고수가 되십시오.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Start / Empty State */}
      {lastTraining ? (
        <Card
          className="cursor-pointer transition-colors hover:bg-accent/50 border-primary/20"
          onClick={() => navigate(lastTraining.path)}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              최근 수련 이어서 하기:{" "}
              <span className="text-primary">{lastTraining.label}</span>
            </CardTitle>
            <CardDescription>
              가장 마지막에 진행했던 수련 비급을 다시 펼칩니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full sm:w-auto gap-2">
              수련장 입장 <ChevronRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed">
          <CardHeader className="text-center">
            <CardTitle>아직 기록된 수련이 없습니다.</CardTitle>
            <CardDescription>
              '오늘의 수련'을 시작하여 첫 번째 비급을 남겨보세요.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Suspense
          fallback={
            <div className="flex h-40 items-center justify-center text-muted-foreground">
              수련장 입장 중...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            {/* 동적으로 생성된 트레이닝 라우트 */}
            {trainingRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Routes>
        </Suspense>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
