import { useNavigate } from "react-router-dom";

import "./style.css";
import LogoLayout from "../../layout/LogoLayout";
import ButtonCP from "../../component/_common/buttonCP";
import InputCP from "../../component/_common/inputCP";
import { useInput } from "../../hook/useInput";
import { useCallback } from "react";

const DeviceAppendPage = () => {
  const nav = useNavigate();
  const [code, onChangeCode, setCode] = useInput("");

  const onClickRegister = useCallback(
    (e) => {
      e.preventDefault();
    },
    [code]
  );

  const onEnter = (e) => {
    if (e.key === "Enter") {
      //
    }
  };
  return (
    <LogoLayout>
      <section className="deviceAppendPage flexCenter">
        <div className="deviceAppendPage-content">
          <div>{/* 이미지 */}</div>
          <p>
            <span>웹사이트</span>에서 설정하던
            <br />
            내용을 <span>모바일 앱</span>에 불러옵니다
          </p>
          <div className="inputBox">
            <InputCP value={code} onChange={onChangeCode} placeholder="화면에 있는 코드를 입력" onKeyDown={onEnter} />
          </div>
          <div>
            <div onClick={onClickRegister}>
              <ButtonCP bgColor="--point-color-1">로그인 및 기기등록</ButtonCP>
            </div>
            <p className="terms" onClick={() => nav("/terms")}>
              <span>넘어갈 시 개인정보 처리 방침과 이용약관에 동의함으로 간주합니다.</span>
            </p>
          </div>
        </div>
      </section>
    </LogoLayout>
  );
};
export default DeviceAppendPage;
