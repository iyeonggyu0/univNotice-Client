import LogoLayout from "../../../layout/LogoLayout";
import "./style.css";

const HomeAppPage = () => {
  return (
    <LogoLayout>
      <div className="homeAppPage flexCenter">
        <div className="homeAppPage-content">
          <div>
            <p className="title">univNotice는 iOS 16.4 이상 버전에서 가입 및 사용이 가능합니다.</p>
            <p style={{ fontSize: "0.8rem" }}>하단 설명은 기기별로 차이가 존재할 수 있습니다</p>
            <a href="https://support.apple.com/ko-kr/103267" target="_blank">
              지원 기기 알아보기
            </a>
          </div>
          <div className="homeAppPage-images">
            <div className="homeAppPage-imgage-div">
              <div className="homeAppPage-image-div1">{/* 이미지 */}</div>
              <div className="flexHeightCenter">
                <span>1</span>
                <span>모바일 사파리에서 하단 공유 버튼을 클릭</span>
              </div>
            </div>
            <div className="homeAppPage-imgage-div">
              <div className="homeAppPage-image-div2">{/* 이미지 */}</div>
              <div className="flexHeightCenter">
                <span>2</span>
                <span>홈 화면에 추가 클릭</span>
              </div>
            </div>
            <div className="homeAppPage-imgage-div">
              <div className="homeAppPage-image-div3">{/* 이미지 */}</div>
              <div className="flexHeightCenter">
                <span>3</span>
                <span>추가 버튼을 통해 홈 화면에 추가</span>
              </div>
            </div>
            <div className="homeAppPage-imgage-div">
              <div className="homeAppPage-image-div4">{/* 이미지 */}</div>
              <div className="flexHeightCenter">
                <span>4</span>
                <span>추가된 바로가기를 클릭하여 사이트에 접속</span>
              </div>
            </div>
          </div>
          <div className="mobile-box">{/* 모바일 박스 */}</div>
        </div>
      </div>
    </LogoLayout>
  );
};
export default HomeAppPage;
