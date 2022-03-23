<template>
  <div class="sc-overlay fixed top-0 bottom-0 left-0 right-0 flex flex-col justify-start items-center bg-black z-100">
    <button id="lb-button-close" @click="close">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
      </svg>
    </button>
    <div class="sc-modal text-center h-screen w-screen p-0 flex justify-center items-center bg-black">
      <div class="sc-card">
        <p class="text-lg">
          Erase the scores and start a new game?
        </p>
        <div class="sc-buttons">
          <button class="text-lime-500" @click="yes">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
            </svg>
          </button>
          <button class="text-red-500" @click="no">
            <svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      response: false
    }
  },
  methods: {
    close () {
      this.$emit('closeModal', this.response)
    },
    yes () {
      this.response = true
      this.$emit('closeModal', this.response)
    },
    no () {
      this.response = false
      this.$emit('closeModal', this.response)
    }
  }
}
</script>
