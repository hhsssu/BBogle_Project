self.addEventListener('push', (event: PushEvent) => {
  if (!event.data) {
    console.error('No push data');
    return;
  }

  const data = event.data.json();

  self.registration.showNotification(data.title, {
    body: data.body,
    icon: data.icon,
  });
});
