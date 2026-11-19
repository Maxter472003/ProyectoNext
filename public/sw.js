const PAGINAS = "masa-madre-paginas-v2";
const IMAGENES = "masa-madre-imagenes-v2";

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(PAGINAS).then((c) => c.addAll(["/"])));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((claves) =>
      Promise.all(claves.filter((k) => k !== PAGINAS && k !== IMAGENES).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || !req.url.startsWith("http")) return;
  const url = new URL(req.url);

  // Imágenes: primero caché, luego red.
  const esImagen =
    url.pathname.startsWith("/_next/image") ||
    (url.hostname.endsWith("supabase.co") && url.pathname.startsWith("/storage/v1/object/public/"));
  if (esImagen) {
    e.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok || res.type === "opaque") {
              const copia = res.clone();
              caches.open(IMAGENES).then((c) => c.put(req, copia));
            }
            return res;
          })
      )
    );
    return;
  }

  // Solo mismo origen. Páginas y recursos: primero red, con caché como respaldo sin conexión.
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok) {
          const copia = res.clone();
          caches.open(PAGINAS).then((c) => c.put(req, copia));
        }
        return res;
      })
      .catch(async () => (await caches.match(req)) || (await caches.match("/")))
  );
});
