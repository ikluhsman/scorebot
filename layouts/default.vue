<template>
  <div>
    <nav-bar @save="save" @share="share" @addPlayer="addPlayer" @resetClick="reset" @load="load" />
    <nuxt ref="nuxtComponent" />
  </div>
</template>
<script>
export default {
  methods: {
    addPlayer () {
      this.$refs.nuxtComponent.$children[0].$children[0].addPlayer()
    },
    save (redirect) {
      this.$refs.nuxtComponent.$children[0].$children[0].save(redirect) //  nuxt component > pages / index.vue / score-bot
    },
    share () {
      this.$refs.nuxtComponent.$children[0].$children[0].share()
    },
    reset () {
      this.$refs.nuxtComponent.$children[0].$children[0].reset()
    },
    load () {
      this.$refs.nuxtComponent.$children[0].$children[0].load()
    }
  }
}
</script>
