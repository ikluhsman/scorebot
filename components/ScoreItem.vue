<template>
  <div ref="scoreItem" v-click-outside="clickOutside" :class="isSelected ? 'flex flex-nowrap justify-between relative pt-1 bg-gray-800' : 'flex flex-nowrap justify-between relative pt-1'" @click="itemClick">
    <span>{{ value }}</span>
    <button v-show="isSelected" id="delete-button" class="w-8 absolute right-0" @click="deleteButtonClick">
      <svg style="width:24px;height:24px" viewBox="0 0 24 24">
        <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
      </svg>
    </button>
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
      this.$emit('deleteScoreItem', this.itemIndex)
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
