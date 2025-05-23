<template>
	<nav class="header__menu-nav">
		<ul>
			<li
				v-for="link in getNavMenuLinks"
				:key="link.url"
			>
				<span @click="openMenu(link.url, link.value)">{{ link.text }} </span>
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

export default {
	name: "uiHeaderNavigation.vue",
	computed: {
		...mapGetters({
			getNavMenuLinks: 'links/getNavMenuLinks',
		}),
	},
	methods: {
		...mapMutations({
			setCheckedHeaderLink: 'links/setCheckedHeaderLink',
		}),
		openMenu(link, value) {
			const path = openMenuPage(link, value);
			this.$router.push(path);
			this.setCheckedHeaderLink(value);
		}
	}
}
</script>
