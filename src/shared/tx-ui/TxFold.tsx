import React, { useState } from "react";

interface TxFoldProps {
  header: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  onChange?: (value: boolean) => void;
}

export function TxFold({ header, children, defaultOpen = false, className, onChange }: TxFoldProps) {
  const [isOpen, _isOpen] = useState(defaultOpen);

  function hdClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    event.stopPropagation();
    _isOpen(prev => {
      onChange && onChange(!prev);
      return !prev;
    });
  }

  return (
    <div className={className}>
      <div className="tx-fold-head-container" role="button" tabIndex={0} onClick={hdClick} style={{ display: "flex", color: "#c0c0c0", alignItems: "center", cursor: "pointer" }}>
        <Arrow style={{ transform: `rotate(${isOpen ? 180 : 0}deg)`, transition: "transform 0.2s ease" }} />
        {header}
      </div>

      {isOpen && <div>{children}</div>}
    </div>
  );
}

export function Arrow2(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="arrow" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path fill="currentColor" d="m0 6.4l12 12l12-12z"></path>
    </svg>
  );
}

export function Arrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="2em" height="1em" {...props}>
      <path fill="currentColor" d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35"></path>
    </svg>
  );
}
