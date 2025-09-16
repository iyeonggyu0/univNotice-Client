import { useCallback, useState } from "react";
import InputCP from "../../../component/_common/inputCP";
import LogoLayout from "../../../layout/LogoLayout";
import "./style.css";
import { useInput } from "../../../hook/useInput";
import { useEffect } from "react";
import ButtonCP from "../../../component/_common/buttonCP";
import { signupDepartmentLoad, signupSchoolLoad } from "../../../api/signUp/load";
import SelectCP from "../../../component/_common/selectCP";

const InfoPage = () => {
  // 학교목록
  const [univList, setUnivList] = useState([]);
  // 선택된 학과의 학과목록
  const [departmentList, setDepartmentList] = useState([]);
  // 학번
  const [student_id, onChangeStudent_id, setStudent_id] = useInput("");

  // 0:로딩, 1: 학교선택, 2: 학과선택, 3: 학번입력
  const [step, setStep] = useState(0);

  const [nextButtonActivate, setNextButtonActivate] = useState(false);

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
    setNextButtonActivate(false);
  };

  const onChangeDepartment = (value) => {
    setSelectedDepartment(value);
    setStep(3);
    setNextButtonActivate(false);
  };

  const onChangeStudentId = (e) => {
    onChangeStudent_id(e);
    if (e.target.value.length > 0) {
      setNextButtonActivate(true);
    } else {
      setNextButtonActivate(false);
    }
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

  console.log(step, selectedUniv, selectedDepartment);

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

            {step >= 3 && (
              <div>
                <InputCP title="학번" value={student_id} onChange={onChangeStudentId} essential={true} placeholder="학번을 입력해주세요" />
              </div>
            )}
          </div>
          {/* 다음버튼 */}
          <div className="bottomItem">{nextButtonActivate && <ButtonCP>다음</ButtonCP>}</div>
          {/* TODO: 여기 api 제작 */}
        </div>
      </section>
    </LogoLayout>
  );
};
export default InfoPage;
