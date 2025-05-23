<template>
  <swiper
    :modules="modules"
    :slides-per-view="slidesPerPage"
    :space-between="25"
    navigation
    loop
    autoplay
  >
    <swiper-slide
        v-for="slide in sliderItems"
        :key="slide.value"
        class="main__slider-popular-item"
    >
      <a :href="`${slide.link}`">
        <img :src="require(`@/assets/img/${slide.image}`)" alt="image slider">
        <p class="main__slider-popular-item-text">
          {{ slide.text }}
        </p>
      </a>
    </swiper-slide>
  </swiper>

</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { computed } from "vue";

export default {
  name: "uiPopularProducts",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    sliderItems: {
      type: Array,
      default: () => []
    }
  },
  setup() {
		const slidesPerPage = computed(() => {
			switch(true) {
				case window.innerWidth <= '900' && window.innerWidth > '560':
					return 3;
				case window.innerWidth <= '560':
					return 2;
				default:
					return 5;
			}
		});

    return {
			slidesPerPage,
      modules: [Navigation, Autoplay],
    };
  },
}
</script>

