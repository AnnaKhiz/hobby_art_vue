<template>
  <div class="main__catalog-item">
    <h3 class="main__catalog-item-label">
      {{ catalogItemsInfo.text }}
    </h3>
    <p class="main__catalog-item-price">
      от {{ catalogItemsInfo.price }} грн
    </p>
    <div class="main__catalog-item-subitem">
      <a :href="`${catalogItemsInfo.link}/${catalogItemsInfo.value}`" class="main__catalog-item-link">
        Подробнее
      </a>
      <img :src="require(`@/assets/img/${catalogItemsInfo.image}`)" alt="image catalog">
    </div>
  </div>
</template>

<script>
export default {
  name: "uiCatalogItem",
  props: {
    catalogItemsInfo: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped lang="sass">

</style>
