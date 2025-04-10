import { createStore } from "vuex";
import { linksModule } from "@/store/modules/linksModule"
import { userModule } from "@/store/modules/userModule"
import { dialogModule } from "@/store/modules/dialogModule";
import { ordersModule } from "@/store/modules/ordersModule";
import { filterParamsModule } from "@/store/modules/filterParamsModule";
import { deliveryPaymentModule } from "@/store/modules/deliveryPaymentModule";
import { itemsModule } from "@/store/modules/itemsModule";


export default createStore({
  modules: {
    dialog: dialogModule,
    links: linksModule,
    user: userModule,
    order: ordersModule,
    filter: filterParamsModule,
    delivery: deliveryPaymentModule,
		items: itemsModule,
  }
})



