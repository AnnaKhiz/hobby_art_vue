<template>
  <div v-if="userOrdersList.length">
    <div v-for="(order, index) in userOrdersList" :key="order._id" class="main__user-page-content-story-container" >
      <div>
        <div class="main__user-page-content-story-container-flex">
          <div class="main__user-page-content-story-block">
            <p class="main__user-page-content-story-desc">
              Заказ № {{ order._id }} от {{ parseDate(order.date) }} {{parseTime(order.date)}}
            </p>
            <p class="main__user-page-content-story-desc">
              {{ order.totalQuantity}} товара на сумму {{ order.totalPrice }} грн
            </p>
            <a href="" class="main__user-page-content-story-link" @click.prevent="expandOrder(index)">
              <span >Подробнее о заказе</span><img src="@/assets/img/arrow-down.svg" alt="arrow-down icon" :style="`${order.show ? 'transform: rotate(180deg)' : 'transform: rotate(0)'}`">
            </a>
          </div>
          <div class="main__user-page-content-story-block block-right">
            <p class="main__user-page-content-story-desc right-block">
              <span>Статус:</span>
                {{ order.dateCompleted !== '' ? order.dateCompleted : 'В работе' }}
            </p>

            <a href="" class="main__user-page-content-story-repeat-link" @click.prevent="addNewOrder(index)">
              Повторить заказ
            </a>
          </div>

        </div>

        <div v-for="item in order.items" :key="item._id" class="main__user-page-content-story-container-block " :class="{ 'non-visible' : !order.show }">
          <!--      order items block -->
          <div class="main__user-page-content-story-container-items "  >
            <div class="main__user-page-content-story-container-items-flex">
              <div class="main__user-page-content-story-container-items-block left-block" style="width: 100%">
                <div class="main__user-page-content-story-container-items-img" style="width: 100px; object-fit: contain; aspect-ratio: 1/1">
                  <img :src="require(`@/assets/${item._id.photo}`)" alt="image card">
                </div>
                <p class="main__user-page-content-story-container-items-name" style="width: 100%">
                  {{ item._id.name }} <span style="font-size: 0.8rem; font-weight: 400">( {{ parseCheckedColors(item.checkedColor, item) }} )</span>
                </p>
              </div>
              <div class="main__user-page-content-story-container-items-block right-block" style="column-gap: 50px">
                <p class="main__user-page-content-story-container-items-sum" style="min-width: fit-content">
                  {{ item.quantity }} шт
                </p>
                <p class="main__user-page-content-story-container-items-price">
                  {{ item.price }} грн
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>

    <!--  dialog notify -->
    <Transition name="fade">
      <ui-notify-dialog v-if="showNotify" text="Копия заказа создана!"/>
    </Transition>
  </div>
  <div v-else>
    <h3 style="font-family: 'Montserrat'">У вас еще нет ни одного заказа.</h3>
  </div>

</template>

<script>
import UiNotifyDialog from "@/components/UI/modal/uiNotifyDialog.vue";

export default {
  name: "userPageHistory",
  components: {UiNotifyDialog},
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showNotify: false,
      show: false,
      userOrdersList: [],
      date: ''
    }
  },
  methods: {
    parseCheckedColors(color, item) {
      const colorObject = item._id.color.find(el => el.value === color);
      if (!colorObject) return '';

      return colorObject.text;
    },

    expandOrder(index) {
      this.userOrdersList[index].show = !this.userOrdersList[index].show
    },

    async addNewOrder(index) {
      const now = new Date(Date.now());
      const options = { timeZone: 'Europe/Kiev', hour12: false };
      this.date = now.toLocaleString('en-GB', options).replaceAll('/', '-');

      let newOrderCopy = { ...this.userOrdersList[index], date: this.date };

      delete newOrderCopy._id;

      const result = await fetch('http://localhost:3000/api/orders/add', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(newOrderCopy),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await result.json();

      this.showNotify = true;
      setTimeout(() => {
        this.showNotify = false;
      }, 1500);

      this.userOrdersList.push(response.data);
    },

    parseDate(date) {
     const data = date.split(',');
     return data[0]
    },

    parseTime(date) {
      const time = date.split(',');
      return time[1]
    },

    async initPage() {
      const result = await fetch(`http://localhost:3000/api/orders/user-orders`,
        {
          method: 'GET',
          credentials: "include"
        });
      const data = await result.json()
      this.userOrdersList = data.data.map(el => ({...el, show: false}));
    },
  },
  async mounted() {
    await this.initPage();
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
