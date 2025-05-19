import { createRouter, createWebHistory } from 'vue-router';
import MainPage from "@/components/pages/MainPage.vue";
import DeliveryComponent from "@/components/pages/DeliveryComponent.vue";
import BonusesComponent from "@/components/pages/BonusesComponent.vue";
import AboutComponent from "@/components/pages/AboutComponent.vue";
import UserPageComponent from "@/components/pages/UserPageComponent.vue";
import AdminLogin from "@/components/pages/admin/AdminLogin.vue";
import AdminAuth from "@/components/pages/admin/AdminAuth.vue";
import BasketComponent from "@/components/pages/BasketComponent.vue";
import ProductPageComponent from "@/components/pages/ProductPageComponent.vue";
import ProductPageDetails from "@/components/pages/ProductPageDetails.vue";
import store from "@/store";
import AdminProductPage from "@/components/pages/admin/pages/items/AdminProductPage.vue";
import AdminOrdersPage from "@/components/pages/admin/pages/orders/AdminOrdersPage.vue";
import AdminUsersPage from "@/components/pages/admin/pages/AdminUsersPage.vue";
import AdminCommentsPage from "@/components/pages/admin/pages/AdminCommentsPage.vue";
import AdminItemAddEditForm from "@/components/pages/admin/pages/items/AdminItemAddEditForm.vue";
import AdminOrderViewDetails from "@/components/pages/admin/pages/orders/AdminOrderViewDetails.vue";
import AuthenticationForm from "@/components/UI/forms/AuthenticationForm.vue";
import uiLoginForm from "@/components/UI/forms/uiLoginForm.vue";
import uiRegistForm from "@/components/UI/forms/uiRegistForm.vue";




const routes = [

  {
    path: '/',
    name: 'HobbyArt',
    component: MainPage,
    props: true,
    meta: {
      title: 'Главная',
      favicon: '',
      requiresAuth: false
    },
  },
  {
    path: '/delivery',
    name: 'delivery',
    component: DeliveryComponent,
    props: true,
    meta: {
      title: 'Доставка',
      favicon: '',
      requiresAuth: false
    },
  },
  {
    path: '/bonuses',
    name: 'bonuses',
    component: BonusesComponent,
    props: true,
    meta: {
      title: 'Бонусы',
      favicon: '',
      requiresAuth: false
    },
  },
  {
    path: '/about',
    name: 'about',
    component: AboutComponent,
    props: true,
    meta: {
      title: 'О компании',
      favicon: '',
      requiresAuth: false
    },
  },
  {
    path: '/basket',
    name: 'basket',
    component: BasketComponent,
    props: true,
    meta: {
      title: 'Корзина',
      favicon: '',
      requiresAuth: false
    },
  },
  {
    path: '/product-page/:type',
    name: 'Product-page',
    component: ProductPageComponent,
    props: true,
    meta: {
      title: 'Товары',
      favicon: '',
      requiresAuth: false
    },
  },
  {
    path: '/product-page/:type/:id',
    name: 'product-page-details',
    component: ProductPageDetails,
    props: true,
    meta: {
      title: 'Товары',
      favicon: '',
      requiresAuth: false
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
      requiresAuth: false
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
    children: [
      {
        path: 'items',
        name: 'admin-items',
        component: AdminProductPage,
        props: true,
        children: [
          {
            path: 'add',
            name: 'admin-items-add',
            component: AdminItemAddEditForm,
            props: true,
          },
          {
            path: 'edit/:itemId',
            name: 'admin-items-edit',
            component: AdminItemAddEditForm,
            props: true,
          },
        ]
      },

      {
        path: 'orders',
        name: 'admin-orders',
        component: AdminOrdersPage,
        props: true,
        children: [
          {
            path: 'edit/:orderId',
            name: 'admin-orders-edit',
            component: AdminOrderViewDetails,
            props: true
          },
        ]
      },

      {
        path: 'users',
        name: 'admin-users',
        component: AdminUsersPage,
      },
      {
        path: 'comments',
        name: 'admin-comments',
        component: AdminCommentsPage,
      }
    ],
  },
	{
		path: '/user',
		name: 'user-auth',
		component: AuthenticationForm,
		props: true,
		children: [
			{
				path: 'login',
				name: 'user-login',
				component: uiLoginForm,
			},
			{
				path: 'regist',
				name: 'user-regist',
				component: uiRegistForm,
			}

		]
	},
  {
    path: '/user/page/:id',
    name: 'User',
    component: UserPageComponent,
    props: route => ({ link: route.query.link }),
    meta: {
      title: 'Личный кабинет',
      favicon: '',
      requiresAuth: true
    },
  },
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
  routes,
	scrollBehavior(to) {
		if (to.query.noScroll) {
			return false;
		}
		if (to.hash) {
			return {
				el: to.hash,
				behavior: 'smooth',
			}
		}
		return { top: 0 }
	}
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('auth');

  if (to.matched.some(record => record.meta.requiresAuth)) {

		switch(true) {
			case (isAuthenticated === 'false' && to.path.includes('admin')):
				return next('/admin/login');
			case (isAuthenticated === 'false' && to.path.includes('user')):
				return next('/');
			default:
				return next();
		}

  } else {
    next();
  }
})

router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('order')) {
    next()
  } else {
    const basketItems = JSON.parse(localStorage.getItem('order'));
    store.state.order.order = basketItems;
    next()
  }


})
// eslint-disable-next-line
router.afterEach((to, from) => {
	document.title = to.meta.title || 'Главная';
	const favicon = to.meta.favicon || '';
	document.querySelector('link[rel="icon"]').href = favicon;
});


export default router
