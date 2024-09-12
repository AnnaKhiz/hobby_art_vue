<template>
  <div
    v-if="display"
    class="modal-message"
  >
    <ui-confirm-dialog :save="save" @close="display = false" :width="width" :height="height" @save="$emit('save')" :header="header">
      <template #content>
       <slot name="tableData" ></slot>
      </template>
    </ui-confirm-dialog>
  </div>
</template>

<script>
import UiConfirmDialog from "@/components/UI/modal/uiConfirmDialog.vue";

export default {
  name: "uiModalTemplate.vue",
  components: {UiConfirmDialog},
  props: {
    header: {
      type: String,
      default: ''
    },
    save: {
      type: Boolean,
      default: false
    },
    value: {
      type: Boolean,
      default: true
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
  data() {
    return {
      display: false
    }
  },
  watch : {
    display() {
      if ( this.value !== this.display ) {
        this.$emit('close' , this.display)
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
