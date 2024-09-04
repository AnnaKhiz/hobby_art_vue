<template>

    <div class="notify-content" :style="`width: ${width}px; height: ${height}px; background: ${background}`">
      <h3 :style="`color: ${textColor}; font-weight: 900`">{{ text }}</h3>
    </div>
</template>

<script>


export default {
  name: "uiNotifyDialog.vue",
  props: {
    text: {
      type: String,
      default: 'Товар добавлен в корзину'
    },
    width: {
      type: String,
      default: '220'
    },
    height: {
      type: String,
      default: '50'
    },
    background: {
      type: String,
      default: 'var(--bg-color-banner)'
    },
    textColor: {
      type: String,
      default: 'black'
    }
 }
}
</script>

<style scoped lang="sass">


.notify-content
  font: 400 normal 0.8rem/1rem 'Montserrat'
  position: fixed
  top: 20px
  right: 20px
  z-index: 1000
  padding: 20px
  border-radius: 12px
</style>
