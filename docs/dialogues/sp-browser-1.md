# 특별대담 — 브라우저를 이해한다 1부

> **키워드:** `browser-rendering`, `event-loop`
> **날짜:** 2026-03-31
> **시리즈:** 레이어 1 — 브라우저를 이해한다

---

## 1부 — 렌더링 파이프라인

**Q. 브라우저가 HTML을 받으면 그냥 바로 화면에 그리는 거야?**

아니야. 여러 단계를 거쳐.

```
HTML/CSS 받음
→ DOM 트리      (구조)
→ CSSOM 트리    (스타일)
→ Render 트리   (그릴 것만)
→ Layout        (위치/크기)
→ Paint         (색상/배경)
→ Composite     (레이어 합성 → 화면 출력)
```

---

**Q. DOM 트리가 뭐야?**

브라우저가 HTML을 메모리에 올린 객체 구조야.

```
HTML = 설계도 (문자열)
DOM  = 메모리에 올라간 실물 (객체 트리)
```

HTML 태그 하나가 DOM 노드 하나야. 텍스트도 노드, 속성도 노드, 가상요소도 노드.

```
Document (뿌리)
└── html
    ├── head
    └── body
        └── div#root
            └── h1 ("코드도보통지")
```

거꾸로 뒤집힌 나무 구조. `root`가 뿌리, `children`이 자식 가지.

노드 타입:
```
요소 노드   →  nodeType === 1  (<div>, <p> 등)
속성 노드   →  nodeType === 2  (class, id 등)
텍스트 노드 →  nodeType === 3  (텍스트 내용)
```

---

**Q. CSSOM은?**

CSS Object Model. DOM이 HTML을 메모리에 올린 것처럼, CSSOM은 CSS를 메모리에 올린 것.

```css
h1 { color: red; font-size: 24px; }
p  { color: gray; }
```

```
CSSOM
├── h1 → { color: red, font-size: 24px }
└── p  → { color: gray }
```

DOM 트리와 동시에 만들어져. HTML 파싱 중 `<link>` 나 `<style>` 만나면 CSS도 파싱 시작.

---

**Q. Render 트리는 뭐야?**

DOM + CSSOM의 교집합. **화면에 실제로 그릴 것만** 추려낸 트리.

```css
p { display: none; }
```

이 `<p>`는 DOM에는 있지만 Render 트리에는 없어. 화면에 그릴 필요가 없으니까.

```
display: none     → Render 트리에서 제거 (자리도 없음)
visibility: hidden → Render 트리에 있음 (자리는 차지, 눈에만 안 보임)
```

비유:
```
visibility: hidden  →  투명인간 (자리는 차지)
display: none       →  아예 퇴근 (자리 자체가 없음)
```

---

**Q. Layout이 뭐야?**

Render 트리엔 위치와 크기 정보가 없어. Layout 단계에서 모든 노드의 **정확한 위치와 크기**를 계산해.

```
"header는 화면 상단, 너비 100%, 높이 60px"
"div는 header 아래, 너비 80%, 높이 200px"
```

하나가 바뀌면 연쇄적으로 재계산 → 이게 **Reflow**.

비용이 큰 이유:
```
div 크기가 바뀌면?
→ 아래 요소들 위치 전부 재계산
→ 최악엔 전체 다시 계산 😩
```

---

**Q. Paint는?**

Layout이 "어디에, 얼마나 크게"였다면 Paint는 **"어떤 색으로, 어떻게 채울지"**.

```
색상, 배경, 테두리, 그림자 등
```

이게 **Repaint**.

Reflow vs Repaint 비용 차이:
```
Reflow  →  Layout부터 다시 → Paint까지   💸💸💸
Repaint →  Paint만 다시                  💸
```

---

**Q. Composite는?**

포토샵 레이어처럼 브라우저도 레이어를 나눠서 관리해. Composite는 이 레이어들을 합쳐서 최종 화면을 출력하는 단계.

```
[레이어 3] 애니메이션 요소
[레이어 2] 고정 헤더
[레이어 1] 본문 콘텐츠
     ↓
합쳐서 화면 출력
```

`transform`이 성능이 좋은 이유:
```css
transition: width 0.3s       /* Reflow 유발 😩 */
transition: background 0.3s  /* Repaint 유발 🙂 */
transition: transform 0.3s   /* Composite만 😍 */
```

`transform`은 자기 레이어만 움직여서 Layout, Paint를 건드리지 않아. GPU가 처리.

---

**Q. Lighthouse랑 연결하면?**

```
LCP  →  가장 큰 요소가 그려지는 시간  →  Paint 단계
CLS  →  화면 덜컹거림                →  Layout 단계
INP  →  클릭 후 화면 반응 속도       →  Layout + Paint 전체
```

skeleton이 CLS를 잡는 원리:
```
skeleton이 자리 미리 차지 → Layout 미리 계산
데이터 도착 → 자리에 교체 → Layout 변화 없음 → CLS 없음 ✅
```

---

## 2부 — 이벤트 루프

**Q. 이 코드 결과가 뭘까?**

```js
console.log('1')
setTimeout(() => console.log('2'), 0)
console.log('3')
```

0ms인데 결과는 `1 → 3 → 2`야.

---

**Q. 왜 그래?**

브라우저는 JS 실행할 때 두 줄이 있어:

```
콜스택 (Call Stack)  →  지금 당장 할 일
큐 (Queue)          →  나중에 할 일
```

`setTimeout`은 콜스택에서 빼서 큐에 넣어. 0ms여도.

---

**Q. 콜스택이 뭐야?**

함수 호출을 쌓는 접시탑. **LIFO — Last In, First Out**.

```
호출 → push (접시 올라감)
실행 → 접시 위에서 실행 중
끝   → pop  (접시 내려감)
```

```js
function a() { b() }
function b() { console.log('b!') }
a()
```

```
a() 호출  →  [a]
b() 호출  →  [b][a]
log 호출  →  [log][b][a]
log 끝    →  [b][a]
b 끝      →  [a]
a 끝      →  []
```

선언 순서가 아니라 **호출 순서**로 쌓여. 함수의 끝(`}` 또는 `return`)에서 pop.

에러 스택 트레이스가 이 콜스택을 그대로 출력한 것:
```
Error at console.log
      at b
      at a        ← 밑에서부터 읽으면 호출 순서
```

---

**Q. JS가 싱글 스레드라는 게 뭐야?**

콜스택이 하나 = 손이 하나 = 한 번에 하나씩만 실행 가능.

기다리면 전체가 멈추는 문제:
```
서버 응답 기다리는 동안
→ 클릭도 안 먹힘
→ 화면도 안 그려짐
→ 브라우저 완전 멈춤 😱
```

그래서 큐가 필요한 거야.

---

**Q. 큐는?**

대기줄. **FIFO — First In, First Out**. 먼저 온 것이 먼저 나감.

```
콜스택  →  새치기 합법 (LIFO)
큐      →  새치기 불법 (FIFO)
```

---

**Q. 이벤트 루프가 하는 일은?**

딱 하나:

```
"콜스택 비었어? 그럼 큐에서 꺼내서 콜스택에 올려!"
```

```
while(true) {
  콜스택 비었어?
  큐에 뭐 있어?
  → 있으면 꺼내서 콜스택에 올려!
}
```

쉬지 않고 계속 감시. **루프**라는 이름이 붙은 이유.

요리 비유:
```
물을 끓인다     →  큐에 넣음 "다 됐으면 알려줘"
양념을 만든다   →  콜스택에서 계속 처리
물이 끓었으면   →  이벤트 루프가 큐에서 꺼냄
재료를 넣는다   →  실행
```

---

**Q. 큐가 두 종류라고?**

```
마이크로태스크 큐  →  VIP 줄
매크로태스크 큐    →  일반 줄
```

```
매크로태스크  →  setTimeout, setInterval, 이벤트 핸들러
마이크로태스크 →  Promise.then(), async/await
```

우선순위:
```
콜스택 비워짐
→ 마이크로태스크 큐 전부 비움  ← VIP 먼저!
→ 매크로태스크 큐에서 하나 꺼냄
→ 반복
```

```js
setTimeout(() => console.log('매크로'), 0)
Promise.resolve().then(() => console.log('마이크로'))
console.log('콜스택')

// 결과:
// 콜스택
// 마이크로   ← Promise가 setTimeout보다 먼저
// 매크로
```

마이크로태스크가 VIP인 이유:
```
데이터 통신 결과 → 최대한 빨리 화면에 반영
→ setTimeout보다 먼저 처리
→ 사용자가 덜 기다림
```

---

**Q. 비동기가 싱글 스레드 때문이었구나?**

맞아.

```
싱글 스레드
→ 기다리면 전체가 멈춤
→ 기다림이 있는 건 전부 비동기로 처리
→ Promise/async/await으로 다룸
```

비동기가 붙는 것들:
```
비동기 통신    →  서버 응답 기다림
비동기 렌더링  →  무거운 렌더링 기다림
비동기 연산    →  오래 걸리는 계산 기다림
```

기다림의 종류가 다를 뿐, 전부 같은 원리.

---

**Q. JS도 멀티 스레드 비슷하게 쓸 수 있다고?**

**Web Worker** — JS에서 진짜 별도 스레드 생성.

```
메인 스레드   →  UI 담당
Web Worker   →  무거운 연산 담당 (DOM 못 건드림)
```

```
이미지 처리, 암호화 연산, 대용량 데이터 가공
→ 메인 스레드에서 하면 화면 버벅임
→ Web Worker에 맡기면 UI는 멀쩡
```

근데 UI는 어떤 언어든 싱글 스레드가 업계 표준이야:
```
Java  (Android) →  UI 스레드 하나
Swift (iOS)     →  Main 스레드 하나
JS    (Browser) →  메인 스레드 하나
```

우리 프로젝트 Sandpack도 Web Worker 사용:
```
코드 실행을 별도 스레드에서 처리
→ 에디터에서 코드 실행해도 화면 안 버벅임
```

---

## 핵심 인사이트

1. **브라우저는 HTML을 받으면 바로 그리지 않는다** — DOM → CSSOM → Render → Layout → Paint → Composite 6단계
2. **노드 = 메모리에 올라간 상자** — 요소, 속성, 텍스트, 가상요소 전부 노드
3. **display:none은 Render 트리에서 제거** — visibility:hidden과 근본적으로 다름
4. **transform이 성능 최고인 이유** — Composite만 건드려서 Layout/Paint 비용 없음
5. **JS는 싱글 스레드** — 기다림이 있는 건 전부 큐로 빠짐
6. **이벤트 루프 = 콜스택 비면 큐에서 꺼내주는 감시자**
7. **마이크로태스크(Promise)가 매크로태스크(setTimeout)보다 먼저** — 데이터 통신이 VIP인 이유
8. **비동기 = 싱글 스레드의 해결책** — 통신뿐 아니라 렌더링, 연산 전부 해당

---

## 우리 프로젝트와의 연결

```
skeleton    →  CLS 방지, Layout 자리 미리 잡기
Sandpack    →  Web Worker로 코드 실행 격리
Suspense    →  비동기 렌더링 대기 처리
await params →  마이크로태스크, Promise 기반
```

---

## 다음 대담 예정

- 레이어 1 2부 — 네트워크, HTTP 캐싱, Web API
- 레이어 2 — JavaScript 순수 (클로저, 프로토타입)

→ [index.md](./index.md) 에서 주제 선택
