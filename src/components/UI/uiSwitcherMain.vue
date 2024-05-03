<template>
  <div class="main__slider-popular-switcher" id="popular-new">
    <p class="main__slider-popular-switcher-label red-text" id="switcher-label-1">
      Новинки
    </p>

    <div class="switcher-button">
      <div class="switch-btn switch-off" data-id="#bl-2" ></div>
      <div id="bl-2"></div>
    </div>

    <p class="main__slider-popular-switcher-label" id="switcher-label-2">
      Популярное
    </p>
  </div>
  <slot name="popular-swiper"></slot>
</template>

<script>

export default {
  name: "uiSwitcherMain.vue",

}
</script>

<style scoped lang="sass">

</style>