<template>
  <div class="main__preferences-item">
    <img :src="require(`@/assets/img/${preferenceItem.image}`)" alt="image preferences">
    <div class="main__preferences-subitem">
      <h3 class="main__preferences-subitem-label">
        {{ preferenceItem.text }}
      </h3>
      <p class="main__preferences-subitem-text">
        {{ preferenceItem.description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "uiItemPreference.vue",
  props: {
    preferenceItem: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped lang="sass">

</style>