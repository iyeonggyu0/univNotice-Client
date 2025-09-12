import { useState } from "react";
import InputCP from "../../../component/_common/inputCP";
import LogoLayout from "../../../layout/LogoLayout";
import "./style.css";
import { useInput } from "../../../hook/useInput";
import { useEffect } from "react";
import ButtonCP from "../../../component/_common/buttonCP";

const InfoPage = () => {
  // 학교목록
  const [univList, onChangeUnivList, setUnivList] = useInput([]);
  // 선택된 학과의 학과목록
  const [department, onChangeDepartment, setDepartment] = useInput([]);
  // 학번
  const [studentId, onChangeStudentId, setStudentId] = useInput("");

  // 0:로딩, 1: 학교선택, 2: 학과선택, 3: 학번입력
  const [step, setStep] = useState(0);

  const [nextButtonActivate, setNextButtonActivate] = useState(false);

  useEffect(() => {
    if (step === 0) {
      // 학교목록 불러오기
    }
  }, []);

  return (
    <LogoLayout>
      <section className="infoPage flexCenter">
        {/* 중앙 */}
        <div className="centerBox">
          {/* 타이틀 */}
          <div className="titleBox">
            <h2 className="title">
              <span className="bold">학교 정보</span>를 알려주세요!
            </h2>
            <h4 className="subTitle">학교 / 학과에 따라 설정 내용이 달라져요</h4>
          </div>
          {/* 인풋요소 */}
          <div className="flexCol">
            {step === 1 && univList?.length > 0 && (
              <div>
                <InputCP onChange={onChangeUnivList} />
              </div>
            )}
          </div>
          {/* 다음버튼 */}
          <div className="bottomItem">{nextButtonActivate && <ButtonCP>다음</ButtonCP>}</div>
        </div>
      </section>
    </LogoLayout>
  );
};
export default InfoPage;
