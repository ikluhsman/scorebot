<template>
  <div class="flex flex-col gap-2 pt-4">
    <div class="flex flex-col items-center">
      <div class="h-2 mb-2">
        <svg v-show="total >= goal && goal !== 0 && goal !== null" style="width:16px;height:16px" viewBox="0 0 24 24">
          <path fill="currentColor" d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5M19 19C19 19.6 18.6 20 18 20H6C5.4 20 5 19.6 5 19V18H19V19Z" />
        </svg>
      </div>
      <div class="text-center px-1">
        <div v-if="playerEdit" class=" flex flex-nowrap">
          <input
            ref="playerNameTextBox"
            v-model="newPlayerName"
            v-focus
            v-click-outside="updatePlayer"
            class="bg-gray-800 text-amber-50 w-20 text-left"
            @keyup.enter="updatePlayer"
          >
          <button class="p-1" @click="showRemovePlayerDialog = true">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            </svg>
          </button>
        </div>
        <span v-else :id="'player-' + playerIndex + '-span'" class="whitespace-nowrap text-sm sm:text-lg" @click="editPlayer">{{ playerName }}</span>
      </div>
      <div :class="isLeader ? 'w-full text-center border-gray-500 border-solid border rounded-md text-lime-300 bg-lime-600' : 'w-full text-center border-gray-500 border-solid border rounded-md text-lime-300'">
        {{ total }}
      </div>
    </div>
    <div class="bg-black flex flex-nowrap flex-col items-center">
      <div class="text-center w-full">
        <input
          :id="'score-' + playerName"
          ref="scoreInput"
          class="w-full bg-gray-900/80 text-lime-300"
          autocomplete="off"
          type="text"
          @keyup.enter="scoreEntryKeyUp"
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
    <remove-player-dialog v-if="showRemovePlayerDialog" :player="playerName" @closeModal="closeRemovePlayerDialog" />
  </div>
</template>
<script>
export default {
  props: {
    playerName: {
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
      rounds: [],
      playerEdit: false,
      newPlayerName: null,
      showRemovePlayerDialog: false,
      isLeader: false
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
  created () {
    this.newPlayerName = this.playerName
  },
  methods: {
    editPlayer () {
      this.playerEdit = true
    },
    addRound (score) {
      this.rounds.push(score)
    },
    scoreEntryKeyUp () {
      const pointNum = Number(this.$refs.scoreInput.value)
      if (isNaN(pointNum) || pointNum === 0) {
        alert('Score must be a non-zero, positive, or negative number.')
      } else {
        this.addRound(pointNum)
      }
      this.$refs.scoreInput.value = null
      this.$emit('totalsUpdated')
    },
    deleteScoreItem (itemIndex) {
      this.rounds.splice(itemIndex, 1)
      this.$emit('totalsUpdated')
    },
    updatePlayer (e) {
      if (e.target.id !== 'player-' + this.playerIndex + '-span') {
        this.$emit('updatePlayer', this.playerIndex, this.newPlayerName)
        this.playerEdit = false
      }
    },
    closeRemovePlayerDialog (response) {
      this.showRemovePlayerDialog = false
      if (response) {
        this.$emit('removePlayer', this.index)
      }
    }
  }
}
</script>
