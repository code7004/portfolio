import React, { CSSProperties, ReactNode, forwardRef } from "react";

type TTxTouchableState = "active" | "disable";

interface ITxTouchable extends React.HTMLProps<HTMLButtonElement> {
  text?: string;
  state?: TTxTouchableState;
  className?: string;
  onClick?: (evt: React.MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
  style?: CSSProperties;
}

/**
 * 버튼이 아닌 엘리먼트에 버튼 동작 이벤트를 구현 할때 사용한다.
 * @example
 * <TxTouchable onClick={hdSignOut} text="SINGOUT" />
 */
const _TxTouchable = forwardRef(({ text, state = "active", className, onClick, onSubmit, children, style }: ITxTouchable, ref: React.LegacyRef<HTMLButtonElement>) => {
  // Handle key press event for Enter key
  const handleKeyDown = (evt: React.KeyboardEvent<HTMLButtonElement>): void => {
    if (evt.key === "Enter" && onSubmit) {
      onSubmit(evt);
    }
  };

  return (
    <button ref={ref} disabled={state === "disable"} className={className} onClick={onClick} onKeyDown={handleKeyDown} style={style}>
      {text || children}
    </button>
  );
});

_TxTouchable.displayName = "TxTouchable";

export default _TxTouchable;
