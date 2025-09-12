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
 * @returns JSX.Element
 */

const InputCP = ({ value = "", onChange, title = "", activate = true, width = "100%", height = "62px", essential = false, placeholder = "" }) => {
  return (
    <div style={{ width, height }}>
      <p>
        {title}
        {essential && <span style={{ color: "orange" }}>*</span>}
      </p>
      <input value={value} onChange={onChange} placeholder={placeholder} disabled={!activate} style={{ width: width, height: height }} />
    </div>
  );
};

export default InputCP;
