import "./style.css";

const ButtonToggleCP = ({ toggleValue, onClickToggle, title }) => {
  return (
    <div onClick={onClickToggle} className={`buttonToggleCP ${toggleValue ? "select" : ""}`}>
      {title}
    </div>
  );
};
export default ButtonToggleCP;
