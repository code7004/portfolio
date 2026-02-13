// @types/global.d.ts
declare global {
  var __BUILD_MODE__: string;
  var __APP_VERSION__: string;
  var __NO_STRICT_MODE__: string;

  interface Window {
    __BUILD_MODE__: string;
    __APP_VERSION__: string;
    __NO_STRICT_MODE__: string;
  }
}

export {};
