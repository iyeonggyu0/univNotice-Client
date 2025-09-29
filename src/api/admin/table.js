import axios from "axios";
import { apiUrl } from "../../util/axios";

/**
 * 유저 테이블 데이터 로드
 * @route GET /admin/table/user
 */
export const adminTableUserLoad = async () => {
  try {
    const res = await axios.get(`${apiUrl}/admin/table/user`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows; // 테이블 데이터 반환
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "디바이스 테이블 불러오기 오류");
    return err;
  }
};

/**
 * 카테고리 테이블 데이터 로드
 * @route GET /admin/table/category
 */
export const adminTableCategoryLoad = async () => {
  try {
    const res = await axios.get(`${apiUrl}/admin/table/category`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows; // 테이블 데이터 반환
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "카테고리 테이블 불러오기 오류");
    return err;
  }
};

/**
 * 키워드 테이블 데이터 로드
 * @route GET /admin/table/keyword
 */
export const adminTableKeywordLoad = async () => {
  try {
    const res = await axios.get(`${apiUrl}/admin/table/keyword`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows; // 테이블 데이터 반환
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "키워드 테이블 불러오기 오류");
    return err;
  }
};

/**
 * 디바이스 테이블 데이터 로드
 * @route GET /admin/table/device
 */
export const adminTableDeviceLoad = async () => {
  try {
    const res = await axios.get(`${apiUrl}/admin/table/device`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows; // 테이블 데이터 반환
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "학과 테이블 불러오기 오류");
    return err;
  }
};

/**
 * 공지 테이블 데이터 로드
 * @route GET /admin/table/notice
 */
export const adminTableNoticeLoad = async () => {
  try {
    const res = await axios.get(`${apiUrl}/admin/table/notice`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows; // 테이블 데이터 반환
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "공지 테이블 불러오기 오류");
    return err;
  }
};

/**
 * 크롤링 URL 테이블 데이터 로드
 * @route GET /admin/table/crawl-url
 */
export const adminTableCrawlUrlLoad = async () => {
  try {
    const res = await axios.get(`${apiUrl}/admin/table/crawl-url`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows; // 테이블 데이터 반환
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "크롤링 URL 테이블 불러오기 오류");
    return err;
  }
};

/**
 * 휴대폰 인증 테이블 데이터 로드
 * @route GET /admin/table/phone-verification
 */
export const adminTablePhoneVerificationLoad = async () => {
  try {
    const res = await axios.get(`${apiUrl}/admin/table/phone-verification`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows; // 테이블 데이터 반환
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "휴대폰 인증 테이블 불러오기 오류");
    return err;
  }
};

/**
 * QR 세션 테이블 데이터 로드
 * @route GET /admin/table/qr-session
 */
export const adminTableQrSessionLoad = async () => {
  try {
    const res = await axios.get(`${apiUrl}/admin/table/qr-session`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows; // 테이블 데이터 반환
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "QR 세션 테이블 불러오기 오류");
    return err;
  }
};

/**
 * 공지-키워드 매칭 테이블 데이터 로드
 * @route GET /admin/table/notice-keyword-match
 */
export const adminTableNoticeKeywordMatchLoad = async () => {
  try {
    const res = await axios.get(`${apiUrl}/admin/table/notice-keyword-match`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows; // 테이블 데이터 반환
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "공지-키워드 매칭 테이블 불러오기 오류");
    return err;
  }
};

/**
 * 알림 큐 테이블 데이터 로드
 * @route GET /admin/table/notification-queue
 */
export const adminTableNotificationQueueLoad = async () => {
  try {
    const res = await axios.get(`${apiUrl}/admin/table/notification-queue`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows; // 테이블 데이터 반환
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "알림 큐 테이블 불러오기 오류");
    return err;
  }
};
