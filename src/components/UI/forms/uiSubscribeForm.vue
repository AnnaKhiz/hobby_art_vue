<template>
  <form class="footer__item-form">
    <input type="email" placeholder="Ваш Email">
    <button type="submit">подписаться</button>
  </form>
  <slot name="form-after"></slot>
</template>

<script>
export default {
  name: "uiSubscribe.vue"
}
</script>

<style scoped lang="sass">

</style>