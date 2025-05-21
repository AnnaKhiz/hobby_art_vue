<template>
  <div class="main__user-page-content-editable-content" >
    <p class="main__user-page-content-user-name data-page review">
      Мои отзывы
    </p>
    <div
			v-for="(item, index) in feedbacks"
			:key="item._id"
			class="main__user-page-content-review-container"
		>
      <ui-feedback-item-user-page
				:item="item"
				:index="index"
				@remove="removeFeedback"
			/>
    </div>
  </div>
</template>

<script>
import {
	mapActions,
	mapGetters
} from "vuex";
import UiFeedbackItemUserPage from "@/components/UI/feedback/uiFeedbackItemUserPage.vue";

export default {
  name: "userPageFeedback",
	components: { UiFeedbackItemUserPage },
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  },
	data() {
		return {
			feedbacks: [],
		}
	},
	computed: {
		...mapGetters({
			feedbackList: 'feedback/feedbackList',
		})
	},
	methods: {
		...mapActions({
			getFeedbackByUserId: 'feedback/getFeedbackByUserId',
		}),
		removeFeedback(index) {
			this.feedbacks.splice(index, 1);
			this.$store.commit('feedback/setFeedbackList', this.feedbacks);
		}
	},
	async mounted() {
		await this.getFeedbackByUserId(this.user._id);
		this.feedbacks = this.feedbackList;
	}
}
</script>

