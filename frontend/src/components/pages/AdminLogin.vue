<template>
  <main class="main"  style="text-align: center">
    <h2 style="margin-bottom: 20px">Here is Admin Panel</h2>
    <button @click="checkedMenu = 'items'" class="modal__registration-form-button">Товары</button>
    <admin-items-form v-if="checkedMenu === 'items'" />
  </main>
</template>

<script>




import AdminItemsForm from "@/components/UI/forms/adminItemsForm.vue"

export default {
  name: "AdminLogin.vue",
  components: {AdminItemsForm},
  data() {
    return {
      form: {},
      checkedMenu: ''
    }
  },
  mounted() {
    this.checkedMenu = 'items'
  }
}
</script>

<style scoped lang="sass">

</style>
