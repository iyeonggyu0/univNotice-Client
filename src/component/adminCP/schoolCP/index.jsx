import { Refresh } from "@mui/icons-material";
import "./style.css";
import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import { adminUserLoad, adminUserUpdate, adminUserDelete } from "../../../api/admin/school";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import useTableManager from "../../../hook/useTableManager";
import {
  adminSchoolLoad,
  adminSchoolDepartmentLoad,
  adminSchoolAcademicCalendarLoad,
  adminSchoolAdd,
  adminSchoolDelete,
  adminDepartmentAdd,
  adminDepartmentDelete,
  adminCategoryLoad,
  adminCategoryAdd,
  adminCategoryUpdate,
  adminCategoryDelete,
  adminAcademicCalendarAdd,
  adminAcademicCalendarUpdate,
  adminAcademicCalendarDelete,
  adminCrawlingTest,
} from "../../../api/admin/school";
import TableCP from "../../_common/tableCP";
import InputCP from "../../_common/inputCP";
import { useInput } from "../../../hook/useInput";
import ButtonCP from "../../_common/buttonCP";
import DeleteIcon from "@mui/icons-material/Delete";
import ToggleCP from "../../_common/toggleCP";
import ClearIcon from "@mui/icons-material/Clear";
import { adminCrawlingLoad } from "../../../api/admin/crawling";

const SchoolCP = () => {
  // ===== 선택된 항목 상태 =====
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedAcademicCalendar, setSelectedAcademicCalendar] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // ===== 사용자 테이블 상태 및 입력값 =====
  const [userList, setUserList] = useState([]);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const userTable = useTableManager(userList);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userName, onChangeUserName, setUserName] = useInput("");
  const [userStudentId, onChangeUserStudentId, setUserStudentId] = useInput("");
  const [userPhone, onChangeUserPhone, setUserPhone] = useInput("");

  // 사용자 데이터 로드
  const loadUserData = useCallback(async () => {
    if (!selectedSchool) return;
    setIsUserLoading(true);
    try {
      const rows = await adminUserLoad(selectedSchool.id, selectedDepartment?.id);
      if (Array.isArray(rows)) setUserList(rows);
    } catch (err) {
      console.error("유저 테이블 불러오기 오류", err);
    }
    setIsUserLoading(false);
  }, [selectedSchool, selectedDepartment, setUserList, setIsUserLoading]);

  // 사용자 선택 핸들러
  const handleUserSelect = useCallback(
    (user) => {
      setSelectedUser(user);
      setUserName(user?.name || "");
      setUserStudentId(user?.student_id || "");

      setUserPhone(user?.phone || "");
    },
    [setSelectedUser, setUserName, setUserStudentId, setUserPhone]
  );

  // 사용자 등록
  const handleUserAdd = useCallback(
    async (e) => {
      e.preventDefault();
      if (!selectedSchool) return alert("학교를 선택하세요.");
      if (!userName.trim() || !userStudentId.trim() || !userPhone.trim()) {
        return alert("모든 필드를 입력하세요.");
      }
      setIsUserLoading(true);
      try {
        const data = {
          school_id: selectedSchool.id,
          department_id: selectedDepartment?.id || null,
          name: userName,
          student_id: userStudentId,
          phone: userPhone,
        };
        // 등록은 update로 처리 (신규 등록 API가 없으므로)
        const rows = await adminUserUpdate(data);
        if (Array.isArray(rows)) {
          setUserList(rows);
          setUserName("");
          setUserStudentId("");
          setUserPhone("");
          setSelectedUser(null);
          alert("사용자 등록/수정 완료");
        }
      } catch (err) {
        console.error("사용자 등록 오류", err);
      }
      setIsUserLoading(false);
    },
    [
      selectedSchool,
      selectedDepartment,
      userName,
      userStudentId,
      userPhone,
      setUserList,
      setUserName,
      setUserStudentId,
      setUserPhone,
      setSelectedUser,
      setIsUserLoading,
    ]
  );

  // 사용자 수정
  const handleUserUpdate = useCallback(
    async (e) => {
      e.preventDefault();
      if (!selectedUser) return alert("수정할 사용자를 선택하세요.");
      setIsUserLoading(true);
      try {
        const data = {
          id: selectedUser.id,
          school_id: selectedSchool.id,
          department_id: selectedDepartment?.id || null,
          name: userName,
          student_id: userStudentId,
          phone: userPhone,
        };
        const rows = await adminUserUpdate(data);
        if (Array.isArray(rows)) {
          setUserList(rows);
          alert("사용자 정보가 수정되었습니다.");
        }
      } catch (err) {
        console.error("사용자 수정 오류", err);
      }
      setIsUserLoading(false);
    },
    [selectedUser, selectedSchool, selectedDepartment, userName, userStudentId, userPhone, setUserList, setIsUserLoading]
  );

  // 사용자 삭제
  const handleUserDelete = useCallback(
    async (e) => {
      e.preventDefault();
      if (!selectedUser) return alert("삭제할 사용자를 선택하세요.");
      if (!window.confirm(`정말로 ${selectedUser.name} 사용자를 삭제하시겠습니까?`)) return;
      setIsUserLoading(true);
      try {
        const rows = await adminUserDelete(selectedUser.id);
        if (Array.isArray(rows)) {
          setUserList(rows);
          setSelectedUser(null);
          setUserName("");
          setUserStudentId("");
          setUserPhone("");
          alert("사용자가 삭제되었습니다.");
        }
      } catch (err) {
        console.error("사용자 삭제 오류", err);
      }
      setIsUserLoading(false);
    },
    [selectedUser, setUserList, setSelectedUser, setUserName, setUserStudentId, setUserPhone, setIsUserLoading]
  );

  // 사용자 데이터 자동 로드
  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  // ===== 테이블 데이터 상태 =====
  const [schoolList, setSchoolList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [academicCalendarList, setAcademicCalendarList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  // ===== 로딩 상태 =====
  const [isSchoolLoading, setIsSchoolLoading] = useState(false);
  const [isDepartmentLoading, setIsDepartmentLoading] = useState(false);
  const [isAcademicCalendarLoading, setIsAcademicCalendarLoading] = useState(false);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);

  // ===== 테이블 매니저 =====
  const schoolTable = useTableManager(schoolList);
  const departmentTable = useTableManager(departmentList);
  const academicCalendarTable = useTableManager(academicCalendarList);
  const categoryTable = useTableManager(categoryList);

  // ===== 선택 핸들러 =====
  const handleSchoolSelect = useCallback((school) => {
    setSelectedSchool(school);
    setSelectedDepartment(null);
    setSelectedAcademicCalendar(null);
    setSelectedCategory(null);
    setDepartmentList([]);
    setAcademicCalendarList([]);
    setCategoryList([]);
  }, []);

  const handleDepartmentSelect = useCallback((department) => {
    setSelectedDepartment(department);
    setSelectedAcademicCalendar(null);
    setSelectedCategory(null);
    setAcademicCalendarList([]);
    setCategoryList([]);
  }, []);

  // ===== 카테고리 관련 입력 및 함수 =====
  const [categoryUrl, onChangeCategoryUrl, setCategoryUrl] = useInput("");
  const [categoryExplanation, onChangeCategoryExplanation, setCategoryExplanation] = useInput("");
  const [listSelector, onChangeListSelector, setListSelector] = useInput("");
  const [rowSelector, onChangeRowSelector, setRowSelector] = useInput("");
  const [titleSelector, onChangeTitleSelector, setTitleSelector] = useInput("");
  const [authorSelector, onChangeAuthorSelector, setAuthorSelector] = useInput("");
  const [dateSelector, onChangeDateSelector, setDateSelector] = useInput("");
  const [dateFormat, onChangeDateFormat, setDateFormat] = useInput("");
  const [attachmentSelector, onChangeAttachmentSelector, setAttachmentSelector] = useInput("");
  const [isCategoryActive, setIsCategoryActive] = useState(true);

  const handleCategorySelect = useCallback(
    (category) => {
      setSelectedCategory(category);
      setCategoryUrl(category?.url || "");
      setCategoryExplanation(category?.category || "");
      setListSelector(category?.list_selector || "");
      setRowSelector(category?.row_selector || "");
      setTitleSelector(category?.title_selector || "");
      setAuthorSelector(category?.author_selector || "");
      setDateSelector(category?.date_selector || "");
      setDateFormat(category?.date_format || "");
      setAttachmentSelector(category?.attachment_selector || "");
      setIsCategoryActive(category?.is_active);
      console.log(category?.is_active);
    },
    [
      setCategoryUrl,
      setCategoryExplanation,
      setListSelector,
      setRowSelector,
      setTitleSelector,
      setAuthorSelector,
      setDateSelector,
      setDateFormat,
      setAttachmentSelector,
    ]
  );

  // ===== 데이터 로드 함수 =====
  const loadSchoolData = useCallback(async (e) => {
    if (e) e.preventDefault();
    setIsSchoolLoading(true);
    try {
      const data = await adminSchoolLoad();
      setSchoolList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("학교 데이터 로드 오류:", error);
    }
    setIsSchoolLoading(false);
  }, []);

  const loadDepartmentData = useCallback(async (school_id) => {
    if (!school_id) return;
    setIsDepartmentLoading(true);
    try {
      const data = await adminSchoolDepartmentLoad(school_id);
      setDepartmentList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("학과 데이터 로드 오류:", error);
    }
    setIsDepartmentLoading(false);
  }, []);

  const loadAcademicCalendarData = useCallback(
    async (departmentId) => {
      if (!selectedSchool) return;
      setIsAcademicCalendarLoading(true);
      try {
        const data = await adminSchoolAcademicCalendarLoad(selectedSchool.id, departmentId);
        setAcademicCalendarList(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("학사일정 데이터 로드 오류:", error);
      }
      setIsAcademicCalendarLoading(false);
    },
    [selectedSchool]
  );

  const loadCategoryData = useCallback(async (school_id, departmentId) => {
    if (!school_id) return;
    setIsCategoryLoading(true);
    try {
      const data = await adminCategoryLoad(school_id, departmentId);
      setCategoryList(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("카테고리 데이터 로드 오류:", error);
    }
    setIsCategoryLoading(false);
  }, []);

  // ===== 데이터 로드 Effect =====
  useEffect(() => {
    loadSchoolData();
  }, [loadSchoolData]);

  useEffect(() => {
    loadDepartmentData(selectedSchool?.id);
  }, [selectedSchool, loadDepartmentData]);

  useEffect(() => {
    loadAcademicCalendarData(selectedDepartment?.id);
    loadCategoryData(selectedSchool?.id, selectedDepartment?.id);
  }, [selectedSchool, selectedDepartment, loadAcademicCalendarData, loadCategoryData]);

  // ===== 학교 관련 입력 및 함수 =====
  const [schoolName, onChangeSchoolName, setSchoolName] = useInput("");

  const handleAddSchool = useCallback(
    async (e) => {
      e.preventDefault();
      if (!schoolName || schoolName.trim().length === 0) {
        alert("학교 이름을 입력해주세요.");
        return;
      }

      try {
        setIsSchoolLoading(true);
        const result = await adminSchoolAdd(schoolName.trim());
        if (result && Array.isArray(result)) {
          setSchoolList(result);
          setSchoolName("");
          alert("학교가 성공적으로 추가되었습니다.");
        }
      } catch (error) {
        console.error("학교 추가 중 오류:", error);
        alert("학교 추가 중 오류가 발생했습니다.");
      } finally {
        setIsSchoolLoading(false);
      }
    },
    [schoolName, setSchoolName]
  );

  const handleDeleteSchool = useCallback(
    async (e) => {
      e.preventDefault();
      if (!selectedSchool) {
        alert("삭제할 학교를 선택해주세요.");
        return;
      }

      if (!confirm(`정말로 "${selectedSchool.name}" 학교를 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`)) {
        return;
      }

      try {
        setIsSchoolLoading(true);
        const result = await adminSchoolDelete(selectedSchool.id);
        if (result && Array.isArray(result)) {
          setSchoolList(result);
          setSelectedSchool(null);
          setSelectedDepartment(null);
          setSelectedAcademicCalendar(null);
          setSelectedCategory(null);
          setDepartmentList([]);
          setAcademicCalendarList([]);
          setCategoryList([]);
          alert("학교가 성공적으로 삭제되었습니다.");
        }
      } catch (error) {
        console.error("학교 삭제 중 오류:", error);
        alert("학교 삭제 중 오류가 발생했습니다.");
      } finally {
        setIsSchoolLoading(false);
      }
    },
    [selectedSchool]
  );

  const handleSchoolNameKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleAddSchool(e);
      }
    },
    [handleAddSchool]
  );

  // ===== 학과 관련 입력 및 함수 =====
  const [departmentName, onChangeDepartmentName, setDepartmentName] = useInput("");

  const handleAddDepartment = useCallback(
    async (e) => {
      e.preventDefault();
      if (!departmentName || departmentName.trim().length === 0) {
        alert("학과 이름을 입력해주세요.");
        return;
      }

      if (!selectedSchool) {
        alert("학과를 추가할 학교를 선택해주세요.");
        return;
      }

      try {
        const data = {
          school_id: selectedSchool.id,
          departmentName: departmentName.trim(),
        };
        const result = await adminDepartmentAdd(data);
        if (result && Array.isArray(result)) {
          setSelectedDepartment(result[0] || null);
          setDepartmentList(result);
          setDepartmentName("");
          alert("학과가 성공적으로 추가되었습니다.");
        }
      } catch (error) {
        console.error("학과 추가 중 오류:", error);
      }
    },
    [selectedSchool, departmentName, setDepartmentName]
  );

  const handleDeleteDepartment = useCallback(
    async (e) => {
      e.preventDefault();
      if (!selectedDepartment) {
        alert("삭제할 학과를 선택해주세요.");
        return;
      }
      if (!confirm(`정말로 "${selectedDepartment.name}" 학과를 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`)) {
        return;
      }

      try {
        const result = await adminDepartmentDelete(selectedDepartment.id);
        if (result && Array.isArray(result)) {
          setDepartmentList(result);
          setSelectedDepartment(null);
          setSelectedAcademicCalendar(null);
          setSelectedCategory(null);
          setAcademicCalendarList([]);
          setCategoryList([]);
          alert("학과가 성공적으로 삭제되었습니다.");
        }
      } catch (error) {
        console.error("학과 삭제 중 오류:", error);
      }
    },
    [selectedDepartment]
  );

  const handleDepartmentNameKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleAddDepartment(e);
      }
    },
    [handleAddDepartment]
  );

  // ===== 카테고리 관련 함수 =====
  const handleCategoryActiveToggle = useCallback((value) => {
    setIsCategoryActive(value);
  }, []);

  const handleAddCategory = useCallback(
    async (e) => {
      e.preventDefault();
      if (!categoryUrl || categoryUrl.trim().length === 0) {
        alert("학과 공지 URL을 입력해주세요.");
        return;
      }
      if (!listSelector || listSelector.trim().length === 0) {
        alert("목록 셀렉터를 입력해주세요.");
        return;
      }
      if (!rowSelector || rowSelector.trim().length === 0) {
        alert("행 셀렉터를 입력해주세요.");
        return;
      }
      if (!titleSelector || titleSelector.trim().length === 0) {
        alert("제목 셀렉터를 입력해주세요.");
        return;
      }
      if (!dateSelector || dateSelector.trim().length === 0) {
        alert("작성일 셀렉터를 입력해주세요.");
        return;
      }
      if (!dateFormat || dateFormat.trim().length === 0) {
        alert("작성일 포맷을 입력해주세요.");
        return;
      }
      if (!selectedSchool) {
        alert("학과를 추가할 학교를 선택해주세요.");
        return;
      }

      try {
        const data = {
          school_id: selectedSchool?.id,
          department_id: selectedDepartment?.id || null,
          url: categoryUrl.trim(),
          list_selector: listSelector.trim(),
          row_selector: rowSelector.trim(),
          title_selector: titleSelector.trim(),
          author_selector: authorSelector.trim(),
          date_selector: dateSelector.trim(),
          date_format: dateFormat.trim(),
          attachment_selector: attachmentSelector.trim(),
          category: categoryExplanation.trim() || "학과공지",
          is_active: isCategoryActive,
        };
        const result = await adminCategoryAdd(data);
        if (result && Array.isArray(result)) {
          setCategoryList(result);
          setCategoryUrl("");
          setCategoryExplanation("");
          setListSelector("");
          setRowSelector("");
          setTitleSelector("");
          setAuthorSelector("");
          setDateSelector("");
          setDateFormat("");
          setAttachmentSelector("");
          setIsCategoryActive(true);
          alert("카테고리가 성공적으로 추가되었습니다.");
        }
      } catch (error) {
        console.error("카테고리 추가 중 오류:", error);
      }
    },
    [
      selectedSchool,
      selectedDepartment,
      categoryUrl,
      categoryExplanation,
      listSelector,
      rowSelector,
      titleSelector,
      authorSelector,
      dateSelector,
      dateFormat,
      attachmentSelector,
      isCategoryActive,
      setCategoryUrl,
      setCategoryExplanation,
      setListSelector,
      setRowSelector,
      setTitleSelector,
      setAuthorSelector,
      setDateSelector,
      setDateFormat,
      setAttachmentSelector,
    ]
  );

  const handleUpdateCategory = useCallback(
    async (e) => {
      e.preventDefault();
      if (!selectedCategory) {
        alert("수정할 카테고리를 선택해주세요.");
        return;
      }
      if (!categoryUrl || categoryUrl.trim().length === 0) {
        alert("학과 공지 URL을 입력해주세요.");
        return;
      }
      if (!listSelector || listSelector.trim().length === 0) {
        alert("목록 셀렉터를 입력해주세요.");
        return;
      }
      if (!rowSelector || rowSelector.trim().length === 0) {
        alert("행 셀렉터를 입력해주세요.");
        return;
      }
      if (!titleSelector || titleSelector.trim().length === 0) {
        alert("제목 셀렉터를 입력해주세요.");
        return;
      }
      if (!dateSelector || dateSelector.trim().length === 0) {
        alert("작성일 셀렉터를 입력해주세요.");
        return;
      }
      if (!dateFormat || dateFormat.trim().length === 0) {
        alert("작성일 포맷을 입력해주세요.");
        return;
      }
      if (!categoryExplanation || categoryExplanation.trim().length === 0) {
        alert("카테고리를 입력해주세요.");
        return;
      }
      if (!selectedSchool) {
        alert("학과를 추가할 학교를 선택해주세요.");
        return;
      }

      try {
        const data = {
          id: selectedCategory.id,
          school_id: selectedSchool?.id,
          department_id: selectedDepartment?.id || null,
          url: categoryUrl.trim(),
          category: categoryExplanation.trim(),
          list_selector: listSelector.trim(),
          row_selector: rowSelector.trim(),
          title_selector: titleSelector.trim(),
          author_selector: authorSelector.trim(),
          date_selector: dateSelector.trim(),
          date_format: dateFormat.trim(),
          attachment_selector: attachmentSelector.trim(),
          is_active: isCategoryActive,
        };
        const result = await adminCategoryUpdate(data);
        if (result && Array.isArray(result)) {
          setCategoryList(result);
          setSelectedCategory(null);
          setCategoryUrl("");
          setCategoryExplanation("");
          setListSelector("");
          setRowSelector("");
          setTitleSelector("");
          setAuthorSelector("");
          setDateSelector("");
          setDateFormat("");
          setAttachmentSelector("");
          setIsCategoryActive(true);
          alert("카테고리가 성공적으로 수정되었습니다.");
        }
      } catch (error) {
        console.error("카테고리 수정 중 오류:", error);
      }
    },
    [
      selectedCategory,
      selectedSchool,
      selectedDepartment,
      categoryUrl,
      categoryExplanation,
      listSelector,
      rowSelector,
      titleSelector,
      authorSelector,
      dateSelector,
      dateFormat,
      attachmentSelector,
      isCategoryActive,
      setCategoryUrl,
      setCategoryExplanation,
      setListSelector,
      setRowSelector,
      setTitleSelector,
      setAuthorSelector,
      setDateSelector,
      setDateFormat,
      setAttachmentSelector,
    ]
  );

  const handleDeleteCategory = useCallback(
    async (e) => {
      e.preventDefault();
      if (!selectedCategory) {
        alert("삭제할 카테고리를 선택해주세요.");
        return;
      }
      if (!confirm(`정말로 "${selectedCategory.explanation}" 카테고리를 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`)) {
        return;
      }
      try {
        const result = await adminCategoryDelete(selectedCategory.id);
        if (result && Array.isArray(result)) {
          setCategoryList(result);
          setSelectedCategory(null);
          setCategoryUrl("");
          setCategoryExplanation("");
          setListSelector("");
          setRowSelector("");
          setTitleSelector("");
          setAuthorSelector("");
          setDateSelector("");
          setDateFormat("");
          setAttachmentSelector("");
          setIsCategoryActive(true);
          alert("카테고리가 성공적으로 삭제되었습니다.");
        }
      } catch (error) {
        console.error("카테고리 삭제 중 오류:", error);
      }
    },
    [
      selectedCategory,
      setCategoryUrl,
      setCategoryExplanation,
      setListSelector,
      setRowSelector,
      setTitleSelector,
      setAuthorSelector,
      setDateSelector,
      setDateFormat,
      setAttachmentSelector,
    ]
  );

  // ===== 크롤링 테스트 함수 =====
  const handleTestCrawling = useCallback(
    async (e) => {
      e.preventDefault();
      if (!selectedCategory) {
        alert("테스트할 카테고리를 선택해주세요.");
        return;
      }

      try {
        setIsCategoryLoading(true);
        const result = await adminCrawlingTest(selectedCategory.id);

        if (result && result.success) {
          const { data, crawlUrl, count } = result;

          // 결과를 별도 창이나 모달로 표시
          let resultMessage = `✅ 크롤링 테스트 성공!\n\n`;
          resultMessage += `📍 대상: ${crawlUrl.school} - ${crawlUrl.category}\n`;
          resultMessage += `🔗 URL: ${crawlUrl.list_url}\n`;
          resultMessage += `📊 수집된 공지사항: ${count}개\n\n`;

          if (count > 0) {
            resultMessage += `📋 최근 공지사항 미리보기:\n`;
            data.slice(0, 3).forEach((notice, index) => {
              resultMessage += `${index + 1}. ${notice.title}\n`;
              if (notice.author) resultMessage += `   👤 작성자: ${notice.author}\n`;
              if (notice.dateText) resultMessage += `   📅 날짜: ${notice.dateText}\n`;
              if (notice.hasAttachment) resultMessage += `   📎 첨부파일 있음\n`;
              resultMessage += `\n`;
            });

            if (count > 3) {
              resultMessage += `... 외 ${count - 3}개 더`;
            }
          } else {
            resultMessage += `⚠️ 수집된 공지사항이 없습니다.\n셀렉터 설정을 확인해주세요.`;
          }

          alert(resultMessage);
        } else {
          alert(`❌ 크롤링 테스트 실패:\n${result.error || "알 수 없는 오류가 발생했습니다."}`);
        }
      } catch (error) {
        console.error("크롤링 테스트 오류:", error);
        alert("크롤링 테스트 중 오류가 발생했습니다.");
      } finally {
        setIsCategoryLoading(false);
      }
    },
    [selectedCategory, setIsCategoryLoading]
  );

  // ===== 일정 관련 함수 =====

  const [scheduleName, onChangeScheduleName, setScheduleName] = useInput("");
  const [scheduleContent, onChangeScheduleContent, setScheduleContent] = useInput("");
  const [scheduleType, onChangeScheduleType, setScheduleType] = useInput("");
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  const handleAcademicCalendarSelect = useCallback((calendar) => {
    setSelectedAcademicCalendar(calendar);
    setScheduleName(calendar?.title || "");
    setScheduleContent(calendar?.content || "");
    setScheduleType(calendar?.type || "");
    setStartDate(calendar?.start_date ? dayjs(calendar.start_date) : dayjs());
    setEndDate(calendar?.end_date ? dayjs(calendar.end_date) : dayjs());
  }, []);

  const handleAcademicCalendarAdd = useCallback(
    async (e) => {
      e.preventDefault();
      const data = {
        school_id: selectedSchool?.id,
        department_id: selectedDepartment?.id || null,
        title: scheduleName,
        content: scheduleContent,
        start_date: startDate,
        end_date: endDate,
        type: scheduleType,
      };
      if (!data.school_id) {
        alert("학교를 선택해주세요.");
        return;
      }
      if (!data.title || data.title.trim().length === 0) {
        alert("일정 이름을 입력해주세요.");
        return;
      }
      if (!data.content || data.content.trim().length === 0) {
        alert("일정 상세 내용을 입력해주세요.");
        return;
      }
      if (!data.type || data.type.trim().length === 0) {
        alert("일정 타입을 입력해주세요.");
        return;
      }
      if (!data.start_date || !data.end_date) {
        alert("시작일과 종료일을 모두 선택해주세요.");
        return;
      }
      if (dayjs(data.end_date).isBefore(dayjs(data.start_date))) {
        alert("종료일은 시작일보다 이전일 수 없습니다.");
        return;
      }
      try {
        setIsAcademicCalendarLoading(true);
        const result = await adminAcademicCalendarAdd(data);
        if (result && Array.isArray(result)) {
          setAcademicCalendarList(result);
          setScheduleName("");
          setScheduleContent("");
          setScheduleType("");
          setStartDate(dayjs());
          setEndDate(dayjs());
          alert("학사 일정이 성공적으로 추가되었습니다.");
        }
      } catch (error) {
        console.error("학사 일정 추가 중 오류:", error);
      } finally {
        setIsAcademicCalendarLoading(false);
      }
    },
    [selectedSchool, selectedDepartment, scheduleName, scheduleContent, scheduleType, startDate, endDate]
  );

  const handleAcademicCalendarUpdate = useCallback(
    async (e) => {
      e.preventDefault();
      const data = {
        id: selectedAcademicCalendar?.id,
        school_id: selectedSchool?.id,
        department_id: selectedDepartment?.id || null,
        title: scheduleName,
        content: scheduleContent,
        start_date: startDate,
        end_date: endDate,
        type: scheduleType,
      };
      if (!data.id) {
        alert("수정할 일정을 선택해주세요.");
        return;
      }
      if (!data.school_id) {
        alert("학교를 선택해주세요.");
        return;
      }
      if (!data.title || data.title.trim().length === 0) {
        alert("일정 이름을 입력해주세요.");
        return;
      }
      if (!data.content || data.content.trim().length === 0) {
        alert("일정 상세 내용을 입력해주세요.");
        return;
      }
      if (!data.type || data.type.trim().length === 0) {
        alert("일정 타입을 입력해주세요.");
        return;
      }
      if (!data.start_date || !data.end_date) {
        alert("시작일과 종료일을 모두 선택해주세요.");
        return;
      }
      if (dayjs(data.end_date).isBefore(dayjs(data.start_date))) {
        alert("종료일은 시작일보다 이전일 수 없습니다.");
        return;
      }
      try {
        setIsAcademicCalendarLoading(true);
        const result = await adminAcademicCalendarUpdate(data);
        if (result && Array.isArray(result)) {
          setAcademicCalendarList(result);
          setSelectedAcademicCalendar(null);
          setScheduleName("");
          setScheduleContent("");
          setScheduleType("");
          setStartDate(dayjs());
          setEndDate(dayjs());
          alert("학사 일정이 성공적으로 수정되었습니다.");
        }
      } catch (error) {
        console.error("학사 일정 수정 중 오류:", error);
      } finally {
        setIsAcademicCalendarLoading(false);
      }
    },
    [selectedAcademicCalendar, selectedSchool, selectedDepartment, scheduleName, scheduleContent, scheduleType, startDate, endDate]
  );

  const handleAcademicCalendarDelete = useCallback(
    async (e) => {
      e.preventDefault();
      if (!selectedAcademicCalendar) {
        alert("삭제할 일정을 선택해주세요.");
        return;
      }
      if (!confirm(`정말로 "${selectedAcademicCalendar.title}" 일정을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`)) {
        return;
      }
      try {
        setIsAcademicCalendarLoading(true);
        const res = await adminAcademicCalendarDelete(selectedAcademicCalendar.id);
        if (res && Array.isArray(res)) {
          setAcademicCalendarList(res);
          setSelectedAcademicCalendar(null);
          setScheduleName("");
          setScheduleContent("");
          setScheduleType("");
          setStartDate(dayjs());
          setEndDate(dayjs());
          alert("학사 일정이 성공적으로 삭제되었습니다.");
        }
      } catch (error) {
        console.error("학사 일정 삭제 중 오류:", error);
      } finally {
        setIsAcademicCalendarLoading(false);
      }
    },
    [selectedAcademicCalendar]
  );

  const onClickCrawling = useCallback(() => {
    if (!selectedCategory) {
      alert("크롤링할 카테고리를 선택해주세요.");
      return;
    }
    try {
      adminCrawlingLoad(selectedCategory.id);
      alert("크롤링 작업이 백그라운드에서 시작되었습니다. 완료까지 다소 시간이 걸릴 수 있습니다.");
    } catch (error) {
      console.error("크롤링 작업 중 오류:", error);
      alert("크롤링 작업 중 오류가 발생했습니다.");
    }
  }, [selectedCategory]);

  return (
    <div className="schoolCp">
      <h2>학교 관리</h2>
      <div className="schoolCp-content">
        {/* 학교 목록 */}
        <div>
          <h4>
            학교 목록
            {selectedSchool && <span style={{ color: "var(--main-color)", marginLeft: "10px" }}>(선택됨: ID {selectedSchool.id})</span>}
            <span
              className="refreshBtn"
              style={{ color: isSchoolLoading ? `var(--black-4)` : `var(--main-color)`, cursor: "pointer" }}
              onClick={(e) => {
                if (!isSchoolLoading) loadSchoolData(e);
              }}>
              <Refresh />
            </span>
            <span className="deleteBtn" onClick={handleDeleteSchool}>
              <DeleteIcon />
            </span>
          </h4>
          <div style={{ maxHeight: "800px" }}>
            <TableCP
              columns={schoolTable.columns}
              rows={schoolTable.pageRows}
              order={schoolTable.order}
              orderBy={schoolTable.orderBy}
              onSort={schoolTable.handleSort}
              page={schoolTable.page}
              rowsPerPage={schoolTable.rowsPerPage}
              totalCount={schoolTable.totalCount}
              onPageChange={(e, newPage) => schoolTable.setPage(newPage)}
              onRowsPerPageChange={(e) => {
                schoolTable.setRowsPerPage(parseInt(e.target.value, 10));
                schoolTable.setPage(0);
              }}
              onRowClick={handleSchoolSelect}
              loading={isSchoolLoading}
            />
          </div>
          {/* 학교 추가 */}
          <div className="schoolCp-schoolAddForm flexBetween">
            <InputCP title="추가할 학교 이름" onChange={onChangeSchoolName} value={schoolName} onKeyDown={handleSchoolNameKeyDown} essential={true} />
            <div style={{ width: "20vw", height: "60px", marginLeft: "1rem", marginTop: "auto" }} onClick={handleAddSchool}>
              <ButtonCP height="3.875rem">등록</ButtonCP>
            </div>
          </div>
        </div>

        {/* 학과 목록 */}
        <div>
          <h4>
            학과 목록
            {selectedDepartment && <span style={{ color: "var(--main-color)", marginLeft: "10px" }}>(선택됨: ID {selectedDepartment.id})</span>}
            <span className="deleteBtn" onClick={handleDeleteDepartment}>
              <DeleteIcon />
            </span>
          </h4>
          <div style={{ maxHeight: "800px" }}>
            <TableCP
              columns={departmentTable.columns}
              rows={departmentTable.pageRows}
              order={departmentTable.order}
              orderBy={departmentTable.orderBy}
              onSort={departmentTable.handleSort}
              page={departmentTable.page}
              rowsPerPage={departmentTable.rowsPerPage}
              totalCount={departmentTable.totalCount}
              onPageChange={(e, newPage) => departmentTable.setPage(newPage)}
              onRowsPerPageChange={(e) => {
                departmentTable.setRowsPerPage(parseInt(e.target.value, 10));
                departmentTable.setPage(0);
              }}
              onRowClick={handleDepartmentSelect}
              loading={isDepartmentLoading}
            />
          </div>

          <div className="schoolCp-departmentAddForm-col flexBetween" style={{ gap: "1rem" }}>
            <div className="flexBetween" style={{ width: "100%", gap: "1rem" }}>
              <InputCP title="학교 이름" activate={false} onChange={() => {}} value={selectedSchool?.name || ""} essential={true} />
              <InputCP title="학과 이름" onChange={onChangeDepartmentName} value={departmentName} essential={true} onKeyDown={handleDepartmentNameKeyDown} />
            </div>
            <div style={{ width: "20vw", height: "60px", marginLeft: "1rem", marginTop: "auto" }} onClick={handleAddDepartment}>
              <ButtonCP height="3.875rem">학과 등록</ButtonCP>
            </div>
          </div>
        </div>

        <div>
          <h4>
            학과 카테고리
            {selectedCategory && <span style={{ color: "var(--main-color)", marginLeft: "10px" }}>(선택됨: ID {selectedCategory.id})</span>}
            <span onClick={onClickCrawling}>크롤링</span>
            <span className="deleteBtn" onClick={handleDeleteCategory}>
              <DeleteIcon />
            </span>
          </h4>
          <div style={{ maxHeight: "800px" }}>
            <TableCP
              columns={categoryTable.columns}
              rows={categoryTable.pageRows}
              order={categoryTable.order}
              orderBy={categoryTable.orderBy}
              onSort={categoryTable.handleSort}
              page={categoryTable.page}
              rowsPerPage={categoryTable.rowsPerPage}
              totalCount={categoryTable.totalCount}
              onPageChange={(e, newPage) => categoryTable.setPage(newPage)}
              onRowsPerPageChange={(e) => {
                categoryTable.setRowsPerPage(parseInt(e.target.value, 10));
                categoryTable.setPage(0);
              }}
              onRowClick={handleCategorySelect}
              loading={isCategoryLoading}
            />
          </div>
          <div className="flexBetweenCol" style={{ gap: "1rem", marginTop: "1rem" }}>
            <div className="flexBetween" style={{ width: "100%", gap: "1rem" }}>
              <InputCP title="학교 이름" activate={false} onChange={() => {}} value={selectedSchool?.name || ""} essential={true} />
              <InputCP title="학과 이름" activate={false} onChange={() => {}} value={selectedDepartment?.name || ""} essential={true} />
              <InputCP title="학과공지 URL" onChange={onChangeCategoryUrl} value={categoryUrl} essential={true} />
              <InputCP
                title="카테고리"
                onChange={onChangeCategoryExplanation}
                value={categoryExplanation}
                essential={true}
                placeholder="URL 설명/이름 (예: 컴퓨터학과 공지사항, 학사공지 등)"
              />
              <ToggleCP title="활성화" value={isCategoryActive} onClickFun={handleCategoryActiveToggle} />
            </div>
            <div className="flexBetween" style={{ width: "100%", gap: "1rem" }}>
              <InputCP
                title="목록 셀렉터"
                onChange={onChangeListSelector}
                value={listSelector}
                essential={true}
                placeholder="#main > article > div > div.md_notice_bx > table > tbody"
              />
              <InputCP title="행 셀렉터" onChange={onChangeRowSelector} value={rowSelector} essential={true} placeholder="tr" />
              <InputCP title="제목 셀렉터" onChange={onChangeTitleSelector} value={titleSelector} essential={true} placeholder="td.step2 > h3 > a > span.tit" />
            </div>
            <div className="flexBetween" style={{ width: "100%", gap: "1rem" }}>
              <InputCP title="작성자 셀렉터" onChange={onChangeAuthorSelector} value={authorSelector} essential={false} placeholder="td.step3 (선택사항)" />
              <InputCP title="작성일 셀렉터" onChange={onChangeDateSelector} value={dateSelector} essential={true} placeholder="td.step4" />
              <InputCP title="작성일 포맷" onChange={onChangeDateFormat} value={dateFormat} essential={true} placeholder="YYYY. MM. DD" />
            </div>
            <div className="flexBetween" style={{ width: "100%", gap: "1rem" }}>
              <InputCP
                title="첨부파일 셀렉터"
                onChange={onChangeAttachmentSelector}
                value={attachmentSelector}
                essential={false}
                placeholder="td.step5 > a.file_icon (선택사항)"
              />
            </div>
            {!selectedCategory && (
              <div style={{ height: "60px" }} onClick={handleAddCategory}>
                <ButtonCP height="3.875rem">학과 공지 등록</ButtonCP>
              </div>
            )}
            {selectedCategory && (
              <div className="flexBetween" style={{ gap: "1rem" }}>
                <div style={{ height: "60px", flex: 1 }} onClick={handleUpdateCategory}>
                  <ButtonCP height="3.875rem">학과 공지 수정</ButtonCP>
                </div>
                <div style={{ height: "60px", flex: 1 }} onClick={handleTestCrawling}>
                  <ButtonCP height="3.875rem" color="secondary">
                    크롤링 테스트
                  </ButtonCP>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 사용자 */}
        {/* 사용자 관리 테이블 */}
        <div>
          <h4>
            사용자
            {selectedUser && <span style={{ color: "var(--main-color)", marginLeft: "10px" }}>(선택됨: ID {selectedUser.id})</span>}
            <span className="deleteBtn" onClick={handleUserDelete}>
              <DeleteIcon />
            </span>
          </h4>
          <div style={{ maxHeight: "800px" }}>
            <TableCP
              columns={userTable.columns}
              rows={userTable.pageRows}
              order={userTable.order}
              orderBy={userTable.orderBy}
              onSort={userTable.handleSort}
              page={userTable.page}
              rowsPerPage={userTable.rowsPerPage}
              totalCount={userTable.totalCount}
              onPageChange={(e, newPage) => userTable.setPage(newPage)}
              onRowsPerPageChange={(e) => {
                userTable.setRowsPerPage(parseInt(e.target.value, 10));
                userTable.setPage(0);
              }}
              onRowClick={handleUserSelect}
              loading={isUserLoading}
            />
          </div>
          <div className="flexBetweenCol" style={{ gap: "1rem", marginTop: "1rem" }}>
            <div className="flexBetween" style={{ width: "100%", gap: "1rem" }}>
              <InputCP title="학교 이름" activate={false} onChange={() => {}} value={selectedSchool?.name || ""} essential={true} />
              <InputCP title="학과 이름" activate={false} onChange={() => {}} value={selectedDepartment?.name || ""} essential={false} placeholder="필수X" />
              <InputCP title="이름" onChange={onChangeUserName} value={userName} essential={true} />
              <InputCP title="학번" onChange={onChangeUserStudentId} value={userStudentId} essential={true} />
              <InputCP title="전화번호" onChange={onChangeUserPhone} value={userPhone} essential={true} />
            </div>

            {!selectedUser && (
              <div style={{ height: "60px" }} onClick={handleUserAdd}>
                <ButtonCP height="3.875rem">사용자 등록</ButtonCP>
              </div>
            )}
            {selectedUser && (
              <div style={{ height: "60px" }} onClick={handleUserUpdate}>
                <ButtonCP height="3.875rem">사용자 수정</ButtonCP>
              </div>
            )}
          </div>
        </div>

        {/* 학사일정 목록 */}
        <div>
          <h4>
            학사일정 목록
            {selectedAcademicCalendar && <span style={{ color: "var(--main-color)", marginLeft: "10px" }}>(선택됨: ID {selectedAcademicCalendar.id})</span>}
            <span className="deleteBtn" onClick={handleAcademicCalendarDelete}>
              <DeleteIcon />
            </span>
          </h4>
          <div style={{ maxHeight: "800px" }}>
            <TableCP
              columns={academicCalendarTable.columns}
              rows={academicCalendarTable.pageRows}
              order={academicCalendarTable.order}
              orderBy={academicCalendarTable.orderBy}
              onSort={academicCalendarTable.handleSort}
              page={academicCalendarTable.page}
              rowsPerPage={academicCalendarTable.rowsPerPage}
              onPageChange={(e, newPage) => academicCalendarTable.setPage(newPage)}
              onRowsPerPageChange={(e) => {
                academicCalendarTable.setRowsPerPage(parseInt(e.target.value, 10));
                academicCalendarTable.setPage(0);
              }}
              onRowClick={handleAcademicCalendarSelect}
              loading={isAcademicCalendarLoading}
            />
          </div>
          <div className="flexBetweenCol" style={{ gap: "1rem", marginTop: "1rem" }}>
            <div className="flexBetween" style={{ width: "100%", gap: "1rem" }}>
              <InputCP title="학교 이름" activate={false} onChange={() => {}} value={selectedSchool?.name || ""} essential={true} />
              <InputCP title="학과 이름" activate={false} onChange={() => {}} value={selectedDepartment?.name || ""} essential={false} placeholder="필수X" />
              <InputCP title="일정 이름" onChange={onChangeScheduleName} value={scheduleName} essential={true} />
              <div style={{ width: "100%", height: "3.875rem", marginTop: "auto" }} className="flexBetween">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="일정 시작" value={startDate} onChange={setStartDate} format="YYYY-MM-DD" sx={{ width: "240px" }} />
                  <DatePicker label="일정 종료" value={endDate} onChange={setEndDate} format="YYYY-MM-DD" sx={{ width: "240px", marginLeft: "1rem" }} />
                </LocalizationProvider>
              </div>
            </div>
            <div className="flexBetween" style={{ width: "100%", gap: "1rem" }}>
              <InputCP title="일정 상세 내용" onChange={onChangeScheduleContent} value={scheduleContent} essential={true} />
              <InputCP
                title="타입"
                onChange={onChangeScheduleType}
                value={scheduleType}
                essential={true}
                placeholder="academic(학사), event(행사), holiday(휴일)"
              />
            </div>
            {!selectedAcademicCalendar && (
              <div style={{ height: "60px" }} onClick={handleAcademicCalendarAdd}>
                <ButtonCP height="3.875rem">일정 등록</ButtonCP>
              </div>
            )}
            {selectedAcademicCalendar && (
              <div style={{ height: "60px" }} onClick={handleAcademicCalendarUpdate}>
                <ButtonCP height="3.875rem">일정 수정</ButtonCP>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SchoolCP;
