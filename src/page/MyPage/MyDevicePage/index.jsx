import { useNavigate } from "react-router-dom";
import MyPageLayout from "../../../layout/MyPageLayout";
import "./style.css";
import { useWeb } from "../../../hook/useWeb";
import { useState } from "react";
import { useEffect } from "react";
import { loginCheck } from "../../../api/user/loginCheck";
import { myPageDeviceDelete, myPageDeviceLoad, myPageDeviceToggleActive } from "../../../api/user/myPage";
import DeviceCP from "../../../component/myCp/deviceCp";
import { useCallback } from "react";

const MyDevicePage = () => {
  const nav = useNavigate();
  const [isLogin, setIsLogin] = useState(null);
  const [deviceData, setDeviceData] = useState([]);

  useEffect(() => {
    async function fetchLoginCheck() {
      try {
        const result = await loginCheck();
        const device = await myPageDeviceLoad();

        if (!result) {
          nav("/");
        }

        setIsLogin(result);
        setDeviceData(device);
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
        if (!window.confirm("해당 기기에서 푸시 을 받지 않습니다")) {
          return; // 취소 눌렀을 때 함수 종료
        }
      }

      try {
        const device = await myPageDeviceToggleActive(id, value);
        if (!device) {
          return alert("기기 활성화 상태 변경에 실패 했습니다\n나중에 다시 시도해주세요");
        }
        setDeviceData(device);
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
      const device = await myPageDeviceDelete(id);
      if (!device) {
        return alert("기기삭제에 실패 했습니다\n나중에 다시 시도해주세요");
      }
      alert("기기가 삭제되었습니다,\n30 분 내외로 로그아웃이 진행됩니다.");
      setDeviceData(device);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <MyPageLayout>
      <section className="myDevicePage flexCenter">
        {/* 중앙 */}
        <div className="centerBox" style={{ minHeight: deviceData.length === 0 ? "auto" : "" }}>
          {/* 타이틀 */}
          <div className="titleBox">
            <h2 className="title">
              <span className="bold">기기 정보</span>
            </h2>
            <h4 className="subTitle">현재 로그인 된 기기 목록 입니다.</h4>
          </div>
          {/* 인풋요소 */}
          <div className="flexCol">
            {deviceData.length === 0 && (
              <div className="notdefine-deivce">
                등록된 기기가 없습니다
                <br />
                <a href={`${import.meta.env.VITE_GOOGLE_URL}`} target="_blank" style={{ color: "var(--point-color-1)" }}>
                  어플 설치 바로가기
                </a>
              </div>
            )}
            {deviceData?.length > 0 &&
              deviceData.map((device, idx) => <DeviceCP key={idx} device={device} onChangeActive={onChangeActive} onDeleteDevice={onDeleteDevice} />)}
          </div>
        </div>
      </section>
    </MyPageLayout>
  );
};
export default MyDevicePage;
