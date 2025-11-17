import axios from "axios";
import { apiUrl } from "../../util/axios";

const decodeJwtPayload = (token) => {
  if (!token || typeof token !== "string") return null;
  const [, payload] = token.split(".");
  if (!payload) return null;
  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
  const decoder =
    (typeof window !== "undefined" && typeof window.atob === "function" && ((str) => window.atob(str))) ||
    (typeof globalThis !== "undefined" && typeof globalThis.atob === "function" && ((str) => globalThis.atob(str)));
  if (!decoder) return null;
  if (!decoder) return null;
  try {
    const jsonPayload = decodeURIComponent(
      decoder(padded)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error("[iphonePublicKeyGetApi] JWT decode error", err);
    return null;
  }
};

export const iphonePublicKeyGetApi = async () => {
  try {
    const res = await axios.get(`${apiUrl}/user/iphone/public/key`, { withCredentials: true });
    if (res.status === 200 && res.data.success && res.data.token) {
      const payload = decodeJwtPayload(res.data.token);
      if (payload?.vapidPublicKey) {
        return payload.vapidPublicKey;
      }
      throw new Error("VAPID 공개키를 복호화하지 못했습니다.");
    } else {
      throw new Error(res.data?.error || "VAPID 공개키를 받아오지 못했습니다.");
    }
  } catch (err) {
    alert(err.response?.data?.error || err.message || "키를 받아오는 중 문제가 발생했습니다.");
    return false;
  }
};
