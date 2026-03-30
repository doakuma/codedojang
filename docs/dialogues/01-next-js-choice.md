# 대담 01 — Next.js App Router 선택 분석

> **키워드:** `next-js-choice`
> **날짜:** 2026-03-30
> **관련 파일:**
> - `src/app/training/[topic]/[slug]/page.js`
> - `src/app/training/[topic]/page.js`
> - `src/lib/curriculum.js`

---

## 대담

**Q. 이 소스는 어떻게 만들어진 거야?**

바이브 코딩 결과물이야. 소스를 일일이 확인하면서 진행한 게 아니라, 클로드와 채팅으로 진행하고 화면으로만 확인해왔어. 이 대담을 통해 "왜 이렇게 됐지?"를 파악해서 다음 프로젝트를 주도적으로 진행하려고 해.

---

**Q. `generateStaticParams()`가 뭐야? 이름이 의미심장하던데.**

```js
// src/app/training/[topic]/[slug]/page.js
export function generateStaticParams() {
  return getAllGatePaths().map(({ topic, slug }) => ({ topic, slug }));
}
```

Next.js의 **예약 함수야.** 이름을 바꾸면 안 돼 — `makePages()`나 `createRoutes()`로 바꾸면 Next.js가 인식을 못 해. 이름 자체가 프레임워크와의 계약이야.

---

**Q. 그럼 공통 함수로 뽑아서 `/lib/utils.js`에 선언하고 import해서 쓸 수 있어?**

안 돼. Next.js가 `generateStaticParams`를 찾는 위치가 해당 `page.js` 파일로 딱 정해져 있어. 다른 파일에서 import해온 형태로는 인식을 못 해.

근데 이 프로젝트는 이미 최선의 구조로 되어 있어:

```js
// ✅ 이름은 각 page.js에, 로직은 curriculum.js에
export function generateStaticParams() {
  return getAllGatePaths(); // 실제 로직은 curriculum.js에서 공통 관리
}
```

curriculum.js에서 관문을 추가/수정하면 `generateStaticParams`는 손댈 필요 없이 자동 반영돼.

---

**Q. Pages Router의 `getStaticPaths`랑 같은 거야?**

완전히 같은 역할이야. App Router로 오면서 이름만 바뀐 거야.

```js
// Pages Router (옛날 방식)
export async function getStaticPaths() {
  return { paths: [...], fallback: false }
}

// App Router (현재)
export function generateStaticParams() {
  return [...]
}
```

---

**Q. 왜 export를 붙이는 거야?**

Next.js 빌드 시스템이 `page.js`를 import해서 `generateStaticParams`를 꺼내 써야 하니까. `export` 없으면 파일 외부에서 접근이 불가능해.

```js
export default function Page() { ... }      // "이게 이 페이지의 UI야"
export function generateStaticParams() { }  // "이게 이 페이지의 경로 목록이야"
```

둘 다 Next.js한테 "이거 가져가서 써" 하고 내보내는 거야.

---

**Q. 전체 흐름을 정리하면?**

```
generateStaticParams() 실행 (빌드 타임)
→ [{ topic: '01-useState', slug: 'stale-closure' }, ...]  반환
→ Next.js가 각 객체마다 Page() 호출
   Page({ params: { topic: '01-useState', slug: 'stale-closure' } })
   Page({ params: { topic: '01-useState', slug: 'batching' } })
   ... (49번 반복)
→ HTML 파일 49개 생성 완료
```

---

**Q. 이거 SSR이야 SSG야?**

**SSG** (Static Site Generation)야.

```
SSG → "미리 구워둔 빵" — 빌드할 때 한 번만 생성
SSR → "주문 들어오면 굽는 빵" — 요청마다 생성
```

`generateStaticParams`에서 **Static**이 SSG의 Static이야. 이름에 답이 있었던 거지.

---

## 핵심 인사이트

1. **`generateStaticParams`는 Next.js 예약어** — 이름 변경 불가, `page.js`에 반드시 위치해야 함
2. **이름은 각 page.js에, 로직은 curriculum.js에** — 이미 역할 분리가 잘 되어 있음
3. **바이브 코딩의 결과물이지만** 이 부분은 Next.js 컨벤션을 정확하게 따른 코드
4. **데이터가 JS 파일에 하드코딩**되어 있어서 SSG의 이점이 희석되긴 하지만, 구조 자체는 올바름

---

## 다음 대담

→ [index.md](./index.md) 에서 주제 선택
