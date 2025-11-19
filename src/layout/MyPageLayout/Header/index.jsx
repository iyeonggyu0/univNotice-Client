import { useState } from "react";
import { useWeb } from "../../../hook/useWeb";
import { useNavigate, useLocation } from "react-router-dom";
import LogoCP from "../../../component/_common/logoCP";
import "./style.css";
import { loginCheck } from "../../../api/user/loginCheck";
import { useEffect } from "react";
import { useMedia } from "../../../hook/useMedia";

const MyPageHeader = () => {
  const [isLogin, setIsLogin] = useState(null);
  const isPc = useMedia().isPc;
  const nav = useNavigate();
  const location = useLocation();
  const { isIos, isHomeApp } = useWeb();

  // 현재 경로가 /mypage/info인지 확인
  const myPageType = location.pathname;

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
    <header className="MyPageHeader flexBetween">
      <LogoCP />
      <div className="MyPageHeader-content flexBetween">
        {!isPc && myPageType !== "/mypage/info" && <p onClick={() => nav("/mypage/info")}>내 정보</p>}
        {!isIos && !isHomeApp && !isPc && myPageType !== "/mypage/device" && <p onClick={() => nav("/mypage/device")}>기기 관리</p>}
        {!isPc && myPageType !== "/mypage/setting" && <p onClick={() => nav("/mypage/setting")}>공지 설정</p>}

        {isPc && <p onClick={() => nav("/mypage/info")}>내 정보</p>}
        {!isIos && !isHomeApp && isPc && <p onClick={() => nav("/mypage/device")}>기기 관리</p>}
        {isPc && <p onClick={() => nav("/mypage/setting")}>공지 설정</p>}
      </div>
    </header>
  );
};
export default MyPageHeader;
