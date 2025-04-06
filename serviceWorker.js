const CACHE_NAME = "jotly-cache-v1";

const ASSETS_TO_CACHE = [
  "/", // root
  "/index.html",
  "/styles.css",
  "/main.js",
  "/serviceWorker.js",
  "/manifest.webmanifest",
  "/fonts/Virgil.ttf",

  // Screenshots
  "/assets/screenshots/desktop_app.png",
  "/assets/screenshots/mobile.png",
  "/assets/screenshots/tab.png",
  "/assets/master_logo.png",

  // Favicon
  "/favicon/apple-touch-icon.png",
  "/favicon/favicon-96x96.png",
  "/favicon/favicon.ico",
  "/favicon/favicon.svg",
  "/favicon/web-app-manifest-192x192.png",
  "/favicon/web-app-manifest-512x512.png",

  //   Offline Sheez
  "/offline.html",
  "/assets/offline_image.webp",
];

// 🔹 Install event — Cache App Shell (assets)
self.addEventListener("install", function (event) {
  console.log("📦 Installing Service Worker...");

  const precacheAssets = async () => {
    const cache = await caches.open(CACHE_NAME);
    return cache.addAll(ASSETS_TO_CACHE);
  };

  event.waitUntil(precacheAssets());

  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/skipWaiting
  self.skipWaiting(); // So that the worker activates immediately instead of waiting.
});

// 🔹 Activate event — Clean up old caches
self.addEventListener("activate", function (event) {
  console.log("⚙️ Service Worker Activated!");

  const cleanOldCache = async () => {
    const allCacheKeys = await caches.keys();

    /**
     * Once we have all the caches (ex: jotly-cache-v1, jotyl-cache-v2,..) we clear
     * all the caches except the active one (CACHE_NAME)
     */
    Promise.all(
      allCacheKeys
        .filter((key) => key !== CACHE_NAME)
        // Delete all the older caches.
        .map((key) => caches.delete(key))
    );
  };

  event.waitUntil(cleanOldCache());

  /**
   * Tells the active service worker to immediately start controlling all open clients (pages)
   * under its scope, without waiting for them to reload.
   *
   * Without self.clients.claim() - After your service worker activates, it will
   * not take control of the currently open pages until the user refreshes them.
   * Only newly opened pages will be controlled by the new service worker.
   * So this causes a delay in applying our updates.
   *
   * So, With self.clients.claim(), the service worker immediately takes over all
   * the pages it controls — no refresh needed!
   *
   * MDN - https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim
   */
  self.clients.claim();
});
