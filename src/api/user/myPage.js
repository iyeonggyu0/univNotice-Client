import axios from "axios";
import { apiUrl } from "../../util/axios";

export const myPageInfoLoad = async () => {
  try {
    const res = await axios.get(`${apiUrl}/user/mypage/info`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.data;
    }
    return false;
  } catch (err) {
    alert(err.response?.data?.error || "마이페이지 정보 불러오기 오류");
    return false;
  }
};

export const myPageDeviceLoad = async () => {
  try {
    const res = await axios.get(`${apiUrl}/user/mypage/device`, { withCredentials: true });
    if (res.status === 200 && res.data.success) {
      return res.data.devices; // 기기 목록 반환
    }
    return false;
  } catch (err) {
    alert(err.response?.data?.error || "마이페이지 디바이스 불러오기 오류");
    return false;
  }
};

export const myPageDeviceDelete = async (id) => {
  try {
    const res = await axios.delete(`${apiUrl}/user/mypage/device/${id}`, { withCredentials: true });
    if (res.status === 200 && res.data.success) {
      return res.data.devices;
    }
    return false;
  } catch (err) {
    alert(err.response?.data?.error || "마이페이지 디바이스 삭제 오류");
    return false;
  }
};

export const myPageDeviceToggleActive = async (id, is_active) => {
  try {
    const res = await axios.put(
      `${apiUrl}/user/mypage/device/toggle`,
      {
        id,
        is_active,
      },
      { withCredentials: true }
    );
    if (res.status === 200 && res.data.success) {
      return res.data.devices;
    }
    return false;
  } catch (err) {
    alert(err.response?.data?.error || "마이페이지 디바이스 활성화 상태 변경 오류");
    return false;
  }
};

export const myPageCategoryLoad = async () => {
  try {
    const res = await axios.get(`${apiUrl}/user/mypage/category`, { withCredentials: true });
    if (res.status === 200 && res.data.success) {
      return res.data.categories; // 카테고리 목록 반환
    }
    return false;
  } catch (err) {
    alert(err.response?.data?.error || "마이페이지 카테고리 불러오기 오류");
    return false;
  }
};
