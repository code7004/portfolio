import React, { KeyboardEvent, useState } from "react";
import { TxSpinner } from "./TxSpinner";
import { cm } from ".";

export interface ITxButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  label?: string;
  variant?: "primary" | "secondary" | "danger" | "ghost" | "text";
  disabled?: boolean;
  onEnter?: (e: KeyboardEvent<HTMLButtonElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void;
  loading?: React.ReactElement;
}

export const TxButton: React.FC<ITxButtonProps> = ({ style, label, variant = "primary", className, children, onEnter, loading = <TxSpinner />, disabled, onClick, ...props }) => {
  const [isLoading, _isLoading] = useState(false);

  const hdKeyDown = (evt: KeyboardEvent<HTMLButtonElement>) => {
    if (evt.key === "Enter" && onEnter) {
      onEnter(evt);
    }
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

  const baseClass = variant === "text" ? "tx-button--text" : cm("tx-button--.base", "tx-button--" + variant);

  return (
    <button data-tag="TxButton" className={cm("tx-button", baseClass, isLoading && "is-loading", disabled && "is-disabled", className)} style={style} onKeyDown={hdKeyDown} onClick={hdClick} disabled={disabled || isLoading} title={props.title} aria-label={props.title || label} {...props}>
      {isLoading && <div className="tx-button__loading">{loading}</div>}

      <span className="tx-button__label">{label || children}</span>
    </button>
  );
};
