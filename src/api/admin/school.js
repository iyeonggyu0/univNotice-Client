import axios from "axios";
import { apiUrl } from "../../util/axios";

/**
 * 학교 테이블 데이터 로드
 * @route GET /admin/school
 */
export const adminSchoolLoad = async () => {
  try {
    const res = await axios.get(`${apiUrl}/admin/school`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows; // 테이블 데이터 반환
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "어드민 스쿨 테이블 불러오기 오류");
    return err;
  }
};

/**
 * 학과 테이블 데이터 로드
 * @route GET /admin/school/department
 */
export const adminSchoolDepartmentLoad = async (departmentId) => {
  try {
    const res = await axios.get(`${apiUrl}/admin/school/department/${departmentId}`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows;
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "학과 테이블 불러오기 오류");
    return err;
  }
};

/**
 * 학사일정 테이블 데이터 로드
 * @route GET /admin/school/academic-calendar/:schoolId/:departmentId
 */
export const adminSchoolAcademicCalendarLoad = async (schoolId, departmentId) => {
  try {
    // 예시: 학사일정 조회
    const res = await axios.get(`${apiUrl}/admin/school/academic-calendar/${schoolId}/${departmentId}`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows;
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "학사일정 테이블 불러오기 오류");
    return err;
  }
};

/**
 * 학교 등록
 * @route POST /admin/school/add
 */
export const adminSchoolAdd = async (schoolName) => {
  try {
    // 예시: 학사일정 조회
    const res = await axios.post(`${apiUrl}/admin/school/add`, { schoolName }, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows; // 서버에서 { rows: allSchools }로 반환하므로 rows 사용
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "학교 등록 오류");
    return err;
  }
};

export const adminSchoolDelete = async (schoolId) => {
  try {
    const res = await axios.delete(`${apiUrl}/admin/school/delete/${schoolId}`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows; // 서버에서 { rows: allSchools }로 반환하므로 rows 사용
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "학교 삭제 오류");
    return err;
  }
};

export const adminDepartmentAdd = async (data) => {
  try {
    const res = await axios.post(`${apiUrl}/admin/school/department/add`, data, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows; // 서버에서 { rows: allDepartments }로 반환하므로 rows 사용
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "학과 등록 오류");
    return err;
  }
};

export const adminDepartmentDelete = async (departmentId) => {
  try {
    const res = await axios.delete(`${apiUrl}/admin/school/department/${departmentId}`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows; // 서버에서 { rows: allDepartments }로 반환하므로 rows 사용
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "학과 삭제 오류");
    return err;
  }
};

export const adminCategoryLoad = async (schoolId, departmentId) => {
  try {
    // 학교 ID는 필수, 학과 ID는 선택적
    const url = departmentId ? `${apiUrl}/admin/school/category/${schoolId}/${departmentId}` : `${apiUrl}/admin/school/category/${schoolId}`;

    const res = await axios.get(url, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows; // 테이블 데이터 반환
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "카테고리 테이블 불러오기 오류");
    return err;
  }
};

export const adminCategoryAdd = async (data) => {
  try {
    const res = await axios.post(`${apiUrl}/admin/school/category/add`, data, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows; // 서버에서 { rows: allCategories }로 반환하므로 rows 사용
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "카테고리 등록 오류");
    return err;
  }
};

export const adminCategoryDelete = async (categoryId) => {
  try {
    const res = await axios.delete(`${apiUrl}/admin/school/category/${categoryId}`, { withCredentials: true }); // 카테고리 ID를 URL에 포함
    if (res.status === 200) {
      return res.data.rows; // 서버에서 { rows: allCategories }로 반환하므로 rows 사용
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "카테고리 삭제 오류");
    return err;
  }
};

export const adminCategoryUpdate = async (data) => {
  try {
    const res = await axios.put(`${apiUrl}/admin/school/category`, data, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows; // 서버에서 { rows: allCategories }로 반환하므로 rows 사용
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "카테고리 수정 오류");
    return err;
  }
};

export const adminAcademicCalendarAdd = async (data) => {
  try {
    const res = await axios.post(`${apiUrl}/admin/school/academic-calendar/add`, data, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows; // 서버에서 { rows: allAcademicCalendars }로 반환하므로 rows 사용
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "학사일정 등록 오류");
    return err;
  }
};

export const adminAcademicCalendarDelete = async (calendarId) => {
  try {
    const res = await axios.delete(`${apiUrl}/admin/school/academic-calendar/${calendarId}`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows; // 서버에서 { rows: allAcademicCalendars }로 반환하므로 rows 사용
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "학사일정 삭제 오류");
    return err;
  }
};

export const adminAcademicCalendarUpdate = async (data) => {
  try {
    const res = await axios.put(`${apiUrl}/admin/school/academic-calendar`, data, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows; // 서버에서 { rows: allAcademicCalendars }로 반환하므로 rows 사용
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "학사일정 수정 오류");
    return err;
  }
};

export const adminUserLoad = async (school_id, department_id) => {
  try {
    const url = department_id ? `${apiUrl}/admin/school/user/${school_id}/${department_id}` : `${apiUrl}/admin/school/user/${school_id}`;
    const res = await axios.get(url, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows; // 테이블 데이터 반환
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "유저 테이블 불러오기 오류");
    return err;
  }
};

export const adminUserDelete = async (student_id) => {
  try {
    const res = await axios.delete(`${apiUrl}/admin/school/user/${student_id}`, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows; // 서버에서 { rows: allUsers }로 반환하므로 rows 사용
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "유저 삭제 오류");
    return err;
  }
};

export const adminUserUpdate = async (data) => {
  try {
    const res = await axios.put(`${apiUrl}/admin/school/user`, data, { withCredentials: true });
    if (res.status === 200) {
      return res.data.rows; // 서버에서 { rows: allUsers }로 반환하므로 rows 사용
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "유저 수정 오류");
    return err;
  }
};

export const adminNotificationSend = async (data) => {
  try {
    const res = await axios.post(`${apiUrl}/admin/notification/send`, data, { withCredentials: true });
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "푸시 알림 전송 오류");
    return err;
  }
};

/**
 * 크롤링 테스트 API
 * @route POST /admin/crawling/test/:crawlUrlId
 */
export const adminCrawlingTest = async (crawlUrlId) => {
  try {
    const res = await axios.post(`${apiUrl}/admin/crawling/test/${crawlUrlId}`, {}, { withCredentials: true });
    if (res.status === 200) {
      return res.data;
    }
    return null;
  } catch (err) {
    alert(err.response?.data?.error || "크롤링 테스트 오류");
    return err;
  }
};
