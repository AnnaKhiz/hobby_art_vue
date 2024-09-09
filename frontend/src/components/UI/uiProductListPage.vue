<template>
  <div v-if="productList.length" class="main__product-page-content">
    <div v-for="(item, index) in productList" :key="item._id" class="main__product-page-content-item">
      <ui-product-item-header />
      <div class="main__product-page-content-item-img">
        <a @click="$router.push(`${$router.currentRoute.value.href}/${item._id}`)" style="cursor: pointer">
          <img :src="require(`@/assets/${item.photo}`)" alt="card image">
        </a>
      </div>
      <div class="main__product-page-content-item-label">
        <a @click="$router.push(`${$router.currentRoute.value.href}/${item._id}`)" style="cursor: pointer">{{ item.name }} </a>
      </div>
      <div class="main__product-page-content-item-color-variants" @click.stop="checkIsSelectedItemUsed($event, item._id, index)">
        <ui-colors-icon
          :item="item"
          size="20"
          position="flex-start"
          @check="addCheckedColor($event, item, index)"
        />
      </div>
      <p style="min-height: 30px; font-size: 0.8rem; font-family: 'Montserrat'; overflow: hidden; padding: 10px 0">
        <span v-if="item.isSelectedItem && savedIndex === item._id" >
          <span style="font-weight: 600; line-height: 1.2rem">Выбранные цвета:</span> {{ parseCheckedColors(item._id) }}
        </span>
      </p>
      <div class="main__product-page-content-item-price">
        {{ item.price }} грн
      </div>
      <a
        class="main__product-page-content-item-btnBuy"
        style="cursor: pointer"
        @click.prevent="checkedColor.length ? addToBasket(item) : isCheckedColorNotify = true"
      >
        В корзину
      </a>

    </div>
    <!--   dialogs -->
    <Transition name="fade">
      <ui-notify-dialog v-if="display" />
    </Transition>

    <Transition name="fade">
      <ui-notify-dialog v-if="isCheckedColorNotify" text="Выберите цвет!" background="#ff0000" textColor="white"/>
    </Transition>
  </div>
</template>

<script>
import UiProductItemHeader from "@/components/UI/uiProductItemHeader.vue"
import UiColorsIcon from "@/components/UI/icons/uiColorsIcon.vue"
import {mapMutations} from "vuex";
import UiNotifyDialog from "@/components/UI/modal/uiNotifyDialog.vue";


export default {
  name: "uiProductListPage.vue",
  components: {UiNotifyDialog, UiColorsIcon, UiProductItemHeader},
  data() {
    return {
      isCheckedColorNotify: false,
      checkedColor: [],
      display: false,
      productList: [],
      savedIndex: null
    }
  },
  emits: ['itemsList'],

  methods: {
    ...mapMutations('order', ['addToOrder']),

    checkIsSelectedItemUsed(event, id, index) {
      if (event.target.parentElement.id === id) {
        this.savedIndex = id
        this.productList[index].isSelectedItem = true;

      } else {
        this.savedIndex = ''
        this.productList[index].isSelectedItem = false
      }
    },
    addCheckedColor(value, item) {
      if (this.savedIndex !== item._id) {
        this.checkedColor = []
        this.checkedColor.push(value)
      } else {

        if(this.checkedColor.includes(value)) {
          const index = this.checkedColor.findIndex(el => el === value)

          if (index === -1) return false;

          this.checkedColor.splice(index, 1)
        } else {
          this.checkedColor.push(value)
        }
      }
    },
    parseCheckedColors(itemId) {
      const currentItem = this.productList.find(el => el._id === itemId);

      const colorObjects = currentItem.color.filter(el => this.checkedColor.includes(el.value));
      if (!colorObjects) return;

      return colorObjects.map(el => (el.text)).join(', ')
    },

    addToBasket(item) {
      this.isCheckedColorNotify = false
      this.checkedColor.forEach(el => {
        const orderItem = {quantity: 1, price: item.price, checkedColor: el, item: item}
        this.addToOrder(orderItem);
        this.checkedColor = [];
      })

      this.display = true;
      this.savedIndex = null

    },
    async getProductList() {
      try {
        const result = await fetch('http://localhost:3000/api/items', {
          method: 'GET',
          credentials: 'include'
        })
        const data = await result.json();

        this.productList = data.items.map(el => ({...el, isSelectedItem: false }));
        this.$emit('itemsList', this.productList)
      } catch (e) {
        console.log(e)
      }
    }
  },

  async mounted() {
    await this.getProductList()
  },
  watch: {
    display(val) {
      if (val) {
        setTimeout(() => {
          this.display = false;
        }, 2000)
      }
    },
    isCheckedColorNotify(val) {
      if (val) {
        setTimeout(() => {
          this.isCheckedColorNotify = false;
        }, 2000)
      }
    },
  },


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
