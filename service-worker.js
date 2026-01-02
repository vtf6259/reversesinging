importScripts("https://storage.googleapis.com/workbox-cdn/releases/7.4.0/workbox-sw.js")
workbox.routing.registerRoute(
    ({request}) => request.destination === '*',
    new workbox.strategies.NetworkFirst()
)