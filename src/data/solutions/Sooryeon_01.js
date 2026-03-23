export const solutionData = {
  mission1: {
    title: "🥋 비급 전수: 함수형 업데이트",
    description: "사부님의 코드를 보고 원리를 깨우치십시오.",
    code: `// 정공법 Code
setCombo(prev => prev + 1);
setCombo(prev => prev + 1);
setCombo(prev => prev + 1);

// 💡 사부님의 한마디:
// "리액트의 상태 변경은 비동기로 예약된다.
// 현재 값이 아닌, '방금 예약된 최신 값(prev)'을
// 받아와서 다음 계산을 이어가야 한다."`,
    review: `작성하신 코드는 **정공법(正攻法)**에 부합하는 아주 훌륭한 해결책입니다! 🥋

\`useState\`의 함수형 업데이트(\`prev => ...\`)를 사용하여 비동기 상태 갱신 문제를 정확하게 해결하셨습니다.

### 📝 코드 리뷰 (Code Review)
**1. 정확한 기능 구현 (Correctness)**
- \`setCombo(prev => prev + 3)\`은 이전 상태(\`prev\`)를 기반으로 확실하게 3을 더합니다. 리액트의 배칭(Batching) 동작이나 비동기 갱신 시점과 상관없이 항상 최신 값을 보장받을 수 있습니다.

**2. 실무적 최적화 (Best Practice)**
- 도장의 **비급(정답 데이터)**에서는 교육 목적으로 \`setCombo(prev => prev + 1)\`을 세 번 호출하여 "상태 갱신이 큐(Queue)에 쌓이는 과정"을 보여주려 했습니다.
- 하지만 수련생님께서 작성하신 것처럼 **한 번의 호출로 3을 더하는 것**이 실제 프로덕션 환경에서는 렌더링 큐 관리 측면에서 더 깔끔하고 효율적인 코드입니다. 청출어람(靑出於藍)이군요!`,
  },
  mission2: {
    title: "🥋 비급 전수: Spread 연산자",
    description: "객체를 안전하게 복사하는 비기입니다.",
    code: `// 정공법 Code
setProfile(prev => ({
  ...prev,      // 기존 속성(name) 복사
  level: prev.level + 1 // 변경할 속성 덮어쓰기
}));

// 💡 사부님의 한마디:
// "객체는 껍데기를 새로 만들어야 리액트가 알아본다.
// ...prev로 알맹이를 옮겨 담고, 바꿀 부분만 수정하라."`,
    review: `훌륭합니다! **미션 2**를 완벽한 **정공법(正攻法)**으로 해결하셨습니다.

### 📝 코드 리뷰 (Code Review)

#### **\`handleLevelUp\` (객체 업데이트)**

\`\`\`javascriptreact
setProfile((prev) => ({
  ...prev,
  level: prev.level + 1,
}));
\`\`\`

-   **정확성 (Correctness):** 객체의 불변성을 완벽하게 지켰습니다. Spread 연산자(\`...prev\`)를 사용해 기존 \`name\` 속성을 안전하게 복사하고, \`level\` 속성만 덮어쓰는 정석적인 방법을 정확히 구사하셨습니다.
-   **안전성 (Safety):** \`(prev) => ...\` 형태의 함수형 업데이트를 사용하여, 여러 번의 업데이트가 동시에 발생하더라도 항상 최신 상태(\`prev\`)를 기반으로 계산하므로 데이터 정합성을 보장합니다.`,
  },
  mission3: {
    title: "🥋 비급 전수: 배열의 불변성",
    description: "배열을 다루는 정공법입니다.",
    code: `// 정공법 Code
setInventory(prev => [...prev, newItem]);
// 또는 setInventory(prev => prev.concat(newItem));

// 💡 사부님의 한마디:
// "push는 원본을 훼손한다.
// Spread(...)를 써서 새로운 배열을 만들어야
// 리액트가 '어? 데이터가 변했네?' 하고 화면을 그린다."`,
    review: `완벽합니다! **미션 3** 역시 **정공법(正攻法)**으로 깔끔하게 처리하셨습니다.

### 📝 코드 리뷰 (Code Review)

#### **\`handleAddItem\` (배열 업데이트)**

\`\`\`javascriptreact
setInventory((prev) => [...prev, newItem]);
\`\`\`

-   **정확성 (Correctness):** \`push()\`와 같이 원본 배열을 직접 수정하는 '사술' 대신, Spread 연산자를 사용해 기존 아이템을 모두 포함하는 '새로운 배열'을 생성하셨습니다. 이는 React가 상태 변화를 감지하고 리렌더링을 수행하게 하는 핵심 원리입니다.
-   **간결성 (Conciseness):** 코드가 간결하고 의도가 명확하게 드러납니다.`,
  },
};
