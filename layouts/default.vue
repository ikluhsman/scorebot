<template>
    <div>
        <nav-bar @generateGameData="generateGameData" @generateGameLink="generateGameLink" @addPlayer="addPlayer"/>
        <nuxt ref="nuxtComponent"/>
    </div>
</template>
<script>
export default {
    methods: {
        generateGameData () {
            this.$refs.nuxtComponent.$children[0].$children[0].generateGameData() //  nuxt component > pages / index.vue > score-card
        },
        generateGameLink () {
            this.$refs.nuxtComponent.$children[0].$children[0].generateGameLink()
        },
        clearScoreBoard () {
            this.$refs.nuxtComponent.$children[0].$children[0].clearScoreBoard()
        },
        addPlayer () {
            this.$refs.nuxtComponent.$children[0].$children[0].addPlayer()
        }
    }
}
</script>