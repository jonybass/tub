const CACHE = "tub-v1";


const arquivos = [

"/",
"/login.html",
"/index.html",

"/css/style.css",
"/css/login.css",

"/js/storage.js",
"/js/auth.js",
"/js/app.js"

];



self.addEventListener("install",e=>{


e.waitUntil(

caches.open(CACHE)

.then(cache=>cache.addAll(arquivos))

);


});




self.addEventListener("fetch",e=>{


e.respondWith(

caches.match(e.request)

.then(res=>res || fetch(e.request))

);


});