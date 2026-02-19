// 1. 강력한 글로벌 Theme
export const TxClassTheme = "bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100";

// 2. 권장 기본 유틸
export const TxClassBorderColor = "border-gray-300 dark:border-gray-600";

export const TxClassHover = "hover:bg-gray-100 dark:hover:bg-gray-700";

// 공통 규격 (FieldWrapper와 Button이 공유)
export const TxClassFieldWrapperBase = `h-10 px-3`;

export const TxClassFocus = `focus-within:ring-blue-500`;

// 공통 Caption 스타일
export const TxClassCaption = "text-xs whitespace-nowrap text-gray-500 dark:text-gray-400 font-bold overflow-hidden";
export const TxClassWarning = "text-xs whitespace-nowrap text-yellow-300 font-bold overflow-hidden";
export const TxClassError = "text-xs whitespace-nowrap text-red-500 font-bold overflow-hidden";

// ------------------- FieldWrapper -------------------
export const TxFieldWrapperTheme = {
  base: `relative flex rounded-md shadow-sm px-3 border ${TxClassBorderColor} ${TxClassTheme} ${TxClassFocus} outline-none focus-within:ring-2`,
  absoluteCaption: `absolute -top-2 left-1 px-1 z-[1] ${TxClassCaption}`,
  absoluteWarning: `absolute -bottom-5 left-0 z-[1] ${TxClassWarning}`,
  absoluteError: `absolute -bottom-5 left-0 z-[1] ${TxClassError}`,
  readOnly: `!bg-gray-200 !text-gray-400 dark:!bg-gray-700 dark:!text-gray-400`
};

// ------------------- Popup -------------------
export const TxPopupTheme = {
  overlay: "absolute inset-0 bg-black/40",
  container: `relative rounded-2xl shadow-lg overflow-hidden mx-2 sm:mx-4 ${TxClassTheme} border-2 ${TxClassBorderColor}`,
  header: `flex p-2 font-bold text-center border-b ${TxClassTheme} ${TxClassBorderColor}`,
  body: `flex flex-col items-center justify-center p-6 ${TxClassTheme}`
};

// ------------------- Tabs Theme -------------------
export const TxTabsTheme = {
  wrapper: `w-full`,
  headWrapper: `flex space-x-4 border-b border-gray-300 dark:border-gray-700`,
  headBase: `px-4 py-2 text-sm transition-all duration-200 border-b-2 -mb-[1px] cursor-pointer`,
  headInner: `border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white`,
  headActive: `border-blue-600 text-blue-600 font-semibold dark:text-blue-400`,

  body: `mt-4`
};

// ------------------- DropPanel -------------------
export const TxDropPanelTheme = {
  wrapper: "relative inline-block",
  label: "cursor-pointer select-none",
  panel: `absolute left-0 top-full min-w-[10rem] rounded-md shadow-lg z-50 ${TxClassTheme} border ${TxClassBorderColor}`,
  item: `px-4 py-2 text-sm cursor-pointer text-gray-700 dark:text-gray-200 ${TxClassHover}`,
  divider: `my-1 border-t border-gray-200 dark:border-gray-700`
};

// TxTheme.ts
export const TxJsonTreeTheme = {
  base: "font-mono text-sm",
  node: "flex items-center space-x-1",
  key: "text-blue-600 mr-1",
  value: {
    string: "text-green-600",
    number: "text-purple-600",
    boolean: "text-orange-600",
    null: "text-gray-400"
  },
  control: {
    add: "ml-2 text-blue-500 hover:text-blue-700",
    delete: "ml-1 text-red-500 hover:text-red-700",
    edit: "ml-1 text-gray-500 hover:text-gray-700"
  }
};

export const TxTooltipTheme = {
  base: `fixed z-50 px-2 py-1 text-sm rounded shadow-md z-[9999] pointer-events-auto 
         whitespace-pre-line break-words ${TxClassTheme} border ${TxClassBorderColor}`
};

// ------------------- TxContextMenu -------------------
export const TxContextMenuTheme = {
  wrapper: `fixed z-50 flex flex-col w-60 overflow-hidden rounded-md shadow-lg border ${TxClassBorderColor} ${TxClassTheme}`,
  item: `px-4 py-2 text-sm font-bold cursor-pointer ${TxClassHover}`,
  divider: `my-1 border-t ${TxClassBorderColor}`
};

// ------------------- TxCoolTable -------------------
export const TxCoolTableTheme = {
  table: `w-full text-gray-700 dark:text-gray-300 border-collapse`,
  caption: `font-bold text-sm text-gray-400 dark:text-gray-600 whitespace-pre-wrap`,
  thead: {
    tr: `bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200`,
    th: `py-2 pxr-2 align-middle border-b-2 bg-gray-200 dark:bg-gray-700`
  },
  tbody: {
    tr: `border-b text-gray-500 dark:text-gray-400`,
    td: `py-1 px-2 align-middle overflow-auto border-b 
      whitespace-nowrap overflow-hidden
      bg-[var(--txcool-bg,theme(colors.white))] dark:bg-[var(--txcool-bg,theme(colors.gray.800))] scrollbar-thin`
  },
  state: {
    hover: `hover:[--txcool-bg:theme(colors.gray.100)] dark:hover:[--txcool-bg:theme(colors.gray.700)]`,
    checked: `[--txcool-bg:theme(colors.blue.100)] `,
    editable: `whitespace-nowrap overflow-x-auto cursor-text outline-none focus:bg-white dark:focus:bg-gray-800 focus:text-black dark:focus:text-white focus:shadow-[0_0_0_2px_rgba(59,130,246,0.8)]`,
    fixable: `bg-gray-200 dark:bg-gray-600 text-black dark:text-gray-100`
  },
  nonData: `font-bold text-sm text-gray-400 dark:text-gray-600 whitespace-pre-wrap text-center`
};

// ------------------- Button -------------------
export const TxButtonTheme = {
  base: `${TxClassFieldWrapperBase} font-medium rounded-md shadow-sm cursor-pointer transition-colors justify-center 
         disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`,

  // === Semantic Variants ===
  variants: {
    primary: "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700",
    ghost: `bg-transparent ${TxClassHover}`,
    text: `bg-transparent underline cursor-pointer ${TxClassHover}`
  },

  // === Color Palette Variants ===
  colors: {
    // Blue family
    blue: "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700",
    indigo: "bg-indigo-500 text-white hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700",
    cyan: "bg-cyan-500 text-white hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-700",
    teal: "bg-teal-500 text-white hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-700",

    // Green family
    green: "bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700",
    lime: "bg-lime-500 text-black hover:bg-lime-600 dark:bg-lime-600 dark:hover:bg-lime-700",
    emerald: "bg-emerald-500 text-white hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700",

    // Warm colors
    yellow: "bg-yellow-500 text-black hover:bg-yellow-600 dark:bg-yellow-600 dark:hover:bg-yellow-700",
    amber: "bg-amber-500 text-black hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700",
    orange: "bg-orange-500 text-white hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700",
    red: "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700",
    rose: "bg-rose-500 text-white hover:bg-rose-600 dark:bg-rose-600 dark:hover:bg-rose-700",

    // Purple / Pink
    purple: "bg-purple-500 text-white hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700",
    fuchsia: "bg-fuchsia-500 text-white hover:bg-fuchsia-600 dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700",
    pink: "bg-pink-500 text-white hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-700",

    // Neutral / Gray scale
    slate: "bg-slate-500 text-white hover:bg-slate-600 dark:bg-slate-600 dark:hover:bg-slate-700",
    gray: "bg-gray-500 text-white hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700",
    zinc: "bg-zinc-500 text-white hover:bg-zinc-600 dark:bg-zinc-600 dark:hover:bg-zinc-700",
    neutral: "bg-neutral-500 text-white hover:bg-neutral-600 dark:bg-neutral-600 dark:hover:bg-neutral-700",
    stone: "bg-stone-500 text-white hover:bg-stone-600 dark:bg-stone-600 dark:hover:bg-stone-700"
  }
};

export const TxCheckBoxTheme = {
  wrapper: "inline-flex items-center gap-2 cursor-pointer select-none",
  input: ["h-4 w-4 rounded border border-gray-400", "text-blue-600 focus:ring-2 focus:ring-blue-500", "dark:border-gray-600 dark:bg-gray-800 dark:checked:bg-blue-500", "disabled:opacity-50 disabled:cursor-not-allowed"].join(" "),
  label: "text-sm text-gray-700 dark:text-gray-200"
};

// ------------------- Form -------------------
export const TxFormTheme = {
  wrapper: "flex flex-col gap-3",
  flex: "flex gap-2", // 라벨 + 필드 수평 정렬
  label: "text-sm font-semibold text-gray-600 dark:text-gray-300 whitespace-nowrap"
};

// ------------------- Input -------------------
export const TxInputTheme = {
  wrapper: "w-[10em] h-10",
  input: `w-full border-0 outline-0 bg-transparent text-base placeholder-gray-400 focus:outline-none focus:ring-0 disabled:opacity-50`,
  readOnly: "opacity-50"
};

// SearchInput Theme
export const TxSearchInputTheme = {
  wrapper: "flex items-center min-h-[2.5em]",
  icon: "w-5 h-5 text-gray-400 cursor-pointer", // 검색/삭제 아이콘
  input: `${TxInputTheme.input}`
};

// ------------------- Dropdown -------------------
export const TxDropdownTheme = {
  wrapper: "w-[10em] h-10",
  head: "flex flex-1 truncate items-center justify-between w-full cursor-pointer",
  list: `absolute z-20 left-0 top-full w-full overflow-y-auto rounded-md shadow-lg ${TxClassTheme}`,
  divider: "border-gray-300 dark:border-gray-600",
  item: {
    normal: `px-2 py-2 cursor-pointer text-sm ${TxClassTheme} ${TxClassHover}`,
    checked: "bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white",
    focused: `bg-gray-100 dark:bg-gray-700 border-r-5 border-r-blue-500`
  }
};

// ------------------- HeaderTheme -------------------
export const TxHeaderTheme = {
  base: "font-semibold text-gray-800 dark:text-gray-100 text-xl"
};

// ------------------- Card -------------------
export const TxCardTheme = {
  base: `relative flex flex-col rounded-md shadow-sm p-2 border ${TxClassBorderColor} ${TxClassTheme}`,
  caption: `absolute -top-4 left-1 px-1 z-[1] whitespace-nowrap font-bold overflow-hidden ${TxClassTheme} !bg-transparent`,
  floating: `absolute z-10 space-x-2 text-xs text-gray-500 top-2 right-2 dark:text-gray-400`,
  floatingLink: `hover:text-gray-700 dark:hover:text-white`,
  floatingButton: `cursor-pointer hover:text-gray-700 dark:hover:text-white`,
  content: ``,
  contentLoading: `relative overflow-hidden text-transparent select-none p-1 w-full flex-1`,
  loadingBG: `absolute inset-0 animate-pulse bg-gradient-to-r 
              from-gray-200 via-gray-100 to-gray-200 
              dark:from-gray-700 dark:via-gray-800 dark:to-gray-700`,
  header: `flex gap-2 mb-2`,
  footer: `flex mt-2 pt-2 border-t ${TxClassBorderColor}`
};

// ------------------- Pagenation -------------------
export const TxPagenationTheme = {
  wrapper: "w-full flex justify-center mt-2",
  group: "flex flex-wrap gap-2",
  button: {
    base: `py-2 text-center text-sm font-medium w-[3em] transition-all duration-200 border border-gray-300 dark:border-gray-600 rounded hover:bg-blue-100 disabled:opacity-40 disabled:cursor-not-allowed border-2`,
    active: "bg-blue-500 text-white border-blue-500 hover:bg-blue-700 shadow-md",
    disabled: "bg-gray-100 text-gray-400 border-gray-200 dark:bg-gray-600 dark:text-gray-800 dark:border-gray-400"
  }
};
