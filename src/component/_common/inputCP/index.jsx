import "./style.css";

/**
 *
 * @param {string} value 초기 값 (기본값: "")
 * @param {function} onChange 변경 함수 (필수)
 * @param {string} title 제목 (기본값: "")
 * @param {boolean} activate 입력 활성화 여부 (기본값: true)
 * @param {string} width 가로길이 (기본값: "100%")
 * @param {string} height 세로길이 (기본값: "62px")
 * @param {boolean} essential 필수 여부 (기본값: false)
 * @param {string} placeholder 미리보기 (기본값: "")
 * @param {boolean} pw 비밀번호 여부 (기본값: false)
 * @param {function} onKeyDown 키다운 이벤트 함수 (기본값: undefined)
 * @returns JSX.Element
 */

const InputCP = ({
  value = "",
  onChange,
  title = "",
  activate = true,
  width = "100%",
  height = "3.875rem",
  essential = false,
  placeholder = "",
  pw = false,
  onKeyDown = undefined,
}) => {
  const inputStyle = {
    width,
    height,
    ...(activate
      ? {}
      : {
          background: "#F2F2F2",
          boxShadow: "inset 0px 0px 5px rgba(0, 0, 0, 0.25)",
          color: "var(--black-5)",
        }),
  };
  return (
    <div className="inputCP" style={{ width }}>
      <p>
        {title}
        {essential && <span>*</span>}
      </p>
      <input
        type={pw ? "password" : "text"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={!activate}
        style={inputStyle}
        onKeyDown={typeof onKeyDown === "function" ? onKeyDown : undefined}
      />
    </div>
  );
};

export default InputCP;
