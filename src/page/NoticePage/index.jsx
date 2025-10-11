import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { NoticeLoad } from "../../api/notice";

const NoticePage = () => {
  const nav = useNavigate();
  const [noticeData, setNoticeData] = useState([]);

  useEffect(() => {
    async function fetchLoginCheck() {
      try {
        const device = await NoticeLoad();

        setNoticeData(device);
      } catch (err) {
        console.error(err);
      }
    }
    fetchLoginCheck();
  }, []);

  return <div></div>;
};
export default NoticePage;
