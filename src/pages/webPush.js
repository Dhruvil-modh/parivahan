// For vapidKey

import webpush from 'web-push';

export default function WebPush() {
    // VAPID keys should only be generated only once.
    const vapidKeys = webpush.generateVAPIDKeys();

    webpush.setGCMAPIKey('<Your GCM API Key Here>');
    webpush.setVapidDetails(
        'mailto:parivahan.inc@gmail.com',
        vapidKeys.publicKey,
        vapidKeys.privateKey
    );

    return(
        <div>
            <p>Public Key: {vapidKeys.publicKey}</p>
            <p>Private Key: {vapidKeys.privateKey}</p>
        </div>
    );
}

//Our Used vapidKeys
//Public Key: BBmnh92cLknUhVBVerj3SwpZ210hxEa5Jq-weiFweaxfjUINuN-_TpGhlB9LKvI_kLsmW-gf-OhAOUdrkLnH7Kc
//Private Key: DNtUp-eTevX6jyJMs3k0IsVk3A-9JFks7iFgaBwL-IQ