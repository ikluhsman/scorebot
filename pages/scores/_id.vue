<template>
  <score-bot ref="scoreBot" :key="'scoreBot'" :json-data="jsonData" />
</template>
<script>
export default {
  async asyncData ({ query }) {
    let jsonData = ''
    if (query.id) {
      const b = await Buffer.from(query.id, 'base64').toString()
      jsonData = JSON.parse(b)
    }
    return {
      jsonData,
      id: query.id
    }
  },
  head () {
    return {
      title: 'ScoreBot',
      link: [
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://scorebot.app/' + this.id
        }
      ],
      meta: [
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
          hid: 'og:type',
          property: 'og:type',
          content: 'website'
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://scorebot.app/screen.jpg'
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://scorebot.app/'
        }
      ]
    }
  }
}
</script>
