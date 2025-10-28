import { useEffect, useState, useCallback } from "react";
import { Refresh } from "@mui/icons-material";
import TableComponent from "../../_common/tableCP";
import useTableManager from "../../../hook/useTableManager";
import { adminSchoolLoad } from "../../../api/admin/school";
import {
  adminBusStopLoad,
  adminBusTimetableLoad,
  adminBusStopCreate,
  adminBusStopUpdate,
  adminBusTimetableCreate,
  adminBusTimetableUpdate,
} from "../../../api/admin/bus";
import "./style.css";

const BusCP = () => {
  const [schoolList, setSchoolList] = useState([]);
  const [busStopList, setBusStopList] = useState([]);
  const [timetableList, setTimetableList] = useState([]);

  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedBusStop, setSelectedBusStop] = useState(null);
  const [selectedTimetable, setSelectedTimetable] = useState(null);

  const [busStopName, setBusStopName] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");

  const [isBusStopSaving, setIsBusStopSaving] = useState(false);
  const [isTimetableSaving, setIsTimetableSaving] = useState(false);

  const [isSchoolLoading, setIsSchoolLoading] = useState(false);
  const [isBusStopLoading, setIsBusStopLoading] = useState(false);
  const [isTimetableLoading, setIsTimetableLoading] = useState(false);

  const schoolTableManager = useTableManager(schoolList, { defaultOrderBy: "id" });
  const busStopTableManager = useTableManager(busStopList, { defaultOrderBy: "id" });
  const timetableTableManager = useTableManager(timetableList, { defaultOrder: "asc", defaultOrderBy: "arrival_time" });

  const normalizeTimeInput = (value) => {
    if (!value || typeof value !== "string") return "";
    return value.length >= 5 ? value.slice(0, 5) : value;
  };

  const loadSchoolList = useCallback(async () => {
    setIsSchoolLoading(true);
    try {
      const rows = await adminSchoolLoad();
      setSchoolList(Array.isArray(rows) ? rows : []);
    } catch (error) {
      console.error("학교 목록 로드 실패", error);
    } finally {
      setIsSchoolLoading(false);
    }
  }, []);

  const loadBusStopList = useCallback(async (schoolId) => {
    if (!schoolId) {
      setBusStopList([]);
      return;
    }
    setIsBusStopLoading(true);
    try {
      const rows = await adminBusStopLoad(schoolId);
      setBusStopList(Array.isArray(rows) ? rows : []);
    } catch (error) {
      console.error("셔틀 정류장 로드 실패", error);
    } finally {
      setIsBusStopLoading(false);
    }
  }, []);

  const loadTimetableList = useCallback(async (busStopId) => {
    if (!busStopId) {
      setTimetableList([]);
      return;
    }
    setIsTimetableLoading(true);
    try {
      const rows = await adminBusTimetableLoad(busStopId);
      setTimetableList(Array.isArray(rows) ? rows : []);
    } catch (error) {
      console.error("셔틀 시간표 로드 실패", error);
    } finally {
      setIsTimetableLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSchoolList();
  }, [loadSchoolList]);

  useEffect(() => {
    if (!selectedSchool) {
      setBusStopList([]);
      setSelectedBusStop(null);
      setTimetableList([]);
      setSelectedTimetable(null);
      setBusStopName("");
      setArrivalTime("");
      return;
    }
    setSelectedBusStop(null);
    setTimetableList([]);
    setSelectedTimetable(null);
    setBusStopName("");
    setArrivalTime("");
    loadBusStopList(selectedSchool.id);
  }, [selectedSchool, loadBusStopList]);

  useEffect(() => {
    if (!selectedBusStop) {
      setTimetableList([]);
      setSelectedTimetable(null);
      setArrivalTime("");
      return;
    }
    setSelectedTimetable(null);
    setArrivalTime("");
    loadTimetableList(selectedBusStop.id);
  }, [selectedBusStop, loadTimetableList]);

  useEffect(() => {
    if (selectedBusStop) {
      setBusStopName(selectedBusStop.name ?? "");
    } else {
      setBusStopName("");
    }
  }, [selectedBusStop]);

  useEffect(() => {
    if (selectedTimetable) {
      setArrivalTime(normalizeTimeInput(selectedTimetable.arrival_time));
    } else {
      setArrivalTime("");
    }
  }, [selectedTimetable]);

  const handleSchoolClick = (row) => {
    if (!row) return;
    setSelectedSchool(row);
  };

  const handleBusStopClick = (row) => {
    if (!row) return;
    setSelectedBusStop(row);
  };

  const handleTimetableClick = (row) => {
    if (!row) return;
    setSelectedTimetable(row);
  };

  const handleResetBusStopForm = () => {
    setSelectedBusStop(null);
    setBusStopName("");
    setTimetableList([]);
    setSelectedTimetable(null);
    setArrivalTime("");
  };

  const handleCreateBusStop = async (e) => {
    e.preventDefault();
    if (!selectedSchool) {
      alert("학교를 먼저 선택하세요.");
      return;
    }
    if (!busStopName.trim()) {
      alert("정류장 이름을 입력하세요.");
      return;
    }
    setIsBusStopSaving(true);
    try {
      const rows = await adminBusStopCreate({ school_id: selectedSchool.id, name: busStopName.trim() });
      if (Array.isArray(rows)) {
        setBusStopList(rows);
        const newest = rows.reduce((latest, current) => (!latest || current.id > latest.id ? current : latest), null);
        if (newest) {
          setSelectedBusStop(newest);
        }
      }
    } finally {
      setIsBusStopSaving(false);
    }
  };

  const handleUpdateBusStop = async () => {
    if (!selectedSchool || !selectedBusStop) {
      alert("수정할 정류장을 선택하세요.");
      return;
    }
    if (!busStopName.trim()) {
      alert("정류장 이름을 입력하세요.");
      return;
    }
    setIsBusStopSaving(true);
    try {
      const rows = await adminBusStopUpdate(selectedBusStop.id, { name: busStopName.trim() });
      if (Array.isArray(rows)) {
        setBusStopList(rows);
        const updated = rows.find((item) => item.id === selectedBusStop.id);
        if (updated) {
          setSelectedBusStop(updated);
        } else {
          setSelectedBusStop(null);
        }
      }
    } finally {
      setIsBusStopSaving(false);
    }
  };

  const handleResetTimetableForm = () => {
    setSelectedTimetable(null);
    setArrivalTime("");
  };

  const handleCreateTimetable = async (e) => {
    e.preventDefault();
    if (!selectedSchool || !selectedBusStop) {
      alert("학교와 정류장을 먼저 선택하세요.");
      return;
    }
    if (!arrivalTime) {
      alert("도착 시간을 입력하세요.");
      return;
    }
    setIsTimetableSaving(true);
    try {
      const rows = await adminBusTimetableCreate({
        school_id: selectedSchool.id,
        bus_stop_id: selectedBusStop.id,
        arrival_time: arrivalTime,
      });
      if (Array.isArray(rows)) {
        setTimetableList(rows);
        const newest = rows.reduce((latest, current) => (!latest || current.id > latest.id ? current : latest), null);
        if (newest) {
          setSelectedTimetable(newest);
        }
      }
    } finally {
      setIsTimetableSaving(false);
    }
  };

  const handleUpdateTimetable = async () => {
    if (!selectedTimetable) {
      alert("수정할 시간표를 선택하세요.");
      return;
    }
    if (!arrivalTime) {
      alert("도착 시간을 입력하세요.");
      return;
    }
    setIsTimetableSaving(true);
    try {
      const rows = await adminBusTimetableUpdate(selectedTimetable.id, { arrival_time: arrivalTime });
      if (Array.isArray(rows)) {
        setTimetableList(rows);
        const updated = rows.find((item) => item.id === selectedTimetable.id);
        if (updated) {
          setSelectedTimetable(updated);
        } else {
          setSelectedTimetable(null);
        }
      }
    } finally {
      setIsTimetableSaving(false);
    }
  };

  return (
    <section className="busCp">
      <h2>셔틀버스 관리</h2>
      <div className="busCp-columns">
        <div className="busCp-column">
          <div className="busCp-columnHeader">
            <h3>학교 목록</h3>
            <span
              className="busCp-refresh"
              style={{ color: isSchoolLoading ? "var(--black-4)" : "var(--main-color)" }}
              onClick={() => {
                if (!isSchoolLoading) loadSchoolList();
              }}>
              <Refresh />
            </span>
          </div>
          <p className="busCp-meta">선택된 학교: {selectedSchool?.name ?? "없음"}</p>
          <TableComponent
            columns={schoolTableManager.columns}
            rows={schoolTableManager.pageRows}
            order={schoolTableManager.order}
            orderBy={schoolTableManager.orderBy}
            onSort={schoolTableManager.handleSort}
            page={schoolTableManager.page}
            rowsPerPage={schoolTableManager.rowsPerPage}
            totalCount={schoolTableManager.totalCount}
            onPageChange={(e, newPage) => schoolTableManager.setPage(newPage)}
            onRowsPerPageChange={(e) => {
              schoolTableManager.setRowsPerPage(parseInt(e.target.value, 10));
              schoolTableManager.setPage(0);
            }}
            loading={isSchoolLoading}
            onRowClick={handleSchoolClick}
          />
        </div>

        <div className="busCp-column">
          <div className="busCp-columnHeader">
            <h3>셔틀 정류장</h3>
            <span
              className="busCp-refresh"
              style={{ color: !selectedSchool || isBusStopLoading ? "var(--black-4)" : "var(--main-color)" }}
              onClick={() => {
                if (!selectedSchool || isBusStopLoading) return;
                loadBusStopList(selectedSchool.id);
              }}>
              <Refresh />
            </span>
          </div>
          <p className="busCp-meta">{selectedSchool ? `선택된 학교: ${selectedSchool.name}` : "학교를 선택하면 정류장을 불러옵니다."}</p>
          <p className="busCp-meta">선택된 정류장: {selectedBusStop?.name ?? "없음"}</p>
          <form className="busCp-form" onSubmit={handleCreateBusStop}>
            <label htmlFor="bus-stop-name">정류장 이름</label>
            <input
              id="bus-stop-name"
              type="text"
              value={busStopName}
              onChange={(e) => setBusStopName(e.target.value)}
              placeholder="예: 정문"
              disabled={!selectedSchool}
            />
            <div className="busCp-formButtons">
              <button type="submit" disabled={!selectedSchool || isBusStopSaving}>
                정류장 등록
              </button>
              <button type="button" onClick={handleUpdateBusStop} disabled={!selectedBusStop || isBusStopSaving}>
                정류장 수정
              </button>
              <button type="button" className="busCp-secondary" onClick={handleResetBusStopForm}>
                초기화
              </button>
            </div>
          </form>
          <TableComponent
            columns={busStopTableManager.columns}
            rows={busStopTableManager.pageRows}
            order={busStopTableManager.order}
            orderBy={busStopTableManager.orderBy}
            onSort={busStopTableManager.handleSort}
            page={busStopTableManager.page}
            rowsPerPage={busStopTableManager.rowsPerPage}
            totalCount={busStopTableManager.totalCount}
            onPageChange={(e, newPage) => busStopTableManager.setPage(newPage)}
            onRowsPerPageChange={(e) => {
              busStopTableManager.setRowsPerPage(parseInt(e.target.value, 10));
              busStopTableManager.setPage(0);
            }}
            loading={isBusStopLoading}
            onRowClick={handleBusStopClick}
          />
        </div>

        <div className="busCp-column">
          <div className="busCp-columnHeader">
            <h3>셔틀 시간표</h3>
            <span
              className="busCp-refresh"
              style={{ color: !selectedBusStop || isTimetableLoading ? "var(--black-4)" : "var(--main-color)" }}
              onClick={() => {
                if (!selectedBusStop || isTimetableLoading) return;
                loadTimetableList(selectedBusStop.id);
              }}>
              <Refresh />
            </span>
          </div>
          <p className="busCp-meta">{selectedBusStop ? `선택된 정류장: ${selectedBusStop.name}` : "정류장을 선택하면 시간표를 불러옵니다."}</p>
          <form className="busCp-form" onSubmit={handleCreateTimetable}>
            <label htmlFor="bus-arrival-time">도착 시간</label>
            <input id="bus-arrival-time" type="time" value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} disabled={!selectedBusStop} />
            <div className="busCp-formButtons">
              <button type="submit" disabled={!selectedBusStop || isTimetableSaving}>
                시간 등록
              </button>
              <button type="button" onClick={handleUpdateTimetable} disabled={!selectedTimetable || isTimetableSaving}>
                시간 수정
              </button>
              <button type="button" className="busCp-secondary" onClick={handleResetTimetableForm}>
                초기화
              </button>
            </div>
          </form>
          <TableComponent
            columns={timetableTableManager.columns}
            rows={timetableTableManager.pageRows}
            order={timetableTableManager.order}
            orderBy={timetableTableManager.orderBy}
            onSort={timetableTableManager.handleSort}
            page={timetableTableManager.page}
            rowsPerPage={timetableTableManager.rowsPerPage}
            totalCount={timetableTableManager.totalCount}
            onPageChange={(e, newPage) => timetableTableManager.setPage(newPage)}
            onRowsPerPageChange={(e) => {
              timetableTableManager.setRowsPerPage(parseInt(e.target.value, 10));
              timetableTableManager.setPage(0);
            }}
            loading={isTimetableLoading}
            onRowClick={handleTimetableClick}
          />
        </div>
      </div>
    </section>
  );
};

export default BusCP;
