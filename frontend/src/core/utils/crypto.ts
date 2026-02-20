/** @format */
import CryptoJS from "crypto-js";

const CRYPTOCODE = "U2FsdGVkX1%2FadXBuRwH4NuS%2BAhjFWox9lEWzAnvh611Eg9A4gEXxHAdkmDErI%2Brr";
// ⚠️ 키는 환경 변수에서 관리 권장

const ExCrypto = {
  /**
   * AES 암호화
   * - 항상 { data: ... } 형태로 JSON 직렬화
   */
  encrypt: (data: any, key: string | CryptoJS.lib.WordArray = CRYPTOCODE) => {
    const json = JSON.stringify({ data }); // ✅ {data: ...} 형태 유지
    const encrypted = CryptoJS.AES.encrypt(json, key).toString();
    return encodeURIComponent(encrypted);
  },

  /**
   * AES 복호화
   * - { data: ... } 구조만 복원
   */
  decrypt: (text: string, key: string | CryptoJS.lib.WordArray = CRYPTOCODE) => {
    try {
      const decoded = decodeURIComponent(text);
      const bytes = CryptoJS.AES.decrypt(decoded, key);
      const str = bytes.toString(CryptoJS.enc.Utf8);
      const parsed = JSON.parse(str);
      return parsed.data; // ✅ 항상 parsed.data 로 반환
    } catch (err) {
      console.error("Decrypt failed:", err);
      return null;
    }
  },

  /**
   * Base64 인코딩
   * - AES 대신 단순 직렬화/인코딩할 때 사용
   */
  encoding: (data: any) => {
    const words = CryptoJS.enc.Utf8.parse(JSON.stringify({ data }));
    const encoded = CryptoJS.enc.Base64.stringify(words);
    return encodeURIComponent(encoded);
  },

  /**
   * Base64 디코딩
   * - { data: ... } 구조만 복원
   */
  decoding: (text: string) => {
    try {
      const parsedWords = CryptoJS.enc.Base64.parse(decodeURIComponent(text));
      const decoded = parsedWords.toString(CryptoJS.enc.Utf8);
      const parsed = JSON.parse(decoded);
      return parsed.data;
    } catch (err) {
      console.error("Base64 decode failed:", err);
      return null;
    }
  }
};

export default ExCrypto;
