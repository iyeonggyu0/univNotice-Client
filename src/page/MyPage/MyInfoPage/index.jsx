import { useEffect, useState } from "react";
import { userLogout } from "../../../api/user/login";
import { useNavigate } from "react-router-dom";
import { loginCheck } from "../../../api/user/loginCheck";
import { useWeb } from "../../../hook/useWeb";
import { sendToApp } from "../../../api/app/webToApp";
import { DeviceDelete } from "../../../api/user/device";

const MyInfoPage = () => {
  const nav = useNavigate();
  const isApp = useWeb().isApp;
  const [isLogin, setIsLogin] = useState(null);

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

  useEffect(() => {
    if (isLogin === false) {
      alert("로그인 후 이용해 주세요.");
      return nav("/login");
    }
  }, [isLogin]);

  const onClickLogout = async () => {
    try {
      if (isApp) {
        sendToApp("DELETE_REFRESH_TOKEN", null, async (data) => {
          console.log("[DELETE_REFRESH_TOKEN 콜백] data:", data);
          if (data.success) {
            await DeviceDelete(data.data.device_id);
            await userLogout();
            nav("/");
          }
        });
      } else {
        await userLogout();
        nav("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>내 정보 페이지</h1>
      <button onClick={onClickLogout}>로그아웃</button>
    </div>
  );
};
export default MyInfoPage;
