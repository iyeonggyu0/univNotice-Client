import { useState } from "react";
import { loginCheck } from "../../api/loginCheck";
import LogoCP from "../../component/_common/logoCP";
import { useWeb } from "../../hook/useWeb";
import "./style.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isLogin, setIsLogin] = useState(null);
  const isApp = useWeb().isApp;

  const nav = useNavigate();

  useEffect(() => {
    async function checkLogin() {
      const result = await loginCheck();
      setIsLogin(result);
    }
    checkLogin();
  }, []);

  return (
    <header className="MainPageLayoutHeader flexBetween">
      <LogoCP />
      <div className="MainPageLayoutHeader-content flexBetween">
        <p onClick={() => nav("/")}>공지 보기</p>
        {isApp && <p onClick={() => nav("/")}>기기 등록</p>}
        {!isLogin && <p onClick={() => nav("/")}>로그인</p>}
        {isLogin && <p onClick={() => nav("/")}>마이페이지</p>}
      </div>
    </header>
  );
};
export default Header;
