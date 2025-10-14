import { useNavigate } from "react-router-dom";
import MainLayout from "../../layout";
import "./style.css";

const MainPage = (login) => {
  const nav = useNavigate();

  return (
    <MainLayout>
      <section className="mainPage">
        <div>{/* 이미지 */}</div>
        {!login && <p onClick={() => nav("/signup/1")}>회원가입</p>}
      </section>
    </MainLayout>
  );
};
export default MainPage;
