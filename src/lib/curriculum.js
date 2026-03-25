/**
 * 정공법 수련 커리큘럼 데이터
 * 각 관문(gate)은 theory(이론), mission(임무), starterCode(수련 코드)를 포함한다.
 */

const TOPICS = {
  '01-useState': {
    title: '01. useState: 상태의 본질과 렌더링 엔진',
    shortTitle: 'useState',
    badges: ['React', 'Hook', 'State'],
    description: '리액트 상태 관리의 근본 원리를 체득하고, 7가지 실무 패턴으로 렌더링 엔진을 완전히 지배하라.',
    theoryContent: `## 상태(State)란 무엇인가: UI와 데이터의 선언적 연결

**무엇인가:**
컴포넌트 내부에서 유지되는 동적인 데이터이자, 리액트가 화면을 다시 그리게 만드는 핵심 트리거. 일반 변수와 달리 \`useState\`로 선언된 값은 변경 시 해당 컴포넌트의 리렌더링을 보장한다.

**왜 쓰는가:**
직접적인 DOM 조작 없이 "데이터 변화 = 화면 변화"라는 선언적 UI를 실현하기 위해. 리액트는 상태를 스냅샷으로 다루며, 불변성(Immutability)을 지킨 업데이트만이 올바른 리렌더링을 보장한다.

**언제 쓰는가:**
사용자 입력, 서버 응답 등 화면에 즉각 반영되어야 하는 가변 데이터가 있을 때. 단, 렌더링에 영향을 주지 않는 값은 \`useRef\`를 고려하라.`,
  },
  '02-useEffect': {
    title: '02. useEffect: 사이드 이펙트와 선언적 동기화',
    shortTitle: 'useEffect',
    badges: ['React', 'Hook', 'Side Effect'],
    description: "외부 세계와의 통신을 '동기화' 관점으로 재정의하고, 7가지 실무 패턴으로 Effect를 완전히 통제하라.",
    theoryContent: `## 사이드 이펙트(Side Effect)의 관리: 리액트 외부 세계와의 통신

**무엇인가:**
순수 함수적 렌더링을 벗어나 외부 시스템(API, DOM, 타이머)과 상호작용하는 모든 행위. \`useEffect\`는 이 비순수한 작업들을 렌더링 이후 안전하게 실행하는 격리 공간이다.

**왜 쓰는가:**
리액트 외부의 상태와 컴포넌트의 내부 상태를 안전하고 일관되게 동기화하기 위해. 의존성 배열이 이 동기화의 조건을 선언한다.

**언제 쓰는가:**
데이터 패칭, 이벤트 구독, 수동 DOM 조작, 외부 라이브러리 인스턴스화 시점. 단, 서버 컴포넌트(RSC) 환경에서는 \`useEffect\` 없이 직접 \`await fetch()\`를 사용하라.`,
  },
  '03-useRef': {
    title: '03. useRef & DOM: 탈출구와 명령적 제어',
    shortTitle: 'useRef & DOM',
    badges: ['React', 'Hook', 'DOM'],
    description: '렌더링 궤도를 벗어난 ref의 두 얼굴을 이해하고, 7가지 패턴으로 명령적 제어를 완전히 장악하라.',
    theoryContent: `## 레퍼런스(Reference)의 철학: 렌더링 궤도를 벗어난 영속적 기억

**무엇인가:**
리렌더링을 유발하지 않으며 컴포넌트 생애주기 동안 유지되는 가변 저장소. \`useRef\`는 두 가지 얼굴을 가진다: DOM 노드 직접 접근과 렌더링 외부 가변 값 저장.

**왜 쓰는가:**
화면 갱신 없이 값만 유지하거나, 리액트의 추상화를 뚫고 직접 DOM을 제어하기 위해. 렌더링 사이클에 묶이지 않아야 하는 값에 \`useState\`를 쓰는 것은 과잉이다.

**언제 쓰는가:**
이전 값 저장, 타이머 ID 관리, 포커스/스크롤 제어 등 비반응형 데이터 관리 시. DOM 조작은 반드시 \`useEffect\` 내에서만 수행하라.`,
  },
  '04-customHooks': {
    title: '04. Custom Hooks: 로직의 추상화와 재사용성',
    shortTitle: 'Custom Hooks',
    badges: ['React', 'Hook', 'Abstraction'],
    description: '비즈니스 로직을 독립 선언하고, 7가지 실전 패턴으로 컴포넌트를 날렵하게 만들어라.',
    theoryContent: `## 커스텀 훅(Custom Hooks)의 존재 이유: 비즈니스 로직의 독립 선언

**무엇인가:**
리액트 기본 훅들을 조합하여 특정 기능을 수행하도록 만든 사용자 정의 로직. \`use\`로 시작하는 이름 규칙을 따르며, 훅의 규칙이 동일하게 적용된다.

**왜 쓰는가:**
UI와 로직을 분리하여 코드 가독성, 테스트 가능성, 재사용성을 극대화하기 위해. 컴포넌트는 '무엇을 보여줄 것인가'에만 집중하게 된다.

**언제 쓰는가:**
두 개 이상의 컴포넌트에서 상태 로직이 중복되거나 컴포넌트가 너무 비대해질 때. 단, 단일 컴포넌트에서만 쓰이는 로직 추출은 과설계(Over-engineering)일 수 있다.`,
  },
  '05-context': {
    title: '05. Context API & 전역 상태 최적화',
    shortTitle: 'Context API',
    badges: ['React', 'Context', 'Global State'],
    description: 'Prop Drilling을 끊어내고, 7가지 설계 패턴으로 전역 상태의 함정을 피하며 고속도로를 완성하라.',
    theoryContent: `## 전역 상태(Global State)의 설계: Prop Drilling을 넘어서는 데이터 고속도로

**무엇인가:**
트리 깊이에 관계없이 데이터를 직접 전달하는 공유 저장소 모델. \`createContext\`로 터널을 뚫고, \`Provider\`로 값을 주입하며, \`useContext\`로 어디서든 꺼낸다.

**왜 쓰는가:**
불필요한 Props 전달(Drilling)을 막고 앱 공통 데이터를 효율적으로 관리하기 위해. 단, Context는 전파 최적화가 없으므로 잘못 설계하면 과다 리렌더링의 주범이 된다.

**언제 쓰는가:**
테마, 유저 인증, 언어 설정 등 앱 전반에 걸친 공유 데이터가 필요할 때. 자주 바뀌는 데이터는 Zustand 등 외부 상태 관리 라이브러리를 고려하라.`,
  },
  '06-optimization': {
    title: '06. 성능 최적화: 메모이제이션의 정공법',
    shortTitle: '성능 최적화',
    badges: ['React', 'Performance', 'Memoization'],
    description: '측정 없는 최적화는 금물. 7가지 기법으로 진짜 병목을 타격하고 렌더링 비용을 정복하라.',
    theoryContent: `## 메모이제이션(Memoization)의 본질: 불필요한 계산과 렌더링 비용 절감

**무엇인가:**
이전 계산 결과나 참조값을 저장해두고 입력이 같으면 재사용하는 최적화 기술. \`React.memo\`, \`useMemo\`, \`useCallback\`이 이 삼위일체를 이룬다.

**왜 쓰는가:**
리액트의 기본 리렌더링 특성으로 인한 불필요한 CPU 및 메모리 낭비를 줄이기 위해. 단, 메모이제이션 자체도 비용이므로, 측정 없는 최적화는 오히려 독이다.

**언제 쓰는가:**
연산이 무겁거나, 자식에게 넘기는 참조값이 변해 불필요한 리렌더링이 전파될 때. React Profiler로 병목을 확인한 후 적용하라.`,
  },
  '07-nextjs-rsc': {
    title: '07. Next.js & RSC: 서버 컴포넌트 문파',
    shortTitle: 'Next.js & RSC',
    badges: ['Next.js', 'RSC', 'SSR'],
    description: '브라우저의 짐을 서버로 옮기고, 7가지 핵심 패턴으로 풀스택 리액트의 정점을 정복하라.',
    theoryContent: `## 서버 사이드 렌더링(SSR)과 RSC: 브라우저의 짐을 서버로 옮기기

**무엇인가:**
서버에서 컴포넌트를 미리 실행하여 HTML을 생성하거나 데이터를 직렬화해 전달하는 방식. RSC(React Server Components)는 번들에 포함되지 않아 클라이언트에 JS가 전송되지 않는다.

**왜 쓰는가:**
초기 로딩(LCP) 향상, SEO 최적화, 클라이언트 번들 크기 획기적 감축을 위해. 데이터베이스나 파일 시스템에 서버에서 직접 접근하여 waterfall 없이 데이터를 가져온다.

**언제 쓰는가:**
보안이 중요한 데이터 호출, 초기 로딩 속도가 핵심인 서비스, 대규모 동적 페이지. \`'use client'\`는 상태·이벤트·브라우저 API가 필요한 최소 단위에만 선언하라.`,
  },
};

const CURRICULUM = {
  '01-useState': [
    {
      id: 1,
      slug: 'stale-closure',
      title: '1관문. Stale Closure',
      mission: '빠르게 클릭해도 카운터가 정확히 올라가도록 Stale Closure 함정을 제거하라.',
      theory: `## Stale Closure: 낡은 클로저의 함정

\`setState(count + 1)\` 형태는 해당 렌더 시점의 \`count\`를 캡처한다.
연속 클릭 시 모든 핸들러가 같은 \`count\` 값을 참조하여 마지막 클릭만 반영된다.

**해결책:** 함수형 업데이트 \`setState(prev => prev + 1)\`를 사용하면
리액트가 최신 상태를 인자로 전달하므로 클로저 문제가 사라진다.`,
      starterCode: `import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    // 문제: 세 번 연속 호출해도 +1만 된다
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>+3 클릭</button>
    </div>
  );
}`,
    },
    {
      id: 2,
      slug: 'batching',
      title: '2관문. Batching Mechanism',
      mission: '여러 setState가 단 한 번의 리렌더로 묶이는 원리를 파악하고, flushSync로 강제 즉시 렌더를 실험하라.',
      theory: `## Batching: 업데이트를 묶는 엔진

리액트 18부터 이벤트 핸들러, setTimeout, Promise 등 모든 곳에서 자동 배칭이 적용된다.
여러 \`setState\` 호출이 하나의 렌더로 합쳐져 불필요한 중간 렌더를 방지한다.

**flushSync:** \`flushSync(() => setState(...))\`는 배칭을 우회하여 즉시 DOM 업데이트를 강제한다.
애니메이션·스크롤 제어처럼 순서가 중요한 곳에서 사용한다.`,
      starterCode: `import { useState, flushSync } from 'react';

export default function BatchingDemo() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [renders, setRenders] = useState(0);

  // TODO: renders 카운터로 실제 렌더 횟수를 측정해보자
  // 1) 일반 배칭: setA, setB를 같은 핸들러에서 호출
  // 2) flushSync: 각각을 flushSync로 감싸서 렌더 횟수 비교

  return (
    <div>
      <p>a: {a}, b: {b}</p>
      <p>렌더 횟수: {renders}</p>
      <button onClick={() => { setA(a + 1); setB(b + 1); }}>
        배칭 업데이트
      </button>
    </div>
  );
}`,
    },
    {
      id: 3,
      slug: 'lazy-initialization',
      title: '3관문. Lazy Initialization',
      mission: '컴포넌트가 마운트될 때만 초기값 계산 함수를 실행하도록 Lazy Initialization을 적용하라.',
      theory: `## Lazy Initialization: 초기화 비용 단 한 번

\`useState(expensiveCalc())\`는 매 렌더마다 \`expensiveCalc()\`를 호출한다.
초기값으로 사용될 뿐인데 불필요한 비용이 매번 발생한다.

**해결책:** \`useState(() => expensiveCalc())\`처럼 함수를 전달하면
리액트가 최초 마운트 시에만 그 함수를 실행한다.
localStorage 읽기, 복잡한 배열 가공 등에 필수적으로 적용하라.`,
      starterCode: `import { useState } from 'react';

function expensiveInit() {
  // 1만 번 루프로 초기화 비용을 시뮬레이션
  let result = 0;
  for (let i = 0; i < 10000; i++) result += i;
  console.log('초기화 실행됨!');
  return result;
}

export default function LazyDemo() {
  // 문제: 매 렌더마다 expensiveInit()이 호출된다
  const [value, setValue] = useState(expensiveInit());

  return (
    <div>
      <p>초기값: {value}</p>
      <button onClick={() => setValue(v => v + 1)}>+1</button>
    </div>
  );
}`,
    },
    {
      id: 4,
      slug: 'derived-state',
      title: '4관문. Derived State',
      mission: 'Props에서 파생 가능한 값을 State로 복제하는 안티패턴을 제거하고 SSOT를 실현하라.',
      theory: `## Derived State: 단일 진실 공급원(SSOT)

Props를 State로 복사하면 두 개의 진실 공급원이 생겨 동기화 버그가 발생한다.
\`useEffect\`로 동기화를 시도하면 렌더 후 한 박자 늦게 반영되는 깜빡임이 생긴다.

**해결책:** 파생 데이터는 렌더 중에 직접 계산하라.
\`const fullName = \`\${firstName} \${lastName}\`\`처럼 상태 없이 표현식으로 처리한다.
계산이 무겁다면 \`useMemo\`로 감싸는 것이 올바른 접근이다.`,
      starterCode: `import { useState, useEffect } from 'react';

export default function UserCard({ firstName, lastName }) {
  // 안티패턴: props를 state로 복제
  const [fullName, setFullName] = useState(\`\${firstName} \${lastName}\`);

  useEffect(() => {
    setFullName(\`\${firstName} \${lastName}\`);
  }, [firstName, lastName]);

  // TODO: fullName state와 useEffect를 제거하고
  // 렌더 중 직접 계산하도록 수정하라

  return <p>{fullName}</p>;
}`,
    },
    {
      id: 5,
      slug: 'object-identity',
      title: '5관문. Object Identity',
      mission: '중첩 객체를 불변성을 지키며 업데이트하고, Immer 패턴의 편의성을 체험하라.',
      theory: `## Object Identity: 불변성과 참조 무결성

리액트는 상태 변경을 참조 비교로 감지한다.
\`state.user.name = 'Kim'\`처럼 직접 변경하면 참조가 같아 리렌더가 발생하지 않는다.

**해결책:** 스프레드 연산자로 새 참조를 만들어야 한다.
\`setState(prev => ({ ...prev, user: { ...prev.user, name: 'Kim' } }))\`
중첩이 깊어지면 \`immer\`의 \`produce()\`를 활용하면 마치 직접 수정하는 듯한 문법으로 불변 업데이트가 가능하다.`,
      starterCode: `import { useState } from 'react';

export default function ProfileEditor() {
  const [user, setUser] = useState({
    name: '홍길동',
    address: {
      city: '서울',
      district: '강남구',
    },
  });

  function handleCityChange(newCity) {
    // 문제: 직접 변경은 리렌더를 보장하지 않는다
    user.address.city = newCity;
    setUser(user);
  }

  return (
    <div>
      <p>{user.name} - {user.address.city} {user.address.district}</p>
      <button onClick={() => handleCityChange('부산')}>
        도시 변경
      </button>
    </div>
  );
}`,
    },
    {
      id: 6,
      slug: 'state-colocation',
      title: '6관문. State Colocation',
      mission: '불필요하게 상위로 올라간 상태를 가장 가까운 컴포넌트로 내려서 렌더링 범위를 최소화하라.',
      theory: `## State Colocation: 상태는 필요한 곳 가장 가까이

상태를 루트에 두면 변경 시 전체 트리가 리렌더된다.
"올리기(Lifting State)"만 알고 "내리기(Colocate)"를 모르면 성능 낭비가 쌓인다.

**원칙:** 상태는 그것을 사용하는 컴포넌트들의 가장 가까운 공통 조상에 두어라.
다른 컴포넌트가 필요 없다면 해당 컴포넌트 안에 가두어라.
Context로 전역화하기 전에 먼저 Colocation을 고민하라.`,
      starterCode: `import { useState } from 'react';

// 문제: count는 Counter 안에서만 쓰이는데 App에 있다
export default function App() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState('light');

  return (
    <div data-theme={theme}>
      <Header theme={theme} onToggle={() => setTheme(t => t === 'light' ? 'dark' : 'light')} />
      <Counter count={count} onIncrement={() => setCount(c => c + 1)} />
    </div>
  );
}

function Header({ theme, onToggle }) {
  return <button onClick={onToggle}>테마: {theme}</button>;
}

function Counter({ count, onIncrement }) {
  return (
    <div>
      <p>{count}</p>
      <button onClick={onIncrement}>+1</button>
    </div>
  );
}`,
    },
    {
      id: 7,
      slug: 'transition-api',
      title: '7관문. Transition API',
      mission: '무거운 필터링 연산을 startTransition으로 비긴급 처리하여 입력 응답성을 유지하라.',
      theory: `## Transition API: 긴급과 비긴급의 분리

모든 상태 업데이트가 동등한 우선순위를 갖는다고 가정하면,
무거운 리렌더가 사용자 입력을 블로킹한다.

**startTransition:** 업데이트를 "비긴급"으로 표시하면 리액트가 중간에 인터럽트할 수 있다.
긴급 업데이트(타이핑)가 들어오면 진행 중인 비긴급 렌더를 포기하고 즉시 처리한다.
\`useTransition\`의 \`isPending\`으로 로딩 UI를 표시할 수 있다.`,
      starterCode: `import { useState, useTransition } from 'react';

const ITEMS = Array.from({ length: 20000 }, (_, i) => \`item-\${i}\`);

export default function FilterList() {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState(ITEMS);
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);
    // TODO: 필터링을 startTransition으로 감싸 비긴급 처리하라
    setFiltered(ITEMS.filter(item => item.includes(value)));
  }

  return (
    <div>
      <input value={query} onChange={handleChange} placeholder="검색..." />
      {isPending && <p>필터링 중...</p>}
      <ul>{filtered.slice(0, 50).map(i => <li key={i}>{i}</li>)}</ul>
    </div>
  );
}`,
    },
  ],

  '02-useEffect': [
    {
      id: 1,
      slug: 'sync-not-lifecycle',
      title: '1관문. Synchronization, not Lifecycle',
      mission: '비디오 재생 상태를 라이프사이클이 아닌 동기화 관점으로 Effect를 작성하라.',
      theory: `## 동기화 관점의 Effect

"마운트 시 실행, 언마운트 시 정리"가 아니라
"isPlaying 상태에 비디오 DOM을 동기화한다"고 생각하라.

Effect의 목적은 **외부 시스템을 리액트 상태와 동기화하는 것**이다.
의존성 배열은 "언제 실행할지"가 아니라 "어떤 값이 변할 때 다시 동기화할지"를 선언한다.`,
      starterCode: `import { useState, useEffect, useRef } from 'react';

export default function VideoPlayer({ isPlaying }) {
  const videoRef = useRef(null);

  useEffect(() => {
    // TODO: isPlaying 상태에 따라 video를 play/pause 동기화하라
    // 힌트: videoRef.current.play() / videoRef.current.pause()
  }, []);

  return (
    <video
      ref={videoRef}
      src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      loop
    />
  );
}`,
    },
    {
      id: 2,
      slug: 'race-condition',
      title: '2관문. Race Condition',
      mission: '빠르게 탭을 전환할 때 이전 응답이 늦게 도착해 화면을 덮어쓰는 버그를 ignore 플래그로 방어하라.',
      theory: `## Race Condition: 응답 순서 보장하기

A 요청 후 B 요청을 보냈는데, B가 먼저 완료되고 A가 나중에 오면
마지막에 렌더된 것은 B인데 화면은 A의 데이터를 표시한다.

**해결책:** \`let ignore = false;\` 플래그를 선언하고
cleanup에서 \`ignore = true\`로 설정한다.
비동기 완료 시 \`if (!ignore)\`를 확인하면 해당 Effect가 폐기됐을 때 업데이트를 건너뛴다.`,
      starterCode: `import { useState, useEffect } from 'react';

async function fetchUser(id) {
  await new Promise(r => setTimeout(r, Math.random() * 2000));
  return { id, name: \`User \${id}\` };
}

export default function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // TODO: ignore 플래그를 추가하여 Race Condition을 방어하라
    fetchUser(userId).then(data => setUser(data));
  }, [userId]);

  return <p>{user ? user.name : '로딩 중...'}</p>;
}`,
    },
    {
      id: 3,
      slug: 'abort-controller',
      title: '3관문. AbortController',
      mission: '컴포넌트가 언마운트되거나 userId가 바뀔 때 진행 중인 fetch 요청을 실제로 취소하라.',
      theory: `## AbortController: 진짜 요청 취소

\`ignore\` 플래그는 결과를 무시할 뿐 네트워크 요청은 계속 진행된다.
\`AbortController\`를 사용하면 브라우저 레벨에서 요청 자체를 취소할 수 있다.

\`const controller = new AbortController();\`
\`fetch(url, { signal: controller.signal })\`
cleanup에서 \`controller.abort()\`를 호출하면
fetch가 AbortError를 던지며 즉시 중단된다.`,
      starterCode: `import { useState, useEffect } from 'react';

export default function PostDetail({ postId }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    // TODO: AbortController를 생성하고 fetch에 signal을 전달하라
    // cleanup에서 controller.abort()를 호출하라
    // AbortError는 catch에서 무시하라 (정상 취소이므로)
    fetch(\`https://jsonplaceholder.typicode.com/posts/\${postId}\`)
      .then(r => r.json())
      .then(data => setPost(data));
  }, [postId]);

  return <p>{post?.title ?? '로딩 중...'}</p>;
}`,
    },
    {
      id: 4,
      slug: 'primitive-dependencies',
      title: '4관문. Primitive Dependencies',
      mission: '객체를 의존성으로 사용할 때 발생하는 무한 실행을 원시값 분해로 해결하라.',
      theory: `## Primitive Dependencies: 객체 의존성의 함정

\`useEffect(() => {...}, [user])\`에서 \`user\`가 객체라면
부모가 렌더할 때마다 새 참조가 생성되어 Effect가 무한 실행될 수 있다.

**해결책:** 실제로 필요한 원시값을 꺼내어 의존성에 명시하라.
\`useEffect(() => {...}, [user.id, user.name])\`
불필요한 Effect 재실행을 원천 차단한다.`,
      starterCode: `import { useState, useEffect } from 'react';

export default function UserTracker({ user }) {
  useEffect(() => {
    // 문제: user 객체 전체를 의존성으로 사용하면
    // 부모 렌더마다 새 참조로 인해 Effect가 재실행된다
    console.log('사용자 변경 추적:', user.id);
    // ... analytics 전송
  }, [user]); // <- 여기를 원시값으로 변경하라

  return <p>추적 중: {user.name}</p>;
}`,
    },
    {
      id: 5,
      slug: 'effect-event',
      title: '5관문. Effect Event (Experimental)',
      mission: '매 방문마다 analytics를 보내되, roomId가 바뀔 때만 재실행되고 url 변경엔 반응하지 않도록 하라.',
      theory: `## Effect Event: 반응형과 비반응형의 경계

Effect 안의 모든 값은 반응형이어야 한다. 하지만
"항상 최신 url을 읽고 싶지만, url 변경이 Effect 재실행 트리거가 되어선 안 된다"는 요구가 있다.

**useEffectEvent (실험적):** 비반응형 로직을 Effect 밖으로 추출한다.
이벤트 내부에서는 최신 props/state를 읽을 수 있지만,
의존성 배열에 포함되지 않아 Effect를 재실행시키지 않는다.`,
      starterCode: `import { useState, useEffect, experimental_useEffectEvent as useEffectEvent } from 'react';

export default function ChatRoom({ roomId, url }) {
  // TODO: useEffectEvent로 onVisit을 추출하라
  // onVisit 안에서 url을 읽되, Effect 의존성에는 url을 넣지 않는다

  useEffect(() => {
    // roomId에 연결하고, 방문 시 url을 analytics에 기록
    const connection = { roomId };
    console.log('연결:', roomId, '| 현재 URL:', url);
    return () => console.log('연결 해제:', roomId);
  }, [roomId, url]); // url을 의존성에서 제거해야 한다

  return <p>방: {roomId}</p>;
}`,
    },
    {
      id: 6,
      slug: 'idempotency',
      title: '6관문. Idempotency (멱등성)',
      mission: 'Strict Mode의 이중 실행에서도 부작용이 없는 멱등성 있는 Effect를 작성하라.',
      theory: `## 멱등성: 여러 번 실행해도 같은 결과

리액트 Strict Mode는 개발 환경에서 Effect를 mount → unmount → mount 순으로 두 번 실행한다.
이 테스트를 통과하는 Effect는 프로덕션에서도 안전하다.

**점검 방법:** cleanup에서 Effect의 모든 부작용을 되돌릴 수 있는가?
\`addEventListener\` → cleanup에서 \`removeEventListener\`
외부 구독 → cleanup에서 구독 해제
DOM 노드 추가 → cleanup에서 제거`,
      starterCode: `import { useEffect } from 'react';

export default function IdempotencyDemo() {
  useEffect(() => {
    // 문제: Strict Mode에서 두 번 실행되면 이벤트 리스너가 두 번 등록된다
    window.addEventListener('keydown', handleKeyDown);
    document.title = '수련 중';
    // TODO: cleanup 함수를 반환하여 멱등성을 보장하라
  }, []);

  function handleKeyDown(e) {
    console.log('키 입력:', e.key);
  }

  return <p>아무 키나 눌러보세요</p>;
}`,
    },
    {
      id: 7,
      slug: 'ref-based-effect',
      title: '7관문. Ref-based Effect',
      mission: 'ResizeObserver를 useEffect + ref로 결합하여 엘리먼트 크기 변화를 감지하라.',
      theory: `## Ref-based Effect: DOM 관측 API와의 결합

\`ResizeObserver\`, \`IntersectionObserver\` 등은 DOM 노드를 직접 받아야 한다.
Effect 내에서 \`ref.current\`를 사용할 때 주의할 점이 있다.

**cleanup 패턴:** cleanup 함수가 실행될 시점에는 \`ref.current\`가 이미 null일 수 있다.
따라서 Effect 안에서 \`const node = ref.current;\`로 로컬 변수에 캡처한 후
cleanup에서 그 로컬 변수를 사용해야 안전하다.`,
      starterCode: `import { useRef, useEffect, useState } from 'react';

export default function ResizeTracker() {
  const boxRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // TODO: ResizeObserver를 생성하여 boxRef.current를 관찰하라
    // 크기 변경 시 setSize 호출
    // cleanup에서 observer.disconnect() 호출 (로컬 변수 캡처 패턴 사용)
  }, []);

  return (
    <div>
      <div ref={boxRef} style={{ resize: 'both', overflow: 'auto', border: '1px solid', padding: 16, width: 200, height: 100 }}>
        크기를 조절해보세요
      </div>
      <p>{size.width} × {size.height}</p>
    </div>
  );
}`,
    },
  ],

  '03-useRef': [
    {
      id: 1,
      slug: 'instance-variables',
      title: '1관문. Instance Variables',
      mission: 'setInterval ID를 ref에 저장하고 cleanup에서 안전하게 정리하는 타이머를 구현하라.',
      theory: `## Instance Variables: 리렌더 없는 가변 저장소

타이머 ID, WebSocket 인스턴스, 외부 라이브러리 인스턴스 등
렌더링에 영향을 주지 않지만 컴포넌트 생애주기 동안 유지해야 하는 값들은
\`useRef\`에 저장한다.

\`const timerRef = useRef(null);\`
\`timerRef.current = setInterval(...)\`
값 변경이 리렌더를 유발하지 않으므로 렌더링 성능에 영향이 없다.`,
      starterCode: `import { useState, useRef, useEffect } from 'react';

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  // TODO: intervalRef를 useRef로 선언하라

  useEffect(() => {
    if (running) {
      // TODO: setInterval을 intervalRef.current에 저장하라
      setInterval(() => setTime(t => t + 1), 1000);
    }
    return () => {
      // TODO: clearInterval로 정리하라
    };
  }, [running]);

  return (
    <div>
      <p>{time}초</p>
      <button onClick={() => setRunning(r => !r)}>
        {running ? '정지' : '시작'}
      </button>
    </div>
  );
}`,
    },
    {
      id: 2,
      slug: 'forward-ref',
      title: '2관문. forwardRef & useImperativeHandle',
      mission: '부모에게 DOM 전체 대신 focus()와 clear() 메서드만 노출하는 커스텀 Input을 만들어라.',
      theory: `## useImperativeHandle: 정제된 명령적 API

\`forwardRef\`로 ref를 받아 DOM 노드를 그대로 노출하면
부모가 input의 모든 속성에 접근할 수 있어 캡슐화가 깨진다.

\`useImperativeHandle(ref, () => ({ focus, clear }))\`를 사용하면
부모에게 명시적으로 허용한 메서드만 공개할 수 있다.
컴포넌트 API를 설계하듯 명령적 인터페이스를 제어하라.`,
      starterCode: `import { useRef, forwardRef, useImperativeHandle } from 'react';

// TODO: forwardRef로 감싸고 useImperativeHandle을 사용하여
// focus()와 clear()만 노출하라
const FancyInput = forwardRef(function FancyInput(props, ref) {
  const inputRef = useRef(null);

  // useImperativeHandle(ref, () => ({
  //   focus: () => inputRef.current.focus(),
  //   clear: () => { inputRef.current.value = ''; },
  // }));

  return <input ref={inputRef} {...props} />;
});

export default function App() {
  const inputRef = useRef(null);
  return (
    <div>
      <FancyInput ref={inputRef} placeholder="입력..." />
      <button onClick={() => inputRef.current.focus()}>포커스</button>
      <button onClick={() => inputRef.current.clear()}>초기화</button>
    </div>
  );
}`,
    },
    {
      id: 3,
      slug: 'mount-timing',
      title: '3관문. Mount Timing',
      mission: 'ref.current가 null인 렌더 타임과 DOM이 연결된 Effect 타임의 차이를 실험으로 확인하라.',
      theory: `## Mount Timing: ref는 렌더 중에 null이다

리액트가 컴포넌트를 렌더할 때 \`ref.current\`는 아직 null이다.
DOM이 실제로 연결되는 시점은 커밋(commit) 단계이며,
그 이후 실행되는 \`useEffect\` 안에서만 \`ref.current\`가 DOM 노드를 가리킨다.

**조건부 렌더링 주의:** \`{show && <div ref={myRef} />}\`에서
show가 false가 되면 ref.current는 다시 null이 된다.`,
      starterCode: `import { useRef, useEffect, useState } from 'react';

export default function MountTimingDemo() {
  const divRef = useRef(null);
  const [show, setShow] = useState(true);

  // 렌더 중 접근 (항상 null 또는 이전 값)
  console.log('렌더 중 ref:', divRef.current);

  useEffect(() => {
    // TODO: 여기서 divRef.current를 콘솔에 찍어 차이를 확인하라
    console.log('Effect 내 ref:', divRef.current);
  });

  return (
    <div>
      {show && <div ref={divRef} style={{ padding: 16, background: '#eee' }}>DOM 노드</div>}
      <button onClick={() => setShow(s => !s)}>토글</button>
    </div>
  );
}`,
    },
    {
      id: 4,
      slug: 'portal-focus-trap',
      title: '4관문. Portal Focus Trap',
      mission: '모달이 열렸을 때 Tab 키 포커스가 모달 내부를 순환하도록 Focus Trap을 구현하라.',
      theory: `## Focus Trap: 접근성의 기본

모달이 열렸을 때 Tab 키가 배경 컨텐츠로 이동하면 스크린 리더 사용자가 모달 밖을 인식하지 못할 수 있다.

**구현 방법:**
1. 모달 내 포커스 가능한 엘리먼트를 \`querySelectorAll\`로 수집
2. \`keydown\` 이벤트에서 Tab/Shift+Tab 시 첫/마지막 엘리먼트로 포커스를 이동
3. 모달 마운트 시 첫 번째 엘리먼트로 포커스 이동`,
      starterCode: `import { useRef, useEffect, useState } from 'react';

function Modal({ onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    // TODO: 모달 내부의 focusable 엘리먼트를 수집하고
    // Tab/Shift+Tab 시 순환하도록 keydown 핸들러를 추가하라
    // 마운트 시 첫 번째 포커스 가능 요소에 focus()
    const focusable = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable?.[0]?.focus();
  }, []);

  return (
    <div ref={modalRef} role="dialog" style={{ border: '2px solid', padding: 24 }}>
      <h2>모달</h2>
      <input placeholder="이름" />
      <input placeholder="이메일" />
      <button onClick={onClose}>닫기</button>
    </div>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)}>모달 열기</button>
      {open && <Modal onClose={() => setOpen(false)} />}
    </div>
  );
}`,
    },
    {
      id: 5,
      slug: 'previous-value',
      title: '5관문. Previous Value Tracking',
      mission: 'usePrevious 커스텀 훅을 구현하여 이전 렌더의 상태값을 추적하라.',
      theory: `## Previous Value: 이전 렌더 값 기억하기

리액트에는 이전 상태값을 기억하는 내장 API가 없다.
\`useRef\`를 활용하면 이전 렌더 값을 보존할 수 있다.

**패턴:**
\`const ref = useRef(value);\`
\`useEffect(() => { ref.current = value; });\`
의존성 없는 Effect는 매 렌더 후 실행된다.
Effect 실행 전까지 \`ref.current\`는 이전 렌더의 값을 유지한다.`,
      starterCode: `import { useState, useRef, useEffect } from 'react';

// TODO: usePrevious 훅을 구현하라
function usePrevious(value) {
  // useRef와 useEffect를 활용하여 이전 값을 반환하라
}

export default function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>현재: {count} | 이전: {prevCount ?? '없음'}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}`,
    },
    {
      id: 6,
      slug: 'video-canvas',
      title: '6관문. Video/Canvas Control',
      mission: '명령적 video API를 리액트 상태로 선언적으로 제어하라.',
      theory: `## 명령적 API의 선언적 래핑

외부 라이브러리나 미디어 API는 \`play()\`, \`pause()\` 같은 명령형 메서드를 제공한다.
이를 리액트 상태와 동기화하려면 Effect로 감싸야 한다.

**원칙:** 리액트 상태가 진실의 원천이 되고,
Effect가 그 상태를 외부 API에 반영하는 역할을 한다.
외부 API 이벤트(ended, error 등)는 setState로 다시 리액트 상태에 반영한다.`,
      starterCode: `import { useState, useRef, useEffect } from 'react';

export default function VideoController() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // TODO: isPlaying에 따라 play/pause 동기화
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      // TODO: volume 상태를 video.volume에 동기화
    }
  }, [volume]);

  return (
    <div>
      <video ref={videoRef} src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" loop style={{ width: 300 }} />
      <div>
        <button onClick={() => setIsPlaying(p => !p)}>{isPlaying ? '정지' : '재생'}</button>
        <input type="range" min={0} max={1} step={0.1} value={volume} onChange={e => setVolume(Number(e.target.value))} />
      </div>
    </div>
  );
}`,
    },
    {
      id: 7,
      slug: 'ref-cleanups',
      title: '7관문. Ref Cleanups',
      mission: '컴포넌트 언마운트 시 ref에 저장된 외부 인스턴스를 완벽하게 해제하는 패턴을 구현하라.',
      theory: `## Ref Cleanups: 메모리 누수 방지

ref에 WebSocket, Worker, 외부 라이브러리 인스턴스를 저장할 때
언마운트 시 명시적으로 해제하지 않으면 메모리 누수가 발생한다.

**패턴:**
\`useEffect\`의 cleanup에서 \`ref.current.destroy()\` 또는 \`ref.current.close()\`를 호출하고
\`ref.current = null\`로 참조를 끊어 GC가 수거할 수 있게 한다.
cleanup이 실행될 시점에 ref.current를 로컬 변수로 미리 캡처하는 것이 안전하다.`,
      starterCode: `import { useRef, useEffect, useState } from 'react';

class ExternalService {
  constructor(id) {
    this.id = id;
    console.log(\`서비스 \${id} 생성\`);
  }
  destroy() {
    console.log(\`서비스 \${this.id} 해제\`);
  }
}

export default function ServiceConsumer({ serviceId }) {
  const serviceRef = useRef(null);

  useEffect(() => {
    serviceRef.current = new ExternalService(serviceId);
    return () => {
      // TODO: 로컬 변수 캡처 패턴으로 안전하게 해제하라
      // serviceRef.current를 지역 변수에 저장 후 destroy 호출
      // serviceRef.current = null 로 참조 해제
    };
  }, [serviceId]);

  return <p>서비스 ID: {serviceId}</p>;
}`,
    },
  ],

  '04-customHooks': [
    {
      id: 1,
      slug: 'headless-ui',
      title: '1관문. Headless UI Pattern',
      mission: 'UI 없이 토글 로직만 제공하는 useToggle 훅을 만들어 두 가지 다른 디자인에 적용하라.',
      theory: `## Headless UI: 로직과 UI의 완전한 분리

헤드리스 훅은 상태 로직만 제공하고 렌더링은 소비자에게 맡긴다.
동일한 로직을 완전히 다른 디자인으로 구현할 수 있어 재사용성이 극대화된다.

\`useToggle\`은 \`[value, toggle, setTrue, setFalse]\`를 반환한다.
라이브러리 없이도 headless 컴포넌트 패턴을 구현할 수 있다.`,
      starterCode: `import { useState, useCallback } from 'react';

// TODO: useToggle 훅을 구현하라
// 반환: [value, toggle, setTrue, setFalse]
function useToggle(initialValue = false) {
}

export default function App() {
  const [isOpen, toggle] = useToggle(false);
  const [isDark, , setDark, setLight] = useToggle(false);

  return (
    <div>
      {/* 같은 로직, 다른 UI */}
      <button onClick={toggle}>{isOpen ? '닫기' : '열기'}</button>
      {isOpen && <p>내용이 열렸습니다</p>}

      <div style={{ background: isDark ? '#333' : '#fff', color: isDark ? '#fff' : '#333', padding: 8 }}>
        <button onClick={setDark}>다크</button>
        <button onClick={setLight}>라이트</button>
      </div>
    </div>
  );
}`,
    },
    {
      id: 2,
      slug: 'use-fetch-cache',
      title: '2관문. useFetch with Cache',
      mission: '동일 URL 요청을 캐싱하여 중복 네트워크 호출을 방지하는 useFetch 훅을 구현하라.',
      theory: `## useFetch with Cache: 중복 요청 방지

같은 URL을 여러 컴포넌트에서 요청하거나 컴포넌트가 재마운트될 때
매번 네트워크를 타지 않도록 모듈 레벨 캐시 맵을 활용한다.

\`const cache = new Map();\`을 훅 밖에 선언하면
모듈 생애주기 동안 지속되는 캐시로 활용할 수 있다.
loading, error, data 세 가지 상태를 하나의 훅으로 캡슐화한다.`,
      starterCode: `import { useState, useEffect } from 'react';

const cache = new Map();

// TODO: useFetch 훅을 구현하라
// 캐시에 데이터가 있으면 바로 반환
// 없으면 fetch 후 캐시에 저장
// { data, loading, error } 반환
function useFetch(url) {
}

export default function Post({ postId }) {
  const { data, loading, error } = useFetch(
    \`https://jsonplaceholder.typicode.com/posts/\${postId}\`
  );

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러: {error.message}</p>;
  return <h3>{data?.title}</h3>;
}`,
    },
    {
      id: 3,
      slug: 'use-local-storage',
      title: '3관문. useLocalStorage',
      mission: '상태 변경 시 localStorage와 자동 동기화되는 useLocalStorage 훅을 구현하라.',
      theory: `## useLocalStorage: 영속 상태

\`useState\`의 drop-in 교체처럼 동작하면서 localStorage에 자동 저장/복원한다.

**주의사항:**
- 초기화 시 Lazy Initialization으로 \`localStorage.getItem()\`을 한 번만 호출
- SSR 환경에서 \`window\`가 없을 수 있으므로 방어 코드 필요
- JSON 직렬화/역직렬화 오류 처리
- 다른 탭에서의 변경은 \`storage\` 이벤트로 감지`,
      starterCode: `import { useState, useEffect } from 'react';

// TODO: useLocalStorage 훅을 구현하라
// useState와 동일한 API: [value, setValue]
// Lazy Initialization으로 초기값을 localStorage에서 읽기
// setValue 시 localStorage에도 저장
function useLocalStorage(key, initialValue) {
}

export default function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <div style={{ background: theme === 'dark' ? '#222' : '#fff', color: theme === 'dark' ? '#fff' : '#000', padding: 24 }}>
      <p>현재 테마: {theme}</p>
      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        전환
      </button>
      <p><small>새로고침해도 유지됩니다</small></p>
    </div>
  );
}`,
    },
    {
      id: 4,
      slug: 'hook-composition',
      title: '4관문. Hook Composition',
      mission: 'useDebounce + useFetch를 조합하여 타이핑 중 자동완성 검색 기능을 구현하라.',
      theory: `## Hook Composition: 작은 훅들의 조합

리액트 훅의 진정한 강점은 조합 가능성이다.
각 훅이 단일 책임을 가지면 조합으로 복잡한 기능을 구성할 수 있다.

\`useSearchHistory = useDebounce + useFetch + useLocalStorage\`
각 훅을 독립적으로 테스트하고, 조합해서 비즈니스 로직을 완성한다.
복잡한 컴포넌트를 여러 단일 책임 훅으로 분해하는 습관을 기르자.`,
      starterCode: `import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

// TODO: useSearch 훅을 구현하라
// useDebounce(query, 400)으로 타이핑 딜레이 처리
// debouncedQuery가 빈 문자열이면 fetch 안 함
// jsonplaceholder.typicode.com/posts?q={query} 사용
function useSearch(query) {
}

export default function SearchBox() {
  const [query, setQuery] = useState('');
  const { data, loading } = useSearch(query);

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="검색어 입력..." />
      {loading && <p>검색 중...</p>}
      <ul>{data?.slice(0, 5).map(p => <li key={p.id}>{p.title}</li>)}</ul>
    </div>
  );
}`,
    },
    {
      id: 5,
      slug: 'debounce-throttle',
      title: '5관문. Debounce & Throttle Hooks',
      mission: 'useDebounce(값 지연)와 useThrottle(함수 제어)의 차이를 구현으로 체득하라.',
      theory: `## Debounce vs Throttle

**Debounce:** 마지막 이벤트로부터 일정 시간 후 한 번 실행.
연속 타이핑이 끝난 후 검색 실행에 적합하다.

**Throttle:** 일정 시간 간격마다 최대 한 번 실행.
스크롤, 마우스 이동처럼 연속적인 이벤트 제어에 적합하다.

두 패턴 모두 타이머 ID를 ref에 저장하고 cleanup에서 정리해야 한다.`,
      starterCode: `import { useState, useEffect, useRef, useCallback } from 'react';

// TODO: useDebounce 구현 (값을 delay ms 후에 반영)
function useDebounce(value, delay) {
}

// TODO: useThrottle 구현 (함수를 delay ms 간격으로 제한)
function useThrottle(fn, delay) {
}

export default function EventDemo() {
  const [input, setInput] = useState('');
  const [scroll, setScroll] = useState(0);

  const debouncedInput = useDebounce(input, 500);
  const throttledScroll = useThrottle((y) => setScroll(y), 200);

  useEffect(() => {
    const handler = (e) => throttledScroll(window.scrollY);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, [throttledScroll]);

  return (
    <div style={{ height: 2000 }}>
      <div style={{ position: 'fixed', top: 0, background: '#fff', padding: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="타이핑..." />
        <p>디바운스: {debouncedInput}</p>
        <p>스크롤 (쓰로틀): {scroll}px</p>
      </div>
    </div>
  );
}`,
    },
    {
      id: 6,
      slug: 'use-is-mounted',
      title: '6관문. useIsMounted',
      mission: '언마운트된 컴포넌트에서 setState를 호출하는 메모리 누수 경고를 useIsMounted로 방어하라.',
      theory: `## useIsMounted: 안전한 비동기 상태 업데이트

컴포넌트가 언마운트된 후 비동기 작업이 완료되어 setState를 호출하면
"Can't perform a React state update on unmounted component" 경고가 발생한다.

**패턴:**
\`const isMounted = useRef(false);\`
마운트 시 \`isMounted.current = true\`, cleanup에서 \`false\`로 설정.
비동기 완료 시 \`if (isMounted.current) setState(...)\`로 체크한다.`,
      starterCode: `import { useState, useEffect, useRef } from 'react';

// TODO: useIsMounted 훅을 구현하라
// 마운트 중이면 true, 언마운트 후면 false를 반환하는 ref를 반환
function useIsMounted() {
}

export default function AsyncComponent({ id }) {
  const [data, setData] = useState(null);
  const isMounted = useIsMounted();

  useEffect(() => {
    setTimeout(() => {
      // TODO: isMounted를 체크한 후 setData를 호출하라
      setData(\`데이터 \${id}\`);
    }, 2000);
  }, [id]);

  return <p>{data ?? '로딩 중...'}</p>;
}`,
    },
    {
      id: 7,
      slug: 'testing-render-hook',
      title: '7관문. Testing with RenderHook',
      mission: 'renderHook과 act를 사용하여 useCounter 훅의 로직을 UI 없이 독립 검증하라.',
      theory: `## RenderHook: UI 없는 훅 테스트

\`@testing-library/react\`의 \`renderHook\`은
컴포넌트 없이 훅을 렌더링하고 검증할 수 있게 한다.

\`act\`로 상태 변경을 감싸면 모든 업데이트가 처리된 후 검증할 수 있다.
단위 테스트처럼 훅의 로직만 격리하여 TDD로 훅을 개발할 수 있다.`,
      starterCode: `// useCounter.test.js
import { renderHook, act } from '@testing-library/react';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  test('초기값이 0이다', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(0);
  });

  test('increment 호출 시 1 증가한다', () => {
    const { result } = renderHook(() => useCounter());
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
  });

  test('초기값을 지정할 수 있다', () => {
    const { result } = renderHook(() => useCounter(10));
    expect(result.current.count).toBe(10);
  });
});

// useCounter.js
export function useCounter(initialValue = 0) {
  // TODO: count, increment, decrement, reset을 반환하는 훅을 구현하라
}`,
    },
  ],

  '05-context': [
    {
      id: 1,
      slug: 'context-selector',
      title: '1관문. Context Selector Pattern',
      mission: 'Context를 분리하여 count 변경이 theme 소비자를 리렌더하지 않도록 최적화하라.',
      theory: `## Context Selector: 구독 범위 최소화

단일 Context에 여러 값을 넣으면, 하나가 바뀔 때 모든 소비자가 리렌더된다.
컨텍스트는 선택적 구독(selector)을 지원하지 않기 때문이다.

**해결책:** 도메인별로 Context를 분리하라.
ThemeContext, CountContext를 각각 만들면
각 소비자는 필요한 컨텍스트만 구독하여 불필요한 리렌더를 피한다.`,
      starterCode: `import { createContext, useContext, useState } from 'react';

// 문제: 하나의 Context에 모든 값을 담으면 모두가 리렌더된다
const AppContext = createContext();

// TODO: ThemeContext와 CountContext로 분리하라

function ThemeToggle() {
  const { theme, setTheme } = useContext(AppContext);
  console.log('ThemeToggle 렌더');
  return <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>테마: {theme}</button>;
}

function Counter() {
  const { count, setCount } = useContext(AppContext);
  console.log('Counter 렌더');
  return <button onClick={() => setCount(c => c + 1)}>카운트: {count}</button>;
}

export default function App() {
  const [theme, setTheme] = useState('light');
  const [count, setCount] = useState(0);

  return (
    <AppContext.Provider value={{ theme, setTheme, count, setCount }}>
      <ThemeToggle />
      <Counter />
    </AppContext.Provider>
  );
}`,
    },
    {
      id: 2,
      slug: 'multiple-providers',
      title: '2관문. Multiple Providers',
      mission: 'AuthContext, ThemeContext, CartContext를 도메인별로 분리하고 조합 Provider로 정리하라.',
      theory: `## Multiple Providers: 관심사 분리

모든 전역 상태를 하나의 Provider에 넣으면 컨텍스트가 비대해진다.
관심사별로 분리된 Provider는 독립적으로 테스트하고 교체할 수 있다.

**Compose Providers 패턴:**
\`providers\` 배열을 reduce로 중첩하면 Provider Hell을 피할 수 있다.
각 Provider는 자신의 도메인 로직만 담당하며,
루트에서 한 번만 조립하면 된다.`,
      starterCode: `import { createContext, useContext, useState } from 'react';

// TODO: 각 도메인별 Context와 Provider를 구현하라
// 1. AuthContext: { user, login, logout }
// 2. ThemeContext: { theme, toggleTheme }
// 3. CartContext: { items, addItem, removeItem }

// TODO: ComposeProviders 컴포넌트를 만들어 Provider Hell을 제거하라
// function ComposeProviders({ providers, children }) {
//   return providers.reduceRight((child, Provider) => <Provider>{child}</Provider>, children);
// }

export default function App() {
  return (
    // 현재는 중첩 Provider Hell 상태
    <div>
      <p>여기에 ComposeProviders를 적용하라</p>
    </div>
  );
}`,
    },
    {
      id: 3,
      slug: 'state-colocation-context',
      title: '3관문. State Colocation in Context',
      mission: '앱 루트가 아닌 가장 가까운 공통 조상에 Provider를 배치하여 영향 범위를 최소화하라.',
      theory: `## Sub-tree Context: 부분 전역 상태

모든 Context를 루트에 두는 것은 안티패턴이다.
장바구니 상태는 쇼핑 페이지 트리에만, 폼 상태는 해당 폼 컴포넌트에만 필요하다.

**원칙:** Context도 일반 상태처럼 Colocation을 적용하라.
루트에 두면 전체가 영향받지만, 공통 조상에 두면 해당 서브트리만 영향받는다.
전역 상태 라이브러리가 필요한지 먼저 Context Colocation을 시도하라.`,
      starterCode: `import { createContext, useContext, useState } from 'react';

// 문제: ShopCart 상태가 앱 루트에 있어 Header도 불필요하게 리렌더된다
const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

// TODO: CartProvider를 ShopPage 안으로 이동하여
// Header가 cart 변경에 영향받지 않도록 하라

export default function App() {
  const [items, setItems] = useState([]);
  return (
    <CartContext.Provider value={{ items, addItem: (item) => setItems(prev => [...prev, item]) }}>
      <Header />
      <ShopPage />
    </CartContext.Provider>
  );
}

function Header() {
  console.log('Header 렌더');
  return <nav>헤더</nav>;
}

function ShopPage() {
  const { items, addItem } = useCart();
  return (
    <div>
      <button onClick={() => addItem({ id: Date.now() })}>상품 추가</button>
      <p>장바구니: {items.length}개</p>
    </div>
  );
}`,
    },
    {
      id: 4,
      slug: 'zustand-interop',
      title: '4관문. Zustand Interop',
      mission: 'Zustand selector로 컴포넌트가 필요한 상태만 구독하여 과다 리렌더를 방지하라.',
      theory: `## Zustand Interop: Context의 한계 극복

Context는 값이 바뀌면 모든 소비자를 리렌더한다.
Zustand는 selector를 통한 선택적 구독을 지원하여 이 문제를 해결한다.

\`const count = useStore(state => state.count);\`
count가 바뀔 때만 이 컴포넌트가 리렌더된다.
다른 상태 변경엔 반응하지 않는다.
Context와 달리 Provider 없이 어디서든 직접 구독할 수 있다.`,
      starterCode: `// npm install zustand 필요
import { create } from 'zustand';

// TODO: Zustand 스토어를 생성하라
// { count, theme, user }와 각각의 setter를 포함
const useStore = create((set) => ({
  count: 0,
  theme: 'light',
  user: null,
  // TODO: increment, toggleTheme, setUser 구현
}));

// TODO: 각 컴포넌트가 필요한 상태만 selector로 구독하게 하라
function Counter() {
  const count = useStore(state => state.count);
  const increment = useStore(state => state.increment);
  console.log('Counter 렌더');
  return <button onClick={increment}>카운트: {count}</button>;
}

function ThemeToggle() {
  const theme = useStore(state => state.theme);
  const toggleTheme = useStore(state => state.toggleTheme);
  console.log('ThemeToggle 렌더');
  return <button onClick={toggleTheme}>테마: {theme}</button>;
}

export default function App() {
  return <div><Counter /><ThemeToggle /></div>;
}`,
    },
    {
      id: 5,
      slug: 'dependency-injection',
      title: '5관문. Dependency Injection',
      mission: 'Context를 통해 API 서비스를 주입하여 테스트 시 Mock 서비스로 교체 가능하도록 만들어라.',
      theory: `## Dependency Injection via Context

하드코딩된 서비스 의존성은 테스트와 교체를 어렵게 만든다.
Context를 통해 인터페이스에 의존하면 구현을 외부에서 주입할 수 있다.

\`<ApiContext.Provider value={mockApi}>\`로 테스트 환경에서 mock을 주입하고
\`<ApiContext.Provider value={realApi}>\`로 프로덕션에서 실제 서비스를 사용한다.
컴포넌트는 구현을 알 필요 없이 인터페이스만 호출한다.`,
      starterCode: `import { createContext, useContext, useState } from 'react';

// API 인터페이스 정의
const realApi = {
  fetchUsers: () => fetch('https://jsonplaceholder.typicode.com/users').then(r => r.json()),
};

const mockApi = {
  fetchUsers: () => Promise.resolve([{ id: 1, name: 'Mock User' }]),
};

// TODO: ApiContext를 생성하고 useApi 훅을 만들어라
const ApiContext = createContext(null);
export const useApi = () => useContext(ApiContext);

function UserList() {
  const api = useApi();
  const [users, setUsers] = useState([]);
  // TODO: api.fetchUsers()를 호출하여 users를 채워라
  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}

export default function App() {
  const useMock = true; // 테스트 시 true, 프로덕션 시 false
  return (
    <ApiContext.Provider value={useMock ? mockApi : realApi}>
      <UserList />
    </ApiContext.Provider>
  );
}`,
    },
    {
      id: 6,
      slug: 'runtime-error-guard',
      title: '6관문. Runtime Error Guard',
      mission: 'Provider 없이 useContext를 호출했을 때 의미 있는 에러를 던지는 안전한 훅 래퍼를 만들어라.',
      theory: `## Runtime Error Guard: 명확한 실패

\`useContext(ThemeContext)\`가 \`undefined\`를 반환하면
실제 오류는 한참 뒤 다른 곳에서 발생하여 디버깅이 어렵다.

**패턴:** Context 소비 훅에서 반환값을 체크하고 명확한 에러를 던진다.
\`if (!value) throw new Error('useTheme은 ThemeProvider 내에서 사용해야 합니다');\`
실수를 즉시 발견할 수 있어 개발 속도가 빨라진다.`,
      starterCode: `import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// TODO: undefined 체크와 의미 있는 에러 메시지를 추가하라
export function useTheme() {
  const context = useContext(ThemeContext);
  // if (!context) throw new Error('...');
  return context;
}

// Provider 없이 사용하면 즉시 에러 발생해야 한다
function ThemedButton() {
  const { theme } = useTheme();
  return <button style={{ background: theme === 'dark' ? '#333' : '#fff' }}>테마 버튼</button>;
}

export default function App() {
  // TODO: ThemeProvider를 제거하고 에러 메시지를 확인하라
  return (
    <ThemeProvider>
      <ThemedButton />
    </ThemeProvider>
  );
}`,
    },
    {
      id: 7,
      slug: 'hydration-warning',
      title: '7관문. Hydration Warning',
      mission: '서버와 클라이언트의 초기 상태 불일치로 발생하는 Hydration 경고를 올바르게 해결하라.',
      theory: `## Hydration Mismatch: 서버-클라이언트 정합성

서버에서 렌더한 HTML과 클라이언트 첫 렌더 결과가 다르면 Hydration 에러가 발생한다.
\`localStorage\`나 \`window\` 기반 초기값은 서버에서 접근 불가하므로 불일치가 생긴다.

**해결책:**
\`const [mounted, setMounted] = useState(false);\`
\`useEffect(() => setMounted(true), []);\`
mounted 전엔 서버와 동일한 기본값을 렌더하고
mounted 후에만 클라이언트 전용 값을 표시한다.`,
      starterCode: `'use client';
import { useState, useEffect } from 'react';

// 문제: 서버는 'light'를 렌더하지만 클라이언트는 localStorage의 값을 읽어 불일치 발생
function ThemeDisplay() {
  const [theme, setTheme] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('theme') || 'light' : 'light'
  );

  // TODO: mounted 상태를 추가하여 Hydration 불일치를 해결하라
  // mounted 전엔 기본값('light')을 표시하고
  // mounted 후에만 localStorage 값을 반영하라

  return (
    <div>
      <p>테마: {theme}</p>
      <button onClick={() => {
        const next = theme === 'light' ? 'dark' : 'light';
        setTheme(next);
        localStorage.setItem('theme', next);
      }}>전환</button>
    </div>
  );
}

export default ThemeDisplay;`,
    },
  ],

  '06-optimization': [
    {
      id: 1,
      slug: 'referential-integrity',
      title: '1관문. Referential Integrity',
      mission: '매 렌더마다 새 참조가 생성되어 React.memo가 무력화되는 원인을 찾고 useCallback으로 해결하라.',
      theory: `## 참조 동일성: useMemo/useCallback의 진짜 이유

\`React.memo\`는 props의 얕은 비교로 리렌더를 건너뛴다.
하지만 부모가 렌더될 때마다 함수나 객체가 새로 생성되면
참조가 달라져 memo가 소용없어진다.

**useCallback:** 함수 참조를 메모이제이션한다. 의존성이 같으면 동일 참조를 반환.
**useMemo:** 값/객체 참조를 메모이제이션한다.
memo된 자식에게 넘기는 props에 항상 안정적인 참조를 제공하라.`,
      starterCode: `import { useState, useCallback, memo } from 'react';

const Button = memo(function Button({ onClick, children }) {
  console.log('Button 렌더:', children);
  return <button onClick={onClick}>{children}</button>;
});

export default function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // 문제: 매 렌더마다 새 함수가 생성되어 Button의 memo가 무력화된다
  const handleIncrement = () => setCount(c => c + 1);
  // TODO: useCallback으로 감싸라

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="입력 (Button이 리렌더되는지 확인)" />
      <p>{count}</p>
      <Button onClick={handleIncrement}>증가</Button>
    </div>
  );
}`,
    },
    {
      id: 2,
      slug: 'react-memo-comparator',
      title: '2관문. React.memo with Comparator',
      mission: '기본 얕은 비교로 막지 못하는 불필요한 리렌더를 커스텀 비교 함수로 방어하라.',
      theory: `## Custom Comparator: 정교한 렌더링 제어

\`React.memo(Component, arePropsEqual)\`의 두 번째 인자는 커스텀 비교 함수다.
\`arePropsEqual(prevProps, nextProps)\`가 \`true\`를 반환하면 리렌더를 건너뛴다.

**주의사항:**
- 비교 함수 자체의 비용이 리렌더 비용보다 작아야 의미 있다
- 비교 함수가 잘못되면 오래된 props로 렌더되는 버그가 생긴다
- React DevTools Profiler로 실제 효과를 측정하고 적용하라`,
      starterCode: `import { useState, memo } from 'react';

// 문제: data 배열의 내용이 같아도 참조가 달라 매번 리렌더
const DataList = memo(function DataList({ data, label }) {
  console.log('DataList 렌더:', label);
  return <ul>{data.map((d, i) => <li key={i}>{d}</li>)}</ul>;
}/*, (prevProps, nextProps) => {
  // TODO: data 배열의 내용을 비교하는 커스텀 비교 함수를 작성하라
  // 같으면 true(리렌더 건너뜀), 다르면 false
}*/);

export default function App() {
  const [count, setCount] = useState(0);
  // 매 렌더마다 새 배열 참조 생성
  const items = ['사과', '바나나', '포도'];

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>카운트: {count}</button>
      <DataList data={items} label="과일" />
    </div>
  );
}`,
    },
    {
      id: 3,
      slug: 'virtualization',
      title: '3관문. Virtualization (Windowing)',
      mission: '10만 개 아이템 리스트를 가상화하여 보이는 부분만 렌더링되도록 구현하라.',
      theory: `## Virtualization: 보이는 것만 그린다

10만 개의 DOM 노드를 한 번에 렌더하면 초기 로딩과 스크롤이 모두 느려진다.
가상화(Windowing)는 현재 뷰포트에 보이는 아이템만 DOM에 유지한다.

**@tanstack/virtual:** 계산 로직만 제공하는 headless 가상화 라이브러리.
\`useVirtualizer\`가 각 아이템의 위치와 렌더 여부를 계산하고,
스크롤 컨테이너를 실제 전체 높이로 설정하여 스크롤바를 자연스럽게 유지한다.`,
      starterCode: `// npm install @tanstack/react-virtual
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

const ITEMS = Array.from({ length: 100000 }, (_, i) => \`아이템 \${i + 1}\`);

export default function VirtualList() {
  const parentRef = useRef(null);

  // TODO: useVirtualizer를 사용하여 가상화를 구현하라
  const virtualizer = useVirtualizer({
    count: ITEMS.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
  });

  return (
    <div ref={parentRef} style={{ height: 400, overflow: 'auto', border: '1px solid' }}>
      {/* TODO: virtualizer.getTotalSize()로 컨테이너 높이 설정 */}
      {/* virtualizer.getVirtualItems()로 보이는 아이템만 렌더 */}
      <p>10만 개 아이템을 여기에 가상화하라</p>
    </div>
  );
}`,
    },
    {
      id: 4,
      slug: 'expensive-computation',
      title: '4관문. Expensive Computation',
      mission: '무거운 정렬/필터 연산을 useMemo로 감싸 불필요한 재계산을 방지하라.',
      theory: `## useMemo: 계산 결과 메모이제이션

렌더마다 반복되는 무거운 연산은 \`useMemo\`로 감싸 의존성이 바뀔 때만 재실행한다.

**판단 기준:**
- 연산 시간이 1ms 이상이면 메모이제이션 효과가 있다
- React DevTools Profiler로 실제 렌더 시간을 측정하고 결정하라
- 단순 계산에 useMemo를 남발하면 메모리와 코드 복잡도만 늘어난다`,
      starterCode: `import { useState, useMemo } from 'react';

const DATA = Array.from({ length: 50000 }, (_, i) => ({
  id: i,
  name: \`User \${i}\`,
  score: Math.floor(Math.random() * 100),
}));

export default function SortedList() {
  const [query, setQuery] = useState('');
  const [sortDir, setSortDir] = useState('asc');
  const [theme, setTheme] = useState('light');

  // 문제: theme 변경 시에도 불필요한 정렬이 재실행된다
  const result = DATA
    .filter(d => d.name.includes(query))
    .sort((a, b) => sortDir === 'asc' ? a.score - b.score : b.score - a.score);
  // TODO: useMemo로 감싸라. 의존성: [query, sortDir]

  return (
    <div style={{ background: theme === 'dark' ? '#222' : '#fff' }}>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="검색..." />
      <button onClick={() => setSortDir(d => d === 'asc' ? 'desc' : 'asc')}>정렬 전환</button>
      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>테마 전환</button>
      <p>결과: {result.length}개</p>
    </div>
  );
}`,
    },
    {
      id: 5,
      slug: 'component-inversion',
      title: '5관문. Component Inversion',
      mission: 'children prop 패턴으로 부모 리렌더가 자식에게 전파되지 않도록 컴포넌트 구조를 역전하라.',
      theory: `## Component Inversion: children의 렌더링 절연

\`<Parent><Child /></Parent>\`에서 Parent가 리렌더될 때
Child는 리렌더되지 않는다. Child의 엘리먼트는 Parent 밖에서 생성되었기 때문이다.

이 원리를 활용하면 \`React.memo\` 없이도 리렌더 전파를 물리적으로 차단할 수 있다.
비싼 컴포넌트를 children으로 전달받는 패턴은 우아한 성능 최적화 기법이다.`,
      starterCode: `import { useState } from 'react';

// 문제: SlowComponent가 ColorBox와 함께 매번 리렌더된다
function SlowComponent() {
  // 무거운 렌더링 시뮬레이션
  const now = performance.now();
  while (performance.now() - now < 50) {}
  console.log('SlowComponent 렌더');
  return <p>느린 컴포넌트</p>;
}

// TODO: ColorBox가 children을 받도록 변경하고
// App에서 <ColorBox><SlowComponent /></ColorBox>로 사용하라
function ColorBox() {
  const [color, setColor] = useState('blue');
  return (
    <div style={{ background: color, padding: 16 }}>
      <button onClick={() => setColor(c => c === 'blue' ? 'red' : 'blue')}>색상 변경</button>
      <SlowComponent />
    </div>
  );
}

export default function App() {
  return <ColorBox />;
}`,
    },
    {
      id: 6,
      slug: 'profiler-api',
      title: '6관문. Profiler API',
      mission: 'React Profiler API를 사용하여 컴포넌트 렌더 시간을 측정하고 병목을 찾아라.',
      theory: `## Profiler API: 데이터 기반 최적화

느낌이 아닌 데이터로 최적화하라.
\`<Profiler id="name" onRender={callback}>\`로 렌더 시간을 측정한다.

\`onRender(id, phase, actualDuration, baseDuration, startTime, commitTime)\`
- \`actualDuration\`: 이 렌더에 걸린 실제 시간
- \`baseDuration\`: 메모이제이션 없이 렌더했을 때 예상 시간
- \`phase\`: 'mount' | 'update'

측정 결과로 어디에 memo/useMemo가 효과적인지 결정하라.`,
      starterCode: `import { Profiler, useState } from 'react';

function onRenderCallback(id, phase, actualDuration, baseDuration) {
  console.log(\`[\${id}] \${phase}: \${actualDuration.toFixed(2)}ms (base: \${baseDuration.toFixed(2)}ms)\`);
}

function ExpensiveTree({ count }) {
  // 인위적인 렌더 비용
  const items = Array.from({ length: count * 100 }, (_, i) => i);
  return <div>{items.length}개 아이템 처리됨</div>;
}

export default function App() {
  const [count, setCount] = useState(10);
  const [unrelated, setUnrelated] = useState(0);

  return (
    <div>
      {/* TODO: Profiler로 ExpensiveTree를 감싸라 */}
      <ExpensiveTree count={count} />
      <button onClick={() => setCount(c => c + 5)}>트리 크기 증가</button>
      <button onClick={() => setUnrelated(u => u + 1)}>관련 없는 업데이트: {unrelated}</button>
      <p>콘솔에서 렌더 시간을 확인하라</p>
    </div>
  );
}`,
    },
    {
      id: 7,
      slug: 'code-splitting',
      title: '7관문. Code Splitting',
      mission: 'React.lazy와 Suspense로 무거운 컴포넌트를 분리하여 초기 번들 크기를 줄여라.',
      theory: `## Code Splitting: 번들 분할 전략

모든 코드를 하나의 번들로 보내면 초기 로딩(FCP, LCP)이 느려진다.
\`React.lazy(() => import('./HeavyComponent'))\`로 동적 import를 사용하면
해당 컴포넌트가 실제로 필요한 시점에만 청크를 다운로드한다.

**분할 단위:**
- 라우트: 각 페이지를 별도 청크로
- 무거운 라이브러리: 차트, 에디터, PDF 뷰어 등
- 조건부 컴포넌트: 모달, 관리자 패널 등`,
      starterCode: `import { lazy, Suspense, useState } from 'react';

// TODO: lazy로 무거운 컴포넌트를 동적 import하라
// import HeavyChart from './HeavyChart'; // 기존 방식
const HeavyChart = lazy(() => import('./HeavyChart'));

// HeavyChart.js (동일 폴더에 생성)
// export default function HeavyChart() {
//   return <div style={{ height: 300, background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>무거운 차트 컴포넌트</div>;
// }

export default function Dashboard() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <button onClick={() => setShowChart(true)}>차트 표시</button>
      {showChart && (
        // TODO: Suspense와 fallback을 추가하라
        <HeavyChart />
      )}
    </div>
  );
}`,
    },
  ],

  '07-nextjs-rsc': [
    {
      id: 1,
      slug: 'server-client-composition',
      title: '1관문. Server-Client Composition',
      mission: 'RSC에서 DB 데이터를 fetch하고 그 데이터를 RCC로 전달하는 조합 패턴을 구현하라.',
      theory: `## Server-Client Composition: 경계 설계

RSC는 서버에서만 실행되어 DB, 파일 시스템에 직접 접근할 수 있다.
RCC는 useState, 이벤트 핸들러 등 인터랙티브 기능을 사용할 수 있다.

**핵심 규칙:**
- RSC는 RCC를 import할 수 있다 (데이터를 props로 전달)
- RCC는 RSC를 import할 수 없다 (children으로 전달은 가능)
- RCC 안에 RSC를 \`import\`하면 해당 RSC도 클라이언트 번들에 포함된다`,
      starterCode: `// app/posts/page.js (RSC - 서버 컴포넌트)
import { LikeButton } from './LikeButton'; // RCC

async function getPosts() {
  // 서버에서 직접 DB 접근 또는 내부 API 호출
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', {
    cache: 'force-cache', // 정적 캐싱
  });
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts(); // await 직접 사용 가능 (RSC)

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <span>{post.title}</span>
          {/* RSC가 RCC에 서버 데이터를 props로 전달 */}
          <LikeButton postId={post.id} />
        </li>
      ))}
    </ul>
  );
}

// app/posts/LikeButton.js (RCC - 클라이언트 컴포넌트)
// TODO: 'use client' 선언 후 useState로 좋아요 수를 관리하라
`,
    },
    {
      id: 2,
      slug: 'server-actions',
      title: '2관문. Server Actions & Optimistic UI',
      mission: 'Server Action으로 폼을 처리하고 useOptimistic으로 서버 응답 전에 UI를 먼저 업데이트하라.',
      theory: `## Server Actions & Optimistic UI

Server Action은 서버에서 실행되는 함수를 클라이언트에서 직접 호출할 수 있게 한다.
\`'use server'\` 지시어로 선언하며, 폼의 action이나 이벤트 핸들러에서 호출한다.

**useOptimistic:** 서버 응답을 기다리지 않고 UI를 즉시 업데이트한다.
서버 응답이 오면 실제 상태로 교체되며, 실패 시 자동으로 롤백된다.
체감 속도를 0ms로 만드는 핵심 패턴이다.`,
      starterCode: `'use client';
import { useOptimistic, useTransition } from 'react';

// Server Action (별도 파일 또는 'use server' 함수)
async function addTodo(text) {
  'use server';
  // 실제로는 DB에 저장
  await new Promise(r => setTimeout(r, 1000)); // DB 지연 시뮬레이션
  return { id: Date.now(), text, done: false };
}

export default function TodoApp({ initialTodos }) {
  const [todos, setTodos] = React.useState(initialTodos ?? []);
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, newTodo]
  );

  async function handleSubmit(formData) {
    const text = formData.get('todo');
    // TODO: addOptimisticTodo로 즉시 UI 업데이트 후
    // addTodo Server Action 호출하라
    const newTodo = await addTodo(text);
    setTodos(prev => [...prev, newTodo]);
  }

  return (
    <div>
      <form action={handleSubmit}>
        <input name="todo" placeholder="할 일 입력" />
        <button type="submit">추가</button>
      </form>
      <ul>{optimisticTodos.map(t => <li key={t.id}>{t.text}</li>)}</ul>
    </div>
  );
}`,
    },
    {
      id: 3,
      slug: 'streaming-suspense',
      title: '3관문. Streaming & Suspense',
      mission: 'loading.js와 Suspense 경계를 전략적으로 배치하여 빠른 TTFB와 점진적 UI 로딩을 구현하라.',
      theory: `## Streaming: 준비된 것부터 전송

전통적인 SSR은 모든 데이터가 준비될 때까지 HTML 전송을 기다린다.
Streaming은 준비된 부분부터 즉시 전송하고, 느린 부분은 나중에 채운다.

**Next.js 구현:**
- \`loading.js\`: 라우트 수준 Suspense 경계, 자동으로 적용
- \`<Suspense fallback={<Skeleton />}>\`: 컴포넌트 수준 세밀한 제어
- 느린 컴포넌트를 Suspense로 감싸면 나머지 UI가 먼저 표시된다`,
      starterCode: `// app/dashboard/page.js
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// 빠른 데이터 (즉시 렌더)
async function QuickStats() {
  const data = await fetch('/api/quick-stats').then(r => r.json());
  return <div>방문자: {data.visitors}</div>;
}

// 느린 데이터 (3초 소요)
async function SlowChart() {
  await new Promise(r => setTimeout(r, 3000)); // 느린 DB 쿼리
  return <div>차트 데이터 로드 완료</div>;
}

export default function DashboardPage() {
  return (
    <div>
      <h1>대시보드</h1>
      {/* QuickStats는 즉시 표시 */}
      <QuickStats />

      {/* TODO: SlowChart를 Suspense로 감싸라
          fallback으로 Skeleton을 표시하여
          빠른 컨텐츠가 차트를 기다리지 않도록 하라 */}
      <SlowChart />
    </div>
  );
}`,
    },
    {
      id: 4,
      slug: 'request-memoization',
      title: '4관문. Request Memoization',
      mission: '동일 렌더 사이클에서 중복 fetch가 자동으로 제거되는 원리를 확인하고 활용하라.',
      theory: `## Request Memoization: 중복 fetch 제거

Next.js는 서버 컴포넌트 렌더 사이클 동안 동일 URL의 \`fetch\`를 자동으로 중복 제거한다.
여러 컴포넌트가 같은 엔드포인트를 호출해도 실제 네트워크 요청은 한 번만 발생한다.

**주의:** 이는 단일 요청 사이클에만 적용된다. 요청 간 캐시는 \`cache\` 옵션으로 제어한다.
\`cache: 'force-cache'\` (기본): 빌드 시 캐시
\`cache: 'no-store'\`: 항상 최신 데이터
\`next: { revalidate: 60 }\`: 60초마다 갱신`,
      starterCode: `// 두 컴포넌트가 같은 URL을 요청하지만 실제 fetch는 한 번만 발생한다
async function getUser(id) {
  // 같은 렌더 사이클에서 중복 호출은 자동으로 중복 제거됨
  const res = await fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`, {
    // TODO: 다양한 cache 옵션을 시도해보라
    // cache: 'force-cache' | 'no-store'
    // next: { revalidate: 60 }
  });
  console.log('fetch 호출됨!'); // 실제로 몇 번 출력되는지 확인
  return res.json();
}

async function UserName({ userId }) {
  const user = await getUser(userId);
  return <span>{user.name}</span>;
}

async function UserEmail({ userId }) {
  const user = await getUser(userId); // 중복 호출이지만 실제 fetch는 한 번
  return <span>{user.email}</span>;
}

export default async function UserCard({ userId = 1 }) {
  return (
    <div>
      <UserName userId={userId} />
      <UserEmail userId={userId} />
      {/* 콘솔에서 'fetch 호출됨!'이 몇 번 출력되는지 확인하라 */}
    </div>
  );
}`,
    },
    {
      id: 5,
      slug: 'ppr',
      title: '5관문. PPR (Partial Prerendering)',
      mission: '정적 레이아웃을 즉시 전송하고 동적 콘텐츠를 Suspense 스트리밍으로 채우는 PPR을 구현하라.',
      theory: `## Partial Prerendering: 정적과 동적의 공존

기존엔 페이지 전체가 정적이거나 동적이었다.
PPR은 하나의 페이지에서 정적 껍데기는 즉시 CDN에서 전송하고,
동적 구멍(Hole)은 서버에서 Streaming으로 채운다.

**활성화:** \`next.config.js\`에서 \`experimental.ppr: true\` 설정.
정적 부분은 빌드 시 렌더링되어 엣지에서 즉시 응답하고,
\`<Suspense>\`로 감싼 동적 부분만 서버에서 지연 전송된다.`,
      starterCode: `// next.config.js에 experimental.ppr: true 추가 필요
import { Suspense } from 'react';

// 정적 콘텐츠 (빌드 시 생성, CDN 캐시)
function StaticLayout({ children }) {
  return (
    <div>
      <nav>정적 네비게이션 (즉시 표시)</nav>
      <main>{children}</main>
    </div>
  );
}

// 동적 콘텐츠 (요청마다 새로 생성)
async function DynamicUserGreeting() {
  // 실제로는 쿠키/세션에서 사용자 정보 읽기
  const user = { name: '수련생' };
  return <p>안녕하세요, {user.name}님!</p>;
}

async function DynamicRecommendations() {
  await new Promise(r => setTimeout(r, 500));
  return <p>오늘의 추천 수련: useState 관문</p>;
}

export default function Page() {
  return (
    <StaticLayout>
      {/* TODO: 동적 컴포넌트들을 Suspense로 감싸라
          정적 레이아웃은 즉시 표시되고
          동적 부분만 스트리밍으로 채워진다 */}
      <DynamicUserGreeting />
      <DynamicRecommendations />
    </StaticLayout>
  );
}`,
    },
    {
      id: 6,
      slug: 'seo-metadata',
      title: '6관문. SEO & Metadata API',
      mission: 'generateMetadata로 동적 라우트의 title과 openGraph 이미지를 동적으로 생성하라.',
      theory: `## Metadata API: 검색 엔진 최적화

Next.js 13+의 Metadata API는 \`<head>\` 태그를 서버에서 생성한다.
정적 메타데이터는 \`export const metadata = {...}\`로 선언하고,
동적 메타데이터는 \`export async function generateMetadata({ params })\`를 사용한다.

데이터 패칭도 가능하며, Request Memoization으로 page.js와 중복 요청이 발생하지 않는다.`,
      starterCode: `// app/posts/[id]/page.js

// TODO: generateMetadata 함수를 구현하라
// params.id로 포스트 데이터를 fetch하여
// title: post.title
// description: post.body.slice(0, 100)
// openGraph: { title, description, type: 'article' }
// 를 반환하라

export async function generateMetadata({ params }) {
  // 힌트: Request Memoization으로 page.js와 같은 fetch를 사용해도 중복 요청 없음
}

async function getPost(id) {
  const res = await fetch(\`https://jsonplaceholder.typicode.com/posts/\${id}\`);
  return res.json();
}

export default async function PostPage({ params }) {
  const post = await getPost(params.id);
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}`,
    },
    {
      id: 7,
      slug: 'hydration-mismatch',
      title: '7관문. Hydration Mismatch',
      mission: '서버/클라이언트 HTML 불일치 에러를 진단하고 올바른 방법으로 수정하라.',
      theory: `## Hydration Mismatch 디버깅 정공법

서버 HTML과 클라이언트 첫 렌더 결과가 다르면 리액트가 에러를 던진다.

**흔한 원인:**
- \`typeof window\` 분기
- \`Math.random()\`, \`Date.now()\` 사용
- localStorage, sessionStorage 초기값
- 브라우저 전용 API

**정공법:** suppressHydrationWarning은 최후 수단이다.
\`const [mounted, setMounted] = useState(false)\`와 useEffect로
서버와 클라이언트의 첫 렌더를 일치시킨 후 마운트 이후에 다른 값을 표시하라.`,
      starterCode: `'use client';
import { useState, useEffect } from 'react';

// 아래 컴포넌트들의 Hydration 에러를 수정하라

// 문제 1: Math.random()은 서버/클라이언트에서 다른 값을 생성
function RandomId() {
  const id = Math.random().toString(36).slice(2);
  return <span>ID: {id}</span>;
}

// 문제 2: window 객체는 서버에 없다
function WindowSize() {
  const width = typeof window !== 'undefined' ? window.innerWidth : 0;
  return <span>너비: {width}px</span>;
}

// 문제 3: localStorage는 서버에 없다
function SavedTheme() {
  const theme = typeof window !== 'undefined'
    ? localStorage.getItem('theme') || 'light'
    : 'light';
  return <span>테마: {theme}</span>;
}

// TODO: 각 컴포넌트를 useEffect + mounted 패턴으로 수정하라

export default function App() {
  return (
    <div>
      <RandomId />
      <WindowSize />
      <SavedTheme />
    </div>
  );
}`,
    },
  ],
};

export function getAllTopicIds() {
  return Object.keys(TOPICS);
}

export function getTopic(topicId) {
  return TOPICS[topicId] ?? null;
}

export function getGates(topicId) {
  return CURRICULUM[topicId] ?? [];
}

export function getAllGatePaths() {
  return Object.entries(CURRICULUM).flatMap(([topic, gates]) =>
    gates.map((gate) => ({ topic, slug: gate.slug }))
  );
}

export function getGate(topicId, slug) {
  const gates = CURRICULUM[topicId];
  if (!gates) return null;
  return gates.find((gate) => gate.slug === slug) ?? null;
}
