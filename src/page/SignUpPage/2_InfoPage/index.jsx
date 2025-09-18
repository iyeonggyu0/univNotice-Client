import { useCallback, useState } from "react";
import InputCP from "../../../component/_common/inputCP";
import LogoLayout from "../../../layout/LogoLayout";
import "./style.css";
import { useEffect } from "react";
import ButtonCP from "../../../component/_common/buttonCP";
import { signupDepartmentLoad, signupSchoolLoad } from "../../../api/signUp/load";
import SelectCP from "../../../component/_common/selectCP";
import { useNavigate } from "react-router-dom";

const InfoPage = () => {
  const nav = useNavigate();

  // 학교목록
  const [univList, setUnivList] = useState([]);
  // 선택된 학과의 학과목록
  const [departmentList, setDepartmentList] = useState([]);
  // 학번
  // const [student_id, onChangeStudent_id, setStudent_id] = useInput("");

  // 0:로딩, 1: 학교선택, 2: 학과선택
  const [step, setStep] = useState(0);

  const [selectedUniv, setSelectedUniv] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    if (step !== 0) return;
    loadSchoolData();
  }, []);

  const onChangeUniv = (value) => {
    setSelectedUniv(value);
    loadDepartmentData(value);
    setStep(1);
  };

  const onChangeDepartment = (value) => {
    setSelectedDepartment(value);
    setStep(3);
  };

  const loadSchoolData = useCallback(async () => {
    try {
      const data = await signupSchoolLoad();
      setUnivList(data || []);
      setStep(1);
    } catch (error) {
      console.error("학교 데이터 로드 오류:", error);
    }
  }, []);

  const loadDepartmentData = useCallback(async (schoolId) => {
    if (!schoolId) return;
    try {
      const data = await signupDepartmentLoad(schoolId);
      setDepartmentList(data || []);
      setStep(2);
    } catch (error) {
      console.error("학과 데이터 로드 오류:", error);
    }
  }, []);

  const nextButtonClick = useCallback(() => {
    if (step !== 3) return;
    if (!selectedUniv || !selectedDepartment) return;

    localStorage.setItem("signupInfo", JSON.stringify({ school_id: selectedUniv, department_id: selectedDepartment }));

    if (window.confirm("입력하신 정보로 회원가입을 진행할까요?\n정확하지 않은 정보는 탈퇴처리될 수 있습니다.")) {
      nav("/signup/3");
    }
  }, [step, selectedUniv, selectedDepartment, nav]);

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
          <div className="flexCol" style={{ gap: "26px", width: "100%" }}>
            {step >= 1 && (
              <div>
                <SelectCP title="학교" dataList={univList} value={selectedUniv} onChangeFunc={onChangeUniv} />
              </div>
            )}
            {step >= 2 && (
              <div>
                <SelectCP title="학과" dataList={departmentList} value={selectedDepartment} onChangeFunc={onChangeDepartment} />
              </div>
            )}
          </div>
          {/* 다음버튼 */}
          {step === 3 && (
            <div className="bottomItem" onClick={nextButtonClick}>
              <ButtonCP>다음</ButtonCP>
            </div>
          )}
        </div>
      </section>
    </LogoLayout>
  );
};
export default InfoPage;
