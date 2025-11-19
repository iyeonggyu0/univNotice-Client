import { useNavigate } from "react-router-dom";
import ButtonCP from "../../../component/_common/buttonCP";
import LogoLayout from "../../../layout/LogoLayout";
import "./style.css";

const HelloPage = () => {
  const nav = useNavigate();

  return (
    <LogoLayout>
      <section className="infoPage flexCenter">
        <div className="infoPage-content">
          <div>{/* 이미지 */}</div>
          <p>
            <span>UNIV</span> Notice에
            <br />
            오신 것을 환영합니다!
          </p>
          <div onClick={() => nav("/signup/1")}>
            <ButtonCP>다음</ButtonCP>
          </div>
        </div>
      </section>
    </LogoLayout>
  );
};
export default HelloPage;
