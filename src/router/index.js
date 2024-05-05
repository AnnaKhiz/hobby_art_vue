import { createRouter, createWebHistory } from 'vue-router';
import MainPage from "@/components/pages/MainPage.vue";
import DeliveryComponent from "@/components/pages/DeliveryComponent.vue";


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