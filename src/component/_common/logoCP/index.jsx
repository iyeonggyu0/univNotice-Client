import { useNavigate } from "react-router-dom";
import { useMedia } from "../../../hook/useMedia";

const LogoCP = () => {
  const nav = useNavigate();
  const isMobile = useMedia().isMobile;
  return (
    <div onClick={() => nav("/")} style={{ fontSize: isMobile ? "22px" : "24px", fontWeight: "normal", cursor: "pointer" }}>
      <span style={{ fontWeight: "bold" }}>UNIV N</span>otice
    </div>
  );
};
export default LogoCP;
