<template>
 <div class="main">
   <ui-main-banner />

   <section class="main__slider-popular">
     <div class="container">
        <ui-switcher-main
          @switcher-state="getSwitcherState"
        >

          <template #popular-swiper>
            <ui-popular-products :slider-items="itemsForSlider" />
          </template>

        </ui-switcher-main>

     </div>
   </section>

   <section class="main__catalog" id="catalog">
     <div class="container">
       <img src="@/assets/img/text-katalog.png" alt="image fon" class="main__catalog-fon-img">
       <h2 class="main__catalog-label">
         Каталог товаров
       </h2>
       <div class="main__catalog-container">
         <ui-catalog-item
          v-for="item in getSidebarMainItems"
          :key="item.value"
          :catalog-items-info="item"
         />
       </div>
     </div>
   </section>

   <section class="main__preferences" id="benefits">
     <div class="container">
       <h2 class="main__preferences-label">
         Хобби арт: 9 лет на рынке
       </h2>
       <div class="main__preferences-container">
        <ui-item-preference
          v-for="item in preferenceItemsInfo"
          :key="item.value"
          :preference-item="item"
        />
       </div>
     </div>
   </section>

   <section class="main__instagram">
     <div class="container">
       <h2 class="main__instagram-label">
         Наш instagram
       </h2>
       <div class="main__instagram-gallery-container">
         <div  class="big-image-1" >
           <div v-if="isActiveLikesButton" class="main__instagram-gallery-container-feedback">
             <div class="main__instagram-gallery-container-likes-btn">
               <svg id="likes-btn" width="37" height="35" viewBox="0 0 37 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path id="svg-path" fill-rule="evenodd" clip-rule="evenodd" d="M18.4379 3.02862C28.6665 -7.48585 54.2405 10.9133 18.4379 34.572C-17.3648 10.9156 8.20918 -7.48585 18.4379 3.02862Z"/>
               </svg>
               <span class="main__instagram-gallery-container-likes-digit" id="likes-digit"></span>
             </div>
             <div class="main__instagram-gallery-container-comments">
               <svg id="comments-popup" width="35" height="36" viewBox="0 0 35 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path fill-rule="evenodd" clip-rule="evenodd" d="M26.7011 30.8166L31.1111 35.2435V27.1294C33.5417 24.2796 35 20.6509 35 16.7002C35 7.53791 27.1639 0.108887 17.5 0.108887C7.83611 0.108887 0 7.53791 0 16.7002C0 25.8626 7.83611 33.2916 17.5 33.2916C20.7316 33.302 23.9076 32.4477 26.7011 30.8166Z" fill="white"/>
               </svg>
               <span class="main__instagram-gallery-container-comments-digit" id="comments-digit">0</span>
             </div>
             <img src="@/assets/img/insta-img-1.png" alt="image instagram" >
           </div>
         </div>

         <div v-for="image in 4" :key="image" :class="`small-image-${image}`">
           <img :src="require(`@/assets/img/insta-img-${image+1}.png`)" alt="image instagram" >
         </div>

         <div class="big-image-2">
           <img src="@/assets/img/insta-img-6.png" alt="image instagram" >
         </div>
       </div>

       <a href="#" class="main__instagram-button"><span>@</span>hobbyart_dv</a>
     </div>
   </section>

   <section class="main__feedback">
     <div class="container">
       <img src="@/assets/img/questions-image.png" alt="image fon">

       <ui-feedback-form
         name="Ваше имя"
         phone="Телефон"
         after-text="* нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности"
         >

         <template #text-before>
           <h3 class="main__feedback-label">
             Есть вопрос? Мы перезвоним!
           </h3>
         </template>

       </ui-feedback-form>

     </div>
   </section>
   <section id="contacts"></section>
 </div>

</template>

<script >

import {defineComponent} from "vue";
import UiMainBanner from "@/components/UI/sliders/uiMainBanner.vue";
import UiSwitcherMain from "@/components/UI/uiSwitcherMain.vue";
import UiPopularProducts from "@/components/UI/sliders/uiPopularProducts.vue";
import UiCatalogItem from "@/components/UI/uiCatalogItem.vue";
import UiItemPreference from "@/components/UI/uiItemPreference.vue";
import UiFeedbackForm from "@/components/UI/forms/uiFeedbackForm.vue";
import {mapGetters, mapMutations} from "vuex";

export default defineComponent({
  components: {UiFeedbackForm, UiItemPreference, UiCatalogItem, UiPopularProducts, UiSwitcherMain, UiMainBanner},
  data() {
    return {
      isActiveLikesButton: true,
      isTypeSliderNew: false,
      clickedLink: '',
      preferenceItemsInfo: [
        { text: 'Поставщики', value: 'suppliers', image: 'pref-delivery.png', description: 'Мы работаем только с надежными и проверенными поставщиками товаров для творчества' },
        { text: 'Товары', value: 'products', image: 'preferences-knit.png', description: 'Мы привозим актуальные и новые товары, инструменты для вашего творчества по низким ценам' },
        { text: 'Бонусы', value: 'bonuses', image: 'preferences-bonus.png', description: 'У нас действует накопительная бонусная система скидок. Дарим в день рождения 500 бонусных рублей' },
      ],
      sliderPopularItems: [
        { text: 'Пряжа Macrametr', value: 'macrametr', link: '', image: 'slider-img-1.png' },
        { text: 'Кольца бамбук', value: 'bumbac', link: '', image: 'slider-img-2.png' },
        { text: 'Трикотажная пряжа Zefirka', value: 'tricotat', link: '', image: 'slider-img-3.png' },
        { text: 'Шпагат крученый', value: 'shpagat', link: '', image: 'slider-img-4.png' },
        { text: 'Джут «Арахна»', value: 'dzhut', link: '', image: 'slider-img-5.png' },
        { text: 'Трикотажная пряжа Zefirka', value: 'tricotat', link: '', image: 'slider-img-3.png' },
      ],
      sliderNewProductItems: [
        { text: 'Джут «Арахна»', value: 'dzhut', link: '', image: 'slider-img-5.png' },
        { text: 'Трикотажная пряжа Zefirka', value: 'tricotat', link: '', image: 'slider-img-3.png' },
        { text: 'Пряжа Macrametr', value: 'macrametr', link: '', image: 'slider-img-1.png' },
        { text: 'Кольца бамбук', value: 'bumbac', link: '', image: 'slider-img-2.png' },
        { text: 'Шпагат крученый', value: 'shpagat', link: '', image: 'slider-img-4.png' },
        { text: 'Пряжа Macrametr', value: 'macrametr', link: '', image: 'slider-img-1.png' },
      ]

    }
  },
  computed: {
    ...mapGetters({
      getCheckedHeaderLink: 'links/getCheckedHeaderLink',
      getSidebarMainItems: 'links/getSidebarGeneralItems'
    }),

    itemsForSlider() {
      return !this.isTypeSliderNew ? this.sliderNewProductItems : this.sliderPopularItems
    }
  },
  methods: {
    ...mapMutations({
      setCheckedHeaderLink: 'links/setCheckedHeaderLink'
    }),

    getSwitcherState(value) {
      this.isTypeSliderNew = value

    },
  },
  watch: {
    getCheckedHeaderLink() {
      const element = document.getElementById(this.getCheckedHeaderLink);
      console.log(element)
      if (!element) {
        return
      }
      element.scrollIntoView({ behavior: 'smooth' });
    }
  },
  mounted() {
    console.log(this.getCheckedHeaderLink)
  }
})
</script>

<style scoped lang="sass">

</style>
