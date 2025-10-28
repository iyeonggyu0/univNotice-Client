import { useNavigate, useParams } from "react-router-dom";
import { adminLoginCheck, adminLogout } from "../../api/admin/login";
import "./style.css";
import { useState, useEffect } from "react";
import MainLayout from "../../layout";
import LogoCP from "../../component/_common/logoCP";
import LogCP from "../../component/adminCP/logCP";
import { useCallback } from "react";
import TableCP from "../../component/adminCP/tableCP";
import SchoolCP from "../../component/adminCP/schoolCP";
import BusCP from "../../component/adminCP/busCP";

const AdminPage = () => {
  const nav = useNavigate();
  const page = useParams().tab;

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(null);

  // 어드민 로그인 체크
  useEffect(() => {
    adminLoginCheck().then((isLoggedIn) => {
      if (!isLoggedIn) {
        setIsAdminLoggedIn(false);
        nav("/admin/login");
      } else {
        setIsAdminLoggedIn(true);
      }
    });
  }, [nav]);

  const onClickLogout = useCallback(
    (e) => {
      e.preventDefault();

      if (!window.confirm("정말 로그아웃 하시겠습니까?")) return;

      // 로그아웃 처리
      const res = adminLogout();
      if (res) {
        setIsAdminLoggedIn(false);
        nav("/");
      } else {
        alert(res?.response?.data?.error);
        setIsAdminLoggedIn(true);
      }
    },
    [nav]
  );
  return (
    <div>
      {isAdminLoggedIn && (
        <section className="adminPage">
          {/* 왼쪽 메뉴 */}
          <div className="adminPage-menu">
            <LogoCP />
            <ul>
              <li onClick={() => nav("/admin/log")} style={{ fontWeight: page === "log" ? "700" : "400" }}>
                로그
              </li>
              <li onClick={() => nav("/admin/data")} style={{ fontWeight: page === "data" ? "700" : "400" }}>
                테이블 조회 데이터
              </li>
              <li onClick={() => nav("/admin/school")} style={{ fontWeight: page === "school" ? "700" : "400" }}>
                학교 관리
              </li>
              <li onClick={() => nav("/admin/bus")} style={{ fontWeight: page === "bus" ? "700" : "400" }}>
                버스 관리
              </li>
            </ul>
            <p
              onClick={(e) => {
                onClickLogout(e);
              }}>
              로그아웃
            </p>
          </div>
          <div className="adminPage-content">
            {/* 오른쪽 내용 */}
            {page === "log" && <LogCP />}
            {page === "data" && <TableCP />}
            {page === "school" && <SchoolCP />}
            {page === "bus" && <BusCP />}
          </div>
        </section>
      )}
    </div>
  );
};
export default AdminPage;
