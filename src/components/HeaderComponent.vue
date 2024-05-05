<template>
	<header class="header" id="header">
		<header-info-component />
		<section class="header__menu">
			<div class="container">
				<div class="header__menu-container">
					<nav class="header__menu-nav">
						<ul id="menu-links">
							<li
								v-for="link in navMenuLinks"
								:key="link.url"
							>
								<a :href="`${link.url}`" @click.prevent="setCheckedHeaderLink(link.value)">{{ link.text }} </a>
							</li>
						</ul>
					</nav>
					<a href="/" class="header__menu-logo">
						<img src="@/assets/img/logo.png" alt="logo">
					</a>
					<div class="header__menu-subitem">
            <ui-search-form />
						<a href="" class="header__menu-enterButton elem-sub" id="callModal" data-modal="callModal">
							Войти
						</a>
						<a href="" class="header__menu-favoriteButton elem-sub" id="favorite-header" data-modal="callModal">
							Избранное
						</a>
						<a href="basket.html" class="header__menu-basketButton elem-sub">
							Корзина
						</a>
					</div>
				</div>
			</div>
		</section>
		<div class="modal" id="modal">
		<div class="modal__login">
			<div class="modal__registration-block login">
				<a href="#" id="closeModal" class="modal__registration-closeLink link-style login">
					<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M7 7L25 25" stroke="#EC6F5D" stroke-width="2"></path>
						<path d="M25 7L7 25" stroke="#EC6F5D" stroke-width="2"></path>
					</svg>
				</a>
				<div class="scroll_on" id="scroll-on-content"></div>
			</div>
		</div>
		</div>
	</header>
</template>
<script>
import HeaderInfoComponent from "@/components/HeaderInfoComponent.vue"
import UiSearchForm from "@/components/UI/forms/uiSearchForm.vue"
import {mapMutations} from "vuex";

export default {
	name: "HeaderComponent.vue",
	components: {UiSearchForm, HeaderInfoComponent },
	data() {
		return {
			navMenuLinks: [
				{ text: 'Каталог', value: 'catalog', url: '' },
				{ text: 'Оплата и доставка', value: 'delivery', url: '' },
				{ text: 'Бонусная программа', value: 'bonuses', url: '' },
				{ text: 'О компании', value: 'about', url: '' },
				{ text: 'Контакты', value: 'contacts', url: '' }
			]
		}
	},
  emits: ['send-checked-link'],
  methods: {
    ...mapMutations({
      setCheckedHeaderLink: 'links/setCheckedHeaderLink'
    }),

  }
}
</script>
<style scoped lang="sass">

</style>