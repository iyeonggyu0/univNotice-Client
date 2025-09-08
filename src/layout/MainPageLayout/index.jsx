import Footer from "../Footer";
import MainPageLayoutHeader from "./Header";

const MainPageLayout = ({ children }) => {
  return (
    <section style={{ width: "100%", height: "100vh" }}>
      <MainPageLayoutHeader />
      <div style={{ width: "100%", height: "100vh" }}>{children}</div>
    </section>
  );
};
export default MainPageLayout;
