<template>
  <div class="main__user-page-content-editable-content" >
    <p class="main__user-page-content-user-name data-page review">
      Мои отзывы
    </p>
    <div v-for="(item, index) in feedbacks" :key="item._id" class="main__user-page-content-review-container">
      <div class="main__user-page-content-review-block rating-block">
        <img src="@/assets/img/rating.png" alt="rating stars">
        <p class="main__user-page-content-review-data">
          {{ item.date }}
        </p>
      </div>
      <div class="main__user-page-content-review-block info-block">
        <div class="main__user-page-content-review-info">
          <p>{{ item.name }}</p>
          <p>Комментарий: <span>{{ item.text }}</span></p>
        </div>
				<div class="action-style mr-0">
					<button @click.prevent="removeFeedback(item._id, index)">Удалить отзыв</button>
				</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
	mapActions,
	mapGetters
} from "vuex";

export default {
  name: "userPageFeedback",
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
			deleteFeedbackById: 'feedback/deleteFeedbackById'
		}),
		async removeFeedback(id, index) {
			const result = await this.deleteFeedbackById(id);
			if (!result) return;
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



<style scoped lang="sass">

</style>
