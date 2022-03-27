<template>
  <div>
    <score-board
      :key="'scoreBoard'"
      :players="players"
      :goal="goal"
      :game="game"
      :datetime="datetime"
      @updateGoal="updateGoal"
      @updateGame="updateGame"
    />
    <div class="flex flex-wrap justify-around mb-4 gap-2 px-16">
      <score-card
        v-for="(p, k) in players"
        :ref="'playerScoreCard' + k"
        :key="k"
        :player="p"
        :player-index="k"
        :goal="goal"
        class="max-w-min"
        @updateTotals="updateLeaders"
        @updatePlayer="updatePlayer"
        @removePlayer="openRemovePlayerDialog"
        @addPlayerScore="addPlayerScore"
        @deletePlayerScore="deletePlayerScore"
      />
    </div>
    <reset-dialog v-if="showResetDialog" @closeModal="closeResetDialog" />
    <share-dialog v-if="showShareDialog" :link="saveLink" @closeModal="closeShareDialog" />
    <remove-player-dialog v-if="showRemovePlayerDialog" :player-name="selectedPlayer.name" @closeModal="closeRemovePlayerDialog" />
    <load-dialog v-if="showLoadDialog" @closeModal="closeLoadDialog" />
  </div>
</template>
<script>
import moment from 'moment'
export default {
  props: {
    jsonData: {
      type: Object,
      default: null
    }
  },
  data () {
    const datetime = moment().format('M/D/YYYY hh:mm')
    const game = 'New Game'
    const goal = 0
    const players = []
    return {
      datetime,
      game,
      players,
      goal,
      maxplayers: 40,
      showResetDialog: false,
      showShareDialog: false,
      showLoadDialog: false,
      showRemovePlayerDialog: false,
      saveLink: null,
      selectedPlayer: null,
      selectedIndex: -1
    }
  },
  created () {
    if (this.jsonData != null) {
      this.datetime = this.jsonData.datetime
      this.game = this.jsonData.game
      this.jsonData.players.forEach((p) => {
        this.players.push(p)
      })
      this.goal = this.jsonData.goal
    }
  },
  mounted () {
    this.updateLeaders()
  },
  methods: {
    updateLeaders () {
      const totals = []
      if (this.players) {
        this.players.forEach((p, k) => {
          const sc = this.$refs['playerScoreCard' + k]
          if (sc) {
            totals.push(sc[0].total)
          }
        })
      }
      const max = Math.max(...totals)
      if (max === 0) { return null }
      for (let i = 0; i < totals.length; i++) {
        this.$refs['playerScoreCard' + i][0].isLeader = false
        if (totals[i] === max) {
          this.$refs['playerScoreCard' + i][0].isLeader = true
        }
      }
    },
    addPlayerScore (playerIndex, playerScore) {
      this.players[playerIndex].scores.push(playerScore)
    },
    deletePlayerScore (playerIndex, itemIndex) {
      this.players[playerIndex].scores.splice(itemIndex, 1)
    },
    closeResetDialog (response) {
      this.showResetDialog = false
      if (response) {
        this.datetime = moment().format('M/D/YYYY hh:mm')
        this.goal = 0
        this.players = []
        this.game = 'New Game'
        this.$router.push('/')
      }
    },
    closeShareDialog () {
      this.showShareDialog = false
    },
    closeLoadDialog () {
      this.showLoadDialog = false
    },
    updateGoal (value) {
      const pointNum = Number(value)
      if (!pointNum && pointNum !== 0) {
        const alertMsg = 'Score must be a non-zero, positive, or negative number.'
        alert(alertMsg)
      } else {
        this.goal = pointNum
      }
    },
    updateGame (value) {
      if (value !== this.game) {
        this.game = value
      }
    },
    save (redirect) {
      const scores = []
      this.players.forEach((p, k) => {
        const sc = this.$refs['playerScoreCard' + k]
        scores.push(sc[0].scores)
      })
      if (scores.length === 0) {
        alert('No players on the board. Add players to the board first.')
        return false
      }
      const scoredata = {
        datetime: this.datetime,
        game: this.game,
        players: this.players,
        goal: this.goal,
        scores
      }
      const scoresJson = JSON.stringify(scoredata)
      const buff = Buffer.from(scoresJson)
      const b64 = buff.toString('base64')
      const url = 'https://' + location.host + '/scores?id=' + b64
      if (redirect) {
        this.$router.push({ path: '/scores', query: { id: b64 } })
      }
      return { url, b64 }
    },
    share () {
      this.saveLink = this.save(false)
      if (this.saveLink !== false) {
        this.showShareDialog = true
      }
    },
    load () {
      this.showLoadDialog = true
    },
    reset () {
      this.showResetDialog = true
    },
    addPlayer () {
      if (this.players.length === this.maxplayers) {
        alert('Max of 40 players.')
        return
      }
      const l = this.players.length.toString()
      const newPlayer = { name: 'Player' + l, scores: [] }
      this.players.push(newPlayer)
    },
    updatePlayer (playerIndex, newPlayerName) {
      this.players[playerIndex].name = newPlayerName
    },
    openRemovePlayerDialog (playerIndex) {
      this.selectedPlayer = this.players[playerIndex]
      if (this.selectedPlayer.scores.length > 0) {
        this.selectedIndex = playerIndex
        this.showRemovePlayerDialog = true
      } else {
        this.closeRemovePlayerDialog(true)
      }
    },
    closeRemovePlayerDialog (response) {
      if (response) {
        this.players.splice(this.selectedIndex, 1)
        this.updateLeaders()
      }
      this.selectedPlayer = null
      this.selectedIndex = null
      this.showRemovePlayerDialog = false
    }
  }
}
</script>
