import { createApp } from 'vue';
import App from './App.vue';
import router from "@/router";
import store from "@/store";
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import VueGoogleMaps from '@fawmi/vue-google-maps';

const googleMapsKey = process.env.VUE_APP_GMKEY;

const vuetify = createVuetify({
	components,
	directives,
})

createApp(App)
	.use(router)
	.use(store)
	.use(VueGoogleMaps, {
		load: {
			key: googleMapsKey,
			v: 'weekly',
		},
	})
	.use(vuetify)
	.mount('#app')
