import axios from "axios";
import { apuUrl } from "../../util/axios";

export const loginCheck = async () => {
  try {
    const res = await axios.get(`${apuUrl}/user/login/check`, { withCredentials: true });
    return res.data.success;
  } catch (err) {
    alert(err.response?.data?.error || "로그인 상태 확인 오류");
    return false;
  }
};
