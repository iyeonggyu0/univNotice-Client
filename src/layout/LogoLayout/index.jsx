import LogoCP from "../../component/_common/logoCP";
import { useMedia } from "../../hook/useMedia";
import { useWeb } from "../../hook/useWeb";
import Header from "../Header";

const LogoLayout = ({ children }) => {
  const isPc = useMedia().isPc;
  const isApp = useWeb().isApp;
  return (
    <section style={{ width: "100%", height: "100vh", paddingTop: !isApp ? 0 : "18px" }}>
      <header style={{ width: "100%", height: "64px", zIndex: "999", padding: isPc ? "0 2rem" : "0 1rem", position: "absolute" }} className="flexHeightCenter">
        <LogoCP />
      </header>
      <div style={{ width: "100%", height: isPc ? "100vh" : "96vh" }}>{children}</div>
    </section>
  );
};
export default LogoLayout;
