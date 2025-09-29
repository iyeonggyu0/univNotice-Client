import axios from "axios";
import { apiUrl } from "../../util/axios";

export const signupCertificationSend = async (phone) => {
  try {
    const res = await axios.post(`${apiUrl}/sign-up/certification`, { phone }, { withCredentials: true });
    if (res.status === 200) {
      alert("인증번호가 발송되었습니다.");
      return true;
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "인증번호 발송 오류");
    return false;
  }
};
