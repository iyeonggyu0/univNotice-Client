import axios from "axios";
import { apiUrl } from "../../util/axios";

export const iphonePublicKeyGetApi = async () => {
  try {
    const res = await axios.get(`${apiUrl}/user/iphone/public/key`, { withCredentials: true });
    if (res.status === 200 && res.data.success && res.data.token) {
      // 성공적으로 토큰 반환
      return res.data.token;
    } else {
      // 서버에서 오류 메시지 반환
      throw new Error(res.data.error || "VAPID 공개키를 받아오지 못했습니다.");
    }
  } catch (err) {
    alert(err.response?.data?.error || err.message || "키를 받아오는 중 문제가 발생했습니다.");
    return false;
  }
};
