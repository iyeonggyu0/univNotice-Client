import { useNavigate } from "react-router-dom";
import MainLayout from "../../layout";
import "./style.css";
import CircularProgress from "@mui/material/CircularProgress";

const MainPage = ({ mainPageLayout }) => {
  const nav = useNavigate();

  return (
    <MainLayout mainPageLayout={mainPageLayout}>
      <section className="mainPage">
        <div>{/* 이미지 */}</div>
        {mainPageLayout && <p onClick={() => nav("/signup/1")}>회원가입</p>}
        {!mainPageLayout && <CircularProgress size="24px" />}
      </section>
    </MainLayout>
  );
};
export default MainPage;
