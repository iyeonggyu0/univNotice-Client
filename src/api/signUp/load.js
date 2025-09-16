import axios from "axios";
import { apuUrl } from "../../util/axios";

export const signupSchoolLoad = async () => {
  try {
    const res = await axios.get(`${apuUrl}/sign-up/load/school`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.data; // 학교 목록 반환
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "학교 목록 불러오기 오류");
    return err;
  }
};

export const signupDepartmentLoad = async (selectedUniv) => {
  console.log(selectedUniv);
  try {
    const res = await axios.get(`${apuUrl}/sign-up/load/department/${selectedUniv}`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.data; // 학과 목록 반환
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "학과 목록 불러오기 오류");
    return err;
  }
};
