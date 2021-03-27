export default function swDev() {

    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    const vapidPublicKey = 'BP7FDVtfN-7CR2kRnCqMMORHIuW0Ckn_Jqmn5koOFz_1hM_7RdRVPPyqnygmAGw5sO3vpWMbRJ784j-XFVUddrg';
    const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

    let swUrl = `${process.env.PUBLIC_URL}/sw.js`
    navigator.serviceWorker.register(swUrl).then((response) => {
        // console.log('Successfully registered service worker', response);
        return response.pushManager.getSubscription()
        .then(function(subscription) {
            return response.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedVapidKey
            })
        })
    }).catch(function (err) {
        console.warn('Error whilst registering service worker', err);
    });
}