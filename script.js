// if ('serviceWorker' in navigator && 'PushManager' in window) {
//   console.log('Service Worker and Push is supported');

//   navigator.serviceWorker.register('sw.js')
//   .then(function(swReg) {
//     console.log('Service Worker is registered', swReg);

//     swRegistration = swReg;
//   })
//   .catch(function(error) {
//     console.error('Service Worker Error', error);
//   });
// } else {
//   console.warn('Push messaging is not supported');
//   pushButton.textContent = 'Push Not Supported';
// }

// console.log("proof of update!");
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function () {
//         navigator.serviceWorker.register('/sw.js').then(function (registration) {
//             // Registration was successful
//             console.log('ServiceWorker registration successful with scope: ', registration.scope);
//             const subscribeOptions = {
//                 userVisibleOnly: true,
//             };
//             return registration.pushManager.subscribe(subscribeOptions);
//         })
//             .then(function (pushSubscription) {
//                 console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
//                 return pushSubscription;
//             });
//     });
// }

() => {
    if (!('serviceWorker' in navigator)) {
        // Service Worker isn't supported on this browser, disable or hide UI.
        return;
    }

    if (!('PushManager' in window)) {
        // Push isn't supported on this browser, disable or hide UI.
        return;
    }
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
                    // 'BCnUUjnzZHaiN4uJZRGxreqoLDnM-RV87PO6b2stq5HRm6G4X4pYOCu6UfuN1Eh_pnPfXo4gD4OGT4V7SBKhYyk'
                    // 'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U'
                    // 'BEgo_CMPh7-Bl8xSNK_oy2ceGCzEX5obB5pVtSlgoV6Yq8mPyoByIp8z22Y4pqJVtUYqzzcdjLOxVaTaDOBcn1U'
                )
            };
            let result;
            try{
                result = await registration.pushManager.subscribe(subscribeOptions)
            } catch(err){
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

// subscribeUserToPush();

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

// function subscribeUserToPush() {
//     return navigator.serviceWorker.register('service-worker.js')
//         .then(function (registration) {
//             const subscribeOptions = {
//                 userVisibleOnly: true,
//             };

//             return registration.pushManager.subscribe(subscribeOptions);
//         })
//         .then(function (pushSubscription) {
//             console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
//             return pushSubscription;
//         });
// }

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