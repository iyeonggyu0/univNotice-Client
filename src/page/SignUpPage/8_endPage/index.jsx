import { useNavigate } from "react-router-dom";
import ButtonCP from "../../../component/_common/buttonCP";
import LogoLayout from "../../../layout/LogoLayout";
import "./style.css";
import { useWeb } from "../../../hook/useWeb";

const EndPage = () => {
  const nav = useNavigate();
  const isApp = useWeb().isApp;
  return (
    <LogoLayout>
      <section className="endPage flexCenter">
        <div className="endPage-content">
          <div>{/* 이미지 */}</div>
          <div className="titleBox">
            <p className="title">
              <span>성공적</span>으로
              <br />
              <span>등록</span>되었어요!
            </p>
            <p className="subTitle">매일 오후 6시 당일의 공지를 알려드려요</p>
          </div>
          {!isApp && (
            <div onClick={() => nav("/")}>
              <ButtonCP>홈으로</ButtonCP>
            </div>
          )}
          {isApp && (
            <div onClick={() => nav("/login")}>
              <ButtonCP>로그인</ButtonCP>
            </div>
          )}
        </div>
      </section>
    </LogoLayout>
  );
};
export default EndPage;
