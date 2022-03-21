<template>
    <score-card ref="scoreCard" :key="'scoreCard'" :json-data="jsonData"/>
</template>
<script>
export default {
    asyncData ({ query }) {
        let jsonData = ""
        if (query.id) {
            const b = Buffer.from(query.id, 'base64').toString()
            jsonData = JSON.parse(b)
        }
        return {
            route1: query,
            jsonData
        }
    }
}
</script>