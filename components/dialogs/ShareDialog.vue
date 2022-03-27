<template>
  <div id="share-dialog" class="sc-overlay fixed top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center bg-gray-900/50">
    <div v-click-outside="clickOutside" class="sc-modal w-5/6 p-0 flex justify-center items-center">
      <div class="sc-card w-5/6 flex flex-col">
        <svg style="width:32px;height:32px" viewBox="0 0 24 24">
          <g>
            <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            <rect
              class="btn"
              fill="transparent"
              x="0"
              y="0"
              width="32"
              height="32"
              @click="close"
            />
          </g>
        </svg>
        <div class="share-link bg-black md:h-64 shadow-lime-500/50 shadow-md border-t-4 border-lime-500/50 rounded-t-lg p-4 flex flex-col justify-between">
          <textarea class="p-1 whitespace-normal break-all h-full bg-transparent border-none outline-none resize-none shadow-none overflow-auto" v-text="link.url" />
          <div class="flex cursor-pointer py-2">
            <svg class="cursor-pointer" style="width:28px;height:28px" viewBox="0 0 24 24">
              <g>
                <path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
                <rect
                  class="btn"
                  fill="transparent"
                  x="0"
                  y="0"
                  width="32"
                  height="32"
                  @click="copyToClipboard"
                />
              </g>
            </svg>
            <span class="ml-4">{{ message }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    link: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    clickOutside (e) {
      if (e.srcElement.id !== 'shareButton') {
        this.$emit('closeModal')
      }
    },
    close () {
      this.$emit('closeModal')
      this.$router.push({ path: '/scores', query: { id: this.link.b64 } })
    },
    async copyToClipboard () {
      console.log(this.link.url)

      try {
        await this.$copyText(this.link.url).then(() => {
          this.message = 'Copied that!'
        })
      } catch (e) {
        this.message(e)
      }
    }
  }
}
</script>
