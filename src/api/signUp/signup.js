import axios from "axios";
import { apiUrl } from "../../util/axios";

export const signupPost = async (data) => {
  try {
    const res = await axios.post(`${apiUrl}/sign-up`, data, { withCredentials: true });
    if (res.status === 200) {
      alert(res.data.message || "회원가입이 완료되었습니다.");
      return true;
    } else if (res.status === 201) {
      alert(res.data || "회원가입이 완료되었습니다.");
      window.location.href = "/signin/8";
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "회원가입 오류");
    return false;
  }
};
