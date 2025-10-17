/**
 * 접속 환경을 감지하여 리턴함
 * @returns isApp, isWeb, isIos 각 T/F로 반환
 * - isApp: 앱(WebView)에서 접속 시 true
 * - isWeb: 일반 웹(PC/안드로이드)에서 접속 시 true
 * - isIos: 아이폰/맥 등 iOS/macOS에서 접속 시 true
 */
export const useWeb = () => {
  const ua = navigator.userAgent.toLowerCase();

  const isApp = ua.includes("univnotice-app");
  const isIos = ua.includes("iphone") || ua.includes("macintosh");
  const isWeb = !isApp && !isIos && (ua.includes("android") || ua.includes("windows"));

  // iOS 홈화면 앱(PWA) 감지: iOS + (standalone || display-mode: standalone)
  let isHomeApp = false;
  if (isIos) {
    // 1. window.navigator.standalone (iOS Safari PWA)
    if (window.navigator.standalone) {
      isHomeApp = true;
    } else {
      // 2. display-mode: standalone (일부 브라우저 지원)
      if (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) {
        isHomeApp = true;
      }
    }
  }

  return {
    isApp,
    isWeb,
    isIos,
    isHomeApp,
  };
};
