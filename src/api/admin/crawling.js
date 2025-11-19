import axios from "axios";
import { apiUrl } from "../../util/axios";

export const adminCrawlingLoad = async (id) => {
  try {
    const res = await axios.post(`${apiUrl}/admin/crawling/test/${id}`, {}, { withCredentials: true });
    if (res.status === 200) {
      return res.data;
    }
    return false;
  } catch (err) {
    alert(err.response?.data?.error || "크롤링 오류");
    return false;
  }
};
