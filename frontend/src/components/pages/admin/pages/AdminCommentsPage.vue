<template>
	<div v-if="feedbackList.length" class="d-flex justify-start align-start flex-wrap ga-6 w-100">
		<div v-for="item in feedbackList" :key=item._id class="items-container__item">
			<ui-feedback-item :item="item" admin >
				<template #actions>
					<button @click.stop="removeFeedback" class="remove">Удалить</button>
					<button @click.stop="editFeedback" class="remove">Изменить</button>
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
			getFeedbackList: 'feedback/getFeedbackList',
		}),
		removeFeedback() {

		},
		editFeedback() {

		}
	},
	async mounted() {
		await this.getFeedbackList();
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
.remove
	transition: all 0.3s ease-in-out 0s
	background: linear-gradient(102.48deg, #976464 -29.03%, #CFA5A5 97.75%)
	padding: 5px 8px
	border-radius: 4px
	color: white
	margin-right: 20px
	&:hover
		box-shadow: 2px 2px 10px #837f7f
</style>
