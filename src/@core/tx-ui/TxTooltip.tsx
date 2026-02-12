import { ReactNode, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { TxTooltipTheme } from "./TxTheme";

interface ITxTooltipProps {
  tip: ReactNode;
  children: ReactNode;
  delay?: number; // 표시 지연 (ms)
  width?: number | string;
  height?: number | string;
}

export const TxTooltip = ({ tip, children, delay = 300, width, height }: ITxTooltipProps) => {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const [visible, _visible] = useState(false);
  const [pos, _pos] = useState({ x: 0, y: 0 });
  const timerRef = useRef<number>(0);

  function hdEnter() {
    timerRef.current = window.setTimeout(() => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect();
        const tooltipWidth = typeof width === "number" ? width : 200;
        const padding = 8;

        let x = rect.left;
        let y = rect.bottom + padding;

        // ✅ 좌우 보정: 우측 넘침 시 위치 조정
        const maxRight = window.innerWidth - padding;
        if (x + tooltipWidth > maxRight) {
          x = maxRight - tooltipWidth;
        }

        // ✅ 좌측 보정
        if (x < padding) {
          x = padding;
        }

        _pos({ x, y });
        _visible(true);
      }
    }, delay);
  }

  function hdLeave() {
    clearTimeout(timerRef.current);
    _visible(false);
  }

  return (
    <>
      <span data-tag="TxTooltip" ref={wrapperRef} onMouseEnter={hdEnter} onMouseLeave={hdLeave} className="inline-block">
        {children}
      </span>

      {visible &&
        ReactDOM.createPortal(
          <div
            className={TxTooltipTheme.base}
            style={{
              top: pos.y,
              left: pos.x,
              width,
              height,
              maxWidth: "calc(100vw - 16px)", // 우측 넘침 방지
              overflowWrap: "break-word", // 내용 강제 줄바꿈
              wordBreak: "break-word", // 영어 단어 강제 줄바꿈
              transform: "none"
            }}
            onMouseLeave={hdLeave}
            onMouseEnter={() => _visible(true)}
          >
            {tip}
          </div>,
          document.body
        )}
    </>
  );
};
