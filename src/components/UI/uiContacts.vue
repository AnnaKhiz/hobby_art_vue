<template>
  <li
      v-for="item in contacts"
      :key="item.value"
  >
    <a v-if="item.isLink" :href="`${item.href}`" class="header__contacts-tel" >{{ item.text }}</a>
    <span v-else>{{ item.text }}</span>
  </li>
</template>

<script>
export default {
  name: "uiContacts.vue",
  props: {
    contacts: {
      type: Array,
      default: () => []
    }
  },
}
</script>

<style scoped lang="sass">

</style>