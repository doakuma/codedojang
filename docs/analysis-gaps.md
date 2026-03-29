# 코드도보통지 — 심층 분석: 부족한 부분 (Gap Analysis)

> **분석 일시:** 2026.03.29
> **분석 범위:** 49개 관문의 학습 경험, 실무 적응성, 콘텐츠 품질

---

## 요약

| 항목 | 현황 | 평가 |
|------|------|------|
| **기술 아키텍처** | Next.js 16, Sandpack, 정적 생성 | 9/10 ✅ |
| **이론 설명** | "무엇/왜/언제" 구조, 마크다운 | 7/10 ⚠️ |
| **학습 검증** | 자동 검증 시스템 | 2/10 ❌ |
| **진도 추적** | 완료 상태 저장 및 시각화 | 1/10 ❌ |
| **실무 적응성** | 배운 내용 중 직접 적용 가능 비율 | 3/10 🔴 |
| **라이브러리 연결** | TanStack Query, Zustand 등 | 2/10 ❌ |
| **패턴 선택 가이드** | 상황별 기술 선택 | 1/10 ❌ |
| **전체 완성도** | | **3.5/10** |

---

## 심층 분석

### 1️⃣ 검증 루프 부재 (Critical)

**문제:**
학습자가 코드를 작성한 후 "이게 맞는가?"를 판단할 방법이 없음.

```
학습 흐름:
  1. 이론 읽기 (마크다운)
  2. 스타터 코드 보기 (TODO만 있음)
  3. 코드 작성
  4. Sandpack에서 실행 (에러만 보임)
  5. "이게 맞나?" ← 판단 불가능

Sandpack이 보여주는 것:
  ✅ 문법 에러 (SyntaxError)
  ✅ 런타임 에러 (TypeError)
  ❌ 논리적 정답 여부
  ❌ "미션 완료" 확인
```

**영향:**
- 학습자의 자신감 부족
- 원래 문제 (튜토리얼 따라하기) 미해결
- 고민 시간 + 구글링 시간 추가
- 학습 만족도 저하

**필요한 해결책:**
```
1. 정답 코드 공개 메커니즘
   └─ "정답 보기" 버튼 + 학습자 코드와 비교 뷰

2. 자동 검증 시스템
   └─ 테스트 케이스 실행 (예: 기댓값과 실제값 비교)
   └─ "관문 완료" 표시

3. 부분 피드백
   └─ 막혔을 때 힌트 제공
   └─ 단계별 도움 (Hint 1 → Hint 2 → 정답)
```

---

### 2️⃣ 진도 추적 부재 (High)

**문제:**
49개 관문 중 어디까지 왔는지, 뭘 완료했는지 모름.

```
현황:
  ❌ 완료 배지
  ❌ 진도율 표시
  ❌ "지금 어디?"를 알 수 없음
  ❌ 문파별 진도율
  ❌ 마지막 방문 관문 추적

결과:
  ├─ 동기 부족 ("50%쯤 했나?" 불명확)
  ├─ 완료 후 보상 없음 (뱃지, 성취감)
  ├─ 복습 표시 불가능
  └─ 구글 분석 불가능 (학습자 행동 추적 불가)
```

**필요한 것:**
```
1. localStorage 기반 진도 저장
   └─ 관문마다 "완료" 표시 저장

2. UI 개선
   ├─ SooryeonCard에 "3/7 완료" 배지
   ├─ GatePage에 "6/7 다음" 텍스트
   ├─ 문파 완료 시 "축하합니다!" 페이지
   └─ 전체 진도 시각화 (홈페이지의 진행률 바)

3. 로컬 분석
   └─ "지금까지 몇 시간 투자했나?"
   └─ "어느 관문에서 가장 오래 머물렀나?"
```

---

### 3️⃣ 문파 간 의존성 혼재 (High)

**문제:**
49개 관문이 선형적 1→2→...→49로 되어 있으나, 실제 개념 의존성은 다름.

```
설계: 1 → 2 → 3 → ... → 49 (선형)

현실:
  ├─ useState 완벽 이해 필요 (1-7 모두)
  ├─ useEffect는 useState 선행 필수 (2-x)
  ├─ useRef는 useEffect 일부 선행 필요 (3-7은 2-7 필요)
  ├─ Custom Hooks는 1,2,3 모두 필요 (4-x)
  ├─ Context는 useState + Custom Hooks 필요 (5-x)
  ├─ Optimization은 모든 것 필요 (6-x)
  └─ Next.js/RSC는 1-6 완전 이해 필수 (7-x)

혼재 예시:
  └─ useEffect 4관문 (Primitive Dependencies)
     └─ useState 5관문 (Object Identity) 선행 필수
     └─ 근데 지금은 useState 끝나고 3개 관문 후 등장
```

**영향:**
- "이 관문은 왜 지금 배우나?" 혼란
- 선수조건 부족 시 관문 이해 불가능
- 학습 경로 최적화 불가능

**필요한 것:**
```
1. 관문별 선수조건 명시
   └─ "이 관문을 시작하기 전에 X관문을 먼저 끝내세요"

2. 선택적 학습 경로
   └─ "기초 경로" vs "심화 경로"
   └─ 학습자 수준에 따른 추천

3. 문파 재편성 (장기)
   └─ 의존성 기반 순서 조정
   └─ 각 문파 내 난이도 곡선 개선
```

---

### 4️⃣ 난이도 곡선 불규칙 (Medium)

**문제:**
각 관문의 난이도가 들쭉날쭉함.

```
useState 문파:
  1. Stale Closure       [중]
  2. Batching            [중]
  3. Lazy Initialization [하] ← 갑자기 쉬움
  4. Derived State       [중]
  5. Object Identity     [상]
  6. State Colocation    [상]
  7. Transition API      [상상] ← 너무 어려움

결과:
  ├─ 3관문에서 주의력 해제
  ├─ 4-7관문에서 급상승 (적응 못 함)
  └─ "뭔가 균형이 안 맞는데" 느낌

useEffect 문파:
  1. Sync not Lifecycle  [중]
  2. Race Condition      [상] ← 정답이 아님
  3. AbortController     [상] ← 2의 정답
  └─ 혼란: "2번이 틀린 방법이면 왜 먼저 배워?"

Optimization 문파:
  1. Referential         [중상]
  2. React.memo          [중상]
  3. Virtualization      [상상] ← 너무 어려움
  └─ 갑자기 고급 기술
```

**필요한 것:**
```
1. 각 관문의 난이도 재평가
2. 이상적 난이도: 1-2-2-3-3-4-4 (완만한 상승)
3. 관문 위치 조정 또는 신규 관문 추가
```

---

### 5️⃣ 이론과 실습의 비율 불균형 (Medium)

**문제:**
이론은 개념만 설명하고, "왜 이렇게 동작하는가"는 부족함.

```
현재:
  이론 (마크다운, 400-600자):
    ├─ "무엇인가: [설명]"
    ├─ "왜 쓰는가: [용도]"
    └─ "언제 쓰는가: [상황]"

  실습 (스타터 코드, TODO):
    ├─ 문제 코드만 제시
    └─ "이걸 고쳐봐" (구체적 지시 없음)

부족한 것:
  ❌ 내부 메커니즘 (HOW)
     └─ useState는 왜 리렌더를 보장하나? (Fiber 아키텍처)
     └─ Stale Closure는 왜 발생하나? (클로저 + 배칭)

  ❌ 시각적 설명 (다이어그램)
     └─ 상태 업데이트 흐름도
     └─ 렌더링 사이클 시각화

  ❌ 디버깅 팁
     └─ "이게 안 되면, 이렇게 해봐"
     └─ 일반적인 실수들
```

**필요한 것:**
```
1. 내부 메커니즘 추가 (선택)
   └─ "React가 내부적으로 어떻게 하는가?"
   └─ Fiber, Hook Index, Reconciliation

2. 시각화 (권장)
   └─ 다이어그램, 애니메이션
   └─ 상태 흐름을 눈으로 보기

3. 디버깅 팁 (권장)
   └─ console.log 위치
   └─ DevTools 활용법
```

---

### 6️⃣ 실무 적응성 부족 (Critical)

**문제:**
배운 내용의 절반 이상을 실무에서 직접 쓸 수 없음.

```
관문별 실무 적용 비율:

useState:
  1. Stale Closure       🟡 40% (안티패턴 이해는 중요, 사용은 드문)
  2. Batching            🟡 20% (자동 처리됨)
  3. Lazy Init           🟢 70% (실용적)
  4. Derived State       🟡 50% (알아야 하지만 복잡하면 다른 방법)
  5. Object Identity     🟢 80% (필수)
  6. State Colocation    🟡 40% (원칙이지만 Context/Zustand 필요)
  7. Transition API      🔴 10% (매우 특수)
  평균: 53%

useEffect:
  1. Sync not Lifecycle  🟡 50% (개념 중요, 구현은 라이브러리)
  2. Race Condition      🔴 20% (개념 필수, 해결책은 아님)
  3. AbortController     🟢 60% (유용하지만 자신이 쓸 일 드문)
  4. Primitive Deps      🟡 65% (실무 필수, 상황에 따라)
  5. Effect Event        🔴 5% (실험적 API)
  6. Idempotency         🟡 40% (cleanup으로 자동)
  7. Ref-based Effect    🟡 40% (개념은 좋지만 라이브러리)
  평균: 40%

결론:
  ├─ useState: 배운 것의 절반 이상이 직접 적용 불가능
  ├─ useEffect: 70%가 실무에선 다르게 처리됨 (TanStack Query)
  └─ Custom Hooks: 라이브러리가 이미 제공함
```

**심각성:**
```
현재:
  "useState를 완벽히 배웠다" → 실무에선 "절반만 써"

결과:
  학습자: "내가 배운 게 다는 아닌가?"

실무:
  useState ← TanStack Query ← Zustand ← Next.js App Router
  직접 배운 것: useState
  간접적으로 필요: Context, Custom Hooks
  배우지 않은 것: TanStack Query, Zustand
```

---

### 7️⃣ 라이브러리 생태계 미포함 (Critical)

**문제:**
49개 관문 이후 실무 프로젝트를 하면, "배우지 않은 기술"을 써야 함.

```
배운 것 (49개 관문):
  ├─ useState, useEffect, useRef
  ├─ Custom Hooks
  ├─ Context API
  ├─ Performance (memo, useMemo, useCallback)
  └─ Next.js/RSC 기초

배우지 않은 것 (실무 필수):
  ├─ TanStack Query (데이터 페칭, 캐싱)
  ├─ Zustand / Jotai (현대 상태 관리)
  ├─ React Hook Form (폼 처리)
  ├─ shadcn/ui (UI 컴포넌트)
  ├─ Next.js 심화 (Server Actions, revalidatePath)
  ├─ TypeScript (실무는 대부분 TS)
  ├─ Testing (Vitest, RTL)
  └─ 성능 측정 (Core Web Vitals, Profiler)

결과:
  └─ 49개 관문 + α 추가 학습 필수
```

**학습자의 심리:**
```
1단계: "49개 관문을 다 마쳤다! 이제 React를 안다"
2단계: "프로젝트를 시작해볼까"
3단계: "어? TanStack Query는 뭐지?"
4단계: "Zustand는?"
5단계: "React Hook Form?"
6단계: "이건 다 뭐야 😭"
```

---

### 8️⃣ 패턴 선택 가이드 부재 (High)

**문제:**
"언제 뭘 써야 하는가"를 모름.

```
예시 1: 상태 관리
  ├─ useState만으로? → 로컬 UI 상태 (모달 열기, 탭 선택)
  ├─ useRef? → 렌더 없이 값만 유지 (타이머 ID)
  ├─ Context? → 앱 전역, 자주 안 바뀜 (테마, 언어)
  ├─ Zustand? → 자주 바뀌는 전역 상태
  └─ TanStack Query? → 서버 상태 (API 데이터)

  → 배운 것: useState, useRef, Context
  → 실무 필요: 모두 + Zustand + TanStack Query
  → 선택 기준: 배운 적 없음

예시 2: 데이터 페칭
  ├─ useEffect + fetch? → 기초 이해, 실무 사용 X
  ├─ TanStack Query? → 캐싱, 재시도, 동기화 자동
  ├─ SWR? → 더 가벼움
  ├─ Next.js RSC? → 서버에서 직접 fetch
  └─ Suspense + async? → 스트리밍 가능

  → 배운 것: useEffect + fetch
  → 실무: TanStack Query 또는 RSC
  → 선택 기준: 배운 적 없음

예시 3: 폼 처리
  ├─ useState로 직접? → 작은 폼만 가능
  ├─ React Hook Form? → 검증, 에러 처리 자동
  ├─ Formik? → 더 강력하지만 무거움
  └─ Server Actions? → Next.js에서 권장

  → 배운 것: useState
  → 실무: React Hook Form + Server Actions
  → 선택 기준: 배운 적 없음
```

**필요한 것:**
```
1. 상황별 기술 선택 가이드
   ├─ "로컬 UI 상태" → useState
   ├─ "전역 상태 (자주 바뀜)" → Zustand
   ├─ "서버 상태 (API)" → TanStack Query
   └─ "앱 설정 (테마)" → Context

2. 라이브러리 소개 및 비교
   ├─ 각 라이브러리의 역할
   ├─ 언제 써야 하는가
   └─ 장단점

3. 마이그레이션 가이드
   └─ "useState에서 Zustand로"
   └─ "useEffect에서 TanStack Query로"
```

---

### 9️⃣ 콘텐츠의 "옛날 방식" (High)

**문제:**
"정공법(正攻法)"이라고 하지만, 실무는 이미 다른 방식으로 진화했음.

```
예시 1: Focus Trap 구현
  배운 것: useRef + querySelectorAll + keydown 이벤트
  실무: radix-ui, shadcn/ui가 이미 제공 (자신이 구현할 일 없음)

예시 2: useImperativeHandle
  배운 것: forwardRef + useImperativeHandle로 API 노출
  실무: 명령형 API가 필요한 경우가 매우 드물고,
         있어도 headless UI 라이브러리가 제공

예시 3: Custom useLocalStorage
  배운 것: useState + useEffect로 직접 구현
  실무: usehooks-ts, zustand-persist 등 라이브러리 사용

예시 4: 데이터 페칭
  배운 것: useEffect + fetch + useState
  실무: TanStack Query (캐싱, 재시도, 동기화 자동)

결론:
  └─ "React 핵심 원리"는 맞지만,
     "현대 실무 패턴"과는 다름
```

---

## 종합 진단

### 프로젝트의 정체성 위기

```
프로젝트 슬로건:
  "React 핵심 원리를 그림과 실습으로 배우는 인터랙티브 학습 플랫폼"

현실:
  ✅ "React 핵심 원리" → 맞음
  ✅ "체계적 학습" → 49개 관문이 입증
  ❌ "실습으로" → 검증 메커니즘 부재
  ❌ "실무에 적용" → 절반은 적용 불가능
  ❌ "현대적 방식" → 실무는 라이브러리 기반

현위치:
  "React Hook 기초 교과서" + "기술 스택 없음"

필요한 것:
  "React Hook 이해" → "실무 패턴" → "라이브러리 생태계"

현재 상태:
  1단계만 제공, 2-3단계 미포함
```

---

## 다음 단계 (Phase v0.3+)

자세한 로드맵은 `docs/roadmap-v1.md` 참고.

---

## 첨부: 관문별 분석 시트

[docs/analysis-gates.md](analysis-gates.md) 참고

