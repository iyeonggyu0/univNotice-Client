import LogoLayout from "../../layout/LogoLayout";
import "./style.css";

const KakaoPage = () => {
  const gotoKakao = () => {
    window.open(import.meta.env.VITE_KAKAO_URL, "_blank");
  };
  return (
    <LogoLayout>
      <section className="kakaoPage flexCenter">
        <div className="kakaoPage-content">
          <div>{/* 이미지 */}</div>
          <p onClick={gotoKakao} className="flexBetween">
            <span>카카오톡 문의 바로 가기</span>
            <span>{">"}</span>
          </p>
        </div>
      </section>
    </LogoLayout>
  );
};
export default KakaoPage;
