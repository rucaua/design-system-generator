export default {
  // Target: static site generation
  target: 'static',

  // Global page headers
  head: {
    title: 'Color Generator',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Color theme generator for design systems' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Modules
  modules: [
    '@nuxtjs/tailwindcss'
  ],

  // Build Configuration
  build: {
    transpile: [
      '@fortawesome/vue-fontawesome',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons'
    ]
  },

  // Server API routes are automatically detected in the server/api directory

  // CSS
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css'
  ]
}
