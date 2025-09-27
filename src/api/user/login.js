import axios from "axios";
import { apuUrl } from "../../util/axios";

export const userLogin = async (data) => {
  try {
    const res = await axios.post(`${apuUrl}/user/login`, data, { withCredentials: true });
    if (res.status === 200) {
      alert("로그인 성공");
      return res.data.success;
    }
    return false;
  } catch (err) {
    alert(err.response?.data?.error || "로그인에 문제가 발생했습니다.");
    return false;
  }
};

export const userSendCertificationCode = async (phone) => {
  try {
    const res = await axios.post(`${apuUrl}/user/certification`, { phone }, { withCredentials: true });
    if (res.status === 200) {
      alert("인증번호가 전송되었습니다.");
      return true;
    }
    return false;
  } catch (err) {
    alert(err.response?.data?.error || "인증번호 전송에 실패했습니다.");
    return false;
  }
};

export const userLogout = async () => {
  try {
    const res = await axios.post(`${apuUrl}/user/logout`, {}, { withCredentials: true });
    if (res.status === 200) {
      alert("로그아웃 되었습니다.");
      return true;
    }
    return false;
  } catch (err) {
    alert(err.response?.data?.error || "로그아웃에 문제가 발생했습니다.");
    return false;
  }
};

// 로그인 코드 생성
export const userLoginCodeCreate = async () => {
  try {
    const res = await axios.post(`${apuUrl}/user/qr/create`, {}, { withCredentials: true });
    if (res.status === 200) {
      return res.data.code; // 서버에서 { code: "A41N15" }로 반환하므로 code 사용
    }
    return null;
  } catch (err) {
    return err;
  }
};

export const userLoginCodeCheck = async () => {
  try {
    const res = await axios.get(`${apuUrl}/user/qr/check`, { withCredentials: true });
    return res;
  } catch (err) {
    alert(err.response?.data?.error || "로그인 코드 확인 오류");
    return err;
  }
};
