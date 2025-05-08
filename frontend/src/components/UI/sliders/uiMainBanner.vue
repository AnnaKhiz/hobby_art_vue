<template>
  <section class="main__banner">
    <div class="container">
      <swiper
        :modules="modules"
        :slides-per-view="1"
        :space-between="15"
        navigation
        loop
        autoplay
      >
        <swiper-slide v-for="item in 3" :key="item">
          <div class="main__banner-container">
            <div class="main__banner-item image">
              <img src="../../../assets/img/yarn-image.png" alt="yarn image">
            </div>
            <div class="main__banner-item text-block">
              <h2 class="main__banner-item-label">
                Пряжа Macrametr {{ item }}
              </h2>
              <p class="main__banner-item-text">
                Повседневная практика показывает, что укрепление и развитие внутренней структуры обеспечивает широкому кругу (специалистов) участие в формировании форм воздействия.
              </p>
              <button class="main__banner-item-button" @click="$router.push({name: 'HobbyArt', hash: '#catalog'})">
                В каталог
              </button>
            </div>
          </div>

        </swiper-slide>

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
export default {
  name: "uiMainBanner",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      modules: [Navigation, Autoplay],
    };
  },
}
</script>
