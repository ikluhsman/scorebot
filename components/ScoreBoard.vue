<template>
  <div id="score-board" class="bg-gray-900 text-lime-300 w-full px-4">
    <div class="flex items-center py-1">
      <a href="https://github.com/ikluhsman/scorebot" class="text-amber-50/50">
        <svg style="width:24px;height:24px" viewBox="0 0 24 24">
          <g>
            <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
            <rect
              class="btn"
              fill="transparent"
              x="0"
              y="0"
              width="24"
              height="24"
            />
          </g>
        </svg>
      </a>
      <span class="text-sm text-gray-500 pl-2">All Materials &copy; {{ new Date().getFullYear() }} Ian Kluhsman</span>
    </div>
    <div class="grid grid-cols-2 py-2">
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
    <div class="w-full flex justify-center">
      <svg style="width:28px;height:28px" viewBox="0 0 24 24">
        <g>
          <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
          <rect
            class="btn"
            fill="transparent"
            x="0"
            y="0"
            width="32"
            height="32"
            @click="showScoreBoard"
          />
        </g>
      </svg>
      <svg style="width:28px;height:28px" viewBox="0 0 24 24">
        <g>
          <path fill="currentColor" d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z" />
          <rect
            class="btn"
            fill="transparent"
            x="0"
            y="0"
            width="32"
            height="32"
            @click="hideScoreBoard"
          />
        </g>
      </svg>
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
    },
    showScoreBoard () {

    },
    hideScoreBoard () {

    }
  }
}
</script>
