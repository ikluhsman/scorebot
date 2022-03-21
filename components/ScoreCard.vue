<template>
  <div class="mt-12 flex flex-col items-center">
    <score-board
      :key="'scoreBoard'"
      :players="players"
      :goal="goal"
      :game="game"
      :datetime="datetime"
      :leaders="getLeaders"
      @changeGoal="changeGoal"
    />
    <div class="w-5/6 flex justify-center px-2">
      <player-score-card
        v-for="(p, k) in players"
        :ref="'playerScoreCard' + k"
        :key="k"
        :player="p"
        :player-index="k"
        :goal="goal"
        @totalsUpdated="updatedCardTotals"
      />
    </div>
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
    const game = 'Rum 500 Variation'
    const goal = 0
    const players = []
    const totals = []
    return {
      datetime,
      game,
      players,
      goal,
      totals
    }
  },
  computed: {
    getLeaders () {
      const max = Math.max(...this.totals)
      const indexes = []
      for (let i = 0; i < this.totals.length; i++) {
        if (this.totals[i] === max) {
          indexes.push(i)
        }
      }
      let playersText = ''
      indexes.forEach((i, k) => {
        playersText += this.players[i] + ((indexes.length > 1 && k + 1 < indexes.length) ? ',' : '')
      })
      return playersText
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
    changeGoal (value) {
      const regExp = /[a-zA-Z]/g
      const alertMsg = 'Score must be a non-zero, positive, or negative number.'
      if (regExp.test(value)) {
        alert(alertMsg)
        return
      }
      const pointNum = parseInt(value)
      if (isNaN(pointNum) || pointNum === 0) {
        alert(alertMsg)
      } else {
        this.goal = pointNum
      }
    },
    updatedCardTotals () {
      this.updateTotals()
    },
    arrayMax (arr) {
      let len = arr.length; let max = -Infinity
      while (len--) {
        if (arr[len] > max) {
          max = arr[len]
        }
      }
      return max
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
      }
    },
    generateGameData () {
      const scores = []
      this.players.forEach((p, k) => {
        const sc = this.$refs['playerScoreCard' + k]
        scores.push(sc[0].rounds)
      })
      const scoredata = {
        datetime: this.datetime,
        game: this.game,
        players: this.players,
        goal: this.goal,
        scores
      }
      console.log(scoredata)
      const scoresJson = JSON.stringify(scoredata)
      const buff = Buffer.from(scoresJson)
      const b64 = buff.toString('base64')
      const url = 'https://scorebot.app/scores?id=' + b64
      this.$router.push({ path: '/scores', query: { id: b64 } })
      return url
    },
    generateGameLink () {
      const url = this.generateGameData()
      alert(url)
    },
    clear () {
      this.datetime = moment().format('M/D/YYYY hh:mm')
      this.goal = 0
      this.players = []
    },
    addPlayer () {
      const newPlayer = 'Player' + this.players.length

      this.players.push(newPlayer)
    }
  }
}
</script>
