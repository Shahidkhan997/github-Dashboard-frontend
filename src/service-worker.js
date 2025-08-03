self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating.");
});

self.addEventListener("fetch", (event) => {
  // This example just passes through all requests without caching
  event.respondWith(fetch(event.request));
});

self.addEventListener("notificationclick", (event) => {
  console.log("Event", event);
  const url = event.notification.data?.url;

  event.notification.close();

  if (url) {
    event.waitUntil(clients.openWindow(url));
  }
});

self.addEventListener("push", (event) => {
  const payload = event.data.json();
  const { title, body, icon } = payload.notification;
  const url = payload.data?.url;

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon,
      data: { url }, // Store it in the notification
    })
  );
});
