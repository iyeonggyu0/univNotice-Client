import Footer from "../Footer";
import MyPageHeader from "./Header";

const MyPageLayout = ({ children }) => {
  return (
    <section style={{ width: "100%", height: "100vh" }}>
      <MyPageHeader />
      <div style={{ width: "100%", height: "100vh" }}>{children}</div>
    </section>
  );
};
export default MyPageLayout;
