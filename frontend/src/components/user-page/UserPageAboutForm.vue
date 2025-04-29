<template>
  <div class="main__user-page-content-editable-content" style="position: relative" >
    <p class="info-message">
      {{message}}
    </p>
    <p class="main__user-page-content-user-name data-page">
      Мои данные
    </p>
    <div class="main__user-page-content-block-data">

      <ul class="main__user-page-content-user-data">
        <li v-for="(item, index) in userAboutLabelsList" :key="index">
          <label :for="item.idLabel" class="form-label">{{item.text}}</label>
          <input
            v-if="item.value.includes('address')"
            v-model="entityDataUser.address[(item.value).slice(8)]"
            :type="item.value !== 'password' ? 'text' : 'password'"
            :placeholder="item.text"
            :id="item.idLabel"
            ref="inputs"
            @input="entityDataResult[item.value] = entityDataUser.address[(item.value).slice(8)]"
          />
          <input
            v-else
            v-model="entityDataUser[item.value]"
            :type="item.value !== 'password' ? 'text' : 'password'"
            :placeholder="item.text"
            :id="item.idLabel"
            ref="inputs"
            @input="entityDataResult[item.value] = entityDataUser[item.value]"
          />
          <a href="" class="main__user-page-content-user-edit-link" @click.prevent="focusInput(index)">
            <img :src="editIcon" alt="edit icon">Изменить
          </a>
        </li>
      </ul>
    </div>
    <a href="" class="main__user-page-content-user-save-button" @click.prevent="saveChanges">Сохранить данные</a>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import editIcon from "@/assets/icons/edit.svg";
export default {
  name: "uiUserPageAboutForm",
  props: {
    user: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      message: '',
      entityDataResult: {},
      entityDataUser: {
				address: {
					city: '',
					street: '',
					house: '',
					apartment: null,
					zipCode: null,
				}
			},
			editIcon
    }
  },
	computed: {
		...mapGetters({
			userAboutLabelsList: 'user/userAboutLabelsList'
		})
	},
  methods: {
		...mapActions('user', ['userInfoUpdate']),
    focusInput(index) {
      this.$refs.inputs[index].focus()
    },
    async saveChanges() {
			const result = await this.userInfoUpdate(this.entityDataResult);
      if (!result.result) return;

      this.message = 'Данные успешно обновлены. Страница будет перезагружена автоматически.';

      setTimeout(() => {
        this.message = '';
        this.$router.go(0);
      }, 1500)

    }
  },

  mounted() {
    this.entityDataUser = {
			...this.entityDataUser,
			...this.user,
		}
  }
}
</script>

<style scoped lang="sass">
.form-label
  display: block
  padding-left: 20px
  margin-bottom: 5px
.info-message
  color: red
  height: 20px
  position: absolute
  top: 0
  left: 0
</style>
