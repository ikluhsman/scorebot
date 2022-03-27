<template>
  <div class="sc-overlay fixed top-0 bottom-0 left-0 right-0 flex flex-col justify-start items-center bg-black">
    <div class="sc-modal text-center h-screen w-screen p-0 flex justify-center items-center bg-black">
      <div class="sc-card">
        <p class="text-2xl">
          {{ playerName }} has scores, remove player?
        </p>
        <div class="sc-buttons flex justify-center items-center gap-3">
          <svg class="text-lime-500" style="width:32px;height:32px" viewBox="0 0 24 24">
            <g>
              <path fill="currentColor" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
              <rect
                class="btn cursor-pointer hover:stroke-transparent hover:fill-transparent focus:fill-transparent focus:stroke-transparent active:fill-transparent active:stroke-transparent"
                fill="transparent"
                x="0"
                y="0"
                width="32"
                height="32"
                @click="yes"
              />
            </g>
          </svg>
          <svg class="text-red-500" style="width:32px;height:32px" viewBox="0 0 24 24">
            <g>
              <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
              <rect
                class="btn cursor-pointer hover:stroke-transparent hover:fill-transparent focus:fill-transparent focus:stroke-transparent active:fill-transparent active:stroke-transparent"
                fill="transparent"
                x="0"
                y="0"
                width="32"
                height="32"
                @click="close"
              />
            </g>
            </button>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    playerName: {
      type: String,
      required: true
    }
  },
  methods: {
    close () {
      this.$emit('closeModal', false)
    },
    yes () {
      this.$emit('closeModal', true)
    }
  }
}
</script>
