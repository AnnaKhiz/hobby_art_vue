<template>
  <a href="#" id="closeModal" class="modal__registration-closeLink link-style login" @click.stop="$emit('close')">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 7L25 25" stroke="#EC6F5D" stroke-width="2"></path>
      <path d="M25 7L7 25" stroke="#EC6F5D" stroke-width="2"></path>
    </svg>
  </a>
</template>

<script>
export default {
  name: "uiCloseIcon",
}
</script>



<style scoped lang="sass">

</style>
