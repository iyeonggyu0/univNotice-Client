import axios from "axios";
import { apiUrl } from "../../util/axios";

export const iphoneRefreshToken = async () => {
  try {
    const res = await axios.post(`${apiUrl}/iphone/login/check`, {}, { withCredentials: true });
    if (res.status === 200 && res.data.success) {
      return true;
    }
    return false;
  } catch (err) {
    alert(err.response?.data?.error || "리프레시 토큰 검증 오류");
    return false;
  }
};

export const iphoneDevicePost = async (fcm_token) => {
  try {
    const res = await axios.post(`${apiUrl}/iphone/device`, { fcm_token }, { withCredentials: true });
    if (res.status === 200 && res.data.success) {
      return true;
    }
    return false;
  } catch (err) {
    alert(err.response?.data?.error || "기기등록 실패");
    return false;
  }
};
