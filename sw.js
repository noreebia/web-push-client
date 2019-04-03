self.addEventListener('install', function (event) {
    // Perform install steps
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
    //   image: '/images/demos/unsplash-farzad-nazifi-1600x1100.jpg',
      data: event.data.text()
    };
    self.registration.showNotification(title, options);
});