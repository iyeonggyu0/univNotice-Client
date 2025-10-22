import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { noticeLoad } from "../../api/notice";
import { loginCheck } from "../../api/user/loginCheck";
import "./style.css";
import Header from "../../layout/Header";
import { useMedia } from "../../hook/useMedia";
import { useWeb } from "../../hook/useWeb";
import NoticeListLiCP from "../../component/noticeCP/noticeListLiCP";
import NoticeListLiMobileCP from "../../component/noticeCP/noticeListLiMobileCP";

const NoticePage = () => {
  const nav = useNavigate();
  const [noticeData, setNoticeData] = useState([]);
  const [login, setLogin] = useState(false);
  const [title, setTitle] = useState("");
  const [paging, setPaging] = useState(0);
  const [pagingData, setPagingData] = useState([]);
  const [alarmOnly, setAlarmOnly] = useState(false);

  const isPc = useMedia().isPc;
  const isApp = useWeb().isApp;

  // 초기 데이터 로드
  useEffect(() => {
    async function fetchLoginCheck() {
      try {
        const notice = await noticeLoad();
        const isLogin = await loginCheck();

        if (!isLogin) {
          alert("로그인이 필요합니다");
          return nav("/login");
        }

        setLogin(isLogin);
        setNoticeData(notice || []);
        setTitle(notice?.[0]?.category || "");
        setPaging(0);
      } catch (err) {
        console.error(err);
      }
    }
    fetchLoginCheck();
  }, []);

  // alarmOnly/paging/noticeData 변경 시 목록 재계산
  useEffect(() => {
    const base = noticeData[paging]?.Notices || [];
    if (alarmOnly) {
      setPagingData(base.filter((d) => (d.NoticeKeywordMatches?.length || 0) > 0));
    } else {
      setPagingData(base);
    }
  }, [noticeData, paging, alarmOnly]);

  return (
    <div className="noticePageOut" style={{ width: "100%", height: "100vh", paddingTop: !isApp ? 0 : "18px", backgroundColor: "#fff" }}>
      <Header />
      {login && (
        <div style={{ width: "100%", height: isPc ? "100vh" : "96vh" }} className="noticePage">
          <div className="centerSection">
            <h2>{title}</h2>
            <div className="alarmCheck flexHeightCenter" style={{ gap: "16px", cursor: "pointer" }}>
              <div></div>
              <div className="flexHeightCenter" style={{ gap: "8px" }}>
                <input
                  type="checkbox"
                  id="alarmOnly"
                  checked={alarmOnly}
                  onChange={(e) => {
                    setAlarmOnly(e.target.checked); // 계산은 useEffect에서 처리
                  }}
                  style={{ accentColor: "var(--main-color)", width: 18, height: 18, cursor: "pointer" }}
                />
                <label htmlFor="alarmOnly" style={{ cursor: "pointer", userSelect: "none" }}>
                  알림 공지만 보기
                </label>
              </div>
            </div>
            <div className="noticeNav">
              {noticeData.map((data, index) => {
                // 어제~오늘 공지 포함 여부 계산
                let hasRecent = false;
                if (Array.isArray(data.Notices)) {
                  const now = new Date();
                  const yesterday = new Date(now);
                  yesterday.setDate(now.getDate() - 1);
                  hasRecent = data.Notices.some((notice) => {
                    if (!notice.published_at) return false;
                    const pubDate = new Date(notice.published_at);
                    const isToday = pubDate.getDate() === now.getDate() && pubDate.getMonth() === now.getMonth() && pubDate.getFullYear() === now.getFullYear();
                    const isYesterday =
                      pubDate.getDate() === yesterday.getDate() &&
                      pubDate.getMonth() === yesterday.getMonth() &&
                      pubDate.getFullYear() === yesterday.getFullYear();
                    return isToday || isYesterday;
                  });
                }
                return (
                  <div
                    onClick={() => {
                      setTitle(data.category);
                      setPaging(index); // 계산은 useEffect에서 처리
                    }}
                    key={index}
                    className="navBtn"
                    style={{
                      color: index === paging ? "var(--black-5)" : "var(--black-4)",
                      fontWeight: index === paging ? "600" : "400",
                    }}>
                    <div className="text">
                      {data.category}
                      {(index !== paging || hasRecent) && <div className="point" style={{ backgroundColor: "var(--orange)" }}></div>}
                    </div>
                    <div className="line"></div>
                  </div>
                );
              })}
            </div>
            <div className="noticeList">
              {isPc && (
                <div className="noticeListLiCPTitle">
                  <div className="noticeListLiCP-title">제목</div>
                  <div className="noticeListLiCP-author">작성자</div>
                  <div className="noticeListLiCP-attachments">첨부파일</div>
                  <div className="noticeListLiCP-published_at">등록일</div>
                </div>
              )}
              {isPc && pagingData.length > 0 && pagingData.map((data, idx) => <NoticeListLiCP url={noticeData[paging].url} key={idx} data={data} />)}
              {!isPc && pagingData.length > 0 && pagingData.map((data, idx) => <NoticeListLiMobileCP url={noticeData[paging].url} key={idx} data={data} />)}

              {pagingData.length === 0 && !alarmOnly && <div className="notdefine-deivce flexCenter">등록된 공지가 없습니다</div>}
              {pagingData.length === 0 && alarmOnly && <div className="notdefine-deivce flexCenter">알람 설정에 부합하는 공지가 없습니다.</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default NoticePage;
