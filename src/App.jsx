import { useCallback, useEffect, useState } from "react";
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
import Error404Page from "./page/ErrorPages/Error404Page";

// Main & Common Pages
import MainPage from "./page/MainPage";
import KakaoPage from "./page/KakaoPage";
import LoginPage from "./page/LoginPage";
import TermsPage from "./page/TermsPage";
import UserDeletePage from "./page/UserDeletePage";
import DeviceAppendPage from "./page/DeviceAppendPage";

// SignUp Pages
import HelloPage from "./page/SignUpPage/0_HelloPage";
import PhoneSelectPage from "./page/SignUpPage/1_PhoneSelectPage";
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
import AlarmCP from "./component/_common/alarmCP";
import NoticePage from "./page/NoticePage";
import { iphoneRefreshToken } from "./api/iphone";
import HomeAppPage from "./page/ErrorPages/HomeAppPage";

// 네트워크/앱 브릿지 처리 시 허용할 최대 대기 시간(ms)
const NETWORK_TIMEOUT = 8000;
const APP_BRIDGE_TIMEOUT = 6000;

// Promise가 일정 시간 내 resolve/reject되지 않으면 강제로 타임아웃 시키는 유틸
const withTimeout = (promise, timeout, label) => {
  let timer;
  return Promise.race([
    promise.finally(() => clearTimeout(timer)),
    new Promise((_, reject) => {
      timer = setTimeout(() => {
        reject(new Error(`${label} timed out after ${timeout}ms`));
      }, timeout);
    }),
  ]);
};

// 복수의 Promise 중 가장 먼저 성공하는 결과를 채택하고, 모두 실패하면 오류 전달
const waitForFirstSuccess = (promises) => {
  if (!promises.length) {
    return Promise.resolve(false);
  }
  return new Promise((resolve, reject) => {
    let rejectedCount = 0;
    const errors = [];
    promises.forEach((promise, index) => {
      promise
        .then((value) => resolve(value))
        .catch((error) => {
          rejectedCount += 1;
          errors[index] = error;
          if (rejectedCount === promises.length) {
            reject(errors);
          }
        });
    });
  });
};

// 웹뷰(App)로부터 리프레시 토큰을 요청
const requestAppRefreshToken = () =>
  new Promise((resolve, reject) => {
    try {
      sendToApp("GET_REFRESH_TOKEN", null, (data) => {
        if (data?.success) {
          resolve(data.data);
        } else {
          reject(new Error(data?.message || "앱에서 리프레시 토큰을 가져오지 못했습니다."));
        }
      });
    } catch (error) {
      reject(error);
    }
  });

// 새로 발급 받은 리프레시 토큰을 앱(WebView)에 되돌려줌
const sendAppRefreshToken = (refreshToken) =>
  new Promise((resolve, reject) => {
    try {
      sendToApp("REFRESH_TOKEN", { refresh_token: refreshToken }, (data) => {
        if (data?.success) {
          resolve(true);
        } else {
          reject(new Error(data?.message || "앱에 리프레시 토큰 전달 실패"));
        }
      });
    } catch (error) {
      reject(error);
    }
  });

function App() {
  const { isApp, isIos, isHomeApp } = useWeb();
  const [alarm, setAlarm] = useState(false);
  const location = useLocation();
  const [mainPageLayout, setMainPageLayout] = useState(false);
  const [login, setLogin] = useState(false);

  const onClickAlarm = () => {
    setAlarm(false);
  };

  // 로그인 상태 확인 함수
  // 초기 진입 시 로그인/토큰 상태 점검 프로세스
  const checkUserLoginStatus = useCallback(async () => {
    try {
      let loginResult = false;
      try {
        // 1차: 일반 웹 로그인 세션 확인
        loginResult = await withTimeout(loginCheck(), NETWORK_TIMEOUT, "loginCheck");
      } catch (loginError) {
        console.warn("loginCheck 실패:", loginError.message || loginError);
      }

      setLogin(!!loginResult);
      if (loginResult) {
        setMainPageLayout(true);
        return;
      }

      const loginAttempts = [];

      if (isIos && isHomeApp) {
        // iOS 홈 앱 사용자는 PWA 토큰 발급 API를 바로 호출
        loginAttempts.push(
          withTimeout(iphoneRefreshToken(), NETWORK_TIMEOUT, "iphoneRefreshToken").then((result) => {
            if (result) {
              setLogin(true);
              setMainPageLayout(true);
              return true;
            }
            throw new Error("아이폰 홈 앱 토큰이 없습니다.");
          })
        );
      }

      if (isApp) {
        // 네이티브 앱(WebView) 사용자는 앱 브릿지를 통해 리프레시 토큰을 병렬 시도
        const appLoginAttempt = withTimeout(requestAppRefreshToken(), APP_BRIDGE_TIMEOUT, "GET_REFRESH_TOKEN")
          .then(async (tokenData) => {
            if (!tokenData?.refresh_token || !tokenData?.device_id) {
              throw new Error("앱 토큰 데이터가 유효하지 않습니다.");
            }

            // 앱이 준 토큰으로 서버 토큰 갱신
            const refreshed = await withTimeout(userRefreshToken(tokenData), NETWORK_TIMEOUT, "userRefreshToken");
            if (!refreshed) {
              throw new Error("refreshToken 갱신 실패");
            }

            // 갱신된 토큰을 다시 앱에 전달한 뒤 새로고침
            await withTimeout(sendAppRefreshToken(refreshed), APP_BRIDGE_TIMEOUT, "REFRESH_TOKEN");
            setLogin(true);
            return window.location.reload();
          })
          .catch((error) => {
            // 앱 토큰 동기화 실패 시 기존 토큰 제거
            sendToApp("DELETE_REFRESH_TOKEN", null, () => {});
            throw error;
          });

        loginAttempts.push(appLoginAttempt);
      }

      if (!loginAttempts.length) {
        // 추가 시도 가능한 경로가 없다면 즉시 메인 화면 렌더
        setMainPageLayout(true);
        return;
      }

      try {
        await waitForFirstSuccess(loginAttempts);
      } catch (errors) {
        // 모든 보조 로그인 시도가 실패한 경우
        console.warn("보조 로그인 시도 실패:", errors);
        setLogin(false);
        setMainPageLayout(true);
      }
    } catch (err) {
      setLogin(false);
      setMainPageLayout(true);
      console.error("로그인 상태 확인 실패:", err);
    }
  }, [isApp, isHomeApp, isIos]);

  useEffect(() => {
    // 라우팅 변경 시마다 로그인 상태를 재점검
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
  }, [location, checkUserLoginStatus]);

  return (
    <>
      <ScrollToTop />
      {alarm && <AlarmCP onClickAlarm={onClickAlarm} />}
      <Routes>
        <Route path="/" element={<MainPage mainPageLayout={mainPageLayout} login={login} />} />

        {/* 문의하기 */}
        <Route path="/kakao" element={<KakaoPage />} />

        {/* LogIn */}
        <Route path="/login" element={<LoginPage />} />

        {/* SignUp */}
        {/* 가입 인사 */}
        <Route path="/signup/0" element={<HelloPage />} />
        <Route path="/signup/1" element={<PhoneSelectPage />} />
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

        {/* 아이폰 홈 앱 안내 */}
        <Route path="/home-app" element={<HomeAppPage />} />

        {/* 404에러 */}
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </>
  );
}

export default App;
