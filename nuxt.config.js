export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'scorebot',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'scorebot.app', name: 'ScoreBot', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/pound.svg' },
      { rel: 'stylesheet', href: 'https://use.typekit.net/vom4nrc.css' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/global.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/directives', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components',
      '~/components/dialogs'
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
      source: '/icon.png'
    },
    meta: {
      name: 'ScoreBot',
      author: 'Ian Kluhsman',
      description: 'Track scores for many games.',
      lang: 'en',
      ogType: 'website',
      ogSiteName: 'ScoreBot',
      ogTitle: 'ScoreBot',
      ogDescription: 'Track scores for many games.',
      ogHost: 'https://scorebot.app',
      ogImage: 'icon.png'

    },
    manifest: {
      name: 'ScoreBot',
      id: '/?standalone=true',
      shortName: 'ScoreBot',
      description: 'Track scores for many games.',
      lang: 'en',
      useWebManifestExtension: false,
      background_color: '#000000'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
}
