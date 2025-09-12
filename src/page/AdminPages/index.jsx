import { useNavigate } from "react-router-dom";
import { adminLoginCheck } from "../../api/admin/login";
import "./style.css";
import { useState, useEffect } from "react";

const AdminPage = () => {
  const nav = useNavigate();

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // 어드민 로그인 체크
  useEffect(() => {
    adminLoginCheck().then((res) => {
      if (!res?.isLoggedIn) {
        setIsAdminLoggedIn(false);
        nav("/admin/login");
      } else {
        setIsAdminLoggedIn(true);
      }
    });
  }, [nav]);
  return null;
};
export default AdminPage;

// TODO: 여기서 이어서
