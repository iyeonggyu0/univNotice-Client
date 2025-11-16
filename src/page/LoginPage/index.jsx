import { useCallback, useEffect, useState } from "react";
import ButtonCP from "../../component/_common/buttonCP";
import { useWeb } from "../../hook/useWeb";
import LogoLayout from "../../layout/LogoLayout";
import { userLogin, userSendCertificationCode } from "../../api/user/login";
import { useNavigate } from "react-router-dom";
import { useInput } from "../../hook/useInput";
import InputCP from "../../component/_common/inputCP";
import "./style.css";
import { sendToApp } from "../../api/app/webToApp";
import { DeviceAdd, DeviceDelete } from "../../api/user/device";
import { loginCheck } from "../../api/user/loginCheck";
import { iphoneDevicePost } from "../../api/iphone";
import { iphonePublicKeyGetApi } from "../../api/user/iphone";

const LoginPage = () => {
  const nav = useNavigate();
  const isApp = useWeb().isApp;
  const { isIos, isHomeApp } = useWeb();
  useEffect(() => {
    if (isIos && isHomeApp) return;
    if (isIos && !isHomeApp) return nav("/home-app");
  }, [isIos, isHomeApp, nav]);

  useEffect(() => {
    async function fetchLoginCheck() {
      try {
        const result = await loginCheck();
        if (result) {
          alert("이미 로그인된 상태입니다.");
          return nav("/");
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchLoginCheck();
  }, []);

  const [student_id, onChangeStudent_id, setStudent_id] = useInput("");
  const [phone, onChangePhone, setPhone] = useInput("");
  const [certification_code, onChangeCertification_code, setCertification_code] = useInput("");

  const [isCertification, setIsCertification] = useState(false);

  const onClickLogin = useCallback(async () => {
    if (!isCertification) return alert("핸드폰 인증을 진행해 주세요.");

    const trimmed_student_id = student_id ? student_id.trim() : "";
    const trimmed_phone = phone ? phone.trim() : "";
    const trimmed_certification_code = certification_code ? certification_code.trim() : "";

    if (!trimmed_student_id) return alert("학번을 입력해 주세요.");
    if (trimmed_student_id.length < 6) return alert("학번은 6자리 이상이어야 합니다.");
    if (!/^[\d!;&$]+$/.test(trimmed_student_id)) return alert("학번은 숫자만 입력해야 합니다.");

    if (!trimmed_phone) return alert("전화번호를 입력해 주세요.");
    if (!/^010\d{8}$/.test(trimmed_phone)) return alert("전화번호는 010으로 시작하는 11자리 숫자여야 합니다.");

    if (!trimmed_certification_code) return alert("인증번호를 입력해 주세요.");
    if (!/^.{6,}$/.test(trimmed_certification_code)) return alert("인증번호는 6자리 입니다.");

    const data = {
      student_id: trimmed_student_id,
      phone: trimmed_phone,
      certification_code: trimmed_certification_code,
      is_android: !isHomeApp,
    };
    try {
      const res = await userLogin(data);
      // 로그인 실패
      if (!res) {
        setCertification_code("");
        return alert("로그인에 실패했습니다.\n 잠시 후 다시 시도해 주세요.");
      }

      // iOS Home App에서만 push 등록
      if (res && isIos && isHomeApp) {
        try {
          let registration = null;
          if ("serviceWorker" in navigator) {
            registration = await navigator.serviceWorker.getRegistration("/service-worker.js");
            if (!registration) {
              registration = await navigator.serviceWorker.register("/service-worker.js");
            }
            // 서버에서 VAPID 공개키(JWT 암호화)를 받아옴
            const publicKeyRes = await iphonePublicKeyGetApi();
            if (!publicKeyRes) {
              throw new Error("VAPID 공개키를 받아오지 못했습니다.");
            }
            // 푸시 구독 요청
            const readyReg = await navigator.serviceWorker.ready;
            const subscription = await readyReg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: publicKeyRes,
            });
            await iphoneDevicePost(subscription);
          }
          return nav("/");
        } catch (err) {
          alert("푸시 구독 또는 서비스워커 등록에 실패했습니다.\n잠시 후 다시 시도해 주세요.");
          console.error("ServiceWorker or PushManager error:", err);
          return nav("/");
        }
      }

      // 웹은 성공 시 메인으로
      if (!isApp) {
        return nav("/");
      }

      // 앱(안드로이드 등) 기기 등록
      sendToApp("FCM_TOKEN", null, (data) => {
        if (data.success) {
          const deviceData = {
            name: data.name || "알 수 없음",
            fcm_token: data.token || null,
            is_active: true,
          };

          DeviceAdd(deviceData).then((res) => {
            if (!res || !res.success) {
              return alert("기기 등록에 실패했습니다.\n 잠시 후 다시 시도해 주세요.");
            } else {
              sendToApp("REFRESH_TOKEN", { refresh_token: res.refresh_token, device_id: res.device_id }, (data) => {
                if (data.success) {
                  return nav("/");
                } else {
                  alert("리프레시 토큰 저장에 실패했습니다.\n 잠시 후 다시 시도해 주세요.");
                  DeviceDelete(res.device_id)
                    .then(() => {
                      return setCertification_code("");
                    })
                    .catch((err) => {
                      return setCertification_code("");
                    });
                }
              });
            }
          });
        } else {
          return data.error;
        }
      });

      setStudent_id("");
      setPhone("");
      setCertification_code("");
    } catch (err) {
      console.error(err);
    }
  }, [student_id, phone, certification_code, isCertification, setCertification_code, setPhone, setStudent_id, isIos, isHomeApp, isApp, nav]);

  const onClickCertification = useCallback(async () => {
    if (!phone) return alert("전화번호를 입력해 주세요.");
    if (!/^010\d{8}$/.test(phone)) return alert("전화번호는 010으로 시작하는 11자리 숫자여야 합니다.");

    const res = await userSendCertificationCode(phone);
    if (res) {
      setIsCertification(true);
    }
  }, [phone]);

  const onKeyDownCertification = useCallback(
    (e) => {
      if (e.key === "Enter") {
        onClickCertification();
      }
    },
    [onClickCertification]
  );
  const onKeyDownLogin = useCallback(
    (e) => {
      if (e.key === "Enter") {
        onClickLogin();
      }
    },
    [onClickLogin]
  );

  return (
    <LogoLayout>
      <section className="loginPage flexCenter">
        {/* 중앙 */}
        <div className="centerBox">
          {/* 타이틀 */}
          <div className="titleBox">
            <h2 className="title">
              <span className="bold">로그인</span>
            </h2>
            <h4 className="subTitle">앱으로 로그인 한 경우 자동 기기 등록됩니다.</h4>
          </div>
          <div className="flexCol">
            <InputCP value={student_id} onChange={onChangeStudent_id} title="학번" placeholder="학번을 6자리 이상 입력해 주세요" />
            <div>
              <span className="smsButton" onClick={(e) => onClickCertification(e)}>
                발송
              </span>
              <InputCP value={phone} onChange={onChangePhone} title="휴대폰 번호" placeholder="숫자만 입력하세요" onKeyDown={onKeyDownCertification} />
            </div>
            {isCertification && (
              <InputCP
                value={certification_code}
                onChange={onChangeCertification_code}
                title="인증번호"
                placeholder="문자로 받은 6자릿값을 입력하세요"
                onKeyDown={onKeyDownLogin}
              />
            )}
          </div>
          <div className="bottomItem" onClick={onClickLogin}>
            <ButtonCP>다음</ButtonCP>
          </div>
        </div>
      </section>
    </LogoLayout>
  );
};
export default LoginPage;
