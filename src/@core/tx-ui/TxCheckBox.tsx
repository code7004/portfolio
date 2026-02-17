import React, { SVGProps, useEffect, useState } from "react";
import { cm } from ".";

export interface ITxCheckBoxProps {
  label?: string;
  value?: boolean;
  onChangeBool?: (checked: boolean) => void;
  className?: string;
  variant?: "checkbox" | "toggle";
  children?: React.ReactNode;
  borderColor?: string;
  fillColor?: string;
  cursorColor?: string;
}

export const TxCheckBox: React.FC<ITxCheckBoxProps> = ({ label, children, value = false, onChangeBool, className, variant = "checkbox", borderColor = "#e0e0e0", fillColor = "#ffffff", cursorColor = "#000000" }) => {
  const [checked, _checked] = useState(value);

  useEffect(() => {
    _checked(value);
  }, [value]);

  function hdClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    event.stopPropagation();
    _checked(!checked);
    onChangeBool?.(!checked);
  }

  return (
    <div data-tag="TxCheckBox" className={cm("tx-checkbox", `tx-checkbox--${variant}`, className)} onClick={hdClick}>
      {variant === "checkbox" && (
        <span className={cm("tx-checkbox-box", checked && "is-checked")} style={{ backgroundColor: fillColor, borderColor }}>
          {checked && <BaselineCheck className="tx-checkbox-check" style={{ color: cursorColor }} />}
        </span>
      )}

      {variant === "toggle" && (
        <span className={cm("tx-toggle", checked && "is-checked")}>
          <span className="tx-toggle-thumb" />
        </span>
      )}

      {label && <span className="tx-checkbox-label">{label}</span>}
      {children}
    </div>
  );
};

TxCheckBox.displayName = "TxCheckBox";

function BaselineCheck(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z"></path>
    </svg>
  );
}
