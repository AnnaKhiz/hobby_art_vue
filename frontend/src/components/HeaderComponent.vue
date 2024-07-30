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
							{{ userPageLabel()  }}
						</a>
						<a href="" class="header__menu-favoriteButton elem-sub" id="favorite-header" data-modal="callModal">
							Избранное
						</a>
						<a href="basket.html" class="header__menu-basketButton elem-sub">
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
	name: "HeaderComponent.vue",
	components: {UiLoginForm, UiModalWindow, UiSearchForm, HeaderInfoComponent },
  props: {
    getModalActive: {
      type: Function
    }
  },
	data() {
		return {
      displayDialog: false,
      user: {}
		}
	},
  emits: ['send-checked-link'],
  computed: {
    ...mapGetters({
      getNavMenuLinks: 'links/getNavMenuLinks',
      getDisplayDialogState: 'dialog/getDisplayDialogState'
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
      // this.$router.push('/user_page/1')

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
      console.log('get result', data)

      if (!data.result) {
        console.log('no requested result')
        this.$router.back()
        // await this.getAdmin()
      } else {
        this.setIsAuthorizedInfo(true)
        this.user = await data.user[0]
        this.$router.push(`/user_page/${this.user._id}`);
        return this.user
      }
    }
  },
  watch: {
    // displayDialog() {
    //   this.$emit('getModalActive', this.displayDialog)
    // }
  }
}
</script>
<style scoped lang="sass">

</style>
