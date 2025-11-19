import { useNavigate } from "react-router-dom";
import ButtonCP from "../../../component/_common/buttonCP";
import { useMedia } from "../../../hook/useMedia";
import LogoLayout from "../../../layout/LogoLayout";
import "./style.css";
import { useEffect } from "react";
import { useWeb } from "../../../hook/useWeb";

const GooglePage = () => {
  const { isIos, isHomeApp } = useWeb();
  const nav = useNavigate();
  useEffect(() => {
    if (isIos && isHomeApp) return nav("/");
    if (isIos && !isHomeApp) return nav("/home-app");
  }, [isIos, isHomeApp, nav]);

  const isPc = useMedia().isPc;

  const onClickDownload = () => {
    // 구글 플레이스토어 이동
    window.open(`${import.meta.env.VITE_GOOGLE_URL}`, "_blank");
  };

  const onNextClick = () => {
    nav("/signup/7");
  };

  return (
    <LogoLayout>
      <section className="googlePage flexCenter">
        {!isPc && <div className="mobile-image">{/* 이미지 */}</div>}
        <div className="content flexBetweenCol">
          <div>
            {isPc && <div className="pc-title-image">{/* 이미지 */}</div>}
            <p className="title">
              완료까지 얼마 남지 않았어요
              <br />
              아래에서 <span className="bold">앱을 설치</span>해 주세요
            </p>
            <p className="subTitle">설치를 완료한 후 다음 단계에서{!isPc && <br />}기기 등록을 진행해 주세요</p>
          </div>
          <div className={`buttonBox ${isPc ? "flexBetween" : "flexCol"}`}>
            <div onClick={onClickDownload}>
              <ButtonCP>설치</ButtonCP>
            </div>
            <div onClick={onNextClick}>
              <ButtonCP bgColor="--point-color-1">설치 완료</ButtonCP>
            </div>
          </div>
        </div>
        {isPc && <div className="pc-image">{/* PC 이미지 */}</div>}
      </section>
    </LogoLayout>
  );
};
export default GooglePage;
