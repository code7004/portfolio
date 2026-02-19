import axios, { InternalAxiosRequestConfig } from "axios";

export function logger(...args: (string | number | object)[]) {
  console.error(args);
  // alert(args);
}

function padString(str: string, fill: string, length: number): string {
  return str.padEnd(length, fill).slice(-length);
}

function limitString(text: string, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  return text.slice(0, maxLength) + "...";
}

const COLOR = {
  blue: "\x1b[34m", // request
  green: "\x1b[32m", // response
  red: "\x1b[31m", // error
  reset: "\x1b[0m"
};

export async function setupAxiosLogger(isDebug = false) {
  axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig & { metadata?: { startTime: number } }) => {
      if (isDebug && config.url && /undefined|null/gi.test(config.url)) {
        alert("axios path를 확인하세요\nundefined 또는 null이 포함되어 있습니다.\n" + config.url);
      }
      config.metadata = { startTime: Date.now() };

      if (isDebug) {
        const options = config.data ? config.data : config.params && config.params;
        console.log(`${COLOR.blue}${padString(config.method?.toLocaleUpperCase(), " ", 8)} ${limitString(config.url, 50)}${COLOR.reset}`, { options, config });
      }

      return config;
    },
    error => {
      logger(`${COLOR.red}${(error as { message: string }).message}${COLOR.reset}`);
      throw error;
    }
  );

  axios.interceptors.response.use(
    response => {
      if (isDebug) {
        const startTime = (response.config as any).metadata?.startTime || Date.now();
        const duration = Date.now() - startTime;
        console.log(`${COLOR.green}${padString(duration / 1000 + "ms", " ", 8)} ${limitString(response.config.url, 50)}${COLOR.reset}`, response.status, { data: response.data, config: response.config });
      }
      return response;
    },
    err => {
      const status = err.response?.status || err.code || "Unknown";
      const message = typeof err.response?.data === "object" ? JSON.stringify(err.response?.data) : err.response?.data || err.message || "Unknown Error";

      if (isDebug) {
        logger(`${COLOR.red}${status}\n${message}${COLOR.reset}`);
      }
      throw err;
    }
  );
}
