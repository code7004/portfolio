export { ITxDropdownProps, TxDropdown } from "./TxDropdown";
export { ITxDropdownMultiProps, TxDropdownMulti } from "./TxDropdownMulti";

// 드롭다운 아이템 타입
export interface ITxDropdownItem {
  name: string;
  value?: string | number | boolean | ITxDropdownItem | null;
  checked?: boolean;
}

// 데이터 타입 (문자, 숫자, 객체 가능)
export type ITxDropdownData = ReadonlyArray<string | number | ITxDropdownItem>;

// value 타입 별도 분리
export type TxDropdownValue = string | number | boolean | ITxDropdownItem | null | undefined;
