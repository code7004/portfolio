## 1. 왜 다시 백엔드를 설계하는가

기존 프로젝트에서는 Koa 기반으로 서버를 직접 설계·운영해 왔다.

라우팅 자동 등록, 공통 응답 포맷, 글로벌 에러 처리, 로깅, 대용량 요청 분기 처리, Swagger 자동화, Graceful Shutdown까지 포함한 구조였다.

기능 구현 수준을 넘어, “운영 가능한 서버 구조”를 만드는 것이 목표였다.

이번 포트폴리오에서는 그 경험을 표준 프레임워크 위에서 다시 정리해보려 한다.

단순히 CRUD API를 만드는 것이 목적이 아니다.

**운영 관점에서 구조를 설계할 수 있는 개발자인지 스스로 검증하는 과정**이다.

그래서 NestJS를 선택했다.

---

## 2. 왜 NestJS인가

NestJS는 단순 Node 프레임워크가 아니다.

* 모듈 기반 구조
* DI(의존성 주입) 컨테이너
* Controller / Service 분리
* Interceptor / Filter / Guard 체계
* 데코레이터 기반 메타 프로그래밍

즉, 구조를 강제한다.

Koa는 유연하다.

NestJS는 구조를 요구한다.

이번 설계의 목적은

“유연함을 보여주는 것”이 아니라

**“구조를 이해하고 통제할 수 있는지 보여주는 것”**이기 때문에 NestJS를 선택했다.

---

## 3. 이번 프로젝트의 목표

이 프로젝트는 단순 게시판이 아니다.

다음 항목을 모두 포함한 구조를 설계한다.

* 도메인 중심 모듈 구조
* DTO 기반 입력 검증 (ValidationPipe)
* 공통 응답 포맷 Interceptor
* 글로벌 예외 처리 Filter
* 로깅 Middleware
* Swagger 기반 문서 자동화
* JWT 인증 구조
* DB 연결 및 Repository 패턴
* Graceful Shutdown 적용
* API Versioning 전략 적용

기능보다 **구조**에 초점을 둔다.

---

## 4. 수행 목차

1. Nest 기본 세팅
2. 도메인 중심 구조 정리
3. 게시판 CRUD 구현
4. DTO + Validation 적용
5. DB 연결 (Repository 패턴)
6. JWT 인증 구조 설계
7. 공통 계층 구성 (Filter / Interceptor / Middleware)
8. Swagger 문서화
9. Graceful Shutdown 및 정리

---

## 5. 기존 Koa 구조와의 차이점

이전 Koa 서버에서는 다음과 같은 작업을 직접 구현했다.

* 글로벌 에러 핸들러
* 공통 응답 래핑
* Router 자동 등록
* 대용량 bodyParser 분기 처리
* Swagger 자동 문서 생성
* React Router fallback 처리
* Graceful shutdown 구현

NestJS에서는 이 기능들이

* ExceptionFilter
* Interceptor
* Module 구조
* Guard
* Lifecycle Hook

형태로 재구성된다.

이번 프로젝트는 단순히 “Nest를 사용해보는 것”이 아니라

**기존 운영 경험을 Nest의 구조 안에서 재해석하는 과정**이다.

---

## 6. 마무리

좋은 서버는 “코드가 동작하는 서버”가 아니다.

**예외 상황에서도 통제 가능한 서버**다.

이번 기록은 기능 구현 과정이 아니라

구조를 설계하고 통제하는 과정을 정리하는 문서가 될 것이다.
