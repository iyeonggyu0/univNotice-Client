import Footer from "./Footer";
import Header from "./Header";

const MainLayout = ({ children }) => {
  return (
    <section style={{ width: "100%", height: "100vh" }}>
      <Header />
      <div style={{ width: "100%", height: "100vh" }}>{children}</div>
      <Footer />
    </section>
  );
};
export default MainLayout;
