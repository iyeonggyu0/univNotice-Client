import { useState } from "react";
import { loginCheck } from "../../api/loginCheck";
import LogoCP from "../../component/_common/logoCP";
import { useWeb } from "../../hook/useWeb";
import "./style.css";
import { useEffect } from "react";

const Header = () => {
  const [isLogin, setIsLogin] = useState(null);
  const isApp = useWeb().isApp;

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
        {isApp && <p>기기 등록</p>}
        {!isLogin && <p>로그인</p>}
        {isLogin && <p>마이페이지</p>}
      </div>
    </header>
  );
};
export default Header;
