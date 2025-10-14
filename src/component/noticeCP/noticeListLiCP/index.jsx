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
  return (
    <div className="noticeListLiCP" style={{ cursor: "pointer" }} onClick={onClickDiv}>
      <div className="noticeListLiCP-title flexHeightCenter" style={{ gap: "6px" }}>
        {data.title}
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
