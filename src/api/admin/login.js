import axios from "axios";
import { apiUrl } from "../../util/axios";

/**
 * 어드민 로그인 체크 API
 * @route GET /admin/login/check
 */
export const adminLoginCheck = async () => {
  try {
    const res = await axios.get(`${apiUrl}/admin/login/check`, { withCredentials: true });
    return res.data.isLoggedIn;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/**
 * 어드민 로그인 API
 * @route POST /admin/login
 * @param {string} id
 * @param {string} pw
 */
export const adminLogin = async (id, pw) => {
  try {
    const res = await axios.post(`${apiUrl}/admin/login`, { id, password: pw }, { withCredentials: true });
    return res.status === 200 && res.data.success === true;
  } catch (err) {
    alert(err.response.data.error);
    throw err;
  }
};

/**
 * 어드민 로그아웃 API
 * @route GET /admin/logout
 */
export const adminLogout = async () => {
  try {
    const res = await axios.get(`${apiUrl}/admin/logout`, { withCredentials: true });
    if (res.status === 200) {
      console.log(res.data); // "로그아웃 성공"
      return true;
    }
    return false;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
