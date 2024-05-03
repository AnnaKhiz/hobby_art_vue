<template>
  <footer class="footer" id="footer">
    <div class="container">
      <div class="footer__container">

        <div class="footer__item contacts">
          <div class="footer__item-logo">
            <img src="@/assets/img/logo.png" alt="image logo">
          </div>
          <ul>
            <ui-contacts
              :contacts="contacts"
            />
          </ul>
        </div>

        <nav class="footer__item navigation">
          <ul>
            <li
              v-for="link in footerNavigationMenu"
              :key="link.value"
            >
              <a :href="`${link.link}`">{{ link.text }}</a>
            </li>
          </ul>
        </nav>

        <div class="footer__item subscribe">
          <h3 class="footer__item-label">
            Узнавайте первым о новинках и новостях
          </h3>

          <ui-subscribe >
            <template #form-after>
              <p class="footer__item-text">
                Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </template>
          </ui-subscribe>

          <p class="footer__item-copyright">
            © 2012-2021 ХОББИ АРТ — официальный интернет-магазин товаров для хобби. Все права защищены. Условия использования и политика конфиденциальности
          </p>
        </div>

      </div>
    </div>
  </footer>
</template>

<script>
import UiContacts from "@/components/UI/uiContacts.vue";
import UiSubscribe from "@/components/UI/uiSubscribe.vue"

export default {
	name: "FooterComponent.vue",
  components: {UiSubscribe, UiContacts},
  data() {
    return {
      contacts: [
        { text: '+7 (924) 765 28 20', value: 'phone', href: 'tel:+79247652820', isLink: true },
        { text: 'г. Якутск, ул. Петра Алексеева, д. 6, ТЦ “Олонхо”', value: 'address', isLink: false },
        { text: 'Ежедневно с 10:00 до 19:00', value: 'schedule', isLink: false },
        { text: '@hobbyart_dv', value: 'mail', href: 'mailto:@hobbyart_dv', isLink: true },
      ],
      footerNavigationMenu: [
        { text: 'Каталог', value: 'catalog', link: '' },
        { text: 'Акции', value: 'sale', link: '' },
        { text: 'Новинки', value: 'new-products', link: '' },
        { text: 'Популярное', value: 'popular', link: '' },
        { text: 'Гарантия и возврат', value: 'guarantee', link: '' },
        { text: 'Оплата и доставка', value: 'delivery', link: '' },
        { text: 'Бонусная программа', value: 'bonuses', link: '' },
        { text: 'О компании', value: 'about', link: '' },
        { text: 'Преимущества', value: 'benefits', link: '' },
        { text: 'Личный кабинет', value: 'account', link: '' },
      ]
    }
  }
}
</script>

<style scoped lang="sass">

</style>