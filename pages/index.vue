<template>
  <score-bot />
</template>
<script>
export default {
  head () {
    return {
      title: 'ScoreBot',
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://scorebot.app/'
        }
      ],
      meta: [
        {
          hid: 'og-title',
          property: 'og:title',
          content: 'ScoreBot'
        },
        {
          hid: 'og-description',
          property: 'og:description',
          content: 'Scorebot is an app for keeping score of many different games.'
        },
        {
          hid: 'og-type',
          property: 'og:type',
          content: 'website'
        },
        {
          hid: 'og-image',
          property: 'og:image',
          content: 'https://scorebot.app/splash.jpg'
        },
        {
          hid: 'og-url',
          property: 'og:url',
          content: 'https://scorebot.app/'
        }
      ]
    }
  }
}
</script>
