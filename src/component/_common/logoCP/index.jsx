import { useNavigate } from "react-router-dom";

const LogoCP = () => {
  const nav = useNavigate();
  return (
    <div onClick={() => nav("/")} style={{ fontSize: "24px", fontWeight: "normal", cursor: "pointer" }}>
      <span style={{ fontWeight: "bold" }}>UNIV N</span>otice
    </div>
  );
};
export default LogoCP;
