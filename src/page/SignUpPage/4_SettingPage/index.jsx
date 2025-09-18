import "./style.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LogoLayout from "../../../layout/LogoLayout";
import SettingCP from "../../../component/settingCP";

const SettingPage = () => {
  const nav = useNavigate();
  const setting_id = useParams().setting_id;

  const category = JSON.parse(localStorage.getItem("signupCategory"));

  useEffect(() => {
    if (!setting_id) {
      alert("잘못된 접근입니다.\n회원가입 첫 페이지로 이동합니다.");
      nav("/signup/1");
    }

    if (!category) {
      alert("잘못된 접근입니다.\n회원가입 첫 페이지로 이동합니다.");
      nav("/signup/1");
    }

    if (isNaN(setting_id) || setting_id < 1 || setting_id > category.length) {
      alert("잘못된 접근입니다.\n회원가입 첫 페이지로 이동합니다.");
      nav("/signup/1");
    }
  }, []);

  const [settingCategory, setSettingCategory] = useState(
    category
      .slice() // 원본 배열 복사(불변성)
      .sort((a, b) => a.id - b.id)
      .map((item) => ({ ...item, keywords: [] }))
  );

  // 현재 카테고리의 키워드 배열을 업데이트하는 함수
  const setKeywordFunc = (updatedKeywords) => {
    setSettingCategory((prev) => {
      const newArr = [...prev];
      newArr[Number(setting_id) - 1] = {
        ...newArr[Number(setting_id) - 1],
        keywords: updatedKeywords,
      };
      return newArr;
    });
  };

  const nextButtonClick = () => {
    localStorage.setItem("signupKeyword", JSON.stringify(settingCategory));
    if (category.length > Number(setting_id)) {
      nav(`/signup/4/${Number(setting_id) + 1}`);
    } else {
      nav("/signup/5");
    }
  };

  console.log(settingCategory);
  return (
    <LogoLayout>
      <section className="settingPage flexCenter">
        {settingCategory?.length >= 1 && (
          <SettingCP data={settingCategory[Number(setting_id) - 1]} key={setting_id} setKeywordFunc={setKeywordFunc} nextButtonClick={nextButtonClick} />
        )}
      </section>
    </LogoLayout>
  );
};
export default SettingPage;
