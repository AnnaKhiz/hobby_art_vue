<template>
  <div class="main__user-page-content-editable-content" >
    <p class="main__user-page-content-user-name data-page review">
      Мои отзывы
    </p>
    <div v-for="(item, index) in feedbacks" :key="item._id" class="main__user-page-content-review-container">
      <div class="main__user-page-content-review-block rating-block">
				<div>

					<svg v-for="star in 5" :key="star" class="star-icon" height="800px" width="800px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 47.94 47.94" xml:space="preserve" enable-background="1">
						<path fill="transparent" stroke="black" d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757
							c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042
							c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685
							c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528
							c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956
							C22.602,0.567,25.338,0.567,26.285,2.486z"/>
					</svg>
				</div>

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
import starIcon from "@/assets/icons/star.svg";

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
			starIcon
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
.star-icon
	width: 20px
	height: 20px
	margin-right: 5px
	&:hover
		& > path
			cursor: pointer
			fill: #ED8A19
</style>
