import MainPageLayout from "../../../layout/MainPageLayout";
import "./style.css";

const Error404Page = () => {
  return (
    <MainPageLayout>
      <section className="error404Page flexCenter">
        <div className="error404Page-content">
          <div>{/* 이미지 */}</div>
          <p>잘못된 주소 입니다</p>
        </div>
      </section>
    </MainPageLayout>
  );
};
export default Error404Page;
