import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useWeb } from "./hook/useWeb";
import ErrorIosPage from "./page/ErrorPages/ErrorIosPage";
import Error404Page from "./page/ErrorPages/Error404Page";
import ScrollToTop from "./hook/useScrollTop";
import MainPage from "./page/MainPage";
import KakaoPage from "./page/KakaoPage";
import HelloPage from "./page/SignUpPage/1_helloPage";
import InfoPage from "./page/SignUpPage/2_InfoPage";

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

        {/* SignUp */}
        <Route path="/signup/1" element={<HelloPage />} />
        <Route path="/signup/2" element={<InfoPage />} />

        {/* 404에러 */}
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
