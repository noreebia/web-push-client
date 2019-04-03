self.addEventListener('install', function (event) {
    console.log("installing!");
});

self.addEventListener('push', function (event) {
    if (event.data) {
        console.log('This push event has data: ', event.data.text());
    } else {
        console.log('This push event has no data.');
    }

    const title = event.data.text();
    const options = {
      data: event.data.text()
    };
    self.registration.showNotification(title, options);
});