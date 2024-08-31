<template>
  <table style="width: 100%; margin-bottom: 20px;">

    <tr v-for="(item, index) in items" :key="item" @mouseover="hover = true" @mouseleave="hover = false">
      <td :style="{ borderTopLeftRadius: hover && index === 0 ? '12px' : 'none' }" class="column-title">{{item.text}}: </td>
      <td style="width: auto">
        <slot v-if="$slots[item.name]" :name="item.name" :item="item"></slot>
        <span v-else>{{ item.value }}</span>
      </td>
      <td class="column-edit" :style="{ borderTopRightRadius: hover && index === 0 ? '12px' : 'none' }">
        <img src="@/assets/img/edit.svg" alt="edit icon" style="cursor: pointer; width: 20px; height: auto; display: block; object-fit: contain">
      </td>
    </tr>

  </table>
</template>



<script>

export default {
  name: "uiTableContent.vue",
  data() {
    return {
      hover: false
    }
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },

  },
  methods: {
    updateHoverState({hover}) {
      console.log(hover)
    }
  }
}
</script>



<style scoped lang="sass">
table, th, td
  border-bottom: 1px solid var(--grayLinkColor)
  border-collapse: collapse
  & tr
    transition: all 0.3s ease-in-out 0s
    &:hover
      background: var(--colorTextButton)
      cursor: pointer
  & td
    padding: 15px 20px
    &.column-title
      width: 200px

    &.column-edit
      width: 20px

</style>
