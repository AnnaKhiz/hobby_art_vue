<template>
  <div class="main__user-page-content-editable-content" >
    <p class="main__user-page-content-user-name data-page bonuses">
      Бонусный счет
    </p>
    <p class="main__user-page-content-bonuses">
      На вашем счете <span>{{ bonuses }} бонусов</span>, которые вы можете потратить.
    </p>
  </div>
</template>

<script>
export default {
  name: "userPageBonuses",
  props: {
    bonuses: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped lang="sass">

</style>
