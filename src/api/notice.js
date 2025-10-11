import axios from "axios";
import { apiUrl } from "../util/axios";

export const NoticeLoad = async () => {
  try {
    const res = await axios.get(`${apiUrl}/notice/`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.data;
    }
    return false;
  } catch (err) {
    alert(err.response?.data?.error || "공지 불러오기 오류");
    return false;
  }
};

// export const myPageInfoLoad = async () => {
//   try {
//     const res = await axios.get(`${apiUrl}/user/mypage/info`, { withCredentials: true });
//     if (res.status === 200) {
//       return res.data.data;
//     }
//     return false;
//   } catch (err) {
//     alert(err.response?.data?.error || "마이페이지 정보 불러오기 오류");
//     return false;
//   }
// };
