import LogoLayout from "../../../layout/LogoLayout";
import "./style.css";

const HomeAppPage = () => {
  return (
    <LogoLayout>
      <div className="homeAppPage flexCenter">
        <div className="homeAppPage-content">
          <div>
            <p className="title">univNotice는 iOS 16.4 이상 버전에서 가입 및 사용이 가능합니다.</p>
            <a href="https://support.apple.com/ko-kr/103267" target="_blank">
              지원 기기 알아보기
            </a>
          </div>
          <div className="homeAppPage-images">
            <div className="homeAppPage-imgage-box">
              <div></div>
              <div>
                <span>1</span>
                <span>Safari로 접속하여 공유 아이콘을 눌러주세요.</span>
              </div>
            </div>
            <div className="homeAppPage-imgage-div">
              <div></div>
              <div>
                <span>2</span>
                <span>Safari로 접속하여 공유 아이콘을 눌러주세요.</span>
              </div>
            </div>
            <div className="homeAppPage-imgage-div">
              <div></div>
              <div>
                <span>3</span>
                <span>Safari로 접속하여 공유 아이콘을 눌러주세요.</span>
              </div>
            </div>
            <div className="homeAppPage-imgage-div">
              <div></div>
              <div>
                <span>2</span>
                <span>Safari로 접속하여 공유 아이콘을 눌러주세요.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LogoLayout>
  );
};
export default HomeAppPage;
