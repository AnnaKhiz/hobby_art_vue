import { createRouter, createWebHistory } from 'vue-router';
import MainPage from "@/components/pages/MainPage.vue";
import DeliveryComponent from "@/components/pages/DeliveryComponent.vue";
import BonusesComponent from "@/components/pages/BonusesComponent.vue";
import AboutComponent from "@/components/pages/AboutComponent.vue";
import UserPageComponent from "@/components/pages/UserPageComponent.vue";
import AdminLogin from "@/components/pages/AdminLogin.vue";
import AdminAuth from "@/components/pages/AdminAuth.js.vue";




const routes = [

  {
    path: '/',
    name: 'HobbyArt',
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
  {
    path: '/about',
    name: 'About',
    component: AboutComponent,
    props: true,
    meta: {
      title: 'О компании',
      favicon: '',
    },
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: AdminAuth,
    props: true,
    meta: {
      title: 'Админ',
      favicon: '',
      requiresAuth: true
    },
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminLogin,
    props: true,
    meta: {
      title: 'Админ',
      favicon: '',
      requiresAuth: true
    },
  },
  // {
  //   path: '/admin/item/:id',
  //   name: 'admin-item',
  //   component: AdminLogin,
  //   props: { edit: true },
  //   meta: {
  //     title: 'Админ',
  //     favicon: '',
  //     requiresAuth: true
  //   },
  // },

  {
    path: '/user_page/:id',
    name: 'User',
    component: UserPageComponent,
    props: true,
    meta: {
      title: 'Личный кабинет',
      favicon: '',
      requiresAuth: true
    },
  },
]

const router = createRouter({
	routes,
	history: createWebHistory(process.env.BASE_URL),

})

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = localStorage.getItem('auth')
//   console.log('isAuthenticated', isAuthenticated)
//
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//
//     if (isAuthenticated === 'false') {
//       next('/');
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// })
// eslint-disable-next-line
router.afterEach((to, from) => {
	document.title = to.meta.title || 'Главная';
	const favicon = to.meta.favicon || '';
	document.querySelector('link[rel="icon"]').href = favicon;
});

// async function initPage() {
//   const result = await fetch('http://localhost:3000/admin', {
//     method: 'GET',
//     credentials: 'include'
//   })
//   const data = await result.json()
//   console.log(data)
//
//   if (!data.result) {
//     this.$router.push('/admin/login')
//   }
// }


export default router
