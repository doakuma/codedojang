import { useState } from "react";
import { Zap, User, Backpack } from "lucide-react";
import { solutionData } from "@/data/solutions/Sooryeon_01";
import { SooryeonCard } from "@/components/shared/SooryeonCard";
import { SooryeonLayout } from "@/components/shared/SooryeonLayout";

export default function Sooryeon01useState() {
  // =================================================================
  // 🥋 수련 상태 (Training State)
  // =================================================================

  // [미션 1] 원시 타입: 연속 공격 콤보 (Number)
  const [combo, setCombo] = useState(0);

  // [미션 2] 객체 타입: 수련생 프로필 (Object)
  const [profile, setProfile] = useState({
    name: "김코딩",
    level: 1,
  });

  // [미션 3] 배열 타입: 인벤토리 (Array)
  const [inventory, setInventory] = useState(["낡은 목검"]);

  // =================================================================
  // 🥋 수련 미션 (Missions)
  // =================================================================

  // -----------------------------------------------------------------
  // [미션 1] 비동기 업데이트의 이해
  // -----------------------------------------------------------------
  const handleTripleAttack = () => {
    // TODO [미션 1]: 카운터 광클 대응 (비동기 업데이트)
    // 💡 사부님의 가이드:
    // 리액트의 state 업데이트는 비동기적으로 배치(Batch) 처리된다네.
    // '이전 상태(prev)'를 확실히 보장받으려면 함수형 업데이트를 사용하라.

    // 🔽 아래 코드를 수정하여 콤보가 3씩 오르게 하라.
    setCombo(combo + 1);
    setCombo(combo + 1);
    setCombo(combo + 1);
  };

  // -----------------------------------------------------------------
  // [미션 2] 객체의 불변성 (Spread Syntax)
  // -----------------------------------------------------------------
  const handleLevelUp = () => {
    // TODO [미션 2]: 프로필 정보 수정 (객체 불변성)
    // 💡 사부님의 가이드:
    // 객체의 속성만 슬쩍 바꾼다고 리액트가 눈치채지 못해.
    // ES6의 Spread 연산자(...)를 사용하여 '이름'을 유지하며 '레벨'만 올려라.

    // 🔽 아래 코드를 작성하시오.
    alert("아직 코드가 작성되지 않았습니다!");
    // setProfile({ ... });
  };

  // -----------------------------------------------------------------
  // [미션 3] 배열의 불변성 (Push 금지)
  // -----------------------------------------------------------------
  const handleAddItem = () => {
    // TODO [미션 3]: 수련 아이템 목록 (배열 불변성)
    // 💡 사부님의 가이드:
    // 배열에 push()를 쓰면 원본이 오염되고 리액트는 변화를 모른다.
    // 기존 배열을 펼치고(...spread) 새 항목을 추가하여 '새로운 배열'을 만들어라.

    const newItem = "회복 물약";
    // 🔽 아래 코드를 작성하시오.
    alert("아직 코드가 작성되지 않았습니다!");
  };

  // 초기화 (Reset)
  const resetTraining = () => {
    setCombo(0);
    setProfile({ name: "김코딩", level: 1 });
    setInventory(["낡은 목검"]);
  };

  return (
    <SooryeonLayout
      title="수련 01: useState의 정공법"
      badges={["Immutable", "Async Batching"]}
      description={
        <>
          "상태(State)를 직접 건드리는 자, 리액트의 분노를 살 것이다." <br />
          리액트는 <strong>참조값(Reference)</strong>이 바뀔 때만 움직입니다.
          불변성을 지키며 상태를 다루는 법을 익히십시오.
        </>
      }
      onReset={resetTraining}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* --- [미션 1] Number --- */}
        <SooryeonCard
          title="[미션 1] 콤보 공격"
          description="비동기 업데이트와 함수형 갱신"
          icon={Zap}
          iconClassName="text-yellow-500"
          solution={solutionData.mission1}
          actionButton={{
            label: "3연속 공격",
            onClick: handleTripleAttack,
          }}
          guideText={
            <>
              <p>
                버튼 클릭 한 번에 콤보가 <strong>+3</strong> 되어야 합니다.
              </p>
              <p className="text-xs text-destructive mt-1">
                (현재는 +1만 오릅니다)
              </p>
            </>
          }
        >
          <div className="flex flex-col items-center justify-center rounded-lg bg-muted p-6">
            <span className="text-5xl font-black text-primary tracking-tighter">
              {combo}
            </span>
            <span className="text-xs text-muted-foreground mt-2">
              Current Combo
            </span>
          </div>
        </SooryeonCard>

        {/* --- [미션 2] Object --- */}
        <SooryeonCard
          title="[미션 2] 프로필 갱신"
          description="객체 불변성과 Spread 연산자"
          icon={User}
          iconClassName="text-blue-500"
          solution={solutionData.mission2}
          actionButton={{
            label: "레벨 업 (Level Up)",
            onClick: handleLevelUp,
            variant: "secondary",
          }}
          guideText={<p>레벨만 올려야 합니다. 이름이 사라지면 하수입니다.</p>}
        >
          <div className="rounded-lg bg-muted p-4 font-mono text-sm">
            <div className="flex justify-between border-b pb-2 mb-2 border-border/50">
              <span className="text-muted-foreground">Name:</span>
              <span>
                {profile.name || (
                  <span className="text-destructive">증발함!</span>
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Level:</span>
              <span className="text-primary font-bold">{profile.level}</span>
            </div>
          </div>
        </SooryeonCard>

        {/* --- [미션 3] Array --- */}
        <SooryeonCard
          title="[미션 3] 인벤토리"
          description="배열 불변성과 Push 금지"
          icon={Backpack}
          iconClassName="text-green-600"
          solution={solutionData.mission3}
          actionButton={{
            label: "아이템 획득",
            onClick: handleAddItem,
            variant: "outline",
          }}
          guideText={
            <p>
              <strong>push()</strong>는 금지된 사술입니다. 새 배열을 반환하세요.
            </p>
          }
        >
          <div className="rounded-lg bg-muted p-4 h-32 overflow-y-auto">
            <ul className="list-disc pl-5 text-sm space-y-1">
              {inventory.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </SooryeonCard>
      </div>
    </SooryeonLayout>
  );
}
