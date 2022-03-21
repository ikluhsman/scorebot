<template>
  <div>
      <score-card ref="scoreCard"/>
  </div>
</template>
<script>
export default {
  mounted () {
    this.$refs.scoreCard.clear()
  }
}
</script>