<template>
  <div id="load-dialog" ref="loadDialog" class="sc-overlay fixed top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center bg-gray-900/50">
    <div v-click-outside="clickOutside" class="sc-modal w-5/6 p-0 flex justify-center items-center">
      <div class="sc-card w-5/6 flex flex-col">
        <svg style="width:32px;height:32px" viewBox="0 0 24 24">
          <g>
            <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            <rect
              class="btn cursor-pointer"
              fill="transparent"
              x="0"
              y="0"
              width="32"
              height="32"
              @click="close"
            />
          </g>
        </svg>
        <div class="share-link bg-black md:h-64 shadow-lime-500/50 shadow-md border-t-4 border-lime-500/50 rounded-t-lg p-1 flex flex-col">
          <textarea ref="linkTextArea" v-model="link" v-focus placeholder="Enter URL" class="p-1 whitespace-normal break-all h-full bg-transparent border-none overflow-auto outline-none resize-none shadow-none" />
          <div class="p-2 place-self-end">
            <svg style="width:32px;height:32px" viewBox="0 0 24 24">
              <g>
                <path fill="currentColor" d="M12,8V4L20,12L12,20V16H4V8H12Z" />
                <rect
                  class="btn cursor-pointer"
                  fill="transparent"
                  x="0"
                  y="0"
                  width="32"
                  height="32"
                  @click="goClick"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      link: null,
      b64: null
    }
  },
  methods: {
    clickOutside (e) {
      if (e.srcElement.id !== 'loadButton') {
        this.$emit('closeModal')
        e.preventDefault()
      }
    },
    close () {
      this.$emit('closeModal')
    },
    validateJsonData (jsonData) {
      if (('datetime' in jsonData) === false ||
          ('game' in jsonData) === false ||
          ('goal' in jsonData) === false ||
          ('players' in jsonData) === false) {
        return false
      }
      if (isNaN(Date.parse(jsonData.datetime)) ||
          typeof jsonData.game !== 'string' ||
          isNaN(jsonData.goal) ||
          !Array.isArray(jsonData.players)) {
        return false
      }
      if (jsonData.players.length > 0) {
        jsonData.players.forEach((p) => {
          if (typeof p !== 'object') {
            return false
          }
          if (!('name' in p) && !('scores' in p)) {
            return false
          }
          if (typeof p.name !== 'string' || !Array.isArray(p.scores)) {
            return false
          }
        })
      }
      return true
    },
    goClick () {
      if (!this.linkIsValid()) { alert('Enter a valid link') }
      const params = this.link.split('?')
      const urlParams = new URLSearchParams('?' + params)
      let jsonData = ''
      for (const pair of urlParams.entries()) {
        if (this.isBase64Str(pair[1])) {
          const b = Buffer.from(pair[1], 'base64').toString()
          jsonData = JSON.parse(b)
          if (!this.validateJsonData(jsonData)) {
            // bad payload
            alert('Link is not valid.')
            return
          }
          // nav to the link and close modal
          this.b64 = pair[1]
        } else {
          // bad payload
          alert('Not a valid link.')
          this.$refs.linkTextArea.value = ''
          return
        }
      }
      this.$emit('closeModal')
      this.$router.push({ path: '/scores', query: { id: this.b64 } })
    },
    linkIsValid () {
      // trim any whitespace
      this.link = this.link.trim()
      // check for null values, the url, and id parameter
      if (this.link === null || this.link === '' || !this.link.indexOf('https://' + location.host + '/scores?id=') === 0) {
        return false
      }
      // check for existence of params
      if (this.link.split('?').length <= 1) {
        return false
      }
      // check the value of the id parameter to make sure its a string
      if ((!(typeof this.link === 'string' || this.link instanceof String))) {
        return false
      }
      // passed all checks
      return true
    },
    isBase64Str (string) {
      const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/
      return base64regex.test(string)
    }
  }
}
</script>
