<template>
  <div ref="scoreItem" v-click-outside="clickOutside" :class="isSelected ? 'bg-gray-800 flex p-2 mt-2' : 'mt-2 p-1 text-left'" @click="itemClick">
    <span class="">{{ value }}</span>
    <svg v-show="isSelected" id="delete-button" class="w-8" style="width:28px;height:28px" viewBox="0 0 24 24">
      <g>
        <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
        <rect
          class="btn cursor-pointer hover:stroke-transparent hover:fill-transparent focus:fill-transparent focus:stroke-transparent active:fill-transparent active:stroke-transparent"
          fill="transparent"
          x="0"
          y="0"
          width="32"
          height="32"
          @click="deleteButtonClick"
        />
      </g>
    </svg>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    itemIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isSelected: false
    }
  },
  methods: {
    deleteButtonClick () {
      this.$emit('deletePlayerScore', this.itemIndex)
    },
    itemClick (e) {
      this.isSelected = !this.isSelected
    },
    clickOutside (e) {
      if (this.isSelected) {
        this.isSelected = false
      }
    }
  }
}
</script>
