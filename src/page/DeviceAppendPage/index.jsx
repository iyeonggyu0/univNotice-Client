import { useNavigate } from "react-router-dom";

import "./style.css";
import LogoLayout from "../../layout/LogoLayout";
import ButtonCP from "../../component/_common/buttonCP";
import InputCP from "../../component/_common/inputCP";
import { useInput } from "../../hook/useInput";
import { useCallback } from "react";
import { sendToApp } from "../../api/app/webToApp";
import { userLoginAtCode } from "../../api/user/login";
import { DeviceDelete } from "../../api/user/device";

const DeviceAppendPage = () => {
  const nav = useNavigate();
  const [code, onChangeCode, setCode] = useInput("");

  const onClickRegister = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (code.trim() === "") {
          alert("코드를 입력해 주세요");
          return;
        }
        if (code.length !== 6) {
          alert("코드는 6자리 입니다");
          return;
        }

        // 1. 모바일의 fcm토큰, 기기이름, id(있으면) 호출
        sendToApp("FCM_TOKEN", null, async (responseData) => {
          if (responseData.success) {
            try {
              const loginData = {
                fcm_token: responseData.token,
                device_name: responseData.name,
                device_id: responseData.device_id || null,
                code: code,
              };

              // 2. QR 로그인 호출
              const res = await userLoginAtCode(loginData);

              if (!res) {
                alert("코드가 올바르지 않거나 만료되었습니다\n다시 시도해 주세요");
                return;
              }

              // 3. 성공시 로그인 처리 및 모바일에 리프레시 토큰 및 디바이스 id 저장
              if (!res?.device_id || !res?.refresh_token) {
                alert("오류가 발생했습니다\n나중에 다시 시도해 주세요");
              } else {
                sendToApp("REFRESH_TOKEN", { refresh_token: res.refresh_token, device_id: res.device_id }, (tokenData) => {
                  if (tokenData.success) {
                    nav("/");
                  } else {
                    alert("리프레시 토큰 저장에 실패했습니다.\n 잠시 후 다시 시도해 주세요.");
                    // 리프레시 토큰 저장 실패 시 등록된 기기 삭제
                    DeviceDelete(res.device_id)
                      .then(() => {
                        setCode("");
                      })
                      .catch(() => {
                        setCode("");
                      });
                  }
                });
              }
            } catch (err) {
              alert("네트워크 오류\n나중에 다시 시도해 주세요.");
            }
          } else {
            alert("오류가 발생했습니다\n나중에 다시 시도해 주세요");
          }
        });
      } catch (err) {
        alert("네트워크 오류\n나중에 다시 시도해 주세요.");
        return;
      }

      // 2. 위의 데이터를 포함하여/qr/login 호출
      // 3. 성공시 로그인 처리 및 모바일에 리프레시 토큰 및 디바이스 id 저장
    },
    [code]
  );

  const onEnter = (e) => {
    if (e.key === "Enter") {
      onClickRegister(e);
    }
  };
  return (
    <LogoLayout>
      <section className="deviceAppendPage flexCenter">
        <div className="deviceAppendPage-content">
          <div>{/* 이미지 */}</div>
          <p>
            <span>웹 사이트</span>에서 설정하던
            <br />
            내용을 <span>모바일 앱</span>에 불러옵니다
          </p>
          <div className="inputBox">
            <InputCP value={code} onChange={onChangeCode} placeholder="화면에 있는 코드를 입력" onKeyDown={onEnter} />
          </div>
          <div>
            <div onClick={(e) => onClickRegister(e)}>
              <ButtonCP bgColor="--point-color-1">로그인 및 기기 등록</ButtonCP>
            </div>
            <p className="terms" onClick={() => nav("/terms")}>
              <span>넘어갈 시 개인정보 처리 방침과 이용 약관에 동의함으로 간주합니다.</span>
            </p>
          </div>
        </div>
      </section>
    </LogoLayout>
  );
};
export default DeviceAppendPage;
