import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

// hooks
import { useWeb } from "./hook/useWeb";
import ScrollToTop from "./hook/useScrollTop";

// api
import { loginCheck } from "./api/user/loginCheck";
import { sendToApp } from "./api/app/webToApp";
import { userRefreshToken } from "./api/user/login";

// Error Pages
import ErrorIosPage from "./page/ErrorPages/ErrorIosPage";
import Error404Page from "./page/ErrorPages/Error404Page";

// Main & Common Pages
import MainPage from "./page/MainPage";
import KakaoPage from "./page/KakaoPage";
import LoginPage from "./page/LoginPage";
import TermsPage from "./page/TermsPage";
import UserDeletePage from "./page/UserDeletePage";
import DeviceAppendPage from "./page/DeviceAppendPage";

// SignUp Pages
import HelloPage from "./page/SignUpPage/1_HelloPage";
import InfoPage from "./page/SignUpPage/2_InfoPage";
import CategoryPage from "./page/SignUpPage/3_CategoryPage";
import SettingPage from "./page/SignUpPage/4_SettingPage";
import PhonePage from "./page/SignUpPage/5_PhonePage";
import GooglePage from "./page/SignUpPage/6_GooglePage";
import IssuancePage from "./page/SignUpPage/7_IssuancePage";
import EndPage from "./page/SignUpPage/8_endPage";

// MyPage
import MyInfoPage from "./page/MyPage/MyInfoPage";
import MySettingPage from "./page/MyPage/MySettingPage";
import MyDevicePage from "./page/MyPage/MyDevicePage";

// Admin Pages
import AdminLoginPage from "./page/AdminPages/AdminLoginPage";
import AdminPage from "./page/AdminPages";
import { useState } from "react";
import AlarmCP from "./component/_common/alarmCP";
import NoticePage from "./page/NoticePage";

function App() {
  const { isIos, isApp } = useWeb();
  const [alarm, setAlarm] = useState(false);
  const location = useLocation();

  const onClickAlarm = () => {
    setAlarm(false);
  };
  // 로그인 상태 확인 함수
  const checkUserLoginStatus = async () => {
    try {
      const login = await loginCheck();
      if (login) {
        return;
      }
      if (!isApp) {
        return;
      }

      sendToApp("GET_REFRESH_TOKEN", null, (data) => {
        if (data.success) {
          if (!data.data.refresh_token || !data.data.device_id) {
            return;
          }

          const tokenData = {
            refresh_token: data.data.refresh_token,
            device_id: data.data.device_id,
          };

          userRefreshToken(tokenData).then((res) => {
            if (res) {
              sendToApp("REFRESH_TOKEN", { refresh_token: res }, (resData) => {
                if (resData.success) {
                  return window.location.reload();
                }
              });
            } else {
              sendToApp("DELETE_REFRESH_TOKEN", null, () => {});
            }
          });
        } else {
          return console.error("앱에서 리프레시 토큰을 가져오지 못했습니다");
        }
      });
    } catch (err) {
      console.error("로그인 상태 확인 실패:", err);
    }
  };

  useEffect(() => {
    checkUserLoginStatus();

    // 앱에서 오는 메시지 처리 (ALARM_RECEIVED)
    const originalOnAppMessage = window.onAppMessage;
    window.onAppMessage = (responseData) => {
      if (originalOnAppMessage) {
        originalOnAppMessage(responseData);
      }
      if (responseData && responseData.type === "ALARM_RECEIVED") {
        console.log("알림 수신됨:", responseData);
        setAlarm(true);
      }
    };
    return () => {
      window.onAppMessage = originalOnAppMessage;
    };
  }, [location]);

  if (isIos) {
    return <ErrorIosPage />;
  }

  return (
    <>
      <ScrollToTop />
      {alarm && <AlarmCP onClickAlarm={onClickAlarm} />}
      <Routes>
        <Route path="/" element={<MainPage />} />

        {/* 문의하기 */}
        <Route path="/kakao" element={<KakaoPage />} />

        {/* LogIn */}
        <Route path="/login" element={<LoginPage />} />

        {/* SignUp */}
        {/* 가입 인사 */}
        <Route path="/signup/1" element={<HelloPage />} />
        {/* 사용자 정보 입력 */}
        <Route path="/signup/2" element={<InfoPage />} />
        {/* 카테고리 선택 */}
        <Route path="/signup/3" element={<CategoryPage />} />
        {/* 카테고리별 키워드 설정 */}
        <Route path="/signup/4/:setting_id" element={<SettingPage />} />
        {/* 번호 인증 */}
        <Route path="/signup/5" element={<PhonePage />} />
        {/* 어플 설치 안내 */}
        <Route path="/signup/6" element={<GooglePage />} />
        {/* 연동 페이지 */}
        <Route path="/signup/7" element={<IssuancePage />} />
        {/* 완료 페이지 */}
        <Route path="/signup/8" element={<EndPage />} />

        {/* 마이페이지 */}
        <Route path="/mypage/info" element={<MyInfoPage />} />
        <Route path="/mypage/setting" element={<MySettingPage />} />
        <Route path="/mypage/device" element={<MyDevicePage />} />

        {/* 기기 등록 - 해당 페이지는 메인화면 연결, 추가 등록은 마이페이지에서 */}
        <Route path="/login/append" element={<DeviceAppendPage />} />

        {/* 탈퇴 */}
        <Route path="/withdraw" element={<UserDeletePage />} />

        {/* 공지사항 */}
        <Route path="/notice" element={<NoticePage />} />

        {/* 어드민페이지 */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/:tab" element={<AdminPage />} />

        {/* 개인정보, 이용약관 */}
        <Route path="/terms" element={<TermsPage />} />

        {/* 404에러 */}
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </>
  );
}

export default App;
