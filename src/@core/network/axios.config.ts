import axios, { InternalAxiosRequestConfig } from "axios";

export interface IAxiosResponse<T = any> {
  body: T; // data
  success: boolean; // 데이터를 성공적으로 반환했을 경우
  status: string; // 데이터 처리 상태값
}

export function logger(...args: (string | number | object)[]) {
  console.error(args);
  // alert(args);
}

function padString(str: string, fill: string, length: number): string {
  return str.padEnd(length, fill).slice(-length);
}

function parseUrl(fullUrl: string): string {
  const url = new URL(fullUrl);

  return fullUrl.replace(url.origin, "");
}

const COLOR = {
  blue: "\x1b[34m", // request
  green: "\x1b[32m", // response
  red: "\x1b[31m", // error
  reset: "\x1b[0m"
};

export async function initAxios(gateway: string = "127.0.0.1", isDebug = false) {
  console.log("Axios init: " + gateway);

  // gateway가 http:// 또는 https:// 로 시작하지 않으면 추가
  const apiBaseUrl = gateway.startsWith("http") ? gateway : `http://${gateway}`;

  axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig & { metadata?: { startTime: number } }) => {
      if (isDebug && config.url && /undefined|null/gi.test(config.url)) {
        alert("axios path를 확인하세요\nundefined 또는 null이 포함되어 있습니다.\n" + config.url);
      }

      if (config.url && /^\/api/.test(config.url)) {
        config.url = apiBaseUrl + config.url;
      }

      config.metadata = { startTime: Date.now() };

      if (isDebug) {
        const options = config.data ? config.data : config.params && config.params;
        console.log(`${COLOR.blue}${padString(config.method?.toLocaleUpperCase(), " ", 8)} ${parseUrl(config.url)}${COLOR.reset}`, { options, config });
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
        console.log(`${COLOR.green}${padString(duration / 1000 + "ms", " ", 8)} ${parseUrl(response.config.url)}${COLOR.reset}`, response.status, { data: response.data, config: response.config });
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

  // console.log(await axios.head("/api"));
}
