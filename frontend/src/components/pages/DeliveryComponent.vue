<template>
  <main class="main">
    <ui-main-banner />
    <section class="main__delivery__page">
    <div class="container">
      <ui-breadcrumbs :link="getCheckedHeaderLink" />
      <section class="main__delivery__page-container">
        <ui-sidebar-general />
        <div class="main__delivery__page-content">
          <div class="main__delivery__page-content-block">
            <h2 class="main__delivery__page-content-label">
              Оплата
            </h2>
            <div class="main__delivery__page-content-text-block">
              <p class="main__delivery__page-content-text">Оформить заказ в нашем магазине можно и без регистрации, просто заполнив короткую форму для доставки.</p>
              <p class="main__delivery__page-content-text">После оформления заказа доступна онлайн оплата банковской картой (оплата производится через защищенный онлайн сервис ПАО «Сбербанк»).</p>
              <p class="main__delivery__page-content-text">Срок сбора и обработки заказа осуществляется в течение 1-2 дней после поступления оплаты.</p>
            </div>
          </div>
          <div class="main__delivery__page-content-block">
            <h2 class="main__delivery__page-content-label">
              Доставка
            </h2>
            <div class="main__delivery__page-content-text-block">
              <p class="main__delivery__page-content-text">Доставка заказанных товаров осуществляется в течение 1-2 дней по городу Якутску (в черте города).</p>
              <p class="main__delivery__page-content-text">Стоимость доставки по городу 150-250 рублей в зависимости от адреса доставки.</p>
              <p class="main__delivery__page-content-text">Бесплатная доставка от 2000 рублей в черте города.</p>
              <p class="main__delivery__page-content-text">Отдалённые районы рассчитываются индивидуально.</p>
              <p class="main__delivery__page-content-text">Крупногабаритные товары (как картон) доставка рассчитывается индивидуально.</p>
              <p class="main__delivery__page-content-text">Чтобы отслеживать информацию о заказе, просматривать историю своих заказов и участвовать в бонусной программе авторизируйтесь или пройдите процедуру регистрации. Будьте внимательны при вводе электронной почты, ФИО и адрес доставки.</p>
            </div>
          </div>
          <div class="main__delivery__page-content-block">
            <h2 class="main__delivery__page-content-label">
              Самовывоз
            </h2>
            <div class="main__delivery__page-content-text-block">
              <p class="main__delivery__page-content-text">Вы можете забрать свой заказ самостоятельно по адресу:</p>
              <p class="main__delivery__page-content-text">г. Якутск, ул. Петра Алексеева, д. 6, ТЦ Олонхо, 2 этаж, «Хобби Арт».</p>
            </div>
          </div>
        </div>
      </section>
    </div>

  </section>
  </main>
</template>

<script>
import UiBreadcrumbs from "@/components/UI/uiBreadcrumbs.vue"
import {mapGetters} from "vuex";
import UiSidebarGeneral from "@/components/UI/sidebars/uiSidebarGeneral.vue";
import UiMainBanner from "@/components/UI/sliders/uiMainBanner.vue"

export default {
  name: "DeliveryComponent.vue",
  components: {UiMainBanner, UiSidebarGeneral, UiBreadcrumbs },
  computed: {
    ...mapGetters({
      getCheckedHeaderLink: 'links/getCheckedHeaderLink',
    }),
  },

}
</script>

<style scoped lang="sass">

</style>