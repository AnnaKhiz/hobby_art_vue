<template>
  <main class="main bg-white">
    <div class="main__product-details" id="product-details">
      <div class="container">
        <ui-breadcrumbs :link="getCheckedHeaderLink" product details />
        <section class="main__product-details-about">
          <div class="main__product-details-about-flex">
            <div class="main__product-details-about-item left-item">
              <div class="main__product-details-about-item-image big">
                <img :src="`/uploads/${productItem.photo ? productItem.photo : 'no_image.png'}`" alt="image">
              </div>
              <div class="main__product-details-about-item-image">
                <ui-colors-icon :item="productItem" size="50" position="center" @check="addCheckedColor($event)" details/>
                <p
									v-if="order.checkedColor.length"
									style="min-height: 30px; font-size: 0.8rem; font-family: 'Montserrat'; overflow: hidden; padding: 10px 0">
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
					<ui-feedback-slider />
        </section>
        <section class="main__product-details-recommend">
          <h2 class="main__product-details-recommend-label">
            Смотрите также
          </h2>
          <ui-recommended-list :is-update="isUpdate" @update="isUpdate = $event" />

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
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import UiNotifyDialog from "@/components/UI/modal/uiNotifyDialog.vue";
import UiQuantityCounter from "@/components/UI/uiQuantityCounter.vue";
import UiColorsIcon from "@/components/UI/icons/uiColorsIcon.vue";
import UiFeedbackSlider from "@/components/UI/sliders/uiFeedbackSlider.vue";
import UiRecommendedList from "@/components/UI/uiRecommendedList.vue";

export default {
  name: "ProductPageDetails",
  components: {
		UiRecommendedList,
		UiFeedbackSlider, UiColorsIcon, UiNotifyDialog, UiBreadcrumbs, UiQuantityCounter},

  props: {
    id: {
      type: String,
      default: ''
    },
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
      },
			isUpdate: false
    }
  },
  computed: {
    ...mapGetters({
      getCheckedHeaderLink: 'links/getCheckedHeaderLink',
    }),
		...mapState('items', ['item']),
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
		...mapActions('items', ['fetchItemById']),
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
		async initPage() {
			await this.fetchItemById(this.id);
			this.productItem = this.item;
		},
		updateOrderDetails() {
			this.order.price = this.productItem.price;
			this.order.item = { ...this.productItem };

			if (!this.$route.query.colors) {
				return this.order.checkedcolors = '';
			}

			const checkedColorsFromQuery = this.$route.query.colors;
			checkedColorsFromQuery.forEach(color =>  this.order.checkedColor.push(color));
		}
  },

  async mounted() {
		await this.initPage();
		this.updateOrderDetails();

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
    },
		'$route.params': {
			async handler (newVal) {
				console.log(newVal);
				await this.initPage();
				this.updateOrderDetails();
				this.isUpdate = true;
			},
			deep: true
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
