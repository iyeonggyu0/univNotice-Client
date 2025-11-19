import { useCallback } from "react";
import ButtonCP from "../../../component/_common/buttonCP";
import InputCP from "../../../component/_common/inputCP";
import { useInput } from "../../../hook/useInput";
import LogoLayout from "../../../layout/LogoLayout";

import "./style.css";
import { adminLogin, adminLoginCheck } from "../../../api/admin/login";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminLoginPage = () => {
  const [id, onChangeId, setId] = useInput("");
  const [pw, onChangePw, setPw] = useInput("");
  const nav = useNavigate();

  useEffect(() => {
    adminLoginCheck().then((isLoggedIn) => {
      if (isLoggedIn) {
        nav("/admin/log");
      }
    });
  }, []);

  const onClickLogin = useCallback(
    (e) => {
      e.preventDefault();
      // 로그인 처리
      adminLogin(id, pw)
        .then((res) => {
          if (res) {
            nav("/admin/log");
          }
        })
        .catch((err) => {
          setId("");
          setPw("");
        });
    },
    [id, pw, nav, setId, setPw]
  );

  // 엔터 키 입력 시 로그인 실행
  const handlePwKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        onClickLogin(e);
      }
    },
    [onClickLogin]
  );

  return (
    <LogoLayout>
      <section className="adminLoginPage flexCenter">
        <div className="centerBox">
          <div className="titleBox">
            <h2 className="title">
              <span className="bold">ADMIN</span> Login
            </h2>
            <h4 className="subTitle">관리자만 로그인 가능합니다.</h4>
          </div>
          <div className="flexCol">
            <div>
              <InputCP value={id} onChange={onChangeId} title="ID" essential={true} placeholder="관리자 ID 입력" />
            </div>
            <div>
              <InputCP pw={true} value={pw} onChange={onChangePw} title="PW" essential={true} placeholder="관리자 PW 입력" onKeyDown={handlePwKeyDown} />
            </div>
          </div>
          <div className="bottomItem" onClick={onClickLogin}>
            <ButtonCP>로그인</ButtonCP>
          </div>
        </div>
      </section>
    </LogoLayout>
  );
};
export default AdminLoginPage;
