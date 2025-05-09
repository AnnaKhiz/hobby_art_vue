<template>
  <div class="main__product-page-content-item-header dropdown-action">
		<svg @click="handleLike" class="red-color" width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M8 14.434C7.88951 14.4336 7.78224 14.3967 7.69495 14.3289C4.9145 12.1686 2.9992 10.3083 1.65898 8.47301C-0.0512953 6.12763 -0.441358 3.96228 0.498793 2.03698C1.1689 0.661755 3.09421 -0.463425 5.34457 0.19168C6.41752 0.501599 7.35364 1.16623 8 2.07698C8.64636 1.16623 9.58248 0.501599 10.6554 0.19168C12.9008 -0.453424 14.8311 0.661755 15.5012 2.03698C16.4414 3.96228 16.0513 6.12763 14.341 8.47301C13.0008 10.3083 11.0855 12.1686 8.30505 14.3289C8.21776 14.3967 8.11049 14.4336 8 14.434Z"
				fill="url(#paint0_linear)"
			/>
			<g transform="translate(1,1) scale(0.88)">
				<path
					d="M8 14.434C7.88951 14.4336 7.78224 14.3967 7.69495 14.3289C4.9145 12.1686 2.9992 10.3083 1.65898 8.47301C-0.0512953 6.12763 -0.441358 3.96228 0.498793 2.03698C1.1689 0.661755 3.09421 -0.463425 5.34457 0.19168C6.41752 0.501599 7.35364 1.16623 8 2.07698C8.64636 1.16623 9.58248 0.501599 10.6554 0.19168C12.9008 -0.453424 14.8311 0.661755 15.5012 2.03698C16.4414 3.96228 16.0513 6.12763 14.341 8.47301C13.0008 10.3083 11.0855 12.1686 8.30505 14.3289C8.21776 14.3967 8.11049 14.4336 8 14.434Z"
					:fill="isLiked ? 'red' : '#FEEAEA'"
				/>
			</g>

			<defs>
				<linearGradient id="paint0_linear" x1="-3.45946" y1="-9.02123" x2="19.9092" y2="-3.28645" gradientUnits="userSpaceOnUse">
					<stop stop-color="#976464"/>
					<stop offset="1" stop-color="#CFA5A5"/>
				</linearGradient>
			</defs>
		</svg>

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

export default {
  name: "uiProductItemHeader.vue",
	components: { UiDropdownComponent, UiNotifyDialog },
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
				this.isDropdownShow = false
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
