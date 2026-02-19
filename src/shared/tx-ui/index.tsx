import _ from "lodash";
import { twMerge } from "tailwind-merge";
import { TxCoolTableTheme } from "./TxTheme";

export { TxButton } from "./TxButton";
export { TxCoolTable } from "./TxCoolTable";
export { TxCoolTableScroller } from "./TxCoolTableScroller";
export { TxLoading } from "./TxLoading";
export { TxPagenation } from "./TxPagenation";

export const TxComponentCaption = ({ title, className }: { title: string; className?: string }) => {
  if (title) return <div className={cm("absolute -top-2 left-1 px-1 z-[1] text-xs whitespace-nowrap text-gray-500 dark:text-gray-400 font-bold overflow-hidden", className)}>{title}</div>;
  return <></>;
};

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

// 삭제 예정 모두 twMerge를 사용 예정
export const cm = (...args: string[]) => twMerge(args);

/**
 * TxCoolTableTheme 병합 유틸
 * - merge: 합집합, 충돌 시 custom 우선, 문자열 className은 cm() 병합
 * - override: base 유지, custom 값만 덮어씀, 문자열 className은 교체
 */
export function tm(base: typeof TxCoolTableTheme, custom?: DeepPartial<typeof TxCoolTableTheme> | string, policy: "merge" | "override" = "merge") {
  if (!custom) return base;

  if (typeof custom === "string") {
    return {
      ...base,
      table: policy === "merge" ? cm(base.table, custom) : custom
    };
  }

  if (policy === "merge") {
    // lodash.mergeWith → string은 cm 병합, 그 외는 custom 우선
    return _.mergeWith({}, base, custom, (objValue, srcValue) => {
      if (typeof objValue === "string" && typeof srcValue === "string") {
        return cm(objValue, srcValue); // ✅ 문자열 병합
      }
      return undefined; // ✅ 기본 동작 (custom이 우선)
    });
  }

  if (policy === "override") {
    // lodash.mergeWith → string은 덮어쓰기 (custom 우선)
    return _.mergeWith({}, base, custom, (objValue, srcValue) => {
      if (typeof objValue === "string" && typeof srcValue === "string") {
        return srcValue; // ✅ 문자열 교체
      }
      return undefined; // ✅ 기본 동작 (custom만 덮어씀)
    });
  }

  return base;
}
