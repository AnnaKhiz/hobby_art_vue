<template>
  <div class="main__user-page-content-story-container">
    <div class="main__user-page-content-story-container-flex">
      <div class="main__user-page-content-story-block">
        <p class="main__user-page-content-story-desc">
          Заказ № *order_number* от *date_created* *time_created*, *sum_quantity* товара на сумму *final_price* ₽
        </p>
        <a href="" class="main__user-page-content-story-link" @click.prevent="expandOrder">
          <span >Подробнее о заказе</span><img src="@/assets/img/arrow-down.svg" alt="arrow-down icon" >
        </a>
      </div>
      <div class="main__user-page-content-story-block block-right">
        <p class="main__user-page-content-story-desc right-block">
          <span>Заказ выполнен</span> *data_finished*
        </p>
        <a href="" class="main__user-page-content-story-repeat-link">
          Повторить заказ
        </a>
      </div>
    </div>
    <div class="main__user-page-content-story-container-block " :class="{ 'non-visible' : !show }">
<!--      order items block -->
      <div class="main__user-page-content-story-container-items "  >
        <div class="main__user-page-content-story-container-items-flex">
          <div class="main__user-page-content-story-container-items-block left-block">
            <div class="main__user-page-content-story-container-items-img">
              <img src="@/assets/img/catalog-img-link1.png" alt="image card">
            </div>
            <p class="main__user-page-content-story-container-items-name">
              *item-name*
            </p>
          </div>
          <div class="main__user-page-content-story-container-items-block right-block">
            <p class="main__user-page-content-story-container-items-sum">
              *quantity* шт
            </p>
            <p class="main__user-page-content-story-container-items-price">
              *price* ₽
            </p>
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
      show: false
    }
  },
  methods: {
    expandOrder() {
      this.show = !this.show
    }
  }
}
</script>

<style scoped lang="sass">

</style>
