import { useState, useMemo } from "react";

/**
 * 테이블 데이터의 정렬과 페이지네이션을 관리하는 커스텀 React 훅입니다.
 *
 * @param {Array<Object>} data - 테이블 데이터 배열.
 * @param {Object} [options={}] - 테이블 매니저의 옵션 설정 객체.
 * @param {string} [options.defaultOrder="desc"] - 초기 정렬 순서 ("asc" 또는 "desc").
 * @param {string} [options.defaultOrderBy=""] - 초기 정렬 기준 컬럼명.
 * @param {number} [options.defaultRowsPerPage=10] - 초기 페이지당 행 개수.
 *
 * @returns {Object} 테이블 매니저 상태와 핸들러 객체.
 * @returns {string[]} returns.columns - 데이터에서 추출한 컬럼명 배열.
 * @returns {Object[]} returns.pageRows - 현재 페이지에 표시할(정렬된) 행 배열.
 * @returns {string} returns.order - 현재 정렬 순서 ("asc" 또는 "desc").
 * @returns {string} returns.orderBy - 현재 정렬 기준 컬럼명.
 * @returns {number} returns.page - 현재 페이지 인덱스(0부터 시작).
 * @returns {number} returns.rowsPerPage - 페이지당 행 개수.
 * @returns {number} returns.totalCount - 전체 데이터 개수.
 * @returns {Function} returns.setPage - 현재 페이지 변경 함수.
 * @returns {Function} returns.setRowsPerPage - 페이지당 행 개수 변경 함수.
 * @returns {Function} returns.handleSort - 정렬 기준 컬럼 및 순서 변경 핸들러.
 */
const useTableManager = (data = [], options = {}) => {
  const { defaultOrder = "desc", defaultOrderBy = "", defaultRowsPerPage = 10 } = options;

  const [order, setOrder] = useState(defaultOrder);
  const [orderBy, setOrderBy] = useState(defaultOrderBy);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  // 정렬 함수
  const sortFn = (a, b) => {
    if (!orderBy) return 0;
    if (order === "desc") return b[orderBy] > a[orderBy] ? 1 : -1;
    return a[orderBy] > b[orderBy] ? 1 : -1;
  };

  // 컬럼 추출
  const columns = useMemo(() => (data[0] ? Object.keys(data[0]) : []), [data]);

  // 현재 페이지 데이터
  const pageRows = useMemo(() => {
    const sorted = [...data].sort(sortFn);
    return sorted.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  }, [data, order, orderBy, page, rowsPerPage, sortFn]);

  // 정렬 변경 핸들러
  const handleSort = (col) => {
    setOrderBy(col);
    setOrder(orderBy === col && order === "asc" ? "desc" : "asc");
  };

  return {
    columns,
    pageRows,
    order,
    orderBy,
    page,
    rowsPerPage,
    totalCount: data.length, // 전체 데이터 개수 추가
    setPage,
    setRowsPerPage,
    handleSort,
  };
};

export default useTableManager;
