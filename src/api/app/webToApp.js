/**
 * webToApp.js
 * 웹에서 앱으로 메시지 전달 및 콜백 응답 받기
 * @param {string} type 메시지 타입
 * @param {*} data 전달할 데이터
 * @param {function} callback (optional) 앱에서 응답 시 실행할 콜백 (result: {success: boolean, message: string})
 */

// 콜백 저장소
const pendingCallbacks = new Map();

export const sendToApp = (type, data, callback) => {
  // 고유 ID 생성
  const messageId = `${type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  // 콜백이 있으면 먼저 등록
  if (typeof callback === "function") {
    pendingCallbacks.set(messageId, callback);

    // 타임아웃 설정 (10초 후 자동 정리)
    setTimeout(() => {
      if (pendingCallbacks.has(messageId)) {
        pendingCallbacks.delete(messageId);
        callback({ success: false, error: "타임아웃" });
      }
    }, 10000);
  }

  // 앱으로 메시지 전송
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type,
        data,
        messageId: callback ? messageId : null,
      })
    );
  }
};

// 앱에서 응답을 받는 전역 핸들러
window.onAppMessage = (responseData) => {
  if (responseData && responseData.messageId && pendingCallbacks.has(responseData.messageId)) {
    const callback = pendingCallbacks.get(responseData.messageId);
    pendingCallbacks.delete(responseData.messageId);
    callback(responseData);
  }
};
