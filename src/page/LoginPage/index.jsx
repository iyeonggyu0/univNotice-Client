import ButtonCP from "../../component/_common/buttonCP";
import LogoLayout from "../../layout/LogoLayout";

const LoginPage = () => {
  return (
    <LogoLayout>
      <section className="infoPage flexCenter">
        {/* 중앙 */}
        <div className="centerBox">
          {/* 타이틀 */}
          <div className="titleBox">
            <h2 className="title">
              <span className="bold">로그인</span>
            </h2>
            <h4 className="subTitle">앱으로 로그인 한 경우 자동 기기등록 됩니다.</h4>
          </div>
          <div className="flexCol"></div>
          <div className="bottomItem">
            <ButtonCP>다음</ButtonCP>
          </div>
        </div>
      </section>
    </LogoLayout>
  );
};
export default LoginPage;
