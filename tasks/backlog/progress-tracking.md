# 태스크: 수련 진도 추적

> 생성일: 2026.03.25
> 예상 소요: 3~4시간
> 담당: 서브 에이전트

## 배경

현재 관문을 완료해도 어디까지 수련했는지 표시되지 않는다.
로컬스토리지에 완료 관문 ID를 저장하고 UI에 반영한다.

## 읽어야 할 파일 (이것만 읽을 것)

- `docs/state.md`
- `src/lib/curriculum.js`
- `src/app/training/[topic]/page.js`
- `src/components/shared/GatePage.jsx`
- `src/components/shared/SooryeonCard.jsx`

## 건드리지 말 것

- `src/lib/curriculum.js` — 데이터 구조 변경 금지
- `docs/traning_list.md` — 커리큘럼 명세, 수정 금지

## 구현 목록

- [ ] `src/hooks/useProgress.js` 생성 — 로컬스토리지 기반 진도 훅
  - `completeGate(topicId, slug)` — 관문 완료 처리
  - `isGateComplete(topicId, slug)` — 완료 여부 확인
  - `getTopicProgress(topicId)` — 문파 완료율 (완료 수 / 7)
  - `resetProgress()` — 초기화
- [ ] `GatePage`에 "관문 완료" 버튼 추가 (`'use client'` 래퍼 컴포넌트 필요)
- [ ] `SooryeonCard`에 완료 배지 표시 (관문 카드)
- [ ] 문파 페이지에 완료율 프로그레스 바 또는 숫자 표시

## 완료 기준

- [ ] 관문 완료 버튼 클릭 → 로컬스토리지에 저장됨
- [ ] 페이지 새로고침 후에도 완료 상태 유지
- [ ] 문파 카드 목록에서 완료한 관문에 표시 보임
- [ ] `docs/state.md` 업데이트
- [ ] 커밋 메시지: `feat(progress): 로컬스토리지 기반 수련 진도 추적`

## 주의사항

- `useProgress` 훅은 `localStorage` 사용 → `'use client'` 필수
- `GatePage`는 현재 RSC. 완료 버튼 추가 시 분리된 `'use client'` 컴포넌트로 감싸야 함
- `SooryeonCard`는 현재 RCC(`'use client'`) — 직접 훅 사용 가능
