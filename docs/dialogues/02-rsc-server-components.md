# 대담 02 — 순수 RSC (React Server Components) 분석

> **키워드:** `next-js-choice` (2부) — 핵심 증거 #2
> **날짜:** 2026-03-30
> **관련 파일:**
> - `src/app/training/page.js`
> - `src/app/training/[topic]/[slug]/page.js`
> - `src/components/shared/CodeEditor.jsx`
> - `src/components/shared/SooryeonCard.jsx`

---

## 대담

**Q. `training/page.js`가 "순수 RSC"라는 게 무슨 의미야?**

```js
import { getAllTopicIds, getTopic } from "@/lib/curriculum";

export default function TrainingIndexPage() {
  const topicIds = getAllTopicIds();
  return ( ... );
}
```

이 파일에 없는 것들:
- `'use client'` 없음
- `useState` 없음
- `useEffect` 없음
- 이벤트 핸들러 없음

데이터 읽어서 HTML 뱉는 게 전부야. 이게 RSC(React Server Component)야.

---

**Q. RSC는 Next.js 규범이야, 아니면 React 공식이야?**

둘 다야. 순서가 있어:

```
React팀: "서버에서 실행되는 컴포넌트 스펙 만들었어"
Next.js:  "우리가 제일 먼저 구현할게!" ← App Router가 이거야
```

RSC는 React 공식 스펙이지만, Next.js App Router가 RSC를 쓸 수 있는 사실상 유일한 프로덕션 환경이야.

---

**Q. Next.js 없이도 서버 컴포넌트를 만들 수 있어?**

이론적으로는 가능한데, 현실적으로 거의 불가능해.

RSC를 직접 구현하려면 서버 런타임 환경 구성, 클라이언트/서버 번들 분리, 스트리밍 처리 등을 직접 다 세팅해야 해. Next.js가 이 복잡한 걸 전부 추상화해서 `'use client'` 없으면 RSC, 있으면 클라이언트 컴포넌트로 단순하게 쓸 수 있게 해주는 거야.

> RSC는 React 스펙이지만, Next.js 없이 쓰는 건 직접 비행기 만들어서 타는 것과 비슷해.

---

**Q. React가 쓰지도 못하는 RSC를 왜 만들었어?**

React 앱은 기본적으로 클라이언트에서 전부 실행돼서 JS 번들이 커지고 초기 로딩이 느린 문제가 있었어. 이걸 해결하려고 RSC 스펙을 만든 거야.

```
React팀:  스펙 설계 + 코어 구현
Next.js:  "우리 서버 인프라에 올려줄게"
개발자:   그냥 가져다 씀
```

USB 규격은 표준위원회가 만들고, 실제 USB 포트를 노트북에 박는 건 제조사가 하는 것처럼.

---

**Q. 서버 컴포넌트의 특징이 뭐야?**

```
1. JS가 브라우저에 안 내려가
   → 컴포넌트 코드가 클라이언트에 전달되지 않음
   → HTML로 변환된 결과물만 내려감

2. 브라우저 API를 쓸 수 없어
   ❌ useState, useEffect
   ❌ window.localStorage
   ❌ document.querySelector

3. 서버 자원에 직접 접근 가능
   ✅ await fetch('https://api...')
   ✅ await db.query('SELECT ...')
```

---

**Q. `training/page.js`가 RSC인 게 실질적으로 어떤 이득을 줘?**

SSG를 가능하게 해줘.

```
빌드 타임:
  RSC로 서버에서 TrainingIndexPage() 실행
  → curriculum.js 읽어서 7개 문파 카드 렌더링
  → 그 결과를 HTML로 구워서 저장 (SSG)
  → JS 번들 없음

브라우저 요청:
  → 미리 구워둔 HTML 그냥 반환
```

RSC가 **"어떻게 실행하느냐"**, SSG가 **"언제 실행하느냐"**야.
이 페이지는 둘 다야. RSC이기 때문에 SSG가 자연스럽게 따라온 거야.

---

**Q. `'use client'`를 붙이면 어떻게 돼?**

SSG가 안 돼. 클라이언트 컴포넌트는 브라우저에서 실행돼야 하니까 HTML을 빌드 타임에 미리 못 만들어.

```
'use client' 없음 → RSC → SSG 가능
'use client' 있음 → 클라이언트 컴포넌트 → SSG 불가
```

---

**Q. `pnpm dev`는 빌드가 아닌 거야?**

```
pnpm dev   → 개발 모드 (빌드 아님)
pnpm build → 진짜 빌드
```

`pnpm dev`는 파일 저장할 때마다 즉시 반영, SSG/generateStaticParams 일단 무시하고 그냥 실행. 개발 편의성 우선이야.

`pnpm build`는 generateStaticParams() 실행 → HTML 파일 생성 → JS 번들 최소화. 최적화 우선이야.

그래서 지금까지 얘기한 SSG 효과는 `pnpm dev`로는 한 번도 체감된 적이 없는 거야.

---

**Q. 개발 모드에서는 링크 접속하면 그때 페이지가 생성되는 거야?**

응. 요청이 들어올 때 서버에서 렌더링해서 브라우저에 반환해. SSR이랑 비슷한 동작이야. 거기다 HMR(Hot Module Replacement)로 파일 수정 저장하면 브라우저가 자동으로 반영돼.

| 상황 | 페이지 생성 시점 |
|------|----------------|
| `pnpm dev` | 링크 접속할 때마다 |
| `pnpm build` | 빌드할 때 한 번에 전부 |
| 배포 후 | 미리 구워둔 HTML 바로 반환 |

---

**Q. Vercel 배포하면 어떤 흐름이야?**

```
GitHub push
→ Vercel이 감지
→ pnpm build 자동 실행
   → generateStaticParams() 실행
   → HTML 56개 생성
→ 전세계 CDN에 뿌려짐
→ 사용자 접속 → 가장 가까운 CDN에서 HTML 반환
```

Vercel + Next.js SSG 조합이 강한 게, CDN에 HTML이 올라가 있으니까 서버 연산이 아예 없어. 그냥 파일 전송이야.

---

**Q. Next.js에서 "서버"가 뭐야? 두루뭉실하게 느껴져.**

상황마다 달라:

```
pnpm dev 할 때:
  네 컴퓨터에서 실행되는 Node.js 프로세스
  localhost:3000이 바로 이 서버

pnpm build 할 때:
  사실 서버가 아님
  빌드 머신(네 컴퓨터 or Vercel)에서 Node.js가 잠깐 실행됐다가 꺼지는 거
  HTML 파일들만 남기고

Vercel 배포 후:
  SSG 페이지 → 서버 없음! CDN이 HTML 파일 그냥 줌
  SSR 페이지 → Vercel의 서버리스 함수가 실행
```

이 프로젝트에서 "서버에서 실행된다"의 진짜 의미:

> 빌드할 때 Node.js가 잠깐 실행되면서 HTML 만들고 사라진다

---

**Q. Next.js 쓰면 별도 API 서버가 필요 없다는 말이 맞아?**

맞아. 정확하게는 "별도의 API 서버가 필요 없다"야.

```
기존 방식:
  브라우저 → API 서버(Express/Spring 등) → DB
  (터미널 1: pnpm dev, 터미널 2: node server.js, 터미널 3: DB...)

Next.js 방식:
  브라우저 → Next.js → DB
  (터미널 1: pnpm dev, 끝!)
```

Next.js 안에 Route Handlers(`app/api/`)로 API 엔드포인트를 같이 만들 수 있고, RSC에서는 API 호출 없이 DB에 직접 접근도 가능해.

---

**Q. 그게 BFF랑 연관이 있어?**

연관 있어. BFF(Backend For Frontend)는 프론트엔드 전용 API 서버를 따로 두는 패턴이야.

```
BFF 패턴:
  브라우저 → BFF(데이터 가공) → 여러 API 서버들 → DB
  백엔드 API 여러 개를 프론트 입맛에 맞게 조합해서 전달

RSC 패턴:
  브라우저 ← HTML(서버에서 이미 가공됨)
  API 호출 자체를 없애버림
```

Next.js는 BFF를 대체할 수도 있고, RSC를 쓰면 BFF 자체가 필요 없어지는 상황도 만들 수 있어. (BFF에 대한 더 깊은 이야기는 별도 대담에서)

---

## 핵심 인사이트

1. **RSC = React 스펙, Next.js = 구현체** — RSC를 쓰려면 사실상 Next.js가 필수
2. **`'use client' 없음 = RSC = SSG 가능** — 이 체인이 이 프로젝트의 핵심
3. **"서버"의 의미가 상황마다 달라** — dev 모드, 빌드 타임, 배포 후가 전부 다름
4. **`pnpm dev`로는 SSG 효과를 체감할 수 없어** — Vercel 배포 후에야 의미가 생김
5. **Next.js = 프론트 + API 서버 역할** — 별도 백엔드 없이 풀스택 가능

---

## 다음 대담 예정

- BFF 심화 (별도 대담)
- `'use client'`가 붙은 두 파일 분석 (`CodeEditor.jsx`, `SooryeonCard.jsx`)

→ [index.md](./index.md) 에서 주제 선택
