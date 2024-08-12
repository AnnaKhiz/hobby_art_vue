<template>
  <div class="main__slider-popular-switcher" >
    <p class="main__slider-popular-switcher-label " :class="{ 'red-text' : !isSwitchOn }">
      Новинки
    </p>

    <div class="switcher-button" >
      <div class="switch-btn switch-off" @click="toggleSwitcher" :class="{ 'switch-on' : isSwitchOn}"></div>
      <div id="bl-2" ></div>
    </div>

    <p class="main__slider-popular-switcher-label" :class="{ 'red-text' : isSwitchOn }">
      Популярное
    </p>
  </div>
  <slot name="popular-swiper"></slot>
</template>

<script>

export default {
  name: "uiSwitcherMain",
  data() {
    return {
      isSwitchOn: false
    }
  },
  emits: ['switcher-state'],
  methods: {
    toggleSwitcher() {
      this.isSwitchOn = !this.isSwitchOn;
      this.$emit('switcher-state', this.isSwitchOn);
    }
  }
}
</script>

<style scoped lang="sass">

</style>
