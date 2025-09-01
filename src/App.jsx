import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./page/MainPage/MainPage";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
