const CACHE = "tub-v2";

const arquivos = [
    "/",
    "/login.html",
    "/index.html",
    "/css/style.css",
    "/css/login.css",
    "/js/storage.js",
    "/js/auth.js",
    "/js/app.js",
    "/pages/insumos.html"
];



self.addEventListener("install", e => {
    e.waitUntil(
        caches.open(CACHE)
            .then(cache => cache.addAll(arquivos))
            .then(() => self.skipWaiting())
    );
});




self.addEventListener("activate", e => {
    e.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE)
                    .map(key => caches.delete(key))
            )
        ).then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", e => {
    e.respondWith(
        fetch(e.request)
            .then(response => {
                if (e.request.method === 'GET' && response.ok) {
                    const clone = response.clone();
                    caches.open(CACHE).then(cache => cache.put(e.request, clone));
                }
                return response;
            })
            .catch(() => caches.match(e.request))
    );
});