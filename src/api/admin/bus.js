import axios from "axios";
import { apiUrl } from "../../util/axios";

/**
 * 셔틀 정류장 목록 조회
 * @route GET /admin/bus/stop/:schoolId
 */
export const adminBusStopLoad = async (schoolId) => {
  if (!schoolId) return [];
  try {
    const res = await axios.get(`${apiUrl}/admin/bus/stop/${schoolId}`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows ?? [];
    }
    return [];
  } catch (err) {
    alert(err.response?.data?.error || "셔틀 정류장 정보를 불러오지 못했습니다.");
    return [];
  }
};

/**
 * 셔틀 시간표 조회
 * @route GET /admin/bus/timetable/:busStopId
 */
export const adminBusTimetableLoad = async (busStopId) => {
  if (!busStopId) return [];
  try {
    const res = await axios.get(`${apiUrl}/admin/bus/timetable/${busStopId}`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows ?? [];
    }
    return [];
  } catch (err) {
    alert(err.response?.data?.error || "셔틀 시간표를 불러오지 못했습니다.");
    return [];
  }
};

export const adminBusStopCreate = async (data) => {
  try {
    const res = await axios.post(`${apiUrl}/admin/bus/stop`, data, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows ?? [];
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "셔틀 정류장 등록에 실패했습니다.");
    return null;
  }
};

export const adminBusStopUpdate = async (id, data) => {
  try {
    const res = await axios.put(`${apiUrl}/admin/bus/stop/${id}`, data, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows ?? [];
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "셔틀 정류장 수정에 실패했습니다.");
    return null;
  }
};

export const adminBusTimetableCreate = async (data) => {
  try {
    const res = await axios.post(`${apiUrl}/admin/bus/timetable`, data, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows ?? [];
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "셔틀 시간표 등록에 실패했습니다.");
    return null;
  }
};

export const adminBusTimetableUpdate = async (id, data) => {
  try {
    const res = await axios.put(`${apiUrl}/admin/bus/timetable/${id}`, data, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows ?? [];
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "셔틀 시간표 수정에 실패했습니다.");
    return null;
  }
};

export const adminBusStopDelete = async (id) => {
  try {
    const res = await axios.delete(`${apiUrl}/admin/bus/stop/${id}`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows ?? [];
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "셔틀 정류장 삭제에 실패했습니다.");
    return null;
  }
};

export const adminBusTimetableDelete = async (id) => {
  try {
    const res = await axios.delete(`${apiUrl}/admin/bus/timetable/${id}`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows ?? [];
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "셔틀 시간표 삭제에 실패했습니다.");
    return null;
  }
};
