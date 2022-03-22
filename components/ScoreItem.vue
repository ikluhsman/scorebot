<template>
  <div ref="scoreItem" v-click-outside="clickOutside" :class="isSelected ? 'flex flex-nowrap justify-between relative pt-1 bg-gray-800' : 'flex flex-nowrap justify-between relative pt-1'" @click="itemClick">
    <span>{{ value }}</span>
    <button v-show="isSelected" id="delete-button" class="w-8 absolute right-0" @click="deleteButtonClick">
      X
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
