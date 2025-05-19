<template>
  <div class="main__user-page-content-block first-block">
    <div class="main__user-page-content-user-info">
      <div class="main__user-page-content-user-photo">
        <img :src="`/uploads/${userData?.avatar || 'no_user.jpg'}`" alt="user-photo" style="width: 80px; height: 80px; border-radius: 50%">
				<img
					:src="require('@/assets/icons/add.png')"
					alt="icon-plus"

					class="add-icon"
				>
				<ui-upload-image class="add-icon" @update-file="form.file = $event" style="opacity: 0" />
      </div>
      <p class="main__user-page-content-user-name" >
        {{ userData.name || '' }} {{ userData.lastName || ''}}
      </p>
    </div>
		<p v-if="form.file?.name">{{ form.file?.name }}</p>

    <ul class="main__user-page-content-user-list" >
			<li v-if="form.file?.name">
				<a @click.prevent="uploadPhoto" style="cursor: pointer">
					Обновить аватар
				</a>
			</li>
      <li
        v-for="link in userSidebarItems"
        :key="link.value"
      >
        <a
					href=""
					@click.prevent="changeLink(link.value)"
				>
					{{ link.text }}
				</a>
      </li>
    </ul>
    <a
      href=""
      class="main__user-page-content-user-exit"
      @click.stop="logOut"
    >
      Выйти из личного кабинета
    </a>
  </div>

	<!--   dialogs -->
	<Transition name="fade">
		<ui-notify-dialog v-if="display" :text="notifyMessage"/>
	</Transition>
</template>

<script>
import {
	mapGetters,
	mapMutations,
	mapActions
} from "vuex";

import UiUploadImage from "@/components/UI/forms/uiUploadImage.vue";
import UiNotifyDialog from "@/components/UI/modal/uiNotifyDialog.vue";

export default {
  name: "uiSidebarUserPage",
	components: {UiNotifyDialog, UiUploadImage },
	props: {
		user: {
			type: Object,
			default: () => {}
		}
	},
  data() {
    return {
      userData: {},
			form: {
				file: {}
			},
			display: false,
			notifyMessage: '',
    }
  },
  computed: {
    ...mapGetters({
			file: 'uploadFile/file',
      getUserInfo: 'user/getUserInfo',
			userSidebarItems: 'userSidebar/userSidebarItems',
    }),
  },
  methods: {
    ...mapMutations({
      setIsAuthorizedInfo: 'user/setIsAuthorizedInfo'
    }),
		...mapActions({
			sendUserAvatar: 'uploadFile/sendUserAvatar',
			logOutUser: 'user/logOutUser',
			userInfoUpdate: 'user/userInfoUpdate'
		}),
		async uploadPhoto() {
			if (!this.form.file) {
				this.notifyMessage = 'Файл не выбран!';
				return;
			}
			const formData = new FormData();
			formData.append('file', this.form.file);
			const result = await this.sendUserAvatar(formData);

			if (!result.result) {
				this.notifyMessage = 'Ошибка загрузки файла!';
				return;
			}

			const updatedUser = await this.userInfoUpdate({ avatar: result.file.filename});
			this.userData = updatedUser.result;

			this.file.name = '';
		},
		changeLink(link) {
			this.$router.push({
				name: 'User',
					params: {
				id: this.user._id,
			},
				query: {
					link,
					noScroll: 'true'
				}
			})
		},
    async logOut() {
			await this.logOutUser();
      this.setIsAuthorizedInfo(false);
      localStorage.setItem('auth', 'false');

      this.$router.push({ name: 'HobbyArt'});
    }

  },
  mounted() {
    this.userData = this.user;
  }

}
</script>
<style scoped lang="sass">
.add-icon
	width: 30px
	position: absolute
	bottom: 0
	right: -5px
	cursor: pointer
	background-color: white
	border-radius: 50%
</style>
