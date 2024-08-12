<template>
<!--  mailing true template -->
  <div class="main__user-page-content-editable-content" >
    <p class="main__user-page-content-user-name data-page mailing">
      Рассылка
    </p>
    <p class="main__user-page-content-mailing">
      Вы {{ !mailing ? 'не' : '' }} подписаны на рассылку
    </p>
    <div class="main__user-page-content-mailing-block">
      <p class="main__user-page-content-mailing-subscribe">
        {{ !mailing ? 'Подписаться на рассылку о новинках и акциях' : 'Хотите отписаться от рассылки?' }}
      </p>
      <form
        v-if="!mailing"
        action="#"
        method="get"
        class="footer__item-form main__user-page-content-mailing-form"
      >
        <input v-model="entityMailing.email" type="email" placeholder="Ваш Email" class="email-mailing">
        <button type="submit" @click.prevent="editMailingPreferences">Подписаться</button>
      </form>
      <button
        v-else
        class="main__user-page-content-mailing cancel"
        style="margin-bottom: 0"
        @click.prevent="editMailingPreferences"
      >
        Да, отписаться</button>
    </div>

    <p class="footer__item-text main__user-page-content-mailing-text">
      Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности
    </p>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "userPageMailing",
  props: {
    mailing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      entityMailing: {
        mailing: false
      }
    }
  },
  methods: {
    async editMailingPreferences() {
      this.entityMailing.mailing = !this.entityMailing.mailing
      const result = await axios.patch('/user/edit', this.entityMailing);

      if (!result) return;

      this.$emit('mail', this.entityMailing.mailing)
    }
  },
  mounted() {
    this.entityMailing.mailing = this.mailing
  }
}
</script>

<style scoped lang="sass">

</style>
