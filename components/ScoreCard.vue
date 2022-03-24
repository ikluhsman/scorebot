<template>
  <div class="mt-12 h-screen">
    <score-board
      :key="'scoreBoard'"
      :players="players"
      :goal="goal"
      :game="game"
      :datetime="datetime"
      @updateGoal="updateGoal"
      @updateGame="updateGame"
    />
    <div class="flex flex-wrap justify-center mb-4 gap-2 flex-grow-0">
      <player-score-card
        v-for="(p, k) in players"
        :ref="'playerScoreCard' + k"
        :key="k"
        :player-name="p"
        :player-index="k"
        :goal="goal"
        class="w-1/6"
        @totalsUpdated="updateTotals"
        @updatePlayer="updatePlayer"
        @removePlayer="removePlayer"
      />
    </div>
    <reset-dialog v-if="showResetDialog" @closeModal="closeResetDialog" />
    <share-dialog v-if="showShareDialog" :link="saveLink" @closeModal="closeShareDialog" />
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
    const totals = []
    return {
      datetime,
      game,
      players,
      goal,
      totals,
      maxplayers: 40,
      showResetDialog: false,
      showShareDialog: false,
      saveLink: null
    }
  },
  computed: {

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
    if (this.jsonData != null) {
      if (this.jsonData.scores.length > 0) {
        this.jsonData.scores.forEach((s, k) => {
          s.forEach((score) => {
            this.$refs['playerScoreCard' + k][0].rounds.push(score)
          })
        })
      }
    }
    this.updateTotals()
  },
  methods: {
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
    updateTotals () {
      if (this.players) {
        this.totals = []
        this.players.forEach((p, k) => {
          const sc = this.$refs['playerScoreCard' + k]
          if (sc) {
            this.totals.push(sc[0].total)
          }
        })
        this.updateLeaders()
      }
    },
    updateLeaders () {
      const max = Math.max(...this.totals)
      if (max === 0) { return null }
      for (let i = 0; i < this.totals.length; i++) {
        this.$refs['playerScoreCard' + i][0].isLeader = false
        if (this.totals[i] === max) {
          this.$refs['playerScoreCard' + i][0].isLeader = true
        }
      }
    },
    save (redirect) {
      const scores = []
      this.players.forEach((p, k) => {
        const sc = this.$refs['playerScoreCard' + k]
        scores.push(sc[0].rounds)
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
      const url = 'http://localhost:3000/scores?id=' + b64
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
    reset () {
      this.showResetDialog = true
    },
    addPlayer () {
      if (this.players.length === this.maxplayers) {
        alert('Max of 40 players.')
        return
      }
      const newPlayer = 'Player' + this.players.length
      this.players.push(newPlayer)
    },
    updatePlayer (playerIndex, newPlayerName) {
      this.players[playerIndex] = newPlayerName
      this.updateTotals()
      console.log(this.players)
    },
    removePlayer (playerIndex) {
      this.players.splice(playerIndex, 1)
      this.updateTotals()
      this.players.forEach((p, k) => {
        const sc = this.$refs['playerScoreCard' + k]
        console.log(sc[0].playerName, sc[0].player, sc[0].playerIndex, sc[0].rounds)
      })
    }
  }
}
</script>
