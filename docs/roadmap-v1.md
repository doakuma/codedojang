# 코드도보통지 — 실행 로드맵 v1.0

> **최종 목표:** 49개 관문 학습 후 **실무에서 즉시 적용 가능한 플랫폼**으로 진화

---

## 핵심 전략

### 현황
```
v0.2.1 상태:
  ✅ 기술 기반: Next.js 16, Sandpack, 데이터 구조
  ✅ 콘텐츠: 49개 관문 (이론 + 스타터 코드)
  ❌ 학습 경험: 검증, 피드백, 진도 추적 부재
  ❌ 실무 연결: 라이브러리 생태계 미포함
```

### 전략
```
1단계 (v0.3): 학습 경험 개선
  └─ 검증 루프, 진도 추적 추가
  └─ 자신감 확보 ("내가 맞게 배웠다")

2단계 (v0.4): 실무 연결
  └─ 라이브러리 생태계 가이드 추가
  └─ "React 원리" → "실무 패턴" 브릿지

3단계 (v1.0): 통합 플랫폼
  └─ 모든 것을 연결한 최종 완성 (6-12개월 후)
```

---

## Phase v0.3: 학습 경험 개선

### 목표
> **"배운 것이 맞다는 확신을 준다"**

### 작업 목록

#### P0-1. 관문 검증 시스템 (2주)

**내용:**
각 관문마다 "정답 확인" 메커니즘을 추가합니다.

```javascript
// 관문 데이터 구조 확장
{
  id: 1,
  slug: 'stale-closure',
  title: '1관문. Stale Closure',
  mission: '...',
  theory: '...',
  starterCode: '...',

  // 새로 추가
  solutionCode: `  // 정답 코드
    const [count, setCount] = useState(0);
    const handleClick = () => {
      setCount(prev => prev + 1);
      setCount(prev => prev + 1);
      setCount(prev => prev + 1);
    };
  `,

  testCases: [
    {
      name: '세 번 클릭하면 +3 증가',
      test: (result) => result === 3
    }
  ],

  hints: [
    {
      level: 1,
      text: '함수형 업데이트를 사용하세요. setState(prev => ...'
    },
    {
      level: 2,
      text: '정답 코드를 봅시다.'
    }
  ]
}
```

**구현:**
1. curriculum.js에 `solutionCode`, `testCases`, `hints` 추가
2. GatePage에 "정답 보기" 버튼
3. 코드 비교 뷰 (사이드바 split view)
4. 자동 테스트 실행 (통과/실패)

**파일:**
```
src/components/shared/SolutionComparison.jsx  (새로 생성)
src/components/shared/TestRunner.jsx          (새로 생성)
src/lib/curriculum.js                         (수정)
src/components/shared/GatePage.jsx            (수정)
```

**우선순위:** useState 1-7관문부터 시작 (5개 관문)

---

#### P0-2. 진도 추적 (1주)

**내용:**
localStorage 기반 학습 진도를 저장하고 시각화합니다.

```javascript
// localStorage 구조
{
  "progress": {
    "01-useState": {
      "1": { completed: true, timestamp: 1711780800000 },
      "2": { completed: true, timestamp: ... },
      "3": { completed: false, timestamp: ... }
    },
    "02-useEffect": { ... }
  }
}
```

**구현:**
1. `src/hooks/useProgress.js` 훅 생성
2. 관문 완료 버튼 추가
3. SooryeonCard에 진도 배지
4. 문파별 진도율 표시
5. 홈페이지에 전체 진도 바

**파일:**
```
src/hooks/useProgress.js              (새로 생성)
src/components/shared/ProgressBadge.jsx    (새로 생성)
src/components/shared/GatePage.jsx    (수정)
src/app/training/[topic]/page.js     (수정)
```

**우선순위:** 높음 (빠르게 구현 가능)

---

#### P0-3. 힌트 시스템 (2주)

**내용:**
학습자가 막혔을 때 단계적 힌트를 제공합니다.

```javascript
// UI
<button>💡 힌트 보기</button>
  → "함수형 업데이트를 사용하세요"
<button>💡 다음 힌트</button>
  → "setState(prev => prev + 1)처럼..."
<button>정답 보기</button>
  → 전체 정답 코드
```

**구현:**
1. GatePage에 "힌트" 섹션 추가
2. 진행도에 따라 힌트 점진 공개 (1→2→정답)
3. 힌트 사용 이력 저장 (나중에 분석용)

**파일:**
```
src/components/shared/HintSystem.jsx  (새로 생성)
src/components/shared/GatePage.jsx    (수정)
src/lib/curriculum.js                 (수정: hints 필드)
```

**우선순위:** 중 (P0-1 이후 진행)

---

### 작은 개선사항들

#### P1-1. 선수조건 명시 (3일)

각 관문 페이지에서 선행할 관문을 표시합니다.

```javascript
// GatePage에 추가
<div className="bg-amber-50 border border-amber-200 p-4 rounded">
  <p className="text-sm font-semibold">📋 이 관문을 들으려면:</p>
  <ul className="text-sm list-disc list-inside">
    <li><Link href="/training/01-useState/lazy-initialization">3관문. Lazy Initialization</Link> 완료</li>
    <li><Link href="/training/02-useEffect/sync-not-lifecycle">2-1관문. Synchronization</Link> 완료</li>
  </ul>
</div>
```

**파일:**
```
src/lib/curriculum.js (prerequisites 필드 추가)
src/components/shared/GatePage.jsx (수정)
```

---

#### P1-2. 난이도 표시 (2일)

각 관문의 난이도를 시각적으로 표시합니다.

```javascript
// GatePage 헤더
<div className="flex items-center gap-2">
  <h1>1관문. Stale Closure</h1>
  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
    난이도: 중 ⭐⭐
  </span>
</div>
```

**파일:**
```
src/lib/curriculum.js (difficulty 필드: 'easy' | 'medium' | 'hard')
src/components/shared/GatePage.jsx (수정)
```

---

#### P1-3. 마지막 방문 추적 (1일)

학습자가 마지막으로 본 관문으로 바로 가기.

```javascript
// 훈련장 페이지에 추가
<Link href={lastVisitedGate}>
  📍 지난번 보던 관문으로 돌아가기
</Link>
```

**파일:**
```
src/hooks/useProgress.js (수정)
src/app/training/page.js (수정)
```

---

### 콘텐츠 개선

#### P2-1. 관문 데이터 보완 (3주)

모든 49개 관문에 다음을 추가합니다:

1. **정답 코드** (solutionCode)
   - 모든 관문
   - 완전히 동작하는 코드

2. **테스트 케이스** (testCases)
   - 핵심 관문 30개 (useState, useEffect, useRef)
   - 나머지 19개는 선택적

3. **힌트** (hints, 레벨 1-2)
   - 모든 관문
   - 단계적 가이드

**작업 분담:**
```
1단계 (1주): useState + useEffect 전체 (14개)
2단계 (1주): useRef + Custom Hooks (14개)
3단계 (1주): Context + Optimization + Next.js (21개)
```

---

#### P2-2. 디버깅 팁 추가 (선택, 향후)

각 관문에 일반적 실수와 해결책을 추가합니다.

```markdown
## 자주 하는 실수

❌ 이렇게 하면 안 됩니다:
\`\`\`javascript
setCount(count + 1);
setCount(count + 1);
// 결과: +1만 됨
\`\`\`

✅ 이렇게 하세요:
\`\`\`javascript
setCount(prev => prev + 1);
setCount(prev => prev + 1);
// 결과: +2 됨
\`\`\`

💡 왜? 클로저가 첫 count를 캡처했기 때문입니다.
```

---

## Phase v0.4: 실무 연결

### 목표
> **"배운 React 원리를 실무 패턴으로 연결한다"**

### 개요

```
v0.3 이후 학습자의 상태:
  ✅ useState, useEffect, useRef 등 원리 이해
  ✅ 자신감 있음 (검증으로 확인됨)
  ❌ "그런데 실무에선 뭘 써?"

v0.4의 목표:
  "배운 것" → "실무 라이브러리" 브릿지 제공
```

---

### 새로운 섹션: "패턴 가이드"

#### 1. 상태 관리 완전 가이드

**위치:** `/training/patterns/state-management`

**내용:**
```
├─ 로컬 UI 상태 (useState)
│  ├─ 언제? 모달, 탭, 폼 입력
│  ├─ 예: const [isOpen, setIsOpen] = useState(false)
│  └─ 실무 체크리스트
│
├─ 영속 값 (useRef)
│  ├─ 언제? 타이머 ID, DOM 참조, 렌더 관계없는 값
│  ├─ 예: const timerRef = useRef(null)
│  └─ 실무 체크리스트
│
├─ 앱 전역 상태 (Context)
│  ├─ 언제? 테마, 언어, 인증 상태 (자주 안 바뀜)
│  ├─ 주의: 자주 바뀌면 모든 소비자가 리렌더됨
│  ├─ 예: const { theme, setTheme } = useContext(ThemeContext)
│  └─ 실무 체크리스트
│
├─ 전역 상태 라이브러리 (Zustand)
│  ├─ 언제? 자주 바뀌는 전역 상태
│  ├─ 이점: selector로 최적화
│  ├─ 예: const user = useUserStore(s => s.user)
│  ├─ 링크: https://github.com/pmndrs/zustand
│  └─ 실무 체크리스트
│
└─ 서버 상태 (TanStack Query)
   ├─ 언제? API 데이터 (fetch, 캐싱, 동기화)
   ├─ 이점: 자동 캐싱, 재시도, 백그라운드 동기화
   ├─ 예: const { data } = useQuery({...})
   ├─ 링크: https://tanstack.com/query
   └─ 실무 체크리스트
```

**구현 방식:**
- 텍스트 가이드 + 인터랙티브 데모
- "이 상황이면 뭘 쓸까?" 퀴즈
- 실제 프로젝트 예시 코드

---

#### 2. 데이터 페칭 완전 가이드

**위치:** `/training/patterns/data-fetching`

**내용:**
```
❌ 과거 방식 (useEffect + fetch):
const [data, setData] = useState(null);
useEffect(() => {
  fetch('/api/users').then(r => r.json()).then(setData);
}, []);
문제점:
  ├─ 캐싱 없음
  ├─ 재시도 없음
  ├─ 백그라운드 동기화 없음
  └─ Race condition 가능성

✅ 현대 방식 (TanStack Query):
const { data } = useQuery({
  queryKey: ['users'],
  queryFn: () => fetch('/api/users').then(r => r.json()),
});
이점:
  ├─ 자동 캐싱
  ├─ 자동 재시도
  ├─ 백그라운드 동기화 (staleTime)
  └─ Race condition 자동 방지

✅ 최신 방식 (Next.js RSC):
const users = await getUsers();  // 서버에서 직접
결과:
  ├─ JS 번들 크기 작음
  ├─ DB에 직접 접근
  └─ 캐싱이 빌드 레벨
```

**구현 방식:**
- 마이그레이션 가이드 (useEffect → TanStack Query)
- TanStack Query 데모
- Next.js RSC 예시

---

#### 3. 폼 처리 완전 가이드

**위치:** `/training/patterns/form-handling`

**내용:**
```
❌ 과거 방식 (useState 수동):
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [nameError, setNameError] = useState('');
// 각 필드마다 state, error state...

✅ 현대 방식 (React Hook Form):
const { register, handleSubmit, formState } = useForm();
return (
  <form onSubmit={handleSubmit(onSubmit)}>
    <input {...register('name', { required: true })} />
    {formState.errors.name && <span>필수</span>}
  </form>
);
```

---

### 새로운 섹션: "라이브러리 심화"

#### 추가 미니 과정들

**1. TanStack Query 기초** (3-4시간)
```
1. useQuery 기초
2. 캐싱 이해하기
3. useMutation (변경)
4. Race Condition 해결
5. 최적화 패턴
```

**2. Zustand 기초** (2-3시간)
```
1. Store 만들기
2. Hook 사용하기
3. Selector로 최적화
4. DevTools
```

**3. React Hook Form 기초** (2-3시간)
```
1. useForm 기초
2. 검증 (validation)
3. 동적 필드 (useFieldArray)
4. Server Actions 연결
```

**4. Next.js App Router 심화** (4-5시간)
```
1. Server Components 패턴
2. Server Actions
3. Streaming & Suspense
4. 캐싱 전략 (revalidatePath, revalidateTag)
```

---

## Phase v1.0: 통합 플랫폼 (6-12개월 후)

### 최종 목표

```
v1.0 완성 상태:
  ✅ 49개 관문: React 원리 완벽 이해
  ✅ 검증 시스템: "내가 맞게 배웠다"
  ✅ 진도 추적: 동기 부여
  ✅ 패턴 가이드: "언제 뭘 써?"
  ✅ 라이브러리 기초: TanStack Query, Zustand, RHF, Next.js
  ✅ 통합 프로젝트: 배운 것을 모두 써서 만드는 프로젝트

결과:
  "49개 관문 + 패턴 가이드 + 라이브러리 = 실무 즉시 투입 가능"
```

---

## 우선순위 매트릭스

### 긴급 (이번 분기: v0.3)

| 작업 | 영향 | 난이도 | 우선순위 |
|------|------|--------|---------|
| 검증 시스템 (정답 코드 + 테스트) | 🔴 높음 | 중 | 1순위 |
| 진도 추적 | 🟡 중간 | 낮음 | 2순위 |
| 관문 데이터 보완 | 🔴 높음 | 높음 | 3순위 (병렬) |
| 힌트 시스템 | 🟡 중간 | 중 | 4순위 |

### 중요 (다음 분기: v0.4)

| 작업 | 영향 | 난이도 | 우선순위 |
|------|------|--------|---------|
| 상태 관리 패턴 가이드 | 🔴 높음 | 낮음 | 5순위 |
| 데이터 페칭 패턴 가이드 | 🔴 높음 | 중 | 6순위 |
| TanStack Query 미니 과정 | 🔴 높음 | 중 | 7순위 |
| Zustand 미니 과정 | 🟡 중간 | 낮음 | 8순위 |

### 선택 (장기)

| 작업 | 영향 | 난이도 | 우선순위 |
|------|------|--------|---------|
| React Hook Form 미니 과정 | 🟡 중간 | 중 | 9순위 |
| 통합 프로젝트 | 🟢 낮음 | 높음 | 10순위 |
| 성능 측정 가이드 | 🟢 낮음 | 높음 | 11순위 |

---

## 스케줄 제안

### v0.3 (4주)

```
Week 1:
  └─ P0-1 검증 시스템 기초 (정답 코드 + 테스트)
  └─ P0-2 진도 추적 (localStorage + UI)

Week 2-3:
  └─ 관문 데이터 보완 (useState, useEffect 전체)
  └─ P0-3 힌트 시스템

Week 4:
  └─ P1-1, P1-2, P1-3 작은 개선사항
  └─ 테스트 및 버그 수정
```

**아웃풋:** v0.3 릴리즈
- 검증 시스템으로 자신감 ✅
- 진도 추적으로 동기 ✅
- 실무에선 여전히 부족하지만 ⚠️

---

### v0.4 (6주)

```
Week 1-2:
  └─ 상태 관리 패턴 가이드 작성
  └─ 데이터 페칭 패턴 가이드 작성

Week 3-4:
  └─ TanStack Query 미니 과정 (4시간)
  └─ Zustand 미니 과정 (3시간)

Week 5-6:
  └─ React Hook Form 미니 과정 (선택)
  └─ 전체 통합 테스트
```

**아웃풋:** v0.4 릴리즈
- "배운 것을 실무에 어떻게 연결하는가" 명확 ✅
- 라이브러리 기초 학습 가능 ✅
- 실무 투입 준비 가능 ⚠️

---

### v1.0 (이후, 6-12개월)

```
Phase 1 (2주):
  └─ 성능 측정 및 최적화 가이드
  └─ TypeScript 연결 가이드

Phase 2 (4주):
  └─ 실전 프로젝트 (Todo 앱 + API)
  └─ 배운 모든 것을 써서 만들기

Phase 3 (2주):
  └─ 최종 검토 및 개선
  └─ v1.0 릴리즈
```

**아웃풋:** v1.0 릴리즈
- 완성된 학습 플랫폼 ✅
- 실무 즉시 투입 가능 ✅
- "한국 React 학습 표준" 위치 확보 🎯

---

## 성공 기준

### v0.3
- [ ] 모든 useState 관문에 정답 코드 있음
- [ ] 테스트 케이스 실행 가능 (통과/실패)
- [ ] 사용자가 진도를 추적할 수 있음
- [ ] "관문 완료 배지" 표시됨

### v0.4
- [ ] "상태 관리를 어떻게 하나?" 명확한 답 있음
- [ ] "데이터를 어떻게 fetch하나?" 명확한 답 있음
- [ ] TanStack Query 기초 학습 가능
- [ ] 학습자가 "다음 단계가 뭔지" 알 수 있음

### v1.0
- [ ] 49개 관문 + 패턴 가이드 + 라이브러리 = 통합 경험
- [ ] 학습자가 실무 프로젝트 시작 가능
- [ ] "이건 한국 최고의 React 학습 플랫폼" 평가

---

## 리소스 견적

### v0.3 (4주)

| 작업 | 시간 | 담당 |
|------|------|------|
| 검증 시스템 개발 | 40h | 개발자 |
| 진도 추적 UI/UX | 16h | 개발자 |
| 관문 데이터 보완 | 40h | 콘텐츠 |
| 힌트 시스템 | 16h | 개발자 |
| 테스트 및 배포 | 8h | QA + DevOps |
| **총합** | **120h** | **1인 = 3주** |

### v0.4 (6주)

| 작업 | 시간 | 담당 |
|------|------|------|
| 패턴 가이드 작성 | 40h | 콘텐츠 |
| TanStack Query 미니 과정 | 30h | 콘텐츠 + 개발 |
| Zustand 미니 과정 | 20h | 콘텐츠 + 개발 |
| React Hook Form 미니 과정 | 25h | 콘텐츠 + 개발 |
| 통합 테스트 | 10h | QA |
| **총합** | **125h** | **1인 = 4주** |

---

## 위험 요소 및 완화 전략

### 위험 1: 관문 데이터 보완에 시간이 오래 걸림

**위험도:** 높음 (49개 관문 × 정답 + 테스트 + 힌트)

**완화 전략:**
- [ ] useState + useEffect (14개)만 먼저 (P0)
- [ ] 나머지는 이후 (P1)
- [ ] 테스트는 필수 관문만 (30개)

### 위험 2: 라이브러리 미니 과정 품질 확보 어려움

**위험도:** 중간 (TanStack Query, Zustand는 넓은 주제)

**완화 전략:**
- [ ] "기초" 수준만 범위 정하기
- [ ] 공식 문서 링크 활용
- [ ] 실무 예시 중심 (이론 X)

### 위험 3: 학습자 수가 적을 수 있음

**위험도:** 낮음 (v0.3 출시 후 마케팅 필요)

**완화 전략:**
- [ ] GitHub 반응 모니터링
- [ ] 커뮤니티 피드백 수집
- [ ] 필요시 PR 만들기 (예: /r/reactjs)

---

## 다음 단계

1. 이 로드맵에 대한 팀 합의 (또는 개인 진행)
2. v0.3 작업 분해 및 스케줄링
3. 주 1회 진행 상황 체크 (docs/state.md 업데이트)

---

## 첨부 자료

- [분석 보고서](analysis-gaps.md)
- [v0.3 상세 작업 계획](tasks/active/) (작성 예정)
