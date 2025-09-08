import "./style.css";

const ButtonCP = ({ children, color = "--black-0", bgColor = "--main-color", activate }) => {
  return (
    <div
      className="buttonCp flexCenter"
      style={{ color: `var(${color})`, backgroundColor: `var(${bgColor})`, cursor: activate ? "none" : "pointer", minHeight: "52px" }}>
      {children}
    </div>
  );
};
export default ButtonCP;
