import "./style.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DownloadIcon from "@mui/icons-material/Download";

const NoticeListLiMobileCP = ({ data, url }) => {
  // 날짜 포맷팅: YYYY. MM. DD
  let formattedDate = "";
  if (data.published_at) {
    const dateObj = new Date(data.published_at);
    if (!isNaN(dateObj)) {
      formattedDate = dateObj.getFullYear() + ". " + String(dateObj.getMonth() + 1).padStart(2, "0") + ". " + String(dateObj.getDate()).padStart(2, "0");
    }
  }

  const onClickDiv = () => {
    window.open(data.original_url || url, "_blank", "noopener,noreferrer");
  };
  // NEW 뱃지 표시 여부 계산
  let showNew = false;
  if (data.published_at) {
    const now = new Date();
    const pubDate = new Date(data.published_at);
    if (pubDate.getDate() === now.getDate() && pubDate.getMonth() === now.getMonth() && pubDate.getFullYear() === now.getFullYear()) {
      showNew = true;
    } else {
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      if (pubDate.getDate() === yesterday.getDate() && pubDate.getMonth() === yesterday.getMonth() && pubDate.getFullYear() === yesterday.getFullYear()) {
        showNew = true;
      }
    }
  }
  return (
    <div className="noticeListLiMobileCP" onClick={onClickDiv}>
      <div className="noticeListLiMobileCP-title">
        {data.title}
        {showNew && <span style={{ color: "var(--orange)", fontWeight: 600, fontSize: "8px", marginLeft: "4px" }}>NEW</span>}
      </div>
      <div className="flexHeightCenter">
        <div className="noticeListLiMobileCP-author">{data.author}</div>
        <div className="line"></div>
        <div className="noticeListLiMobileCP-published_at">{formattedDate}</div>
        <div className="line"></div>
        {data.other_info && (
          <span
            style={{
              color: "var(--black-3)",
            }}>
            {data.other_info}
          </span>
        )}
        <div className="noticeListLiMobileCP-attachments">
          <DownloadIcon
            fontSize="small"
            style={{
              color: data.attachments ? "var(--black-4)" : "var(--black-2)",
              fontSize: "18px",
            }}
          />
        </div>
        {data.NoticeKeywordMatches.length !== 0 && (
          <div className="noticeListLiMobileCP-alarm">
            <NotificationsNoneIcon
              style={{
                fontSize: "18px",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default NoticeListLiMobileCP;
