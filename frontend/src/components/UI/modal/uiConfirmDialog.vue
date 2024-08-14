<template>
  <div class="dialog-content" >
    <div class="dialog-header">
      <h3>{{ header }}</h3>
      <ui-close-icon @close="$emit('close')" style="position: static;"/>
    </div>
    <div class="dialog-body-text">
      <h2>{{ text }}</h2>
    </div>
    <div>
      <button class="dialog-action" @click="$emit('close')">
        Закрыть
      </button>
    </div>
  </div>
</template>

<script>

import UiCloseIcon from "@/components/UI/icons/uiCloseIcon.vue";

export default {
  name: "uiConfirmDialog",
  components: { UiCloseIcon },
  props: {
    header: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: 'Товар добавлен в корзину'
    }
  }
}
</script>

<style scoped lang="sass">
.dialog
  &-content
    display: flex
    flex-direction: column
    justify-content: center
    align-items: flex-end
    padding: 20px
    width: 500px
    height: 200px
    border-radius: 12px
    background-color: #FFF
  &-header
    display: flex
    align-items: center
    justify-content: space-between
    margin-bottom: 10px
  &-body-text
    width: 100%
    flex-grow: 1
    font-family: 'Montserrat'
    font-size: 1.3rem
    text-align: center
  &-action
    padding: 13px 45px
    border-radius: 49px
    font: 600 normal 1rem/1.5rem 'Spectral SC'
    text-transform: uppercase
    background: var(--buttonBgRegular)
    color: var(--colorTextButton)
    transition: background 0.3s ease-in-out 0s
    &:hover
      background: var(--buttonBgHover)
</style>
