import { RouteObject, useRoutes } from "react-router-dom";

/**
 * 라우트 기본 타입 (RouteObject에서 children 제외 후 확장)
 * - name: 라벨용 이름
 * - disable: 비활성화 여부 (메뉴 숨김 등)
 * - permision: 권한 리스트 (ex: ["admin"])
 */
export interface ExRouteObjectBase extends Omit<RouteObject, "children"> {
  name: string;
  icon: string;
  disable?: boolean;
  permisions?: number[];
  description?: string;
}

/**
 * 라우트 객체 타입
 * - children은 key-value 구조로 선언하여 참조 편의성 확보
 */
export interface ExRouteObject extends ExRouteObjectBase {
  children?: Record<string, ExRouteObject>; // 중첩 라우팅도 key-value로 관리
}

/**
 * 최상위 라우트 모음: 각 항목은 키를 기반으로 직접 참조 가능
 */
export type RouteDataAtts = Record<string, ExRouteObject>;

/**
 * cleanRoutes:
 * - key-value 구조의 RouteDatas를 React Router가 요구하는 배열 형태로 변환
 * - children도 재귀적으로 변환
 */
export function cleanRoutes(routes: RouteDataAtts): RouteObject[] {
  return Object.values(routes).map(route => {
    const { path, element, children, index, loader, errorElement } = route;

    if (index == true) return { index: true, path, element, loader, errorElement };
    else return { path, element, loader, errorElement, children: children ? cleanRoutes(children) : undefined };
  });
}

/**
 * availableRouteDatas:
 * - disable이 아닌 라우트만 반환
 * - 메뉴 표시, 퍼미션 검사용
 */
export function availableRouteDatas(routes: RouteDataAtts, permision?: number): ExRouteObject[] {
  // console.log(permision);
  // return Object.values(routes).filter(r => !r.disable);
  return Object.values(routes).filter(r => !r.disable && (!r.permisions || r.permisions.includes(permision)));
}

import { useLocation, useParams } from "react-router-dom";

/**
 * useCurrentRoute
 * -------------------------------------------------------------------
 * ✅ 인자로 전달된 RouteData 객체를 기준으로 현재 URL 경로에
 *    매칭되는 Route 정보를 찾아줍니다.
 * ✅ react-router-dom의 useLocation, useParams와 결합하여
 *    - 현재 Route 객체 (RouteData 정의된 값)
 *    - 실제 URL 파라미터 값
 *    - 현재 pathname
 *    - location 객체 전체
 *   를 리턴합니다.
 *
 * 📌 사용 예시:
 * ```tsx
 * import { RouteData } from "@/RouteData";
 *
 * const { route, params, pathname } = useCurrentRoute(RouteData);
 *
 * console.log(route?.name);      // "SingleUserView"
 * console.log(params);           // { providerTag: "p1", nickname: "user1" }
 * console.log(pathname);         // "/userview/p1/user1"
 * ```
 */

export function useCurrentRoute(RouteData: Record<string, any>) {
  const location = useLocation();
  const params = useParams(); // ex) { providerTag: "p1", nickname: "user1" }
  const pathname = location.pathname;

  // 현재 pathname과 RouteData를 매칭시켜 route 객체를 찾음
  const data = findRouteByPath(pathname, RouteData);
  // console.log(route, params, pathname, location);

  return { data, params, pathname, location };
}

// -------------------------------------------------------------------
// 내부 도우미 함수: 재귀적으로 RouteData 탐색
// - 정적 경로 (/c/dashboard) 는 단순 비교
// - 동적 파라미터 경로 (/userview/:providerTag/:nickname) 는 정규식으로 매칭
// - children 속성이 있으면 재귀 탐색
// -------------------------------------------------------------------
function findRouteByPath(pathname: string, routes: Record<string, any>): ExRouteObject | null {
  for (const key in routes) {
    const route = routes[key];
    if (!route.path) continue;

    // 1) 정적 경로 exact match (대소문자 무시)
    if (route.path.toLowerCase() === pathname.toLowerCase()) return route;

    // 2) 동적 파라미터 (:id 등)
    const escapedPath = route.path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const paramPattern = escapedPath.replace(/:[^/]+/g, "[^/]+");
    const regex = new RegExp(`^${paramPattern}$`, "i"); // i: 대소문자 무시
    if (regex.test(pathname)) return route;

    // 3) 자식 노드 재귀 탐색
    if (route.children) {
      const child = findRouteByPath(pathname, route.children);
      if (child) return child;
    }
  }
  return null;
}

/**
 * RouteToolkit 컴포넌트:
 * - useRoutes()를 통해 라우트 요소 생성
 * - cleanRoutes()를 통해 라우터용 포맷으로 변환
 */
const RouteToolkit = ({ data }: { data: RouteDataAtts }) => {
  const element = useRoutes(cleanRoutes(data));
  return element;
};
export default RouteToolkit;
