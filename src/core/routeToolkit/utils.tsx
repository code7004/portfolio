import { RouteObject, useRoutes } from "react-router-dom";
import { AppRouteObject, RouteDataMap, RouteMeta } from "./types";

/**
 * routeMetaToRoutes
 * ------------------------------------------------------------------
 * AppRouteObject (meta 포함 구조)를
 * React Router가 요구하는 RouteObject[] 형태로 변환
 *
 * - meta는 제거됨
 * - index / non-index를 명확히 분기
 * - children은 재귀적으로 변환
 */
export function routeMetaToRoutes(routes: RouteDataMap): RouteObject[] {
  return Object.values(routes).map(transformRoute);
}

function transformRoute(route: AppRouteObject): RouteObject {
  const { path, element, loader, errorElement, action, children, index } = route;

  if (index) {
    return { index: true, element };
  }

  return { path, element, loader, errorElement, action, children: children ? Object.values(children).map(transformRoute) : undefined };
}

/**
 * availableRouteObjects:
 * - disable이 아닌 라우트만 반환
 * - 메뉴 표시, 퍼미션 검사용
 */
export function filterAbleRouteMeta(map: RouteDataMap, permission?: number): AppRouteObject[] {
  // console.log(permision);
  // return Object.values(routes).filter(r => !r.disable);
  return Object.values(map).filter(r => !r.meta.disable && (!r.meta.permissions || r.meta.permissions.includes(permission))) as AppRouteObject[];
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
  const meta = findRouteByPath(pathname, RouteData) || {};

  return { meta, params, pathname, location };
}

// -------------------------------------------------------------------
// 내부 도우미 함수: 재귀적으로 RouteData 탐색
// - 정적 경로 (/c/dashboard) 는 단순 비교
// - 동적 파라미터 경로 (/userview/:providerTag/:nickname) 는 정규식으로 매칭
// - children 속성이 있으면 재귀 탐색
// -------------------------------------------------------------------
function findRouteByPath(pathname: string, routes: RouteDataMap): RouteMeta | null {
  for (const key in routes) {
    const route = routes[key];
    if (!route.path) continue;

    // 1) 정적 경로 exact match (대소문자 무시)
    if (route.path.toLowerCase() === pathname.toLowerCase()) return route.meta;

    // 2) 동적 파라미터 (:id 등)
    const escapedPath = route.path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const paramPattern = escapedPath.replace(/:[^/]+/g, "[^/]+");
    const regex = new RegExp(`^${paramPattern}$`, "i"); // i: 대소문자 무시
    if (regex.test(pathname)) return route.meta;

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
const RouteToolkit = ({ data }: { data: RouteDataMap }) => {
  const element = useRoutes(routeMetaToRoutes(data));
  return element;
};
export default RouteToolkit;
