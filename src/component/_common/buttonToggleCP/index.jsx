import "./style.css";

const ButtonToggleCP = ({ data, isSelected, onClickToggle }) => (
  <div onClick={() => onClickToggle(data)} className={`buttonToggleCP ${isSelected ? "select" : ""}`}>
    {data.category}
  </div>
);

export default ButtonToggleCP;
