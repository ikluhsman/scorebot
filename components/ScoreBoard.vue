<template>
  <div id="score-board" class="bg-gray-900 text-lime-300 w-full p-4 z-10">
    <div class="flex justify-between items-start pb-2">
      <div>
        <span>{{ datetime }}</span>
        <div @click="editGame = true">
          <span>Game:</span>
          <input
            v-if="editGame"
            id="game"
            v-focus
            :value="game"
            class="bg-transparent"
            autocomplete="off"
            @change="changeGame"
          >
          <span v-else>{{ game }}</span>
        </div>
      </div>
      <div>
        <div class="flex gap-4">
          <span>Goal: </span><input id="goal" class="w-16 bg-transparent" autocomplete="off" :value="goal" @change="changeGoal"></input>
        </div>
        <div>
          Current Leader: {{ leaders }}
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
    },
    leaders: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      leader: null,
      editGame: false
    }
  },
  methods: {
    changeGoal () {
      this.$emit('changeGoal', document.getElementById('goal').value)
    },
    changeGame () {
      this.$emit('changeGame', document.getElementById('game').value)
    }
  }
}
</script>
