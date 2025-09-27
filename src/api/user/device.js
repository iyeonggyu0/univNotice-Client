import axios from "axios";
import { apuUrl } from "../../util/axios";

export const DeviceAdd = async (data) => {
  try {
    const res = await axios.post(`${apuUrl}/user/device`, data, { withCredentials: true });
    if (res.status === 200) {
      return res.data; // 전체 응답 데이터 반환 (success, message, refresh_token, device_id 포함)
    }
    return false;
  } catch (err) {
    alert(err.response?.data?.error || "디바이스 등록 오류");
    return err.response?.data;
  }
};

export const DeviceDelete = async (device_id) => {
  try {
    const res = await axios.delete(`${apuUrl}/user/device/${device_id}`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.success; // { success: true } 반환
    }
    return false;
  } catch (err) {
    alert(err.response?.data?.error || "디바이스 삭제 오류");
    return false;
  }
};
