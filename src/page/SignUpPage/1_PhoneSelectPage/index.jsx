import { useCallback, useEffect, useState } from "react";
import LogoLayout from "../../../layout/LogoLayout";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useWeb } from "../../../hook/useWeb";
import ButtonCP from "../../../component/_common/buttonCP";

const PhoneSelectPage = () => {
  const { isIos, isHomeApp, isApp } = useWeb();
  const nav = useNavigate();

  useEffect(() => {
    if (isIos && isHomeApp) return;
    if (isIos && !isHomeApp) return nav("/home-app");
  }, [isIos, isHomeApp, nav]);

  return (
    <LogoLayout>
      <section className="phonePage flexCenter">
        <div className="centerBox">
          <div className="titleBox">
            <h2 className="title">
              <span className="bold">핸드폰 기종</span>을 선택해 주세요
            </h2>
            <h4 className="subTitle">
              아이폰과 안드로이드는 서로 다른 방식으로 알림을 수신해요
              <br />
              잘못 선택 시, 알림이 오지 않을 수 있어요
            </h4>
          </div>
          <div className="flexCol">
            <div className="phonePage-button" onClick={() => nav("/signup/2")}>
              <ButtonCP color="--main-color" bgColor="--black-0">
                Android
              </ButtonCP>
            </div>
            <div className="phonePage-button" onClick={() => nav("/home-app")}>
              <ButtonCP color="--main-color" bgColor="--black-0">
                iPhone
              </ButtonCP>
            </div>
          </div>
        </div>
      </section>
    </LogoLayout>
  );
};
export default PhoneSelectPage;
