<template>
  <div class="flex flex-col gap-2 w-full pt-4">
    <div class="flex flex-col items-center">
      <div class="text-center px-1 text-ellipsis whitespace-nowrap">
        <span>{{ player }}</span>
      </div>
      <div :class="total >= goal && goal !== 0 ? 'w-2/3 border-gray-500 border-solid bg-lime-600 border text-lime-300 text-center' : 'w-2/3 border-gray-500 border-solid border text-lime-300 text-center'">
        {{ total }}
      </div>
    </div>
    <div class="bg-black flex flex-nowrap flex-col items-center border-gray-400 border">
      <div class="text-center w-full">
        <input
          :id="'score-' + player"
          ref="scoreInput"
          class="w-full bg-gray-900/80 text-lime-300 text-center"
          autocomplete="off"
          type="text"
          @keydown="scoreEntryKeyDown"
        ></input>
      </div>
      <score-item
        v-for="(r,k) in rounds"
        :key="k"
        :ref="'scoreItem' + k"
        class="px-2 w-full"
        :item-index="k"
        :value="r"
        @deleteScoreItem="deleteScoreItem"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    player: {
      type: String,
      required: true
    },
    playerIndex: {
      type: Number,
      required: true
    },
    goal: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      rounds: []
    }
  },
  computed: {
    total () {
      let points = 0
      if (this.rounds && this.rounds.length > 0) {
        this.rounds.forEach((p) => {
          points = points + p
        })
      }
      return points
    }
  },
  methods: {
    addRound (score) {
      this.rounds.push(score)
    },
    scoreEntryKeyDown (k) {
      if (k.key === 'Enter') {
        // check value
        const regExp = /[a-zA-Z]/g
        if (regExp.test(this.$refs.scoreInput.value)) {
          /* if letters are found in your string */
          alert('Score must be a non-zero, positive, or negative number.')
          return
        }
        const pointNum = parseInt(this.$refs.scoreInput.value)
        if (isNaN(pointNum) || pointNum === 0) {
          alert('Score must be a non-zero, positive, or negative number.')
        } else {
          this.addRound(pointNum)
        }
        this.$refs.scoreInput.value = null
        this.$emit('totalsUpdated')
      }
    },
    deleteScoreItem (itemIndex) {
      this.rounds.splice(itemIndex, 1)
      this.$emit('totalsUpdated')
    }
  }
}
</script>
