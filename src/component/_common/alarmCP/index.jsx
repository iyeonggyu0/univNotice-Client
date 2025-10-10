import SmsIcon from "@mui/icons-material/Sms";
import { useNavigate } from "react-router-dom";

const AlarmCP = (onClickAlarm) => {
  const nav = useNavigate();
  return (
    <div
      style={{
        position: "absolute",
        right: "1rem",
        top: "calc(96vh - 3rem)",
        zIndex: "1000",
        width: "3rem",
        height: "3rem",
        backgroundColor: "var(--main-color)",
        borderRadius: "50%",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        color: "white",
      }}
      onClick={() => {
        nav("/notice");
        onClickAlarm();
      }}>
      <SmsIcon />
    </div>
  );
};
export default AlarmCP;
