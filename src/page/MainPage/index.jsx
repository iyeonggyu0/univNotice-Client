import { useNavigate } from "react-router-dom";
import MainLayout from "../../layout";
import "./style.css";
import CircularProgress from "@mui/material/CircularProgress";

const MainPage = ({ mainPageLayout, login }) => {
  const nav = useNavigate();

  return (
    <MainLayout mainPageLayout={mainPageLayout}>
      <section className="mainPage">
        <div>{/* 이미지 */}</div>
        {mainPageLayout && !login && <p onClick={() => nav("/signup/1")}>회원가입</p>}
        {mainPageLayout && login && <p onClick={() => nav("/notice")}>공지 보기</p>}
        {!mainPageLayout && <CircularProgress color="inherit" className="loading" size="22px" />}
      </section>
    </MainLayout>
  );
};
export default MainPage;
