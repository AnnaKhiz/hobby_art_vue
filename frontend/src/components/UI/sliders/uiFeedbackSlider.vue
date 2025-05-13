<template>
	<section class="main__banner feedback">
		<div class="container">
			<swiper
				:modules="modules"
				:slides-per-view="2"
				:space-between="15"
				navigation
				loop
			>
				<swiper-slide v-for="item in feedbackList" :key="item" >
					<div class="main__product-details-feedback-rel">
						<div class="container swiper swiper4 mySwiper-4">
							<div class="swiper-wrapper align-center" >
								<div class="swiper-slide">
									<div class="main__product-details-feedback-container">
										<div class="main__product-details-feedback-flex">
											<div class="main__product-details-feedback-flex-item user-about">
												<div class="main__product-details-feedback-flex-item image">
													<img src="@/assets/img/feed-photo.png" alt="feedback foto">
												</div>
												<div class="main__product-details-feedback-flex-item user">
													<p class="main__product-details-feedback-flex-user">
														{{ item.name }}
													</p>
													<img src="@/assets/img/rating.png" alt="stars">
												</div>
											</div>

											<div class="main__product-details-feedback-flex-item data">
												{{ item.date }}
											</div>
										</div>
										<p class="main__product-details-feedback-comment">
											<span>Комментарий:</span> {{ item.text }}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</swiper-slide>
				<div class="swiper-button-next-3"></div>
				<div class="swiper-button-prev-3"></div>
			</swiper>
		</div>
	</section>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import {mapActions, mapGetters} from "vuex";
export default {
	name: "uiFeedbackSlider.vue",
	components: {
		Swiper,
		SwiperSlide,
	},
	data() {
		return {
			modules: [Navigation, Autoplay],
		};
	},
	computed: {
		...mapGetters({
			feedbackList: 'feedback/feedbackList'
		})
	},
	methods: {
		...mapActions({
			getFeedbackList: 'feedback/getFeedbackList',
		}),

	},
	async mounted() {
		await this.getFeedbackList();
		console.log(this.feedbackList)
	}
}
</script>



<style scoped lang="sass">
</style>
