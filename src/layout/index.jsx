import { useMedia } from "../hook/useMedia";
import { useWeb } from "../hook/useWeb";
import Footer from "./Footer";
import Header from "./Header";

const MainLayout = ({ children }) => {
  const isApp = useWeb().isApp;
  const isPc = useMedia().isPc;
  return (
    <section style={{ width: "100%", height: "100vh", paddingTop: !isApp ? 0 : "18px", backgroundColor: "#F3F3F3" }}>
      <Header />
      <div style={{ width: "100%", height: isPc ? "100vh" : "96vh" }}>{children}</div>
      <Footer />
    </section>
  );
};
export default MainLayout;
