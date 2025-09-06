import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./page/MainPage/MainPage";
import { useWeb } from "./hook/useWeb";
import ErrorIosPage from "./page/ErrorPages/ErrorIosPage";
import Error404Page from "./page/ErrorPages/Error404Page";
import ScrollToTop from "./hook/useScrollTop";

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

        {/* 404에러 */}
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
