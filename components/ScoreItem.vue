<template>
  <div :class="'flex flex-nowrap justify-between relative pt-1'" @click="itemClick">
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
      if (this.isSelected) {
        this.$emit('clearSelectedScoreEntries')
        e.srcElement.style.backgroundColor = 'rgba(50,50,50,0.8)'
      } else {
        e.srcElement.style.backgroundColor = ''
        this.$emit('clearSelectedScoreEntries')
      }
    }
  }
}
</script>
