import ClearIcon from "@mui/icons-material/Clear";

const MyPageKeywordCP = ({ kw, keyword_id, onDelete }) => {
  console.log(kw, keyword_id);
  return (
    <div
      onClick={() => onDelete(keyword_id)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "4px 8px",
        borderRadius: "12px",
        fontSize: "0.875rem",
        color: "var(--black-4)",
        border: "1px solid var(--black-3)",
        cursor: "pointer",
      }}>
      <span>{kw}</span>
      <span style={{ marginLeft: "4px", color: "var(--black-5)" }}>
        <ClearIcon fontSize="small" />
      </span>
    </div>
  );
};
export default MyPageKeywordCP;
