// route.types.ts
import { ReactNode } from "react";
import { RouteObject } from "react-router-dom";

/**
 * 라우트 메타 정보
 * - UI, 권한, 레이아웃 등 확장 영역
 */
export interface RouteMeta {
  label?: string;
  icon?: ReactNode;
  description?: string;
  hidden?: boolean; // 메뉴 숨김 여부
  disable?: boolean; // 라우트 등록을 막는다.
  permissions?: number[]; // 접근 권한
  layout?: "app" | "public"; // 레이아웃 분기
  order?: number; // 메뉴 정렬
  breadcrumb?: boolean; // breadcrumb 표시 여부
}

/**
 * AppRouteObject
 * - React Router RouteObject 확장
 * - children을 key-value 구조로 변경
 */
export interface AppRouteObject extends Omit<RouteObject, "children" | "handle"> {
  meta?: RouteMeta;
  children?: Record<string, AppRouteObject>;
}

/**
 * 최상위 RouteData 타입
 */
export type RouteDataMap = Record<string, AppRouteObject>;
