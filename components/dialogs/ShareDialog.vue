<template>
  <div class="sc-overlay fixed top-0 bottom-0 left-0 right-0 flex flex-col justify-center items-center bg-gray-900/50 z-100">
    <div class="sc-modal w-5/6 p-0 flex justify-center items-center">
      <div class="sc-card w-full flex flex-col items-end">
        <button @click="close">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
          </svg>
        </button>
        <div class="share-link bg-black h-96 shadow-lime-500/50 shadow-md border-t-4 border-lime-500/50 rounded-t-lg p-4 flex flex-col justify-between">
          <p ref="theLink" class="whitespace-normal break-all truncate">
            {{ link.url }}
          </p>
          <div class="flex" @click="copyToClipboard">
            <button>
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
              </svg>
            </button>
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
      message: 'Copy Link'
    }
  },
  methods: {
    close () {
      this.$emit('closeModal')
      this.$router.push({ path: '/scores', query: { id: this.link.b64 } })
    },
    copyToClipboard () {
      navigator.clipboard.writeText(this.link.url).then(() => {
        this.message = 'Copied that!'
      })
    }
  }
}
</script>
