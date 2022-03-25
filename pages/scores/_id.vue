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
  }
}
</script>
