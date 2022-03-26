<template>
  <div>
    <score-bot ref="scoreBot" :key="'scoreBot'" :json-data="jsonData" />
  </div>
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
  head: {
    meta: [
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://scorebot.app/og-image-mobile.jpg'
      },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Link to your saved ScoreBot game'
      }
    ]
  }
}
</script>
