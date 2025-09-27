import { useMedia } from "../../hook/useMedia";
import { useWeb } from "../../hook/useWeb";
import Footer from "../Footer";
import MyPageHeader from "./Header";

const MyPageLayout = ({ children }) => {
  const isApp = useWeb().isApp;
  const isPc = useMedia().isPc;
  return (
    <section style={{ width: "100%", height: "100vh", paddingTop: !isApp ? 0 : "18px" }}>
      <MyPageHeader />
      <div style={{ width: "100%", height: isPc ? "100vh" : "96vh" }}>{children}</div>
    </section>
  );
};
export default MyPageLayout;
