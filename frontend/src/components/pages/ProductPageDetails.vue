<template>
  <main class="main bg-white">
    <div class="main__product-details" id="product-details">
      <div class="container">
        <ui-breadcrumbs :link="getCheckedHeaderLink" product details />
        <section class="main__product-details-about">
          <div class="main__product-details-about-flex">
            <div class="main__product-details-about-item left-item">
              <div class="main__product-details-about-item-image big">
                <img :src="require(`@/assets/${productItem.photo ? productItem.photo : 'img/image-full-info-1.png'}`)" alt="image">
              </div>
              <div class="main__product-details-about-item-image">


                <ui-colors-icon :item="productItem" size="50" position="center" @check="addCheckedColor($event)" details/>
                <p v-if="order.checkedColor.length" style="min-height: 30px; font-size: 0.8rem; font-family: 'Montserrat'; overflow: hidden; padding: 10px 0">
                  <span>
                    <span style="font-weight: 600; line-height: 1.2rem">Выбранные цвета:</span> {{ parseCheckedColors || '' }}
                  </span>
                </p>
              </div>
            </div>
            <div class="main__product-details-about-item right-item">

              <div class="main__product-details-about-item-text">
                <p class="main__product-details-about-item-text-header">
                  {{ productItem.name }}
                </p>
                <p class="main__product-details-about-item-text-desc">
                  {{ productItem.description }}
                </p>
              </div>

              <div class="main__product-details-about-item-options">
                <p class="main__product-details-about-item-options-header">
                  Xарактеристики
                </p>
                <div class="main__product-details-about-item-options-flex">
                  <div class="main__product-details-about-item-options-flex-item">
                    <ul class="main__product-details-about-item-options-flex-list column-left">
                      <li>Длина</li>
                      <li>Производитель</li>
                      <li>Состав</li>
                      <li>Толщина</li>
                    </ul>
                  </div>
                  <div class="main__product-details-about-item-options-flex-item">
                    <ul class="main__product-details-about-item-options-flex-list column-right">
                      <li>{{ productItem.length }}</li>
                      <li>{{ productItem.brand ? productItem.brand.text : '' }}</li>
                      <li>{{ productItem.composition ? productItem.composition.text : '' }}</li>
                      <li>{{ productItem.width }}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="main__product-details-about-item-basket" id="about-details">
                <div class="main__product-details-about-item-basket-flex">
                  <span data-name="count" class="bl-hidden"></span>
                  <p class="main__product-details-about-item-basket-flex-price" data-price="basket-item-price">
                    {{ countFinalPrice() }} грн
                  </p>
                  <ui-quantity-counter @input="order.quantity = $event"/>
                  <a @click.prevent="order.checkedColor.length ? addToBasket() : showNotifyError = true" class="main__product-details-about-item-basket-flex-btn" id="add-to-basket-btn" style="cursor: pointer">
                    Добавить в корзину
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="main__product-details-feedback">
          <h2 class="main__product-details-feedback-label">
            Отзывы
          </h2>
          <div class="main__product-details-feedback-rel">
            <div class="container swiper swiper3 mySwiper-3 ">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <div class="main__product-details-feedback-container">
                    <div class="main__product-details-feedback-flex">
                      <div class="main__product-details-feedback-flex-item image">
                        <img src="@/assets/img/feed-photo.png" alt="feedback foto">
                      </div>
                      <div class="main__product-details-feedback-flex-item user">
                        <p class="main__product-details-feedback-flex-user">
                          Евгения Доценко
                        </p>
                        <img src="@/assets/img/rating.png" alt="stars">
                      </div>
                      <div class="main__product-details-feedback-flex-item data">
                        13.06.2021 12:30
                      </div>
                    </div>
                    <p class="main__product-details-feedback-comment">
                      <span>Комментарий:</span> Хороший шпагат
                    </p>
                  </div>

                </div>
                <div class="swiper-slide">

                  <div class="main__product-details-feedback-container">
                    <div class="main__product-details-feedback-flex">
                      <div class="main__product-details-feedback-flex-item image">
                        <img src="@/assets/img/feed-photo.png" alt="feedback foto">
                      </div>
                      <div class="main__product-details-feedback-flex-item user">
                        <p class="main__product-details-feedback-flex-user">
                          Евгения Доценко
                        </p>
                        <img src="@/assets/img/rating.png" alt="stars">
                      </div>
                      <div class="main__product-details-feedback-flex-item data">
                        13.06.2021 12:30
                      </div>
                    </div>
                    <p class="main__product-details-feedback-comment">
                      <span>Комментарий:</span> Хороший шпагат
                    </p>
                  </div>

                </div>
                <div class="swiper-slide">

                  <div class="main__product-details-feedback-container">
                    <div class="main__product-details-feedback-flex">
                      <div class="main__product-details-feedback-flex-item image">
                        <img src="@/assets/img/feed-photo.png" alt="feedback foto">
                      </div>
                      <div class="main__product-details-feedback-flex-item user">
                        <p class="main__product-details-feedback-flex-user">
                          Евгения Доценко
                        </p>
                        <img src="@/assets/img/rating.png" alt="stars">
                      </div>
                      <div class="main__product-details-feedback-flex-item data">
                        13.06.2021 12:30
                      </div>
                    </div>
                    <p class="main__product-details-feedback-comment">
                      <span>Комментарий:</span> Хороший шпагат
                    </p>
                  </div>

                </div>

              </div>

            </div>
            <div class="swiper-button-next-3"></div>
            <div class="swiper-button-prev-3"></div>
          </div>

        </section>
        <section class="main__product-details-recommend">
          <h2 class="main__product-details-recommend-label">
            Смотрите также
          </h2>
          <div class="main__product-details-recommend-flex">
            <div class="main__product-details-recommend-flex-item">
              <ui-product-item-header />
              <a href="#" class="main__product-details-recommend-flex-img">
                <img src="@/assets/img/image-card-item4.png" alt="image card">
              </a>
              <a href="" class="main__product-details-recommend-flex-label">
                Пряжа Arachna "Macrame MINI"
              </a>
              <a href="">
                <svg xmlns="http://www.w3.org/2000/svg" width="97" height="20" viewBox="0 0 97 20" fill="none">
                  <path d="M86.08 10.88H83.104V13.792H82.096V10.88H79.12V9.936H82.096V7.008H83.104V9.936H86.08V10.88ZM95.4956 14.976V16H87.6396V15.184L92.2956 10.624C92.8823 10.048 93.277 9.552 93.4796 9.136C93.693 8.70933 93.7996 8.28267 93.7996 7.856C93.7996 7.19467 93.5703 6.68267 93.1116 6.32C92.6636 5.94667 92.0183 5.76 91.1756 5.76C89.8636 5.76 88.845 6.176 88.1196 7.008L87.3036 6.304C87.741 5.792 88.2956 5.39733 88.9676 5.12C89.6503 4.84267 90.4183 4.704 91.2716 4.704C92.413 4.704 93.3143 4.976 93.9756 5.52C94.6476 6.05333 94.9836 6.78933 94.9836 7.728C94.9836 8.304 94.8556 8.85867 94.5996 9.392C94.3436 9.92533 93.8583 10.5387 93.1436 11.232L89.3356 14.976H95.4956Z" fill="#424242"/>
                  <circle cx="8.5" cy="9.5" r="8.5" fill="#FAF9F6"/>
                  <circle cx="27.5" cy="9.5" r="8.5" fill="#EBD5BC"/>
                  <circle cx="46.5" cy="9.5" r="8.5" fill="#0395AF"/>
                  <circle cx="65.5" cy="9.5" r="8.5" fill="#F09482"/>
                </svg>
              </a>

              <p class="main__product-details-recommend-flex-price">
                1053 грн
              </p>
              <a href="" class="main__product-details-recommend-flex-btn">
                В корзину
              </a>
            </div>
            <div class="main__product-details-recommend-flex-item">
              <ui-product-item-header />
              <a href="#" class="main__product-details-recommend-flex-img">
                <img src="@/assets/img/image-card-item5.png" alt="image card">
              </a>
              <a href="" class="main__product-details-recommend-flex-label">
                Шнур "Gamma" 0.8 мм, 50 м
              </a>
              <a href="">
                <svg xmlns="http://www.w3.org/2000/svg" width="98" height="20" viewBox="0 0 98 20" fill="none">
                  <path d="M86.08 10.88H83.104V13.792H82.096V10.88H79.12V9.936H82.096V7.008H83.104V9.936H86.08V10.88ZM97.6801 13.056H95.4401V16H94.2881V13.056H87.9681V12.224L93.9041 4.8H95.1841L89.4561 12.032H94.3201V9.44H95.4401V12.032H97.6801V13.056Z" fill="#424242"/>
                  <circle cx="8.5" cy="9.5" r="8.5" fill="#E5D8CB"/>
                  <circle cx="27.5" cy="9.5" r="8.5" fill="#C51212"/>
                  <circle cx="46.5" cy="9.5" r="8.5" fill="#FC9257"/>
                  <circle cx="65.5" cy="9.5" r="8.5" fill="#1C1C1C"/>
                </svg>
              </a>

              <p class="main__product-details-recommend-flex-price">
                852 грн
              </p>
              <a href="" class="main__product-details-recommend-flex-btn">
                В корзину
              </a>
            </div>
          </div>

        </section>
      </div>
    </div>
    <!--   dialogs -->
    <Transition name="fade">
      <ui-notify-dialog v-if="display" />
    </Transition>

    <Transition name="fade">
      <ui-notify-dialog v-if="showNotifyError && !order.checkedColor.length" text="Выберите цвет!" background="#ff0000" textColor="white"/>
    </Transition>

  </main>
</template>
<script>

import UiBreadcrumbs from "@/components/UI/uiBreadcrumbs.vue";
import {mapGetters, mapMutations} from "vuex";
import UiProductItemHeader from "@/components/UI/uiProductItemHeader.vue"
import UiNotifyDialog from "@/components/UI/modal/uiNotifyDialog.vue";
import UiQuantityCounter from "@/components/UI/uiQuantityCounter.vue";
import UiColorsIcon from "@/components/UI/icons/uiColorsIcon.vue";

export default {
  name: "ProductPageDetails",
  components: {UiColorsIcon, UiNotifyDialog, UiProductItemHeader, UiBreadcrumbs, UiQuantityCounter},

  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showNotifyError: false,
      display: false,
      productItem: {},
      order: {
        checkedColor: [],
        quantity: 1,
        price: 0,
        item: {}
      }
    }
  },
  computed: {
    ...mapGetters({
      getCheckedHeaderLink: 'links/getCheckedHeaderLink',
    }),
    parseCheckedColors() {

      if (!this.order.checkedColor.length) {
        return ''
      }
      const colorObjects = this.order.item.color.filter(el => this.order.checkedColor.includes(el.value));

      if (!colorObjects) return;

      return colorObjects.map(el => (el.text)).join(', ')
    },

  },
  methods: {
    ...mapMutations('order', ['addToOrder']),
    addCheckedColor(value) {
      if (this.order.checkedColor.includes(value)) {
        const index = this.order.checkedColor.findIndex(el => el === value)

        if (index === -1) return false;

        this.order.checkedColor.splice(index, 1)
      } else {
        this.order.checkedColor.push(value)
      }
    },

    addToBasket() {
      this.order.checkedColor.forEach(el => {
        const orderItem = { ...this.order, checkedColor: el }
        this.addToOrder(orderItem);
      })

      this.display = true;
      this.showNotifyError = false;

      this.order = {
        checkedColor: [],
        quantity: 1,
        price: 0,
        item: {...this.productItem}
      }
    },
    countFinalPrice() {
      return this.order.price = this.productItem.price * this.order.quantity
    },

    async getProductList() {
      try {
        const result = await fetch(`http://localhost:3000/api/items/${this.id}`, {
          method: 'GET',
          credentials: 'include'
        })
        const data = await result.json();
        this.productItem = await data.item;

      } catch (e) {
        console.log(e)
      }
    }
  },
  async mounted() {
    await this.getProductList()
    this.order.price = this.productItem.price
    this.order.item = {...this.productItem}

    if (!this.$route.query.colors) {
      return this.order.checkedcolors = ''
    }

    const checkedColorsFromQuery = this.$route.query.colors.split(',');
    checkedColorsFromQuery.forEach(color =>  this.order.checkedColor.push(color));
  },
  beforeUnmount() {
    this.order = {}
  },
  watch: {
    display(val) {
      if (val) {
        setTimeout(() => {
          this.display = false
        }, 2000)
      }
    }
  }
}
</script>



<style scoped lang="sass">
.fade-enter-active,
.fade-leave-active
  transition: opacity 0.8s ease

.fade-enter-from,
.fade-leave-to
  opacity: 0
</style>
