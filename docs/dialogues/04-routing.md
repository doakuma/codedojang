# 대담 04 — Next.js App Router 라우팅

> **키워드:** `slug-routing`
> **날짜:** 2026-03-30
> **관련 파일:**
> - `src/app/training/[topic]/[slug]/page.js`
> - `src/app/training/[topic]/page.js`
> - `src/app/training/page.js`

---

## 대담

**Q. 이 프로젝트 라우팅 구조가 어떻게 돼?**

```
src/app/
├── layout.js                          ← 전체 공통 레이아웃
├── page.js                            ← / (홈)
└── training/
    ├── page.js                        ← /training
    ├── [topic]/
    │   ├── page.js                    ← /training/01-useState
    │   └── [slug]/
    │       └── page.js                ← /training/01-useState/stale-closure
```

폴더 구조 자체가 URL이야. 파일이 아니라 **폴더**가 라우팅을 결정해. Next.js App Router 기반이니까.

---

**Q. 대괄호 `[topic]`, `[slug]`가 뭘 의미해?**

동적 경로야.

```
[topic] → 이 자리에 뭐가 와도 다 받겠다
[slug]  → 이 자리에 뭐가 와도 다 받겠다

/training/01-useState          → topic = '01-useState'
/training/02-useEffect         → topic = '02-useEffect'
/training/01-useState/batching → topic = '01-useState', slug = 'batching'
```

폴더명이 `[topic]`이면 그 자리에 어떤 값이 오든 같은 `page.js`로 처리하고, 그 값이 `params`로 전달돼.

---

**Q. 세그먼트(Segment)가 뭐야?**

URL을 `/`로 나눴을 때 각 조각이야.

```
/training/01-useState/stale-closure
  ↓         ↓           ↓
세그먼트1  세그먼트2   세그먼트3
```

영어로 segment = 구간, 조각. 그대로야.

---

**Q. 슬러그(Slug)는 어디서 유래된 말이야?**

신문/출판 업계에서 온 말이야.

```
옛날 신문사에서:
기사 제목: "코드도보통지, React 학습 플랫폼 출시!"
→ 너무 길고 특수문자 있고 URL에 못 씀
→ 짧고 URL 친화적으로 변환
→ "codedojang-react-learning-platform"
→ 이걸 슬러그라고 불렀어
```

URL에서 slug 규칙:
```
사람이 읽기 좋고 ✅
소문자 + 하이픈만 사용 ✅
공백/특수문자 없음 ✅

"Stale Closure"   → stale-closure
"Race Condition"  → race-condition
"AbortController" → abort-controller
```

기술적 이해보다 어원에서 먼저 접근하는 게 더 오래 남아.

---

**Q. Dynamic Route의 종류가 어떤 게 있어?**

```
[slug]        → 단일 세그먼트 (1개만)
              /training/stale-closure → slug = 'stale-closure'

[...slug]     → catch-all (1개 이상, 여러 세그먼트)
              /training/a/b/c → slug = ['a', 'b', 'c']

[[...slug]]   → optional catch-all (0개 이상, 없어도 됨)
              /training → slug = undefined
              /training/a/b → slug = ['a', 'b']

(group)       → URL에 영향 없는 폴더 그룹핑
              /(auth)/login → /login 으로 접근
```

---

**Q. catch-all `[...slug]`로도 같은 걸 구현할 수 있지 않아?**

가능은 해. 근데 복잡도가 확 올라가:

```
[topic]/[slug] 방식:
  params.topic → '01-useState'  (명확)
  params.slug  → 'stale-closure' (명확)

[...slug] 방식:
  params.slug → ['01-useState', 'stale-closure']
  slug[0]이 topic인지 어떻게 알아?
  slug가 1개만 오면? 2개면? 3개면?
  → 방어 코드가 늘어남 😩
```

catch-all이 유용한 경우:
```
문서 사이트처럼 depth가 가변적일 때
  /docs/a
  /docs/a/b
  /docs/a/b/c
  → depth가 몇 단계일지 모를 때
```

이 프로젝트는 depth가 딱 2단계로 고정이니까 `[topic]/[slug]`로 이름 붙이는 게 훨씬 명확해.

---

**Q. Next.js 파일명들의 어원을 알면 감이 오지 않아?**

```
page.js
→ 말 그대로 "페이지" — 이 파일이 있어야 URL로 접근 가능

layout.js
→ 인쇄 업계 레이아웃 — 페이지의 틀, 뼈대
→ 자식 페이지들을 감싸는 공통 틀

template.js
→ 매번 새로 찍어내는 틀 — 페이지 이동할 때마다 새로 마운트

loading.js
→ 로딩 중일 때 보여줄 것 — Suspense 자동 래핑

error.js
→ 에러 발생했을 때 보여줄 것

not-found.js
→ 404, 말 그대로 "못 찾음"

route.js
→ API 엔드포인트 — page.js는 HTML, route.js는 JSON 반환

middleware.js
→ middle(중간) + ware(도구)
→ 요청이 페이지에 도달하기 전 중간에서 가로채는 것
```

어원만 알면 공식문서 처음 봐도 파일명 보고 역할이 감이 와.

---

**Q. 공식 문서에서 params를 어떻게 받아?**

```js
// 서버 컴포넌트 (RSC) — async/await로 받아
export default async function Page({ params }) {
  const { slug } = await params  // ← await 필수!
  return <div>My Post: {slug}</div>
}

// 클라이언트 컴포넌트 — use()로 받아
'use client'
import { use } from 'react'

export default function Page({ params }) {
  const { slug } = use(params)  // ← use() 사용
}
```

`params`가 **Promise**야! Next.js 15부터 바뀐 거야.

```
Next.js 14 이전: params가 그냥 객체 { slug: 'stale-closure' }
Next.js 15 이후: params가 Promise → await 해야 함
```

이 프로젝트 코드가 `await params`를 쓰는 게 이래서야. Next.js 15 스펙을 따른 거.

---

## 핵심 인사이트

1. **폴더 구조 = URL** — 파일 기반 라우팅의 핵심
2. **`[폴더명]` = 동적 경로** — 대괄호가 "뭐든 받겠다"는 의미
3. **슬러그 = 신문 업계 어원** — URL 친화적 식별자
4. **세그먼트 = URL의 조각** — `/`로 나눈 각 부분
5. **catch-all은 depth가 가변적일 때** — 고정 depth면 명시적 이름이 낫다
6. **params는 Promise (Next.js 15)** — 서버 컴포넌트는 `await`, 클라이언트는 `use()`

---

## 미완료 — 추후 이어서

라우팅에 대해 아직 아리까리한 부분이 있어서 추후 대담에서 더 이어갈 예정.

→ [index.md](./index.md) 에서 주제 선택
