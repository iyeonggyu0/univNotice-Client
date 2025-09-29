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

const LoginPage = () => {
  const isApp = useWeb().isApp;

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
  const nav = useNavigate();
  const [student_id, onChangeStudent_id, setStudent_id] = useInput("");
  const [phone, onChangePhone, setPhone] = useInput("");
  const [certification_code, onChangeCertification_code, setCertification_code] = useInput("");

  const [isCertification, setIsCertification] = useState(false);

  const onClickLogin = useCallback(async () => {
    if (!isCertification) return alert("핸드폰 인증을 진행해 주세요.");

    if (!student_id) return alert("학번을 입력해 주세요.");

    if (student_id.length < 6) return alert("학번은 6자리 이상이어야 합니다.");
    if (!/^\d+$/.test(student_id)) return alert("학번은 숫자만 입력해야 합니다.");

    if (!phone) return alert("전화번호를 입력해 주세요.");

    if (!/^010\d{8}$/.test(phone)) return alert("전화번호는 010으로 시작하는 11자리 숫자여야 합니다.");

    if (!certification_code) return alert("인증번호를 입력해 주세요.");

    if (!/^.{6}$/.test(certification_code)) return alert("인증번호는 6자리여야 합니다.");

    const data = {
      student_id: student_id,
      phone: phone,
      certification_code: certification_code,
    };

    try {
      const isLogin = await userLogin(data);
      // 로그인 실패
      if (!isLogin) {
        setCertification_code("");
        return alert("로그인에 실패했습니다.\n 잠시 후 다시 시도해 주세요.");
      }

      // 웹은 성공 시 메인으로
      if (!isApp) {
        return nav("/");
      }

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
              // res.refresh_token으로 수정
              sendToApp("REFRESH_TOKEN", { refresh_token: res.refresh_token, device_id: res.device_id }, (data) => {
                if (data.success) {
                  return nav("/");
                } else {
                  alert("리프레시 토큰 저장에 실패했습니다.\n 잠시 후 다시 시도해 주세요.");
                  // 리프레시 토큰 저장 실패 시 등록된 기기 삭제
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
  }, [student_id, phone, certification_code]);

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
