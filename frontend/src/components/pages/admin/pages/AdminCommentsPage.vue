<template>
	<div v-if="feedbackList.length" class="d-flex justify-start align-start flex-wrap ga-6 w-100">
		<div v-for="item in feedbackList" :key=item._id class="items-container__item">
			<ui-feedback-item :item="item" admin >
				<template #actions>
					<button @click.stop="removeFeedback" class="action-style">Удалить</button>
					<button @click.stop="editFeedback" class="action-style">Изменить</button>
				</template>
			</ui-feedback-item>
		</div>
	</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import UiFeedbackItem from "@/components/UI/feedback/uiFeedbackItem.vue";

export default {
  name: "AdminCommentsPage.vue",
	components: {UiFeedbackItem},
	computed: {
		...mapGetters({
			feedbackList: 'feedback/feedbackList',
		})
	},
	methods: {
		...mapActions({
			getFeedbackListAdmin: 'feedback/getFeedbackList',
		}),
		removeFeedback() {

		},
		editFeedback() {

		}
	},
	async mounted() {
		await this.getFeedbackListAdmin();
	}
}
</script>



<style scoped lang="sass">
.items-container
	&__item
		display: flex
		flex-direction: column
		background: #E8E8E8
		border-radius: 12px
		width: 100%
		padding: 15px
		height: fit-content
		& > .actions
			display: flex
			align-items: center
			justify-content: start
			gap: 20px
			margin-top: 15px

</style>
