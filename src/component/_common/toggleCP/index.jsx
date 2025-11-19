import { useEffect, useState, useRef } from "react";
import "./style.css";

const ToggleCP = ({ title = "", value = true, onClickFun }) => {
  const [toggleValue, setToggleValue] = useState(value);
  const isInitialMount = useRef(true);

  // value prop이 변경될 때 내부 상태 업데이트
  useEffect(() => {
    setToggleValue(value);
  }, [value]);

  useEffect(() => {
    // 초기 마운트 시에는 실행하지 않음
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    onClickFun(toggleValue);
  }, [toggleValue]); // onClickFun 의존성 제거

  return (
    <div className="toggleCP">
      <p>{title}</p>
      <div>
        <div
          onClick={() => {
            setToggleValue((prev) => !prev);
          }}
          className={`toggleCp-container ${toggleValue ? "active" : ""}`}>
          <div className={`toggleCp-circle`}></div>
        </div>
      </div>
    </div>
  );
};
export default ToggleCP;
