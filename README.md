# 📦 Portfolio Architecture

> 이 프로젝트는 기능 구현 중심이 아닌, **프론트엔드 / 백엔드 기본 아키텍처 설계 역량을 보여주기 위한 샘플 프로젝트**입니다.
>
> 실제 서비스 환경에서 재사용 가능한 구조와 확장 가능성을 고려한 기본 프레임워크 구성을 목표로 했습니다.

---

# 프로젝트 목적

- React + Webpack 기반 프론트엔드 구조 설계
- Node.js + Koa 기반 API 서버 구조 설계
- 일관된 응답 구조 설계
- 관심사 분리(Separation of Concerns)
- 재사용 가능한 컴포넌트 및 서비스 계층 설계
- 운영을 고려한 에러 핸들링 및 로깅 구조 구현

---

# 전체 구조

```js
root
 ├─ README.md
 ├─ frontend/
 └─ backend/
```

---

# 🖥 Frontend

## ⚙️ 기술 스택

- React, Webpack, SCSS, TailwindCSS
- Custom Axios Instance, Custom UI Component(일부)

---

## 📁 폴더 구조

```js
 src
    ├─ @core/    	// 전역 인프라 레벨 코드
    ├─ @types/      // 전역 공통 타입
    ├─ app/         // 앱 엔트리 및 라우팅
    ├─ assets/      // 정적 리소스[image, icon, font, locale]
    ├─ components/  // 공통 UI 컴포넌트
    ├─ pages/          // 라우트 단위 컨테이너
    ├─ hooks/          // 비즈니스 로직 및 상태 로직 분리
    ├─ store/          // 상태 관리
    ├─ styles/         // 글로벌 스타일
    └─ utils/          // 순수 유틸 함수
```

---

## 🧠 설계 원칙

### 1️⃣ 역할 중심 분리

- UI는 UI만 담당
- 데이터 호출은 services
- 상태 로직은 hooks 또는 store
- 순수 계산은 utils

> “코드 길이”보다 “역할의 명확성”을 우선했습니다.

---

### 2️⃣ Custom Axios 설계

- API 응답 구조 통일
- 인터셉터 기반 에러 처리
- 환경별 baseURL 분리

예시 응답 구조:

```js
{
  "success": true,
  "data": {},
  "message": null
}
```

### 3️⃣ UI Component 설계

일부 커스텀 컴포넌트는 다음 기준으로 설계했습니다.

- Controlled / Uncontrolled 지원
- 재사용 가능한 props 구조
- 확장 가능한 스타일 구조
- 키보드 접근성 고려

---

### 4️⃣ Webpack 직접 구성

Vite 등의 빌드 도구 대신 Webpack을 직접 설정하여

- 로더 동작 이해
- 번들 구조 이해
- 환경 분리 전략
- 최적화 설정

을 명확히 구현했습니다.

---

# 🧩 Backend

## ⚙️ 기술 스택

- Node.js, Koa, Swagger
- Auto Route Loader
- Global Error Handler
- Response Wrapper

---

## 📁 폴더 구조

```js
src
 ├─ app.js
 ├─ routes/
 ├─ controllers/
 ├─ services/
 ├─ middlewares/
 ├─ utils/
 ├─ config/
 └─ logs/
```

---

## 🧠 설계 원칙

### 1️⃣ 자동 라우트 로딩

파일 추가 시 별도 등록 없이 자동 라우팅 되도록 구성

> 확장 시 유지보수 비용 최소화

---

### 2️⃣ 응답 구조 통일

모든 API는 동일한 응답 포맷을 유지합니다.

- success
- data
- message

프론트엔드와의 계약(Contract)을 명확히 하기 위함입니다.

---

### 3️⃣ 글로벌 에러 핸들링

- 모든 예외는 중앙에서 처리
- 로그 분리 저장
- 운영 환경에서 stack trace 노출 방지

---

### 4️⃣ Swagger 문서 관리 전략

- Swagger 기반 API 명세 문서 구성
- 자동 라우트 로더 구조와 연계하여 확장 시 구조 일관성 유지
- YAML 문서는 자동 생성이 아닌 명시적 관리 방식 채택

---

# 🔄 데이터 흐름

```
UI
 ↓
Custom Hook
 ↓
Service Layer
 ↓
Axios Instance
 ↓
Backend API
 ↓
Controller
 ↓
Service
 ↓
Response Wrapper
```

---

# 💡 이 프로젝트에서 보여주고자 한 것

- 단순 기능 구현이 아닌 구조 설계 능력
- 팀 단위 개발 시 확장 가능한 기본 골격 설계
- 프론트/백엔드 간 계약 기반 개발
- 운영을 고려한 예외 처리 설계

---

# 🚀 실행 방법

## Frontend

```
cd frontend
npm install
npm run dev
```

## Backend

```
cd backend
npm install
npm run dev
```
