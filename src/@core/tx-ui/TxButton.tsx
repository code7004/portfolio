import React, { KeyboardEvent, useState } from "react";
import { twMerge } from "tailwind-merge";
import TxSpinner from "./TxSpinner";
import { TxButtonTheme } from "./TxTheme";

export interface ITxButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  label?: string; // 버튼 내부 텍스트
  variant?: keyof typeof TxButtonTheme.variants; // primary | secondary | danger | ghost
  color?: keyof typeof TxButtonTheme.colors; // primary | secondary | danger | ghost
  disabled?: boolean; // 외부 비활성화
  onEnter?: (e: KeyboardEvent<HTMLButtonElement>) => void; // Enter 전용 핸들러
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void; // ✅ Promise 허용
  loading?: React.ReactElement; // 로딩 표시용 엘리먼트
}

/**
 * TxButton 컴포넌트
 *
 * - Tailwind 기반 커스텀 버튼
 * - variant 스타일 (primary | secondary | danger | ghost) 지원
 * - Enter 키 핸들러(onEnter) 지원
 * - onClick 비동기(Promise) 지원 → 실행 중 로딩 상태 관리
 * - 로딩 중 버튼은 disabled + cursor-wait 처리되어 중복 클릭 방지
 * - 로딩 상태일 때 `loadingMode`에 따라 스피너만 표시하거나(label+스피너 동시 표시)
 *
 * @example
 * ```tsx
 * // 기본 테마
 * <TxButton label="확인" variant="primary" />
 * <TxButton label="취소" variant="secondary" />
 * <TxButton label="삭제" variant="danger" />
 * <TxButton label="더보기" variant="ghost" />
 * // Click & Style
 * <TxButton label="green" title="TxButton" className="!bg-green-500" onClick={() => alert("hello")} />
 * // async click
 * <TxButton label="sync button" onClick={async () => (await waitForSeconds(3000), alert("hello"))} />
 * ```
 */
export const TxButton: React.FC<ITxButtonProps> = ({ style, label, variant = "primary", color, className, children, onEnter, loading = <TxSpinner />, disabled, onClick, ...props }) => {
  const [isLoading, _isLoading] = useState(false);

  const hdKeyDown = (evt: KeyboardEvent<HTMLButtonElement>): void => {
    if (evt.key === "Enter" && onEnter) onEnter(evt);
  };

  const hdClick = async (evt: React.MouseEvent<HTMLButtonElement>) => {
    if (!onClick) return;
    try {
      _isLoading(true);
      await Promise.resolve(onClick(evt));
    } finally {
      _isLoading(false);
    }
  };

  const baseClass = variant === "text" ? TxButtonTheme.variants.text : twMerge(TxButtonTheme.base, color ? TxButtonTheme.colors[color] : TxButtonTheme.variants[variant]);

  return (
    <button
      data-tag="TxButton"
      className={twMerge(baseClass, "relative active:opacity-50", (disabled || isLoading) && "cursor-wait", disabled && "opacity-50", className)}
      onKeyDown={hdKeyDown}
      style={style}
      title={props.title}
      aria-label={props.title || label || undefined}
      disabled={disabled || isLoading}
      onClick={hdClick}
      {...props}
    >
      {isLoading && <div className="absolute inset-0 flex items-center justify-center">{loading}</div>}
      <span className={isLoading ? "opacity-30" : "opacity-100"}>{label || children}</span>
    </button>
  );
};
