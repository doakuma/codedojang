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
  },
};
