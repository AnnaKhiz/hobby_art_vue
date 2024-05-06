<template>
  <swiper
    :modules="modules"
    :slides-per-view="5"
    :space-between="25"
    @swiper="onSwiperPopular"
    @slideChange="onSlideChangePopular"
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
export default {
  name: "uiPopularProducts.vue",
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
    const onSwiperPopular = (swiper) => {
      console.log(`swiper popular - ${swiper}`);
    };
    const onSlideChangePopular = () => {
      // console.log('slide change');
    };
    return {
      onSwiperPopular,
      onSlideChangePopular,
      modules: [Navigation, Autoplay],
    };
  },

}
</script>

<style scoped lang="sass">

</style>