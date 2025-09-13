import axios from "axios";
import { apuUrl } from "../../util/axios";

export const adminSystemLogLoad = async () => {
  try {
    const res = await axios.get(`${apuUrl}/admin/log/system`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.logs; // 로그 데이터 반환
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "로그 불러오기 오류");
    return err;
  }
};

export const adminCrawlingLogLoad = async () => {
  try {
    const res = await axios.get(`${apuUrl}/admin/log/crawling`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.logs; // 로그 데이터 반환
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "로그 불러오기 오류");
    return err;
  }
};

export const adminUserLogLoad = async () => {
  try {
    const res = await axios.get(`${apuUrl}/admin/log/user`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.logs; // 로그 데이터 반환
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "로그 불러오기 오류");
    return err;
  }
};

export const adminLogLoad = async () => {
  try {
    const res = await axios.get(`${apuUrl}/admin/log/admin`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.logs; // 로그 데이터 반환
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "로그 불러오기 오류");
    return err;
  }
};
