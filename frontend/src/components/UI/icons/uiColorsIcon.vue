<template>
  <div class="color-panel">
    <svg
      width="130"
      height="20"
      viewBox="0 0 130 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      @click="$emit('input')"
    >
      <circle
        v-for="color in cuttedItemsArray"
        :key="color.text"
        :cx="color.cx"
        cy="9.5"
        r="8.5"
        :fill="color.value"
        :stroke="color.value === 'white' ? 'black' : 'none'"
        :stroke-width="color.value === 'white' ? '0.5' : 'none'"
      />
    </svg>
    <span @click="isFull = !isFull">{{ !isFull ? colorItemsShowMore(colorItems) : 'Hide'}}</span>
  </div>


</template>

<script>
export default {
  name: "uiColorsIcon",
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      coordinate: -10,
      // coordinates: ['8.5', '27.5', '46.5', '65.5', '84.5'],
      colorItems: [],
      isFull: false
    }
  },
  computed: {
    cuttedItemsArray() {
      return this.isFull ? this.colorItems : this.colorItems.slice(0,4)
    }
  },
  methods: {
    colorItemsShowMore(colors) {
      return colors.length > 4 ? `${colors.length - 4} +` : ''
    },
  },
  mounted() {
    this.items.forEach(el => {
      this.colorItems.push({...el, cx: this.coordinate += 20 })
    })
    console.log(this.colorItems)
  }
}
</script>



<style scoped lang="sass">
.color-panel
  display: flex
  align-items: center
  justify-content: flex-start
  gap: 5px
</style>
