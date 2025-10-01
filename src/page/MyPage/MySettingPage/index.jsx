import { useNavigate } from "react-router-dom";
import MyPageLayout from "../../../layout/MyPageLayout";
import "./style.css";
import ButtonCP from "../../../component/_common/buttonCP";
import { useCallback, useEffect, useState } from "react";
import { loginCheck } from "../../../api/user/loginCheck";
import { myPageCategoryLoad } from "../../../api/user/myPage";
import CategoryCP from "../../../component/myCp/categoryCP";

const MySettingPage = () => {
  const nav = useNavigate();
  const [isLogin, setIsLogin] = useState(null);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    async function fetchLoginCheck() {
      try {
        const result = await loginCheck();
        const categoryDataRes = await myPageCategoryLoad();

        if (!result) {
          nav("/");
        }

        setIsLogin(result);
        setCategoryData(categoryDataRes);
        console.log(categoryDataRes);
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

  const onChangeActive = useCallback(
    async (id, value) => {
      if (!value) {
        if (!window.confirm("해당 기기에서 푸시 알람을 받지 않습니다")) {
          return; // 취소 눌렀을 때 함수 종료
        }
      }

      try {
        // const device = await myPageDeviceToggleActive(id, value);
        // if (!device) {
        // return alert("기기 활성화 상태 변경에 실패 했습니다\n나중에 다시 시도해주세요");
        // }
        // setDeviceData(device);
      } catch (err) {
        console.error(err);
      }
    },
    [] // 의존성 배열에서 deviceData 제거
  );

  const onDeleteDevice = useCallback(async (id) => {
    if (!window.confirm("정말로 이 기기를 삭제하시겠습니까?")) {
      return; // 취소 눌렀을 때 함수 종료
    }

    try {
      // const device = await myPageDeviceDelete(id);
      // if (!device) {
      //   return alert("기기삭제에 실패 했습니다\n나중에 다시 시도해주세요");
      // }
      // alert("기기가 삭제되었습니다,\n30 분 내외로 로그아웃이 진행됩니다.");
      // setDeviceData(device);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <MyPageLayout>
      <section className="mySettingPage flexCenter">
        {/* 중앙 */}
        <div className="centerBox">
          {/* 타이틀 */}
          <div className="titleBox">
            <h2 className="title">
              <span className="bold">공지 설정</span>
            </h2>
            <h4 className="subTitle">공지별 알람 On/Off 및 키워드를 설정</h4>
          </div>
          {/* 인풋요소 */}
          <div className="flexCol">
            {categoryData?.map((category, idx) => (
              <CategoryCP key={idx} category={category} />
            ))}
          </div>
        </div>
      </section>
    </MyPageLayout>
  );
};
export default MySettingPage;
