import { useEffect, useState } from "react";
import "./style.css";

const ToggleCP = ({ title = "", value = true, onClickFun }) => {
  const [toggleValue, setToggleValue] = useState(value);

  // value prop이 변경될 때 내부 상태 업데이트
  useEffect(() => {
    setToggleValue(value);
  }, [value]);

  useEffect(() => {
    onClickFun(toggleValue);
  }, [toggleValue, onClickFun]);

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
