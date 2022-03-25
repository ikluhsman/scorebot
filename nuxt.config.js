export default {
  target: 'static',
  ssr: false,
  generate: {
    fallback: true
  },
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
      { rel: 'icon', type: 'image/x-icon', href: '/pound.svg' }
    ]
  },
  css: [
    '@/assets/global.scss'
  ],
  plugins: [
    { src: '~/plugins/directives' }
  ],
  components: {
    dirs: [
      '~/components',
      '~/components/dialogs'
    ]
  },
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss'
  ],
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/sitemap'
  ],
  sitemap: {
    hostname: 'https://scorebot.app',
    gzip: true,
    exclude: [],
    routes: [
      '/scores'
    ]
  },
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
  build: {}
}
