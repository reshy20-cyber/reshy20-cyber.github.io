const CACHE='tafawoqprep-v102';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(Promise.all([caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('tafawoqprep-')&&x!==CACHE).map(x=>caches.delete(x)))),self.clients.claim()])));
// Pages: network first so updates arrive; other files: cache first.
self.addEventListener('fetch',e=>{
  const req=e.request;if(req.method!=='GET')return;
  const url=new URL(req.url);
  if(url.origin!==self.location.origin){
    if(url.hostname.endsWith('fonts.googleapis.com')||url.hostname.endsWith('fonts.gstatic.com'))
      e.respondWith(caches.match(req).then(r=>r||fetch(req).then(res=>{const c=res.clone();caches.open(CACHE).then(x=>x.put(req,c));return res})));
    return;
  }
  if(req.mode==='navigate')e.respondWith(fetch(req).then(res=>{const c=res.clone();caches.open(CACHE).then(x=>x.put('./index.html',c));return res}).catch(()=>caches.match('./index.html')));
  else e.respondWith(caches.match(req).then(r=>r||fetch(req)));
});
