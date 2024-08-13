<template>
  <div class="color-panel" :style="`justify-content: ${position}`">
    <p
      v-for="color in cuttedItemsArray"
      :key="color._id"
      :style="`background-color: ${color.value}; border: 1px solid ${color.value === 'white' ? 'lightgray' : 'none'}; width: ${size}px; height: ${size}px; margin-right: 5px`"
      class="render-colors"
      @click.prevent="$emit('check')"
    ></p>
    <span @click="isFull = !isFull">{{ !isFull ? colorItemsShowMore(items) : 'Hide'}}</span>
  </div>

</template>

<script>
export default {
  name: "uiColorsIcon",
  props: {
    items: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      default: '20'
    },
    position: {
      type: String,
      default: 'center'
    }
  },
  data() {
    return {
      isFull: false
    }
  },
  computed: {
    cuttedItemsArray() {
      return this.isFull ? this.items : this.items.slice(0, 4)
    }
  },
  methods: {
    colorItemsShowMore(colors) {
      return colors.length > 4 ? `${colors.length - 4} +` : ''
    },
  }
}
</script>



<style scoped lang="sass">
.render-colors
  display: inline-block
  border-radius: 50%
  transition: box-shadow 0.3s ease-in-out 0s
  &:hover
    cursor: pointer
    box-shadow: 1px 1px 4px gray
.color-panel
  display: flex
  align-items: center
</style>
