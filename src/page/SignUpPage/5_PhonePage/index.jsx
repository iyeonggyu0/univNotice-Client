import { useCallback, useEffect, useState } from "react";
import LogoLayout from "../../../layout/LogoLayout";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useInput } from "../../../hook/useInput";
import InputCP from "../../../component/_common/inputCP";
import { signupCertificationSend } from "../../../api/signUp/certification";
import ButtonCP from "../../../component/_common/buttonCP";
import { signupPost } from "../../../api/signUp/signup";
import { useWeb } from "../../../hook/useWeb";
import { iphoneDevicePost } from "../../../api/iphone";
import { iphonePublicKeyGetApi } from "../../../api/user/iphone";

const PhonePage = () => {
  const { isIos, isHomeApp, isApp } = useWeb();
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isIos && isHomeApp) return;
    if (isIos && !isHomeApp) return nav("/home-app");
  }, [isIos, isHomeApp, nav]);

  const isPhone = localStorage.getItem("phoneType");
  useEffect(() => {
    if (!isPhone) {
      alert("잘못된 접근입니다.\n회원가입 첫 페이지로 이동합니다.");
      nav("/signup/1");
    }
  }, [isPhone, nav]);

  const signupInfo = JSON.parse(localStorage.getItem("signupInfo"));
  const signupKeyword = JSON.parse(localStorage.getItem("signupKeyword"));

  useEffect(() => {
    if (!signupInfo || !signupKeyword) {
      alert("잘못된 접근입니다.\n회원가입 첫 페이지로 이동합니다.");
      nav("/signup/1");
    }
  }, []);

  const [name, onChangeName, setName] = useInput("");
  const [student_id, onChangeStudent_id, setStudent_id] = useInput("");
  const [phone, onChangePhone, setPhone] = useInput("");
  const [certification, onChangeCertification, setCertification] = useInput("");

  const [isCert, setIsCert] = useState(false);

  const onClickTerms = () => {
    window.open("/terms", "_blank");
  };

  const onCertificationClick = useCallback(
    async (e) => {
      e.preventDefault();
      if (isLoading) return;

      setIsLoading(true);

      // 010으로 시작하는 11자리 번호인지 체크
      if (!/^010\d{8}$/.test(phone.trim())) {
        alert("휴대폰 번호가 올바르지 않습니다.");
        return;
      }

      const data = await signupCertificationSend(phone.trim());
      setIsCert(data);
      setIsLoading(false);
    },
    [phone]
  );
  console.log(name, student_id, phone, certification);

  const onSignUpClick = useCallback(
    async (e) => {
      e.preventDefault();

      if (!signupInfo || !signupKeyword) {
        alert("잘못된 접근입니다.\n회원가입 첫 페이지로 이동합니다.");
        nav("/signup/1");
        return;
      }
      if (!setIsCert) {
        return alert("휴대폰 인증을 진행해 주세요.");
      }
      if (name.trim().length < 2) {
        alert("이름을 올바르게 입력해주세요");
        return;
      }

      if (student_id.trim().length < 6) {
        alert("학번은 6자리 이상 입력해주세요");
        return;
      }
      // 010으로 시작하는 11자리 번호인지 체크
      if (!/^010\d{8}$/.test(phone.trim())) {
        alert("휴대폰 번호가 올바르지 않습니다.");
        return;
      }
      if (certification.trim().length !== 6) {
        alert("인증번호는 6자리입니다.");
        return;
      }

      const data = {
        signupInfo: signupInfo,
        signupKeyword: signupKeyword,
        student_id: student_id.trim(),
        phone: phone.trim(),
        name: name.trim(),
        certification: certification,
        is_android: !isHomeApp && isPhone === "android" ? true : false,
      };

      try {
        const res = await signupPost(data);
        if (res && isIos && isHomeApp) {
          if (isHomeApp) {
            try {
              // 이미 등록된 서비스워커가 있으면 재등록하지 않음
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
                  applicationServerKey: publicKeyRes, // 서버의 APPLE_WEB_PUSH_VAPID_PUBLIC_KEY (base64로 변환)
                });
                const subscriptionPayload = typeof subscription.toJSON === "function" ? subscription.toJSON() : subscription;
                await iphoneDevicePost(subscriptionPayload);
              }
              return nav("/signup/8");
            } catch (err) {
              alert("푸시 구독 또는 서비스워커 등록에 실패했습니다.\n잠시 후 다시 시도해 주세요.");
              console.error("ServiceWorker or PushManager error:", err);
              return nav("/signup/8");
            }
          }
          return nav("/signup/8");
        }
        if (res && isApp) {
          nav("/signup/8");
          return;
        }

        if (res) {
          localStorage.removeItem("signupInfo");
          localStorage.removeItem("signupKeyword");
          localStorage.removeItem("signupCategory");
          setName("");
          setStudent_id("");
          setPhone("");
          setCertification("");
          nav("/signup/6");
        } else {
          alert("회원가입에 실패했습니다.\n잠시 후 다시 시도해주세요.");
        }
      } catch {
        alert("회원가입에 실패했습니다.\n잠시 후 다시 시도해주세요.");
      }
    },
    [
      name,
      student_id,
      phone,
      certification,
      signupInfo,
      isIos,
      isHomeApp,
      signupKeyword,
      nav,
      setName,
      setStudent_id,
      setPhone,
      setCertification,
      isApp,
      isPhone,
    ]
  );

  return (
    <LogoLayout>
      <section className="phonePage flexCenter">
        <div className="centerBox">
          <div className="titleBox">
            <h2 className="title">
              <span className="bold">마지막</span> 단계예요!
            </h2>
            <h4 className="subTitle">
              학교ㆍ학번이 중복되면 가입이 제한될 수 있어요
              <br />
              가입한 적이 없다면 카카오톡으로 문의 주세요
            </h4>
          </div>
          <div className="flexCol">
            <InputCP value={name} onChange={onChangeName} title="이름" />
            <InputCP value={student_id} onChange={onChangeStudent_id} title="학번" placeholder="6자리 이상 입력하세요" />
            <div className="relative">
              <span className="smsButton" onClick={(e) => onCertificationClick(e)}>
                발송
              </span>
              <InputCP
                value={phone}
                onChange={onChangePhone}
                title="휴대폰 번호"
                placeholder="숫자만 입력하세요"
                activate={() => {
                  return !isCert;
                }}
              />
            </div>
            {isCert && <InputCP value={certification} onChange={onChangeCertification} title="인증번호" placeholder="인증번호를 입력하세요" />}
          </div>
          {/* {student_id?.length >= 6 && isCert && certification?.length === 6 && ( */}
          <div className="bottomItem buttonBox">
            <div onClick={(e) => onSignUpClick(e)}>
              <ButtonCP>가입하기</ButtonCP>
            </div>
            <p className="terms">
              <span onClick={onClickTerms}>넘어갈 시 개인정보 처리 방침과 이용약관에 동의함으로 간주합니다.</span>
            </p>
          </div>
          {/* )} */}
        </div>
      </section>
    </LogoLayout>
  );
};
export default PhonePage;
