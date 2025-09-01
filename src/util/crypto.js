import CryptoJS from "crypto-js";
const crypto = CryptoJS;

/**
 * 단방향 암호화(해시) 함수
 * @param {string} text - 해시할 문자열
 * @returns {string} - SHA-256 해시값(문자열)
 */
export const hash = (text) => {
  return crypto.SHA256(text).toString();
};

/**
 * 양방향 암호화(AES) 함수
 * @param {any} data - 암호화할 데이터(객체 또는 문자열)
 * @returns {string} - 암호화된 문자열
 */
export const encrypt = (data) => {
  return crypto.AES.encrypt(JSON.stringify(data), import.meta.env.VITE_CRYPTO_KEY).toString();
};

/**
 * 양방향 복호화(AES) 함수
 * @param {string} text - 암호화된 문자열
 * @returns {any} - 복호화된 데이터(객체 또는 문자열), 실패 시 undefined
 */
export const decrypt = (text) => {
  try {
    const bytes = crypto.AES.decrypt(text, import.meta.env.VITE_CRYPTO_KEY);
    return JSON.parse(bytes.toString(crypto.enc.Utf8));
  } catch (err) {
    console.log(err);
    return;
  }
};
