// public/service-worker.js

self.addEventListener("push", function (event) {
  const data = event.data?.json() || {};
  self.registration.showNotification(data.title || "알림", {
    body: data.body || "",
    icon: "/icons/icon-192.jpg", // manifest.json의 아이콘 경로 사용
  });
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    self.clients.openWindow("/") // 알림 클릭 시 홈앱(/)으로 이동
  );
});
