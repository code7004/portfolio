# 1. Architectural Goal

InsightOps는 단순한 화면 중심 애플리케이션이 아니라, 확장 가능한 Frontend 시스템 구조를 설계하는 것을 목표로 합니다.

- 기능 확장과 시스템 확장을 분리한다.
- 도메인 개념과 UI 구현을 분리한다.
- 공통 인프라를 기능과 독립시킨다.
- 팀 단위 협업을 고려한 구조를 유지한다.

---

## 2. Layered + Feature Hybrid Structure

```
src
 ├─ app/
 ├─ core/
 ├─ shared/
 ├─ entities/
 ├─ features/
 ├─ widgets/
 └─ pages/
```

이 구조는 전통적인 Layered Architecture와 Feature 기반 구조를 혼합한 형태입니다.

### 왜 Hybrid 구조를 선택했는가?

- 순수 Feature 구조는 시스템 인프라를 표현하기 어렵습니다.
- 순수 Layered 구조는 기능 단위 확장에 불리합니다.
- 따라서 기능 확장과 시스템 확장을 분리하기 위해 Hybrid 구조를 선택했습니다.

---

## 3. Layer Responsibilities

### 3.1 app

앱의 진입점 및 전역 조합 레이어입니다.

- Router 구성
- Provider 조합
- Suspense / ErrorBoundary 설정

앱 레벨에서 시스템 구성을 통제합니다.

---

### 3.2 core

시스템 인프라 레이어입니다.

포함 항목:

- Redux Store 설정
- Axios Instance
- Interceptor
- API Logger
- Theme Provider
- Permission Guard

core는 기능과 독립적으로 유지되며, 조직 단위에서 재사용 가능한 자산으로 설계되었습니다.

---

### 3.3 shared

도메인에 종속되지 않는 공통 자산 레이어입니다.

- UI 컴포넌트 (Design System)
- 공통 Hooks
- 유틸 함수
- 공통 타입

shared는 Storybook과 연결되며, 디자인 시스템 운영을 고려한 구조입니다.

---

### 3.4 entities

비즈니스 도메인 모델 정의 레이어입니다.

예:

- User
- AnalyticsEvent
- LogEntry

entities는 UI나 기능에 종속되지 않으며, 비즈니스 개념을 중심으로 구성됩니다.

---

### 3.5 features

기능 단위 모듈 레이어입니다.

각 feature는 다음을 포함할 수 있습니다:

- api
- slice
- 내부 컴포넌트
- hooks

이 구조는 기능 단위로 독립적인 확장을 가능하게 합니다.

---

### 3.6 widgets

화면 조합 단위입니다.

- 여러 feature를 조합하는 단위
- page보다 작은 단위

복잡한 화면을 구조적으로 분해하기 위한 레이어입니다.

---

### 3.7 pages

라우트 단위 레이어입니다.

- feature와 widget을 조합
- 비즈니스 로직을 직접 가지지 않음
- Router와 연결되는 최상위 UI 단위

---

## 4. Separation of Concerns

InsightOps는 다음과 같은 분리를 유지합니다:

| Concern          | Location           |
| ---------------- | ------------------ |
| State Management | feature 내부 slice |
| Network Layer    | core/network       |
| Logging          | core/logger        |
| Theme            | core/theme         |
| UI Components    | shared/ui          |
| Domain Model     | entities           |

이 구조는 관심사의 명확한 분리를 유지합니다.

---

## 5. Scalability Strategy

향후 확장 시:

- 새로운 기능은 `features/`에 추가
- 공통 인프라 확장은 `core/`에서 관리
- 디자인 시스템은 `shared/ui`에서 일관성 유지

이 구조는 팀 규모 확장과 기능 확장 모두를 고려한 설계입니다.

---

## 6. Conclusion

InsightOps의 아키텍처는

- 단순 구현이 아닌
- 시스템 설계 중심 접근

을 목표로 하며, 기능 단위 확장성과 시스템 단위 확장성을 동시에 고려한 구조를 제공합니다.
