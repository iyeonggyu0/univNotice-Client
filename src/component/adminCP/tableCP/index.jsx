import { useState, useCallback } from "react";
import "./style.css";
import { Refresh } from "@mui/icons-material";
import TableComponent from "../../_common/tableCP";
import useTableManager from "../../../hook/useTableManager";
import {
  adminTableUserLoad,
  adminTableSchoolLoad,
  adminTableDepartmentLoad,
  adminTableDeviceLoad,
  adminTableCategoryLoad,
  adminTableKeywordLoad,
  adminTableNoticeLoad,
  adminTableCrawlUrlLoad,
  adminTablePhoneVerificationLoad,
  adminTableQrSessionLoad,
  adminTableNoticeKeywordMatchLoad,
  adminTableNotificationQueueLoad,
  adminTableAcademicCalendarLoad,
} from "../../../api/admin/table";

const TableCP = () => {
  // 사용자 관련 테이블 상태
  const [userTable, setUserTable] = useState([]);
  const [isUserTableLoading, setIsUserTableLoading] = useState(false);
  const [phoneVerificationTable, setPhoneVerificationTable] = useState([]);
  const [isPhoneVerificationTableLoading, setIsPhoneVerificationTableLoading] = useState(false);
  const [deviceTable, setDeviceTable] = useState([]);
  const [isDeviceTableLoading, setIsDeviceTableLoading] = useState(false);
  const [qrSessionTable, setQrSessionTable] = useState([]);
  const [isQrSessionTableLoading, setIsQrSessionTableLoading] = useState(false);

  // 학교 관련 테이블 상태
  const [schoolTable, setSchoolTable] = useState([]);
  const [isSchoolTableLoading, setIsSchoolTableLoading] = useState(false);
  const [departmentTable, setDepartmentTable] = useState([]);
  const [isDepartmentTableLoading, setIsDepartmentTableLoading] = useState(false);
  const [academicCalendarTable, setAcademicCalendarTable] = useState([]);
  const [isAcademicCalendarTableLoading, setIsAcademicCalendarTableLoading] = useState(false);

  // 콘텐츠 관련 테이블 상태
  const [noticeTable, setNoticeTable] = useState([]);
  const [isNoticeTableLoading, setIsNoticeTableLoading] = useState(false);
  const [categoryTable, setCategoryTable] = useState([]);
  const [isCategoryTableLoading, setIsCategoryTableLoading] = useState(false);
  const [keywordTable, setKeywordTable] = useState([]);
  const [isKeywordTableLoading, setIsKeywordTableLoading] = useState(false);
  const [crawlUrlTable, setCrawlUrlTable] = useState([]);
  const [isCrawlUrlTableLoading, setIsCrawlUrlTableLoading] = useState(false);

  // 알림 관련 테이블 상태
  const [noticeKeywordMatchTable, setNoticeKeywordMatchTable] = useState([]);
  const [isNoticeKeywordMatchTableLoading, setIsNoticeKeywordMatchTableLoading] = useState(false);
  const [notificationQueueTable, setNotificationQueueTable] = useState([]);
  const [isNotificationQueueTableLoading, setIsNotificationQueueTableLoading] = useState(false);

  // useTableManager 훅 적용
  const userTableManager = useTableManager(userTable);
  const phoneVerificationTableManager = useTableManager(phoneVerificationTable);
  const deviceTableManager = useTableManager(deviceTable);
  const qrSessionTableManager = useTableManager(qrSessionTable);

  const schoolTableManager = useTableManager(schoolTable);
  const departmentTableManager = useTableManager(departmentTable);
  const academicCalendarTableManager = useTableManager(academicCalendarTable);

  const noticeTableManager = useTableManager(noticeTable);
  const categoryTableManager = useTableManager(categoryTable);
  const keywordTableManager = useTableManager(keywordTable);
  const crawlUrlTableManager = useTableManager(crawlUrlTable);

  const noticeKeywordMatchTableManager = useTableManager(noticeKeywordMatchTable);
  const notificationQueueTableManager = useTableManager(notificationQueueTable);

  // 사용자 관련 테이블 로딩 함수
  const loadUserTable = useCallback(async (e) => {
    if (e) e.preventDefault();
    setIsUserTableLoading(true);
    try {
      const data = await adminTableUserLoad();
      setUserTable(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
    setIsUserTableLoading(false);
  }, []);

  const loadPhoneVerificationTable = useCallback(async (e) => {
    if (e) e.preventDefault();
    setIsPhoneVerificationTableLoading(true);
    try {
      const data = await adminTablePhoneVerificationLoad();
      setPhoneVerificationTable(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
    setIsPhoneVerificationTableLoading(false);
  }, []);

  const loadDeviceTable = useCallback(async (e) => {
    if (e) e.preventDefault();
    setIsDeviceTableLoading(true);
    try {
      const data = await adminTableDeviceLoad();
      setDeviceTable(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
    setIsDeviceTableLoading(false);
  }, []);

  const loadQrSessionTable = useCallback(async (e) => {
    if (e) e.preventDefault();
    setIsQrSessionTableLoading(true);
    try {
      const data = await adminTableQrSessionLoad();
      setQrSessionTable(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
    setIsQrSessionTableLoading(false);
  }, []);

  // 학교 관련 테이블 로딩 함수
  const loadSchoolTable = useCallback(async (e) => {
    if (e) e.preventDefault();
    setIsSchoolTableLoading(true);
    try {
      const data = await adminTableSchoolLoad();
      setSchoolTable(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
    setIsSchoolTableLoading(false);
  }, []);

  const loadDepartmentTable = useCallback(async (e) => {
    if (e) e.preventDefault();
    setIsDepartmentTableLoading(true);
    try {
      const data = await adminTableDepartmentLoad();
      setDepartmentTable(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
    setIsDepartmentTableLoading(false);
  }, []);

  const loadAcademicCalendarTable = useCallback(async (e) => {
    if (e) e.preventDefault();
    setIsAcademicCalendarTableLoading(true);
    try {
      const data = await adminTableAcademicCalendarLoad();
      setAcademicCalendarTable(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
    setIsAcademicCalendarTableLoading(false);
  }, []);

  // 콘텐츠 관련 테이블 로딩 함수
  const loadNoticeTable = useCallback(async (e) => {
    if (e) e.preventDefault();
    setIsNoticeTableLoading(true);
    try {
      const data = await adminTableNoticeLoad();
      setNoticeTable(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
    setIsNoticeTableLoading(false);
  }, []);

  const loadCategoryTable = useCallback(async (e) => {
    if (e) e.preventDefault();
    setIsCategoryTableLoading(true);
    try {
      const data = await adminTableCategoryLoad();
      setCategoryTable(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
    setIsCategoryTableLoading(false);
  }, []);

  const loadKeywordTable = useCallback(async (e) => {
    if (e) e.preventDefault();
    setIsKeywordTableLoading(true);
    try {
      const data = await adminTableKeywordLoad();
      setKeywordTable(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
    setIsKeywordTableLoading(false);
  }, []);

  const loadCrawlUrlTable = useCallback(async (e) => {
    if (e) e.preventDefault();
    setIsCrawlUrlTableLoading(true);
    try {
      const data = await adminTableCrawlUrlLoad();
      setCrawlUrlTable(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
    setIsCrawlUrlTableLoading(false);
  }, []);

  // 알림 관련 테이블 로딩 함수
  const loadNoticeKeywordMatchTable = useCallback(async (e) => {
    if (e) e.preventDefault();
    setIsNoticeKeywordMatchTableLoading(true);
    try {
      const data = await adminTableNoticeKeywordMatchLoad();
      setNoticeKeywordMatchTable(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
    setIsNoticeKeywordMatchTableLoading(false);
  }, []);

  const loadNotificationQueueTable = useCallback(async (e) => {
    if (e) e.preventDefault();
    setIsNotificationQueueTableLoading(true);
    try {
      const data = await adminTableNotificationQueueLoad();
      setNotificationQueueTable(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
    }
    setIsNotificationQueueTableLoading(false);
  }, []);

  return (
    <div className="tableCp">
      <h2>테이블 조회 데이터</h2>
      <div className="tableCp-content">
        {/* 사용자 관련 테이블 그룹 */}
        <div className="table-group">
          <h3 className="group-title">사용자 관련</h3>

          {/* 유저 테이블 */}
          <div>
            <h4>
              유저 테이블
              <span
                className="refreshBtn"
                style={{ color: isUserTableLoading ? `var(--black-4)` : `var(--main-color)`, cursor: "pointer" }}
                onClick={(e) => {
                  if (!isUserTableLoading) loadUserTable(e);
                }}>
                <Refresh />
              </span>
            </h4>
            <div style={{ maxHeight: "800px" }}>
              <TableComponent
                columns={userTableManager.columns}
                rows={userTableManager.pageRows}
                order={userTableManager.order}
                orderBy={userTableManager.orderBy}
                onSort={userTableManager.handleSort}
                page={userTableManager.page}
                rowsPerPage={userTableManager.rowsPerPage}
                onPageChange={(e, newPage) => userTableManager.setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  userTableManager.setRowsPerPage(parseInt(e.target.value, 10));
                  userTableManager.setPage(0);
                }}
                loading={isUserTableLoading}
              />
            </div>
          </div>

          {/* 휴대폰 인증 테이블 */}
          <div>
            <h4>
              휴대폰 인증 테이블
              <span
                className="refreshBtn"
                style={{ color: isPhoneVerificationTableLoading ? `var(--black-4)` : `var(--main-color)`, cursor: "pointer" }}
                onClick={(e) => {
                  if (!isPhoneVerificationTableLoading) loadPhoneVerificationTable(e);
                }}>
                <Refresh />
              </span>
            </h4>
            <div style={{ maxHeight: "800px" }}>
              <TableComponent
                columns={phoneVerificationTableManager.columns}
                rows={phoneVerificationTableManager.pageRows}
                order={phoneVerificationTableManager.order}
                orderBy={phoneVerificationTableManager.orderBy}
                onSort={phoneVerificationTableManager.handleSort}
                page={phoneVerificationTableManager.page}
                rowsPerPage={phoneVerificationTableManager.rowsPerPage}
                onPageChange={(e, newPage) => phoneVerificationTableManager.setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  phoneVerificationTableManager.setRowsPerPage(parseInt(e.target.value, 10));
                  phoneVerificationTableManager.setPage(0);
                }}
                loading={isPhoneVerificationTableLoading}
              />
            </div>
          </div>

          {/* 디바이스 테이블 */}
          <div>
            <h4>
              디바이스 테이블
              <span
                className="refreshBtn"
                style={{ color: isDeviceTableLoading ? `var(--black-4)` : `var(--main-color)`, cursor: "pointer" }}
                onClick={(e) => {
                  if (!isDeviceTableLoading) loadDeviceTable(e);
                }}>
                <Refresh />
              </span>
            </h4>
            <div style={{ maxHeight: "800px" }}>
              <TableComponent
                columns={deviceTableManager.columns}
                rows={deviceTableManager.pageRows}
                order={deviceTableManager.order}
                orderBy={deviceTableManager.orderBy}
                onSort={deviceTableManager.handleSort}
                page={deviceTableManager.page}
                rowsPerPage={deviceTableManager.rowsPerPage}
                onPageChange={(e, newPage) => deviceTableManager.setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  deviceTableManager.setRowsPerPage(parseInt(e.target.value, 10));
                  deviceTableManager.setPage(0);
                }}
                loading={isDeviceTableLoading}
              />
            </div>
          </div>

          {/* QR 세션 테이블 */}
          <div>
            <h4>
              QR 세션 테이블
              <span
                className="refreshBtn"
                style={{ color: isQrSessionTableLoading ? `var(--black-4)` : `var(--main-color)`, cursor: "pointer" }}
                onClick={(e) => {
                  if (!isQrSessionTableLoading) loadQrSessionTable(e);
                }}>
                <Refresh />
              </span>
            </h4>
            <div style={{ maxHeight: "800px" }}>
              <TableComponent
                columns={qrSessionTableManager.columns}
                rows={qrSessionTableManager.pageRows}
                order={qrSessionTableManager.order}
                orderBy={qrSessionTableManager.orderBy}
                onSort={qrSessionTableManager.handleSort}
                page={qrSessionTableManager.page}
                rowsPerPage={qrSessionTableManager.rowsPerPage}
                onPageChange={(e, newPage) => qrSessionTableManager.setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  qrSessionTableManager.setRowsPerPage(parseInt(e.target.value, 10));
                  qrSessionTableManager.setPage(0);
                }}
                loading={isQrSessionTableLoading}
              />
            </div>
          </div>
        </div>

        {/* 학교 관련 테이블 그룹 */}
        <div className="table-group">
          <h3 className="group-title">학교 관련</h3>

          {/* 학교 테이블 */}
          <div>
            <h4>
              학교 테이블
              <span
                className="refreshBtn"
                style={{ color: isSchoolTableLoading ? `var(--black-4)` : `var(--main-color)`, cursor: "pointer" }}
                onClick={(e) => {
                  if (!isSchoolTableLoading) loadSchoolTable(e);
                }}>
                <Refresh />
              </span>
            </h4>
            <div style={{ maxHeight: "800px" }}>
              <TableComponent
                columns={schoolTableManager.columns}
                rows={schoolTableManager.pageRows}
                order={schoolTableManager.order}
                orderBy={schoolTableManager.orderBy}
                onSort={schoolTableManager.handleSort}
                page={schoolTableManager.page}
                rowsPerPage={schoolTableManager.rowsPerPage}
                onPageChange={(e, newPage) => schoolTableManager.setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  schoolTableManager.setRowsPerPage(parseInt(e.target.value, 10));
                  schoolTableManager.setPage(0);
                }}
                loading={isSchoolTableLoading}
              />
            </div>
          </div>

          {/* 학과 테이블 */}
          <div>
            <h4>
              학과 테이블
              <span
                className="refreshBtn"
                style={{ color: isDepartmentTableLoading ? `var(--black-4)` : `var(--main-color)`, cursor: "pointer" }}
                onClick={(e) => {
                  if (!isDepartmentTableLoading) loadDepartmentTable(e);
                }}>
                <Refresh />
              </span>
            </h4>
            <div style={{ maxHeight: "800px" }}>
              <TableComponent
                columns={departmentTableManager.columns}
                rows={departmentTableManager.pageRows}
                order={departmentTableManager.order}
                orderBy={departmentTableManager.orderBy}
                onSort={departmentTableManager.handleSort}
                page={departmentTableManager.page}
                rowsPerPage={departmentTableManager.rowsPerPage}
                onPageChange={(e, newPage) => departmentTableManager.setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  departmentTableManager.setRowsPerPage(parseInt(e.target.value, 10));
                  departmentTableManager.setPage(0);
                }}
                loading={isDepartmentTableLoading}
              />
            </div>
          </div>

          {/* 학사일정 테이블 */}
          <div>
            <h4>
              학사일정 테이블
              <span
                className="refreshBtn"
                style={{ color: isAcademicCalendarTableLoading ? `var(--black-4)` : `var(--main-color)`, cursor: "pointer" }}
                onClick={(e) => {
                  if (!isAcademicCalendarTableLoading) loadAcademicCalendarTable(e);
                }}>
                <Refresh />
              </span>
            </h4>
            <div style={{ maxHeight: "800px" }}>
              <TableComponent
                columns={academicCalendarTableManager.columns}
                rows={academicCalendarTableManager.pageRows}
                order={academicCalendarTableManager.order}
                orderBy={academicCalendarTableManager.orderBy}
                onSort={academicCalendarTableManager.handleSort}
                page={academicCalendarTableManager.page}
                rowsPerPage={academicCalendarTableManager.rowsPerPage}
                onPageChange={(e, newPage) => academicCalendarTableManager.setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  academicCalendarTableManager.setRowsPerPage(parseInt(e.target.value, 10));
                  academicCalendarTableManager.setPage(0);
                }}
                loading={isAcademicCalendarTableLoading}
              />
            </div>
          </div>
        </div>

        {/* 콘텐츠 관련 테이블 그룹 */}
        <div className="table-group">
          <h3 className="group-title">콘텐츠 관련</h3>

          {/* 공지 테이블 */}
          <div>
            <h4>
              공지 테이블
              <span
                className="refreshBtn"
                style={{ color: isNoticeTableLoading ? `var(--black-4)` : `var(--main-color)`, cursor: "pointer" }}
                onClick={(e) => {
                  if (!isNoticeTableLoading) loadNoticeTable(e);
                }}>
                <Refresh />
              </span>
            </h4>
            <div style={{ maxHeight: "800px" }}>
              <TableComponent
                columns={noticeTableManager.columns}
                rows={noticeTableManager.pageRows}
                order={noticeTableManager.order}
                orderBy={noticeTableManager.orderBy}
                onSort={noticeTableManager.handleSort}
                page={noticeTableManager.page}
                rowsPerPage={noticeTableManager.rowsPerPage}
                onPageChange={(e, newPage) => noticeTableManager.setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  noticeTableManager.setRowsPerPage(parseInt(e.target.value, 10));
                  noticeTableManager.setPage(0);
                }}
                loading={isNoticeTableLoading}
              />
            </div>
          </div>

          {/* 카테고리 테이블 */}
          <div>
            <h4>
              카테고리 테이블
              <span
                className="refreshBtn"
                style={{ color: isCategoryTableLoading ? `var(--black-4)` : `var(--main-color)`, cursor: "pointer" }}
                onClick={(e) => {
                  if (!isCategoryTableLoading) loadCategoryTable(e);
                }}>
                <Refresh />
              </span>
            </h4>
            <div style={{ maxHeight: "800px" }}>
              <TableComponent
                columns={categoryTableManager.columns}
                rows={categoryTableManager.pageRows}
                order={categoryTableManager.order}
                orderBy={categoryTableManager.orderBy}
                onSort={categoryTableManager.handleSort}
                page={categoryTableManager.page}
                rowsPerPage={categoryTableManager.rowsPerPage}
                onPageChange={(e, newPage) => categoryTableManager.setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  categoryTableManager.setRowsPerPage(parseInt(e.target.value, 10));
                  categoryTableManager.setPage(0);
                }}
                loading={isCategoryTableLoading}
              />
            </div>
          </div>

          {/* 키워드 테이블 */}
          <div>
            <h4>
              키워드 테이블
              <span
                className="refreshBtn"
                style={{ color: isKeywordTableLoading ? `var(--black-4)` : `var(--main-color)`, cursor: "pointer" }}
                onClick={(e) => {
                  if (!isKeywordTableLoading) loadKeywordTable(e);
                }}>
                <Refresh />
              </span>
            </h4>
            <div style={{ maxHeight: "800px" }}>
              <TableComponent
                columns={keywordTableManager.columns}
                rows={keywordTableManager.pageRows}
                order={keywordTableManager.order}
                orderBy={keywordTableManager.orderBy}
                onSort={keywordTableManager.handleSort}
                page={keywordTableManager.page}
                rowsPerPage={keywordTableManager.rowsPerPage}
                onPageChange={(e, newPage) => keywordTableManager.setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  keywordTableManager.setRowsPerPage(parseInt(e.target.value, 10));
                  keywordTableManager.setPage(0);
                }}
                loading={isKeywordTableLoading}
              />
            </div>
          </div>

          {/* 크롤링 URL 테이블 */}
          <div>
            <h4>
              크롤링 URL 테이블
              <span
                className="refreshBtn"
                style={{ color: isCrawlUrlTableLoading ? `var(--black-4)` : `var(--main-color)`, cursor: "pointer" }}
                onClick={(e) => {
                  if (!isCrawlUrlTableLoading) loadCrawlUrlTable(e);
                }}>
                <Refresh />
              </span>
            </h4>
            <div style={{ maxHeight: "800px" }}>
              <TableComponent
                columns={crawlUrlTableManager.columns}
                rows={crawlUrlTableManager.pageRows}
                order={crawlUrlTableManager.order}
                orderBy={crawlUrlTableManager.orderBy}
                onSort={crawlUrlTableManager.handleSort}
                page={crawlUrlTableManager.page}
                rowsPerPage={crawlUrlTableManager.rowsPerPage}
                onPageChange={(e, newPage) => crawlUrlTableManager.setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  crawlUrlTableManager.setRowsPerPage(parseInt(e.target.value, 10));
                  crawlUrlTableManager.setPage(0);
                }}
                loading={isCrawlUrlTableLoading}
              />
            </div>
          </div>
        </div>

        {/* 알림 관련 테이블 그룹 */}
        <div className="table-group">
          <h3 className="group-title">알림 관련</h3>

          {/* 공지-키워드 매칭 테이블 */}
          <div>
            <h4>
              공지-키워드 매칭 테이블
              <span
                className="refreshBtn"
                style={{ color: isNoticeKeywordMatchTableLoading ? `var(--black-4)` : `var(--main-color)`, cursor: "pointer" }}
                onClick={(e) => {
                  if (!isNoticeKeywordMatchTableLoading) loadNoticeKeywordMatchTable(e);
                }}>
                <Refresh />
              </span>
            </h4>
            <div style={{ maxHeight: "800px" }}>
              <TableComponent
                columns={noticeKeywordMatchTableManager.columns}
                rows={noticeKeywordMatchTableManager.pageRows}
                order={noticeKeywordMatchTableManager.order}
                orderBy={noticeKeywordMatchTableManager.orderBy}
                onSort={noticeKeywordMatchTableManager.handleSort}
                page={noticeKeywordMatchTableManager.page}
                rowsPerPage={noticeKeywordMatchTableManager.rowsPerPage}
                onPageChange={(e, newPage) => noticeKeywordMatchTableManager.setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  noticeKeywordMatchTableManager.setRowsPerPage(parseInt(e.target.value, 10));
                  noticeKeywordMatchTableManager.setPage(0);
                }}
                loading={isNoticeKeywordMatchTableLoading}
              />
            </div>
          </div>

          {/* 알림 큐 테이블 */}
          <div>
            <h4>
              알림 큐 테이블
              <span
                className="refreshBtn"
                style={{ color: isNotificationQueueTableLoading ? `var(--black-4)` : `var(--main-color)`, cursor: "pointer" }}
                onClick={(e) => {
                  if (!isNotificationQueueTableLoading) loadNotificationQueueTable(e);
                }}>
                <Refresh />
              </span>
            </h4>
            <div style={{ maxHeight: "800px" }}>
              <TableComponent
                columns={notificationQueueTableManager.columns}
                rows={notificationQueueTableManager.pageRows}
                order={notificationQueueTableManager.order}
                orderBy={notificationQueueTableManager.orderBy}
                onSort={notificationQueueTableManager.handleSort}
                page={notificationQueueTableManager.page}
                rowsPerPage={notificationQueueTableManager.rowsPerPage}
                onPageChange={(e, newPage) => notificationQueueTableManager.setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  notificationQueueTableManager.setRowsPerPage(parseInt(e.target.value, 10));
                  notificationQueueTableManager.setPage(0);
                }}
                loading={isNotificationQueueTableLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TableCP;
