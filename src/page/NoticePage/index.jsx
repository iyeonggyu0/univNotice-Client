import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { noticeLoad } from "../../api/notice";
import { loginCheck } from "../../api/user/loginCheck";

import "./style.css";
// import { noticeDemo } from "../../demoData/noticeDemo";
import MainLayout from "../../layout";

const NoticePage = () => {
  const nav = useNavigate();
  const [noticeData, setNoticeData] = useState([]);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    async function fetchLoginCheck() {
      try {
        // const device = await noticeLoad();
        // const isLogin = await loginCheck();

        // if (!isLogin) {
        //   alert("로그인이 필요합니다");
        //   return nav("/login");
        // }

        // setNoticeData(device);
        // setLogin(isLogin);
        // FIXME:
        // setNoticeData(noticeDemo);
        setLogin(true);
      } catch (err) {
        console.error(err);
      }
    }
    fetchLoginCheck();
  }, []);

  return (
    <div className="noticePageOut">
      <MainLayout>
        {login && (
          <div className="noticePage">
            <div className="centerSection">
              <h2>공지</h2>
            </div>
          </div>
        )}
      </MainLayout>
    </div>
  );
};
export default NoticePage;
