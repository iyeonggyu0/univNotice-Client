import axios from "axios";
import { apiUrl } from "../../util/axios";

export const userLogin = async (data) => {
  try {
    const res = await axios.post(`${apiUrl}/user/login`, data, { withCredentials: true });
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
    const res = await axios.post(`${apiUrl}/user/certification`, { phone }, { withCredentials: true });
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
    const res = await axios.post(`${apiUrl}/user/logout`, {}, { withCredentials: true });
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
    const res = await axios.post(`${apiUrl}/user/qr/create`, {}, { withCredentials: true });
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
    const res = await axios.get(`${apiUrl}/user/qr/check`, { withCredentials: true });
    return res;
  } catch (err) {
    alert(err.response?.data?.error || "로그인 코드 확인 오류");
    return err;
  }
};

export const userLoginAtCode = async (data) => {
  try {
    const res = await axios.post(`${apiUrl}/user/qr/login`, data, { withCredentials: true });
    if (res.data.success) {
      return res.data.data;
    }
    return false;
  } catch (err) {
    alert(err.response?.data?.error || "QR 로그인 오류");
    return false;
  }
};

/**
 * 회원탈퇴 API
 * @param {Object} data - 회원탈퇴 데이터
 * @param {string} data.student_id - 학번
 * @param {string} data.phone - 전화번호
 * @param {string} data.certification_code - 인증번호
 * @returns {Promise<boolean>} 회원탈퇴 성공 여부
 */
export const userDelete = async (data) => {
  try {
    const response = await axios.delete(`${apiUrl}/user/`, { data: data, withCredentials: true });

    if (response.data.success) {
      return true;
    } else {
      alert(response.data.message || "회원탈퇴에 실패했습니다.");
      return false;
    }
  } catch (error) {
    console.error("회원탈퇴 API 오류:", error);

    if (error.response?.data?.error) {
      alert(error.response.data.error);
    } else {
      alert("회원탈퇴 처리 중 오류가 발생했습니다.");
    }

    return false;
  }
};
