<template>
  <div id="score-board" class="bg-gray-900 text-lime-300 w-full p-4 z-10">
    <div class="grid grid-cols-2 pb-2">
      <div class="h-full">
        <span>{{ datetime }}</span>
        <div @click="editGame = true">
          <span>Game:</span>
          <input
            v-if="editGame"
            id="game"
            v-focus
            v-click-outside="updateGame"
            :value="game"
            autocomplete="off"
            @change="updateGame"
          >
          <span v-else id="game-span">{{ game }}</span>
        </div>
      </div>
      <div class="h-full">
        <div class="flex justify-end" @click="editGoal = true">
          <span>Goal: </span>
          <input
            v-if="editGoal"
            id="goal"
            v-focus
            v-click-outside="updateGoal"
            class="w-16 ml-2"
            autocomplete="off"
            :value="goal"
            @change="updateGoal"
          ></input>
          <span v-else id="goal-span" class="w-16 ml-2">{{ goal }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    players: {
      type: Array,
      default: () => []
    },
    datetime: {
      type: String,
      default: null
    },
    game: {
      type: String,
      default: null
    },
    goal: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      editGame: false,
      editGoal: false
    }
  },
  methods: {
    updateGoal (e) {
      /* prevent code from running when not editing. */
      /* needed since v-click-outside generates pointer events anywhere outside the assigned element */
      if (this.editGoal === false) { return }
      if (e.target.id !== 'goal-span') {
        this.$emit('updateGoal', document.getElementById('goal').value)
        this.editGoal = false
      }
    },
    updateGame (e) {
      /* prevent code from running when not editing. */
      /* needed since v-click-outside generates pointer events anywhere outside the assigned element */
      if (this.editGame === false) { return }
      if (e.target.id !== 'game-span') {
        this.$emit('updateGame', document.getElementById('game').value)
        this.editGame = false
      }
    }
  }
}
</script>
