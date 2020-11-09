/**
 * This file is for custome service worker
 */

/* eslint-disable */

if ('function' === typeof importScripts) {
  importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js',
  );
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

    /* custom cache rules*/
    workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
    });

    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg)$/,
      workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      }),
    );

    // This is the service worker with the combined offline experience (Offline page + Offline copy of pages)

    const CACHE = 'pwabuilder-offline-page';

    const offlineFallbackPage = 'index.html';

    self.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
      }
    });

    self.addEventListener('install', async (event) => {
      event.waitUntil(
        caches.open(CACHE).then((cache) => cache.add(offlineFallbackPage)),
      );
    });

    if (workbox.navigationPreload.isSupported()) {
      workbox.navigationPreload.enable();
    }

    workbox.routing.registerRoute(
      new RegExp('/*'),
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: CACHE,
      }),
    );

    self.addEventListener('fetch', (event) => {
      if (event.request.mode === 'navigate') {
        event.respondWith(
          (async () => {
            try {
              const preloadResp = await event.preloadResponse;

              if (preloadResp) {
                return preloadResp;
              }

              const networkResp = await fetch(event.request);
              return networkResp;
            } catch (error) {
              const cache = await caches.open(CACHE);
              const cachedResp = await cache.match(offlineFallbackPage);
              return cachedResp;
            }
          })(),
        );
      }
    });

  } else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}

// My fuction to share files
const handleFileshare = (e) => {
  e.respondWith(Response.redirect('/auto'));

  // // Eg, if it's cross-origin.
  // if (!e.clientId) return;

  e.waitUntil(
    (async function () {
      const data = await e.request.formData();
      const client = await self.clients.get(e.resultingClientId);

      // e.clients.matchAll().then(function (clients) {
      //     clients.forEach(function (client) {
      //         const file = data.get('file')

      //         client.postMessage({ file })
      //     });
      // })

      const file = data.get('file');
      client.postMessage({ file });
    })(),
  );
};

addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  if (
    url.origin === location.origin &&
    url.pathname === '/share-target' &&
    e.request.method === 'POST'
  ) {
    handleFileshare(e);
  }
});
