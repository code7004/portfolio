import React, { ReactNode, forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { TxTabsTheme } from "./TxTheme";

/**
 * Tabs 내부 Head 렌더러에 전달되는 기본 속성
 *
 * @typedef {Object} ITxTabRenderHeadProps
 * @property {string} title - 탭 이름 (UI 표시용)
 * @property {boolean} isActive - 현재 탭 활성 여부
 * @property {() => void} onClick - 탭 클릭 이벤트 핸들러
 */
interface ITxTabRenderHeadProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
}

/**
 * TxTabs 컴포넌트 Props 정의
 *
 * @typedef {Object} ITxTab
 * @property {string} [className] - 외부 Wrapper에 추가할 클래스
 * @property {string} [defaultClassName] - (deprecated) 기본 클래스
 * @property {string} [innerClassName] - 비활성 탭 스타일 override
 * @property {string} [activeClassName] - 활성 탭 스타일 override
 * @property {string[]} tabs - 탭 이름 문자열 배열
 * @property {ReactNode[]} [tabData] - body 데이터 배열 (renderBody 미사용 시)
 * @property {number} [value] - 외부에서 제어 가능한 현재 활성 탭 index
 * @property {(text: string) => string} [locale] - 다국어 변환 함수
 * @property {(props: ITxTabRenderHeadProps) => ReactNode} [renderHead] - 커스텀 탭 헤더 렌더러
 * @property {(props:{name: string, index: number}) => ReactNode} [renderBody] - 탭 콘텐츠 렌더러
 * @property {(evt: number) => void} [onChange] - 탭 변경 시 호출되는 콜백
 */
export interface ITxTab {
  className?: string;
  defaultClassName?: string;
  innerClassName?: string;
  activeClassName?: string;
  tabs: string[];
  tabData?: ReactNode[];
  value?: number;
  locale?: (text: string) => string;
  renderHead?: (props: ITxTabRenderHeadProps) => ReactNode;
  renderBody?: (props: { name: string; index: number }) => ReactNode;
  onChange?: (evt: number) => void;
}

/**
 * TxTabs
 * ----------------------------------------------------------------------------
 * - 다중 탭 UI를 제공하는 공통 컴포넌트
 * - Theme 기반으로 스타일 제어 (Tailwind 직접 사용 금지)
 * - 탭 변경 로직을 내부에서 처리하며, 외부 제어(value + ref.changeTab) 모두 지원
 * - renderHead, renderBody를 통한 완전 커스터마이징 가능
 * ----------------------------------------------------------------------------
 *
 * @component
 * @example
 * <TxTabs
 *   tabs={["A", "B", "C"]}
 *   value={1}
 *   onChange={idx => console.log(idx)}
 * />
 *
 * @param {ITxTab} props
 * @param {React.Ref} ref - 외부에서 changeTab 호출 가능
 * @returns {JSX.Element}
 */
export const TxTabs = forwardRef(({ tabs, locale = k => k, className, innerClassName, activeClassName, value, renderHead, renderBody, onChange }: ITxTab, ref) => {
  /**
   * 내부 상태: 현재 활성 탭 index
   * - 외부 value prop 변경 시 동기화
   */
  const [activeIdx, _activeIdx] = useState(value || 0);

  // 외부에서 value 변경 시 반영
  useEffect(() => {
    if (value != null) _activeIdx(value);
  }, [value]);

  /**
   * 외부 제어용 changeTab 메서드 노출
   * @function
   * @name changeTab
   * @param {number} idx - 변경할 탭 index
   */
  const changeTab = (idx: number) => _activeIdx(idx);
  useImperativeHandle(ref, () => ({ changeTab }), []);

  /**
   * 기본 탭 헤더 렌더러
   * - Theme 기반 default
   * - renderHead 없을 경우 자동 적용
   *
   * @function
   * @name defaultRenderHead
   * @param {ITxTabRenderHeadProps} props - 렌더링 정보
   * @returns {ReactNode}
   */
  const defaultRenderHead = ({ title, isActive, onClick }: ITxTabRenderHeadProps) => {
    const activeCls = activeClassName || TxTabsTheme.headActive;
    const innerCls = innerClassName || TxTabsTheme.headInner;

    return (
      <button role="tab" onClick={onClick} className={`${TxTabsTheme.headBase} ${isActive ? activeCls : innerCls}`}>
        {locale(title)}
      </button>
    );
  };

  /**
   * 탭 변경 핸들러
   * - 내부 state 변경
   * - onChange 콜백 트리거
   *
   * @function
   * @name hdChange
   * @param {number} next - 선택된 탭 index
   */
  function hdChange(next: number) {
    if (activeIdx == next) return;
    _activeIdx(next);
    onChange?.(next);
  }

  /**
   * 컴포넌트 최종 렌더링 구조
   * - header: 탭 버튼 목록
   * - body: 현재 활성 탭 콘텐츠
   */
  return (
    <div className={TxTabsTheme.wrapper} data-tag="TxTabs">
      {/* 탭 헤더 */}
      <div className={`${TxTabsTheme.headWrapper} ${className || ""}`} role="tablist">
        {tabs.map((t, idx) => {
          const Head = renderHead || defaultRenderHead;
          return <React.Fragment key={idx}>{Head({ title: t, isActive: activeIdx === idx, onClick: () => hdChange(idx) })}</React.Fragment>;
        })}
      </div>

      {/* 콘텐츠 영역 */}
      {renderBody && <div className={TxTabsTheme.body}>{renderBody({ name: tabs[activeIdx], index: activeIdx })}</div>}
    </div>
  );
});

TxTabs.displayName = "TxTabs";
