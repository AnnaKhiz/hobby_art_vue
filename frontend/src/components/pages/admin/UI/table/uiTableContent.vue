<template>
  <table style="width: 100%; margin-bottom: 20px;">
    <tr v-for="item in items" :key="item">
      <td class="column-title">{{item.text}}: </td>
      <td style="width: auto">
        <slot v-if="$slots[item.name]" :name="item.name" :item="item"></slot>
        <span v-else>{{ item.value }}</span>
      </td>
      <td class="column-edit">
        <img src="@/assets/img/edit.svg" alt="edit icon" style="cursor: pointer; width: 20px; height: auto; display: block; object-fit: contain">
      </td>
    </tr>

  </table>
</template>

<script>
export default {
  name: "uiTableContent.vue",
  props: {
    items: {
      type: Array,
      default: () => []
    },

  }
}
</script>



<style scoped lang="sass">
table, th, td
  border-bottom: 1px solid var(--grayLinkColor)
  border-collapse: collapse
  & td
    padding: 15px 0 5px 0
    &.column-title
      width: 200px
    &.column-edit
      width: 50px
</style>
