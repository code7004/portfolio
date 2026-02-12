import React, { CSSProperties, ReactElement, ReactNode, useEffect, useRef, useState } from "react";

export interface ITxScrollViewProps {
  className?: string;
  children: ReactNode;
  onLayout?: (evt: HTMLDivElement) => void;
  header?: ReactElement | boolean;
  footer?: ReactElement | boolean;
  onReachedTop?: () => void;
  onReachedBottom?: () => void;
  loader?: ReactElement | undefined | boolean;
  reachedGap?: number;
  disableHScroll?: boolean;
  disableVScroll?: boolean;
  style?: CSSProperties;
}

const TxScrollView = ({ className = "flex flex-col flex-1 h-full gap-6", disableVScroll = false, children, style, header, footer, loader, onLayout, onReachedTop, onReachedBottom, reachedGap = 10 }: ITxScrollViewProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [size, _size] = useState({ width: 0, height: 0 });
  const onLayoutRef = useRef(onLayout);

  useEffect(() => {
    onLayoutRef.current = onLayout;
  }, [onLayout]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      _size({ width, height });
      onLayoutRef.current?.(el);
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []); // 최초 1회만 observe

  const hdScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop === 0) onReachedTop?.();
    if (scrollTop + clientHeight + reachedGap >= scrollHeight) onReachedBottom?.();
  };

  return (
    <div className="flex flex-1">
      <div ref={ref} className="flex flex-1" style={style}>
        <div
          style={{
            width: !disableVScroll ? size.width : undefined,
            height: !disableVScroll ? size.height : undefined,
            overflow: "auto"
          }}
          onScroll={hdScroll}
        >
          {header && <div>{header}</div>}
          <div className={className}>{children}</div>
          {loader && <div>{loader}</div>}
          {footer && <div>{footer}</div>}
        </div>
      </div>
    </div>
  );
};

export default TxScrollView;
