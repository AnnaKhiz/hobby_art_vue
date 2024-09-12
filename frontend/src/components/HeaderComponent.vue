<template>
	<header class="header" id="header">
		<header-info-component />
		<section class="header__menu">
			<div class="container">
				<div class="header__menu-container">
					<nav class="header__menu-nav">
						<ul id="menu-links">
							<li
								v-for="link in getNavMenuLinks"
								:key="link.url"
							>
								<span @click="openMenuPage(link.url, link.value)">{{ link.text }} </span>
							</li>
						</ul>
					</nav>
					<a href="/" class="header__menu-logo">
						<img src="@/assets/img/logo.png" alt="logo">
					</a>
					<div class="header__menu-subitem">
            <ui-search-form />
						<a
              href=""
              class="header__menu-enterButton elem-sub"
              id="callModal"
              data-modal="callModal"
              @click.prevent="checkFunction"
            >
							{{ userPageLabel() }}
						</a>

						<a v-if="userPageLabel() === 'Кабинет'" href="" class="header__menu-favoriteButton elem-sub" id="favorite-header" data-modal="callModal">
							Избранное
						</a>
						<a class="header__menu-basketButton elem-sub basket-count" @click="$router.push('/basket')">
							Корзина
						</a>
					</div>
				</div>
			</div>
		</section>
    <teleport to="body" >
      <ui-modal-window v-if="getDisplayDialogState" @close="setDisplayDialogState(false)" >
        <template #default>
          <ui-login-form />
        </template>
      </ui-modal-window>
    </teleport>

	</header>
</template>
<script>
import HeaderInfoComponent from "@/components/HeaderInfoComponent.vue"
import UiSearchForm from "@/components/UI/forms/uiSearchForm.vue"
import {mapGetters, mapMutations} from "vuex";
import UiModalWindow from "@/components/UI/modal/uiModalWindow.vue"
import UiLoginForm from "@/components/UI/forms/uiLoginForm.vue"
// import axios from "axios";

export default {
	name: "HeaderComponent",
	components: {UiLoginForm, UiModalWindow, UiSearchForm, HeaderInfoComponent },
  props: {
    getModalActive: {
      type: Function
    }
  },
	data() {
		return {
      displayDialog: false,
      user: {},
      basketQuantity: 0,
		}
	},
  emits: ['send-checked-link'],
  computed: {
    ...mapGetters({
      order: 'order/order',
      getNavMenuLinks: 'links/getNavMenuLinks',
      getDisplayDialogState: 'dialog/getDisplayDialogState',
      totalQuantity: 'order/totalQuantity'
    }),

  },
  methods: {
    ...mapMutations({
      setCheckedHeaderLink: 'links/setCheckedHeaderLink',
      setIsRegisteredInfo: 'user/setIsRegisteredInfo',
      setDisplayDialogState: 'dialog/setDisplayDialogState',
      setIsAuthorizedInfo: 'user/setIsAuthorizedInfo'
    }),

    userPageLabel() {
      return localStorage.getItem('auth') === 'true' ? 'Кабинет' : 'Войти'
    },
    checkFunction() {
      return localStorage.getItem('auth') === 'true' ? this.getUser() : this.openDialog()
    },
    openDialog() {

      this.setDisplayDialogState(true)

      // this.displayDialog = true;
      this.setIsRegisteredInfo(true)
      this.$router.push('/user/login')

    },
    openMenuPage(link, value) {
      if (link) {
        this.$router.push(`${link}`);
      } else {
        const height = window.outerHeight * 100;
        window.scrollTo({  top: height, behavior: 'smooth' })
      }
      this.setCheckedHeaderLink(value)
    },
    async getUser() {
      const result = await fetch(`http://localhost:3000/user`, {
        method: 'GET',
        credentials: 'include'
      });

      const data = await result.json()


      if (!data.result) {
        // console.log('no requested result')
        this.$router.back()
        // await this.getAdmin()
      } else {
        this.setIsAuthorizedInfo(true);

        this.user = await data.user[0]
        this.$router.push(`/user_page/${this.user._id}`);
        return this.user
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.basketQuantity = this.order.totalQuantity
      document.documentElement.style.setProperty('--basket-count', `"${ this.basketQuantity || 0 }"`);
    }, 10)
  },
  watch: {
    order: {
      handler(val) {
        this.basketQuantity = val.totalQuantity
      },
      deep: true
    },
    basketQuantity(val) {
      document.documentElement.style.setProperty('--basket-count', `"${ val || 0 }"`);
    },
  }
}
</script>
<style scoped lang="sass">
.basket-count
  cursor: pointer
  &:after
    content: var(--basket-count)
    position: absolute
    top: -6px
    left: calc(100% - 13%)
    z-index: 2
    width: 17px
    height: 17px
    background-color: #D3D3B5
    border-radius: 50%
    -webkit-text-fill-color: #5E5C5A
    text-fill-color: #5E5C5A
    display: flex
    justify-content: center
    align-items: center
    font: 400 normal 0.625rem 'Montserrat'
    line-height: 0.75rem
    color: #5E5C5A
</style>
