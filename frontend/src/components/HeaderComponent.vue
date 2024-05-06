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
						<a href="" class="header__menu-enterButton elem-sub" id="callModal" data-modal="callModal" @click.prevent="openDialog">
							Войти
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
      <ui-modal-window v-if="displayDialog" @close="displayDialog = false">
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

export default {
	name: "HeaderComponent.vue",
	components: {UiLoginForm, UiModalWindow, UiSearchForm, HeaderInfoComponent },
	data() {
		return {
      displayDialog: false
		}
	},
  emits: ['send-checked-link'],
  computed: {
    ...mapGetters({
      getNavMenuLinks: 'links/getNavMenuLinks'
    })
  },
  methods: {
    ...mapMutations({
      setCheckedHeaderLink: 'links/setCheckedHeaderLink',
      setIsRegisteredInfo: 'user/setIsRegisteredInfo'
    }),
    openDialog() {
      this.displayDialog = true;
      this.setIsRegisteredInfo(true)
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
  }
}
</script>
<style scoped lang="sass">

</style>