import { useNavigate } from "react-router-dom";
import MyPageLayout from "../../../layout/MyPageLayout";
import "./style.css";
import ButtonCP from "../../../component/_common/buttonCP";
import { useCallback, useEffect, useState } from "react";
import { loginCheck } from "../../../api/user/loginCheck";
import { myPageCategoryEnabled, myPageCategoryLoad, myPageKeywordDelete, myPageKeywordPost } from "../../../api/user/myPage";

import CategoryCP from "../../../component/myCp/categoryCP";

const MySettingPage = () => {
  const nav = useNavigate();
  const [isLogin, setIsLogin] = useState(null);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    async function fetchLoginCheck() {
      try {
        const result = await loginCheck();
        const categoryDataRes = await myPageCategoryLoad();

        if (!result) {
          nav("/");
        }

        setIsLogin(result);
        setCategoryData(categoryDataRes);
        console.log(categoryDataRes);
      } catch (err) {
        console.error(err);
      }
    }
    fetchLoginCheck();
  }, []);

  useEffect(() => {
    if (isLogin === false) {
      alert("로그인 후 이용해 주세요.");
      return nav("/login");
    }
  }, [isLogin]);

  /**
   * 카테고리 수정
   * @param {number} id - 크롤링 ID
   */
  const onEnabledCategory = useCallback(async (id, value) => {
    if (value === false) {
      if (!window.confirm("해당 카테고리에 대한 알림을 받지 않습니다.")) {
        return; // 취소 눌렀을 때 함수 종료
      }
    }

    try {
      const categoryDataRes = await myPageCategoryEnabled(id, value);
      if (!categoryDataRes) {
        return alert("기기삭제에 실패 했습니다\n나중에 다시 시도해주세요");
      }
      setCategoryData(categoryDataRes);
    } catch (err) {
      console.error(err);
    }
  }, []);

  /**
   * 키워드 삭제
   * @param {number} id - 키워드 id
   */
  const onDeleteKeyword = useCallback(async (id) => {
    try {
      const categoryDataRes = await myPageKeywordDelete(id);
      if (!categoryDataRes) {
        return alert("키워드 실패 했습니다\n나중에 다시 시도해주세요");
      }
      setCategoryData(categoryDataRes);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const onPostKeyword = useCallback(async (category_id, keyword) => {
    try {
      const categoryDataRes = await myPageKeywordPost({ category_id, keyword });
      if (!categoryDataRes) {
        return alert("키워드 추가에 실패 했습니다\n나중에 다시 시도해주세요");
      }
      setCategoryData(categoryDataRes);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <MyPageLayout>
      <section className="mySettingPage flexCenter">
        {/* 중앙 */}
        <div className="centerBox">
          {/* 타이틀 */}
          <div className="titleBox">
            <h2 className="title">
              <span className="bold">공지 설정</span>
            </h2>
            <h4 className="subTitle">공지별 알람 On/Off 및 키워드를 설정</h4>
          </div>
          {/* 인풋요소 */}
          <div className="flexCol">
            {categoryData
              ?.sort((a, b) => a.id - b.id)
              .map((category, idx) => (
                <CategoryCP
                  key={idx}
                  category={category}
                  onEnabledCategory={onEnabledCategory}
                  onDeleteKeyword={onDeleteKeyword}
                  onPostKeyword={onPostKeyword}
                />
              ))}
          </div>
        </div>
      </section>
    </MyPageLayout>
  );
};
export default MySettingPage;
