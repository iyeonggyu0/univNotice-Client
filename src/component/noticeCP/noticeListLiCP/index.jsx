import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DownloadIcon from "@mui/icons-material/Download";

const NoticeListLiCP = ({ data, url }) => {
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
    const diff = now - pubDate;
    // 오늘 또는 어제
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
    <div className="noticeListLiCP" style={{ cursor: "pointer" }} onClick={onClickDiv}>
      <div className="noticeListLiCP-title flexHeightCenter" style={{ gap: "6px" }}>
        {data.title}
        {showNew && <span style={{ color: "var(--orange)", fontWeight: 600, fontSize: "12px", marginLeft: "4px" }}>NEW</span>}
        {data.other_info && (
          <span
            style={{
              color: "var(--black-2)",
            }}>
            {data.other_info}
          </span>
        )}
        {data.NoticeKeywordMatches.length !== 0 && (
          <NotificationsNoneIcon
            // fontSize="xSmall"
            style={{
              color: "var(--point-color-1)",
            }}
          />
        )}
      </div>
      <div className="noticeListLiCP-author">{data.author}</div>
      <div className="noticeListLiCP-attachments">
        <DownloadIcon style={{ fontSize: "14px", color: data.attachments ? "var(--black-4)" : "var(--black-2)" }} />
      </div>
      <div className="noticeListLiCP-published_at">{formattedDate}</div>
    </div>
  );
};
export default NoticeListLiCP;
