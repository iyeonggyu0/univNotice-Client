import axios from "axios";

export const loginCheck = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/login/check`, { withCredentials: true });
    return res.data;
  } catch (_) {
    return false;
  }
};
