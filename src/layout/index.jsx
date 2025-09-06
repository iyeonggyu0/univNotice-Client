import Footer from "./Footer";
import Header from "./Header";

const MainLayout = ({ children }) => {
  return (
    <section>
      <Header />
      <div style={{ width: "100%", height: "100vh", paddingTop: "64px" }}>{children}</div>
      <Footer />
    </section>
  );
};
export default MainLayout;
