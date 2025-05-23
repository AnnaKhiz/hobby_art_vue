<template>
	<form action="#" class="w-100">
		<div class="main__basket-info-delivery">
			<h2 class="main__basket-info-delivery-label">
				Способ получения
			</h2>
			<div class="input-container">
				<input
					v-model="deliveryInfo.address.city"
					type="text"
					placeholder="Город"
					class="w-100"
				/>
				<span class="modal__registration-form-error-block small b-10" v-if="errors.address.city">{{ errors.address.city }}</span>
			</div>

			<div class="main__basket-info-delivery-method input-container">
				<select v-model="deliveryInfo.deliveryMethod" style="color: #424242">
					<option
						v-for="method in deliveryMethods"
						:key="method"
						:value="method.value"
					>
						{{ method.text }}
					</option>
				</select>
			</div>
			<div class="main__basket-info-delivery-subflex">
				<div class="input-container" id="street">
					<input
						v-model="deliveryInfo.address.street"
						type="text"
						placeholder="Улица"
					/>
					<span class="modal__registration-form-error-block small b-10" v-if="errors.address.street">{{ errors.address.street }}</span>
				</div>

				<div class="input-container" id="house">
					<input
						v-model="deliveryInfo.address.house"
						type="text"
						placeholder="Дом"
					/>
					<span class="modal__registration-form-error-block small b-10" v-if="errors.address.house">{{ errors.address.house }}</span>
				</div>

				<div class="input-container" id="apartment">
					<input
						v-model="deliveryInfo.address.apartment"
						type="number"
						placeholder="Квартира"
					/>
					<span class="modal__registration-form-error-block small b-10" v-if="errors.address.apartment">{{ errors.address.apartment }}</span>
				</div>

				<div class="input-container" id="postcode">
					<input
						v-model="deliveryInfo.address.zipCode"
						type="number"
						placeholder="Индекс"
					>
					<span class="modal__registration-form-error-block small b-10" v-if="errors.address.zipCode">{{ errors.address.zipCode }}</span>
				</div>

			</div>
			<input
				v-model="deliveryInfo.userComment"
				type="text"
				placeholder="Добавить комментарий"
				id="comment"
			>
		</div>
		<div class="main__basket-info-user">
			<h2 class="main__basket-info-user-label">
				Данные получателя
			</h2>
			<div class="main__basket-info-user-subflex">
				<div class="input-container">
					<input
						v-model="deliveryInfo.receiver.lastName"
						type="text"
						placeholder="Фамилия"
						class="w-100"
					/>
					<span class="modal__registration-form-error-block small b-10" v-if="errors.receiver.lastName">{{ errors.receiver.lastName }}</span>
				</div>

				<div class="input-container">
					<input
						v-model="deliveryInfo.receiver.name"
						type="text"
						placeholder="Имя"
						class="w-100"
					/>
					<span class="modal__registration-form-error-block small b-10" v-if="errors.receiver.name">{{ errors.receiver.name }}</span>
				</div>

				<div class="input-container" >
					<input
						v-model="deliveryInfo.receiver.surName"
						type="text"
						placeholder="Отчество"
						class="w-100"
					/>
					<span class="modal__registration-form-error-block small b-10" v-if="errors.receiver.surName">{{ errors.receiver.surName }}</span>
				</div>
			</div>

			<div class="input-container" >
				<input
					v-model="deliveryInfo.receiver.phone"
					type="tel"
					placeholder="Номер телефона"
					class="w-100"
				/>
				<span class="modal__registration-form-error-block small bphone-3" v-if="errors.receiver.phone">{{ errors.receiver.phone }}</span>
				<p class="main__basket-info-user-text">
					По этому номеру телефона мы с вяжемся с вами для подтверждения заказа
				</p>
			</div>

			<div class="input-container" >
				<input
					v-model="deliveryInfo.receiver.email"
					type="email"
					placeholder="E-mail"
					class="w-100"
				>
				<span class="modal__registration-form-error-block small b-3" v-if="errors.receiver.email">{{ errors.receiver.email }}</span>
				<p class="main__basket-info-user-text">
					На эту почту вам придет письмо с составом заказа, а так же трэк-номер для его отслеживания
				</p>
			</div>

			<label for="subscribe-basket" class="main__basket-info-user-checkbox">
				<input
					v-model="deliveryInfo.receiver.isMailing"
					type="checkbox"
					id="subscribe-basket"
					name="subscribed"
				>
				<span class="main__basket-info-user-checkbox-text">Подписаться на рассылку новинок и акций</span>
			</label>


		</div>
		<div class="main__basket-info-payment">
			<h2 class="main__basket-info-payment-label">
				Способ оплаты
			</h2>
			<label
				v-for="option in paymentMethod"
				:key="option"
				:for="option.value"
				class="main__basket-info-payment-radio-btn"
				style="margin-bottom: 20px"
			>
				<input
					v-model="deliveryInfo.paymentMethod"
					type="radio"
					name="payment"
					:value="option.value"
					style="margin-bottom: 0;"
				>
				<span class="main__basket-info-payment-radio-text">{{ option.text }}</span>
			</label>
		</div>
	</form>
</template>

<script>
import {
	mapActions,
	mapGetters
} from "vuex";
import * as yup from "yup";

export default {
	name: "uiNewOrderForm.vue",
	data() {
		return {
			deliveryInfo: {
				address: {
					city: '',
					street: '',
					house: '',
					apartment: 0,
					zipCode: 0
				},
				deliveryMethod: 'novapost',
				paymentMethod: 'cash',
				receiver: {
					name: '',
					lastName: '',
					phone: '',
					email: ''
				},
			},
			errors: {
				address: {},
				receiver: {},
				deliveryMethod: '',
				paymentMethod: ''
			},
			currentOrder: {}
		}
	},
	props: {
		isSent: {
			type: Boolean,
			default: false,
		}
	},
	emits: ['updateDeliveryInfo', 'updateOrder'],
	computed: {
		...mapGetters({
			paymentMethod: 'delivery/paymentMethod',
			deliveryMethods: 'delivery/deliveryMethods',
			userInfo: ('user/userInfo'),
		}),
	},
	methods: {
		...mapActions('user', ['getAuthUser']),
		resetForm() {
			this.deliveryInfo = {
				address: {
					city: '',
						street: '',
						house: '',
						apartment: 0,
						zipCode: 0
				},
				deliveryMethod: 'novapost',
					paymentMethod: 'cash',
					receiver: {
					name: '',
						lastName: '',
						phone: '',
						email: '',
				},
			}
		},
		resetErrors() {
			this.errors = {
				address: {},
				receiver: {},
				deliveryMethod: '',
				paymentMethod: ''
			};
		},
		addEmptyAddress() {
			this.deliveryInfo.address = {
				city: '',
				street: '',
				house: '',
				apartment: null,
				zipCode: null,
			};
			this.deliveryInfo.receiver = {};
			this.currentOrder.isMailing = false;
			this.currentOrder.users = '';
		},

		async initPage() {
			if (localStorage.getItem('auth') === 'true') {
				try {
					await this.getAuthUser();

					this.deliveryInfo.address = this.userInfo.address || {};
					this.deliveryInfo.receiver = this.userInfo || {};
					this.currentOrder.isMailing = this.userInfo.mailing || false;
					this.currentOrder.users = this.userInfo._id || '';

				} catch (error) {
					console.error('Error in getting user (basket):', error);
					this.addEmptyAddress();
				}

			} else {
				this.addEmptyAddress();
			}
		},
		async validation() {
			this.resetErrors();

			const schema = yup.object({
				address: yup.object({
					city: yup.string().min(2,'Город не меньше 2 букв').required('Город обязательно'),
					street: yup.string().min(2,'Улица не меньше 2 букв').required('Улица обязательно'),
					house: yup.string().min(1,'Не менее 1 цифры').required('Номер обязательно'),
					apartment: yup.number().min(1,'Не менее 1 цифры').required('Номер обязательно'),
					zipCode: yup.number().min(4,'Индекс не менее 4 цифр').required('Индекс обязательно'),
				}),
				receiver: yup.object({
					name: yup.string().min(2,'Имя не меньше 2 букв').required('Имя обязательно'),
					lastName: yup.string().min(2,'Фамилия не меньше 2 букв').required('Фамилия обязательна'),
					phone: yup.string().min(10,'Не менее 10 цифр').max(13, 'Не более 13 цифр').required('Телефон обязателен').matches(/^\d+$/, 'Только цифры'),
					email: yup.string().email('Неправильный формат email').required('Email обязателен'),
				}),
			})
			let result = null;

			try {
				await schema.validate(this.deliveryInfo, { abortEarly: false });
				result = true;
			} catch (error) {
				result = false;
				error.inner.forEach((validationError) => {
					const path = validationError.path;
					const keys = path.split('.');

					if (keys.length === 2) {
						const [group, field] = keys;
						if (!this.errors[group]) {
							this.errors[group] = {};
						}
						this.errors[group][field] = validationError.message;
					} else {
						this.errors[path] = validationError.message;
					}
				});
			}
			return result;
		},
	},
	watch: {
		currentOrder: {
			handler(val) {
				this.$emit('updateOrder', val);
			},
			deep: true,
			immediate: true,
		},
		deliveryInfo: {
			handler(val) {
				this.$emit('updateDeliveryInfo', val);
			},
			deep: true,
			immediate: true,
		},
		isSent: {
			handler(val) {
				if (val) {
					this.resetForm();
				}
			},
			deep: true,
			immediate: true,
		},
	},
	async mounted() {
		await this.initPage();
	}
}
</script>
