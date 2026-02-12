import React, { ChangeEvent, KeyboardEvent, useEffect, useRef } from "react";
import { cm } from ".";

export type TTxInputVale = string | number | readonly string[] | undefined;
export interface ITxInput {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeText?: (e: string) => void;
  onChangeInt?: (e: number) => void;
  onChangeFloat?: (e: number) => void;
  onChangeNumber?: (e: number) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onSubmit?: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  name?: string;
  focus?: true | false;
  autoComplete?: "off";
  value?: TTxInputVale;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
  autoFocus?: boolean;
  rows?: number;
  id?: string;
}

const TxInput = React.forwardRef(({ name, focus, autoComplete, placeholder, value = "", rows, id, className, readOnly, onChange, onChangeText, onChangeInt, onChangeFloat, onChangeNumber, onFocus, onSubmit }: ITxInput, ref: React.LegacyRef<HTMLInputElement> | undefined) => {
  const _ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (focus && _ref) {
      (_ref as React.RefObject<HTMLTextAreaElement>).current?.focus();
    }
  }, [focus]);

  const handleKeyDown = (evt: KeyboardEvent<HTMLTextAreaElement>) => {
    if (evt.key === "Enter") {
      if (onSubmit) onSubmit(evt);
    }
  };

  const handleChange = (evt: ChangeEvent<HTMLTextAreaElement>): void => {
    if (onChange) onChange(evt);
    else if (onChangeText) onChangeText(evt.target.value);
    else if (onChangeInt) onChangeInt(parseInt(evt.target.value));
    else if (onChangeFloat) onChangeFloat(parseFloat(evt.target.value));
    else if (onChangeNumber) onChangeNumber(Number(evt.target.value));
  };

  return (
    <textarea
      name={name}
      ref={(ref ? ref : _ref) as React.LegacyRef<HTMLTextAreaElement>}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      autoComplete={autoComplete}
      placeholder={placeholder}
      readOnly={readOnly}
      value={value}
      onFocus={onFocus}
      id={id}
      rows={rows}
      className={cm(`px-2 py-1 text-sm border rounded dark:bg-gray-800 dark:border-gray-600`, " placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6", className)}
    />
  );
});

TxInput.displayName = "TxInput";

export default TxInput;
