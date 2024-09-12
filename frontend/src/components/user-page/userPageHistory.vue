<template>
  <div>
    <div v-for="(order, index) in userOrdersList" :key="order._id" class="main__user-page-content-story-container">
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
              <div class="main__user-page-content-story-container-items-block left-block">
                <div class="main__user-page-content-story-container-items-img">
                  <img :src="require(`@/assets/${item._id.photo}`)" alt="image card">
                </div>
                <p class="main__user-page-content-story-container-items-name">
                  {{ item._id.name }}
                </p>
              </div>
              <div class="main__user-page-content-story-container-items-block right-block">
                <p class="main__user-page-content-story-container-items-sum">
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
  </div>

</template>

<script>
export default {
  name: "userPageHistory",
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      show: false,
      userOrdersList: []
    }
  },
  methods: {
    expandOrder(index) {
      this.userOrdersList[index].show = !this.userOrdersList[index].show
      // this.show = !this.show
    },
    async addNewOrder(index) {
      const now = new Date(Date.now());

      const formattedTime = now.toISOString();
      console.log(formattedTime);
      // const date = new Date();
      // const options = { timeZone: 'Europe/Kiev', hour12: false };
      // console.log(date.toLocaleString('en-GB', options));

      let newOrderCopy = {...this.userOrdersList[index], date: formattedTime}

      delete newOrderCopy._id;

      // newOrderCopy.date = Date.now();



      console.log('newOrderCopy', newOrderCopy)
      // const newOrderCopy = {...this.userOrdersList[index]}

      const result = await fetch('http://localhost:3000/api/orders/add', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(newOrderCopy),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await result.json();

      this.userOrdersList.push(...response.data)

      console.log('response', response)
    },


    parseDate(date) {
     const data = date.split('T');
     return data[0]
    },
    parseTime(date) {
      const time = date.split('T');

      return time[1].split('.')[0]
    },

    async initPage() {
      const result = await fetch(`http://localhost:3000/api/orders/user-orders`,
        {
          method: 'GET',
          credentials: "include"
        });
      const data = await result.json()
      this.userOrdersList = data.data.map(el => ({...el, show: false}));
      console.log(this.userOrdersList)
    },
  },
  mounted() {
    this.initPage()
  }
}
</script>

<style scoped lang="sass">

</style>
