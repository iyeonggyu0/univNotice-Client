import Footer from "../Footer";
import MyPageHeader from "./Header";

const MyPageLayout = ({ children }) => {
  return (
    <section>
      <MyPageHeader />
      <div style={{ width: "100%", height: "100vh", paddingTop: "64px" }}>{children}</div>
      <Footer />
    </section>
  );
};
export default MyPageLayout;
