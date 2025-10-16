import { useState } from "react";
import { loginCheck } from "../../api/user/loginCheck";
import LogoCP from "../../component/_common/logoCP";
import { useWeb } from "../../hook/useWeb";
import "./style.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ mainPageLayout }) => {
  const [isLogin, setIsLogin] = useState(null);
  const isApp = useWeb().isApp;

  const nav = useNavigate();

  useEffect(() => {
    async function fetchLoginCheck() {
      try {
        const result = await loginCheck();
        setIsLogin(result);
      } catch (err) {
        console.error(err);
      }
    }
    fetchLoginCheck();
  }, []);

  return (
    <header className="MainLayoutHeader flexBetween">
      <LogoCP />
      {mainPageLayout && (
        <div className="MainLayoutHeader-content flexBetween">
          {isLogin && <p onClick={() => nav("/notice")}>공지 보기</p>}
          {isApp && !isLogin && <p onClick={() => nav("/login/append")}>기기 등록</p>}
          {!isLogin && <p onClick={() => nav("/login")}>로그인</p>}
          {isLogin && <p onClick={() => nav("/mypage/info")}>마이페이지</p>}
        </div>
      )}
    </header>
  );
};
export default Header;
