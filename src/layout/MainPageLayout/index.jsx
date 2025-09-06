import Footer from "../Footer";
import MainPageLayoutHeader from "./Header";

const MainPageLayout = ({ children }) => {
  return (
    <section>
      <MainPageLayoutHeader />
      <div style={{ width: "100%", height: "100vh", paddingTop: "64px" }}>{children}</div>
      <Footer />
    </section>
  );
};
export default MainPageLayout;
