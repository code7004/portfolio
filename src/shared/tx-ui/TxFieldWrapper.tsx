import React, { forwardRef } from "react";

export interface ITxFieldWrapper extends React.HTMLAttributes<HTMLDivElement> {
  caption?: string;
  warning?: string;
  error?: string;
  readOnly?: boolean;
  noWrapper?: boolean;
}

/**
 * TxFieldWrapper
 * - Input, Dropdown 같은 입력 컨트롤을 감싸는 보더 박스
 * - caption은 absolute 스타일만 지원
 * - readOnly 스타일 지원
 */
export const TxFieldWrapper = forwardRef<HTMLDivElement, ITxFieldWrapper>(({ noWrapper, children, ...props }, ref) => {
  if (noWrapper) return <>{children}</>;
  return (
    <div data-tag="TxFieldWrapper" ref={ref} className="tx-field-wrapper" {...props}>
      {children}
    </div>
  );
});

TxFieldWrapper.displayName = "TxFieldWrapper";
