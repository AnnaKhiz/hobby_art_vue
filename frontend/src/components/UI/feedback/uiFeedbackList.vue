<template>
	<div class="feedback__container">
		<p class="popup-text align-self-center">Отзывы</p>
		<ui-feedback-item
			v-for="item in feedbackList"
			:key="item._id"
			:item="item"
			class="feedback__item"
		/>
	</div>
</template>

<script>
import UiFeedbackItem from "@/components/UI/feedback/uiFeedbackItem.vue";
import { mapActions, mapGetters } from "vuex";

export default {
	name: "uiFeedbackList.vue",
	components: { UiFeedbackItem },
	computed: {
		...mapGetters({
			feedbackList: 'feedback/feedbackList',
		})
	},
	methods: {
		...mapActions({
			getFeedbackList: 'feedback/getFeedbackList',
		}),
	},
	async mounted() {
		await this.getFeedbackList();
	}
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

