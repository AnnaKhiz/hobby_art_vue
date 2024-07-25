<template>
  <div class="main__user-page-content-editable-content" >
    <p class="main__user-page-content-user-name data-page review">
      Мои отзывы
    </p>
    <div class="main__user-page-content-review-container">
      <div class="main__user-page-content-review-block rating-block">
        <img src="@/assets/img/rating.png" alt="rating stars">
        <p class="main__user-page-content-review-data">
          13.06.2021 12:30
        </p>
      </div>
      <div class="main__user-page-content-review-block info-block">
        <div class="main__user-page-content-review-img">
          <img src="@/assets/img/image-card-item4.png" alt="image card">
        </div>
        <div class="main__user-page-content-review-info">
          <p>Шпагат Macrametr 4 мм, 100 нитей</p>
          <p>Комментарий: <span>Хороший шпагат</span></p>
        </div>
      </div>
    </div>
    <div class="main__user-page-content-review-container">

      <div class="main__user-page-content-review-block rating-block">
        <img src="@/assets/img/rating.png" alt="rating stars">
        <p class="main__user-page-content-review-data">
          *13.06.2021 12:35*
        </p>
      </div>
      <div class="main__user-page-content-review-block info-block">
        <div class="main__user-page-content-review-img">
          <img src="@/assets/img/image-card-item3.png" alt="image card">
        </div>
        <div class="main__user-page-content-review-info">
          <p>Пряжа трикотажная Arachna «Слинг Принт»</p>
          <p>Комментарий: <span>Пряжа понравилась, по качеству отличная)</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userPageFeedback.vue",
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  },
}
</script>



<style scoped lang="sass">

</style>
