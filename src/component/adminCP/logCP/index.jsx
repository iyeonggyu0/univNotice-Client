import { useState, useCallback } from "react";
import "./style.css";
import { Refresh } from "@mui/icons-material";
import TableCP from "../../_common/tableCP";
import useTableManager from "../../../hook/useTableManager";

import { adminSystemLogLoad } from "../../../api/admin/log";
import { adminUserLogLoad, adminCrawlingLogLoad, adminLogLoad } from "../../../api/admin/log";

const LogCP = () => {
  // 로그 데이터 및 로딩 상태
  const [systemLogs, setSystemLogs] = useState([]);
  const [isSysLogLoading, setIsSysLogLoading] = useState(false);
  const [userLogs, setUserLogs] = useState([]);
  const [isUserLogLoading, setIsUserLogLoading] = useState(false);
  const [crawlingLogs, setCrawlingLogs] = useState([]);
  const [isCrawlingLogLoading, setIsCrawlingLogLoading] = useState(false);
  const [adminLogs, setAdminLogs] = useState([]);
  const [isAdminLogLoading, setIsAdminLogLoading] = useState(false);

  // useTableManager 훅 적용
  const sysTable = useTableManager(systemLogs);
  const userTable = useTableManager(userLogs);
  const crawlingTable = useTableManager(crawlingLogs);
  const adminTable = useTableManager(adminLogs);

  // 각 로그별 비동기 데이터 로딩
  const systemLogLoad = useCallback(async (e) => {
    if (e) e.preventDefault();
    setIsSysLogLoading(true);
    try {
      const logs = await adminSystemLogLoad();
      setSystemLogs(Array.isArray(logs) ? logs : []);
    } catch (e) {
      console.error(e);
    }
    setIsSysLogLoading(false);
  }, []);

  const userLogLoad = useCallback(async (e) => {
    if (e) e.preventDefault();
    setIsUserLogLoading(true);
    try {
      const logs = await adminUserLogLoad();
      setUserLogs(Array.isArray(logs) ? logs : []);
    } catch (e) {
      console.error(e);
    }
    setIsUserLogLoading(false);
  }, []);

  const crawlingLogLoad = useCallback(async (e) => {
    if (e) e.preventDefault();
    setIsCrawlingLogLoading(true);
    try {
      const logs = await adminCrawlingLogLoad();
      setCrawlingLogs(Array.isArray(logs) ? logs : []);
    } catch (e) {
      console.error(e);
    }
    setIsCrawlingLogLoading(false);
  }, []);

  const adminLogLoadFn = useCallback(async (e) => {
    if (e) e.preventDefault();
    setIsAdminLogLoading(true);
    try {
      const logs = await adminLogLoad();
      setAdminLogs(Array.isArray(logs) ? logs : []);
    } catch (e) {
      console.error(e);
    }
    setIsAdminLogLoading(false);
  }, []);

  return (
    <div className="logCp">
      <h2>로그</h2>
      <div className="logCp-content">
        {/* 시스템 로그 */}
        <div>
          <h4>
            시스템 로그
            <span
              className="refreshBtn"
              style={{ color: isSysLogLoading ? `var(--black-4)` : `var(--main-color)`, cursor: "pointer" }}
              onClick={(e) => {
                if (!isSysLogLoading) systemLogLoad(e);
              }}>
              <Refresh />
            </span>
          </h4>
          <div style={{ maxHeight: "800px" }}>
            <TableCP
              columns={sysTable.columns}
              rows={sysTable.pageRows}
              order={sysTable.order}
              orderBy={sysTable.orderBy}
              onSort={sysTable.handleSort}
              page={sysTable.page}
              rowsPerPage={sysTable.rowsPerPage}
              totalCount={sysTable.totalCount}
              onPageChange={(e, newPage) => sysTable.setPage(newPage)}
              onRowsPerPageChange={(e) => {
                sysTable.setRowsPerPage(parseInt(e.target.value, 10));
                sysTable.setPage(0);
              }}
              loading={isSysLogLoading}
            />
          </div>
        </div>

        {/* 사용자 로그 */}
        <div>
          <h4>
            사용자 로그
            <span
              className="refreshBtn"
              style={{ color: isUserLogLoading ? `var(--black-4)` : `var(--main-color)`, cursor: "pointer" }}
              onClick={(e) => {
                if (!isUserLogLoading) userLogLoad(e);
              }}>
              <Refresh />
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
              loading={isUserLogLoading}
            />
          </div>
        </div>

        {/* 크롤링 로그 */}
        <div>
          <h4>
            크롤링 로그
            <span
              className="refreshBtn"
              style={{ color: isCrawlingLogLoading ? `var(--black-4)` : `var(--main-color)`, cursor: "pointer" }}
              onClick={(e) => {
                if (!isCrawlingLogLoading) crawlingLogLoad(e);
              }}>
              <Refresh />
            </span>
          </h4>
          <div style={{ maxHeight: "800px" }}>
            <TableCP
              columns={crawlingTable.columns}
              rows={crawlingTable.pageRows}
              order={crawlingTable.order}
              orderBy={crawlingTable.orderBy}
              onSort={crawlingTable.handleSort}
              page={crawlingTable.page}
              rowsPerPage={crawlingTable.rowsPerPage}
              totalCount={crawlingTable.totalCount}
              onPageChange={(e, newPage) => crawlingTable.setPage(newPage)}
              onRowsPerPageChange={(e) => {
                crawlingTable.setRowsPerPage(parseInt(e.target.value, 10));
                crawlingTable.setPage(0);
              }}
              loading={isCrawlingLogLoading}
            />
          </div>
        </div>

        {/* 어드민 로그 */}
        <div>
          <h4>
            어드민 로그
            <span
              className="refreshBtn"
              style={{ color: isAdminLogLoading ? `var(--black-4)` : `var(--main-color)`, cursor: "pointer" }}
              onClick={(e) => {
                if (!isAdminLogLoading) adminLogLoadFn(e);
              }}>
              <Refresh />
            </span>
          </h4>
          <div style={{ maxHeight: "800px" }}>
            <TableCP
              columns={adminTable.columns}
              rows={adminTable.pageRows}
              order={adminTable.order}
              orderBy={adminTable.orderBy}
              onSort={adminTable.handleSort}
              page={adminTable.page}
              rowsPerPage={adminTable.rowsPerPage}
              totalCount={adminTable.totalCount}
              onPageChange={(e, newPage) => adminTable.setPage(newPage)}
              onRowsPerPageChange={(e) => {
                adminTable.setRowsPerPage(parseInt(e.target.value, 10));
                adminTable.setPage(0);
              }}
              loading={isAdminLogLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogCP;
