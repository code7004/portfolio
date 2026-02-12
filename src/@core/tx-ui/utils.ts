/**
 * 지정된 CSS 선택자에 대응하는 스타일 규칙을 동적으로 생성하거나 업데이트합니다.
 * 이미 동일한 selector 규칙이 존재할 경우 삭제 후 재삽입됩니다.
 * @param styleId style 태그의 고유 ID
 * @param selector CSS 선택자 (예: ".my-class", "#app")
 * @param rules 스타일 객체 (React.CSSProperties 형식, camelCase 사용)
 * @example
 * createCSS("dynamic-style", ".my-class", { backgroundColor: "red", fontSize: "14px" });
 */
export function createCSS(styleId: string, selector: string, rules: React.CSSProperties): void {
  let style = document.getElementById(styleId) as HTMLStyleElement | null;

  if (!style) {
    style = document.createElement("style");
    style.type = "text/css";
    style.id = styleId;
    document.head.appendChild(style);
  }

  const sheet = style.sheet as CSSStyleSheet | null;

  if (sheet) {
    const cssRules = Object.entries(rules)
      .map(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
        return `${cssKey}: ${value};`;
      })
      .join(" ");

    // 기존 동일 selector 규칙 제거
    for (let i = 0; i < sheet.cssRules.length; i++) {
      const rule = sheet.cssRules[i];
      if (rule.cssText.startsWith(selector)) {
        sheet.deleteRule(i);
        break;
      }
    }

    try {
      sheet.insertRule(`${selector} { ${cssRules} }`, sheet.cssRules.length);
    } catch {
      console.warn("Unable to insert CSS rule.");
    }
  }
}

/**
 * 짧고 유니크한 ID 문자열을 생성합니다.
 * 현재 시간을 base-36 문자열로 변환 후 역순으로 만들고,
 * 지정된 범위 내의 랜덤 문자열을 결합합니다.
 * @param pow 랜덤 문자열의 범위 제어용 지수 (기본값: 1)
 * @returns 짧은 고유 문자열 ID
 * @example
 * shortUID() // "k4w9n7z5"
 */
let shortUIDCounter = 0;
export function shortUID(): string {
  const time = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 6);
  shortUIDCounter = (shortUIDCounter + 1) % 10000; // 0~9999
  return time + rand + shortUIDCounter.toString(36);
}
