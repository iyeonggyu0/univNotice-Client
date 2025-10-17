import { useNavigate } from "react-router-dom";
import { useMedia } from "../../../hook/useMedia";
import LogoLayout from "../../../layout/LogoLayout";
import ButtonCP from "../../../component/_common/buttonCP";
import "./style.css";
import { useState, useEffect } from "react";
import { userLoginCodeCheck, userLoginCodeCreate } from "../../../api/user/login";
import { useWeb } from "../../../hook/useWeb";

const IssuancePage = () => {
  const isPc = useMedia().isPc;
  const nav = useNavigate();

  const { isIos, isHomeApp } = useWeb();
  useEffect(() => {
    if (isIos && isHomeApp) return nav("/");
    if (isIos && !isHomeApp) return nav("/home-app");
  }, [isIos, isHomeApp, nav]);

  const [code, setCode] = useState("");
  const [intervalId, setIntervalId] = useState(null);

  const getCode = async () => {
    try {
      const res = await userLoginCodeCreate();
      if (res && typeof res === "string") {
        if (window.confirm("코드를 타인에게 공유/노출 하지 마세요")) {
          setCode(res);
        } else {
          nav("/signup/6");
        }
      } else {
        alert("코드 생성에 실패했습니다.\n나중에 다시 시도해 주세요.");
        nav("/");
      }
    } catch (err) {
      alert("네트워크 오류\n나중에 다시 시도해 주세요.");
      nav("/");
    }
  };

  useEffect(() => {
    getCode();
    const id = setInterval(async () => {
      try {
        const res = await userLoginCodeCheck();
        if (!res || !res.status) return;
        if (res.status === 201) {
          // 만료X + 사용X
          return;
        } else if (res.status === 203) {
          // 만료O + 사용X
          await getCode(); // interval 해제하지 않음, 반복 유지
        } else if (res.status === 202) {
          // 만료O + 사용O
          clearInterval(id);
          nav("/signup/8");
        }
      } catch (err) {
        // 네트워크 오류 등
        clearInterval(id);
        alert("서버 오류\n나중에 다시 시도해 주세요.");
        nav("/");
      }
    }, 5000);
    setIntervalId(id);
    return () => clearInterval(id);
  }, []);

  return (
    <LogoLayout>
      <section className="issuancePage flexCenter">
        {!isPc && <div className="mobile-image">{/* 이미지 */}</div>}
        <div className="content flexBetweenCol">
          <div>
            {isPc && <div className="pc-title-image">{/* 이미지 */}</div>}
            <p className="title">
              어플 상단 <span className="bold">기기등록</span>을 눌러
              <br />
              <span className="bold">
                코드 <span className="code">{code}</span>를 입력
              </span>
              하세요
            </p>
            <p className="subTitle">코드는 3분간만 유효합니다</p>
          </div>
        </div>
        {isPc && <div className="pc-image">{/* PC 이미지 */}</div>}
      </section>
    </LogoLayout>
  );
};
export default IssuancePage;
