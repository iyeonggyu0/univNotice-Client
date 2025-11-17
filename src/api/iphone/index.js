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

export const iphoneDevicePost = async (subscriptionPayload) => {
  try {
    // 서버에서는 문자열만 암호화하므로 PushSubscription 객체를 JSON 문자열로 변환해 전달
    const fcm_token =
      typeof subscriptionPayload === "string"
        ? subscriptionPayload
        : JSON.stringify(typeof subscriptionPayload?.toJSON === "function" ? subscriptionPayload.toJSON() : subscriptionPayload);

    if (!fcm_token) {
      throw new Error("유효하지 않은 푸시 구독 정보입니다.");
    }
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
