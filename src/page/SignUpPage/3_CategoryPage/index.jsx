import { useCallback, useEffect, useState } from "react";
import "./style.css";
import { signupCategoryLoad } from "../../../api/signUp/load";
import LogoLayout from "../../../layout/LogoLayout";
import ButtonToggleCP from "../../../component/_common/buttonToggleCP";
import ButtonCP from "../../../component/_common/buttonCP";

const CategoryPage = () => {
  const userInfo = JSON.parse(localStorage.getItem("signupInfo"));
  const [categoryList, setCategoryList] = useState([]);

  const loadCategoryData = useCallback(async () => {
    if (!userInfo) return;
    const { school_id, department_id } = userInfo;
    try {
      const data = await signupCategoryLoad(school_id, department_id);
      setCategoryList(data || []);
    } catch (error) {
      console.error("카테고리 데이터 로드 오류:", error);
    }
  }, []);

  useEffect(() => {
    if (!userInfo) {
      window.confirm("잘못된 접근입니다. 회원가입 첫 페이지로 이동합니다.");
      window.location.href = "/signup/1";
    }

    loadCategoryData();
  }, []);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const toggleCategory = (data) => {
    const isSelected = selectedCategories.find((item) => item.id === data.id);
    if (isSelected) {
      setSelectedCategories(selectedCategories.filter((item) => item.id !== data.id));
    } else {
      setSelectedCategories([...selectedCategories, { id: data.id, category: data.category }]);
    }
  };

  const nextButtonClick = () => {
    if (selectedCategories.length === 0) {
      alert("하나 이상의 카테고리를 선택해 주세요.");
      return;
    }
    localStorage.setItem("signupCategory", JSON.stringify(selectedCategories));
    window.location.href = "/signup/4/1";
  };

  return (
    <LogoLayout>
      <section className="categoryPage flexCenter">
        <div className="centerBox">
          <div className="titleBox">
            <h2 className="title">
              알림 받을 <span className="bold">공지</span>를
              <br />
              선택해 주세요!
            </h2>
            <h4 className="subTitle">이후 카테고리 별 키워드를 설정합니다</h4>
          </div>
          {categoryList?.length > 0 && (
            <div className="flexCol" style={{ gap: "26px", width: "100%" }}>
              {categoryList?.map((data, idx) => (
                <ButtonToggleCP key={idx} data={data} isSelected={selectedCategories.some((item) => item.id === data.id)} onClickToggle={toggleCategory} />
              ))}
            </div>
          )}
          <div className="bottomItem" onClick={nextButtonClick}>
            <ButtonCP>다음</ButtonCP>
          </div>
        </div>
      </section>
    </LogoLayout>
  );
};
export default CategoryPage;
