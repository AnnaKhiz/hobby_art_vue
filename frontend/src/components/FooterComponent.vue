<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__container">

        <div class="footer__item contacts">
					<div class="footer__item-logo">
						<ui-logo />
					</div>

					<ui-contacts is-mailing />
        </div>

				<ui-footer-navigation />

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
import UiSubscribe from "@/components/UI/forms/uiSubscribeForm.vue"
import UiLogo from "@/components/UI/uiLogo.vue";
import UiFooterNavigation from "@/components/UI/footer/uiFooterNavigation.vue";

export default {
	name: "FooterComponent",
  components: {
		UiFooterNavigation,
		UiLogo,
		UiSubscribe,
		UiContacts
	},
}
</script>
