<template>
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
</template>

<script>
export default {
	name: "uiFooterNavigation.vue",
	data() {
		return {
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
