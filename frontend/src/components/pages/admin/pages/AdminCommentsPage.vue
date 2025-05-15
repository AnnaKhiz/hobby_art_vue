<template>
	<div v-if="feedbacks.length" class="w-100">
		<div
			v-for="(item,index) in feedbacks"
			:key=item._id
			class="items-container__item mb-4"
		>
			<ui-feedback-item
				:item="item"
				admin
				:edit="item.edit"
				@update-text="handleFeedbackUpdate"
			>
				<template #actions>
					<button
						@click.stop="removeFeedback(item._id)"
						class="action-style"
					>
						Удалить
					</button>
					<button
						@click.stop="editFeedback(item, index)"
						class="action-style"
					>
						{{ item.edit ? 'Сохранить' : 'Изменить' }}
					</button>
				</template>
			</ui-feedback-item>
		</div>
	</div>
	<div v-else>Список отзывов пуст</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import UiFeedbackItem from "@/components/UI/feedback/uiFeedbackItem.vue";

export default {
  name: "AdminCommentsPage.vue",
	components: {UiFeedbackItem},
	data() {
		return {
			feedbackText: '',
			feedbacks: []
		}
	},
	computed: {
		...mapGetters({
			feedbackList: 'feedback/feedbackList',
		}),
	},
	methods: {
		...mapActions({
			getFeedbackListAdmin: 'feedback/getFeedbackList',
			removeFeedbackAdmin: 'feedback/removeFeedbackAdmin',
			updateFeedbackAdmin: 'feedback/updateFeedbackAdmin',
		}),
		async removeFeedback(id) {
			const result = await this.removeFeedbackAdmin(id);
			if (!result) return;
			this.$store.commit('feedback/setFeedbackList', this.feedbackList.filter(e => e._id !== id));
		},

		async editFeedback(item, index) {
			item.edit = !item.edit;

			const result = await this.updateFeedbackAdmin({
				id: item._id,
				body: { text: this.feedbackText }
			});

			this.feedbacks[index].text = result.data.text;
			this.$store.commit('feedback/setFeedbackList', this.feedbacks);
		},
		handleFeedbackUpdate(value) {
			this.feedbackText = value;
		}
	},
	async mounted() {
		await this.getFeedbackListAdmin();
		this.feedbacks = this.feedbackList.map(e => ({ ...e, edit: false}));
	}
}
</script>



<style scoped lang="sass">
.items-container
	&__item
		display: flex
		flex-direction: column
		justify-content: start
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
