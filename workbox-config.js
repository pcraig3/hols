module.exports = {
  globDirectory: 'public/',
  globPatterns: ['**/*.{png,ico,eot,svg,ttf,woff,woff2,js,txt,webmanifest,xml}'],
  runtimeCaching: [
    {
      urlPattern: '/',
      // use NetworkFirst or NetworkOnly if you redirect un-authenticated user to login page
      handler: 'NetworkFirst',
      options: {
        cacheName: 'start-url',
        expiration: {
          maxEntries: 1,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
    {
      urlPattern: /\/api\/.*$/i,
      handler: 'NetworkOnly',
    },
    {
      urlPattern: /.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'others',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
        networkTimeoutSeconds: 10,
      },
    },
  ],
  swDest: 'public/sw.js',
}
