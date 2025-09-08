import { useNavigate } from "react-router-dom";
import LogoLayout from "../../layout/LogoLayout";
import "./style.css";

const KakaoPage = () => {
  const nav = useNavigate();
  // FIXME: 카카오 오픈카톡 링크 남기기
  return (
    <LogoLayout>
      <section className="kakaoPage flexCenter">
        <div className="kakaoPage-content">
          <div>{/* 이미지 */}</div>
          <p onClick={() => nav("")} className="flexBetween">
            <span>카카오톡 문의 바로가기</span>
            <span>{">"}</span>
          </p>
        </div>
      </section>
    </LogoLayout>
  );
};
export default KakaoPage;
