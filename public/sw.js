// let swUrl = `${process.env.PUBLIC_URL}/sw.js`

let cacheData = "parivahan";
this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                '/static/js/main.chunk.js',
                '/static/js/0.chunk.js',
                '/static/js/bundle.js',
                '/index.html',
                '/',
                '/wallet',
                '/newride',
                '/notifications',
                '/dockingports',
                '/bookride',
                '/currentride',
                '/ridesummary',
                '/biketaken',
                '/addpoints',
                '/userprofile',
                '/register',
                '/login',
                '/deactivate',
                '/forgetpassword',
                '/newpassword',
                '/masthead',
            ])
        })
    )
})

this.addEventListener("fetch", (event) => {
    if (!navigator.onLine) {
        if(event.request.url === "http://localhost:3000/static/js/main.chunk.js") {
            event.waitUntil(
                this.registration.showNotification("Parivahan", {
                    body: "You are in Offline Mode. Please Check your Internet Connectivity."
                })
            )
        }
        event.respondWith(
            caches.match(event.request).then((resp) => {
                if (resp) {
                    return resp
                }
                let requestUrl = event.request.clone();
                fetch(requestUrl)
            })
        )
    }
})