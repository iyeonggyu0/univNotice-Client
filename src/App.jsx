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
        <Route path="/login" element={<MainPage />} />

        {/* SignUp */}
        {/* 가입 인사 */}
        <Route path="/signup/1" element={<HelloPage />} />
        {/* 사용자 정보 입력 */}
        <Route path="/signup/2" element={<InfoPage />} />
        {/* 카테고리 선택 */}
        <Route path="/signup/3" element={<InfoPage />} />
        {/* 카테고리별 키워드 설정 */}
        <Route path="/signup/4" element={<InfoPage />} />
        {/* 번호 인증 */}
        <Route path="/signup/5" element={<InfoPage />} />
        {/* 어플 설치 안내 */}
        <Route path="/signup/6" element={<InfoPage />} />
        {/* 가입 완료 */}
        <Route path="/signup/7" element={<InfoPage />} />

        {/* 마이페이지 */}
        <Route path="/mypage/info" element={<InfoPage />} />
        <Route path="/mypage/notice" element={<InfoPage />} />

        {/* 기기 등록 - 해당 페이지는 메인화면 연결, 추가 등록은 마이페이지에서 */}
        <Route path="/append" element={<InfoPage />} />

        {/* 탈퇴 */}
        <Route path="/withdraw" element={<InfoPage />} />

        {/* 공지사항 */}
        <Route path="/notice" element={<InfoPage />} />
        <Route path="/notice/:id" element={<InfoPage />} />

        {/* 어드민페이지 */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/:tab" element={<AdminPage />} />

        {/* 404에러 */}
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
