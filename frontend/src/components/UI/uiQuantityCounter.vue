<template>
  <button class="main__product-details-about-item-basket-flex-count">
    <span class="minus" @click.prevent="removeItem">-</span>
    <span class="result">{{ quantity }}</span>
    <span class="plus" @click.prevent="addItem">+</span>
  </button>
</template>

<script>
export default {
  name: "uiQuantityCounter",
  props: {
    orderCount: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      quantity: 1
    }
  },
  emits: ['input'],
  methods: {
    removeItem() {
      if (this.quantity === 1) {
        return false
      }
      return this.quantity -= 1
    },
    addItem() {
      return this.quantity += 1
    },
  },
  mounted() {
    this.orderCount ? this.quantity = this.orderCount : this.quantity
  },
  watch: {
    quantity(newValue) {
      this.$emit('input', newValue)
    }
  }
}
</script>



<style scoped lang="sass">

</style>
