<template>
    <svg
      width="97"
      height="20"
      viewBox="0 0 97 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      @click="$emit('input')"
    >
      <circle
        v-for="color in colorItems"
        :key="color.text"
        :cx="color.cx"
        cy="9.5"
        r="8.5"
        :fill="color.value"
        :stroke="color.value === 'white' ? 'black' : 'none'"
        :stroke-width="color.value === 'white' ? '0.5' : 'none'"
      />
    </svg>
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
      coordinates: ['8.5', '27.5', '46.5', '65.5'],
      colorItems: []
    }
  },
  mounted() {
    this.colorItems = this.items.map((el, i) => ({...el, cx: this.coordinates[i]}))
    console.log(this.colorItems)
  }
}
</script>



<style scoped lang="sass">

</style>
