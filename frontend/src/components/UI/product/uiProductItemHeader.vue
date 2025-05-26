<template>
  <div class="main__product-page-content-item-header dropdown-action">
		<ui-like-icon @click="handleLike" :isLiked="isLiked"/>
		<img :src="menuIcon" @click="toggleDropdown" alt="menu dots icon" ref="menu">

		<!--	Notify dialog	-->
		<Transition name="fade">
			<ui-notify-dialog v-if="display" text="Нужно авторизоваться!" background="#ff0000" textColor="white" weight="600" />
		</Transition>

		<!--	Dropdown component	-->
		<Transition name="fade">
			<ui-dropdown-component
				v-if="isDropdownShow"
				:is-liked="isLiked"
				@basket="$emit('updateBasket', $event)"
				@details="$emit('openDetails', $event)"
				@favorites="handleLike"
				@close="handleIsDropdownShow"
			/>
		</Transition>

  </div>
</template>

<script>
import UiNotifyDialog from "@/components/UI/modal/uiNotifyDialog.vue";
import { mapActions, mapGetters } from "vuex";
import UiDropdownComponent from "@/components/UI/dropdown/uiDropdownComponent.vue";
import menuIcon from "@/assets/icons/menu-dots.svg";
import UiLikeIcon from "@/components/UI/icons/uiLikeIcon.vue";

export default {
  name: "uiProductItemHeader.vue",
	components: {UiLikeIcon, UiDropdownComponent, UiNotifyDialog },
	props: {
		isItemLiked: {
			type: Boolean,
			default: false,
		}
	},
	data() {
		return {
			display: false,
			isLiked: false,
			isDropdownShow: false,
			menuIcon
		}
	},
	emits: ['updateIsLiked', 'openDetails', 'updateBasket'],
	computed: {
		...mapGetters({
			isAuthorized: 'user/isAuthorized',
		}),
	},
	methods: {
		...mapActions('user', ['userAddFavorite']),
		async handleLike() {
			if (!this.isAuthorized) {
				this.display = true;
				setTimeout(() => {
					this.display = false;
				}, 1500);
				return;
			}
			this.isLiked = !this.isLiked;
			this.$emit('updateIsLiked', this.isLiked);
		},
		handleOutsideClick(event) {
			if (this.$refs.menu && !this.$refs.menu.contains(event.target)) {
				this.isDropdownShow = false;
			}
		},
		toggleDropdown() {
			this.isDropdownShow = !this.isDropdownShow;
		},
		handleIsDropdownShow(value) {
			this.isDropdownShow = value;
		}
	},
	watch: {
		isItemLiked(newVal) {
			this.isLiked = newVal;
		}
	},
	mounted() {
		this.isLiked = this.isItemLiked;
		document.addEventListener('click', this.handleOutsideClick);
	},
	beforeUnmount() {
		document.addEventListener('click', this.handleOutsideClick);
	}
}
</script>

<style scoped lang="sass">
.dropdown-action
	position: relative
	& > img
		cursor: pointer
</style>
