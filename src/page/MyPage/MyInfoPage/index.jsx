import { useEffect, useState } from "react";
import { userLogout } from "../../../api/user/login";
import { useNavigate } from "react-router-dom";
import { loginCheck } from "../../../api/user/loginCheck";
import { useWeb } from "../../../hook/useWeb";
import { sendToApp } from "../../../api/app/webToApp";
import { DeviceDelete } from "../../../api/user/device";
import "./style.css";
import MyPageLayout from "../../../layout/MyPageLayout";
import { myPageInfoLoad } from "../../../api/user/myPage";
import InputCP from "../../../component/_common/inputCP";
import ButtonCP from "../../../component/_common/buttonCP";

const MyInfoPage = () => {
  const nav = useNavigate();
  const isApp = useWeb().isApp;
  const [isLogin, setIsLogin] = useState(null);
  const [userData, setUserData] = useState({
    student_id: "",
    name: "",
    school: { id: 0, name: "" },
    department: { id: 0, name: "" },
    phone: "",
  });

  useEffect(() => {
    async function fetchLoginCheck() {
      try {
        const result = await loginCheck();
        const userInfoLoad = await myPageInfoLoad();

        if (!userInfoLoad) {
          nav("/");
        }

        setIsLogin(result);
        setUserData(userInfoLoad);
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
    <MyPageLayout>
      <section className="myPageInfo flexCenter">
        {/* 중앙 */}
        <div className="centerBox">
          {/* 타이틀 */}
          <div className="titleBox">
            <h2 className="title">
              <span className="bold">내 정보</span>
            </h2>
            <h4 className="subTitle">가입할 때 입력하신 정보 입니다.</h4>
          </div>
          {/* 인풋요소 */}
          <div className="flexCol">
            <InputCP title="이름" activate={false} value={userData.name} />
            <InputCP title="학번" activate={false} value={userData.student_id} />
            <InputCP title="학교/학과" activate={false} value={`${userData.school.name} / ${userData.department.name}`} />
            <InputCP title="핸드폰 번호" activate={false} value={userData.phone} />
          </div>

          <div className="bottomItem">
            <div onClick={onClickLogout}>
              <ButtonCP bgColor="--red">로그아웃</ButtonCP>
            </div>
            <p className="deleteAccount">
              <span onClick={() => nav("/withdraw")}>회원 탈퇴</span>
            </p>
          </div>
        </div>
        <p className="caption">핸드폰 번호 변경은 고객센터로 문의 해 주세요</p>
      </section>
    </MyPageLayout>
  );
};
export default MyInfoPage;
