/**
 * This file is for custome service worker
 */


/* eslint-disable */


if ('function' === typeof importScripts) {
    importScripts(
        'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
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
            })
        );

    } else {
        console.log('Workbox could not be loaded. No Offline support');
    }

}

// My fuction to share files
const handleFileshare = (e) => {
    e.respondeWith(Response.redirect('./'))

    // Eg, if it's cross-origin.
    if (!e.clientId) return;

    e.waitUntil(
        (async function () {
            const data = await e.request.formData()
            const client = await clients.get(e.clientId);

            // e.clients.matchAll().then(function (clients) {
            //     clients.forEach(function (client) {
            //         const file = data.get('file')

            //         client.postMessage({ file })
            //     });
            // })

            const file = data.get('file')
            client.postMessage({ file })
        })()
    )
}

addEventListener('fetch', (e) => {
    const url = new URL(e.request.url)

    if (
        url.origin === location.origin &&
        url.pathname === '/share-target' &&
        e.request.method === 'POST'
    ) {
        handleFileshare(e)
    }
})