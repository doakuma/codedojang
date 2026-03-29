# 코드도보통지 — Claude Memory Index

> 이전 대화에서 획득한 중요한 맥락들
> 200줄 이하 유지 (빠른 로드)

---

## Project Context

- [프로젝트 핵심 갭](memory/project_core_gap.md) — 검증 부재 + 실무 괴리 (가장 중요)

---

## Key Findings (2026-03-29)

1. **학습 검증 부재가 가장 치명적**
   - Sandpack은 에러만 보여줌
   - 자동 테스트, 정답 코드 없음
   - 학습자가 "이게 맞나?" 판단 불가능

2. **실무 적응성이 예상보다 훨씬 낮음**
   - useState: 53% 직접 적용 (나머지는 라이브러리)
   - useEffect: 40% 직접 적용 (TanStack Query 필수)
   - 결론: 배운 것의 절반 이상이 실무에선 다르게 처리됨

3. **라이브러리 생태계 완전 미포함**
   - TanStack Query, Zustand, React Hook Form 없음
   - "배운 것" vs "배우지 않은 것" 중 후자가 더 중요

4. **문제의 근원은 "선택의 부재"**
   - "언제 useState? 언제 Zustand? 언제 TanStack Query?"
   - 배운 것을 어디에 쓸지 모름

---

## Action Plan

### v0.3 (4주) — 학습 경험 개선
- P0-1: 검증 시스템 (정답 + 테스트)
- P0-2: 진도 추적 (localStorage)
- P0-3: 힌트 시스템 (단계적 도움)
- P1: 선수조건, 난이도 표시

### v0.4 (6주) — 실무 연결
- 패턴 가이드 (상태관리, 데이터페칭, 폼처리)
- TanStack Query 미니 과정
- Zustand 미니 과정

### v1.0 (6-12개월) — 통합 완성
- 모든 것을 연결한 최종 플랫폼

---

## Architecture & Code Structure

- [아키텍처 문서](memory/architecture_docs.md) — 3개 문서 생성 (architecture.md, component-tree.md, quick-reference.md)

## Documents

- `docs/analysis-gaps.md` — 9개 갭의 상세 분석
- `docs/roadmap-v1.md` — v0.3 → v1.0 실행 계획
- `docs/requirements.md` — 업데이트된 기능 요구사항
- `docs/architecture.md` — 전체 아키텍처 상세 설명 (공통 로직, 컴포넌트, 데이터 흐름)
- `docs/component-tree.md` — 컴포넌트 구조 & 시각적 맵
- `docs/quick-reference.md` — 빠른 참조 가이드
