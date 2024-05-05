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
                Бонусная программа
              </h2>
              <div class="main__delivery__page-content-text-block">
                <p class="main__delivery__page-content-text">Что такое Бонусная программа?</p>
                <p class="main__delivery__page-content-text">Мы полагаем, что каждая покупка должна вам приносить не только радость, но и выгоду! Поэтому, мы создали для вас бонусную программу,
                  которая позволит вам вернуть до 10 % от стоимости товаров к себе на счет.</p>
                <p class="main__delivery__page-content-text">Вы совершаете покупки и автоматически получаете бонусы на свой бонусный счет
                  Используя накопленные бонусы, можно получить скидку до 50% стоимости новых покупок.</p>
                <p class="main__delivery__page-content-text">Как работает бонусная программа?</p>
                <p class="main__delivery__page-content-text">Становясь участником нашей бонусной программы, вы получаете часть от стоимости покупок в виде бонусных рублей, которыми можно
                  оплатить до 50% стоимости в чеке.*</p>
                <p class="main__delivery__page-content-text">Бонусными рублями можно воспользоваться только при оплате заказа в интернет-магазине.***</p>
                <p class="main__delivery__page-content-text">Бонусный рубль - условная единица. 1 бонусный рубль = 1 ₽ скидки</p>
                <p class="main__delivery__page-content-text">За что мне начислят бонусы?
                  За покупки Акции</p>
                <p class="main__delivery__page-content-text">Как долго я могу хранить свои бонусные рубли?</p>
                <p class="main__delivery__page-content-text">Срок жизни баллов 1 год. После этого они аннулируются.</p>
                <p class="main__delivery__page-content-text">Какие правила использования бонусов?</p>
                <p class="main__delivery__page-content-text">Вы можете оплачивать бонусными рублями до 50% от стоимости товаров. Нельзя обменивать бонусы на рубли, нельзя продавать их, передаривать.</p>
                <p class="main__delivery__page-content-text">Как воспользоваться бонусами?</p>
                <p class="main__delivery__page-content-text">При оформлении заказа, под выбором способа оплаты, будут отображаться бонусы (Подробнее). Для того, чтобы воспользоваться
                  бонусами, нужно выбрать "Использовать" (Подробнее). После применения бонусов, скидка отобразится в поле "Скидка за бонусы" (Подробнее).</p>
                <p class="main__delivery__page-content-text">Когда мне начислят бонусы?</p>
                <p class="main__delivery__page-content-text">Бонусы начисляются после получения заказа.</p>
              </div>
            </div>
          </div>
        </section>
      </div>

    </section>
  </main>


</template>

<script>
import UiMainBanner from "@/components/UI/sliders/uiMainBanner.vue";
import UiSidebarGeneral from "@/components/UI/sidebars/uiSidebarGeneral.vue";
import UiBreadcrumbs from "@/components/UI/uiBreadcrumbs.vue";
import {mapGetters} from "vuex";

export default {
  name: "BonusesComponent.vue",
  components: {UiBreadcrumbs, UiSidebarGeneral, UiMainBanner},
  computed: {
    ...mapGetters({
      getCheckedHeaderLink: 'links/getCheckedHeaderLink',
    }),
  },
}
</script>

<style scoped lang="sass">

</style>