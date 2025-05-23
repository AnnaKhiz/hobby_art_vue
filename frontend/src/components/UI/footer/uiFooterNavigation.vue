<template>
	<nav class="footer__item navigation">
		<ul>
			<li
				v-for="link in footerNavigationMenu"
				:key="link.value"
			>
				<span
					v-if="link.value === 'account'"
					@click.prevent="checkFunction"
				>
					{{ userPageLabel }}
				</span>
				<span
					v-else
					@click="openMenu(link.url, link.value)"
				>
					{{ link.text }}
				</span>
			</li>
		</ul>
	</nav>
</template>

<script>
import {
	mapGetters,
	mapMutations
} from "vuex";
import { openMenuPage } from "@/services/linkConverter";
import { checkFunction } from "@/services/handleLogInDialog";

export default {
	name: "uiFooterNavigation.vue",
	data() {
		return {
			isFavorite: false,
			checkFunction,
		}
	},
	computed: {
		...mapGetters({
			footerNavigationMenu: 'links/footerNavigationMenu',
			isAuthorized: 'user/isAuthorized',
		}),
		userPageLabel() {
			return this.isAuthorized ? 'Кабинет' : 'Войти';
		},
	},
	methods: {
		...mapMutations({
			setCheckedHeaderLink: 'links/setCheckedHeaderLink',
		}),
		openMenu(link, value) {
			const path = openMenuPage(link, value);
			this.$router.push(path);
			this.setCheckedHeaderLink(value);
		},
	}
}
</script>
