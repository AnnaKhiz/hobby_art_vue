<template>
<!--  mailing true template -->
  <div class="main__user-page-content-editable-content" >
    <p class="main__user-page-content-user-name data-page mailing">
      Рассылка
    </p>
    <p class="main__user-page-content-mailing">
      Вы {{ mailing ? 'не' : '' }} подписаны на рассылку
    </p>
    <div class="main__user-page-content-mailing-block">
      <p class="main__user-page-content-mailing-subscribe">
        {{ mailing ? 'Подписаться на рассылку о новинках и акциях' : 'Хотите отписаться от рассылки?' }}

      </p>
      <form v-if="mailing" action="#" method="get" class="footer__item-form main__user-page-content-mailing-form">
        <input type="email" placeholder="Ваш Email" class="email-mailing">
        <button type="submit" id="subscribe">Подписаться</button>
      </form>
      <button v-else class="main__user-page-content-mailing cancel" style="margin-bottom: 0" id="subscribe">Да, отписаться</button>
    </div>

    <p class="footer__item-text main__user-page-content-mailing-text">
      Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности
    </p>
  </div>

</template>

<script>
export default {
  name: "userPageMailing.vue",
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      mailing: false
    }
  }
}
</script>

<style scoped lang="sass">

</style>
