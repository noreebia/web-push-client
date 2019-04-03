
if (!('serviceWorker' in navigator)) {
    // Service Worker isn't supported on this browser, disable or hide UI.
    return;
}

if (!('PushManager' in window)) {
    // Push isn't supported on this browser, disable or hide UI.
    return;
}

registerServiceWorker();

function registerServiceWorker() {
    return navigator.serviceWorker.register('sw.js')
        .then(async registration => {
            console.log('Service worker successfully registered.');
            await askPermission();
            const subscribeOptions = {
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                    'BAoPzBxqMNB1MrUgyKcF_k2MlhpfgcdWcAmwPpEunTnNzDfiOBkJU8F_iTJDkSGp4oG91QNxre-owYgq3GMGD2k'
                )
            };
            let result;
            try {
                result = await registration.pushManager.subscribe(subscribeOptions)
            } catch (err) {
                console.log(err);
            }
            return await result;
        })
        .then(pushSubscription => {
            console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
            return pushSubscription;
        })
        .catch(function (err) {
            console.error('Unable to register service worker.', err);
        });
}

function askPermission() {
    return new Promise(function (resolve, reject) {
        const permissionResult = Notification.requestPermission(function (result) {
            resolve(result);
        });

        if (permissionResult) {
            permissionResult.then(resolve, reject);
        }
    })
        .then(function (permissionResult) {
            if (permissionResult !== 'granted') {
                throw new Error('We weren\'t granted permission.');
            } else {
                console.log("Granted push permission");
            }
        });
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    console.log(outputArray)
    return outputArray;
}