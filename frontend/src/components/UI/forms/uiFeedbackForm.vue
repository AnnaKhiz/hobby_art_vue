<template>
  <slot name="text-before"></slot>
  <form class="main__feedback-form">
    <input type="text" :placeholder="name">
    <input type="text" :placeholder="phone">
    <div class="main__feedback-subform">
      <button type="submit">Отправить</button>
      <p class="main__feedback-subform-text">
        {{ afterText }}
      </p>
    </div>
  </form>
</template>

<script>
export default {
  name: "uiFeedbackForm.vue",
  props: {
    name: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    afterText: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="sass">

</style>