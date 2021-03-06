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
      { name: 'format-detection', content: 'telephone=no' },
      {
        hid: 'description',
        name: 'description',
        content:
          'ScoreBot is an app for keeping score of many different games.'
      },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'msapplication-TileImage', content: '/icon.png' },
      { hid: 'name', itemprop: 'name', content: 'ScoreBot' },

      {
        hid: 'keywords',
        name: 'keywords',
        content:
          'ScoreBot, Score, Bot, Game Scores, Scoring, Score App, Score Keeping, Score Keeper'
      },
      {
        hid: 'description',
        itemprop: 'description',
        content:
          'ScoreBot is an app for keeping score of many different games.'
      },
      {
        hid: 'image',
        itemprop: 'image',
        content: 'https://scorebot.app/og-image-large.jpg'
      },
      {
        hid: 'og:title',
        property: 'og:title',
        content: 'ScoreBot'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'ScoreBot is an app for keeping score of many different games.'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'ScoreBot'
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://scorebot.app/og-image-large.jpg'
      },
      {
        hid: 'og:image:url',
        property: 'og:image:url',
        content: 'https://scorebot.app/og-image-large.jpg'
      },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://scorebot.app/'
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://scorebot.app/og-image-large.jpg'
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: 'ScoreBot is an app for keeping score of many different games.'
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'ScoreBot'
      },
      {
        hid: 'twitter:creator',
        name: 'twitter:creator',
        content: '@iankco'
      },
      { hid: 'twitter:site', name: 'twitter:site', content: '@iankco' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        hid: 'canonical',
        rel: 'canonical',
        href: 'https://scorebot.app/'
      }
    ]
  },
  css: [
    '@/assets/global.scss'
  ],
  plugins: [
    { src: '~/plugins/directives' },
    { src: '~/plugins/gsap', ssr: false }
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
    '@nuxtjs/sitemap',
    'nuxt-clipboard2'
  ],
  sitemap: {
    hostname: 'https://scorebot.app',
    gzip: true,
    exclude: ['/.git'],
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
      display: 'standalone',
      shortName: 'ScoreBot',
      description: 'Track scores for many games.',
      lang: 'en',
      useWebManifestExtension: false,
      background_color: '#000000'
    }
  },
  build: {},
  server: {
    host: process.env.NODE_ENV !== 'production' ? '172.30.2.40' : ''
  }
}
