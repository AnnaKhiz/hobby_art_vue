<template>
  <div class="color-panel" :style="`justify-content: ${position}`" :id="item._id">
    <p
      v-for="color in colorsArray"
      :key="color._id"
      ref="colors"
      :style="`background-color: ${color.value}; border: 1px solid ${color.value === 'white' ? 'lightgray' : 'none'}; width: ${size}px; height: ${size}px; margin-right: 5px`"
      class="render-colors"
      @click.prevent="$emit('check', color.value)"
    ></p>
    <span v-if="!details" @click="isFull = !isFull">{{ !isFull ? colorItemsShowMore(item.color) : 'Hide'}}</span>
  </div>

</template>

<script>
export default {
  name: "uiColorsIcon",
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    size: {
      type: String,
      default: '20'
    },
    position: {
      type: String,
      default: 'center'
    },
    details: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isFull: false,
      itemIndex: null,
    }
  },
  emits: ['check'],
  computed: {
    cuttedItemsArray() {
      return this.isFull ? this.item.color : this.item.color.slice(0, 4)
    },
    colorsArray() {
      return this.details ? this.item.color : this.cuttedItemsArray
    }
  },
  methods: {
    colorItemsShowMore(colors) {
      return colors.length > 4 ? `${colors.length - 4} +` : ''
    },
  },
  mounted() {
    // console.log(this.item)
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
.checked-color
  border: 3px solid var(--colorTextDesc)
.color-panel
  display: flex
  align-items: center
</style>
