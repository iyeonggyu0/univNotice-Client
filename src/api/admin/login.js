import axios from "axios";
import { apuUrl } from "../../util/axios";

/**
 * 어드민 로그인 체크 API
 * @route GET /admin/login/check
 */
export const adminLoginCheck = async () => {
  await axios
    .get(`${apuUrl}/admin/login/check`, { withCredentials: true })
    .then((res) => {
      return res.data.isLoggedIn;
    })
    .catch((err) => {
      return console.error(err);
    });
};

/**
 * 어드민 로그인 API
 * @route POST /admin/login
 * @param {string} id
 * @param {string} pw
 */
export const adminLogin = async (id, pw) => {
  await axios
    .post(`${apuUrl}/admin/login`, { id, pw }, { withCredentials: true })
    .then((res) => {
      if (res.status === 200) return true;
    })
    .catch((err) => {
      return alert(err.response.data.error);
    });
};

/**
 * 어드민 로그아웃 API
 * @route GET /admin/logout
 */
export const adminLogout = async () => {
  await axios
    .get(`${apuUrl}/admin/logout`, { withCredentials: true })
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data); // "로그아웃 성공"
        return true;
      }
    })
    .catch((err) => {
      return console.error(err);
    });
};
