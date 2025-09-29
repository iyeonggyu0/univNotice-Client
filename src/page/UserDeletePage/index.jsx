import { useEffect } from "react";
import MainLayout from "../../layout";
import "./style.css";
import { loginCheck } from "../../api/user/loginCheck";
import { useNavigate } from "react-router-dom";
import { useWeb } from "../../hook/useWeb";
import { useState } from "react";
import { useInput } from "../../hook/useInput";
import { userSendCertificationCode } from "../../api/user/login";
import { userDelete } from "../../api/user/login";
import { useCallback } from "react";
import InputCP from "../../component/_common/inputCP";
import ButtonCP from "../../component/_common/buttonCP";
import { sendToApp } from "../../api/app/webToApp";

const UserDeletePage = () => {
  const nav = useNavigate();
  const isApp = useWeb().isApp;
  useEffect(() => {
    async function fetchLoginCheck() {
      try {
        const result = await loginCheck();
        if (!result) {
          alert("로그인 세션이 만료되었습니다.");
          return nav("/");
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchLoginCheck();
  }, [nav]);

  const [student_id, onChangeStudent_id, setStudent_id] = useInput("");
  const [phone, onChangePhone, setPhone] = useInput("");
  const [certification_code, onChangeCertification_code, setCertification_code] = useInput("");

  const [isCertification, setIsCertification] = useState(false);

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

  const onClickDelete = useCallback(async () => {
    if (!isCertification) return alert("핸드폰 인증을 진행해 주세요.");

    if (!student_id) return alert("학번을 입력해 주세요.");
    if (student_id.length < 6) return alert("학번은 6자리 이상이어야 합니다.");
    if (!/^\d+$/.test(student_id)) return alert("학번은 숫자만 입력해야 합니다.");
    if (!phone) return alert("전화번호를 입력해 주세요.");
    if (!/^010\d{8}$/.test(phone)) return alert("전화번호는 010으로 시작하는 11자리 숫자여야 합니다.");
    if (!certification_code) return alert("인증번호를 입력해 주세요.");
    if (!/^.{6}$/.test(certification_code)) return alert("인증번호는 6자리여야 합니다.");

    const confirmDelete = window.confirm("정말로 회원탈퇴를 하시겠습니까?\n탈퇴 후에는 모든 데이터가 삭제되며 복구할 수 없습니다.");
    if (!confirmDelete) return;

    const data = {
      student_id: student_id,
      phone: phone,
      certification_code: certification_code,
    };

    const result = await userDelete(data);

    if (isApp) {
      sendToApp("DELETE_REFRESH_TOKEN", null);
    }

    if (result) {
      alert("회원탈퇴가 완료되었습니다.");
      nav("/");
    }
  }, [isCertification, student_id, phone, certification_code, nav, isApp]);

  const onKeyDownDelete = useCallback(
    (e) => {
      if (e.key === "Enter") {
        onClickDelete();
      }
    },
    [onClickDelete]
  );
  return (
    <MainLayout>
      <section className="userDeletePage flexCenter">
        {/* 중앙 */}
        <div className="centerBox">
          {/* 타이틀 */}
          <div className="titleBox">
            <h2 className="title">
              <span className="bold">회원탈퇴</span>
            </h2>
            <h4 className="subTitle">가입한 정보를 입력해 주세요</h4>
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
                onKeyDown={onKeyDownDelete}
              />
            )}
          </div>
          <div className="bottomItem" onClick={onClickDelete}>
            <ButtonCP bgColor="--red">회원탈퇴</ButtonCP>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};
export default UserDeletePage;
