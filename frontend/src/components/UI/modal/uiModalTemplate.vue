<template>
  <div
    v-if="display"
    class="modal-message"
  >
    <ui-message-dialog @close="display = false"/>
    <slot name="content"></slot>
  </div>
</template>

<script>
import UiMessageDialog from "@/components/UI/modal/uiMessageDialog.vue";

export default {
  name: "uiModalTemplate.vue",
  components: {UiMessageDialog},
  props: {
    value: {
      type: Boolean,
      default: true
    },
  },
  data() {
    return {
      display: false
    }
  },
  watch : {
    display() {
      if ( this.value !== this.display ) {
        this.$emit('input' , this.display)
      }
    },
    value() {
      if ( this.value !== this.display ) {
        this.display = this.value
      }
    }
  },
  mounted() {
    if ( this.value ) {
      this.display = this.value
    }
  }
}
</script>


<style scoped lang="sass">
.modal-message
  position: fixed
  inset: 0
  z-index: 1000
  background-color: rgba(82, 82, 82, 0.6)
  display: flex
  align-items: center
  justify-content: center

</style>
