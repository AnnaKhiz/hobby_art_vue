import { createStore } from "vuex";
import { linksModule } from "@/store/linksModule"
import { userModule } from "@/store/userModule"
import {dialogModule} from "@/store/dialogModule";
import {ordersModule} from "@/store/ordersModule";



export default createStore({
  modules: {
    dialog: dialogModule,
    links: linksModule,
    user: userModule,
    order: ordersModule
  }
})



