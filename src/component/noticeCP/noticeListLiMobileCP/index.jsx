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
  return (
    <div className="noticeListLiMobileCP" onClick={onClickDiv}>
      <div className="noticeListLiMobileCP-title">{data.title}</div>
      <div className="flexHeightCenter">
        <div className="noticeListLiMobileCP-author">{data.author}</div>
        <div className="line"></div>
        <div className="noticeListLiMobileCP-published_at">{formattedDate}</div>
        <div className="line"></div>
        {data.other_info && (
          <span
            style={{
              color: "var(--black-2)",
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
