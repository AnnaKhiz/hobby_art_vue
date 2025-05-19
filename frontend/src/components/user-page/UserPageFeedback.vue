<template>
  <div class="main__user-page-content-editable-content" >
    <p class="main__user-page-content-user-name data-page review">
      Мои отзывы
    </p>
    <div v-for="item in feedbackList" :key="item._id" class="main__user-page-content-review-container">
      <div class="main__user-page-content-review-block rating-block">
        <img src="@/assets/img/rating.png" alt="rating stars">
        <p class="main__user-page-content-review-data">
          {{ item.date }}
        </p>
      </div>
      <div class="main__user-page-content-review-block info-block">
        <div class="main__user-page-content-review-img">
          <img src="@/assets/img/image-card-item4.png" alt="image card">
        </div>
        <div class="main__user-page-content-review-info">
          <p>{{ item.name }}</p>
          <p>Комментарий: <span>{{ item.text }}</span></p>
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
	computed: {
		...mapGetters({
			feedbackList: 'feedback/feedbackList',
		})
	},
	methods: {
		...mapActions({
			getFeedbackByUserId: 'feedback/getFeedbackByUserId',
		})
	},
	async mounted() {
		await this.getFeedbackByUserId(this.user._id);
		console.log(this.feedbackList)
	}
}
</script>



<style scoped lang="sass">

</style>
