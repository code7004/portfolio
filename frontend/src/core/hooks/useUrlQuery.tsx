// core/hooks/useUrlQuery.tsx
import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Crypto from "../utils/crypto";
import { useUpdateState } from "./useUpdateState";

const HRPARSER = "?";
const ENCODEKEY = "encioesode";

/**
 * ✅ useUrlQuery - URL 쿼리를 기반으로 상태를 구성하는 커스텀 훅
 *
 * 이 훅은 URLSearchParams에서 지정된 필드만 파싱하여 초기 상태로 사용하고,
 * 이후에는 `useUpdateState` 기반으로 상태를 병합 업데이트할 수 있도록 구성됩니다.
 *
 * ✅ 주요 특징:
 * - `keyFields` 배열로 URL에서 사용할 필드만 명시적으로 추출 (선택)
 * - `initData`로 초기값을 설정 (URL에 값이 없을 경우 사용됨)
 * - `postProcess`를 통해 파싱전 params의 데이터를 가공 가능 (예: `periodNum` → `startDate`, `endDate`)
 * - 반환: `[state, updateState]`
 * - `keyFields`와 `postProcess`가 모두 없을 경우, URL 파싱 없이 초기값만 사용
 *
 * ✅ URL 값으로 덮어쓰는 조건:
 * - `key ∈ initData` 또는 `key ∈ keyFields`인 경우에만 URL에서 값을 가져와 덮어씀
 *
 * ⛳ 사용 예시:
 * ```tsx
 * const [query, setQuery] = useUrlQuery<IUrlQuery>(
 *   { startPage: 1, ...numberToStartEndDate(-7,0) },
 *   ["providerTag", "userGrade", "startDate", "endDate"],
 *   q => q.periodNum ? { ...q, ...numberToStartEndDate(q.periodNum, 0) } : q
 * );
 * ```
 *
 * @template T - 상태 객체의 타입
 * @param initData - 초기값으로 사용할 필드 객체 (Partial<T>)
 * @param keyFields - URL에서 파싱할 필드 목록 (선택)
 * @param postProcess - 파싱전 params의 후처리 함수 (선택)
 * @returns `[state, updateState]` - 상태와 상태 업데이트 함수
 */
export function useUrlQuery<T>(initData: Partial<T>, keyFields?: (keyof T)[], postProcess?: (q: T) => Partial<T>): [T, (patch: Partial<T> | ((prev: T) => Partial<T>)) => void] {
  const [searchParams] = useSearchParams();
  const raw = getQueryBySearchParams(searchParams); // 🔍 파싱된 URL 쿼리
  const merged: Partial<T> = {};

  const allKeys = new Set<keyof T>([...(Object.keys(initData) as (keyof T)[]), ...(keyFields ?? [])]);

  for (const key of allKeys) {
    if (key in raw) merged[key] = raw[key];
    else if (key in initData) merged[key] = initData[key];
  }

  // ✅ 최초 1회 postProcess 적용
  const initialRef = useRef<T | null>(null);

  if (initialRef.current === null) {
    const base = merged as T;
    initialRef.current = postProcess ? { ...base, ...postProcess(raw as T) } : base;
  }

  return useUpdateState<T>(initialRef.current);
}

/**
 * 현재 window.location.href에서 쿼리 문자열을 수동 파싱
 *
 * @returns 파싱된 쿼리 객체 (암호화 포함 시 복호화된 객체 반환)
 */
export function searchQuery() {
  const str = window.location.href.split(HRPARSER)[1];
  if (!str) return {};

  const query: Record<string, string> = {};

  str.split("&").forEach(t => {
    const [key, ...rest] = t.split("=");
    const value = rest.join("=");

    // 반드시 디코딩 적용
    const decodedKey = decodeURIComponent(key);
    const decodedValue = decodeURIComponent(value || "");

    query[decodedKey] = decodedValue || undefined;
  });

  try {
    if (query[ENCODEKEY]) {
      return Crypto.decoding(query[ENCODEKEY] as string);
    } else {
      return query;
    }
  } catch (error) {
    console.error("[searchQuery] decoding error:", error);
    return query;
  }
}

/**
 * 문자열 값을 boolean, number, string 중 하나로 파싱
 *
 * @param val 문자열 값
 * @returns 변환된 타입 값
 */
function parseValue(val: string): string | number | boolean {
  if (val === "true") return true;
  if (val === "false") return false;
  if (val === "") return ""; // ✅ 추가
  if (!isNaN(Number(val))) return Number(val);
  return val;
}

/**
 * URLSearchParams 객체를 파싱하여 JS 객체로 변환
 *
 * 암호화된 경우 자동 복호화 처리
 *
 * @param params URLSearchParams 객체
 * @returns 파싱된 쿼리 객체
 */
function getQueryBySearchParams(params: URLSearchParams) {
  const temp: Record<string, string | number | boolean | string[] | object | undefined> = {};

  for (const key of params.keys()) {
    const allValues = params.getAll(key);
    if (allValues.length === 0) continue;

    // [] 붙은 키는 항상 배열로 처리
    const isArrayKey = key.endsWith("[]");
    const cleanKey = isArrayKey ? key.slice(0, -2) : key;

    if (allValues.length > 1) {
      temp[cleanKey] = allValues.map(v => parseValue(v));
    } else {
      const singleValue = allValues[0];
      if (!singleValue) continue;

      if (singleValue.includes(",")) {
        temp[cleanKey] = singleValue.split(",").map(v => parseValue(v.trim()));
      } else {
        temp[cleanKey] = isArrayKey ? [parseValue(singleValue)] : parseValue(singleValue);
      }
    }
  }

  if (temp[ENCODEKEY]) return Crypto.decoding(temp[ENCODEKEY] as string);

  return temp;
}

let lastQuery = "";
let lastQueryTime = 0;

/**
 * 전체 URL 쿼리를 덮어씌움 (링크 이동 없이 히스토리만 교체)
 *
 * 단일 사용시 사용, 한페이지 여러곳(컴포넌트)에서 사용할경우 updateUrlQuery를 사용할것
 *
 * @template T 저장할 객체 타입
 * @param json 저장할 쿼리 객체
 * @param encode true일 경우 암호 직렬화 사용 (기본값 true)
 */
export function pushUrlQuery<T>(json: T, encode: boolean = true) {
  const newQuery = getUrlQuery<T>(json, encode);
  const now = Date.now();

  const isSameQuery = newQuery === lastQuery;
  const isRapidCall = now - lastQueryTime < 300; // ⏱ 300ms 이내 재호출

  if (isSameQuery && isRapidCall) console.warn("[pushUrlQuery] 빠른 중복 호출 감지됨:", newQuery, new Error().stack);

  lastQuery = newQuery;
  lastQueryTime = now;
  window.history.replaceState("", "", newQuery);
}

/**
 * 현재 URL 쿼리에 주어진 값을 병합하여 반영
 *
 * 여러곳에서 url을 기재 할경우 사용한다.
 *
 * - 기존 키 유지
 * - undefined/null인 값은 제거
 *
 * @template T 병합할 객체 타입
 * @param json 병합할 쿼리 객체
 * @param encode true일 경우 값들을 JSON.stringify 후 encodeURIComponent 처리
 */
export function updateUrlQuery<T extends Record<string, any>>(json: T, encode: boolean = true) {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  Object.entries(json).forEach(([key, val]) => {
    if (val === undefined || val === null) {
      params.delete(key);
      params.delete(key + "[]");
    } else if (Array.isArray(val)) {
      const arrayKey = key + "[]";
      params.delete(key);
      params.delete(arrayKey);
      val.forEach(v => params.append(arrayKey, String(v)));
    } else {
      const strValue = encode ? encodeURIComponent(JSON.stringify(val)) : String(val);
      params.set(key, strValue);
    }
  });

  const newUrl = `${url.pathname}?${params.toString()}`;
  window.history.replaceState(null, "", newUrl);
}

/**
 * 객체를 URL 쿼리 문자열로 변환
 *
 * @template T 변환 대상 객체 타입
 * @param json 변환할 객체
 * @param encode true일 경우 Crypto.encoding 사용 (기본 true)
 * @returns URL 쿼리 문자열 (?key=value or ?encioesode=...)
 */
export function getUrlQuery<T>(json: T, encode: boolean = true): string {
  if (!json) {
    return window.location.href.split(HRPARSER)[0];
  }

  const keys = Object.keys(json);
  if (keys.length < 1) {
    return window.location.href.split(HRPARSER)[0];
  }

  const path = window.location.href.split(HRPARSER)[0] + `${HRPARSER}`;
  let params = "";
  for (const key in json) {
    const value = json[key];
    if (value === undefined || value === "undefined") continue;

    if (Array.isArray(value)) {
      value.forEach(v => (params += `${key}[]=${v}&`));
    } else {
      params += `${key}=${value}&`;
    }
  }

  if (encode) return path + ENCODEKEY + "=" + Crypto.encoding(json);
  else return encodeURI(path + params.replace(/&$/m, ""));
}

export default useUrlQuery;
