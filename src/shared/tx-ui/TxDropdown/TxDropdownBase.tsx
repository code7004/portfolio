import React, { ReactNode, SVGProps, useEffect, useRef, useState } from "react";
import { ITxDropdownItem } from ".";
import { cm } from "..";

// Item Props
interface ITxDropdownItemProps extends ITxDropdownItem, React.HTMLAttributes<HTMLDivElement> {
  checked: boolean;
  focused: boolean;
  multiple: boolean;
}

// 공통 Props
interface ITxDropdownBaseProps {
  caption?: string;
  warning?: string;
  error?: string;
  data: ITxDropdownItem[];
  className?: string;
  iconClassName?: string;
  head?: string;
  multiple: boolean;
  maxHeight?: number | string;

  locale?: (item: string) => string;
  renderItem?: (props: ITxDropdownItemProps) => ReactNode;

  /** 내부 공통 change handler */
  onChangeInternal?: (items: ITxDropdownItem[]) => void;
}

export const TxDropdownBase = ({ maxHeight = 500, head, data = [], locale = k => k, renderItem, onChangeInternal, ...props }: ITxDropdownBaseProps) => {
  // 내부 상태
  const [visible, _visible] = useState(false);
  const [items, _items] = useState<ITxDropdownItem[]>([]);
  const [focusedIndex, _focusedIndex] = useState<number>(-1);

  const refAllCheckbox = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅衍生 상태: 전체 체크/부분 체크 여부
  const allChecked = items.length > 0 && items.every(e => e.checked);
  const someChecked = items.some(e => e.checked);

  // 전체선택 체크박스 상태 동기화
  useEffect(() => {
    if (refAllCheckbox.current) {
      refAllCheckbox.current.checked = allChecked;
      refAllCheckbox.current.indeterminate = !allChecked && someChecked;
    }
  }, [allChecked, someChecked, visible]);

  // options.data 변할 때 아이템 갱신
  const stableDataRef = useRef<ITxDropdownItem[] | null>(null);

  useEffect(() => {
    // 최초 1회는 무조건 반영
    if (stableDataRef.current === null) {
      stableDataRef.current = data;
      _items(data);
      return;
    }

    const prev = stableDataRef.current;

    const isSame = prev.length === data.length && prev.every((p, i) => p.value === data[i]?.value && p.checked === data[i]?.checked);

    if (isSame) return;

    stableDataRef.current = data;
    _items(data);
  }, [data]);

  // 외부 영역 클릭 시 닫기
  useEffect(() => {
    function hdClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        _visible(false);
      }
    }
    if (visible) {
      document.addEventListener("click", hdClickOutside);
    }
    return () => {
      document.removeEventListener("click", hdClickOutside);
    };
  }, [visible]);

  // 드롭다운 열기/닫기
  function hdChangeOpen(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    // 🚫 debounce 중이면 무시
    if (sortDebounceRef.current !== null) return;

    // debounce 시작 (150ms)
    sortDebounceRef.current = window.setTimeout(() => {
      sortDebounceRef.current = null;
    }, 200);

    event.stopPropagation();
    _visible(v => !v);
    _focusedIndex(-1);
  }

  // 정렬 헤더 연속 클릭 방지용 debounce 타이머
  const sortDebounceRef = useRef<number | null>(null);

  function hdSelectItem(item: ITxDropdownItem, event?: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    // 🚫 debounce 중이면 무시
    if (sortDebounceRef.current !== null) return;

    // debounce 시작 (150ms)
    sortDebounceRef.current = window.setTimeout(() => {
      sortDebounceRef.current = null;
    }, 200);

    event?.stopPropagation();

    if (props.multiple == true) {
      item.checked = !item.checked;
      _items([...items]);

      hdEmitChange(items.filter(e => e.checked && e.value !== null).map(e => ({ value: e.value, name: e.name })));
    } else {
      // blocking duple click
      if (item.checked) return;
      // all items false
      items.forEach(e => (e.checked = false));
      // choice item
      item.checked = !item.checked;

      _items([...items]);

      _visible(false);

      hdEmitChange([item]);
    }
  }

  function hdKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (!visible && (e.key === "Enter" || e.key == "ArrowDown" || e.key === " ")) {
      e.preventDefault();
      _visible(true);
      _focusedIndex(props.multiple ? -1 : 0); // multiple이면 -1부터 시작 (전체선택 focus)
      return;
    }

    if (visible) {
      if (e.key === "ArrowDown" || e.key === "Tab") {
        e.preventDefault();
        _focusedIndex(i => (i >= items.length - 1 ? (props.multiple ? -1 : 0) : i + 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        _focusedIndex(i => (i <= (props.multiple ? -1 : 0) ? items.length - 1 : i - 1));
      }
      if (e.key === "Enter" || e.key === " " || e.key === "Space") {
        e.preventDefault();
        if (props.multiple && focusedIndex === -1) {
          hdSelectAll(); // 전체선택 키보드 처리
        } else if (focusedIndex >= 0) {
          hdSelectItem(items[focusedIndex]);
        }
      }
      if (e.key === "Escape") {
        _visible(false);
      }
    }
  }

  function hdSelectAll(event?: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    // 🚫 debounce 중이면 무시
    if (sortDebounceRef.current !== null) return;

    // debounce 시작 (150ms)
    sortDebounceRef.current = window.setTimeout((): void => (sortDebounceRef.current = null), 200);

    event?.stopPropagation();
    const temp = !allChecked; // 전체 체크 기준으로 반전
    const updated = items.map(i => ({ ...i, checked: temp }));
    _items(updated);

    const rt = updated.filter(e => e.checked).map(e => ({ value: e.value, name: e.name }));

    hdEmitChange(rt);
  }

  function hdEmitChange(items: ITxDropdownItem[]) {
    onChangeInternal?.(items);
  }

  return (
    <div data-tag="TxDropdown" className="tx-dropdown-wrapper" {...props} tabIndex={0} onClick={hdChangeOpen} onKeyDown={e => hdKeyDown(e)}>
      {/* 선택된 값 (헤더) */}
      <div data-tag="TxDropdown.Header" role="combobox" aria-expanded={visible} className={"tx-dropdown-header"}>
        <span className="flex flex-1 truncate">{head}</span>
        <Arrow />
      </div>

      {/* 옵션 리스트 */}
      {visible && (
        <div data-tag="TxDropdownItems" role="listbox" className="tx-dropdown-list" style={{ maxHeight }}>
          {props.multiple && (
            <>
              <div data-tag="TxDropdown.Item" aria-selected={allChecked} tabIndex={0} className={cm("tx-dropdown-item-normal", (allChecked || someChecked) && "tx-dropdown-item-checked", focusedIndex === -1 && "tx-dropdown-item-focused")} onClick={hdSelectAll}>
                <input ref={refAllCheckbox} type="checkbox" className="mr-2 cursor-pointer" readOnly />
                {locale("select all")}
              </div>
              <hr className="tx-dropdown-divider" />
            </>
          )}

          {items.map((item, idx) =>
            renderItem ? (
              renderItem({ focused: idx === focusedIndex, multiple: props.multiple, onClick: e => hdSelectItem(item, e), checked: item.checked, name: item.name, value: item.value })
            ) : (
              <Item key={String(item.value ?? item.name)} name={locale(item.name)} value={item.value} multiple={props.multiple} checked={item.checked} focused={idx === focusedIndex} onClick={e => hdSelectItem(item, e)} />
            )
          )}
        </div>
      )}
    </div>
  );
};

function Arrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="arrow" viewBox="0 0 24 24" width="1em" height="1em" {...props}>
      <path fill="currentColor" d="m0 6.4l12 12l12-12z"></path>
    </svg>
  );
}

// 내부 전용 Item
const Item = React.memo(
  ({ multiple, name, value, checked, focused, ...props }: ITxDropdownItemProps) => {
    return (
      <div data-tag="TxDropdown.Item" aria-selected={checked} tabIndex={0} className={cm("tx-dropdown-item-normal", checked && "tx-dropdown-item-checked", focused && "tx-dropdown-item-focused")} data-value={value} {...props}>
        {multiple && <input type="checkbox" className="mr-2 cursor-pointer" checked={!!checked} readOnly />}
        {name}
      </div>
    );
  },
  (prev, next) => prev.checked === next.checked && prev.focused === next.focused && prev.value === next.value
);
