// import { useEffect, useState } from "react";
// import axios from "axios";

// /**
//  * 로그인 상태를 비동기로 확인하는 커스텀 훅
//  * @returns {boolean} 로그인 여부 반환
//  */
// export function useLoginCheck() {
//   const [isLoginCheck, setIsLoginCheck] = useState(false);

//   useEffect(() => {
//     let isMounted = true;
//     const checkLogin = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_API_URL}/login/check`, { withCredentials: true });
//         // FIXME:
//         console.log("로그인 상태 확인 응답:", res);
//         if (isMounted) setIsLoginCheck(!!res.data.loggedIn);
//       } catch (err) {
//         if (isMounted) setIsLoginCheck(false);
//         console.error("로그인 상태 확인 실패:", err);
//       }
//     };
//     checkLogin();
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   return isLoginCheck;
// }
