<template>
	<div class="burger show" ref="userMenuBurger" >
		<div class="burger__container user-menu">
			<ul class="burger__list-menu user-menu-list">
				<li
					v-for="link in burgerUserPageList"
					:key="link.value"
				>
					<span @click.prevent="changeLink(link.value)">{{ link.text }} </span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";

export default {
	name: "uiBurgerUserPage.vue",
	props: {
		userData: {
			type: Object,
			default: () => {}
		},
		isShow: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			skipNextClick: false,
		}
	},
	emits: ['updateIsShow'],
	computed: {
		...mapGetters({
			getDisplayDialogState: 'dialog/getDisplayDialogState',
			userSidebarItems: 'userSidebar/userSidebarItems',
		}),
		burgerUserPageList() {
			return [...this.userSidebarItems].concat({
				text: 'Выйти',
				value: 'logout',
				url: ''
			})
		}
	},
	methods: {
		...mapMutations({
			setDisplayDialogState: 'dialog/setDisplayDialogState',
		}),
		...mapMutations({
			setCheckedHeaderLink: 'links/setCheckedHeaderLink',
		}),

		changeLink(link) {
			this.$router.push({
				name: 'User',
				params: {
					id: this.userData._id,
				},
				query: {
					link,
					noScroll: 'true'
				}
			});
			this.setDisplayDialogState(false);
			this.$emit('updateIsShow', false);
		},
		handleClickOutside(event) {
			if (this.skipNextClick) {
				this.skipNextClick = false;
				return;
			}

			const element = this.$refs.userMenuBurger;

			if (element && !element.contains(event.target)) {
				this.setDisplayDialogState(false);
				this.$emit('updateIsShow', false);
				document.removeEventListener('click', this.handleClickOutside);
			}

		}
	},
	watch: {
		isShow: {
			handler(val) {
				if (val) {
					this.skipNextClick = true;
					document.addEventListener('click', this.handleClickOutside);
				}
			},
			immediate: true
		}
	},
	beforeUnmount() {
		document.addEventListener('click', this.handleClickOutside);
	}
}
</script>
<style scoped lang="sass">
.user-menu
	top: 0
	width: 40%
	background: #BDBDBD
	&.show .burger__container
		transform: translateX(0)
	@media screen and (max-width: 570px)
		width: 60%
	@media screen and (max-width: 450px)
		width: 70%
.user-menu-list > li
	border-radius: 12px
	background: linear-gradient(59.75deg, #C5C5A8 -2.61%, #E2E1CF 76.3%, #E2E1CF 76.3%)
	&:hover, &:active
		background: white
	& > span
		color: #525252

</style>
