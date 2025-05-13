<template>
	<div >
		<loader-component v-if="loading" />
		<div v-else class="feedback__container">
			<p class="popup-text align-self-center">Отзывы</p>
			<ui-feedback-item
				v-for="item in itemsPerPageList"
				:key="item._id"
				:item="item"
				class="feedback__item"
			/>
			<ui-pagination
				:pages="pages"
				:items-per-page="itemsPerPage"
				@update-last-index="handleLastIndex"
				@update-start-index="handleStartIndex"
			/>
		</div>
	</div>
</template>

<script>
import UiFeedbackItem from "@/components/UI/feedback/uiFeedbackItem.vue";
import { mapActions, mapGetters } from "vuex";
import LoaderComponent from "@/components/UI/loader/LoaderComponent.vue";
import UiPagination from "@/components/UI/uiPagination.vue";

export default {
	name: "uiFeedbackList.vue",
	components: {UiPagination, LoaderComponent, UiFeedbackItem },
	data() {
		return {
			itemsPerPage: 6,
			pages: 1,
			currentPage: 1,
			startIndex: 0,
			lastIndex: 6
		}
	},
	computed: {
		...mapGetters({
			feedbackList: 'feedback/feedbackList',
			isLoading: 'feedback/isLoading',
		}),
		loading() {
			return this.isLoading;
		},
		itemsPerPageList() {
			return this.feedbackList.filter((el, index) => index < this.lastIndex && index >= this.startIndex);
		}
	},
	methods: {
		...mapActions({
			getFeedbackList: 'feedback/getFeedbackList',
		}),
		handleLastIndex(index) {
			this.lastIndex = index;
		},
		handleStartIndex(index) {
			this.startIndex = index;
		}

	},
	async mounted() {
		await this.getFeedbackList();
		this.pages = Math.ceil(this.feedbackList.length / this.itemsPerPage);
	},
}
</script>

<style scoped lang="sass">
.feedback
	&__container
		display: flex
		flex-direction: column
		justify-content: stretch
		align-items: start
		gap: 20px
		flex-wrap: wrap
		padding: 20px 0
	&__item
		width: 100%
		display: flex
		flex-direction: column
		justify-content: stretch
		align-items: start
		gap: 20px
		padding: 10px
		box-shadow: 1px 1px 4px rgba(66, 66, 66, 0.4)
</style>

