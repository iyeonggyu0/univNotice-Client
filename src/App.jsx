import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useWeb } from "./hook/useWeb";
import ErrorIosPage from "./page/ErrorPages/ErrorIosPage";
import Error404Page from "./page/ErrorPages/Error404Page";
import ScrollToTop from "./hook/useScrollTop";
import MainPage from "./page/MainPage";
import KakaoPage from "./page/KakaoPage";
import HelloPage from "./page/SignUpPage/1_helloPage";
import InfoPage from "./page/SignUpPage/2_InfoPage";
import AdminLoginPage from "./page/AdminPages/AdminLoginPage";
import AdminPage from "./page/AdminPages";
import CategoryPage from "./page/SignUpPage/3_CategoryPage";
import SettingPage from "./page/SignUpPage/4_SettingPage";
import PhonePage from "./page/SignUpPage/5_PhonePage";
import GooglePage from "./page/SignUpPage/6_GooglePage";
import IssuancePage from "./page/SignUpPage/7_IssuancePage";
import LoginPage from "./page/LoginPage";
import MyInfoPage from "./page/MyPage/MyInfoPage";
import DeviceAppendPage from "./page/DeviceAppendPage";

function App() {
  const isIos = useWeb().isIos;

  if (isIos) {
    return <ErrorIosPage />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
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
        <Route path="/signup/8" element={<InfoPage />} />

        {/* 마이페이지 */}
        <Route path="/mypage/info" element={<MyInfoPage />} />
        <Route path="/mypage/setting" element={<InfoPage />} />

        {/* 기기 등록 - 해당 페이지는 메인화면 연결, 추가 등록은 마이페이지에서 */}
        <Route path="/login/append" element={<DeviceAppendPage />} />

        {/* 탈퇴 */}
        <Route path="/withdraw" element={<InfoPage />} />

        {/* 공지사항 */}
        <Route path="/notice" element={<InfoPage />} />
        <Route path="/notice/:id" element={<InfoPage />} />

        {/* 어드민페이지 */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/:tab" element={<AdminPage />} />

        {/* 개인정보, 이용약관 */}
        <Route path="/terms" element={<AdminPage />} />

        {/* 404에러 */}
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
