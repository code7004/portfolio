# InsightOps

> Product Analytics & Operations Platform (Simulation)
>
> Frontend Architecture Showcase Project

InsightOps는 사용자 행동 데이터와 시스템 운영 로그를 통합하여 제품 개선 의사결정을 지원하는 관리자 플랫폼을 가정한 프로젝트중 일부 기능을 구현한 프로젝트 입니다.

이 프로젝트는 단순 기능 구현 예제가 아닌, **Frontend 관점에서 확장 가능한 시스템을 설계하고 관리하는 방식을 보여주는 데 목적**이 있습니다.

---

## 1. Product Context

현실의 제품 운영 환경에서는 다음과 같은 문제가 발생합니다:

- 사용자 행동 데이터와 시스템 로그가 분리되어 존재
- 데이터는 많지만 인사이트 도출이 어려움
- 기능 확장 시 UI 일관성과 접근 제어가 쉽게 붕괴
- 다국어 운영 환경에서 리소스 관리 비용 증가

InsightOps는 이러한 문제를 해결하기 위한 통합 운영 콘솔을 가정합니다.

---

## 2. Core Features

### Analytics Dashboard

- KPI 카드 (세션, 전환율, 평균 응답 시간)
- 사용자 흐름 시각화
- 기간 필터 기반 집계
- 에러율 통계

### Event Log & Monitoring

- Request ID 기반 요청 추적
- 응답 시간 및 상태 코드 필터
- API 로그 모니터링

### Localization Admin Tool

- Namespace 기반 다국어 키 관리
- 언어별 값 등록 및 수정
- Role 기반 수정 권한 제어

### Role-Based Admin Settings

- 기능 단위 접근 제어
- Feature Toggle 기반 점진적 배포 구조
- Permission Guard 기반 라우팅 제어

---

## 3. Business Value

InsightOps는 운영 효율성과 제품 의사결정 품질 향상을 목표로 설계되었습니다.

### Faster Incident Response

Request ID 기반 로그 추적과 응답 시간 분석을 통해 장애 원인 파악 시간을 단축할 수 있습니다.

> 예: 장애 발생 시 추적 시간을 수십 분에서 수 분 단위로 단축

---

### Data-Driven Decisions

사용자 흐름 및 이탈률 분석을 통해 기능 개선 여부를 데이터 기반으로 판단할 수 있습니다.

> 예: 특정 단계 이탈률 18% → UI 개선 후 11% 감소 시뮬레이션

---

### Operational Efficiency

다국어 리소스를 중앙에서 관리함으로써 번역 요청 및 배포 전 수정 프로세스를 단순화할 수 있습니다.

---

### Scalable Governance

Role 기반 접근 제어와 모듈 분리 구조를 통해 조직 규모 확장 시에도 시스템 일관성을 유지할 수 있습니다.

---

## 4. Architectural Philosophy

InsightOps는 다음 철학을 기반으로 설계되었습니다:

- Clean Architecture에서 영감을 받은 레이어 분리
- Feature-Oriented 모듈 구조
- 관심사의 명확한 분리
- 확장성과 팀 협업을 고려한 설계

---

## 5. Architecture Overview

```
config/           → webpack 분리 (good)
src/
  app/            → 엔트리 + RouteData
  core/           → 인프라 레벨 (network, route-meta)
  pages/          → 라우트 단위 컨테이너
  shared/
    layout/       → GNB, Layout
    tx-ui/        → UI 라이브러리
  styles/         → 글로벌 스타일
  types/          → 전역 타입

```

자세한 내용은 `docs/` 폴더 참고

---

## 6. Technology Stack

- React 19
- TypeScript (Strict Mode)
- Webpack
- Redux Toolkit
- Storybook
- Axios (Interceptor 기반 Logger)
- ESLint / Prettier / Husky
- Jest

---

## 7. Documentation

- [Architecture → docs/architecture.md](./docs/architecture.md)
- [Design System → docs/design-system.md](https://www.notion.so/Design-system-30700cf52b72808187ffca0cbf79d595?pvs=21)
- [State Management → docs/state-management.md](https://www.notion.so/State-management-30700cf52b7280bb9265e218ae963eac?pvs=21)
- [Network Layer → docs/network-layer.md](https://www.notion.so/Network-layer-30700cf52b72805a923aec920fe23f99?pvs=21)
- [Collaboration Strategy → docs/collaboration.md](https://www.notion.so/Collaboration-Simulation-30700cf52b7280709717c46b5821751f?pvs=21)
- [ADR → docs/adr/](https://www.notion.so/ADR-Achitecture-Decision-Record-30700cf52b7280ab8a42f71bc5955b00?pvs=21)

---

## 8. 실행 방법

```jsx
yarn start
```
