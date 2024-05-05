import { createRouter, createWebHistory } from 'vue-router';
import MainPage from "@/components/pages/MainPage.vue";
import DeliveryComponent from "@/components/pages/DeliveryComponent.vue";
import BonusesComponent from "@/components/pages/BonusesComponent.vue";


const routes = [
  {
    path: '/',
    name: 'Hobby Art',
    component: MainPage,
    props: true,
    meta: {
      title: 'Главная',
      favicon: '',
    },
  },
  {
    path: '/delivery',
    name: 'Delivery',
    component: DeliveryComponent,
    props: true,
    meta: {
      title: 'Доставка',
      favicon: '',
    },
  },
  {
    path: '/bonuses',
    name: 'Bonuses',
    component: BonusesComponent,
    props: true,
    meta: {
      title: 'Бонусы',
      favicon: '',
    },
  },
]

const router = createRouter({
	routes,
	history: createWebHistory(process.env.BASE_URL),

})
// eslint-disable-next-line
router.afterEach((to, from) => {
	document.title = to.meta.title || 'Главная';
	const favicon = to.meta.favicon || '';
	document.querySelector('link[rel="icon"]').href = favicon;
});

export default router