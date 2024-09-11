<template>

  <div class="dialog-content scrollable" :style="`width: ${width}; height: ${height}`">
    <div class="dialog-header">
      <h3>{{ header }}</h3>
      <ui-close-icon @close="$emit('close')" style="position: static;"/>
    </div>
    <div class="dialog-body-text">
      <slot v-if="!text" name="content">
        <h2>Товар добавлен в корзину</h2>
      </slot>
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
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: ''
    }

  },
  updated() {
    console.log('UPDATED DIALOG')
  },
}
</script>

<style scoped lang="sass">


.dialog
  &-content
    display: flex
    flex-direction: column
    justify-content: flex-start
    align-items: flex-end
    padding: 20px
    width: 500px
    height: 200px
    border-radius: 12px
    background-color: #FFF
    overflow-y: scroll
    overflow-x: hidden
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
    margin-top: 15px
    border-radius: 49px
    font: 600 normal 1rem/1.5rem 'Spectral SC'
    text-transform: uppercase
    background: var(--buttonBgRegular)
    color: var(--colorTextButton)
    transition: background 0.3s ease-in-out 0s
    &:hover
      background: var(--buttonBgHover)
</style>
