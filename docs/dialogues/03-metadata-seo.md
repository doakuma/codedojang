# 대담 03 — layout.js 메타데이터와 SEO

> **키워드:** `next-js-choice` (3부) — 핵심 증거 #3
> **날짜:** 2026-03-30
> **관련 파일:**
> - `src/app/layout.js`
> - `src/app/training/page.js`
> - `src/app/training/[topic]/[slug]/page.js`

---

## 대담

**Q. Vite 앱에서 메타데이터 관리하려면 react-helmet을 써야 한다는 게 무슨 말이야?**

Vite는 `public/index.html` 하나를 기반으로 SPA를 만들어. 페이지마다 `<title>`을 바꾸려면 JS로 직접 DOM을 건드려야 해:

```js
// 직접 DOM 조작
document.title = "수련장 | 코드도보통지"
```

페이지가 많아지면 관리가 힘들어지니까 `react-helmet`이 나온 거야:

```js
import { Helmet } from 'react-helmet'

function TrainingPage() {
  return (
    <>
      <Helmet>
        <title>수련장 | 코드도보통지</title>
        <meta name="description" content="7대 문파 목록" />
      </Helmet>
      ...
    </>
  )
}
```

Next.js는 이걸 프레임워크 레벨에서 해결해:

```js
// 각 page.js에서 그냥 export하면 끝
export const metadata = {
  title: "수련장 | 코드도보통지",
  description: "7대 문파 목록",
}
```

라이브러리 설치도, 컴포넌트 안에 끼워 넣을 필요도 없어.

---

**Q. Vite + react-helmet이 SEO에 안 좋은 이유가 뭐야?**

SEO에 최악이지.

```
구글 봇이 Vite SPA 크롤링:
  HTML 받음 → <title>내 앱</title> (하드코딩)
  JS 실행... (봇은 기다려줄 수도 있고 아닐 수도 있고)
  react-helmet이 title 바꿈
  → 봇이 못 읽었을 가능성 높음 ❌

구글 봇이 Next.js SSG 크롤링:
  HTML 받음 → <title>수련장 | 코드도보통지</title> (이미 박혀있음)
  JS 실행 필요 없음
  → 봇이 바로 읽음 ✅
```

서버에서 HTML 만들 때 이미 `<title>`이 박혀서 나오니까 봇 입장에서 완벽한 거야.

---

**Q. metadata는 필수야? 서버 컴포넌트 형태를 취하고 있는데.**

필수 아니야. 없어도 페이지는 완전히 정상 작동해. 그냥 `<title>`이 없거나 기본값으로 나오는 것뿐이야.

근데 중요한 포인트가 있어 — **metadata는 서버 컴포넌트에서만 export 가능해.**

```js
'use client'

export const metadata = { ... } // ❌ 에러남
export default function Page() { ... }
```

`'use client'` 붙은 컴포넌트에서 metadata를 export하면 Next.js가 에러를 뱉어. 클라이언트 컴포넌트에서는 사용 못 해.

---

**Q. 왜 클라이언트 컴포넌트에서 막은 거야?**

의도적인 설계야.

```
클라이언트 컴포넌트:
  브라우저에서 JS 실행된 후에야 렌더링
  → 그때 metadata를 넣으면?
  → HTML에 이미 없는 상태로 봇이 크롤링
  → SEO 의미 없음
  → Next.js가 아예 막아버린 거야 ❌

서버 컴포넌트:
  빌드 타임에 HTML 생성할 때 metadata도 같이 박힘
  → 브라우저/봇이 받는 HTML에 이미 있음 ✅
```

"이걸 클라이언트에서 쓰는 건 의미가 없으니까 아예 못 쓰게 막겠다"는 거야.

---

**Q. 결국 모든 게 SSR 중심 설계네.**

맞아! 딱 한 줄로 정리돼:

```
Next.js App Router = SSR/SSG 중심 설계
'use client'       = 예외적으로 클라이언트에서 실행해야 할 때만
```

기존 React(Vite, CRA)가 **"기본이 클라이언트, 필요하면 서버"** 였다면
Next.js App Router는 **"기본이 서버, 필요하면 클라이언트"** 로 패러다임이 뒤집힌 거야.

그래서 CLAUDE.md에도 이렇게 적혀있어:

```
RSC 우선: 'use client'는 이벤트 핸들러·브라우저 API·Sandpack 등
          반드시 필요한 경우에만
```

---

## 핵심 인사이트

1. **metadata = Next.js 예약어** — `export const metadata`로 선언, 라이브러리 불필요
2. **metadata는 선택사항** — 없어도 동작, 있으면 SEO 개선
3. **클라이언트 컴포넌트에서 metadata 사용 불가** — 의도적 설계, 의미가 없으니까 막은 거
4. **모든 건 SSR 중심 설계** — 기본이 서버, 'use client'는 예외
5. **Vite SPA vs Next.js SSG** — SEO 관점에서 구조적 차이

---

## metadata 체인 정리

```
'use client' 없음
→ RSC
→ 빌드 타임에 HTML 생성
→ metadata도 HTML에 박혀서 나옴
→ 봇이 바로 읽음
→ SEO 완벽
```

---

## 다음 대담 예정

- `'use client'`가 붙은 두 파일 분석 (`CodeEditor.jsx`, `SooryeonCard.jsx`)

→ [index.md](./index.md) 에서 주제 선택
