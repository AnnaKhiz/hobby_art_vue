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
        v-for="slide in sliderPopularItems"
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
  data() {
    return {
      sliderPopularItems: [
        { text: 'Пряжа Macrametr', value: 'macrametr', link: '', image: 'slider-img-1.png' },
        { text: 'Кольца бамбук', value: 'bumbac', link: '', image: 'slider-img-2.png' },
        { text: 'Трикотажная пряжа Zefirka', value: 'tricotat', link: '', image: 'slider-img-3.png' },
        { text: 'Шпагат крученый', value: 'shpagat', link: '', image: 'slider-img-4.png' },
        { text: 'Джут «Арахна»', value: 'dzhut', link: '', image: 'slider-img-5.png' },
        { text: 'Трикотажная пряжа Zefirka', value: 'tricotat', link: '', image: 'slider-img-3.png' },
      ]
    }
  }
}
</script>

<style scoped lang="sass">

</style>