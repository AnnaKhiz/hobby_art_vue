import { createStore } from "vuex";
import { linksModule } from "@/store/linksModule"
import { userModule } from "@/store/userModule"
import {dialogModule} from "@/store/dialogModule";
import {ordersModule} from "@/store/ordersModule";
import {filterParamsModule} from "@/store/filterParamsModule";
import {deliveryPaymentModule} from "@/store/deliveryPaymentModule";



export default createStore({
  modules: {
    dialog: dialogModule,
    links: linksModule,
    user: userModule,
    order: ordersModule,
    filter: filterParamsModule,
    delivery: deliveryPaymentModule
  }
})



